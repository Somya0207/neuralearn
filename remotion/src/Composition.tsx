import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";
import { z } from "zod";

export const compositionSchema = z.object({
  lines: z.array(
    z.object({
      code: z.string(),
      note: z.string(),
      audioUrl: z.string().optional(),
      startFrame: z.number(),
      durationInFrames: z.number(),
    })
  ),
});

function AnimatedIcon({ index }: { index: number }) {
  const frame = useCurrentFrame();
  const rotate = interpolate(frame, [0, 90], [0, 360], { extrapolateRight: "extend" });
  const scale = 1 + Math.sin(frame / 10) * 0.08;
  const colors = ["#E8A33D", "#6C63FF", "#7EE787", "#E8A33D"];
  const color = colors[index % colors.length];

  return (
    <div
      style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: `conic-gradient(${color}, transparent, ${color})`,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        margin: "0 auto 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#0B0E1A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 700, color }}>
        {index + 1}
      </div>
    </div>
  );
}

export const MyComposition = ({ lines }: z.infer<typeof compositionSchema>) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0E1A" }}>
      {lines.map((line, i) => (
        <Sequence key={i} from={line.startFrame} durationInFrames={line.durationInFrames}>
          {line.audioUrl && <Audio src={staticFile(line.audioUrl)} />}
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
            <AnimatedIcon index={i} />
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 32,
                color: "#E8A33D",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              {line.code}
            </div>
            <div style={{ fontFamily: "sans-serif", fontSize: 22, color: "#E9E6F2", textAlign: "center", maxWidth: 900, lineHeight: 1.5 }}>
              {line.note}
            </div>
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};