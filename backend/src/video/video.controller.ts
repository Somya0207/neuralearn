import { Controller, Post, Body } from '@nestjs/common';
import { VideoService } from './video.service.js';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('render')
  async render(@Body() body: { lines: { code: string; note: string }[] }) {
    const outputPath = await this.videoService.renderLecture(body.lines);
    return { message: 'Video rendered', path: outputPath };
  }

  @Post('from-document')
  async fromDocument(@Body() body: { documentId: number; language: string }) {
    const outputPath = await this.videoService.renderFromDocument(body.documentId, body.language);
    return { message: 'Video generated from document', path: outputPath };
  }
}