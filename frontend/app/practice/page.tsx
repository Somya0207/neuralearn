"use client";

import { useState } from "react";

export default function Practice() {
  const [code, setCode] = useState('function solve() {\n  console.log("Hello, NEURALEARN!");\n}\n\nsolve();');
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  async function runCode() {
    setRunning(true);
    setOutput("");

    const res = await fetch("http://localhost:3001/sandbox/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "javascript", code }),
    });
    const data = await res.json();

    setOutput(data.stderr || data.output || "(no output)");
    setRunning(false);
  }

  return (
    <main className="min-h-screen bg-[#0B0E1A] px-8 py-16 text-[#E9E6F2]">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">
          Coding Practice
        </p>
        <h1 className="mb-8 font-serif text-3xl font-semibold">Try it yourself</h1>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="mb-4 h-64 w-full resize-none rounded-xl border border-[#262B47] bg-[#161B32] p-4 font-mono text-sm text-[#E9E6F2] outline-none"
        />

        <button
          onClick={runCode}
          disabled={running}
          className="mb-4 rounded-lg bg-[#E8A33D] px-5 py-2.5 text-sm font-semibold text-[#14172B] disabled:opacity-50"
        >
          {running ? "Running..." : "▶ Run Code"}
        </button>

        <div className="rounded-xl border border-[#262B47] bg-[#12162A] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8B8FA8]">Output</p>
          <pre className="whitespace-pre-wrap font-mono text-sm text-[#7EE787]">{output || "Run your code to see output here."}</pre>
        </div>
      </div>
    </main>
  );
}