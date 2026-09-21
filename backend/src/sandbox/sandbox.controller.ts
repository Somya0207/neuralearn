import { Controller, Post, Body } from '@nestjs/common';
import { SandboxService } from './sandbox.service.js';

@Controller('sandbox')
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Post('run')
  async run(@Body() body: { language: string; code: string }) {
    return this.sandboxService.runCode(body.language, body.code);
  }
}