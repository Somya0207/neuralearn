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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/lectures/${id}`)
      .then((res) => res.json())
      .then((data) => setLecture(data));
  }, [id]);

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
        <PlayerPreview />
      </div>
    </main>
  );
}