import { Composition } from "remotion";
import "./index.css";
import { MyComposition, compositionSchema } from "./Composition";

const defaultLines = [
  { code: "def binary_search(arr, target):", note: "Define the function with array and target" },
  { code: "    lo, hi = 0, len(arr) - 1", note: "Set search boundaries" },
  { code: "    while lo <= hi:", note: "Keep searching while a range exists" },
  { code: "        mid = (lo + hi) // 2", note: "Find the middle point" },
  { code: "        if arr[mid] == target:", note: "Check if we found it" },
  { code: "            return mid", note: "Found it — return the index" },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BinarySearch"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        schema={compositionSchema}
        defaultProps={{ lines: defaultLines }}
      />
    </>
  );
};