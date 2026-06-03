/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, tall SVG hero background for the About Datalayer page.
 *
 * Visual motif — **"Pop Dots"**: inspired by the bold graphic language of
 * 1960s pop art — Ben-Day dot halftone patterns at varying densities,
 * thick black contour outlines, starburst / action-line explosions,
 * bold colour-blocked panels, speech-bubble shapes, and comic-style
 * speed lines.
 *
 * All artwork is original geometric abstraction — no reproduction of
 * any existing artwork.
 *
 * Completely distinct from all other hero flavours:
 *   Home         → constellation / orbital / hex grid
 *   Blog/Login/… → diagonals / radial circles
 *   Usecases     → aurora bands / vertical pillars / concentric rects / stars
 *   Integrations → circuit traces / plus markers / chip rects / chevrons
 *   Changelog    → sinusoidal helices / hexagons / triangles / version bars
 *   This         → Ben-Day dots / starbursts / bold outlines / panels
 *
 * Uses a 1400×560 viewBox.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

/* ── Inline path helpers ──────────────────────────────────────────── */

/**
 * Starburst / action-explosion centred at (cx, cy).
 * `n` spikes, outer radius `ro`, inner radius `ri`.
 */
const starburst = (cx: number, cy: number, n: number, ro: number, ri: number) => {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI / n) * i - Math.PI / 2;
    const r = i % 2 === 0 ? ro : ri;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
};

/**
 * Rounded speech-bubble outline (rect with pointer nub).
 */
const bubble = (x: number, y: number, w: number, h: number, nubX: number, nubY: number) =>
  `M${x + 12},${y} h${w - 24} a12,12 0 0 1 12,12 v${h - 24} a12,12 0 0 1 -12,12 ` +
  `h${-(w / 2 - 18)} l${-8},${nubY > 0 ? 16 : -16} l${-8},${nubY > 0 ? -16 : 16} ` +
  `h${-(w / 2 - 18)} a12,12 0 0 1 -12,-12 v${-(h - 24)} a12,12 0 0 1 12,-12 Z`;

/* ── Component ────────────────────────────────────────────────────── */

