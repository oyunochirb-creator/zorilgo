import { useState } from 'react';
import { INITIAL_STUDY_ITEMS } from '../data/portfolioData';
import { StudyItem } from '../types';

export function StudyTracker() {
  const [items, setItems] = useState<StudyItem[]>(INITIAL_STUDY_ITEMS);
  const [newSubject, setNewSubject] = useState('Математик');
  const [newTarget, setNewTarget] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'completed'
              ? 'in_progress'
              : item.status === 'in_progress'
              ? 'completed'
              : 'in_progress';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTarget.trim()) return;

    let type: StudyItem['type'] = 'math';
    if (newSubject.includes('Үндэсний')) type = 'mongolian_script';
    else if (newSubject.includes('хэл')) type = 'mongolian_language';
    else if (newSubject.includes('Код')) type = 'coding';

    const newItem: StudyItem = {
      id: Date.now().toString(),
      subject: newSubject,
      target: newTarget.trim(),
      type,
      status: 'in_progress',
      notes: newNotes.trim() || 'Хичээл зүтгэл гарган амжилт гаргах зорилготой.',
    };

    setItems([newItem, ...items]);
    setNewTarget('');
    setNewNotes('');
    setShowAddModal(false);
  };

  return (
    <section id="tracker" className="py-16 md:py-24 border-t border-gray-800/80 bg-gray-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-mono text-cyan-400">
              <span>ACADEMIC FOCUS // ОЛИМПИАД БА СУРЛАГА</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Математик, Үндэсний бичиг, Монгол хэлний Бэлтгэл
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              IT инженер болон тоглоомын гүн гүнзгий өгүүлэмж бүтээхэд шаардлагатай логик сэтгэлгээ (Математик) 
              болон эх хэлний баялаг сан (Монгол хэл, Үндэсний бичиг)-ийг олимпиадын түвшинд эзэмших төлөвлөгөө.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-gray-950 transition-all shadow-md self-start md:self-auto cursor-pointer"
          >
            <span>+ Шинэ зорилго / сэдэв нэмэх</span>
          </button>
        </div>

        {/* Шинэ зорилго нэмэх Form */}
        {showAddModal && (
          <form
            onSubmit={handleAddItem}
            className="mb-8 p-6 rounded-2xl bg-gray-900 border border-cyan-500/50 space-y-4 max-w-2xl animate-fade-in"
          >
            <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Шинэ хичээлийн зорилго нэмэх
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Хичээл / Чиглэл</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Математик">Математик (Логик, Геометр)</option>
                  <option value="Үндэсний бичиг">Үндэсний бичиг (Уран бичлэг)</option>
                  <option value="Монгол хэл">Монгол хэл (Өгүүлэмж, Дүрийн зохиол)</option>
                  <option value="Код бичих">Код бичих (Game Logic &amp; IT)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Зорилтот сэдэв / Олимпиад</label>
                <input
                  type="text"
                  placeholder="Жишээ: Дүүргийн математикийн олимпиад"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Тэмдэглэл / Ач холбогдол</label>
              <input
                type="text"
                placeholder="Жишээ: Тоглоомын физик тооцоололд ашиглах"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white"
              >
                Болих
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-400 text-gray-950 hover:bg-cyan-300"
              >
                Хадгалах
              </button>
            </div>
          </form>
        )}

        {/* Жагсаалтын картууд */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => {
            const isDone = item.status === 'completed';

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  isDone
                    ? 'bg-gray-900/40 border-gray-800/60 opacity-80'
                    : 'bg-gray-900/90 border-gray-800 hover:border-cyan-900/50 shadow-md'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        item.type === 'math'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : item.type === 'mongolian_script'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : item.type === 'mongolian_language'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}
                    >
                      {item.subject}
                    </span>
                    <span
                      className={`text-[11px] font-mono ${
                        isDone ? 'text-emerald-400' : 'text-cyan-400'
                      }`}
                    >
                      {isDone ? '✓ Биелсэн' : '⏳ Идэвхтэй бэлтгэл'}
                    </span>
                  </div>

                  <h4
                    className={`text-base font-bold text-white leading-snug ${
                      isDone ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {item.target}
                  </h4>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.notes}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStatus(item.id)}
                  title={isDone ? 'Дуусаагүй болгох' : 'Биелсэн гэж тэмдэглэх'}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:text-white hover:border-cyan-500'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isDone ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    )}
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
