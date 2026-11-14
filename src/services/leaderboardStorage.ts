import { LeaderboardEntry, ScoreGameId } from '../types';

const STORAGE_KEY = 'aerodev_leaderboard_scores_v1';
export const LEADERBOARD_UPDATED_EVENT = 'aerodev:leaderboard-updated';

export function getLeaderboardScores(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is LeaderboardEntry =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.score === 'number' &&
        (item.game === 'Anime Guess' || item.game === 'Sport Guess') &&
        typeof item.mode === 'string' &&
        typeof item.createdAt === 'string'
    );
  } catch {
    return [];
  }
}

export function addLeaderboardScore(input: {
  name: string;
  score: number;
  game: ScoreGameId;
  mode: string;
  modeLabel: string;
  level?: number;
}): LeaderboardEntry {
  const cleanName = input.name.trim().slice(0, 30) || 'Зочин тоглогч';
  const entry: LeaderboardEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: cleanName,
    score: Math.max(0, Math.round(input.score)),
    game: input.game,
    mode: input.mode,
    modeLabel: input.modeLabel,
    level: input.level,
    createdAt: new Date().toISOString(),
  };

  const existing = getLeaderboardScores();
  const next = [entry, ...existing];

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(LEADERBOARD_UPDATED_EVENT));
  } catch {
    // Ignore storage quota errors gracefully
  }

  return entry;
}

export function getTopScores(
  scores: LeaderboardEntry[],
  game: ScoreGameId,
  modeFilter: string
): LeaderboardEntry[] {
  return scores
    .filter((entry) => {
      if (entry.game !== game) return false;
      if (modeFilter !== 'all' && entry.mode !== modeFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 10);
}
