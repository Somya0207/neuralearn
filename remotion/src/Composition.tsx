import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const codeLines = [
  { code: "def binary_search(arr, target):", note: "Define the function with array and target" },
  { code: "    lo, hi = 0, len(arr) - 1", note: "Set search boundaries" },
  { code: "    while lo <= hi:", note: "Keep searching while a range exists" },
  { code: "        mid = (lo + hi) // 2", note: "Find the middle point" },
  { code: "        if arr[mid] == target:", note: "Check if we found it" },
  { code: "            return mid", note: "Found it — return the index" },
];

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const activeLine = Math.min(Math.floor(frame / 25), codeLines.length - 1);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0E1A", padding: 80, justifyContent: "center" }}>
      {codeLines.map((line, i) => {
        const startFrame = i * 15;
        const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const isActive = i === activeLine;

        return (
          <div
            key={i}
            style={{
              fontFamily: "monospace",
              fontSize: 32,
              color: isActive ? "#E8A33D" : "#E9E6F2",
              opacity: isActive ? 1 : opacity * 0.4,
              backgroundColor: isActive ? "#E8A33D1A" : "transparent",
              padding: "8px 16px",
              borderRadius: 8,
              marginBottom: 8,
              transition: "none",
            }}
          >
            {line.code}
          </div>
        );
      })}

      {codeLines[activeLine] && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            fontFamily: "sans-serif",
            fontSize: 24,
            color: "#8B8FA8",
          }}
        >
          {codeLines[activeLine].note}
        </div>
      )}
    </AbsoluteFill>
  );
};