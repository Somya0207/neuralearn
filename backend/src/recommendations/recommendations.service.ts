import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function difficultyLevel(mastery: number): string {
  if (mastery < 34) return 'beginner';
  if (mastery < 70) return 'intermediate';
  return 'advanced';
}

@Injectable()
export class RecommendationsService {
  async getRecommendations(userId: number) {
    const [lectures, masteryRows] = await Promise.all([
      prisma.lecture.findMany(),
      prisma.mastery.findMany({ where: { userId } }),
    ]);

    const masteryMap = new Map(masteryRows.map((m) => [m.topic, m.score]));

    const scored = lectures.map((lecture) => {
      const currentMastery = masteryMap.get(lecture.topic);
      const hasNeverTried = currentMastery === undefined;
      const mastery = currentMastery ?? 0;

      // Signal 1: mastery gap — struggling/unattempted topics score higher
      const gapScore = 100 - mastery;

      // Signal 2: difficulty match — recommend content matched to current level
      const targetLevel = difficultyLevel(mastery);
      const difficultyBonus = lecture.difficulty === targetLevel ? 25 : 0;

      // Signal 3: exploration — nudge toward never-attempted topics
      const explorationBonus = hasNeverTried ? 15 : 0;

      const totalScore = gapScore + difficultyBonus + explorationBonus;

      let reason = `Builds on your ${Math.round(mastery)}% mastery in ${lecture.topic}`;
      if (hasNeverTried) reason = `New topic — you haven't started ${lecture.topic} yet`;
      else if (difficultyBonus > 0) reason = `Matches your current level in ${lecture.topic}`;

      return { ...lecture, score: totalScore, reason };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 3);
  }
}