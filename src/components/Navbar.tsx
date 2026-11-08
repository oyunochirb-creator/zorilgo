import { useState } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'roadmap', label: '10 жилийн алсын хараа' },
    { id: 'skills', label: '3 Гол чадвар' },
    { id: 'gamelab', label: '2D Тоглоомын Лаб' },
    { id: 'tracker', label: 'Олимпиад & Хичээл' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Лого ба Албан нэр */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 -rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white font-mono">
                AeroDev
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
                Aviation IT
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-none">
              IT Engineer &amp; Game Developer
            </p>
          </div>
        </button>

        {/* Desktop Цэс */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all cursor-pointer ${
                activeSection === item.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Үйлдлийн товч (Desktop) */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="https://glistening-bombolone-d2a5e8.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 hover:bg-gray-800 text-cyan-300 border border-cyan-800/80 hover:border-cyan-500 transition-all cursor-pointer shadow-sm group"
            title="Glistening Bombolone (Netlify) сайт руу зочлох"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
            <span>Netlify Төсөл</span>
            <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <button
            onClick={() => handleNavClick('gamelab')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <span>🎮 2D Тоглоом турших</span>
          </button>
        </div>

        {/* Mobile Hamburger товчлуур */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
          aria-label="Цэс нээх"
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

      {/* Mobile Цэс */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950/95 border-b border-gray-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-gray-800 hover:text-cyan-400"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 space-y-2">
            <a
              href="https://glistening-bombolone-d2a5e8.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold bg-gray-900 border border-cyan-800 text-cyan-300 hover:bg-gray-800"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Netlify Төсөл нээх</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <button
              onClick={() => handleNavClick('gamelab')}
              className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
            >
              🎮 2D Тоглоом турших
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
