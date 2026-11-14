interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-sky-200/80 bg-white/80 backdrop-blur-md py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="font-mono font-semibold text-slate-800">
          AeroDev · &copy; {new Date().getFullYear()}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
          <a
            href="?tab=anime-guess"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Anime Guess ↗
          </a>
          <a
            href="?tab=leaderboard"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Leaderboard ↗
          </a>
          <a
            href="?tab=2d-game"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            2D Тоглоом ↗
          </a>
          <button
            type="button"
            onClick={() => onNavigate('roadmap')}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Төлөвлөгөө
          </button>
          <button
            type="button"
            onClick={() => onNavigate('skills')}
            className="hover:text-sky-600 transition-colors cursor-pointer"
          >
            Чадвар
          </button>
          <a
            href="https://glistening-bombolone-d2a5e8.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-800 transition-colors"
          >
            Netlify ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
