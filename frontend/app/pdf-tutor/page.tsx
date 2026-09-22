"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Message {
  from: string;
  text: string;
}

export default function PdfTutor() {
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [asking, setAsking] = useState(false);
  const [language, setLanguage] = useState("en");
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [videoStatus, setVideoStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:3001/documents/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    setDocumentId(data.id);
    setFileName(data.title);
    setUploading(false);
    setMessages([{ from: "tutor", text: `I've read "${data.title}". Ask me anything about it.` }]);
  }

  async function sendMessage() {
    if (draft.trim() === "" || !documentId) return;

    const updated = [...messages, { from: "user", text: draft }];
    setMessages(updated);
    setDraft("");
    setAsking(true);

    const res = await fetch("http://localhost:3001/chat/document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: draft, documentId }),
    });
    const data = await res.json();

    setMessages([...updated, { from: "tutor", text: data.reply }]);
    setAsking(false);
  }

  async function generateVideo() {
    if (!documentId) return;
    setGeneratingVideo(true);
    setVideoStatus("");

    const res = await fetch("http://localhost:3001/video/from-document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId, language }),
    });
    const data = await res.json();

    setVideoStatus(`Video generated! Saved at: ${data.path}`);
    setGeneratingVideo(false);
  }

  return (
    <main className="min-h-screen bg-[#0B0E1A] px-8 py-16 text-[#E9E6F2]">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">
          Document Tutor
        </p>
        <h1 className="mb-8 font-serif text-3xl font-semibold">Ask about a PDF</h1>

        {!documentId && (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#262B47] bg-[#161B32] py-16 text-center">
            <span className="mb-2 text-sm font-semibold text-[#E8A33D]">
              {uploading ? "Reading PDF..." : "Click to upload a PDF"}
            </span>
            <span className="text-xs text-[#8B8FA8]">We'll extract the text so you can ask questions</span>
            <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
          </label>
        )}

        {documentId && (
          <div className="rounded-2xl border border-[#262B47] bg-[#161B32]">
            <div className="border-b border-[#262B47] px-5 py-3 text-sm font-semibold">
              📄 {fileName}
            </div>

            <div className="flex items-center gap-2 border-b border-[#262B47] px-5 py-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg border border-[#262B47] bg-[#12162A] px-3 py-1.5 text-xs text-[#E9E6F2] outline-none"
              >
                <option value="en">English narration</option>
                <option value="hi">Hindi narration</option>
              </select>
              <button
                onClick={generateVideo}
                disabled={generatingVideo}
                className="rounded-lg bg-[#6C63FF] px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
              >
                {generatingVideo ? "Generating video... (~1-2 min)" : "🎬 Generate Narrated Video"}
              </button>
            </div>
            {videoStatus && (
              <p className="border-b border-[#262B47] px-5 py-2 text-xs text-[#7EE787]">{videoStatus}</p>
            )}

            <div className="flex flex-col gap-3 p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.from === "tutor"
                      ? "bg-[#12162A] border border-[#262B47]"
                      : "ml-auto bg-[#E8A33D33]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {asking && <p className="text-xs text-[#8B8FA8]">Thinking...</p>}
            </div>
            <div className="flex gap-2 border-t border-[#262B47] p-3">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about this document..."
                className="flex-1 rounded-lg border border-[#262B47] bg-[#12162A] px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}