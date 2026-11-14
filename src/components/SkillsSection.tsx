import { SKILLS_LIST } from '../data/portfolioData';

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-20 border-t border-white/60 bg-white/25 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="inline-block px-4 py-1.5 rounded-2xl bg-white/80 border border-white/90 shadow-sm text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Гол 3 Чадвар
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SKILLS_LIST.map((skill) => (
            <div
              key={skill.id}
              className="rounded-2xl bg-white/85 backdrop-blur-md border border-white/90 shadow-md shadow-sky-900/5 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-500">
                  <span className="text-sky-600 font-bold">{skill.role}</span>
                  <span>{skill.levelText}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {skill.name}
                </h3>

                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  {skill.description}
                </p>

                <ul className="space-y-1.5 mb-5 text-xs text-slate-700">
                  {skill.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-500 font-bold">·</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-sky-100 text-xs text-slate-500 font-mono">
                {skill.recommendedTools.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
