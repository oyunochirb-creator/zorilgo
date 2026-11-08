import { MILESTONES } from '../data/portfolioData';

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-16 md:py-24 border-t border-gray-800/80 bg-gray-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Хэсгийн гарчиг */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-mono text-cyan-400">
            <span>FLIGHT PLAN // 10 ЖИЛИЙН ЗАМНАЛ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Миний Төлөвлөгөө ба Алсын Хараа
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            &ldquo;10 жилийн дараа би тоглоом хөгжүүлэгч болон IT талаар сурч дуусна. Үндсэн мэргэжлээрээ 
            нисэх хүчний IT Engineer, хажуугаар нь нарийн дүрийн зураглал, гүн утга санаатай тоглоом бүтээнэ.&rdquo;
          </p>
        </div>

        {/* Timeline Картууд */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((item, index) => {
            const isCurrent = item.status === 'current';
            const isLongTerm = item.status === 'long-term';

            return (
              <div
                key={item.id}
                className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isCurrent
                    ? 'bg-gradient-to-b from-cyan-950/40 to-gray-900 border-2 border-cyan-500/80 shadow-xl shadow-cyan-950/50'
                    : isLongTerm
                    ? 'bg-gradient-to-b from-blue-950/30 to-gray-900 border border-blue-500/40'
                    : 'bg-gray-900/60 border border-gray-800 hover:border-gray-700'
                }`}
              >
                {/* Дээд статус */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                        isCurrent
                          ? 'bg-cyan-500 text-gray-950'
                          : isLongTerm
                          ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                          : 'bg-gray-800 text-gray-300'
                      }`}
                    >
                      {item.period}
                    </span>
                    <span className="text-xs font-mono text-gray-500 font-bold">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Хийх зорилтууд */}
                <div className="pt-4 border-t border-gray-800/80 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider font-mono text-gray-400">
                    Гол алхмууд:
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {item.goals.map((goal, gIdx) => (
                      <li key={gIdx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✦</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
