/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, tall SVG hero background for the Careers page.
 *
 * Visual motif — **"Pop Zap"**: a second pop-art composition that
 * complements but differs from the About hero's "Pop Dots".
 *
 * Key elements:
 *   - Diagonal halftone stripe bands (45° hatching with dot fills)
 *   - Thought-cloud / scalloped shapes (not speech bubbles)
 *   - Jagged lightning-bolt / "ZAP" paths
 *   - Bold concentric rounded-square outlines
 *   - Wavy motion lines (not straight speed lines)
 *   - Oversized dot rosettes (large halftone circles with outline)
 *
 * All artwork is original geometric abstraction — no reproduction of
 * any existing artwork.
 *
 * Uses a 1400×560 viewBox.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

/* ── Inline path helpers ──────────────────────────────────────────── */

/**
 * Thought-cloud: a scalloped elliptical shape built from overlapping arcs.
 * (cx, cy) = centre, rx/ry = overall radii, bumps = number of scallops.
 */
const thoughtCloud = (cx: number, cy: number, rx: number, ry: number, bumps: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= bumps; i++) {
    const a = (2 * Math.PI * i) / bumps;
    // Scallop outward on each bump
    const wobble = 1 + 0.18 * Math.cos(bumps * a);
    const x = cx + rx * wobble * Math.cos(a);
    const y = cy + ry * wobble * Math.sin(a);
    if (i === 0) {
      pts.push(`M${x.toFixed(1)},${y.toFixed(1)}`);
    } else {
      // Use a quadratic arc through a control point that's pushed outward
      const prevA = (2 * Math.PI * (i - 0.5)) / bumps;
      const cpR = 1.22;
      const cpx = cx + rx * cpR * Math.cos(prevA);
      const cpy = cy + ry * cpR * Math.sin(prevA);
      pts.push(`Q${cpx.toFixed(1)},${cpy.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`);
    }
  }
  return pts.join(' ') + 'Z';
};

/** Lightning bolt path from (x,y) going downward with width w and height h. */
const bolt = (x: number, y: number, w: number, h: number) =>
  `M${x + w * 0.55},${y} L${x + w * 0.35},${y + h * 0.42} L${x + w * 0.65},${y + h * 0.42} ` +
  `L${x + w * 0.40},${y + h} L${x + w * 0.62},${y + h * 0.55} ` +
  `L${x + w * 0.32},${y + h * 0.55} Z`;

/** Wavy path (horizontal sine-wave line). */
const wavyLine = (x1: number, x2: number, y: number, amp: number, freq: number) => {
  const pts: string[] = [];
  for (let x = x1; x <= x2; x += 4) {
    const yy = y + amp * Math.sin((2 * Math.PI * freq * (x - x1)) / (x2 - x1));
    pts.push(`${x},${yy.toFixed(1)}`);
  }
  return `M${pts[0]} ${pts.slice(1).map(p => `L${p}`).join(' ')}`;
};

/* ── Component ────────────────────────────────────────────────────── */

