import { useState } from 'react';

interface HeroSectionProps {
  onExplore: (section: string) => void;
}

export function HeroSection({ onExplore }: HeroSectionProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Зүүн талын гол текст ба зорилго */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs text-cyan-300 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span>10 Жилийн Алсын Хараа &bull; Нисэх Хүчин + Game Dev</span>
            </div>

            {/* Үндсэн Том Гарчиг */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Нисэх хүчний <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">IT Engineer</span>
              <br />
              ба <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">Game Developer</span>
            </h1>

            {/* Танилцуулга ба Зорилго */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              10 жилийн дараа би тоглоом хөгжүүлэгч болон IT чиглэлээр сурч дуусна.
              Үндсэн мэргэжлээрээ <strong className="text-white font-semibold">нисэх хүчний IT Engineer</strong>, 
              хажуугаар нь <strong className="text-white font-semibold">дүрийн нарийн зураглал, сонирхолтой утга санаа, нөхцөл</strong> бүхий 
              шилдэг тоглоомууд бүтээнэ.
            </p>

            {/* Хурдан хяналтын карт */}
            <div className="p-4 rounded-xl bg-gray-900/70 border border-gray-800/80 backdrop-blur-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                <span>📍 ОЙРЫН ЗОРИЛГО:</span>
                <span className="text-emerald-400 font-semibold">Хэрэгжиж байна (In Progress)</span>
              </div>
              <p className="text-sm font-medium text-gray-100">
                &ldquo;Өөрийн анхны site-ийг бүтээх, Математик, Үндэсний бичиг, Монгол хэлний олимпиадад амжилт гаргах, 1 жилд 2D/3D тоглоом хөгжүүлэх&rdquo;
              </p>
            </div>

            {/* Миний Netlify дээр байршуулсан сайт руу орох онцлох хэсэг */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/70 via-gray-900 to-blue-950/60 border border-cyan-500/40 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                      ХОЛБООС БУЛАН
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      LIVE
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    glistening-bombolone-d2a5e8.netlify.app
                  </p>
                </div>
              </div>

              <a
                href="https://glistening-bombolone-d2a5e8.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-gray-950 transition-all shadow-md shadow-cyan-400/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>Сайт руу орох</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Товчлуурууд */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onExplore('gamelab')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>🎮 2D Нислэгийн тоглоом тоглох</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={() => onExplore('roadmap')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700/80 hover:border-gray-600 transition-all cursor-pointer"
              >
                <span>10 Жилийн Төлөвлөгөө харах</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-xs font-medium text-gray-400 hover:text-white bg-gray-950/60 border border-gray-800 hover:border-gray-700 transition-all cursor-pointer"
                title="Сайтын линкийг хуулах"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{copiedLink ? 'Хуулагдлаа!' : 'Линк хуулах'}</span>
              </button>
            </div>
          </div>

          {/* Баруун талын интерактив Aviation & Game Dev Dashboard */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-gray-900/90 to-gray-950 border border-cyan-900/40 p-5 shadow-2xl shadow-cyan-950/50 backdrop-blur-md">
              {/* Дээд статус */}
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">
                    Aero-IT Terminal v1.0
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">
                  SYS.ONLINE // 2026-2036
                </span>
              </div>

              {/* Радар симуляци */}
              <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-full border border-cyan-800/50 bg-gray-950 flex items-center justify-center overflow-hidden my-3">
                {/* Радарын цагиргууд */}
                <div className="absolute inset-4 rounded-full border border-cyan-900/40" />
                <div className="absolute inset-12 rounded-full border border-cyan-900/30" />
                <div className="absolute inset-20 rounded-full border border-cyan-900/20" />
                {/* Хөндлөн ба Босоо шугамууд */}
                <div className="absolute w-full h-[1px] bg-cyan-900/30" />
                <div className="absolute h-full w-[1px] bg-cyan-900/30" />

                {/* Эргэлдэх радарын цацраг */}
                <div className="absolute inset-0 animate-radar-sweep pointer-events-none">
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/25 via-cyan-500/5 to-transparent rounded-tl-full origin-bottom-right" />
                </div>

                {/* Онгоцны төв дүрслэл */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                    <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 mt-1">AF-DEV-01</span>
                </div>

                {/* Зорилтот цэгүүд (Blips) */}
                <div className="absolute top-12 right-16 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-[9px] font-mono text-amber-300">2D Game Engine</span>
                </div>
                <div className="absolute bottom-14 left-14 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[9px] font-mono text-emerald-300">Math Olympiad</span>
                </div>
              </div>

              {/* Хүчин зүйлсийн мэдээлэл */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-800/80 text-center font-mono">
                <div className="p-2 rounded bg-gray-900/80 border border-gray-800">
                  <div className="text-[10px] text-gray-400">ЧАДВАР 1</div>
                  <div className="text-xs font-bold text-cyan-400 mt-0.5">Код бичих</div>
                </div>
                <div className="p-2 rounded bg-gray-900/80 border border-gray-800">
                  <div className="text-[10px] text-gray-400">ЧАДВАР 2</div>
                  <div className="text-xs font-bold text-cyan-400 mt-0.5">Site бүтээх</div>
                </div>
                <div className="p-2 rounded bg-gray-900/80 border border-gray-800">
                  <div className="text-[10px] text-gray-400">ЧАДВАР 3</div>
                  <div className="text-xs font-bold text-cyan-400 mt-0.5">Дизайн &amp; Зураг</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
