"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) {
      setError("Registration failed — email may already be in use.");
      return;
    }

    router.push("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0E1A] text-[#E9E6F2]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-[#262B47] bg-[#161B32] p-8">
        <h1 className="mb-6 font-serif text-2xl font-semibold">Create your account</h1>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 w-full rounded-lg border border-[#262B47] bg-[#12162A] px-4 py-2.5 text-sm outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-lg border border-[#262B47] bg-[#12162A] px-4 py-2.5 text-sm outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-5 w-full rounded-lg border border-[#262B47] bg-[#12162A] px-4 py-2.5 text-sm outline-none"
          required
        />

        <button type="submit" className="w-full rounded-lg bg-[#E8A33D] py-2.5 text-sm font-semibold text-[#14172B]">
          Sign up
        </button>
      </form>
    </main>
  );
}