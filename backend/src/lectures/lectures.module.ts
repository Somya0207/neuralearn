import { Module } from '@nestjs/common';
import { LecturesController } from './lectures.controller.js';
import { LecturesService } from './lectures.service.js';

@Module({
  controllers: [LecturesController],
  providers: [LecturesService]
})
export class LecturesModule {}
