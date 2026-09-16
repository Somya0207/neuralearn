"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  }

  return (
    <nav className="sticky top-0 border-b border-[#262B47] bg-[#0B0E1A]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2 font-serif text-xl font-semibold">
          <span className="h-2 w-2 rounded-full bg-[#E8A33D] shadow-[0_0_12px_#E8A33D]" />
          NEURALEARN
        </div>
        <div className="flex gap-9 text-sm font-medium text-[#8B8FA8]">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#features" className="hover:text-white">Features</a>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#8B8FA8]">
              Hi, <span className="text-white">{user.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-[#262B47] px-4 py-2 text-sm font-semibold text-[#8B8FA8] hover:text-white"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a href="/login" className="text-sm font-medium text-[#8B8FA8] hover:text-white">
              Log in
            </a>
            <a href="/signup" className="rounded-lg bg-[#E8A33D] px-5 py-2 text-sm font-semibold text-[#14172B]">
              Start free
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}