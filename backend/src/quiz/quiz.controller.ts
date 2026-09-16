import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service.js';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get(':topic')
  getQuiz(@Param('topic') topic: string) {
    return this.quizService.getQuiz(topic);
  }

  @Post('submit')
  submitQuiz(@Body() body: { userId: number; topic: string; answers: number[] }) {
    return this.quizService.submitQuiz(body.userId, body.topic, body.answers);
  }

  @Get('mastery/:userId')
  getMastery(@Param('userId') userId: string) {
    return this.quizService.getUserMastery(Number(userId));
  }
}