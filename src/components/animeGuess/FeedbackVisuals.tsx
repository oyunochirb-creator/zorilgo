export function AnimeLikeVisual() {
  return (
    <div className="relative w-full max-w-[260px] mx-auto aspect-square rounded-2xl overflow-hidden bg-emerald-50 border-2 border-emerald-300 shadow-md flex items-center justify-center">
      <svg
        viewBox="0 0 260 260"
        className="w-full h-full animate-anime-bounce"
        role="img"
        aria-label="Зөв хариулт - Лайк"
      >
        <defs>
          <radialGradient id="likeGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ecfdf5" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="260" height="260" fill="url(#likeGlow)" />

        {/* Sparkles */}
        <g className="animate-sparkle-pop" fill="#f59e0b">
          <polygon points="44,54 48,66 60,70 48,74 44,86 40,74 28,70 40,66" />
          <polygon points="216,42 219,51 228,54 219,57 216,66 213,57 204,54 213,51" />
          <circle cx="212" cy="186" r="5" fill="#10b981" />
          <circle cx="48" cy="176" r="4" fill="#34d399" />
        </g>

        {/* Hair Back */}
        <path d="M62 124 C60 66 196 66 194 124 L204 202 L52 202 Z" fill="#1e1b4b" />

        {/* Outfit / Shoulders */}
        <path d="M58 260 C66 206 96 194 128 194 C160 194 190 206 198 260 Z" fill="#059669" />
        <path d="M104 194 L128 228 L152 194 Z" fill="#ecfdf5" />
        <path d="M120 206 L128 240 L136 206 Z" fill="#f43f5e" />

        {/* Neck */}
        <rect x="116" y="168" width="24" height="32" rx="10" fill="#fed7aa" />

        {/* Face */}
        <path d="M84 114 C84 82 172 82 172 114 C172 156 154 176 128 178 C102 176 84 156 84 114 Z" fill="#ffedd5" />

        {/* Bangs */}
        <path d="M80 118 C82 76 174 76 176 118 L162 104 L148 122 L134 102 L116 122 L100 104 Z" fill="#312e81" />

        {/* Happy Eyes (one wink, one bright eye) */}
        <ellipse cx="107" cy="132" rx="8" ry="9" fill="#0f172a" />
        <circle cx="109" cy="129" r="3" fill="#ffffff" />
        <circle cx="105" cy="135" r="1.5" fill="#34d399" />
        <path d="M138 132 Q148 124 158 132" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />

        {/* Blush */}
        <ellipse cx="97" cy="144" rx="7" ry="4" fill="#fb7185" opacity="0.45" />
        <ellipse cx="159" cy="144" rx="7" ry="4" fill="#fb7185" opacity="0.45" />

        {/* Joyful Smile */}
        <path d="M116 150 Q128 164 140 150 Z" fill="#fb7185" stroke="#881337" strokeWidth="2" />

        {/* Raised Thumbs-Up Hand */}
        <g className="animate-thumb-wave" transform="translate(166, 128)">
          <rect x="14" y="28" width="32" height="34" rx="10" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
          <path d="M22 30 L22 10 C22 2 34 2 34 10 L34 30" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
          <line x1="18" y1="39" x2="42" y2="39" stroke="#fdba74" strokeWidth="2" />
          <line x1="18" y1="49" x2="42" y2="49" stroke="#fdba74" strokeWidth="2" />
        </g>

        {/* LIKE badge */}
        <g transform="translate(168, 72)">
          <rect x="0" y="0" width="64" height="28" rx="8" fill="#10b981" />
          <text x="32" y="19" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800" fontFamily="sans-serif">
            LIKE!
          </text>
        </g>
      </svg>
    </div>
  );
}

export function AnimeBattleVisual() {
  return (
    <div className="relative w-full max-w-[360px] mx-auto aspect-video rounded-2xl overflow-hidden bg-rose-50 border-2 border-rose-300 shadow-md flex items-center justify-center">
      <svg
        viewBox="0 0 360 200"
        className="w-full h-full animate-battle-shake"
        role="img"
        aria-label="Буруу хариулт - Аниме тулаан"
      >
        <defs>
          <radialGradient id="clashBurst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#f43f5e" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="360" height="200" fill="#fff1f2" />

        {/* Dynamic speed lines */}
        <g stroke="#fb7185" strokeWidth="2" opacity="0.35">
          <line x1="0" y1="22" x2="140" y2="90" />
          <line x1="0" y1="68" x2="120" y2="96" />
          <line x1="0" y1="168" x2="135" y2="112" />
          <line x1="360" y1="22" x2="220" y2="90" />
          <line x1="360" y1="74" x2="240" y2="98" />
          <line x1="360" y1="176" x2="225" y2="114" />
        </g>

        {/* Energy Beams */}
        <path d="M58 104 L178 92 L178 108 L58 112 Z" fill="#38bdf8" opacity="0.85" />
        <path d="M302 104 L182 92 L182 108 L302 112 Z" fill="#f43f5e" opacity="0.85" />

        {/* Left Fighter (Cyan aura) */}
        <g className="animate-fighter-left">
          <circle cx="52" cy="86" r="14" fill="#fde68a" />
          <polygon points="38,80 48,62 56,74 66,64 62,82" fill="#0f172a" />
          <path d="M34 102 L68 100 L78 148 L42 152 Z" fill="#0284c7" />
          <path d="M62 104 L96 102 L94 114 L60 116 Z" fill="#fde68a" />
          <path d="M40 150 L24 186 L42 188 L56 154 Z" fill="#0f172a" />
          <path d="M62 150 L84 184 L68 188 L52 154 Z" fill="#0f172a" />
        </g>

        {/* Right Fighter (Crimson aura) */}
        <g className="animate-fighter-right">
          <circle cx="308" cy="86" r="14" fill="#fed7aa" />
          <polygon points="296,82 294,64 306,74 316,60 322,82" fill="#450a0a" />
          <path d="M292 100 L326 102 L318 152 L282 148 Z" fill="#e11d48" />
          <path d="M298 104 L264 102 L266 114 L300 116 Z" fill="#fed7aa" />
          <path d="M320 150 L336 186 L318 188 L304 154 Z" fill="#18181b" />
          <path d="M298 150 L276 184 L292 188 L308 154 Z" fill="#18181b" />
        </g>

        {/* Center Clash Explosion */}
        <g className="animate-clash-pulse">
          <circle cx="180" cy="100" r="56" fill="url(#clashBurst)" />
          <polygon
            points="180,48 192,84 230,78 200,100 226,126 188,116 180,152 172,116 134,126 160,100 130,78 168,84"
            fill="#fef08a"
            stroke="#f97316"
            strokeWidth="2"
          />
          <circle cx="180" cy="100" r="14" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
