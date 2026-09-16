import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const LEARNING_RATE = 0.4;

@Injectable()
export class QuizService {
  async getQuiz(topic: string) {
    return prisma.quiz.findMany({ where: { topic } });
  }

  async submitQuiz(userId: number, topic: string, answers: number[]) {
    const questions = await prisma.quiz.findMany({ where: { topic } });

    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    const scorePercent = Math.round((correct / questions.length) * 100);

    const existing = await prisma.mastery.findUnique({
      where: { userId_topic: { userId, topic } },
    });
    const oldScore = existing?.score ?? 0;

    const newScore = Math.round(oldScore + (scorePercent - oldScore) * LEARNING_RATE);

    const mastery = await prisma.mastery.upsert({
      where: { userId_topic: { userId, topic } },
      update: { score: newScore },
      create: { userId, topic, score: newScore },
    });

    return { correct, total: questions.length, scorePercent, mastery };
  }

  async getUserMastery(userId: number) {
    return prisma.mastery.findMany({ where: { userId } });
  }
}