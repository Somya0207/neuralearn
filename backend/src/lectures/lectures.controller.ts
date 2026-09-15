import { Controller, Get } from '@nestjs/common';
import { LecturesService } from './lectures.service.js';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Get()
  findAll() {
    return this.lecturesService.findAll();
  }
}