import { Controller, Post, Body } from '@nestjs/common';
import { VideoService } from './video.service.js';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('render')
  async render(@Body() body: { lines: { code: string; note: string }[] }) {
    const outputPath = await this.videoService.renderLecture(body.lines);    return { message: 'Video rendered', path: outputPath };
  }
}