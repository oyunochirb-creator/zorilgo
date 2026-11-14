export function HeroSection() {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-lg shadow-sky-900/10 p-6 sm:p-8">
            <p className="text-xs font-mono font-semibold text-sky-700">
              10 жилийн зорилго · Нисэх хүчин · Game Dev
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Нисэх хүчний{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">
                IT Engineer
              </span>{' '}
              &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">
                Game Developer
              </span>
            </h1>

            <p className="text-base text-slate-700 max-w-xl leading-relaxed">
              Нисэхийн IT систем хариуцаж, нарийн дүрслэл, гүн өгүүлэмжтэй тоглоом бүтээх миний хувийн талбар.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="?tab=anime-guess"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-bold text-sm bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-500/20 transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
              >
                Anime Guess тоглох ↗
              </a>

              <a
                href="?tab=2d-game"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-semibold text-sm bg-white hover:bg-sky-50 text-slate-800 border border-sky-200 transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5"
              >
                2D Тоглоом ↗
              </a>

              <a
                href="?tab=leaderboard"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl text-sm font-bold text-amber-800 hover:bg-amber-100 border border-amber-300 bg-amber-50 transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
              >
                🏆 Leaderboard ↗
              </a>

              <a
                href="https://glistening-bombolone-d2a5e8.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl text-sm font-semibold text-sky-700 hover:text-sky-900 border border-sky-200 hover:border-sky-400 bg-sky-50/80 transition-colors whitespace-nowrap"
              >
                Netlify Төсөл ↗
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-lg shadow-sky-900/10 p-5">
              <div className="relative w-full aspect-square max-w-[270px] mx-auto rounded-full border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-4 rounded-full border border-sky-300/60" />
                <div className="absolute inset-12 rounded-full border border-sky-300/50" />
                <div className="absolute inset-20 rounded-full border border-sky-300/40" />
                <div className="absolute w-full h-[1px] bg-sky-300/60" />
                <div className="absolute h-full w-[1px] bg-sky-300/60" />

                <div className="absolute inset-0 animate-radar-sweep pointer-events-none">
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-sky-400/35 via-sky-300/10 to-transparent rounded-tl-full origin-bottom-right" />
                </div>

                <div className="relative z-10 w-10 h-10 rounded-full bg-white border border-sky-400 shadow-sm flex items-center justify-center text-sky-600">
                  <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-sky-100 text-center font-mono text-xs font-semibold">
                <div className="p-2 rounded-lg bg-sky-50 text-sky-700">Код</div>
                <div className="p-2 rounded-lg bg-sky-50 text-sky-700">Вэб</div>
                <div className="p-2 rounded-lg bg-sky-50 text-sky-700">Дизайн</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
