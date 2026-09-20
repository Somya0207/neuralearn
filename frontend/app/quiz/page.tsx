"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") || "Recursion";
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/quiz/${topic}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setAnswers(new Array(data.length).fill(-1));
      });
  }, []);

  function selectAnswer(questionIndex: number, optionIndex: number) {
    const updated = [...answers];
    updated[questionIndex] = optionIndex;
    setAnswers(updated);
  }

  async function submitQuiz() {
    const userData = localStorage.getItem("user");
    const userId = userData ? JSON.parse(userData).id : 1;

    const res = await fetch("http://localhost:3001/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, topic, answers }),
    });
    const data = await res.json();
    setResult(data);
  }

  if (result) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0E1A] px-8 text-[#E9E6F2]">
        <h1 className="mb-4 font-serif text-3xl font-semibold">
          You scored {result.correct}/{result.total}
        </h1>
        <p className="text-[#8B8FA8]">
          Your {topic} mastery is now{" "}
          <span className="text-[#E8A33D]">{result.mastery.score}%</span>
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0E1A] px-8 py-16 text-[#E9E6F2]">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-10 font-serif text-3xl font-semibold">{topic} Quiz</h1>

        {questions.map((q, qi) => (
          <div key={q.id} className="mb-8">
            <p className="mb-3 font-medium">{q.question}</p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => selectAnswer(qi, oi)}
                  className={`rounded-lg border px-4 py-2.5 text-left text-sm ${
                    answers[qi] === oi
                      ? "border-[#E8A33D] bg-[#E8A33D1A] text-white"
                      : "border-[#262B47] text-[#8B8FA8]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
        {questions.length === 0 && (
          <p className="mb-8 text-sm text-[#8B8FA8]">No quiz questions available for this topic yet.</p>
        )}
        <button
          onClick={submitQuiz}
          disabled={questions.length === 0 || answers.includes(-1)}
          className="w-full rounded-lg bg-[#E8A33D] py-3 text-sm font-semibold text-[#14172B] disabled:opacity-40"
        >
          Submit Quiz
        </button>
      </div>
    </main>
  );
}