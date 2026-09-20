import { Injectable } from '@nestjs/common';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { parseFile } from 'music-metadata';
import { EdgeTTS } from 'node-edge-tts';
import path from 'path';
import fs from 'fs';

interface RawLine {
  code: string;
  note: string;
}

@Injectable()
export class VideoService {
  async generateNarration(text: string, outputPath: string) {
    const tts = new EdgeTTS({
      voice: 'en-US-AriaNeural',
      outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
    });
    await tts.ttsPromise(text, outputPath);
  }

  async renderLecture(rawLines: RawLine[]) {
    const publicAudioDir = path.resolve('../remotion/public/audio');
    fs.mkdirSync(publicAudioDir, { recursive: true });

    const fps = 30;
    let currentFrame = 0;
    const lines = [];

    for (let i = 0; i < rawLines.length; i++) {
      const fileName = `line-${Date.now()}-${i}.mp3`;
      const filePath = path.join(publicAudioDir, fileName);

      await this.generateNarration(rawLines[i].note, filePath);

      const metadata = await parseFile(filePath);
      const durationSeconds = metadata.format.duration ?? 2;
      const durationInFrames = Math.ceil(durationSeconds * fps) + 15;

      lines.push({
        code: rawLines[i].code,
        note: rawLines[i].note,
        audioUrl: `audio/${fileName}`,
        startFrame: currentFrame,
        durationInFrames,
      });

      currentFrame += durationInFrames;
    }

    const totalDuration = currentFrame;

    const bundleLocation = await bundle({
      entryPoint: path.resolve('../remotion/src/index.ts'),
    });

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: 'BinarySearch',
      inputProps: { lines },
    });

    const outputPath = path.resolve('./rendered-videos', `narrated-${Date.now()}.mp4`);

    await renderMedia({
      composition: { ...composition, durationInFrames: totalDuration },
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: { lines },
    });

    return outputPath;
  }
}