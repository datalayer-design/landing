/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG hero background for the Partners page.
 *
 * Visual motif: a partnership network — two anchor hubs (left & right)
 * linked through a central relay spine, evoking organisations connecting
 * via shared infrastructure. Built with the same node/edge/halo + colour
 * logic as SvgCommunityHero, but with a deliberately different node
 * distribution (bridge topology instead of 5 organic clusters).
 *
 * Uses a 1400×400 viewBox to match the hero's minHeight.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

type NodeColorKey = keyof Pick<
  ColorPalette,
  'glow' | 'pop' | 'spark' | 'blaze' | 'surge' | 'flame' | 'gold'
>;

interface PartnerNode {
  x: number;
  y: number;
  r: number;
  colorKey: NodeColorKey;
  hub: number; // 0 = left hub, 1 = relay spine, 2 = right hub
}

/* ── Partner node distribution — bridge topology ─────────────────── */
const NODES: PartnerNode[] = [
  // Left hub (anchor organisation)
  { x: 200, y: 200, r: 6.5, colorKey: 'glow', hub: 0 },
  { x: 140, y: 140, r: 4.0, colorKey: 'pop', hub: 0 },
  { x: 150, y: 270, r: 4.2, colorKey: 'surge', hub: 0 },
  { x: 270, y: 150, r: 4.5, colorKey: 'spark', hub: 0 },
  { x: 280, y: 260, r: 4.0, colorKey: 'glow', hub: 0 },
  // Relay spine (shared infrastructure across the centre)
  { x: 430, y: 200, r: 4.8, colorKey: 'surge', hub: 1 },
  { x: 560, y: 150, r: 4.2, colorKey: 'glow', hub: 1 },
  { x: 580, y: 270, r: 3.8, colorKey: 'spark', hub: 1 },
  { x: 700, y: 200, r: 7.0, colorKey: 'glow', hub: 1 },
  { x: 820, y: 140, r: 3.8, colorKey: 'pop', hub: 1 },
  { x: 840, y: 260, r: 4.2, colorKey: 'surge', hub: 1 },
  { x: 970, y: 200, r: 4.8, colorKey: 'spark', hub: 1 },
  // Right hub (partner organisation)
  { x: 1200, y: 200, r: 6.5, colorKey: 'glow', hub: 2 },
  { x: 1130, y: 145, r: 4.5, colorKey: 'surge', hub: 2 },
  { x: 1120, y: 265, r: 4.0, colorKey: 'pop', hub: 2 },
  { x: 1260, y: 150, r: 4.0, colorKey: 'spark', hub: 2 },
  { x: 1270, y: 260, r: 4.2, colorKey: 'glow', hub: 2 },
];

/** Straight-line connections (index pairs into NODES). */
const EDGES: [number, number][] = [
  // Left hub internal mesh
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 4],
  // Relay spine chain
  [5, 6], [5, 7], [6, 8], [7, 8], [8, 9], [8, 10], [9, 11], [10, 11],
  // Right hub internal mesh
  [12, 13], [12, 14], [12, 15], [12, 16], [13, 15], [14, 16],
  // Bridges: left hub → relay → right hub
  [0, 5], [4, 5], [3, 6], [11, 12], [9, 12], [10, 14],
];

/** Hub centres for faint enclosing halos. */
const HUBS = [
  { cx: 205, cy: 205, r: 105 },
  { cx: 700, cy: 205, r: 95 },
  { cx: 1195, cy: 205, r: 105 },
];

/** Deterministic breathing params per node (no RNG → SSR-safe + stable). */
function breath(i: number) {
  const dur = 3.4 + ((i * 0.7) % 3);
  const delay = (i * 0.53) % 4;
  const minOp = 0.1 + ((i % 3) * 0.02);
  const maxOp = 0.24 + ((i % 4) * 0.03);
  return { dur, delay, minOp, maxOp };
}

/** Deterministic edge pulse params. */
function edgePulse(i: number) {
  const dur = 4 + ((i * 0.9) % 4);
  const delay = (i * 0.61) % 5;
  const peakOp = 0.26 + ((i % 5) * 0.03);
  return { dur, delay, peakOp };
}

