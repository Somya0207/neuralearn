import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { z } from "zod";

export const compositionSchema = z.object({
  lines: z.array(
    z.object({
      code: z.string(),
      note: z.string(),
    })
  ),
});

export const MyComposition = ({ lines }: z.infer<typeof compositionSchema>) => {
  const frame = useCurrentFrame();
  const activeLine = Math.min(Math.floor(frame / 25), lines.length - 1);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0E1A", padding: 80, justifyContent: "center" }}>
      {lines.map((line, i) => {
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
            }}
          >
            {line.code}
          </div>
        );
      })}

      {lines[activeLine] && (
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
          {lines[activeLine].note}
        </div>
      )}
    </AbsoluteFill>
  );
};