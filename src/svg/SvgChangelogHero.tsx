/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, tall SVG hero background for the Changelog page.
 *
 * Visual motif — **"Helix Weave"**: interlocking sinusoidal wave paths
 * that weave over and under each other (evoking continuous evolution),
 * hexagonal node markers at wave-crossing points, horizontal ruled
 * "timeline" lines, upward-pointing triangle markers for release
 * milestones, stepped "version bar" rectangles, and zigzag connector
 * lines between version steps.
 *
 * Completely distinct from all other hero flavours:
 *   Home         → constellation / orbital / hex grid
 *   Blog/Login/… → diagonals / radial circles
 *   Usecases     → aurora bands / vertical pillars / concentric rects / stars
 *   Integrations → circuit traces / plus markers / chip rects / chevrons
 *   This         → sinusoidal helices / hexagons / triangles / version bars
 *
 * Uses a 1400×560 viewBox.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

/* ── Inline path helpers ──────────────────────────────────────────── */

/** Regular hexagon centred at (cx, cy) with circumradius r. */
const hex = (cx: number, cy: number, r: number) => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  });
  return `M${pts.join('L')}Z`;
};

/** Upward-pointing equilateral triangle centred at (cx, cy). */
const triUp = (cx: number, cy: number, r: number) => {
  const h = r * Math.sqrt(3) / 2;
  return `M${cx},${cy - r}L${cx + h},${cy + r * 0.5}L${cx - h},${cy + r * 0.5}Z`;
};

/**
 * Build a smooth sinusoidal path string.
 *   amp = amplitude, freq = cycles-per-1400px, phaseShift in px.
 */
