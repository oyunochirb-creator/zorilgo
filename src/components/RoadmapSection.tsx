import { MILESTONES } from '../data/portfolioData';

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-16 md:py-20 border-t border-white/60 bg-white/30 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="inline-block px-4 py-1.5 rounded-2xl bg-white/80 border border-white/90 shadow-sm text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            10 Жилийн Төлөвлөгөө
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MILESTONES.map((item, index) => {
            const isCurrent = item.status === 'current';
            const isLongTerm = item.status === 'long-term';

            return (
              <div
                key={item.id}
                className={`rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between transition-colors shadow-md shadow-sky-900/5 ${
                  isCurrent
                    ? 'bg-white/90 border-2 border-sky-400'
                    : isLongTerm
                    ? 'bg-white/85 border border-indigo-200'
                    : 'bg-white/80 border border-white/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className={isCurrent ? 'text-sky-600 font-bold' : 'text-slate-500 font-semibold'}>
                      {item.period}
                    </span>
                    <span className="text-slate-400 tabular-nums">0{index + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <ul className="pt-3 border-t border-sky-100 space-y-1.5 text-xs text-slate-700">
                  {item.goals.map((goal, gIdx) => (
                    <li key={gIdx} className="flex items-start gap-2">
                      <span className="text-sky-500 font-bold">·</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
