interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-gray-800/80 bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-800/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white">
              <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-white font-mono text-sm">
                AeroDev &bull; Personal Site
              </span>
              <p className="text-xs text-gray-400">
                Нисэх хүчний IT Engineer &amp; Game Developer
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
            <button
              onClick={() => onNavigate('roadmap')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              10 Жилийн Төлөвлөгөө
            </button>
            <button
              onClick={() => onNavigate('skills')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              3 Гол Чадвар
            </button>
            <button
              onClick={() => onNavigate('gamelab')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              2D Тоглоомын Лаб
            </button>
            <button
              onClick={() => onNavigate('tracker')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Олимпиад &amp; Хичээл
            </button>
            <a
              href="https://glistening-bombolone-d2a5e8.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition-colors font-semibold"
            >
              <span>Netlify Вэбсайт</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} AeroDev Portfolio. Бүх эрх хамгаалагдсан.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-gray-400 font-mono">
              Ойрын зорилго &ldquo;Өөрийн site бүтээх&rdquo; амжилттай биелэв.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
