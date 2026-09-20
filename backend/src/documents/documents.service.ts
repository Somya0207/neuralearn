import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PDFParse } from 'pdf-parse';

const prisma = new PrismaClient();

@Injectable()
export class DocumentsService {
  async uploadPdf(buffer: Buffer, title: string) {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();

    return prisma.document.create({
      data: { title, content: result.text },
    });
  }

  async getDocument(id: number) {
    return prisma.document.findUnique({ where: { id } });
  }

  async listDocuments() {
    return prisma.document.findMany({ select: { id: true, title: true, createdAt: true } });
  }
}