"use client";

import { useState } from "react";

const tabs = ["Compact", "Theatre", "Fullscreen"];

export default function PlayerPreview() {
  const [activeTab, setActiveTab] = useState("Compact");

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
                  activeTab === tab
                    ? "bg-[#E8A33D] text-[#14172B]"
                    : "text-[#8B8FA8]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="font-mono text-[11px] text-[#8B8FA8]">
            Viewing: {activeTab}
          </span>
        </div>

        <div className="flex aspect-video items-center justify-center bg-[radial-gradient(circle_at_30%_30%,#6C63FF33,#161B32_60%)]">
          <div className="h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-[#E8A33D] to-[#6C63FF]" />
        </div>
      </div>
    </section>
  );
}