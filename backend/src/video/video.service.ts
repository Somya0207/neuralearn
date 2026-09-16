import { Injectable } from '@nestjs/common';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';

@Injectable()
export class VideoService {
  async renderLecture(lines: { code: string; note: string }[]) {
    const bundleLocation = await bundle({
      entryPoint: path.resolve('../remotion/src/index.ts'),
    });

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: 'BinarySearch',
      inputProps: { lines },
    });

    const outputPath = path.resolve('./rendered-videos', `lecture-${Date.now()}.mp4`);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: { lines },
    });

    return outputPath;
  }
}