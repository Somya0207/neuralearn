import { Controller, Post, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service.js';

interface UploadedPdfFile {
  buffer: Buffer;
  originalname: string;
}

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: UploadedPdfFile) {
    const doc = await this.documentsService.uploadPdf(file.buffer, file.originalname);
    return { id: doc.id, title: doc.title };
  }

  @Get()
  list() {
    return this.documentsService.listDocuments();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.documentsService.getDocument(Number(id));
  }
}