/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, tall SVG hero background for the Integrations page.
 *
 * Visual motif — **"Nexus Grid"**: a circuit-board / integration-map
 * composed of a rectangular grid network with varying line weights,
 * glowing junction nodes drawn as plus-signs (+), rectangular "chip"
 * shapes representing integration endpoints, horizontal data-flow
 * chevrons, dashed connector paths, and soft glowing zones at key
 * junctions.
 *
 * Distinct from every other hero:
 *   Home  → constellation / orbital / hexagons
 *   Blog  → diagonals / radial circles
 *   Usecases → aurora bands / vertical pillars / concentric rects / stars
 *   This  → circuit traces / plus markers / chip rects / chevrons
 *
 * Uses a 1400×560 viewBox.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

/* ── Inline path helpers ──────────────────────────────────────────── */

/** Plus-sign (+) marker centred at (cx, cy). */
const plus = (cx: number, cy: number, arm: number, w = 1.4) =>
  `M${cx - arm},${cy - w / 2}h${arm - w / 2}v${-(arm - w / 2)}h${w}v${arm - w / 2}h${arm - w / 2}v${w}h${-(arm - w / 2)}v${arm - w / 2}h${-w}v${-(arm - w / 2)}h${-(arm - w / 2)}Z`;

/** Right-pointing chevron (>) at (cx, cy). */
const chevron = (cx: number, cy: number, s: number) =>
  `M${cx},${cy - s}L${cx + s},${cy}L${cx},${cy + s}`;

/* ── Component ────────────────────────────────────────────────────── */

