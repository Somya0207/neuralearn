"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid email or password.");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0E1A] text-[#E9E6F2]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-[#262B47] bg-[#161B32] p-8">
        <h1 className="mb-6 font-serif text-2xl font-semibold">Log in</h1>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

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
          Log in
        </button>
      </form>
    </main>
  );
}