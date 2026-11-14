import { useEffect, useMemo, useState } from 'react';
import { ANIME_MODES } from '../data/animeQuizBank';
import {
  getLeaderboardScores,
  getTopScores,
  LEADERBOARD_UPDATED_EVENT,
} from '../services/leaderboardStorage';
import { LeaderboardEntry, ScoreGameId } from '../types';

const SPORT_MODE_FILTERS = [
  { id: 'all', label: 'Бүгд' },
  { id: 'football', label: '⚽ Хөлбөмбөг' },
  { id: 'basketball', label: '🏀 Сагсан бөмбөг' },
  { id: 'athlete', label: '🏅 Тамирчин' },
];

function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    return date.toLocaleString('mn-MN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

function getRankVisual(rank: number) {
  if (rank === 1) {
    return {
      badge: '🥇 1-р байр',
      cardClass:
        'bg-gradient-to-r from-amber-50 via-yellow-50 to-white border-2 border-amber-400 shadow-md shadow-amber-500/10',
      rankBoxClass: 'bg-amber-400 text-slate-950 font-extrabold',
      scoreClass: 'text-amber-700',
    };
  }
  if (rank === 2) {
    return {
      badge: '🥈 2-р байр',
      cardClass:
        'bg-gradient-to-r from-slate-100 via-white to-white border-2 border-slate-300 shadow-sm',
      rankBoxClass: 'bg-slate-300 text-slate-900 font-extrabold',
      scoreClass: 'text-slate-700',
    };
  }
  if (rank === 3) {
    return {
      badge: '🥉 3-р байр',
      cardClass:
        'bg-gradient-to-r from-orange-50 via-amber-50/40 to-white border-2 border-orange-300 shadow-sm',
      rankBoxClass: 'bg-orange-300 text-slate-950 font-extrabold',
      scoreClass: 'text-orange-700',
    };
  }
  return {
    badge: `#${rank}`,
    cardClass: 'bg-white/90 border border-sky-100 hover:border-sky-300',
    rankBoxClass: 'bg-sky-100 text-sky-800 font-bold',
    scoreClass: 'text-sky-700',
  };
}

export function LeaderboardSection() {
  const [scores, setScores] = useState<LeaderboardEntry[]>(() => getLeaderboardScores());
  const [selectedGame, setSelectedGame] = useState<ScoreGameId>('Anime Guess');
  const [selectedMode, setSelectedMode] = useState<string>('all');

  useEffect(() => {
    const syncScores = () => {
      setScores(getLeaderboardScores());
    };
    window.addEventListener(LEADERBOARD_UPDATED_EVENT, syncScores);
    window.addEventListener('storage', syncScores);
    return () => {
      window.removeEventListener(LEADERBOARD_UPDATED_EVENT, syncScores);
      window.removeEventListener('storage', syncScores);
    };
  }, []);

  const handleSelectGame = (game: ScoreGameId) => {
    setSelectedGame(game);
    setSelectedMode('all');
  };

  const modeTabs = useMemo(() => {
    if (selectedGame === 'Anime Guess') {
      return [
        { id: 'all', label: 'Бүгд' },
        ...ANIME_MODES.map((m) => ({ id: m.id, label: `${m.icon} ${m.title}` })),
      ];
    }
    return SPORT_MODE_FILTERS;
  }, [selectedGame]);

  const topTen = useMemo(
    () => getTopScores(scores, selectedGame, selectedMode),
    [scores, selectedGame, selectedMode]
  );

  return (
    <section
      id="leaderboard"
      className="py-14 md:py-20 border-t border-white/60 bg-white/30 backdrop-blur-[2px]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div className="inline-block px-4 py-2.5 rounded-2xl bg-white/85 border border-white/90 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              🏆 Leaderboard — ТОП 10
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Тоглоом болон горимоор шүүсэн шилдэг 10 тоглогч (их → бага)
            </p>
          </div>

          <div className="inline-flex p-1 bg-white/90 border border-sky-200 rounded-xl shadow-sm self-start sm:self-auto">
            {(['Anime Guess', 'Sport Guess'] as ScoreGameId[]).map((game) => (
              <button
                key={game}
                type="button"
                onClick={() => handleSelectGame(game)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedGame === game
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {game}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border-2 border-white/90 bg-white/85 backdrop-blur-md shadow-xl shadow-sky-900/10 overflow-hidden">
          {/* Mode Filter Tabs */}
          <div className="border-b border-sky-100 bg-sky-50/75 px-5 py-3.5">
            <div className="flex flex-wrap items-center gap-2">
              {modeTabs.map((tab) => {
                const active = selectedMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedMode(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-sky-200 hover:border-sky-400 hover:text-slate-950'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 sm:p-7">
            {topTen.length === 0 ? (
              <div className="py-12 px-4 text-center space-y-2 rounded-2xl bg-sky-50/70 border border-sky-100">
                <div className="text-3xl" aria-hidden="true">
                  🎯
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Одоогоор энэ төрөлд оноо бүртгэгдээгүй байна
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  {selectedGame === 'Anime Guess'
                    ? 'Anime Guess тоглож дуусгаад нэрээ оруулан Leaderboard-д оноогоо нэмээрэй.'
                    : 'Sport Guess тоглоом нэмэгдэхэд оноонууд энд автоматаар харагдана.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {topTen.map((entry, idx) => {
                  const rank = idx + 1;
                  const visual = getRankVisual(rank);

                  return (
                    <div
                      key={entry.id}
                      className={`rounded-2xl px-4 py-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 transition-colors ${visual.cardClass}`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono shrink-0 ${visual.rankBoxClass}`}
                        >
                          {rank <= 3 ? (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉') : rank}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                              {entry.name}
                            </span>
                            {rank <= 3 && (
                              <span className="text-[11px] font-bold text-slate-700 bg-white/80 border border-slate-200 px-2 py-0.5 rounded-md">
                                {visual.badge}
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-slate-600 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            <span className="font-semibold text-sky-700">{entry.modeLabel}</span>
                            {entry.level && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>Түвшин {entry.level}</span>
                              </>
                            )}
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-500">{formatDate(entry.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-auto">
                        <div
                          className={`text-lg sm:text-xl font-extrabold font-mono tabular-nums ${visual.scoreClass}`}
                        >
                          {entry.score}
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase">
                          оноо
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
