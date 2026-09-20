"use client";

import { useState, useEffect } from "react";

interface Lecture {
  id: number;
  title: string;
  topic: string;
  duration: number;
  difficulty: string;
}

interface MasteryEntry {
  topic: string;
  score: number;
}

interface Recommendation extends Lecture {
  score: number;
  reason: string;
}

const allTopics = ["Arrays", "Recursion", "Graphs", "Dynamic Programming"];

export default function Dashboard() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [mastery, setMastery] = useState<MasteryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/lectures")
      .then((res) => res.json())
      .then((data) => {
        setLectures(data);
        setLoading(false);
      });

    const userData = localStorage.getItem("user");
    const userId = userData ? JSON.parse(userData).id : null;

    if (userId) {
      fetch(`http://localhost:3001/quiz/mastery/${userId}`)
        .then((res) => res.json())
        .then((data) => setMastery(data));

      fetch(`http://localhost:3001/recommendations/${userId}`)
        .then((res) => res.json())
        .then((data) => setRecommendations(data));
    }
  }, []);

  function getScoreForTopic(topic: string) {
    const found = mastery.find((m) => m.topic === topic);
    return found ? found.score : 0;
  }

  return (
    <section className="mx-auto max-w-5xl px-8 py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">
        Your Dashboard
      </p>
      <h2 className="mb-14 max-w-lg font-serif text-4xl font-semibold tracking-tight">
        Mastery, not just watch time
      </h2>

      <div className="grid grid-cols-[260px_1fr] gap-6">
        <div className="rounded-2xl border border-[#262B47] bg-[#161B32] p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#8B8FA8]">
            Topic mastery
          </p>
          {allTopics.map((topic) => {
            const score = getScoreForTopic(topic);
            return (
              <div key={topic} className="mb-4 flex items-center justify-between last:mb-0">
                <span className="text-[13px] font-medium">{topic}</span>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#262B47]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6C63FF] to-[#E8A33D]"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
          <a
            href="/quiz?topic=Recursion"
            className="mt-4 block rounded-lg bg-[#E8A33D1A] py-2 text-center text-xs font-semibold text-[#E8A33D] hover:bg-[#E8A33D33]"
          >
            Take Recursion Quiz →
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {loading && <p className="text-sm text-[#8B8FA8]">Loading lectures...</p>}
          {lectures.map((lec) => (
            <a
              key={lec.id}
              href={`/lecture/${lec.id}`}
              className="overflow-hidden rounded-xl border border-[#262B47] bg-[#161B32] transition hover:border-[#E8A33D]"
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[#6C63FF4D] to-[#E8A33D33]">
                <span className="absolute left-2.5 top-2.5 rounded-md bg-black/40 px-2 py-1 text-[10px] font-bold tracking-wide text-white">
                  {lec.difficulty.toUpperCase()}
                </span>
              </div>
              <div className="p-3.5">
                <p className="mb-1.5 text-[13.5px] font-semibold">{lec.title}</p>
                <p className="text-xs text-[#8B8FA8]">{lec.topic} · {lec.duration} min</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#8B8FA8]">
            Recommended for you
          </p>
          <div className="grid grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <a
                key={rec.id}
                href={`/lecture/${rec.id}`}
                className="rounded-xl border border-[#E8A33D66] bg-[#E8A33D0D] p-4 transition hover:border-[#E8A33D]"
              >
                <p className="mb-1.5 text-[13.5px] font-semibold">{rec.title}</p>
                <p className="text-xs text-[#E8A33D]">{rec.reason}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}