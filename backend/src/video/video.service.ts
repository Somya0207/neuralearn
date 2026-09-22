import { Injectable } from '@nestjs/common';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { parseFile } from 'music-metadata';
import { EdgeTTS } from 'node-edge-tts';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

interface RawLine {
  code: string;
  note: string;
}

const VOICE_MAP: Record<string, string> = {
  en: 'en-US-AriaNeural',
  hi: 'hi-IN-SwaraNeural',
};

@Injectable()
export class VideoService {
  async generateNarration(text: string, outputPath: string, voice: string) {
    const tts = new EdgeTTS({
      voice,
      outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
    });
    await tts.ttsPromise(text, outputPath);
  }

  async segmentDocument(content: string, language: string): Promise<RawLine[]> {
    const truncated = content.slice(0, 8000);
    const languageInstruction =
      language === 'hi'
        ? 'Write the "note" field entirely in Hindi (Devanagari script). Keep the "code" field as short English labels/keywords.'
        : 'Write everything in English.';

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: `You turn a document into a short narrated video script. Break the document into 5-7 teaching segments. Return ONLY a JSON array, no markdown, no explanation, in this exact shape: [{"code": "Short Heading", "note": "One to two sentence spoken explanation of this point."}]. ${languageInstruction}`,
          },
          { role: 'user', content: `Document:\n${truncated}` },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq segmentation failed: ${await response.text()}`);
    }

    const data = await response.json();
    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/, '');
    return JSON.parse(raw);
  }

  async renderVideo(rawLines: RawLine[], language: string) {
    const publicAudioDir = path.resolve('../remotion/public/audio');
    fs.mkdirSync(publicAudioDir, { recursive: true });

    const voice = VOICE_MAP[language] ?? VOICE_MAP.en;
    const fps = 30;
    let currentFrame = 0;
    const lines = [];

    for (let i = 0; i < rawLines.length; i++) {
      const fileName = `line-${Date.now()}-${i}.mp3`;
      const filePath = path.join(publicAudioDir, fileName);

      await this.generateNarration(rawLines[i].note, filePath, voice);

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

    const outputPath = path.resolve('./rendered-videos', `video-${Date.now()}.mp4`);

    await renderMedia({
      composition: { ...composition, durationInFrames: totalDuration },
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: { lines },
    });

    return outputPath;
  }

  // used by /video/render (manual lines, kept for backward compatibility)
  async renderLecture(rawLines: RawLine[]) {
    return this.renderVideo(rawLines, 'en');
  }

  async renderFromDocument(documentId: number, language: string) {
    const doc = await prisma.document.findUnique({ where: { id: documentId } });
    if (!doc) throw new Error('Document not found');

    const segments = await this.segmentDocument(doc.content, language);
    const outputPath = await this.renderVideo(segments, language);
    return outputPath;
  }
}