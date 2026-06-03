/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG hero background for the Tutorials page.
 *
 * Visual motif: an abstract learning pathway — stepping-stone nodes
 * connected by curved paths, with floating code snippets, notebook
 * cells, and small chart/graph elements.  Animated glow pulses travel
 * along the paths while tiny particles orbit key nodes, evoking guided
 * discovery and progressive learning.
 *
 * Uses a 1400×380 viewBox to match the hero's minHeight.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgTutorialsHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const warmA = p.isLight ? p.surge : p.flame;
  const warmB = p.isLight ? p.spark : p.gold;
  const warmC = p.isLight ? p.pop : p.blaze;

  return (
    <svg
      viewBox="0 0 1400 380"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* Background glow gradients */}
        <radialGradient id="tutGlow1" cx="20%" cy="40%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.40" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tutGlow2" cx="70%" cy="55%" r="45%">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.35" />
          <stop offset="50%" stopColor={p.pop} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tutGlow3" cx="50%" cy="25%" r="40%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.30" />
          <stop offset="50%" stopColor={p.spark} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tutGlow4" cx="90%" cy="30%" r="35%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.28" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tutGlow5" cx="10%" cy="70%" r="38%">
          <stop offset="0%" stopColor={warmA} stopOpacity="0.25" />
          <stop offset="50%" stopColor={warmA} stopOpacity="0.06" />
          <stop offset="100%" stopColor={warmA} stopOpacity="0" />
        </radialGradient>

        {/* Dot grid pattern */}
        <pattern id="tutDots" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill={p.primary} opacity="0.06" />
        </pattern>

        {/* Animated travelling dot */}
        <circle id="tutTravelDot" r="2.5" fill={p.glow} opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
      </defs>

      {/* Base fill */}
      <rect width="1400" height="560" fill={p.bg} />

      {/* Light-boost group */}
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

        {/* Dot grid underlay */}
        <rect width="1400" height="560" fill="url(#tutDots)" />

        {/* Ambient glow blobs */}
        <rect width="1400" height="560" fill="url(#tutGlow1)" />
        <rect width="1400" height="560" fill="url(#tutGlow2)" />
        <rect width="1400" height="560" fill="url(#tutGlow3)" />
        <rect width="1400" height="560" fill="url(#tutGlow4)" />
        <rect width="1400" height="560" fill="url(#tutGlow5)" />

        {/* ── Learning pathway (curved path connecting stepping stones) ── */}
        <path
          d="M120 420 C 250 350, 350 180, 500 220 S 700 380, 850 280 S 1050 160, 1200 200 L 1320 180"
          fill="none"
          stroke={p.glow}
          strokeWidth="1.5"
          strokeOpacity="0.2"
          strokeDasharray="8 6"
        />
        <path
          d="M120 420 C 250 350, 350 180, 500 220 S 700 380, 850 280 S 1050 160, 1200 200 L 1320 180"
          fill="none"
          stroke={p.glow}
          strokeWidth="0.8"
          strokeOpacity="0.15"
        />

        {/* Travelling dot along the path */}
        <circle r="3" fill={p.glow} opacity="0.6">
          <animateMotion
            path="M120 420 C 250 350, 350 180, 500 220 S 700 380, 850 280 S 1050 160, 1200 200 L 1320 180"
            dur="12s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* ── Stepping-stone nodes ── */}
        {/* Node 1 — Getting Started */}
        <circle cx="120" cy="420" r="20" fill={p.glow} opacity="0.08" />
        <circle cx="120" cy="420" r="10" fill={p.glow} opacity="0.2" stroke={p.glow} strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="120" cy="420" r="3" fill={p.glow} opacity="0.6" />
        <text x="120" y="453" textAnchor="middle" fontSize="9" fill={p.textMuted} opacity="0.6" fontFamily="system-ui">Start</text>

        {/* Node 2 — Setup */}
        <circle cx="500" cy="220" r="22" fill={p.pop} opacity="0.08" />
        <circle cx="500" cy="220" r="11" fill={p.pop} opacity="0.2" stroke={p.pop} strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="500" cy="220" r="3.5" fill={p.pop} opacity="0.6" />

        {/* Node 3 — Build */}
        <circle cx="850" cy="280" r="24" fill={p.spark} opacity="0.08" />
        <circle cx="850" cy="280" r="12" fill={p.spark} opacity="0.2" stroke={p.spark} strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="850" cy="280" r="4" fill={p.spark} opacity="0.6" />

        {/* Node 4 — Deploy */}
        <circle cx="1200" cy="200" r="22" fill={p.surge} opacity="0.08" />
        <circle cx="1200" cy="200" r="11" fill={p.surge} opacity="0.2" stroke={p.surge} strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="1200" cy="200" r="3.5" fill={p.surge} opacity="0.6" />

        {/* ── Floating notebook-cell cards ── */}
        {/* Card 1 — code cell (near node 1) */}
        <g opacity="0.5">
          <rect x="170" y="340" width="120" height="60" rx="6" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.5" strokeOpacity="0.2" />
          <rect x="170" y="340" width="120" height="12" rx="6" fill={p.primary} opacity="0.08" />
          <text x="178" y="349" fontSize="6" fontFamily="monospace" fill={p.primary} opacity="0.5">In [1]:</text>
          <rect x="178" y="358" width="60" height="4" rx="2" fill={p.glow} opacity="0.3" />
          <rect x="178" y="366" width="85" height="4" rx="2" fill={p.pop} opacity="0.25" />
          <rect x="178" y="374" width="45" height="4" rx="2" fill={p.glow} opacity="0.2" />
          <rect x="178" y="386" width="70" height="4" rx="2" fill={p.spark} opacity="0.2" />
        </g>

        {/* Card 2 — chart output (near node 2) */}
        <g opacity="0.5">
          <rect x="540" y="150" width="110" height="55" rx="6" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.5" strokeOpacity="0.2" />
          {/* Mini bar chart */}
          <rect x="555" y="176" width="10" height="20" rx="2" fill={p.glow} opacity="0.4" />
          <rect x="570" y="168" width="10" height="28" rx="2" fill={p.pop} opacity="0.4" />
          <rect x="585" y="178" width="10" height="18" rx="2" fill={p.spark} opacity="0.4" />
          <rect x="600" y="162" width="10" height="34" rx="2" fill={warmA} opacity="0.4" />
          <rect x="615" y="172" width="10" height="24" rx="2" fill={warmB} opacity="0.4" />
        </g>

        {/* Card 3 — markdown cell (near node 3) */}
        <g opacity="0.45">
          <rect x="900" y="210" width="120" height="48" rx="6" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.5" strokeOpacity="0.2" />
          <rect x="910" y="222" width="75" height="5" rx="2.5" fill={p.pop} opacity="0.3" />
          <rect x="910" y="232" width="100" height="4" rx="2" fill={p.textMuted} opacity="0.15" />
          <rect x="910" y="240" width="88" height="4" rx="2" fill={p.textMuted} opacity="0.12" />
        </g>

        {/* Card 4 — terminal/deploy card (near node 4) */}
        <g opacity="0.45">
          <rect x="1230" y="130" width="115" height="50" rx="6" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.5" strokeOpacity="0.2" />
          <rect x="1230" y="130" width="115" height="11" rx="6" fill={p.surge} opacity="0.08" />
          <circle cx="1238" cy="136" r="2" fill={p.blaze} opacity="0.4" />
          <circle cx="1245" cy="136" r="2" fill={p.gold} opacity="0.4" />
          <circle cx="1252" cy="136" r="2" fill={p.glow} opacity="0.4" />
          <rect x="1240" y="147" width="55" height="4" rx="2" fill={p.surge} opacity="0.3" />
          <rect x="1240" y="155" width="80" height="4" rx="2" fill={p.glow} opacity="0.2" />
          <rect x="1240" y="163" width="40" height="4" rx="2" fill={p.spark} opacity="0.2" />
        </g>

        {/* ── Orbiting particles around pathway nodes ── */}
        <circle r="2" fill={p.glow} opacity="0.5">
          <animateMotion path="M120 420 m-18,0 a18,18 0 1,0 36,0 a18,18 0 1,0 -36,0" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle r="1.8" fill={p.pop} opacity="0.4">
          <animateMotion path="M500 220 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill={p.spark} opacity="0.4">
          <animateMotion path="M850 280 m-22,0 a22,22 0 1,0 44,0 a22,22 0 1,0 -44,0" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle r="1.8" fill={p.surge} opacity="0.4">
          <animateMotion path="M1200 200 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0" dur="7.5s" repeatCount="indefinite" />
        </circle>

        {/* ── Decorative scattered elements ── */}
        {/* Step-number badges along pathway */}
        <circle cx="310" cy="295" r="10" fill={p.glow} opacity="0.12" stroke={p.glow} strokeWidth="0.5" strokeOpacity="0.2" />
        <text x="310" y="298" textAnchor="middle" fontSize="8" fill={p.glow} opacity="0.5" fontWeight="bold">1</text>

        <circle cx="670" cy="300" r="10" fill={p.pop} opacity="0.12" stroke={p.pop} strokeWidth="0.5" strokeOpacity="0.2" />
        <text x="670" y="303" textAnchor="middle" fontSize="8" fill={p.pop} opacity="0.5" fontWeight="bold">2</text>

        <circle cx="1040" cy="230" r="10" fill={p.spark} opacity="0.12" stroke={p.spark} strokeWidth="0.5" strokeOpacity="0.2" />
        <text x="1040" y="233" textAnchor="middle" fontSize="8" fill={p.spark} opacity="0.5" fontWeight="bold">3</text>

        {/* Floating sparkle dots */}
        <circle cx="80" cy="180" r="2" fill={warmA} opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="460" r="2.5" fill={warmB} opacity="0.25">
          <animate attributeName="opacity" values="0.25;0.08;0.25" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="750" cy="130" r="2" fill={warmC} opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1100" cy="380" r="2.5" fill={p.glow} opacity="0.25">
          <animate attributeName="opacity" values="0.25;0.08;0.25" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1350" cy="320" r="2" fill={p.pop} opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.06;0.2" dur="5.5s" repeatCount="indefinite" />
        </circle>

        {/* Faint connecting arcs between cards and nodes */}
        <path d="M290 370 Q 380 280 500 220" fill="none" stroke={p.glow} strokeWidth="0.5" strokeOpacity="0.1" />
        <path d="M650 178 Q 750 230 850 280" fill="none" stroke={p.pop} strokeWidth="0.5" strokeOpacity="0.1" />
        <path d="M1020 234 Q 1100 210 1200 200" fill="none" stroke={p.spark} strokeWidth="0.5" strokeOpacity="0.1" />

      </g>
    </svg>
  );
}

export default SvgTutorialsHero;
