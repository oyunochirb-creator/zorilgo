import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoadmapSection } from './components/RoadmapSection';
import { SkillsSection } from './components/SkillsSection';
import { GameLab } from './components/GameLab';
import { StudyTracker } from './components/StudyTracker';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* 1. Навигацийн дээд мөр */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="flex-1">
        {/* 2. Нүүр танилцуулга ба Радар терминал */}
        <HeroSection onExplore={handleNavigate} />

        {/* 3. 10 жилийн алсын хараа ба ойрын зорилтуудын Roadmap */}
        <RoadmapSection />

        {/* 4. Хэрэгтэй 3 үндсэн чадварын дэлгэрэнгүй зөвлөгөө */}
        <SkillsSection />

        {/* 5. 2D Тоглоомын Лаборатори (Бодит тоглож болох тоглоом + код тайлбар) */}
        <GameLab />

        {/* 6. Олимпиад ба Хичээлийн бэлтгэл тэмдэглэгч */}
        <StudyTracker />
      </main>

      {/* 7. Хөл хэсэг */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
