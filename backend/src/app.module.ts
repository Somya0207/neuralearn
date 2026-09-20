import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LecturesModule } from './lectures/lectures.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ChatModule } from './chat/chat.module.js';
import { VideoModule } from './video/video.module.js';
import { QuizModule } from './quiz/quiz.module.js';
import { DocumentsModule } from './documents/documents.module.js';

@Module({
  imports: [LecturesModule, AuthModule, ChatModule, VideoModule, QuizModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