export function SvgIntegrationsHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const warmA = p.isLight ? p.surge : p.flame;
  const warmB = p.isLight ? p.spark : p.gold;
  const warmC = p.isLight ? p.pop : p.blaze;

  return (
    <svg
      viewBox="0 0 1400 560"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* ── Grid pattern — primary circuit traces ────────── */}
        <pattern id="igGrid" width="70" height="70" patternUnits="userSpaceOnUse">
          <line x1="0" y1="35" x2="70" y2="35" stroke={p.primary} strokeOpacity="0.06" strokeWidth="0.5" />
          <line x1="35" y1="0" x2="35" y2="70" stroke={p.primary} strokeOpacity="0.06" strokeWidth="0.5" />
        </pattern>

        {/* ── Fine micro-grid ─────────────────────────────── */}
        <pattern id="igMicro" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect x="6.5" y="6.5" width="1" height="1" fill={p.primary} opacity="0.04" />
        </pattern>

        {/* ── Horizontal data-flow gradient bands ─────────── */}
        <linearGradient id="igBand1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={p.glow}  stopOpacity="0" />
          <stop offset="20%"  stopColor={p.glow}  stopOpacity="0.15" />
          <stop offset="50%"  stopColor={p.pop}   stopOpacity="0.12" />
          <stop offset="80%"  stopColor={p.spark} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="igBand2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={p.surge} stopOpacity="0" />
          <stop offset="25%"  stopColor={p.surge} stopOpacity="0.12" />
          <stop offset="55%"  stopColor={warmA} stopOpacity="0.14" />
          <stop offset="85%"  stopColor={warmB}  stopOpacity="0.12" />
          <stop offset="100%" stopColor={warmB}  stopOpacity="0" />
        </linearGradient>
        <linearGradient id="igBand3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={warmC} stopOpacity="0" />
          <stop offset="15%"  stopColor={warmC} stopOpacity="0.10" />
          <stop offset="50%"  stopColor={p.glow}  stopOpacity="0.13" />
          <stop offset="85%"  stopColor={p.pop}   stopOpacity="0.11" />
          <stop offset="100%" stopColor={p.pop}   stopOpacity="0" />
        </linearGradient>

        {/* ── Junction glow gradients ─────────────────────── */}
        <radialGradient id="igJG1" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={p.glow}  stopOpacity="0.22" />
          <stop offset="60%"  stopColor={p.glow}  stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.glow}  stopOpacity="0" />
        </radialGradient>
        <radialGradient id="igJG2" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={p.pop}   stopOpacity="0.20" />
          <stop offset="60%"  stopColor={p.pop}   stopOpacity="0.05" />
          <stop offset="100%" stopColor={p.pop}   stopOpacity="0" />
        </radialGradient>
        <radialGradient id="igJG3" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={p.surge} stopOpacity="0.18" />
          <stop offset="60%"  stopColor={p.surge} stopOpacity="0.05" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="igJG4" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={warmA} stopOpacity="0.20" />
          <stop offset="60%"  stopColor={warmA} stopOpacity="0.05" />
          <stop offset="100%" stopColor={warmA} stopOpacity="0" />
        </radialGradient>

        {/* ── Central shimmer ─────────────────────────────── */}
        <radialGradient id="igCenter" cx="50%" cy="45%" r="42%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="25%"  stopColor={p.glow}  stopOpacity="0.10" />
          <stop offset="60%"  stopColor={p.pop}   stopOpacity="0.04" />
          <stop offset="100%" stopColor={p.pop}   stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Base fill ─────────────────────────────────────── */}
      <rect width="1400" height="560" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* ── Grid layers ───────────────────────────────────── */}
      <rect width="1400" height="560" fill="url(#igMicro)" />
      <rect width="1400" height="560" fill="url(#igGrid)" />

      {/* ── Major circuit traces (horizontal) ─────────────── */}
      {[105, 175, 245, 315, 385, 455].map((y, i) => {
        const colors = [p.glow, p.pop, p.spark, p.surge, p.flame, p.gold];
        return (
          <line key={`h${i}`} x1="0" y1={y} x2="1400" y2={y}
            stroke={colors[i]} strokeOpacity={0.10} strokeWidth={0.7 + (i % 2) * 0.3} />
        );
      })}

      {/* ── Major circuit traces (vertical) ───────────────── */}
      {[140, 280, 420, 560, 700, 840, 980, 1120, 1260].map((x, i) => {
        const colors = [p.pop, p.glow, p.surge, p.spark, p.flame, p.blaze, p.gold, p.pop, p.glow];
        return (
          <line key={`v${i}`} x1={x} y1="0" x2={x} y2="560"
            stroke={colors[i]} strokeOpacity={0.08} strokeWidth={0.6} />
        );
      })}

      {/* ── Horizontal gradient data-flow bands ───────────── */}
      <rect x="0" y="90"  width="1400" height="50" fill="url(#igBand1)" />
      <rect x="0" y="240" width="1400" height="55" fill="url(#igBand2)" />
      <rect x="0" y="400" width="1400" height="50" fill="url(#igBand3)" />

      {/* ── Dashed connector paths between chips ──────────── */}
      <path d="M200 175 H420 V315 H700"
        fill="none" stroke={p.glow} strokeOpacity="0.14" strokeWidth="1" strokeDasharray="6 4" />
      <path d="M700 175 H980 V315 H1200"
        fill="none" stroke={p.pop} strokeOpacity="0.12" strokeWidth="1" strokeDasharray="6 4" />
      <path d="M350 385 H560 V245 H840"
        fill="none" stroke={p.surge} strokeOpacity="0.11" strokeWidth="1" strokeDasharray="5 5" />
      <path d="M840 385 H1050 V245 H1260"
        fill="none" stroke={p.spark} strokeOpacity="0.10" strokeWidth="1" strokeDasharray="5 5" />
      <path d="M140 105 V245 H420"
        fill="none" stroke={warmA} strokeOpacity="0.10" strokeWidth="0.8" strokeDasharray="4 4" />
      <path d="M1260 455 V315 H980"
        fill="none" stroke={warmB} strokeOpacity="0.10" strokeWidth="0.8" strokeDasharray="4 4" />

      {/* ── Chip / component rectangles ───────────────────── */}
      {[
        { x: 155, y: 155, w: 90, h: 40, c: p.glow,  o: 0.12 },
        { x: 375, y: 295, w: 90, h: 40, c: p.pop,   o: 0.10 },
        { x: 655, y: 155, w: 90, h: 40, c: p.spark,  o: 0.11 },
        { x: 935, y: 295, w: 90, h: 40, c: p.surge,  o: 0.10 },
        { x: 515, y: 365, w: 90, h: 40, c: warmA,  o: 0.10 },
        { x: 1155, y: 155, w: 90, h: 40, c: warmC,  o: 0.09 },
        { x: 295, y: 435, w: 80, h: 36, c: p.gold,   o: 0.09 },
        { x: 1035, y: 435, w: 80, h: 36, c: p.glow,  o: 0.10 },
      ].map(({ x, y, w, h, c, o }, i) => (
        <g key={`chip${i}`}>
          <rect x={x} y={y} width={w} height={h} rx={6} fill={c} opacity={o * 0.5} />
          <rect x={x} y={y} width={w} height={h} rx={6} fill="none" stroke={c} strokeOpacity={o} strokeWidth={0.8} />
          {/* Internal "pin" lines */}
          <line x1={x + 8} y1={y + h / 2} x2={x + w - 8} y2={y + h / 2}
            stroke={c} strokeOpacity={o * 0.7} strokeWidth={0.4} />
        </g>
      ))}

      {/* ── Junction glow zones ───────────────────────────── */}
      <rect x="600"  y="155" width="200" height="200" rx="100" fill="url(#igJG1)" />
      <rect x="100"  y="80"  width="180" height="180" rx="90"  fill="url(#igJG2)" />
      <rect x="1050" y="300" width="200" height="180" rx="90"  fill="url(#igJG3)" />
      <rect x="350"  y="350" width="160" height="160" rx="80"  fill="url(#igJG4)" />
      <rect width="1400" height="560" fill="url(#igCenter)" />

      {/* ── Plus-sign (+) junction markers ────────────────── */}
      <path d={plus(140, 175, 6)}  fill={p.glow}  opacity={0.70} />
      <path d={plus(280, 175, 5)}  fill={p.pop}   opacity={0.65} />
      <path d={plus(420, 245, 6)}  fill={p.spark}  opacity={0.68} />
      <path d={plus(560, 315, 5)}  fill={p.surge}  opacity={0.62} />
      <path d={plus(700, 175, 7)}  fill={p.glow}  opacity={0.75} />
      <path d={plus(700, 315, 6)}  fill={p.pop}   opacity={0.68} />
      <path d={plus(840, 245, 5)}  fill={p.flame}  opacity={0.65} />
      <path d={plus(980, 315, 6)}  fill={p.blaze}  opacity={0.62} />
      <path d={plus(1120, 175, 5)} fill={p.gold}   opacity={0.60} />
      <path d={plus(1260, 245, 6)} fill={p.surge}  opacity={0.65} />
      <path d={plus(140, 385, 5)}  fill={p.spark}  opacity={0.58} />
      <path d={plus(420, 385, 5)}  fill={p.pop}   opacity={0.60} />
      <path d={plus(560, 105, 5)}  fill={p.flame}  opacity={0.55} />
      <path d={plus(980, 105, 5)}  fill={p.gold}   opacity={0.58} />
      <path d={plus(280, 455, 5)}  fill={p.glow}  opacity={0.55} />
      <path d={plus(1120, 455, 5)} fill={p.blaze}  opacity={0.58} />

      {/* ── Data-flow chevrons (>) along traces ───────────── */}
      <path d={chevron(310, 175, 4)}  fill="none" stroke={p.glow}  strokeOpacity={0.50} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chevron(480, 175, 3.5)} fill="none" stroke={p.pop}   strokeOpacity={0.45} strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chevron(620, 315, 4)}  fill="none" stroke={p.spark}  strokeOpacity={0.48} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chevron(870, 315, 3.5)} fill="none" stroke={p.surge}  strokeOpacity={0.42} strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chevron(200, 245, 3.5)} fill="none" stroke={p.flame}  strokeOpacity={0.45} strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chevron(1100, 245, 4)} fill="none" stroke={p.gold}   strokeOpacity={0.48} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chevron(500, 385, 3.5)} fill="none" stroke={p.blaze}  strokeOpacity={0.42} strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chevron(770, 105, 3.5)} fill="none" stroke={p.pop}   strokeOpacity={0.40} strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chevron(350, 455, 3.5)} fill="none" stroke={p.glow}  strokeOpacity={0.40} strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round" />
      <path d={chevron(1050, 455, 3.5)} fill="none" stroke={p.spark} strokeOpacity={0.42} strokeWidth={1.0} strokeLinecap="round" strokeLinejoin="round" />

      {/* ── Small square node markers at secondary junctions ── */}
      {[
        { x: 210, y: 105, c: p.pop,   o: 0.45 },
        { x: 350, y: 175, c: p.spark,  o: 0.48 },
        { x: 490, y: 245, c: p.surge,  o: 0.42 },
        { x: 630, y: 245, c: p.glow,  o: 0.50 },
        { x: 770, y: 175, c: p.flame,  o: 0.45 },
        { x: 910, y: 245, c: p.blaze,  o: 0.42 },
        { x: 1050, y: 175, c: p.gold,  o: 0.48 },
        { x: 350, y: 315, c: p.pop,   o: 0.40 },
        { x: 770, y: 385, c: p.glow,  o: 0.42 },
        { x: 1050, y: 315, c: p.spark, o: 0.45 },
        { x: 490, y: 455, c: p.surge,  o: 0.38 },
        { x: 910, y: 455, c: p.flame,  o: 0.40 },
      ].map(({ x, y, c, o }, i) => (
        <rect key={`sq${i}`} x={x - 2} y={y - 2} width={4} height={4} fill={c} opacity={o} />
      ))}

      {/* ── Soft elliptical glow halos for depth ──────────── */}
      <ellipse cx="350"  cy="175" rx="100" ry="50" fill={p.glow}  opacity="0.035" />
      <ellipse cx="700"  cy="280" rx="130" ry="65" fill={p.pop}   opacity="0.03" />
      <ellipse cx="1050" cy="350" rx="110" ry="55" fill={p.spark}  opacity="0.035" />
      <ellipse cx="200"  cy="400" rx="90"  ry="45" fill={p.surge}  opacity="0.03" />
      <ellipse cx="1200" cy="140" rx="100" ry="50" fill={p.flame}  opacity="0.03" />

      </g>
    </svg>
  );
}