export function SvgPartnersHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <svg
      viewBox="0 0 1400 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* Radial glow zones */}
        <radialGradient id="ptGlow1" cx="15%" cy="50%" r="42%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.55" />
          <stop offset="45%" stopColor={p.glow} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ptGlow2" cx="50%" cy="50%" r="46%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.58" />
          <stop offset="38%" stopColor={p.glow} stopOpacity="0.16" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ptGlow3" cx="85%" cy="50%" r="42%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.52" />
          <stop offset="45%" stopColor={p.surge} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ptGlow4" cx="35%" cy="18%" r="36%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.42" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ptGlow5" cx="65%" cy="85%" r="36%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.42" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        {/* Diagonal shimmer sweep */}
        <linearGradient id="ptShimmer" x1="0" y1="0.2" x2="1" y2="0.8">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0" />
          <stop offset="25%" stopColor={p.surge} stopOpacity="0.14" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.18" />
          <stop offset="75%" stopColor={p.surge} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </linearGradient>

        {/* Fine dot grid */}
        <pattern id="ptDots" width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.55" fill={p.glow} opacity="0.10" />
        </pattern>
        {/* Triangle mesh underlay */}
        <pattern id="ptMesh" width="56" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(-6)">
          <polygon points="28,0 56,48 0,48" fill="none" stroke={p.glow} strokeOpacity="0.05" strokeWidth="0.5" />
          <polygon points="28,48 56,0 0,0" fill="none" stroke={p.surge} strokeOpacity="0.04" strokeWidth="0.4" />
        </pattern>
      </defs>

      {/* Base background */}
      <rect width="1400" height="400" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

        {/* Pattern layers */}
        <rect width="1400" height="400" fill="url(#ptDots)" />
        <rect width="1400" height="400" fill="url(#ptMesh)" />

        {/* Radial glow zones */}
        <rect width="1400" height="400" fill="url(#ptGlow1)" />
        <rect width="1400" height="400" fill="url(#ptGlow2)" />
        <rect width="1400" height="400" fill="url(#ptGlow3)" />
        <rect width="1400" height="400" fill="url(#ptGlow4)" />
        <rect width="1400" height="400" fill="url(#ptGlow5)" />
        <rect width="1400" height="400" fill="url(#ptShimmer)" />

        {/* Diagonal streak highlights */}
        <line x1="150" y1="0" x2="650" y2="400" stroke={p.glow} strokeOpacity="0.08" strokeWidth="40" />
        <line x1="750" y1="0" x2="1250" y2="400" stroke={p.surge} strokeOpacity="0.07" strokeWidth="34" />
        <line x1="400" y1="0" x2="900" y2="400" stroke={p.glow} strokeOpacity="0.05" strokeWidth="24" />

        {/* Hub enclosing halos */}
        {HUBS.map((h, hi) => {
          const clr = hi === 2 ? p.surge : p.glow;
          return (
            <g key={`hub-${hi}`}>
              <circle cx={h.cx} cy={h.cy} r={h.r} fill={clr} opacity="0.04" />
              <circle cx={h.cx} cy={h.cy} r={h.r} fill="none" stroke={clr}
                strokeOpacity="0.14" strokeWidth="0.8"
                strokeDasharray={hi % 2 === 0 ? '8 6' : '4 8'} />
              <circle cx={h.cx} cy={h.cy} r={h.r + 18} fill="none" stroke={clr}
                strokeOpacity="0.07" strokeWidth="0.5" strokeDasharray="3 7" />
            </g>
          );
        })}

        {/* Network edges — straight lines with breathing pulse */}
        {EDGES.map(([ai, bi], i) => {
          const a = NODES[ai];
          const b = NODES[bi];
          const isBridge = a.hub !== b.hub;
          const color = p[a.colorKey];
          const ep = edgePulse(i);
          return (
            <g key={`edge-${i}`}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={color}
                strokeOpacity={isBridge ? 0.16 : 0.26}
                strokeWidth={isBridge ? 0.7 : 1.0}
                strokeDasharray={isBridge ? '5 7' : undefined}
              />
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={color} strokeWidth={isBridge ? 0.9 : 1.3} opacity="0">
                <animate attributeName="opacity"
                  values={`0;${ep.peakOp.toFixed(2)};0`}
                  keyTimes="0;0.5;1"
                  dur={`${ep.dur.toFixed(1)}s`}
                  begin={`${ep.delay.toFixed(1)}s`}
                  repeatCount="indefinite"
                />
              </line>
            </g>
          );
        })}

        {/* Member nodes — glowing circles */}
        {NODES.map((m, i) => {
          const c = p[m.colorKey];
          const nb = breath(i);
          const isCore = m.r >= 6;
          return (
            <g key={`node-${i}`}>
              <circle cx={m.x} cy={m.y} r={m.r * 5} fill={c} opacity={nb.minOp.toFixed(2)}>
                <animate attributeName="opacity"
                  values={`${nb.minOp.toFixed(2)};${nb.maxOp.toFixed(2)};${nb.minOp.toFixed(2)}`}
                  dur={`${nb.dur.toFixed(1)}s`}
                  begin={`${nb.delay.toFixed(1)}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={m.x} cy={m.y} r={m.r * 2.5} fill={c} opacity={isCore ? 0.22 : 0.16} />
              <circle cx={m.x} cy={m.y} r={m.r * 2.5 + 1.5} fill="none" stroke={c}
                strokeOpacity={isCore ? 0.38 : 0.28} strokeWidth={isCore ? 1.0 : 0.7} />
              <circle cx={m.x} cy={m.y} r={m.r} fill={c} opacity={isCore ? 0.95 : 0.88} />
            </g>
          );
        })}

        {/* Flowing data-stream curves */}
        <path d="M0 110 Q300 70 600 100 T1200 75 T1400 95" fill="none" stroke={p.glow} strokeOpacity="0.20" strokeWidth="1.2" />
        <path d="M0 320 Q350 280 700 310 T1400 295" fill="none" stroke={p.surge} strokeOpacity="0.16" strokeWidth="1.0" />
        <path d="M0 360 Q400 330 800 350 T1400 340" fill="none" stroke={p.glow} strokeOpacity="0.13" strokeWidth="0.9" />

        {/* Sparkle nodes */}
        <circle cx="60" cy="70" r="1.8" fill={p.glow} opacity="0.80" />
        <circle cx="380" cy="50" r="1.6" fill={p.surge} opacity="0.72" />
        <circle cx="700" cy="44" r="2.0" fill={p.glow} opacity="0.78" />
        <circle cx="1020" cy="56" r="1.7" fill={p.surge} opacity="0.70" />
        <circle cx="1340" cy="60" r="1.8" fill={p.glow} opacity="0.76" />
        <circle cx="120" cy="350" r="1.7" fill={p.surge} opacity="0.72" />
        <circle cx="500" cy="368" r="1.9" fill={p.glow} opacity="0.74" />
        <circle cx="900" cy="360" r="1.6" fill={p.surge} opacity="0.70" />
        <circle cx="1280" cy="352" r="1.8" fill={p.glow} opacity="0.74" />

        {/* Large halo glows for depth */}
        <circle cx="205" cy="205" r="90" fill={p.glow} opacity="0.07" />
        <circle cx="700" cy="205" r="100" fill={p.glow} opacity="0.06" />
        <circle cx="1195" cy="205" r="90" fill={p.surge} opacity="0.07" />

        {/* Side ring arcs */}
        <path d="M70 360 A180 180 0 0 1 70 40" fill="none" stroke={p.glow} strokeOpacity="0.14" strokeWidth="0.9" strokeDasharray="5 7" />
        <path d="M1330 40 A180 180 0 0 1 1330 360" fill="none" stroke={p.surge} strokeOpacity="0.14" strokeWidth="0.9" strokeDasharray="5 7" />
      </g>
    </svg>
  );
}

export default SvgPartnersHero;
