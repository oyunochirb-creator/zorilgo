export interface Milestone {
  id: string;
  period: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming' | 'long-term';
  description: string;
  goals: string[];
  icon: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  role: string;
  levelText: string;
  progress: number;
  description: string;
  topics: string[];
  recommendedTools: string[];
  starterTip: string;
}

export interface StudyItem {
  id: string;
  subject: string;
  target: string;
  type: 'math' | 'mongolian_script' | 'mongolian_language' | 'coding';
  status: 'completed' | 'in_progress' | 'planned';
  notes: string;
}

export type AnimeModeId =
  | 'character'
  | 'power'
  | 'ability'
  | 'emoji'
  | 'quote'
  | 'appearance'
  | 'battle'
  | 'personality'
  | 'story'
  | 'comparison'
  | 'villain'
  | 'opening';

export interface AnimeModeMeta {
  id: AnimeModeId;
  icon: string;
  title: string;
  subtitle: string;
  coverImage: string;
  coverLabel: string;
}

export interface QuizQuestion {
  level: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  hint?: string;
  image?: string;
  answer: string;
  options: string[];
}

export type AnimeGamePhase = 'modes' | 'levels' | 'playing' | 'feedback' | 'gameover';

export type ScoreGameId = 'Anime Guess' | 'Sport Guess';

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  game: ScoreGameId;
  mode: string;
  modeLabel: string;
  level?: number;
  createdAt: string;
}

