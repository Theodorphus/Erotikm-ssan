/**
 * Fröken Snusk – stiliserad siluett i neon-stil (Johans önskemål 2026-07-03).
 * Balaklava med flätor + glödande ögonspringa = hennes ikoniska look, i en
 * självsäker hands-on-hips-pose. Ren vektor: skalar till både hero och
 * tryckt poster utan kvalitetsförlust, och kräver ingen pressbild.
 */
export function FrokenSnuskSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 660"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        {/* Neon-glöd bakom hela figuren */}
        <filter id="fs-glow" x="-40%" y="-20%" width="180%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#E11D74" floodOpacity="0.55" />
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F25CA2" floodOpacity="0.6" />
        </filter>
        {/* Ögonspringan */}
        <linearGradient id="fs-eyes" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F25CA2" />
          <stop offset="50%" stopColor="#FFD1E6" />
          <stop offset="100%" stopColor="#F25CA2" />
        </linearGradient>
        {/* Rim-light på figurkanten */}
        <linearGradient id="fs-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F25CA2" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#E11D74" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#E11D74" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <g filter="url(#fs-glow)">
        <g fill="#08080B" stroke="url(#fs-rim)" strokeWidth="2.5" strokeLinejoin="round">
          {/* Flätor (hänger ur balaklavan) */}
          <path d="M162 108 C142 136 134 174 142 212 C144 224 138 232 134 244 L150 250 C156 236 152 226 154 214 C148 180 156 146 176 120 Z" />
          <path d="M238 108 C258 136 266 174 258 212 C256 224 262 232 266 244 L250 250 C244 236 248 226 246 214 C252 180 244 146 224 120 Z" />

          {/* Huvud i balaklava */}
          <path d="M200 38 C232 38 250 62 250 92 C250 118 232 138 200 138 C168 138 150 118 150 92 C150 62 168 38 200 38 Z" />

          {/* Kropp: hands-on-hips, timglas, klack */}
          <path
            fillRule="evenodd"
            d="M200 134
               C214 134 226 138 232 144
               C260 154 282 176 290 208
               C296 230 292 248 280 262
               C270 274 258 288 252 304
               L246 318
               C258 336 264 356 258 382
               C250 416 240 448 234 476
               C230 498 228 522 226 548
               C225 572 224 588 223 602
               L238 612 L216 618 L210 604
               C209 584 208 560 208 536
               C207 504 205 472 200 448
               C195 472 193 504 192 536
               C192 560 191 584 190 604
               L184 618 L162 612 L177 602
               C176 588 175 572 174 548
               C172 522 170 498 166 476
               C160 448 150 416 142 382
               C136 356 142 336 154 318
               L148 304
               C142 288 130 274 120 262
               C108 248 104 230 110 208
               C118 176 140 154 168 144
               C174 138 186 134 200 134
               Z
               M232 252
               C244 240 252 226 250 210
               C246 226 240 240 228 250
               C222 262 218 274 220 284
               C224 272 228 262 232 252 Z
               M168 252
               C156 240 148 226 150 210
               C154 226 160 240 172 250
               C178 262 182 274 180 284
               C176 272 172 262 168 252 Z"
          />
        </g>

        {/* Ögonspringa – det som gör masken omisskännlig */}
        <rect x="166" y="78" width="68" height="17" rx="8.5" fill="url(#fs-eyes)" opacity="0.95" />
        {/* Ögon (mörka siluetter i springan) */}
        <ellipse cx="184" cy="86.5" rx="7" ry="5.5" fill="#08080B" />
        <ellipse cx="216" cy="86.5" rx="7" ry="5.5" fill="#08080B" />
      </g>
    </svg>
  )
}
