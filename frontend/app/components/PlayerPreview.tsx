"use client";

import { useState } from "react";

const tabs = ["Compact", "Theatre", "Fullscreen"];
const sideTabs = ["AI Tutor", "Transcript", "Notes"];

const initialMessages = [
  { from: "tutor", text: "You're watching the recursion module — want me to slow down on the base case?" },
  { from: "user", text: "yes, why does it stop at n==0?" },
  { from: "tutor", text: "Because that's the smallest version of the problem we already know the answer to." },
];

export default function PlayerPreview() {
  const [activeTab, setActiveTab] = useState("Compact");
  const [activeSideTab, setActiveSideTab] = useState("AI Tutor");
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  function sendMessage() {
    if (draft.trim() === "") return; // ignore empty sends
    setMessages([...messages, { from: "user", text: draft }]);
    setDraft(""); // clear the input after sending
  }

  return (
    <section className="mx-auto max-w-5xl px-8 py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">
        The Lecture Player
      </p>
      <h2 className="mb-14 max-w-lg font-serif text-4xl font-semibold tracking-tight">
        Where the actual learning happens
      </h2>

      <div className="overflow-hidden rounded-2xl border border-[#262B47] bg-[#161B32]">
        <div className="flex items-center justify-between border-b border-[#262B47] px-5 py-3">
          <div className="flex gap-1 rounded-lg bg-[#12162A] p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold ${
                  activeTab === tab ? "bg-[#E8A33D] text-[#14172B]" : "text-[#8B8FA8]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="font-mono text-[11px] text-[#8B8FA8]">Viewing: {activeTab}</span>
        </div>

        <div className="grid grid-cols-[2.2fr_1fr]">
          <div className="flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_30%_30%,#6C63FF33,#161B32_60%)]">
            <div className="h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-[#E8A33D] to-[#6C63FF]" />
          </div>

          <div className="flex flex-col border-l border-[#262B47]">
            <div className="flex border-b border-[#262B47]">
              {sideTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSideTab(tab)}
                  className={`flex-1 py-3 text-xs font-semibold ${
                    activeSideTab === tab
                      ? "border-b-2 border-[#E8A33D] text-white"
                      : "text-[#8B8FA8]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[88%] rounded-xl px-3 py-2 text-[13px] leading-snug ${
                    msg.from === "tutor"
                      ? "bg-[#12162A] border border-[#262B47]"
                      : "ml-auto bg-[#E8A33D33]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-t border-[#262B47] p-3">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask the tutor anything..."
                className="flex-1 rounded-lg border border-[#262B47] bg-[#12162A] px-3 py-2 text-[13px] text-white outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}