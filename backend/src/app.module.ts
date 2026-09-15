import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LecturesModule } from './lectures/lectures.module.js';

@Module({
  imports: [LecturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
