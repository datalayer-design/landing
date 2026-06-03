/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG hero background for the Community page.
 *
 * Visual motif: a living constellation of many small community member
 * nodes clustered into 5 organic groups, connected by thin straight
 * lines.  Animated ripple waves radiate outward from random nodes,
 * tiny particles orbit cluster centres, and faint pulse glows breathe
 * across the canvas — evoking an active, growing community.
 *
 * Deliberately different from SvgAgentsHomeHero:
 *  • More nodes (18), smaller, no labels
 *  • Straight-line connections (not curves)
 *  • Ripple-wave animations instead of travelling dots
 *  • 5 cluster groups with faint enclosing circles
 *  • Orbiting particles around each cluster centre
 *  • No concentric coordination rings
 *  • Triangle-mesh pattern underlay (vs honeycomb/dot)
 *
 * Uses a 1400×560 viewBox to match the hero's minHeight.
 */

import { useMemo } from 'react';
import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

/** Seeded PRNG (mulberry32) — different pattern each page load. */
function createRng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Community member node positions ─────────────────────────────── */
interface MemberNode {
  x: number;
  y: number;
  r: number;           // base radius
  colorKey: keyof Pick<ColorPalette, 'glow' | 'pop' | 'spark' | 'blaze' | 'surge' | 'flame' | 'gold'>;
  cluster: number;     // 0-4 cluster index
}

const MEMBERS: MemberNode[] = [
  // Cluster 0 — upper-left (Builders)
  { x: 180, y: 160, r: 5.5, colorKey: 'glow',  cluster: 0 },
  { x: 240, y: 120, r: 4.0, colorKey: 'pop',   cluster: 0 },
  { x: 140, y: 210, r: 3.5, colorKey: 'surge', cluster: 0 },
  { x: 260, y: 200, r: 4.5, colorKey: 'glow',  cluster: 0 },
  // Cluster 1 — centre-left (Contributors)
  { x: 380, y: 340, r: 5.0, colorKey: 'spark', cluster: 1 },
  { x: 440, y: 290, r: 3.8, colorKey: 'glow',  cluster: 1 },
  { x: 340, y: 380, r: 4.2, colorKey: 'surge', cluster: 1 },
  { x: 460, y: 370, r: 3.5, colorKey: 'pop',   cluster: 1 },
  // Cluster 2 — centre (Core)
  { x: 700, y: 260, r: 6.5, colorKey: 'glow',  cluster: 2 },
  { x: 650, y: 200, r: 4.5, colorKey: 'pop',   cluster: 2 },
  { x: 760, y: 210, r: 4.0, colorKey: 'surge', cluster: 2 },
  { x: 680, y: 330, r: 4.8, colorKey: 'spark', cluster: 2 },
  { x: 740, y: 320, r: 3.6, colorKey: 'glow',  cluster: 2 },
  // Cluster 3 — centre-right (Advocates)
  { x: 960, y: 310, r: 5.2, colorKey: 'blaze', cluster: 3 },
  { x: 1020, y: 260, r: 4.0, colorKey: 'glow',  cluster: 3 },
  { x: 920, y: 360, r: 3.8, colorKey: 'surge', cluster: 3 },
  // Cluster 4 — upper-right (Learners)
  { x: 1180, y: 170, r: 5.0, colorKey: 'flame', cluster: 4 },
  { x: 1240, y: 130, r: 4.2, colorKey: 'glow',  cluster: 4 },
  { x: 1140, y: 220, r: 3.6, colorKey: 'gold',  cluster: 4 },
  { x: 1260, y: 210, r: 4.0, colorKey: 'surge', cluster: 4 },
];

/** Straight-line connections (index pairs into MEMBERS). */
const EDGES: [number, number][] = [
  // Intra-cluster edges (dense)
  [0, 1], [0, 2], [0, 3], [1, 3], [2, 3],
  [4, 5], [4, 6], [4, 7], [5, 7], [6, 7],
  [8, 9], [8, 10], [8, 11], [8, 12], [9, 10], [11, 12], [9, 12],
  [13, 14], [13, 15], [14, 15],
  [16, 17], [16, 18], [16, 19], [17, 19], [18, 19],
  // Inter-cluster bridges (sparse, longer)
  [3, 5],   // cluster 0 → 1
  [1, 9],   // cluster 0 → 2
  [5, 9],   // cluster 1 → 2
  [7, 11],  // cluster 1 → 2
  [10, 14], // cluster 2 → 3
  [12, 13], // cluster 2 → 3
  [14, 17], // cluster 3 → 4
  [10, 19], // cluster 2 → 4
];

