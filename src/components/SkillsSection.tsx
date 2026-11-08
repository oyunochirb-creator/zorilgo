import { SKILLS_LIST } from '../data/portfolioData';

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-mono text-cyan-400">
            <span>CORE CAPABILITIES // ХЭРЭГТЭЙ ЧАДВАРУУД</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Эзэмших 3 Гол Чадвар ба Зөвлөмж
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Нисэх хүчний IT системийн өндөр найдвартай ажиллагаа болон нарийн зураглал бүхий 
            шилдэг тоглоом хөгжүүлэхэд дараах 3 чадвар тулгуур багана болно.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILLS_LIST.map((skill) => (
            <div
              key={skill.id}
              className="rounded-2xl bg-gradient-to-b from-gray-900/90 to-gray-950 border border-gray-800 p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Дээд хэсэг */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    {skill.role}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                    {skill.levelText}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {skill.name}
                </h3>

                <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                  {skill.description}
                </p>

                {/* Сэдвүүд */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    Гол суралцах сэдвүүд:
                  </div>
                  <div className="space-y-1.5">
                    {skill.topics.map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Хэрэгслүүд (Tools) */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    Санал болгох хэрэгсэл:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.recommendedTools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-gray-950 text-cyan-300 border border-gray-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Зөвлөмж хайрцаг */}
              <div className="pt-4 border-t border-gray-800/80 bg-cyan-950/20 -mx-6 -mb-6 p-5 rounded-b-2xl border-t border-cyan-900/30">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 text-sm">💡</span>
                  <p className="text-xs text-cyan-200 leading-relaxed font-sans">
                    <strong className="text-white font-medium">Эхлэх зөвлөгөө: </strong>
                    {skill.starterTip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
