import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service.js';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('tutor')
  async askTutor(@Body() body: { message: string; lectureContext: string }) {
    const reply = await this.chatService.askTutor(body.message, body.lectureContext);
    return { reply };
  }
}