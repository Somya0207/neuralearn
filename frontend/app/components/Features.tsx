const features = [
  { icon: "🎓", title: "Virtual AI tutor", desc: "Explains step-by-step like a mentor, remembers what you struggled with." },
  { icon: "🔊", title: "Dual-language narration", desc: "Human or AI voice, Hindi or English, adjustable voice quality." },
  { icon: "💬", title: "Live doubt-solving", desc: "Ask a question mid-lecture and get a contextual answer instantly." },
  { icon: "📊", title: "Adaptive mastery engine", desc: "Tracks per-topic mastery and reorders your path based on quizzes." },
  { icon: "📝", title: "Auto-generated notes", desc: "Every lecture produces a clean transcript and summary." },
  { icon: "⬇️", title: "Offline downloads", desc: "Save lectures for offline viewing, playback speed included." },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-8 py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">
        Everything in the platform
      </p>
      <h2 className="mb-14 max-w-lg font-serif text-4xl font-semibold tracking-tight">
        Built like a real course, not a video library
      </h2>
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[#262B47] bg-[#262B47]">
        {features.map((f) => (
          <div key={f.title} className="bg-[#161B32] p-7">
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#6C63FF26] text-lg">
              {f.icon}
            </div>
            <h3 className="mb-2 text-sm font-semibold">{f.title}</h3>
            <p className="text-[13px] text-[#8B8FA8]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}