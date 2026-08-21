const mastery = [
  { topic: "Arrays", percent: 88 },
  { topic: "Recursion", percent: 54 },
  { topic: "Graphs", percent: 31 },
  { topic: "Dynamic Programming", percent: 12 },
];

const lectures = [
  { title: "Recursion: Base Cases & Stack Frames", meta: "Data Structures · 11 min", tag: "RECOMMENDED" },
  { title: "Graph Traversal: BFS vs DFS", meta: "Data Structures · 14 min", tag: "CONTINUE" },
  { title: "Intro to Dynamic Programming", meta: "Algorithms · 9 min", tag: "NEW" },
];

export default function Dashboard() {
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
          {mastery.map((m) => (
            <div key={m.topic} className="mb-4 flex items-center justify-between last:mb-0">
              <span className="text-[13px] font-medium">{m.topic}</span>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#262B47]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#6C63FF] to-[#E8A33D]"
                  style={{ width: `${m.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {lectures.map((lec) => (
            <div key={lec.title} className="overflow-hidden rounded-xl border border-[#262B47] bg-[#161B32]">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[#6C63FF4D] to-[#E8A33D33]">
                <span className="absolute left-2.5 top-2.5 rounded-md bg-black/40 px-2 py-1 text-[10px] font-bold tracking-wide text-white">
                  {lec.tag}
                </span>
              </div>
              <div className="p-3.5">
                <p className="mb-1.5 text-[13.5px] font-semibold">{lec.title}</p>
                <p className="text-xs text-[#8B8FA8]">{lec.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}