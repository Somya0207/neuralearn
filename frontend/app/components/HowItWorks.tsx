const steps = [
  {
    number: "01 / Ingest",
    title: "Text & code parsing",
    desc: "Chapters, slides, or raw code are parsed into a structured concept graph.",
  },
  {
    number: "02 / Render",
    title: "Narration + animation",
    desc: "Each concept becomes a scripted, narrated scene with animated visuals.",
  },
  {
    number: "03 / Adapt",
    title: "Mastery-based follow-up",
    desc: "A quiz checks retention, and the engine adjusts your next lecture's pace.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-5xl px-8 py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6C63FF]">
        The Pipeline
      </p>
      <h2 className="mb-14 max-w-lg font-serif text-4xl font-semibold tracking-tight">
        From syllabus to lecture, automatically
      </h2>
      <div className="grid grid-cols-3 gap-7">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl border border-[#262B47] bg-[#161B32] p-8"
          >
            <p className="mb-4 font-mono text-sm text-[#E8A33D]">{step.number}</p>
            <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
            <p className="text-sm text-[#8B8FA8]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}