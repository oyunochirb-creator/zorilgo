import { useState } from 'react';
import { BackgroundBackdrop } from './components/BackgroundBackdrop';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AnimeGuessGame } from './components/animeGuess/AnimeGuessGame';
import { LeaderboardSection } from './components/LeaderboardSection';
import { RoadmapSection } from './components/RoadmapSection';
import { SkillsSection } from './components/SkillsSection';
import { GameLab } from './components/GameLab';
import { StudyTracker } from './components/StudyTracker';
import { Footer } from './components/Footer';

type ViewMode = 'portfolio' | 'anime-guess' | '2d-game' | 'leaderboard';

function getInitialView(): ViewMode {
  if (typeof window === 'undefined') return 'portfolio';
  const tab = new URLSearchParams(window.location.search).get('tab');
  if (tab === 'anime-guess' || tab === '2d-game' || tab === 'leaderboard') {
    return tab;
  }
  return 'portfolio';
}

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>(getInitialView);
  const [activeSection, setActiveSection] = useState(
    viewMode === 'portfolio' ? 'hero' : viewMode
  );

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (viewMode !== 'portfolio') {
      setViewMode('portfolio');
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', window.location.pathname);
      }
      window.setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExitStandalone = () => {
    setViewMode('portfolio');
    setActiveSection('hero');
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 flex flex-col selection:bg-sky-200 selection:text-slate-900">
      <BackgroundBackdrop />
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        viewMode={viewMode}
        onExitStandalone={handleExitStandalone}
      />

      <main className="relative z-10 flex-1">
        {viewMode === 'anime-guess' && (
          <>
            <AnimeGuessGame />
            <LeaderboardSection />
          </>
        )}
        {viewMode === '2d-game' && <GameLab />}
        {viewMode === 'leaderboard' && <LeaderboardSection />}
        {viewMode === 'portfolio' && (
          <>
            <HeroSection />
            <RoadmapSection />
            <SkillsSection />
            <StudyTracker />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
