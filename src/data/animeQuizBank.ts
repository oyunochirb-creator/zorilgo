import rawData from './data.json';
import { AnimeModeId, AnimeModeMeta, QuizQuestion } from '../types';
import { CHARACTER_QUESTIONS } from './modes/character';
import { POWER_QUESTIONS } from './modes/power';
import { ABILITY_QUESTIONS } from './modes/ability';
import { QUOTE_QUESTIONS } from './modes/quote';
import { APPEARANCE_QUESTIONS } from './modes/appearance';
import { BATTLE_QUESTIONS } from './modes/battle';
import { PERSONALITY_QUESTIONS } from './modes/personality';
import { STORY_QUESTIONS } from './modes/story';
import { COMPARISON_QUESTIONS } from './modes/comparison';
import { VILLAIN_QUESTIONS } from './modes/villain';
import { OPENING_QUESTIONS } from './modes/opening';

export interface LevelMeta {
  level: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

interface DataJsonShape {
  modes: AnimeModeMeta[];
  levels: LevelMeta[];
  emojiQuestions: Array<{
    level: 1 | 2 | 3 | 4 | 5;
    emoji: string;
    answer: string;
    options: string[];
  }>;
}

const typedJson = rawData as DataJsonShape;

export const ANIME_MODES: AnimeModeMeta[] = typedJson.modes;
export const ANIME_LEVELS: LevelMeta[] = typedJson.levels;

const EMOJI_QUESTIONS: QuizQuestion[] = typedJson.emojiQuestions.map((q) => ({
  level: q.level,
  prompt: q.emoji,
  answer: q.answer,
  options: q.options,
}));

const MODE_BANKS: Record<AnimeModeId, QuizQuestion[]> = {
  character: CHARACTER_QUESTIONS,
  power: POWER_QUESTIONS,
  ability: ABILITY_QUESTIONS,
  emoji: EMOJI_QUESTIONS,
  quote: QUOTE_QUESTIONS,
  appearance: APPEARANCE_QUESTIONS,
  battle: BATTLE_QUESTIONS,
  personality: PERSONALITY_QUESTIONS,
  story: STORY_QUESTIONS,
  comparison: COMPARISON_QUESTIONS,
  villain: VILLAIN_QUESTIONS,
  opening: OPENING_QUESTIONS,
};

export function getQuestionsByModeAndLevel(
  mode: AnimeModeId,
  level: 1 | 2 | 3 | 4 | 5
): QuizQuestion[] {
  return MODE_BANKS[mode].filter((q) => q.level === level);
}
