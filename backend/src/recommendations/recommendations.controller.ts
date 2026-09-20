import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service.js';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get(':userId')
  getRecommendations(@Param('userId') userId: string) {
    return this.recommendationsService.getRecommendations(Number(userId));
  }
}