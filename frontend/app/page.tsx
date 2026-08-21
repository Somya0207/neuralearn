import Navbar from "./components/Navbar";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import PlayerPreview from "./components/PlayerPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0E1A] text-[#E9E6F2]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-8 pt-24 pb-16">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#E8A33D]">
          AI-Powered Visual Learning · Built for CSE
        </p>
        <h1 className="max-w-2xl font-serif text-5xl font-semibold leading-tight tracking-tight">
          Turn dense CS text into a lecture you actually{" "}
          <em className="text-[#E8A33D] not-italic italic">want</em> to watch.
        </h1>
        <p className="mt-6 max-w-md text-lg text-[#8B8FA8]">
          NEURALEARN reads your textbook chapters and code, then narrates and
          animates them into a personal video lecture.
        </p>
      </section>
      <HowItWorks />
      <Features />
      <PlayerPreview />
    </main>
  );
}