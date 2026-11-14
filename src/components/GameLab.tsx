import { useEffect, useRef, useState } from 'react';

interface GameObject {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

interface TargetItem extends GameObject {
  type: 'data' | 'star' | 'cloud';
  points: number;
}

interface Bullet {
  x: number;
  y: number;
  speed: number;
}

export function GameLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [altitude, setAltitude] = useState(1200);
  const [health, setHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [activeTab, setActiveTab] = useState<'game' | 'code_explained'>('game');

  // Хянагч хувьсагчууд (ref дээр хадгалж 60fps loop-д асуудалгүй ажиллуулна)
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const playerRef = useRef({
    x: 100,
    y: 200,
    vx: 0,
    vy: 0,
    width: 36,
    height: 24,
    speed: 5,
  });
  const targetsRef = useRef<TargetItem[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const starsBgRef = useRef<{ x: number; y: number; speed: number; size: number }[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);

  // Background stars бэлдэх
  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 45; i++) {
      stars.push({
        x: Math.random() * 800,
        y: Math.random() * 400,
        speed: 1 + Math.random() * 2.5,
        size: 1 + Math.random() * 2,
      });
    }
    starsBgRef.current = stars;
  }, []);

  const startGame = () => {
    setScore(0);
    setAltitude(1200);
    setHealth(100);
    setGameOver(false);
    setIsPlaying(true);

    playerRef.current = {
      x: 80,
      y: 180,
      vx: 0,
      vy: 0,
      width: 36,
      height: 24,
      speed: 4.5,
    };
    targetsRef.current = [];
    bulletsRef.current = [];
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key === ' ' && isPlaying && !gameOver) {
        // Сум / Дохио харвах
        e.preventDefault();
        bulletsRef.current.push({
          x: playerRef.current.x + 35,
          y: playerRef.current.y,
          speed: 8,
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, gameOver]);

  // Main 60fps Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localHealth = health;
    let localScore = score;
    let localAltitude = altitude;

    const gameLoop = (timestamp: number) => {
      const keys = keysRef.current;
      const player = playerRef.current;

      // 1. Тоглогчийн хөдөлгөөн (W/A/S/D эсвэл Сумнууд)
      if (keys['arrowup'] || keys['w']) player.y -= player.speed;
      if (keys['arrowdown'] || keys['s']) player.y += player.speed;
      if (keys['arrowleft'] || keys['a']) player.x -= player.speed;
      if (keys['arrowright'] || keys['d']) player.x += player.speed;

      // Дэлгэцийн хил хязгаарыг шалгах (Clamp within canvas)
      if (player.x < 15) player.x = 15;
      if (player.x > canvas.width - 50) player.x = canvas.width - 50;
      if (player.y < 20) player.y = 20;
      if (player.y > canvas.height - 25) player.y = canvas.height - 25;

      // Өндөр аажмаар нэмэгдэнэ
      localAltitude += 0.5;
      setAltitude(Math.floor(localAltitude));

      // 2. Объект үүсгэх (Spawn Targets: Өгөгдөл, Од, Саад)
      if (timestamp - lastSpawnRef.current > 750) {
        lastSpawnRef.current = timestamp;
        const rand = Math.random();
        let type: 'data' | 'star' | 'cloud' = 'data';
        let points = 20;

        if (rand < 0.45) {
          type = 'data'; // IT өгөгдлийн багц
          points = 25;
        } else if (rand < 0.75) {
          type = 'star'; // Урамшууллын од
          points = 50;
        } else {
          type = 'cloud'; // Саад (аянгат үүл)
          points = -15;
        }

        targetsRef.current.push({
          x: canvas.width + 20,
          y: 30 + Math.random() * (canvas.height - 60),
          radius: type === 'cloud' ? 22 : 12,
          speed: 2 + Math.random() * 2.5,
          type,
          points,
        });
      }

      // 3. Сумны хөдөлгөөн
      bulletsRef.current.forEach((b) => {
        b.x += b.speed;
      });
      bulletsRef.current = bulletsRef.current.filter((b) => b.x < canvas.width + 20);

      // 4. Гэгээлэг цэнхэр тэнгэрийн дэвсгэр зурах
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#0284c7');
      skyGrad.addColorStop(1, '#bae6fd');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 5. Тэнгэрийн цагаан үүл/од гүйх арын дэвсгэр
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      starsBgRef.current.forEach((star) => {
        star.x -= star.speed;
        if (star.x < 0) star.x = canvas.width;
        ctx.fillRect(star.x, star.y, star.size * 2, star.size);
      });

      // 6. Объектууд ба мөргөлдөөн (Collision detection)
      for (let i = targetsRef.current.length - 1; i >= 0; i--) {
        const item = targetsRef.current[i];
        item.x -= item.speed;

        // Тоглогч ба зорилтот объектын хоорондох зай
        const dx = player.x + 15 - item.x;
        const dy = player.y - item.y;
        const dist = Math.hypot(dx, dy);

        // Мөргөлдөөн болсон эсэх
        if (dist < item.radius + 14) {
          if (item.type === 'cloud') {
            localHealth -= 20;
            setHealth(localHealth);
            if (localHealth <= 0) {
              setGameOver(true);
              setIsPlaying(false);
              return;
            }
          } else {
            localScore += item.points;
            setScore(localScore);
          }
          targetsRef.current.splice(i, 1);
          continue;
        }

        // Сум үүл эсвэл саадыг устгах
        for (let bIdx = bulletsRef.current.length - 1; bIdx >= 0; bIdx--) {
          const bullet = bulletsRef.current[bIdx];
          const bDist = Math.hypot(bullet.x - item.x, bullet.y - item.y);
          if (bDist < item.radius + 5) {
            localScore += 15;
            setScore(localScore);
            bulletsRef.current.splice(bIdx, 1);
            targetsRef.current.splice(i, 1);
            break;
          }
        }

        // Дэлгэцээс гарсан объектыг цэвэрлэх
        if (item.x < -30) {
          targetsRef.current.splice(i, 1);
        }
      }

      // 7. Зураглал: Объектуудыг зурах
      targetsRef.current.forEach((item) => {
        if (item.type === 'data') {
          // Ногоон өгөгдлийн багц (Data Packet)
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#022c22';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('DATA', item.x, item.y);
        } else if (item.type === 'star') {
          // Алтан шар од
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('★', item.x, item.y);
        } else {
          // Аянгат үүл (Саад)
          ctx.fillStyle = '#64748b';
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
          ctx.arc(item.x - 10, item.y + 4, item.radius * 0.75, 0, Math.PI * 2);
          ctx.arc(item.x + 10, item.y + 4, item.radius * 0.75, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#f87171';
          ctx.font = '10px monospace';
          ctx.fillText('⚡', item.x - 4, item.y + 3);
        }
      });

      // 8. Сумнуудыг зурах
      ctx.fillStyle = '#06b6d4';
      bulletsRef.current.forEach((b) => {
        ctx.fillRect(b.x, b.y - 2, 10, 4);
      });

      // 9. Нисэх онгоц (Тоглогч)-ийг зурах (Custom Vector Aircraft)
      ctx.save();
      ctx.translate(player.x, player.y);

      // Хөдөлгүүрийн тийрэлтэт дөл
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(-16, -2);
      ctx.lineTo(-24 - Math.random() * 8, 0);
      ctx.lineTo(-16, 2);
      ctx.closePath();
      ctx.fill();

      // Их бие
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(18, 0); // Хамар
      ctx.lineTo(-14, -8); // Зүүн далавчны эхлэл
      ctx.lineTo(-8, 0);
      ctx.lineTo(-14, 8); // Баруун далавчны эхлэл
      ctx.closePath();
      ctx.fill();

      // Шилэн кабин (Cockpit)
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.ellipse(2, 0, 6, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Сүүлний далавч
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(-12, -4);
      ctx.lineTo(-18, -12);
      ctx.lineTo(-8, -4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, gameOver]);

  return (
    <section id="gamelab" className="py-16 md:py-20 border-t border-white/60 bg-white/25 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-4xl mx-auto mb-8">
          <div className="inline-block px-4 py-2.5 rounded-2xl bg-white/80 border border-white/90 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              2D Нислэгийн Тоглоом
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              W/A/S/D эсвэл сумаар жолоодож, Space-ээр буудна.
            </p>
          </div>

          <div className="inline-flex p-1 bg-white/85 border border-sky-200 rounded-xl shadow-sm self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('game')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'game'
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Тоглох
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code_explained')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'code_explained'
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Кодын бүтэц
            </button>
          </div>
        </div>

        {activeTab === 'game' ? (
          <div className="max-w-4xl mx-auto">
            {/* Тоглоомын Хяналтын Самбар (HUD) */}
            <div className="bg-white/85 backdrop-blur-md border border-sky-200 rounded-t-2xl px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 font-mono shadow-sm">
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">ОНОО</span>
                  <span className="text-lg font-bold text-sky-600">{score} PTS</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">НИСЛЭГИЙН ӨНДӨР</span>
                  <span className="text-lg font-bold text-emerald-600">{altitude} M</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">СИСТЕМИЙН БАТ БЭХ (HP)</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 h-2.5 bg-sky-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-200 ${
                          health > 50
                            ? 'bg-sky-500'
                            : health > 25
                            ? 'bg-amber-400'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.max(0, health)}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{health}%</span>
                  </div>
                </div>
              </div>

              {!isPlaying && !gameOver && (
                <button
                  onClick={startGame}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-500 text-white hover:bg-sky-600 transition-all cursor-pointer shadow-sm"
                >
                  🚀 НИСЛЭГИЙГ ЭХЛҮҮЛЭХ
                </button>
              )}

              {gameOver && (
                <button
                  onClick={startGame}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all cursor-pointer"
                >
                  🔄 ДАХИН НИСЭХ
                </button>
              )}
            </div>

            {/* Canvas Дэлгэц */}
            <div className="relative bg-gradient-to-b from-sky-500 to-sky-200 border-x border-b border-sky-200 rounded-b-2xl overflow-hidden shadow-xl">
              <canvas
                ref={canvasRef}
                width={800}
                height={380}
                className="w-full h-[280px] sm:h-[380px] block"
              />

              {/* Start overlay */}
              {!isPlaying && !gameOver && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-600 mb-4">
                    <svg className="w-8 h-8 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                    AeroStrike 2D: Flight &amp; Data Interceptor
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                    Нисэх хүчний агаарын хөлгийг жолоодон IT мэдээллийн багцуудыг цуглуулж, саадыг цэвэрлээрэй.
                  </p>
                  <button
                    onClick={startGame}
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-sky-500 text-white hover:bg-sky-600 cursor-pointer shadow-md"
                  >
                    ▶ НИСЛЭГ ЭХЛҮҮЛЭХ
                  </button>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-600">
                    <span>🎮 W / A / S / D эсвэл Сумнууд: Залах</span>
                    <span>⚡ Зай авах товч (Space): Дохио харвах</span>
                  </div>
                </div>
              )}

              {/* Game Over overlay */}
              {gameOver && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-3xl mb-2">💥</span>
                  <h3 className="text-2xl font-bold text-rose-600 mb-1">
                    СИСТЕМИЙН ХОЛБОО ТАСРАВ!
                  </h3>
                  <p className="text-slate-700 text-sm mb-4">
                    Таны цуглуулсан оноо: <strong className="text-sky-600">{score} PTS</strong> | Өндөр: <strong className="text-emerald-600">{altitude} метр</strong>
                  </p>
                  <button
                    onClick={startGame}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm bg-sky-500 text-white hover:bg-sky-600 cursor-pointer"
                  >
                    🔄 Дахин оролдох
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Touch удирдлага */}
            {isPlaying && !gameOver && (
              <div className="md:hidden grid grid-cols-3 gap-2 mt-4 p-3 bg-white/85 border border-sky-200 rounded-xl shadow-sm">
                <button
                  onMouseDown={() => (keysRef.current['arrowup'] = true)}
                  onMouseUp={() => (keysRef.current['arrowup'] = false)}
                  onTouchStart={() => (keysRef.current['arrowup'] = true)}
                  onTouchEnd={() => (keysRef.current['arrowup'] = false)}
                  className="col-start-2 p-3 bg-sky-100 rounded-lg text-center text-slate-900 active:bg-sky-500 active:text-white font-bold"
                >
                  ▲ Дээш
                </button>
                <div className="col-span-3 flex justify-between gap-2">
                  <button
                    onMouseDown={() => (keysRef.current['arrowleft'] = true)}
                    onMouseUp={() => (keysRef.current['arrowleft'] = false)}
                    onTouchStart={() => (keysRef.current['arrowleft'] = true)}
                    onTouchEnd={() => (keysRef.current['arrowleft'] = false)}
                    className="flex-1 p-3 bg-sky-100 rounded-lg text-center text-slate-900 active:bg-sky-500 active:text-white font-bold"
                  >
                    ◀ Зүүн
                  </button>
                  <button
                    onClick={() => {
                      bulletsRef.current.push({
                        x: playerRef.current.x + 35,
                        y: playerRef.current.y,
                        speed: 8,
                      });
                    }}
                    className="flex-1 p-3 bg-sky-500 text-white rounded-lg text-center font-bold active:scale-95"
                  >
                    ⚡ Буудах
                  </button>
                  <button
                    onMouseDown={() => (keysRef.current['arrowright'] = true)}
                    onMouseUp={() => (keysRef.current['arrowright'] = false)}
                    onTouchStart={() => (keysRef.current['arrowright'] = true)}
                    onTouchEnd={() => (keysRef.current['arrowright'] = false)}
                    className="flex-1 p-3 bg-sky-100 rounded-lg text-center text-slate-900 active:bg-sky-500 active:text-white font-bold"
                  >
                    Баруун ▶
                  </button>
                </div>
                <button
                  onMouseDown={() => (keysRef.current['arrowdown'] = true)}
                  onMouseUp={() => (keysRef.current['arrowdown'] = false)}
                  onTouchStart={() => (keysRef.current['arrowdown'] = true)}
                  onTouchEnd={() => (keysRef.current['arrowdown'] = false)}
                  className="col-start-2 p-3 bg-sky-100 rounded-lg text-center text-slate-900 active:bg-sky-500 active:text-white font-bold"
                >
                  ▼ Доош
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Кодын тайлбар хэсэг (Game Engine Explanation) */
          <div className="max-w-4xl mx-auto rounded-2xl bg-white/85 backdrop-blur-md border border-white/90 shadow-lg p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-sky-500">💡</span> Тоглоом хөгжүүлэгчид зориулсан кодын бүтэц
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Энэхүү 2D мини тоглоом нь мэргэжлийн тоглоомын хөдөлгүүрүүд (Unity, Godot, Unreal)-ийн 
              ажилладаг үндсэн 4 зарчмаар бүтээгдсэн:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200">
                <span className="text-xs font-mono text-sky-700 font-bold block mb-1">
                  1. GAME LOOP (requestAnimationFrame)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Секундэд 60 удаа дэлгэцийг шинэчилж, тоглогчийн байрлалыг шинэчлэн зурах давталт.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200">
                <span className="text-xs font-mono text-sky-700 font-bold block mb-1">
                  2. ВЕКТОР &amp; ХӨДӨЛГӨӨНИЙ ФИЗИК
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Математикийн координат: <code className="text-sky-700 font-semibold">x += vx, y += vy</code>. 
                  Математикийн олимпиадад сурдаг геометр энд бодитоор ажилладаг!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200">
                <span className="text-xs font-mono text-sky-700 font-bold block mb-1">
                  3. COLLISION DETECTION (Мөргөлдөөн)
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Хоёр цэгийн хоорондох зайг Пифагорын теоремоор тооцоолно: <code className="text-sky-700 font-semibold">dist = Math.hypot(dx, dy)</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200">
                <span className="text-xs font-mono text-sky-700 font-bold block mb-1">
                  4. CANVAS 2D GRAPHICS
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Вектор шугамаар онгоцны их бие, сүүл, галыг дүрслэн зурсан. Цаашид sprite зураг оруулж болно.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
