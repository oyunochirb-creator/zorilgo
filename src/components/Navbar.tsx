import { useState } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  viewMode?: 'portfolio' | 'anime-guess' | '2d-game' | 'leaderboard';
  onExitStandalone?: () => void;
}

export function Navbar({
  activeSection,
  onNavigate,
  viewMode = 'portfolio',
  onExitStandalone,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStandalone = viewMode !== 'portfolio';

  const portfolioSections = [
    { id: 'roadmap', label: 'Төлөвлөгөө' },
    { id: 'skills', label: 'Чадвар' },
    { id: 'tracker', label: 'Бэлтгэл' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-sky-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => {
            if (isStandalone && onExitStandalone) {
              onExitStandalone();
            } else {
              handleNavClick('hero');
            }
          }}
          className="text-lg font-bold tracking-tight text-slate-900 font-mono whitespace-nowrap shrink-0 cursor-pointer hover:text-sky-600 transition-colors"
        >
          AeroDev
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {!isStandalone &&
            portfolioSections.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer pb-0.5 border-b-2 ${
                  activeSection === item.id
                    ? 'text-sky-600 border-sky-500'
                    : 'text-slate-700 border-transparent hover:text-slate-950 hover:border-sky-300'
                }`}
              >
                {item.label}
              </button>
            ))}

          <a
            href="?tab=anime-guess"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-semibold whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              viewMode === 'anime-guess'
                ? 'text-sky-600 border-sky-500'
                : 'text-slate-700 border-transparent hover:text-sky-700 hover:border-sky-300'
            }`}
          >
            Anime Guess ↗
          </a>
          <a
            href="?tab=2d-game"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-semibold whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              viewMode === '2d-game'
                ? 'text-sky-600 border-sky-500'
                : 'text-slate-700 border-transparent hover:text-sky-700 hover:border-sky-300'
            }`}
          >
            2D Тоглоом ↗
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          {viewMode === 'anime-guess' ? (
            <button
              type="button"
              onClick={() => handleNavClick('leaderboard')}
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              🏆 Leaderboard
            </button>
          ) : (
            <a
              href="?tab=leaderboard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              🏆 Leaderboard ↗
            </a>
          )}

          {isStandalone && onExitStandalone ? (
            <button
              type="button"
              onClick={onExitStandalone}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-white text-slate-800 border border-sky-200 hover:bg-sky-50 shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              ← Портфолио руу
            </button>
          ) : (
            <a
              href="?tab=anime-guess"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-sky-500 text-white hover:bg-sky-600 shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Anime Guess ↗
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-sky-100/80"
          aria-label="Цэс"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-sky-200 px-4 pt-2 pb-4 space-y-1">
          {!isStandalone &&
            portfolioSections.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-800 hover:bg-sky-50 hover:text-sky-700"
              >
                {item.label}
              </button>
            ))}

          <a
            href="?tab=anime-guess"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold text-sky-700 hover:bg-sky-50"
          >
            Anime Guess ↗
          </a>
          <a
            href="?tab=2d-game"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold text-sky-700 hover:bg-sky-50"
          >
            2D Тоглоом ↗
          </a>
          <a
            href="?tab=leaderboard"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold text-amber-700 hover:bg-amber-50"
          >
            🏆 Leaderboard ↗
          </a>

          {isStandalone && onExitStandalone && (
            <button
              type="button"
              onClick={() => {
                onExitStandalone();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold text-slate-800 hover:bg-sky-50"
            >
              ← Портфолио руу
            </button>
          )}
        </div>
      )}
    </header>
  );
}
