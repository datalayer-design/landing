/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, tall SVG hero background for the Use Cases page.
 *
 * Visual motif — **"Industry Skyline"**: a stylised panoramic cityscape
 * with silhouetted buildings representing the six target industries
 * (Finance tower, Hospital, Retail store, Media building, Wind turbine /
 * power plant, Government capitol). The skyline sits on a glowing
 * horizon with aurora-like colour bands, data-flow grid lines, and
 * sparkle accents in the sky.
 *
 * Uses a 1400×560 viewBox.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

/* ── Component ────────────────────────────────────────────────────── */

export function SvgUsecasesHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  /* ---- derived colours at various opacities ---- */
  const bldg  = p.isLight ? 'rgba(30,40,60,0.75)'  : 'rgba(180,200,230,0.18)';
  const bldg2 = p.isLight ? 'rgba(30,40,60,0.60)'  : 'rgba(180,200,230,0.12)';
  const bldg3 = p.isLight ? 'rgba(30,40,60,0.45)'  : 'rgba(180,200,230,0.08)';
  const win   = p.isLight ? 'rgba(255,200,60,0.55)' : 'rgba(255,220,100,0.35)';

  return (
    <svg
      viewBox="0 0 1400 560"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* ── Grid pattern ────────────────────────────────────── */}
        <pattern id="ucGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <line x1="0" y1="20" x2="40" y2="20" stroke={p.primary} strokeOpacity="0.04" strokeWidth="0.3" />
          <line x1="20" y1="0" x2="20" y2="40" stroke={p.primary} strokeOpacity="0.04" strokeWidth="0.3" />
        </pattern>

        {/* ── Sky gradient (top → horizon) ────────────────────── */}
        <linearGradient id="ucSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={p.bg} />
          <stop offset="60%"  stopColor={p.bg} />
          <stop offset="85%"  stopColor={p.glow}  stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.pop}   stopOpacity="0.15" />
        </linearGradient>

        {/* ── Horizon glow ────────────────────────────────────── */}
        <radialGradient id="ucHorizon" cx="50%" cy="100%" r="60%">
          <stop offset="0%"  stopColor={p.glow}  stopOpacity="0.22" />
          <stop offset="40%" stopColor={p.pop}   stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.pop}  stopOpacity="0" />
        </radialGradient>

        {/* ── Aurora band gradients ───────────────────────────── */}
        <linearGradient id="ucAu1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={p.glow}  stopOpacity="0" />
          <stop offset="25%"  stopColor={p.glow}  stopOpacity="0.20" />
          <stop offset="50%"  stopColor={p.pop}   stopOpacity="0.15" />
          <stop offset="75%"  stopColor={p.spark} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ucAu2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={p.surge} stopOpacity="0" />
          <stop offset="30%"  stopColor={p.surge} stopOpacity="0.18" />
          <stop offset="60%"  stopColor={p.flame} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.flame} stopOpacity="0" />
        </linearGradient>

        {/* ── Building window glow ────────────────────────────── */}
        <radialGradient id="ucWinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={win} />
          <stop offset="100%" stopColor={win} stopOpacity="0" />
        </radialGradient>

        {/* ── Data flow upward lines ──────────────────────────── */}
        <linearGradient id="ucFlow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor={p.glow}  stopOpacity="0.25" />
          <stop offset="60%"  stopColor={p.pop}   stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.pop}   stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Base sky ──────────────────────────────────────────── */}
      <rect width="1400" height="560" fill="url(#ucSky)" />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* ── Grid overlay ──────────────────────────────────────── */}
      <rect width="1400" height="560" fill="url(#ucGrid)" />

      {/* ── Aurora bands (upper sky) ──────────────────────────── */}
      <path
        d="M-50 140 C200 100,400 160,700 120 C1000 80,1200 150,1450 110"
        fill="none" stroke="url(#ucAu1)" strokeWidth="60" strokeLinecap="round"
      />
      <path
        d="M-50 240 C250 210,500 260,750 225 C1000 190,1200 240,1450 215"
        fill="none" stroke="url(#ucAu2)" strokeWidth="50" strokeLinecap="round"
      />

      {/* ── Horizon glow band ─────────────────────────────────── */}
      <rect x="0" y="320" width="1400" height="240" fill="url(#ucHorizon)" />

      {/* ── Ground plane ──────────────────────────────────────── */}
      <rect x="0" y="420" width="1400" height="140" fill={p.isLight ? 'rgba(20,30,50,0.06)' : 'rgba(200,220,255,0.03)'} />
      <line x1="0" y1="420" x2="1400" y2="420" stroke={p.glow} strokeOpacity="0.25" strokeWidth="1.5" />

      {/* ================================================================ */}
      {/* BACKGROUND BUILDINGS (distant, more transparent)                  */}
      {/* ================================================================ */}
      {/* Distant left cluster */}
      <rect x="60"  y="340" width="30" height="80"  rx="2" fill={bldg3} />
      <rect x="100" y="320" width="25" height="100" rx="2" fill={bldg3} />
      <rect x="135" y="350" width="35" height="70"  rx="2" fill={bldg3} />

      {/* Distant right cluster */}
      <rect x="1220" y="330" width="28" height="90"  rx="2" fill={bldg3} />
      <rect x="1260" y="345" width="35" height="75"  rx="2" fill={bldg3} />
      <rect x="1310" y="355" width="30" height="65"  rx="2" fill={bldg3} />

      {/* Distant mid-left */}
      <rect x="280" y="345" width="25" height="75" rx="2" fill={bldg3} />
      <rect x="315" y="360" width="20" height="60" rx="2" fill={bldg3} />

      {/* Distant mid-right */}
      <rect x="1060" y="340" width="22" height="80" rx="2" fill={bldg3} />
      <rect x="1090" y="355" width="28" height="65" rx="2" fill={bldg3} />

      {/* ================================================================ */}
      {/* MIDGROUND BUILDINGS (semi-transparent)                            */}
      {/* ================================================================ */}
      <rect x="180" y="310" width="40" height="110" rx="3" fill={bldg2} />
      <rect x="230" y="330" width="35" height="90"  rx="3" fill={bldg2} />
      <rect x="370" y="300" width="45" height="120" rx="3" fill={bldg2} />

      <rect x="980"  y="315" width="38" height="105" rx="3" fill={bldg2} />
      <rect x="1130" y="300" width="42" height="120" rx="3" fill={bldg2} />
      <rect x="1180" y="325" width="30" height="95"  rx="3" fill={bldg2} />

      {/* ================================================================ */}
      {/* FOREGROUND — 6 INDUSTRY BUILDINGS                                 */}
      {/* ================================================================ */}

      {/* ---- 1. FINANCE — Tall glass tower (left) ---- */}
      <g>
        <rect x="430" y="240" width="55" height="180" rx="3" fill={bldg} />
        {/* Spire */}
        <rect x="453" y="215" width="9" height="30" fill={bldg} />
        <polygon points="457.5,200 450,215 465,215" fill={bldg} />
        {/* Windows grid */}
        {[0,1,2,3,4,5,6,7].map(row =>
          [0,1,2].map(col => (
            <rect key={`fw${row}${col}`}
              x={438 + col * 15} y={252 + row * 20} width="8" height="10" rx="1"
              fill={win} opacity={0.3 + Math.random() * 0.4}
            />
          ))
        )}
        {/* Label icon: $ chart line */}
        <line x1="442" y1="245" x2="475" y2="245" stroke={p.glow} strokeOpacity="0.4" strokeWidth="0.8" />
      </g>

      {/* ---- 2. HEALTHCARE — Hospital with cross (center-left) ---- */}
      <g>
        <rect x="540" y="280" width="65" height="140" rx="3" fill={bldg} />
        {/* Cross on top */}
        <rect x="566" y="262" width="13" height="26" rx="1" fill={p.glow} opacity="0.50" />
        <rect x="560" y="268" width="25" height="14" rx="1" fill={p.glow} opacity="0.50" />
        {/* Windows */}
        {[0,1,2,3,4].map(row =>
          [0,1,2,3].map(col => (
            <rect key={`hw${row}${col}`}
              x={548 + col * 14} y={295 + row * 24} width="7" height="12" rx="1"
              fill={win} opacity={0.25 + Math.random() * 0.35}
            />
          ))
        )}
      </g>

      {/* ---- 3. RETAIL — Store with awning (center) ---- */}
      <g>
        <rect x="650" y="330" width="70" height="90" rx="3" fill={bldg} />
        {/* Awning (scalloped) */}
        <path
          d="M648,330 Q655,318 662,330 Q669,318 676,330 Q683,318 690,330 Q697,318 704,330 Q711,318 718,330 Q725,318 722,330"
          fill={p.pop} fillOpacity="0.30" stroke={p.pop} strokeOpacity="0.40" strokeWidth="0.8"
        />
        {/* Storefront window */}
        <rect x="658" y="345" width="24" height="30" rx="2" fill={win} opacity="0.40" />
        <rect x="688" y="345" width="24" height="30" rx="2" fill={win} opacity="0.35" />
        {/* Door */}
        <rect x="675" y="385" width="16" height="35" rx="2" fill={win} opacity="0.25" />
        {/* Shopping bag icon accent */}
        <rect x="660" y="395" width="8" height="10" rx="1" fill={p.spark} opacity="0.30" />
      </g>

      {/* ---- 4. MEDIA — Broadcast building with antenna (center-right) ---- */}
      <g>
        <rect x="770" y="290" width="55" height="130" rx="3" fill={bldg} />
        {/* Antenna tower */}
        <rect x="794" y="248" width="7" height="48" fill={bldg} />
        <polygon points="797.5,235 792,248 803,248" fill={bldg} />
        {/* Signal waves */}
        <path d="M804,250 Q815,244 810,238" fill="none" stroke={p.spark} strokeOpacity="0.40" strokeWidth="1" />
        <path d="M808,254 Q822,246 816,236" fill="none" stroke={p.spark} strokeOpacity="0.28" strokeWidth="0.8" />
        <path d="M791,250 Q780,244 785,238" fill="none" stroke={p.spark} strokeOpacity="0.40" strokeWidth="1" />
        <path d="M787,254 Q773,246 779,236" fill="none" stroke={p.spark} strokeOpacity="0.28" strokeWidth="0.8" />
        {/* Screen windows */}
        {[0,1,2,3].map(row =>
          [0,1].map(col => (
            <rect key={`mw${row}${col}`}
              x={780 + col * 22} y={300 + row * 28} width="14" height="16" rx="2"
              fill={win} opacity={0.30 + Math.random() * 0.3}
            />
          ))
        )}
      </g>

      {/* ---- 5. ENERGY — Wind turbine + power plant (right) ---- */}
      <g>
        {/* Turbine tower */}
        <rect x="895" y="290" width="8" height="130" fill={bldg} />
        {/* Nacelle */}
        <ellipse cx="899" cy="290" rx="8" ry="5" fill={bldg} />
        {/* Blades */}
        <line x1="899" y1="290" x2="899" y2="248" stroke={bldg} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="899" y1="290" x2="862" y2="310" stroke={bldg} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="899" y1="290" x2="936" y2="310" stroke={bldg} strokeWidth="2.5" strokeLinecap="round" />
        {/* Power plant / substation */}
        <rect x="920" y="340" width="45" height="80" rx="3" fill={bldg} />
        {/* Smokestack */}
        <rect x="950" y="310" width="10" height="35" rx="1" fill={bldg} />
        {/* Subtle "steam" */}
        <ellipse cx="955" cy="305" rx="8"  ry="5" fill={p.surge} opacity="0.12" />
        <ellipse cx="955" cy="296" rx="10" ry="6" fill={p.surge} opacity="0.08" />
        {/* Windows */}
        {[0,1].map(row =>
          [0,1,2].map(col => (
            <rect key={`ew${row}${col}`}
              x={926 + col * 13} y={355 + row * 24} width="7" height="12" rx="1"
              fill={win} opacity={0.25 + Math.random() * 0.3}
            />
          ))
        )}
        {/* Green energy accent */}
        <circle cx="899" cy="290" r="3" fill={p.glow} opacity="0.35" />
      </g>

      {/* ---- 6. PUBLIC SECTOR — Capitol / Government building (far right) ---- */}
      <g>
        {/* Main body */}
        <rect x="1020" y="320" width="80" height="100" rx="3" fill={bldg} />
        {/* Dome */}
        <ellipse cx="1060" cy="320" rx="35" ry="22" fill={bldg} />
        {/* Cupola */}
        <rect x="1054" y="292" width="12" height="16" rx="2" fill={bldg} />
        <ellipse cx="1060" cy="292" rx="8" ry="5" fill={bldg} />
        {/* Flag */}
        <rect x="1060" y="276" width="2" height="18" fill={bldg} />
        <rect x="1062" y="276" width="10" height="7" rx="1" fill={p.flame} opacity="0.45" />
        {/* Columns */}
        {[0,1,2,3,4].map(i => (
          <rect key={`gc${i}`}
            x={1028 + i * 14} y="330" width="5" height="50" rx="1"
            fill={p.isLight ? 'rgba(30,40,60,0.55)' : 'rgba(180,200,230,0.12)'}
          />
        ))}
        {/* Steps */}
        <rect x="1015" y="415" width="90" height="5" rx="1" fill={bldg2} />
        <rect x="1010" y="418" width="100" height="4" rx="1" fill={bldg3} />
        {/* Windows */}
        {[0,1].map(row =>
          [0,1,2,3].map(col => (
            <rect key={`gw${row}${col}`}
              x={1030 + col * 16} y={340 + row * 28} width="8" height="14" rx="1"
              fill={win} opacity={0.20 + Math.random() * 0.3}
            />
          ))
        )}
      </g>

      {/* ================================================================ */}
      {/* DATA-FLOW LINES (rising from buildings into the sky)              */}
      {/* ================================================================ */}
      <line x1="457" y1="240" x2="457" y2="120" stroke="url(#ucFlow)" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="572" y1="262" x2="572" y2="140" stroke="url(#ucFlow)" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="685" y1="330" x2="685" y2="160" stroke="url(#ucFlow)" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="797" y1="235" x2="797" y2="100" stroke="url(#ucFlow)" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="899" y1="248" x2="899" y2="130" stroke="url(#ucFlow)" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="1060" y1="276" x2="1060" y2="110" stroke="url(#ucFlow)" strokeWidth="1" strokeDasharray="4 6" />

      {/* ── Connection arcs between buildings ──────────────────── */}
      <path d="M457,200 Q515,160 572,200" fill="none" stroke={p.glow} strokeOpacity="0.15" strokeWidth="0.8" strokeDasharray="3 5" />
      <path d="M572,200 Q628,170 685,210" fill="none" stroke={p.pop}  strokeOpacity="0.12" strokeWidth="0.8" strokeDasharray="3 5" />
      <path d="M685,210 Q741,175 797,190" fill="none" stroke={p.spark} strokeOpacity="0.12" strokeWidth="0.8" strokeDasharray="3 5" />
      <path d="M797,190 Q848,160 899,180" fill="none" stroke={p.surge} strokeOpacity="0.12" strokeWidth="0.8" strokeDasharray="3 5" />
      <path d="M899,180 Q980,140 1060,170" fill="none" stroke={p.flame} strokeOpacity="0.12" strokeWidth="0.8" strokeDasharray="3 5" />

      {/* ── Sky sparkle stars ─────────────────────────────────── */}
      {[
        { x: 80,  y: 50,  r: 2.5, c: p.glow,  o: 0.6 },
        { x: 200, y: 80,  r: 2,   c: p.pop,   o: 0.5 },
        { x: 350, y: 40,  r: 3,   c: p.spark, o: 0.55 },
        { x: 520, y: 65,  r: 2,   c: p.surge, o: 0.5 },
        { x: 680, y: 35,  r: 2.8, c: p.glow,  o: 0.6 },
        { x: 820, y: 70,  r: 2,   c: p.flame, o: 0.45 },
        { x: 950, y: 45,  r: 2.5, c: p.pop,   o: 0.5 },
        { x: 1100, y: 60, r: 2,   c: p.gold,  o: 0.5 },
        { x: 1250, y: 38, r: 3,   c: p.glow,  o: 0.55 },
        { x: 1350, y: 72, r: 2,   c: p.spark, o: 0.45 },
        { x: 150, y: 130, r: 2,   c: p.surge, o: 0.4 },
        { x: 440, y: 115, r: 2.5, c: p.blaze, o: 0.45 },
        { x: 750, y: 105, r: 2,   c: p.glow,  o: 0.4 },
        { x: 1020, y: 95, r: 2.5, c: p.pop,   o: 0.42 },
        { x: 1300, y: 120, r: 2,  c: p.flame, o: 0.4 },
      ].map(({ x, y, r, c, o }, i) => (
        <circle key={`s${i}`} cx={x} cy={y} r={r} fill={c} opacity={o} />
      ))}

      {/* ── Glow halos around key buildings ────────────────────── */}
      <ellipse cx="457"  cy="240" rx="40" ry="25" fill={p.glow}  opacity="0.06" />
      <ellipse cx="572"  cy="280" rx="45" ry="25" fill={p.pop}   opacity="0.05" />
      <ellipse cx="685"  cy="330" rx="45" ry="22" fill={p.spark} opacity="0.05" />
      <ellipse cx="797"  cy="290" rx="40" ry="24" fill={p.surge} opacity="0.05" />
      <ellipse cx="940"  cy="340" rx="50" ry="25" fill={p.glow}  opacity="0.05" />
      <ellipse cx="1060" cy="310" rx="50" ry="28" fill={p.flame} opacity="0.05" />

      {/* ── Horizon shimmer lines ──────────────────────────────── */}
      <line x1="0" y1="430" x2="1400" y2="430" stroke={p.glow}  strokeOpacity="0.12" strokeWidth="0.5" />
      <line x1="0" y1="450" x2="1400" y2="450" stroke={p.pop}   strokeOpacity="0.08" strokeWidth="0.4" />
      <line x1="0" y1="480" x2="1400" y2="480" stroke={p.spark}  strokeOpacity="0.06" strokeWidth="0.3" />

      {/* ── Road / path line at ground level ──────────────────── */}
      <path
        d="M0,418 Q200,415 400,418 Q600,421 800,418 Q1000,415 1200,418 Q1350,420 1400,418"
        fill="none" stroke={p.glow} strokeOpacity="0.15" strokeWidth="1"
      />

      </g>
    </svg>
  );
}
