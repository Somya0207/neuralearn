import { Composition } from "remotion";
import "./index.css";
import { MyComposition, compositionSchema } from "./Composition";

const defaultLines = [
  { code: "def binary_search(arr, target):", note: "Define the function", startFrame: 0, durationInFrames: 60 },
  { code: "    lo, hi = 0, len(arr) - 1", note: "Set boundaries", startFrame: 60, durationInFrames: 60 },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BinarySearch"
        component={MyComposition}
        durationInFrames={120}
        fps={30}
        width={1280}
        height={720}
        schema={compositionSchema}
        defaultProps={{ lines: defaultLines }}
      />
    </>
  );
};