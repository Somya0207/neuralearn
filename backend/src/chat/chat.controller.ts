import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service.js';
import { DocumentsService } from '../documents/documents.service.js';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly documentsService: DocumentsService,
  ) {}

  @Post('tutor')
  async askTutor(@Body() body: { message: string; lectureContext: string }) {
    const reply = await this.chatService.askTutor(body.message, body.lectureContext);
    return { reply };
  }

  @Post('document')
  async askAboutDocument(@Body() body: { message: string; documentId: number }) {
    const doc = await this.documentsService.getDocument(body.documentId);
    if (!doc) {
      return { reply: "I couldn't find that document." };
    }
    const reply = await this.chatService.askAboutDocument(body.message, doc.content);
    return { reply };
  }
}