/** Cluster centres for orbiting particles & enclosing circles. */
const CLUSTERS = [
  { cx: 205, cy: 172, label: 'Builders' },
  { cx: 405, cy: 345, label: 'Contributors' },
  { cx: 706, cy: 264, label: 'Core' },
  { cx: 967, cy: 310, label: 'Advocates' },
  { cx: 1205, cy: 182, label: 'Learners' },
];

type MovingAccentKey = keyof Pick<
  ColorPalette,
  'glow' | 'surge' | 'pop' | 'spark' | 'blaze' | 'gold' | 'flame'
>;

const CLUSTER_MOVING_ACCENT_SEQUENCES: MovingAccentKey[][] = [
  ['spark', 'pop', 'surge'],
  ['pop', 'glow', 'spark'],
  ['spark', 'gold', 'blaze'],
  ['blaze', 'gold', 'flame'],
  ['flame', 'gold', 'blaze'],
];

export function SvgCommunityHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  /** Randomised animation params — stable per mount. */
  const anims = useMemo(() => {
    const rng = createRng(Date.now());

    // Ripple waves: pick 8 nodes that will ripple
    const rippleNodes = Array.from({ length: 8 }, () => {
      const idx = Math.floor(rng() * MEMBERS.length);
      const dur = 3.0 + rng() * 4.0;           // 3 – 7 s
      const delay = rng() * dur;
      const maxR = 30 + rng() * 50;             // 30 – 80
      return { idx, dur, delay, maxR };
    });

    // Orbiting particles: 3 per cluster
    const orbiters = CLUSTERS.map(() =>
      Array.from({ length: 3 }, () => ({
        orbitR: 40 + rng() * 60,                // 40 – 100
        dur: 6 + rng() * 12,                    // 6 – 18 s
        delay: rng() * 6,
        r: 1.2 + rng() * 1.5,                   // 1.2 – 2.7
        clockwise: rng() > 0.5,
      }))
    );

    // Edge shimmer: random pulse delay per edge
    const edgePulses = EDGES.map(() => ({
      dur: 4 + rng() * 5,
      delay: rng() * 6,
      peakOp: 0.25 + rng() * 0.20,             // 0.25 – 0.45
    }));

    // Node breathing: each node pulses its outer halo
    const nodeBreaths = MEMBERS.map(() => ({
      dur: 3 + rng() * 4,
      delay: rng() * 4,
      minOp: 0.08 + rng() * 0.06,
      maxOp: 0.22 + rng() * 0.14,
    }));

    return { rippleNodes, orbiters, edgePulses, nodeBreaths };
  }, []);

  return (
    <svg
      viewBox="0 0 1400 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* Radial glows — 8 zones */}
        <radialGradient id="cmGlow1" cx="15%" cy="30%" r="40%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.55" />
          <stop offset="45%" stopColor={p.glow} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cmGlow2" cx="50%" cy="47%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.60" />
          <stop offset="35%" stopColor={p.glow} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cmGlow3" cx="85%" cy="30%" r="40%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.50" />
          <stop offset="45%" stopColor={p.surge} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cmGlow4" cx="30%" cy="65%" r="42%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.48" />
          <stop offset="48%" stopColor={p.surge} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cmGlow5" cx="70%" cy="60%" r="42%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.45" />
          <stop offset="48%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cmGlow6" cx="50%" cy="10%" r="38%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.42" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cmGlow7" cx="50%" cy="90%" r="38%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.40" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cmGlow8" cx="20%" cy="80%" r="36%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.38" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        {/* Shimmer sweep — diagonal, different angle from agents hero */}
        <linearGradient id="cmShimmer" x1="0.05" y1="0.9" x2="0.95" y2="0.1">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0" />
          <stop offset="20%" stopColor={p.surge} stopOpacity="0.16" />
          <stop offset="40%" stopColor={p.glow} stopOpacity="0.18" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="80%" stopColor={p.glow} stopOpacity="0.16" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </linearGradient>

        {/* Triangle mesh pattern (unique to community) */}
        <pattern id="cmTriMesh" width="48" height="42" patternUnits="userSpaceOnUse" patternTransform="rotate(5)">
          <polygon points="24,0 48,42 0,42" fill="none" stroke={p.glow} strokeOpacity="0.06" strokeWidth="0.5" />
          <polygon points="24,42 48,0 0,0" fill="none" stroke={p.surge} strokeOpacity="0.04" strokeWidth="0.4" />
        </pattern>
        {/* Fine dot grid */}
        <pattern id="cmDots" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill={p.glow} opacity="0.10" />
        </pattern>
        {/* Concentric circle pattern (unique) */}
        <pattern id="cmRings" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="20" fill="none" stroke={p.surge} strokeOpacity="0.035" strokeWidth="0.4" />
          <circle cx="30" cy="30" r="10" fill="none" stroke={p.glow} strokeOpacity="0.03" strokeWidth="0.3" />
        </pattern>
      </defs>

      {/* Base background */}
      <rect width="1400" height="560" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* Pattern layers */}
      <rect width="1400" height="560" fill="url(#cmDots)" />
      <rect width="1400" height="560" fill="url(#cmTriMesh)" />
      <rect width="1400" height="560" fill="url(#cmRings)" />

      {/* Radial glows */}
      <rect width="1400" height="560" fill="url(#cmGlow1)" />
      <rect width="1400" height="560" fill="url(#cmGlow2)" />
      <rect width="1400" height="560" fill="url(#cmGlow3)" />
      <rect width="1400" height="560" fill="url(#cmGlow4)" />
      <rect width="1400" height="560" fill="url(#cmGlow5)" />
      <rect width="1400" height="560" fill="url(#cmGlow6)" />
      <rect width="1400" height="560" fill="url(#cmGlow7)" />
      <rect width="1400" height="560" fill="url(#cmGlow8)" />
      <rect width="1400" height="560" fill="url(#cmShimmer)" />

      {/* === DIAGONAL STREAK HIGHLIGHTS (different angles from agents) === */}
      <line x1="200" y1="0" x2="700" y2="560" stroke={p.glow} strokeOpacity="0.10" strokeWidth="44" />
      <line x1="700" y1="0" x2="1200" y2="560" stroke={p.surge} strokeOpacity="0.08" strokeWidth="36" />
      <line x1="0" y1="200" x2="400" y2="560" stroke={p.surge} strokeOpacity="0.07" strokeWidth="28" />
      <line x1="1000" y1="0" x2="1400" y2="360" stroke={p.glow} strokeOpacity="0.08" strokeWidth="30" />
      <line x1="450" y1="0" x2="950" y2="560" stroke={p.glow} strokeOpacity="0.05" strokeWidth="22" />

      {/* === CLUSTER ENCLOSING CIRCLES — faint boundary halos === */}
      {CLUSTERS.map((cl, ci) => {
        const clr = ci % 2 === 0 ? p.glow : p.surge;
        const r = ci === 2 ? 110 : 85;         // centre cluster is larger
        return (
          <g key={`cl-${ci}`}>
            <circle cx={cl.cx} cy={cl.cy} r={r} fill={clr} opacity="0.04" />
            <circle cx={cl.cx} cy={cl.cy} r={r} fill="none" stroke={clr}
              strokeOpacity="0.14" strokeWidth="0.8"
              strokeDasharray={ci % 2 === 0 ? '8 6' : '4 8'} />
            <circle cx={cl.cx} cy={cl.cy} r={r + 20} fill="none" stroke={clr}
              strokeOpacity="0.07" strokeWidth="0.5"
              strokeDasharray="3 7" />
          </g>
        );
      })}

      {/* === NETWORK EDGES — straight lines with animated pulse === */}
      {EDGES.map(([ai, bi], i) => {
        const a = MEMBERS[ai];
        const b = MEMBERS[bi];
        const ep = anims.edgePulses[i];
        const isBridge = a.cluster !== b.cluster;
        const color = p[a.colorKey];
        return (
          <g key={`edge-${i}`}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={color}
              strokeOpacity={isBridge ? 0.15 : 0.25}
              strokeWidth={isBridge ? 0.6 : 0.9}
              strokeDasharray={isBridge ? '5 7' : undefined}
            />
            {/* Breathing opacity pulse on the edge */}
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={color} strokeWidth={isBridge ? 0.8 : 1.2} opacity="0"
            >
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

      {/* === MEMBER NODES — glowing circles, no labels === */}
      {MEMBERS.map((m, i) => {
        const c = p[m.colorKey];
        const nb = anims.nodeBreaths[i];
        const isCore = m.r >= 5.5;
        return (
          <g key={`node-${i}`}>
            {/* Breathing outer halo */}
            <circle cx={m.x} cy={m.y} r={m.r * 5} fill={c} opacity={nb.minOp.toFixed(2)}>
              <animate attributeName="opacity"
                values={`${nb.minOp.toFixed(2)};${nb.maxOp.toFixed(2)};${nb.minOp.toFixed(2)}`}
                dur={`${nb.dur.toFixed(1)}s`}
                begin={`${nb.delay.toFixed(1)}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Mid halo */}
            <circle cx={m.x} cy={m.y} r={m.r * 2.5} fill={c} opacity={isCore ? 0.22 : 0.16} />
            {/* Ring */}
            <circle cx={m.x} cy={m.y} r={m.r * 2.5 + 1.5} fill="none" stroke={c}
              strokeOpacity={isCore ? 0.38 : 0.28} strokeWidth={isCore ? 1.0 : 0.7} />
            {/* Core bright node */}
            <circle cx={m.x} cy={m.y} r={m.r} fill={c} opacity={isCore ? 0.95 : 0.88} />
          </g>
        );
      })}

      {/* === RIPPLE WAVES — expanding circles from random nodes === */}
      {anims.rippleNodes.map((rp, i) => {
        const m = MEMBERS[rp.idx];
        const clusterSequence = CLUSTER_MOVING_ACCENT_SEQUENCES[m.cluster];
        const c = p[clusterSequence[i % clusterSequence.length]];
        return (
          <circle
            key={`ripple-${i}`}
            cx={m.x}
            cy={m.y}
            r={m.r}
            fill="none"
            stroke={c}
            strokeWidth="1.6"
            opacity="0"
          >
            <animate attributeName="r"
              values={`${m.r};${rp.maxR.toFixed(0)}`}
              dur={`${rp.dur.toFixed(1)}s`}
              begin={`${rp.delay.toFixed(1)}s`}
              repeatCount="indefinite"
            />
            <animate attributeName="opacity"
              values="0.78;0"
              dur={`${rp.dur.toFixed(1)}s`}
              begin={`${rp.delay.toFixed(1)}s`}
              repeatCount="indefinite"
            />
            <animate attributeName="stroke-width"
              values="1.6;0.3"
              dur={`${rp.dur.toFixed(1)}s`}
              begin={`${rp.delay.toFixed(1)}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}

      {/* === ORBITING PARTICLES around cluster centres === */}
      {CLUSTERS.map((cl, ci) => {
        const orbs = anims.orbiters[ci];
        const clusterSequence = CLUSTER_MOVING_ACCENT_SEQUENCES[ci];
        return (
          <g key={`orbit-${ci}`}>
            {orbs.map((ob, oi) => {
              const dir = ob.clockwise ? 1 : -1;
              const clr = p[clusterSequence[oi % clusterSequence.length]];
              // Elliptical orbit path centred on cluster
              const rx = ob.orbitR;
              const ry = ob.orbitR * 0.6;
              return (
                <circle
                  key={oi}
                  r={ob.r.toFixed(1)}
                  fill={clr}
                  opacity="0.92"
                  stroke={p.bg}
                  strokeOpacity="0.36"
                  strokeWidth="0.5"
                >
                  <animateMotion
                    dur={`${ob.dur.toFixed(1)}s`}
                    begin={`${ob.delay.toFixed(1)}s`}
                    repeatCount="indefinite"
                    path={`M${cl.cx + rx * dir},${cl.cy} A${rx},${ry} 0 1,${ob.clockwise ? 1 : 0} ${cl.cx - rx * dir},${cl.cy} A${rx},${ry} 0 1,${ob.clockwise ? 1 : 0} ${cl.cx + rx * dir},${cl.cy}`}
                  />
                  <animate attributeName="opacity"
                    values="0.62;1;0.62"
                    dur={`${ob.dur.toFixed(1)}s`}
                    begin={`${ob.delay.toFixed(1)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}
          </g>
        );
      })}

      {/* === FLOWING DATA-STREAM CURVES (fewer, softer than agents) === */}
      <path d="M0 120 Q300 70 600 110 T1200 80 T1400 100" fill="none" stroke={p.glow} strokeOpacity="0.22" strokeWidth="1.3" />
      <path d="M0 440 Q350 390 700 430 T1400 410" fill="none" stroke={p.surge} strokeOpacity="0.18" strokeWidth="1.1" />
      <path d="M0 280 Q400 240 800 270 T1400 250" fill="none" stroke={p.glow} strokeOpacity="0.16" strokeWidth="1.0" />
      <path d="M0 500 Q250 460 500 490 T1000 470 T1400 480" fill="none" stroke={p.surge} strokeOpacity="0.14" strokeWidth="0.9" />
      <path d="M0 60 Q500 30 1000 55 T1400 45" fill="none" stroke={p.glow} strokeOpacity="0.14" strokeWidth="0.8" />

      {/* === SPARKLE NODES scattered across edges === */}
      <circle cx="50"  cy="80"  r="1.8" fill={p.glow}  opacity="0.82" />
      <circle cx="320" cy="60"  r="1.6" fill={p.surge} opacity="0.74" />
      <circle cx="560" cy="45"  r="2.0" fill={p.glow}  opacity="0.80" />
      <circle cx="830" cy="55"  r="1.7" fill={p.surge} opacity="0.72" />
      <circle cx="1050" cy="70" r="1.9" fill={p.glow}  opacity="0.78" />
      <circle cx="1350" cy="50" r="1.8" fill={p.surge} opacity="0.76" />
      <circle cx="90"  cy="490" r="1.9" fill={p.surge} opacity="0.74" />
      <circle cx="280" cy="510" r="1.7" fill={p.glow}  opacity="0.72" />
      <circle cx="520" cy="530" r="2.0" fill={p.glow}  opacity="0.76" />
      <circle cx="780" cy="520" r="1.6" fill={p.surge} opacity="0.70" />
      <circle cx="1020" cy="515" r="1.8" fill={p.glow} opacity="0.74" />
      <circle cx="1300" cy="500" r="1.7" fill={p.surge} opacity="0.72" />

      {/* === LARGE HALO GLOWS for depth === */}
      <circle cx="250" cy="250" r="100" fill={p.glow}  opacity="0.08" />
      <circle cx="700" cy="350" r="110" fill={p.glow}  opacity="0.07" />
      <circle cx="1100" cy="200" r="90"  fill={p.surge} opacity="0.08" />
      <circle cx="500" cy="450" r="75"  fill={p.surge} opacity="0.06" />
      <circle cx="900" cy="100" r="80"  fill={p.glow}  opacity="0.06" />
      <circle cx="150" cy="450" r="70"  fill={p.surge} opacity="0.055" />
      <circle cx="1250" cy="400" r="70" fill={p.glow}  opacity="0.055" />

      {/* === RING ARCS on sides (different curvature from agents) === */}
      <path d="M80 500 A200 200 0 0 1 80 100" fill="none" stroke={p.glow} strokeOpacity="0.16" strokeWidth="1.0" strokeDasharray="5 7" />
      <path d="M110 460 A160 160 0 0 1 110 140" fill="none" stroke={p.surge} strokeOpacity="0.12" strokeWidth="0.8" strokeDasharray="3 5" />
      <path d="M1320 100 A200 200 0 0 1 1320 500" fill="none" stroke={p.surge} strokeOpacity="0.16" strokeWidth="1.0" strokeDasharray="5 7" />
      <path d="M1290 140 A160 160 0 0 1 1290 460" fill="none" stroke={p.glow} strokeOpacity="0.12" strokeWidth="0.8" strokeDasharray="3 5" />
      </g>
    </svg>
  );
}

export default SvgCommunityHero;
