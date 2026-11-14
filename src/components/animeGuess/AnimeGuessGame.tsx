import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ANIME_LEVELS,
  ANIME_MODES,
  getQuestionsByModeAndLevel,
} from '../../data/animeQuizBank';
import {
  AnimeGamePhase,
  AnimeModeId,
  QuizQuestion,
} from '../../types';
import { addLeaderboardScore } from '../../services/leaderboardStorage';
import { AnimeBattleVisual, AnimeLikeVisual } from './FeedbackVisuals';
import { normalizeOptions, playFeedbackTone, shuffleArray } from './gameUtils';

const QUESTION_SECONDS = 15;
const INITIAL_LIVES = 3;
const FEEDBACK_DURATION_MS = 3000;

function getPointsPerCorrect(level: 1 | 2 | 3 | 4 | 5): number {
  return level * 10;
}

interface PreparedQuestion extends QuizQuestion {
  shuffledOptions: string[];
}

function buildLevelDeck(mode: AnimeModeId, level: 1 | 2 | 3 | 4 | 5): PreparedQuestion[] {
  const rawQuestions = getQuestionsByModeAndLevel(mode, level);
  return shuffleArray(rawQuestions).map((q) => ({
    ...q,
    shuffledOptions: normalizeOptions(q.options, q.answer),
  }));
}

