import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const codeLines = [
  "def binary_search(arr, target):",
  "    lo, hi = 0, len(arr) - 1",
  "    while lo <= hi:",
  "        mid = (lo + hi) // 2",
  "        if arr[mid] == target:",
  "            return mid",
];

export const MyComposition = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0E1A", padding: 80 }}>
      {codeLines.map((line, i) => {
        const startFrame = i * 15;
        const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const translateY = interpolate(frame, [startFrame, startFrame + 15], [10, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              fontFamily: "monospace",
              fontSize: 32,
              color: "#E9E6F2",
              opacity,
              transform: `translateY(${translateY}px)`,
              marginBottom: 12,
            }}
          >
            {line}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};