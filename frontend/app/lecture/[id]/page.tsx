"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PlayerPreview from "../../components/PlayerPreview";

interface Lecture {
  id: number;
  title: string;
  topic: string;
  duration: number;
  difficulty: string;
}

export default function LectureDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [notes, setNotes] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/lectures/${id}`)
      .then((res) => res.json())
      .then((data) => setLecture(data));
  }, [id]);

  async function generateNotes() {
    if (!lecture) return;
    setLoadingNotes(true);
    const res = await fetch("http://localhost:3001/chat/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: lecture.title, topic: lecture.topic }),
    });
    const data = await res.json();
    setNotes(data.notes);
    setLoadingNotes(false);
  }

  if (!lecture) return <main className="min-h-screen bg-[#0B0E1A]" />;

  return (
    <main className="min-h-screen bg-[#0B0E1A] px-8 py-16 text-[#E9E6F2]">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">
          {lecture.topic}
        </p>
        <h1 className="mb-2 font-serif text-3xl font-semibold">{lecture.title}</h1>
        <p className="mb-8 text-sm text-[#8B8FA8]">
          {lecture.duration} min · {lecture.difficulty}
        </p>
        <a
        
          href={`/quiz?topic=${lecture.topic}`}
          className="mb-8 inline-block rounded-lg bg-[#E8A33D] px-5 py-2.5 text-sm font-semibold text-[#14172B]"
        >
          Take {lecture.topic} Quiz
        </a>

        <button
          onClick={generateNotes}
          disabled={loadingNotes}
          className="mb-8 ml-3 rounded-lg border border-[#262B47] px-5 py-2.5 text-sm font-semibold text-[#8B8FA8] hover:text-white"
        >
          {loadingNotes ? "Generating..." : "📝 Generate Notes"}
        </button>

        {notes && (
          <div className="mb-8 whitespace-pre-line rounded-xl border border-[#262B47] bg-[#161B32] p-5 text-sm leading-relaxed text-[#E9E6F2]">
            {notes}
          </div>
        )}

        <PlayerPreview />
      </div>
    </main>
  );
}