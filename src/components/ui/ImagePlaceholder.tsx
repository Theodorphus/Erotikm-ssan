/**
 * Platshållare när en artist/utställare ännu saknar bild.
 * Genererad neon-scenografi i SVG – scenljus, aurora-dis, bokeh och ett
 * monogram i neon-ring. Deterministisk utifrån namnet (samma namn → samma
 * konstverk, men varje artist får sin egen variation), så sidorna ser
 * designade ut redan innan Johans riktiga pressbilder är på plats.
 *
 * 👉 När en riktig bild läggs in (artist.image / exhibitor.image) används den
 *    automatiskt i stället – den här komponenten visas bara som fallback.
 */

/** Enkel deterministisk hash → 0..1-värden att variera konstverket med. */
function hash(str: string, seed: number): number {
  let h = seed
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) % 997
  }
  return h / 997
}

/** Rosa→magenta→violett-familjen – håller ihop med varumärket. */
const HUES: Array<[string, string]> = [
  ['#E11D74', '#F25CA2'], // brand-rosa
  ['#C4156A', '#E75FA8'], // djupare magenta
  ['#B01259', '#D94E9B'], // vinröd-rosa
  ['#A21CAF', '#E879F9'], // violett-neon
]

export function ImagePlaceholder({ name }: { name: string }) {
  const initial = name?.trim()?.[0]?.toUpperCase() ?? '★'
  const n = name ?? ''

  // Variation per namn: färgpar, orb-positioner och bokeh-utplacering.
  const [c1, c2] = HUES[Math.floor(hash(n, 7) * HUES.length)]
  const orbAx = 15 + hash(n, 13) * 30 // 15–45 %
  const orbAy = 12 + hash(n, 17) * 25
  const orbBx = 60 + hash(n, 19) * 28 // 60–88 %
  const orbBy = 62 + hash(n, 23) * 25
  const bokeh = Array.from({ length: 7 }, (_, i) => ({
    cx: hash(n, 29 + i * 3) * 100,
    cy: hash(n, 31 + i * 5) * 100,
    r: 1 + hash(n, 37 + i * 7) * 2.4,
    o: 0.15 + hash(n, 41 + i * 11) * 0.35,
  }))
  // Unika gradient-id:n per namn så flera platshållare på samma sida inte krockar.
  const uid = `ph-${Math.floor(hash(n, 3) * 99999)}`

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Mörk scen-bakgrund */}
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E1B25" />
            <stop offset="55%" stopColor="#15131A" />
            <stop offset="100%" stopColor="#08080B" />
          </linearGradient>
          {/* Aurora-orbs */}
          <radialGradient id={`${uid}-a`}>
            <stop offset="0%" stopColor={c1} stopOpacity="0.55" />
            <stop offset="100%" stopColor={c1} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-b`}>
            <stop offset="0%" stopColor={c2} stopOpacity="0.4" />
            <stop offset="100%" stopColor={c2} stopOpacity="0" />
          </radialGradient>
          {/* Spotlight-kon uppifrån */}
          <linearGradient id={`${uid}-spot`} x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          {/* Neon-ring runt monogrammet */}
          <linearGradient id={`${uid}-ring`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>

        <rect width="100" height="100" fill={`url(#${uid}-bg)`} />

        {/* Scenljus-kon */}
        <polygon points="38,0 62,0 78,100 22,100" fill={`url(#${uid}-spot)`} />

        {/* Aurora-dis */}
        <circle cx={orbAx} cy={orbAy} r="38" fill={`url(#${uid}-a)`} />
        <circle cx={orbBx} cy={orbBy} r="34" fill={`url(#${uid}-b)`} />

        {/* Bokeh – spridda ljusprickar */}
        {bokeh.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={i % 3 === 0 ? '#ffffff' : c2} opacity={b.o} />
        ))}

        {/* Golvreflektion */}
        <ellipse cx="50" cy="98" rx="34" ry="6" fill={c1} opacity="0.18" />
      </svg>

      {/* Monogram i neon-ring (HTML ovanpå för skarp typografi) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="absolute h-24 w-24 rounded-full blur-2xl"
          style={{ backgroundColor: c1, opacity: 0.3 }}
        />
        <span
          className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 bg-ink/40 backdrop-blur-sm font-display text-4xl font-extrabold select-none"
          style={{
            borderColor: c2,
            color: c2,
            boxShadow: `0 0 18px ${c1}66, inset 0 0 14px ${c1}33`,
            textShadow: `0 0 14px ${c1}AA`,
          }}
        >
          {initial}
        </span>
      </div>
    </div>
  )
}