export function AnimeGuessGame() {
  const [phase, setPhase] = useState<AnimeGamePhase>('modes');
  const [selectedMode, setSelectedMode] = useState<AnimeModeId>('character');
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [deck, setDeck] = useState<PreparedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<'correct' | 'wrong' | 'timeout' | null>(null);
  const [questionImgFailed, setQuestionImgFailed] = useState(false);

  const [playerName, setPlayerName] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);
  const [nameError, setNameError] = useState('');

  const pointsPerCorrect = getPointsPerCorrect(selectedLevel);
  const feedbackTimerRef = useRef<number | null>(null);

  const clearFeedbackTimer = useCallback(() => {
    if (feedbackTimerRef.current !== null) {
      window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
  }, []);

  const currentModeMeta = useMemo(
    () => ANIME_MODES.find((m) => m.id === selectedMode) ?? ANIME_MODES[0],
    [selectedMode]
  );

  const currentLevelMeta = useMemo(
    () => ANIME_LEVELS.find((l) => l.level === selectedLevel) ?? ANIME_LEVELS[0],
    [selectedLevel]
  );

  const currentItem = deck[currentIndex] ?? null;

  const selectMode = useCallback(
    (modeId: AnimeModeId) => {
      clearFeedbackTimer();
      setSelectedMode(modeId);
      setPhase('levels');
      setFeedbackState(null);
      setSelectedOption(null);
    },
    [clearFeedbackTimer]
  );

  const startLevel = useCallback(
    (modeId: AnimeModeId, level: 1 | 2 | 3 | 4 | 5) => {
      clearFeedbackTimer();
      const shuffled = buildLevelDeck(modeId, level);
      setSelectedMode(modeId);
      setSelectedLevel(level);
      setDeck(shuffled);
      setCurrentIndex(0);
      setScore(0);
      setLives(INITIAL_LIVES);
      setTimeLeft(QUESTION_SECONDS);
      setAnsweredCount(0);
      setCorrectCount(0);
      setSelectedOption(null);
      setFeedbackState(null);
      setQuestionImgFailed(false);
      setScoreSaved(false);
      setNameError('');
      setPhase('playing');
    },
    [clearFeedbackTimer]
  );

  const goToModes = useCallback(() => {
    clearFeedbackTimer();
    setPhase('modes');
    setFeedbackState(null);
    setSelectedOption(null);
  }, [clearFeedbackTimer]);

  const goToLevels = useCallback(() => {
    clearFeedbackTimer();
    setPhase('levels');
    setFeedbackState(null);
    setSelectedOption(null);
  }, [clearFeedbackTimer]);

  const advanceNext = useCallback(
    (nextLives: number, nextIndex: number, deckLen: number) => {
      clearFeedbackTimer();
      if (nextLives <= 0 || nextIndex >= deckLen) {
        setPhase('gameover');
        setFeedbackState(null);
        return;
      }
      setCurrentIndex(nextIndex);
      setTimeLeft(QUESTION_SECONDS);
      setSelectedOption(null);
      setFeedbackState(null);
      setQuestionImgFailed(false);
      setPhase('playing');
    },
    [clearFeedbackTimer]
  );

  const resolveAnswer = useCallback(
    (choice: string | null, isTimeout = false) => {
      if (phase !== 'playing' || !currentItem) return;

      const isCorrect = !isTimeout && choice === currentItem.answer;
      const earnedPoints = isCorrect ? getPointsPerCorrect(selectedLevel) : 0;
      const nextScore = score + earnedPoints;
      const nextLives = isCorrect ? lives : lives - 1;
      const nextIndex = currentIndex + 1;

      playFeedbackTone(isCorrect);
      setSelectedOption(choice);
      setScore(nextScore);
      setLives(nextLives);
      setAnsweredCount((c) => c + 1);
      if (isCorrect) setCorrectCount((c) => c + 1);
      setFeedbackState(isTimeout ? 'timeout' : isCorrect ? 'correct' : 'wrong');
      setPhase('feedback');

      clearFeedbackTimer();
      feedbackTimerRef.current = window.setTimeout(() => {
        advanceNext(nextLives, nextIndex, deck.length);
      }, FEEDBACK_DURATION_MS);
    },
    [
      advanceNext,
      clearFeedbackTimer,
      currentIndex,
      currentItem,
      deck.length,
      lives,
      phase,
      score,
      selectedLevel,
    ]
  );

  const scrollToLeaderboard = useCallback(() => {
    const el = document.getElementById('leaderboard');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (scoreSaved) return;
    const trimmed = playerName.trim();
    if (!trimmed) {
      setNameError('Тоглогчийн нэрээ оруулна уу.');
      return;
    }

    addLeaderboardScore({
      name: trimmed,
      score,
      game: 'Anime Guess',
      mode: selectedMode,
      modeLabel: `${currentModeMeta.icon} ${currentModeMeta.title}`,
      level: selectedLevel,
    });
    setNameError('');
    setScoreSaved(true);
  };

  // 15-second countdown per question
  useEffect(() => {
    if (phase !== 'playing') return;

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [phase]);

  // Trigger timeout when timer hits 0
  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      resolveAnswer(null, true);
    }
  }, [phase, timeLeft, resolveAnswer]);

  // Keyboard shortcuts 1-4 during active question
  useEffect(() => {
    if (phase !== 'playing' || !currentItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < currentItem.shuffledOptions.length) {
        resolveAnswer(currentItem.shuffledOptions[idx], false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentItem, resolveAnswer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearFeedbackTimer();
  }, [clearFeedbackTimer]);

  const timeRatio = Math.max(0, Math.min(100, (timeLeft / QUESTION_SECONDS) * 100));

  const containerStateBorder =
    feedbackState === 'correct'
      ? 'border-emerald-400 bg-emerald-50/90'
      : feedbackState === 'wrong' || feedbackState === 'timeout'
      ? 'border-rose-400 bg-rose-50/90'
      : 'border-white/90 bg-white/85';

  return (
    <section id="anime-guess" className="py-14 md:py-20 border-t border-white/60 bg-white/25 backdrop-blur-[2px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div className="inline-block px-4 py-2.5 rounded-2xl bg-white/85 border border-white/90 shadow-sm">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Anime Guess
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              12 горим · 5 түвшин (Түвшин 1–5: +10..+50 оноо) · 15 сек · 3 амь
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={scrollToLeaderboard}
              className="px-3.5 py-2 rounded-lg text-xs font-bold text-amber-800 bg-amber-50 border border-amber-300 hover:bg-amber-100 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              🏆 Leaderboard
            </button>
            {phase !== 'modes' && (
              <>
                {(phase === 'playing' || phase === 'feedback' || phase === 'gameover') && (
                  <button
                    type="button"
                    onClick={goToLevels}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white/90 border border-sky-200 hover:border-sky-400 hover:text-slate-950 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Түвшин солих
                  </button>
                )}
                <button
                  type="button"
                  onClick={goToModes}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white/90 border border-sky-200 hover:border-sky-400 hover:text-slate-950 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  Горим солих
                </button>
              </>
            )}
          </div>
        </div>

        <div
          className={`rounded-3xl border-2 backdrop-blur-md transition-colors duration-200 overflow-hidden shadow-xl shadow-sky-900/10 ${containerStateBorder}`}
        >
          {/* Persistent HUD during play & feedback */}
          {(phase === 'playing' || phase === 'feedback') && (
            <div className="border-b border-sky-100 bg-sky-50/85 px-5 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Оноо (+{pointsPerCorrect}/зөв)
                    </span>
                    <span className="text-lg font-bold text-sky-600 font-mono tabular-nums">
                      {score}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">Амь</span>
                    <div className="flex items-center gap-1.5 mt-0.5" aria-label={`Үлдсэн амь: ${lives}`}>
                      {Array.from({ length: INITIAL_LIVES }).map((_, idx) => (
                        <span
                          key={idx}
                          className={`text-base leading-none transition-opacity ${
                            idx < lives ? 'opacity-100' : 'opacity-20 grayscale'
                          }`}
                        >
                          ❤️
                        </span>
                      ))}
                      <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums ml-1">
                        {lives}/{INITIAL_LIVES}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block">Горим · Түвшин</span>
                    <span className="text-xs font-bold text-slate-800 whitespace-nowrap">
                      {currentModeMeta.icon} {currentModeMeta.title} · {currentLevelMeta.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-500 block">Асуулт</span>
                    <span className="text-sm font-mono font-bold text-slate-800 tabular-nums">
                      {Math.min(currentIndex + 1, deck.length)} / {deck.length}
                    </span>
                  </div>

                  <div className="min-w-[76px] text-right">
                    <span className="text-[11px] font-semibold text-slate-500 block">Цаг</span>
                    <span
                      className={`text-xl font-bold font-mono tabular-nums ${
                        timeLeft <= 4
                          ? 'text-rose-600'
                          : timeLeft <= 8
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {timeLeft}с
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 h-1.5 w-full rounded-full bg-sky-200/70 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    timeLeft <= 4
                      ? 'bg-rose-500'
                      : timeLeft <= 8
                      ? 'bg-amber-400'
                      : 'bg-sky-500'
                  }`}
                  style={{ width: `${timeRatio}%` }}
                />
              </div>
            </div>
          )}

          {/* 1. 12-MODE SELECTION */}
          {phase === 'modes' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Ямар горимоор тоглох вэ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Анимэний 12 төрлөөс сонгоод 5 түвшинд тоглоорой.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {ANIME_MODES.map((m, idx) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => selectMode(m.id)}
                    className="group min-h-[92px] p-3.5 rounded-xl bg-white/90 border border-sky-200/90 hover:border-sky-400 hover:bg-sky-50/90 shadow-sm transition-colors text-left flex items-center gap-3.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-500"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-sky-100 border border-sky-200 shrink-0">
                      <img
                        src={m.coverImage}
                        alt={m.coverLabel}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                        <span>{String(idx + 1).padStart(2, '0')}</span>
                        <span aria-hidden="true">{m.icon}</span>
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors truncate">
                        {m.title}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                        {m.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. 5-LEVEL SELECTION (20 QUESTIONS PER LEVEL) */}
          {phase === 'levels' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {currentModeMeta.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {currentModeMeta.title}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {currentModeMeta.subtitle} · Түвшин сонгоно уу (Түвшин бүр 20 асуулт)
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {ANIME_LEVELS.map((lvl) => (
                  <button
                    key={lvl.level}
                    type="button"
                    onClick={() => startLevel(selectedMode, lvl.level)}
                    className="group rounded-xl bg-white/95 border border-sky-200 hover:border-sky-400 hover:bg-sky-50/80 shadow-sm overflow-hidden text-left transition-colors cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-sky-500"
                  >
                    <div className="w-full aspect-[4/3] bg-sky-100 overflow-hidden border-b border-sky-100">
                      <img
                        src={lvl.image}
                        alt={lvl.badge}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <div className="p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                        <span className="text-slate-500 truncate">{lvl.badge}</span>
                        <span className="font-bold text-emerald-700 shrink-0">
                          +{getPointsPerCorrect(lvl.level)} оноо
                        </span>
                      </div>
                      <div className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {lvl.title}
                      </div>
                      <div className="text-xs text-slate-600">{lvl.subtitle}</div>
                      <div className="pt-1 text-xs font-bold text-sky-600">
                        Эхлэх →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. ACTIVE QUESTION VIEW */}
          {phase === 'playing' && currentItem && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="rounded-2xl bg-sky-50/80 border border-sky-200 p-6 flex flex-col items-center justify-center min-h-[210px]">
                {selectedMode === 'emoji' ? (
                  <div className="text-center space-y-3">
                    <div
                      className="text-6xl sm:text-7xl tracking-widest select-none"
                      aria-label="Emoji таавар"
                    >
                      {currentItem.prompt}
                    </div>
                    <p className="text-xs font-medium text-slate-600">
                      Эможиноос анимэний нэрийг таана уу
                    </p>
                  </div>
                ) : (
                  <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-6">
                    {currentItem.image && !questionImgFailed && (
                      <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden bg-white border border-sky-200 shadow-sm shrink-0">
                        <img
                          src={currentItem.image}
                          alt="2020 оноос хойшхи анимэ дүрслэл"
                          referrerPolicy="no-referrer"
                          onError={() => setQuestionImgFailed(true)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className={`space-y-2 ${currentItem.image && !questionImgFailed ? 'text-center sm:text-left' : 'text-center mx-auto'}`}>
                      <span className="text-xs font-mono font-semibold text-sky-700 block">
                        {currentModeMeta.icon} {currentModeMeta.title} · {currentLevelMeta.title}
                      </span>
                      <p className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed">
                        {currentItem.prompt}
                      </p>
                      {currentItem.hint && (
                        <p className="text-xs text-slate-600">{currentItem.hint}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentItem.shuffledOptions.map((option, idx) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => resolveAnswer(option, false)}
                    className="min-h-[50px] px-4 py-3 rounded-xl bg-white border border-sky-200 hover:border-sky-500 hover:bg-sky-50 text-sm font-semibold text-slate-900 text-left flex items-center gap-3 shadow-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-500"
                  >
                    <span className="w-6 h-6 rounded-md bg-sky-100 text-sky-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. 3-SECOND FEEDBACK VIEW */}
          {phase === 'feedback' && currentItem && (
            <div
              className={`p-6 sm:p-8 text-center space-y-5 transition-colors ${
                feedbackState === 'correct'
                  ? 'bg-emerald-50/90'
                  : 'bg-rose-50/90'
              }`}
            >
              {feedbackState === 'correct' ? (
                <>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-extrabold text-emerald-700">
                      ЗӨВ ХАРИУЛТ! +{pointsPerCorrect} ОНОО
                    </h3>
                    <p className="text-sm text-emerald-900">
                      Хариу: <strong className="text-slate-950">{currentItem.answer}</strong>
                    </p>
                  </div>
                  <AnimeLikeVisual />
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-extrabold text-rose-600">
                      {feedbackState === 'timeout' ? 'ЦАГ ДУУСЛАА!' : 'БУРУУ ХАРИУЛТ!'}
                    </h3>
                    <p className="text-sm text-rose-900">
                      Зөв хариу:{' '}
                      <strong className="text-slate-950 underline decoration-rose-400">
                        {currentItem.answer}
                      </strong>
                    </p>
                    {selectedOption && (
                      <p className="text-xs text-rose-700">
                        Таны сонголт: {selectedOption}
                      </p>
                    )}
                  </div>
                  <AnimeBattleVisual />
                </>
              )}

              <div className="max-w-xs mx-auto space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full animate-feedback-bar ${
                      feedbackState === 'correct' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-600 font-mono">
                  Дараагийн асуулт руу шилжиж байна...
                </p>
              </div>
            </div>
          )}

          {/* 5. GAME OVER */}
          {phase === 'gameover' && (
            <div className="p-8 sm:p-10 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {lives <= 0 ? 'Тоглоом дууслаа' : 'Баяр хүргэе! Түвшин дууслаа'}
                </h3>
                <p className="text-sm text-slate-600">
                  {currentModeMeta.icon} {currentModeMeta.title} · {currentLevelMeta.title} ·{' '}
                  {answeredCount} асуултаас {correctCount} зөв
                </p>
              </div>

              <div className="inline-block px-8 py-5 rounded-2xl bg-sky-50 border border-sky-200">
                <span className="text-xs font-semibold text-slate-600 block mb-1">
                  Нийт оноо (Зөв хариулт бүр +{pointsPerCorrect})
                </span>
                <span className="text-4xl font-extrabold text-sky-600 font-mono tabular-nums">
                  {score}
                </span>
              </div>

              {/* Save Score to Leaderboard */}
              <div className="max-w-md mx-auto rounded-2xl bg-sky-50/80 border border-sky-200 p-5 space-y-3 text-left">
                {!scoreSaved ? (
                  <form onSubmit={handleSaveScore} className="space-y-3">
                    <div>
                      <label
                        htmlFor="anime-player-name"
                        className="block text-xs font-bold text-slate-800 mb-1"
                      >
                        Тоглогчийн нэрээ оруулж Leaderboard-д нэмнэ үү
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          id="anime-player-name"
                          type="text"
                          maxLength={30}
                          value={playerName}
                          onChange={(e) => {
                            setPlayerName(e.target.value);
                            if (nameError) setNameError('');
                          }}
                          placeholder="Таны нэр..."
                          className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-sky-200 text-sm text-slate-900 focus:outline-none focus:border-sky-500"
                        />
                        <button
                          type="submit"
                          className="min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Leaderboard-д нэмэх
                        </button>
                      </div>
                      {nameError && (
                        <p className="text-xs font-semibold text-rose-600 mt-1">{nameError}</p>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div>
                      <p className="text-sm font-bold text-emerald-700">
                        ✅ Leaderboard-д амжилттай нэмэгдлээ!
                      </p>
                      <p className="text-xs text-slate-600">
                        {playerName.trim()} · {score} оноо
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={scrollToLeaderboard}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      🏆 Leaderboard харах
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => startLevel(selectedMode, selectedLevel)}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-500/20 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Дахин тоглох
                </button>
                <button
                  type="button"
                  onClick={goToLevels}
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-white text-slate-800 hover:bg-sky-50 border border-sky-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Түвшин солих
                </button>
                <button
                  type="button"
                  onClick={goToModes}
                  className="px-6 py-3 rounded-xl text-sm font-semibold bg-white text-slate-800 hover:bg-sky-50 border border-sky-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Горим солих
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
