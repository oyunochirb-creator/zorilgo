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
            item.status === 'completed' ? 'in_progress' : 'completed';
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
      notes: newNotes.trim() || 'Олимпиад ба хичээлийн бэлтгэл.',
    };

    setItems([newItem, ...items]);
    setNewTarget('');
    setNewNotes('');
    setShowAddModal(false);
  };

  return (
    <section id="tracker" className="py-16 md:py-20 border-t border-white/60 bg-white/30 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="inline-block px-4 py-2.5 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Хичээл &amp; Олимпиадын Бэлтгэл
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Математик · Үндэсний бичиг · Монгол хэл · Код
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(!showAddModal)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/20 transition-colors self-start sm:self-auto cursor-pointer whitespace-nowrap"
          >
            + Зорилго нэмэх
          </button>
        </div>

        {showAddModal && (
          <form
            onSubmit={handleAddItem}
            className="mb-8 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-sky-200 shadow-lg space-y-4 max-w-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Хичээл</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-sky-50/70 border border-sky-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                >
                  <option value="Математик">Математик</option>
                  <option value="Үндэсний бичиг">Үндэсний бичиг</option>
                  <option value="Монгол хэл">Монгол хэл</option>
                  <option value="Код бичих">Код бичих</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Зорилго</label>
                <input
                  type="text"
                  placeholder="Олимпиад эсвэл сэдэв"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full bg-sky-50/70 border border-sky-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Тэмдэглэл</label>
              <input
                type="text"
                placeholder="Товч тайлбар"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full bg-sky-50/70 border border-sky-200 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Болих
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-bold bg-sky-500 text-white hover:bg-sky-600 cursor-pointer"
              >
                Хадгалах
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => {
            const isDone = item.status === 'completed';

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border backdrop-blur-md transition-colors flex items-start justify-between gap-4 shadow-md shadow-sky-900/5 ${
                  isDone
                    ? 'bg-white/70 border-emerald-200 opacity-85'
                    : 'bg-white/85 border-white/90'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="text-sky-600 font-bold">{item.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span className={isDone ? 'text-emerald-600 font-semibold' : 'text-slate-500'}>
                      {isDone ? 'Биелсэн' : 'Үргэлжилж байна'}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-bold text-slate-900 leading-snug ${
                      isDone ? 'line-through text-slate-500' : ''
                    }`}
                  >
                    {item.target}
                  </h3>

                  <p className="text-xs text-slate-600">
                    {item.notes}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleStatus(item.id)}
                  aria-label={isDone ? 'Дуусаагүй болгох' : 'Биелсэн болгох'}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-300'
                      : 'bg-sky-50 text-slate-600 border-sky-200 hover:text-sky-700 hover:border-sky-400'
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
