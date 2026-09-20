import { Controller, Get, Param } from '@nestjs/common';
import { LecturesService } from './lectures.service.js';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Get()
  async findAll() {
    return this.lecturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lecturesService.findOne(Number(id));
  }
}