export function SvgCareersHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

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

        {/* ── Halftone dot patterns ────────────────────────── */}
        <pattern id="crDot1" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="2" fill={p.blaze} opacity="0.32" />
        </pattern>
        <pattern id="crDot2" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="2.5" fill={p.surge} opacity="0.28" />
        </pattern>
        <pattern id="crDot3" width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="5.5" cy="5.5" r="3" fill={p.gold} opacity="0.30" />
        </pattern>
        <pattern id="crDot4" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.2" fill={p.pop} opacity="0.30" />
        </pattern>

        {/* ── Fine background halftone ─────────────────────── */}
        <pattern id="crHalf" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={p.primary} opacity="0.06" />
        </pattern>

        {/* ── Diagonal hatching patterns ───────────────────── */}
        <pattern id="crHatch1" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="5" x2="10" y2="5" stroke={p.glow} strokeOpacity="0.14" strokeWidth="2" />
        </pattern>
        <pattern id="crHatch2" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="6" x2="12" y2="6" stroke={p.flame} strokeOpacity="0.12" strokeWidth="2" />
        </pattern>

        {/* ── Colour gradients for stripe bands ───────────── */}
        <linearGradient id="crBG1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={p.blaze} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.gold}  stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="crBG2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={p.surge} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="crBG3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={p.glow}  stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.pop}   stopOpacity="0.08" />
        </linearGradient>

        {/* ── Central glow ────────────────────────────────── */}
        <radialGradient id="crGlow" cx="50%" cy="48%" r="48%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="25%"  stopColor={p.glow}  stopOpacity="0.08" />
          <stop offset="60%"  stopColor={p.pop}   stopOpacity="0.03" />
          <stop offset="100%" stopColor={p.pop}   stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Base fill ─────────────────────────────────────── */}
      <rect width="1400" height="560" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* ── Background halftone ───────────────────────────── */}
      <rect width="1400" height="560" fill="url(#crHalf)" />

      {/* ── Diagonal hatching stripe bands ─────────────────── */}
      {/* Upper-left to centre band */}
      <rect x="-100" y="40" width="800" height="160" rx="0"
        fill="url(#crBG1)" transform="rotate(-12 350 120)" />
      <rect x="-100" y="40" width="800" height="160" rx="0"
        fill="url(#crHatch1)" transform="rotate(-12 350 120)" />

      {/* Centre-right band */}
      <rect x="600" y="200" width="900" height="140" rx="0"
        fill="url(#crBG2)" transform="rotate(8 1050 270)" />
      <rect x="600" y="200" width="900" height="140" rx="0"
        fill="url(#crHatch2)" transform="rotate(8 1050 270)" />

      {/* Lower band */}
      <rect x="-50" y="380" width="900" height="130" rx="0"
        fill="url(#crBG3)" transform="rotate(-6 400 445)" />
      <rect x="-50" y="380" width="900" height="130" rx="0"
        fill="url(#crHatch1)" transform="rotate(-6 400 445)" />

      {/* ── Bold concentric rounded-squares ────────────────── */}
      {[
        { x: 550, y: 180, s: 200, c: p.glow,  o: 0.14, sw: 3.0 },
        { x: 580, y: 205, s: 150, c: p.pop,   o: 0.12, sw: 2.5 },
        { x: 610, y: 230, s: 100, c: p.spark,  o: 0.10, sw: 2.0 },
      ].map(({ x, y, s, c, o, sw }, i) => (
        <rect key={`sq${i}`} x={x} y={y} width={s} height={s} rx={s * 0.15}
          fill="none" stroke={c} strokeOpacity={o} strokeWidth={sw} />
      ))}
      {/* Right cluster */}
      {[
        { x: 950, y: 100, s: 180, c: p.flame,  o: 0.12, sw: 2.8 },
        { x: 975, y: 122, s: 136, c: p.gold,   o: 0.10, sw: 2.2 },
        { x: 1000, y: 144, s: 92, c: p.blaze,  o: 0.09, sw: 1.8 },
      ].map(({ x, y, s, c, o, sw }, i) => (
        <rect key={`sq2${i}`} x={x} y={y} width={s} height={s} rx={s * 0.15}
          fill="none" stroke={c} strokeOpacity={o} strokeWidth={sw} />
      ))}

      {/* ── Thought-cloud shapes ───────────────────────────── */}
      <path d={thoughtCloud(250, 150, 100, 70, 10)}
        fill={p.surge} opacity="0.08" />
      <path d={thoughtCloud(250, 150, 100, 70, 10)}
        fill="url(#crDot2)" />
      <path d={thoughtCloud(250, 150, 100, 70, 10)}
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="2" />
      {/* Small trailing thought bubbles */}
      <circle cx="165" cy="210" r="12" fill={p.surge} opacity="0.06" />
      <circle cx="165" cy="210" r="12" fill="none" stroke={outline} strokeOpacity="0.08" strokeWidth="1.2" />
      <circle cx="140" cy="235" r="7" fill={p.surge} opacity="0.05" />
      <circle cx="140" cy="235" r="7" fill="none" stroke={outline} strokeOpacity="0.06" strokeWidth="1" />

      <path d={thoughtCloud(1150, 400, 110, 75, 12)}
        fill={p.gold} opacity="0.07" />
      <path d={thoughtCloud(1150, 400, 110, 75, 12)}
        fill="url(#crDot3)" />
      <path d={thoughtCloud(1150, 400, 110, 75, 12)}
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="2" />
      <circle cx="1055" cy="460" r="10" fill={p.gold} opacity="0.05" />
      <circle cx="1055" cy="460" r="10" fill="none" stroke={outline} strokeOpacity="0.07" strokeWidth="1" />
      <circle cx="1035" cy="480" r="6" fill={p.gold} opacity="0.04" />
      <circle cx="1035" cy="480" r="6" fill="none" stroke={outline} strokeOpacity="0.05" strokeWidth="0.8" />

      {/* ── Lightning bolts ("ZAP!") ──────────────────────── */}
      <path d={bolt(420, 60, 60, 120)}
        fill={p.gold} opacity="0.16" />
      <path d={bolt(420, 60, 60, 120)}
        fill="none" stroke={outline} strokeOpacity="0.12" strokeWidth="2" />

      <path d={bolt(880, 350, 55, 110)}
        fill={p.blaze} opacity="0.14" />
      <path d={bolt(880, 350, 55, 110)}
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="1.8" />

      <path d={bolt(100, 360, 45, 100)}
        fill={p.glow} opacity="0.13" />
      <path d={bolt(100, 360, 45, 100)}
        fill="none" stroke={outline} strokeOpacity="0.09" strokeWidth="1.5" />

      <path d={bolt(1280, 80, 50, 105)}
        fill={p.pop} opacity="0.14" />
      <path d={bolt(1280, 80, 50, 105)}
        fill="none" stroke={outline} strokeOpacity="0.10" strokeWidth="1.8" />

      {/* ── Wavy motion lines ─────────────────────────────── */}
      <path d={wavyLine(50, 400, 300, 8, 5)}
        fill="none" stroke={p.blaze} strokeOpacity="0.18" strokeWidth="2.2" />
      <path d={wavyLine(50, 400, 300, 8, 5)}
        fill="none" stroke={outline} strokeOpacity="0.05" strokeWidth="3.2" />

      <path d={wavyLine(500, 900, 450, 10, 4)}
        fill="none" stroke={p.surge} strokeOpacity="0.16" strokeWidth="2" />
      <path d={wavyLine(500, 900, 450, 10, 4)}
        fill="none" stroke={outline} strokeOpacity="0.04" strokeWidth="3" />

      <path d={wavyLine(950, 1380, 100, 7, 6)}
        fill="none" stroke={p.glow} strokeOpacity="0.15" strokeWidth="1.8" />
      <path d={wavyLine(950, 1380, 100, 7, 6)}
        fill="none" stroke={outline} strokeOpacity="0.04" strokeWidth="2.8" />

      <path d={wavyLine(200, 700, 520, 6, 5)}
        fill="none" stroke={p.flame} strokeOpacity="0.12" strokeWidth="1.6" />

      <path d={wavyLine(700, 1200, 60, 9, 4.5)}
        fill="none" stroke={p.spark} strokeOpacity="0.14" strokeWidth="1.8" />

      {/* ── Oversized dot rosettes ─────────────────────────── */}
      {[
        { cx: 80,   cy: 90,  r: 22, c: p.blaze, o: 0.18 },
        { cx: 700,  cy: 50,  r: 26, c: p.glow,  o: 0.15 },
        { cx: 1350, cy: 280, r: 24, c: p.surge, o: 0.16 },
        { cx: 50,   cy: 480, r: 20, c: p.pop,   o: 0.14 },
        { cx: 700,  cy: 530, r: 22, c: p.gold,  o: 0.15 },
        { cx: 1340, cy: 500, r: 18, c: p.spark, o: 0.13 },
      ].map(({ cx, cy, r, c, o }, i) => (
        <g key={`ros${i}`}>
          <circle cx={cx} cy={cy} r={r} fill={c} opacity={o * 0.4} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeOpacity={o} strokeWidth={2} />
          <circle cx={cx} cy={cy} r={r * 0.55} fill={c} opacity={o * 0.7} />
          <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke={outline} strokeOpacity={0.08} strokeWidth={1.5} />
        </g>
      ))}

      {/* ── Small halftone accent patches in centre ───────── */}
      <rect x="560" y="195" width="80" height="80" rx="4" fill="url(#crDot1)" opacity="0.55" />
      <rect x="660" y="195" width="80" height="80" rx="4" fill="url(#crDot4)" opacity="0.50" />
      <rect x="560" y="290" width="80" height="80" rx="4" fill="url(#crDot3)" opacity="0.48" />
      <rect x="660" y="290" width="80" height="80" rx="4" fill="url(#crDot2)" opacity="0.52" />

      {/* ── Central glow ──────────────────────────────────── */}
      <rect width="1400" height="560" fill="url(#crGlow)" />

      {/* ── Small solid accent dots ───────────────────────── */}
      {[
        { x: 180,  y: 50,  r: 3, c: p.glow,  o: 0.55 },
        { x: 550,  y: 40,  r: 3.5, c: p.pop,   o: 0.50 },
        { x: 850,  y: 45,  r: 3, c: p.flame, o: 0.52 },
        { x: 1150, y: 55,  r: 3.5, c: p.surge, o: 0.48 },
        { x: 250,  y: 540, r: 3, c: p.blaze, o: 0.50 },
        { x: 500,  y: 535, r: 3.5, c: p.spark, o: 0.48 },
        { x: 900,  y: 540, r: 3, c: p.gold,  o: 0.50 },
        { x: 1200, y: 530, r: 3.5, c: p.glow,  o: 0.45 },
      ].map(({ x, y, r, c, o }, i) => (
        <g key={`sd${i}`}>
          <circle cx={x} cy={y} r={r + 4} fill={c} opacity={o * 0.12} />
          <circle cx={x} cy={y} r={r} fill={c} opacity={o} />
        </g>
      ))}

      </g>
    </svg>
  );
}
