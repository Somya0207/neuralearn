import { Injectable } from '@nestjs/common';

export interface Lecture {
  id: number;
  title: string;
  topic: string;
  duration: number;
  difficulty: string;
}

const lectures: Lecture[] = [
  { id: 1, title: 'Recursion: Base Cases & Stack Frames', topic: 'Data Structures', duration: 11, difficulty: 'intermediate' },
  { id: 2, title: 'Graph Traversal: BFS vs DFS', topic: 'Data Structures', duration: 14, difficulty: 'intermediate' },
  { id: 3, title: 'Intro to Dynamic Programming', topic: 'Algorithms', duration: 9, difficulty: 'beginner' },
];

@Injectable()
export class LecturesService {
  findAll(): Lecture[] {
    return lectures;
  }
}