export function SvgAboutHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  /* Outline colour: dark in both modes but adjusted for readability */
  const outline = p.isLight ? '#1b1f24' : '#c9d1d9';

  return (
    <svg
      viewBox="0 0 1400 560"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* ── Ben-Day dot patterns at different densities ─── */}
        <pattern id="abDot1" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.2" fill={p.blaze} opacity="0.35" />
        </pattern>
        <pattern id="abDot2" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="2.8" fill={p.surge} opacity="0.30" />
        </pattern>
        <pattern id="abDot3" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="3.2" fill={p.gold} opacity="0.32" />
        </pattern>
        <pattern id="abDot4" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.5" fill={p.glow} opacity="0.28" />
        </pattern>
        <pattern id="abDot5" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="2.5" fill={p.pop} opacity="0.30" />
        </pattern>

        {/* ── Fine background dot halftone ─────────────────── */}
        <pattern id="abHalf" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.0" fill={p.primary} opacity="0.07" />
        </pattern>

        {/* ── Colour-block gradients ───────────────────────── */}
        <linearGradient id="abPanelG1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={p.blaze} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.gold}  stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="abPanelG2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={p.surge} stopOpacity="0.16" />
          <stop offset="100%" stopColor={p.pop}   stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="abPanelG3" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={p.glow}  stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0.08" />
        </linearGradient>

        {/* ── Central glow ────────────────────────────────── */}
        <radialGradient id="abGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="30%"  stopColor={p.glow}  stopOpacity="0.08" />
          <stop offset="70%"  stopColor={p.pop}   stopOpacity="0.03" />
          <stop offset="100%" stopColor={p.pop}   stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Base fill ─────────────────────────────────────── */}
      <rect width="1400" height="560" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* ── Background halftone wash ──────────────────────── */}
      <rect width="1400" height="560" fill="url(#abHalf)" />

      {/* ── Bold colour-block panels (comic frames) ──────── */}
      {/* Top-left panel */}
      <rect x="30" y="25" width="380" height="230" rx="6" fill="url(#abPanelG1)" />
      <rect x="30" y="25" width="380" height="230" rx="6" fill="url(#abDot1)" />
      <rect x="30" y="25" width="380" height="230" rx="6"
        fill="none" stroke={outline} strokeOpacity="0.12" strokeWidth="2.5" />

      {/* Top-right panel */}
      <rect x="990" y="20" width="380" height="240" rx="6" fill="url(#abPanelG2)" />
      <rect x="990" y="20" width="380" height="240" rx="6" fill="url(#abDot2)" />
      <rect x="990" y="20" width="380" height="240" rx="6"
        fill="none" stroke={outline} strokeOpacity="0.12" strokeWidth="2.5" />

      {/* Bottom-left panel */}
      <rect x="50" y="310" width="340" height="220" rx="6" fill="url(#abPanelG3)" />
      <rect x="50" y="310" width="340" height="220" rx="6" fill="url(#abDot4)" />
      <rect x="50" y="310" width="340" height="220" rx="6"
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="2" />

      {/* Bottom-right panel */}
      <rect x="1020" y="300" width="350" height="230" rx="6" fill="url(#abPanelG1)" />
      <rect x="1020" y="300" width="350" height="230" rx="6" fill="url(#abDot3)" />
      <rect x="1020" y="300" width="350" height="230" rx="6"
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="2" />

      {/* Centre panel */}
      <rect x="480" y="150" width="440" height="260" rx="8" fill="url(#abPanelG2)" />
      <rect x="480" y="150" width="440" height="260" rx="8" fill="url(#abDot5)" />
      <rect x="480" y="150" width="440" height="260" rx="8"
        fill="none" stroke={outline} strokeOpacity="0.14" strokeWidth="3" />

      {/* ── Starburst action explosions ───────────────────── */}
      <path d={starburst(200, 135, 12, 65, 35)}
        fill={p.gold} opacity="0.14" />
      <path d={starburst(200, 135, 12, 65, 35)}
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="1.5" />

      <path d={starburst(1180, 140, 10, 55, 28)}
        fill={p.blaze} opacity="0.12" />
      <path d={starburst(1180, 140, 10, 55, 28)}
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="1.5" />

      <path d={starburst(700, 280, 16, 90, 50)}
        fill={p.glow} opacity="0.10" />
      <path d={starburst(700, 280, 16, 90, 50)}
        fill="none" stroke={outline} strokeOpacity="0.12" strokeWidth="2" />

      <path d={starburst(150, 420, 10, 50, 26)}
        fill={p.pop} opacity="0.11" />
      <path d={starburst(150, 420, 10, 50, 26)}
        fill="none" stroke={outline} strokeOpacity="0.08" strokeWidth="1.2" />

      <path d={starburst(1250, 420, 11, 52, 28)}
        fill={p.surge} opacity="0.12" />
      <path d={starburst(1250, 420, 11, 52, 28)}
        fill="none" stroke={outline} strokeOpacity="0.08" strokeWidth="1.2" />

      {/* ── Speech-bubble shapes ───────────────────────────── */}
      <path d={bubble(440, 60, 180, 70, 0, 1)}
        fill={p.spark} opacity="0.08" />
      <path d={bubble(440, 60, 180, 70, 0, 1)}
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="1.8" />

      <path d={bubble(780, 440, 200, 75, 0, 1)}
        fill={p.flame} opacity="0.09" />
      <path d={bubble(780, 440, 200, 75, 0, 1)}
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="1.8" />

      {/* ── Comic speed lines (horizontal action lines) ──── */}
      {[
        { y: 48, x1: 680, x2: 940, c: p.blaze },
        { y: 95, x1: 30, x2: 380, c: p.surge },
        { y: 175, x1: 1020, x2: 1370, c: p.glow },
        { y: 280, x1: 100, x2: 440, c: p.pop },
        { y: 340, x1: 700, x2: 980, c: p.flame },
        { y: 465, x1: 440, x2: 720, c: p.spark },
        { y: 520, x1: 1050, x2: 1350, c: p.gold },
      ].map(({ y, x1, x2, c }, i) => (
        <g key={`sl${i}`}>
          <line x1={x1} y1={y} x2={x2} y2={y}
            stroke={c} strokeOpacity={0.18} strokeWidth={2.5} />
          <line x1={x1} y1={y} x2={x2} y2={y}
            stroke={outline} strokeOpacity={0.06} strokeWidth={3.5} />
        </g>
      ))}

      {/* ── Bold contour shapes (thick outlined geometry) ── */}
      {/* Large outlined rectangles — overlapping frame feel */}
      <rect x="430" y="100" width="540" height="360" rx="10"
        fill="none" stroke={outline} strokeOpacity="0.06" strokeWidth="4" />
      <rect x="460" y="125" width="480" height="310" rx="8"
        fill="none" stroke={outline} strokeOpacity="0.04" strokeWidth="2.5" />

      {/* ── Ben-Day dot accent zones (extra density areas) ── */}
      <rect x="500" y="170" width="130" height="100" rx="4" fill="url(#abDot1)" opacity="0.6" />
      <rect x="770" y="170" width="130" height="100" rx="4" fill="url(#abDot2)" opacity="0.5" />
      <rect x="500" y="290" width="130" height="100" rx="4" fill="url(#abDot3)" opacity="0.55" />
      <rect x="770" y="290" width="130" height="100" rx="4" fill="url(#abDot4)" opacity="0.6" />

      {/* ── Central glow for atmosphere ───────────────────── */}
      <rect width="1400" height="560" fill="url(#abGlow)" />

      {/* ── Small solid dot accents (like halftone focal points) */}
      {[
        { x: 60,   y: 60,  r: 3.5, c: p.blaze, o: 0.55 },
        { x: 380,  y: 45,  r: 3,   c: p.gold,  o: 0.50 },
        { x: 700,  y: 35,  r: 4,   c: p.glow,  o: 0.55 },
        { x: 1020, y: 50,  r: 3.5, c: p.surge, o: 0.50 },
        { x: 1340, y: 40,  r: 3,   c: p.pop,   o: 0.48 },
        { x: 100,  y: 540, r: 3,   c: p.spark, o: 0.45 },
        { x: 400,  y: 530, r: 3.5, c: p.flame, o: 0.50 },
        { x: 700,  y: 540, r: 4,   c: p.blaze, o: 0.48 },
        { x: 1000, y: 535, r: 3,   c: p.gold,  o: 0.45 },
        { x: 1300, y: 540, r: 3.5, c: p.glow,  o: 0.50 },
      ].map(({ x, y, r, c, o }, i) => (
        <g key={`dot${i}`}>
          <circle cx={x} cy={y} r={r + 4} fill={c} opacity={o * 0.15} />
          <circle cx={x} cy={y} r={r} fill={c} opacity={o} />
          <circle cx={x} cy={y} r={r + 1} fill="none" stroke={outline} strokeOpacity={0.10} strokeWidth={1} />
        </g>
      ))}

      </g>
    </svg>
  );
}
