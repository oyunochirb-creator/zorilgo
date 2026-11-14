import { QuizQuestion } from '../../types';

export type RawTuple = [
  1 | 2 | 3 | 4 | 5,
  string,
  string,
  [string, string, string, string],
  string?
];

export function buildBank(rows: RawTuple[]): QuizQuestion[] {
  return rows.map(([level, prompt, answer, options, image]) => ({
    level,
    prompt,
    answer,
    options,
    ...(image ? { image } : {}),
  }));
}
