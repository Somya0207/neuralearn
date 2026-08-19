export default function Navbar() {
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
        <button className="rounded-lg bg-[#E8A33D] px-5 py-2 text-sm font-semibold text-[#14172B]">
          Start free
        </button>
      </div>
    </nav>
  );
}