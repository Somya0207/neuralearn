import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LecturesModule } from './lectures/lectures.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [LecturesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