const sinePath = (yBase: number, amp: number, freq: number, phase: number) => {
  const pts: string[] = [];
  for (let x = -10; x <= 1410; x += 5) {
    const y = yBase + amp * Math.sin((2 * Math.PI * freq * (x - phase)) / 1400);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M${pts[0]} ${pts.slice(1).map(p => `L${p}`).join(' ')}`;
};

/** Zigzag path between two (x,y) endpoints with n teeth. */
const zigzag = (x1: number, y1: number, x2: number, y2: number, teeth: number, amp: number) => {
  const dx = (x2 - x1) / (teeth * 2);
  const dy = (y2 - y1) / (teeth * 2);
  // perpendicular direction
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = (-dy / len) * amp;
  const py = (dx / len) * amp;
  let d = `M${x1},${y1}`;
  for (let i = 0; i < teeth * 2; i++) {
    const cx = x1 + dx * (i + 1);
    const cy = y1 + dy * (i + 1);
    const sign = i % 2 === 0 ? 1 : -1;
    d += ` L${(cx + px * sign).toFixed(1)},${(cy + py * sign).toFixed(1)}`;
  }
  d += ` L${x2},${y2}`;
  return d;
};

/* ── Component ────────────────────────────────────────────────────── */

export function SvgChangelogHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const warmA = p.isLight ? p.surge : p.flame;
  const warmB = p.isLight ? p.spark : p.gold;
  const warmC = p.isLight ? p.pop : p.blaze;

  /* Pre-compute helix paths (3 interlocking pairs) */
  const helices = [
    { yBase: 180, amp: 55, freq: 2.0, phase: 0,   c1: p.glow,  c2: p.surge   },
    { yBase: 290, amp: 50, freq: 2.5, phase: 180,  c1: p.surge, c2: p.spark },
    { yBase: 400, amp: 45, freq: 1.8, phase: 90,   c1: warmA, c2: warmB  },
  ];

  /* Crossing-point approx X positions for hexagonal markers */
  const crossings = [
    { x: 175, y: 180, c: p.glow  },
    { x: 525, y: 180, c: p.surge   },
    { x: 875, y: 180, c: p.glow  },
    { x: 1225, y: 180, c: p.surge  },
    { x: 105, y: 290, c: p.surge },
    { x: 385, y: 290, c: p.spark },
    { x: 665, y: 290, c: p.surge },
    { x: 945, y: 290, c: p.spark },
    { x: 1225, y: 290, c: p.surge },
    { x: 245, y: 400, c: warmA },
    { x: 635, y: 400, c: warmB  },
    { x: 1025, y: 400, c: warmA },
    { x: 1330, y: 400, c: warmB },
  ];

  return (
    <svg
      viewBox="0 0 1400 560"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* ── Dot-rule pattern (like notebook paper) ──────── */}
        <pattern id="clRule" width="1400" height="28" patternUnits="userSpaceOnUse">
          <line x1="0" y1="28" x2="1400" y2="28" stroke={p.primary} strokeOpacity="0.04" strokeWidth="0.4" />
        </pattern>

        {/* ── Fine tick-mark pattern ──────────────────────── */}
        <pattern id="clTick" width="70" height="560" patternUnits="userSpaceOnUse">
          <line x1="35" y1="0" x2="35" y2="560" stroke={p.primary} strokeOpacity="0.025" strokeWidth="0.3" />
        </pattern>

        {/* ── Helix glow gradients ────────────────────────── */}
        <linearGradient id="clHG1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={p.glow}  stopOpacity="0" />
          <stop offset="25%"  stopColor={p.glow}  stopOpacity="0.20" />
          <stop offset="50%"  stopColor={p.surge}   stopOpacity="0.16" />
          <stop offset="75%"  stopColor={p.glow}  stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.glow}  stopOpacity="0" />
        </linearGradient>
        <linearGradient id="clHG2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={p.surge} stopOpacity="0" />
          <stop offset="30%"  stopColor={p.surge} stopOpacity="0.18" />
          <stop offset="60%"  stopColor={p.spark} stopOpacity="0.15" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="clHG3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={warmA} stopOpacity="0" />
          <stop offset="20%"  stopColor={warmA} stopOpacity="0.16" />
          <stop offset="55%"  stopColor={warmB}  stopOpacity="0.18" />
          <stop offset="100%" stopColor={warmB}  stopOpacity="0" />
        </linearGradient>

        {/* ── Central glow ────────────────────────────────── */}
        <radialGradient id="clCenter" cx="50%" cy="45%" r="45%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="30%"  stopColor={p.glow}  stopOpacity="0.08" />
          <stop offset="60%"  stopColor={p.surge}   stopOpacity="0.04" />
          <stop offset="100%" stopColor={p.surge}   stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Base fill ─────────────────────────────────────── */}
      <rect width="1400" height="560" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* ── Grid / ruled layers ───────────────────────────── */}
      <rect width="1400" height="560" fill="url(#clTick)" />
      <rect width="1400" height="560" fill="url(#clRule)" />

      {/* ── Horizontal timeline ruling lines ──────────────── */}
      {[70, 140, 210, 280, 350, 420, 490].map((y, i) => {
        const colors = [p.glow, p.surge, p.spark, p.surge, p.flame, p.gold, p.blaze];
        return (
          <line key={`rl${i}`} x1="0" y1={y} x2="1400" y2={y}
            stroke={colors[i]} strokeOpacity={0.06} strokeWidth={0.5} />
        );
      })}

      {/* ── Sinusoidal helix wave pairs ───────────────────── */}
      {helices.map(({ yBase, amp, freq, phase, c1, c2 }, i) => (
        <g key={`helix${i}`}>
          {/* "Shadow" wide glow band */}
          <rect x="0" y={yBase - amp - 20} width="1400" height={amp * 2 + 40}
            fill={`url(#clHG${i + 1})`} opacity="0.35" />
          {/* Upper strand */}
          <path d={sinePath(yBase, amp, freq, phase)}
            fill="none" stroke={c1} strokeOpacity={0.28} strokeWidth={1.8} />
          {/* Lower strand (phase-shifted by half-cycle) */}
          <path d={sinePath(yBase, amp, freq, phase + 700 / freq)}
            fill="none" stroke={c2} strokeOpacity={0.22} strokeWidth={1.4} />
        </g>
      ))}

      {/* ── Central shimmer ───────────────────────────────── */}
      <rect width="1400" height="560" fill="url(#clCenter)" />

      {/* ── Hexagonal node markers at wave crossings ──────── */}
      {crossings.map(({ x, y, c }, i) => (
        <g key={`hx${i}`}>
          <path d={hex(x, y, 10)} fill={c} opacity={0.06} />
          <path d={hex(x, y, 10)} fill="none" stroke={c} strokeOpacity={0.18} strokeWidth={0.6} />
          <path d={hex(x, y, 4)}  fill={c} opacity={0.55} />
        </g>
      ))}

      {/* ── Upward-pointing triangle release markers ──────── */}
      {[
        { x: 100,  y: 80, c: p.glow,  o: 0.60 },
        { x: 275,  y: 70, c: p.surge,   o: 0.55 },
        { x: 450,  y: 85, c: p.spark,  o: 0.58 },
        { x: 625,  y: 65, c: p.surge,  o: 0.52 },
        { x: 800,  y: 78, c: warmA,  o: 0.55 },
        { x: 975,  y: 72, c: warmB,   o: 0.58 },
        { x: 1150, y: 82, c: warmC,  o: 0.52 },
        { x: 1320, y: 68, c: p.glow,  o: 0.55 },
        { x: 180,  y: 500, c: p.surge,  o: 0.48 },
        { x: 380,  y: 510, c: p.glow,  o: 0.50 },
        { x: 580,  y: 495, c: p.surge,   o: 0.45 },
        { x: 780,  y: 505, c: p.spark,  o: 0.48 },
        { x: 980,  y: 498, c: warmA,  o: 0.50 },
        { x: 1180, y: 508, c: warmB,   o: 0.45 },
      ].map(({ x, y, c, o }, i) => (
        <path key={`tri${i}`} d={triUp(x, y, 4)} fill={c} opacity={o} />
      ))}

      {/* ── Version-bar stepped rectangles ────────────────── */}
      {[
        { x: 60,   y: 130, w: 80, h: 20, c: p.glow,  o: 0.10 },
        { x: 220,  y: 120, w: 90, h: 22, c: p.surge,   o: 0.09 },
        { x: 400,  y: 125, w: 85, h: 20, c: p.spark,  o: 0.10 },
        { x: 580,  y: 115, w: 95, h: 24, c: p.surge,  o: 0.08 },
        { x: 780,  y: 122, w: 80, h: 20, c: warmA,  o: 0.09 },
        { x: 940,  y: 118, w: 90, h: 22, c: warmB,   o: 0.10 },
        { x: 1120, y: 128, w: 85, h: 20, c: warmC,  o: 0.08 },
        { x: 1280, y: 116, w: 75, h: 20, c: p.glow,  o: 0.09 },
      ].map(({ x, y, w, h, c, o }, i) => (
        <g key={`vb${i}`}>
          <rect x={x} y={y} width={w} height={h} rx={4} fill={c} opacity={o * 0.5} />
          <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke={c} strokeOpacity={o} strokeWidth={0.6} />
        </g>
      ))}

      {/* ── Zigzag connectors between version bars ────────── */}
      <path d={zigzag(140, 140, 220, 131, 4, 5)}
        fill="none" stroke={p.glow} strokeOpacity={0.12} strokeWidth={0.7} />
      <path d={zigzag(310, 131, 400, 135, 4, 5)}
        fill="none" stroke={p.surge} strokeOpacity={0.10} strokeWidth={0.6} />
      <path d={zigzag(485, 135, 580, 127, 4, 5)}
        fill="none" stroke={p.spark} strokeOpacity={0.10} strokeWidth={0.6} />
      <path d={zigzag(675, 127, 780, 132, 4, 5)}
        fill="none" stroke={p.surge} strokeOpacity={0.10} strokeWidth={0.6} />
      <path d={zigzag(860, 132, 940, 129, 4, 5)}
        fill="none" stroke={p.flame} strokeOpacity={0.10} strokeWidth={0.6} />
      <path d={zigzag(1030, 129, 1120, 138, 4, 5)}
        fill="none" stroke={p.gold} strokeOpacity={0.10} strokeWidth={0.6} />
      <path d={zigzag(1205, 138, 1280, 126, 4, 5)}
        fill="none" stroke={p.blaze} strokeOpacity={0.10} strokeWidth={0.6} />

      {/* ── Soft elliptical glow halos for depth ──────────── */}
      <ellipse cx="350"  cy="180" rx="120" ry="55" fill={p.glow}  opacity="0.035" />
      <ellipse cx="700"  cy="290" rx="140" ry="60" fill={p.surge} opacity="0.03" />
      <ellipse cx="1050" cy="180" rx="110" ry="50" fill={p.surge}   opacity="0.035" />
      <ellipse cx="200"  cy="400" rx="100" ry="45" fill={p.flame} opacity="0.03" />
      <ellipse cx="1150" cy="400" rx="120" ry="55" fill={p.gold}  opacity="0.03" />
      <ellipse cx="500"  cy="100" rx="100" ry="40" fill={p.spark} opacity="0.025" />

      </g>
    </svg>
  );
}
