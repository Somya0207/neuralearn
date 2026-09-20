import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
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

export const MyComposition = ({ lines }: z.infer<typeof compositionSchema>) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0E1A", padding: 80, justifyContent: "center" }}>
      {lines.map((line, i) => (
        <Sequence key={i} from={line.startFrame} durationInFrames={line.durationInFrames}>
          {line.audioUrl && <Audio src={staticFile(line.audioUrl)} />}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 32,
              color: "#E8A33D",
              backgroundColor: "#E8A33D1A",
              padding: "8px 16px",
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            {line.code}
          </div>
          <div style={{ position: "absolute", bottom: 60, left: 80, fontFamily: "sans-serif", fontSize: 24, color: "#8B8FA8" }}>
            {line.note}
          </div>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};