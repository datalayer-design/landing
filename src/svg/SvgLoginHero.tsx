/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG hero background for the Agents login page.
 *
 * Visual motif: a secure keyhole / shield silhouette implied through
 * concentric rounded shapes, lock-bolt geometric accents, and a gentle
 * upward-converging perspective grid — trust, security, gateway.
 * Compact 1400×340 viewBox to match the login hero's lighter padding.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgLoginHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const warmA = p.isLight ? p.surge : p.flame;
  const warmB = p.isLight ? p.spark : p.gold;
  const warmC = p.isLight ? p.pop : p.blaze;
  return (
    <svg
      viewBox="0 0 1400 340"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />
        {/* Central focus glow */}
        <radialGradient id="lgGlow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.50" />
          <stop offset="40%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lgGlow2" cx="22%" cy="35%" r="42%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.38" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.07" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lgGlow3" cx="80%" cy="60%" r="44%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.36" />
          <stop offset="50%" stopColor={p.spark} stopOpacity="0.07" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lgGlow4" cx="12%" cy="78%" r="36%">
          <stop offset="0%" stopColor={warmC} stopOpacity="0.30" />
          <stop offset="50%" stopColor={warmC} stopOpacity="0.05" />
          <stop offset="100%" stopColor={warmC} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lgGlow5" cx="90%" cy="20%" r="34%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.32" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lgGlow6" cx="40%" cy="75%" r="34%">
          <stop offset="0%" stopColor={warmA} stopOpacity="0.30" />
          <stop offset="50%" stopColor={warmA} stopOpacity="0.05" />
          <stop offset="100%" stopColor={warmA} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lgGlow7" cx="65%" cy="25%" r="32%">
          <stop offset="0%" stopColor={warmB} stopOpacity="0.28" />
          <stop offset="50%" stopColor={warmB} stopOpacity="0.05" />
          <stop offset="100%" stopColor={warmB} stopOpacity="0" />
        </radialGradient>
        {/* Shimmer */}
        <linearGradient id="lgShimmer" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0" />
          <stop offset="35%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="65%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>
        {/* Dot grid */}
        <pattern id="lgDots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill={p.primary} opacity="0.06" />
        </pattern>
        {/* Perspective grid — converging upward */}
        <pattern id="lgPersp" width="70" height="70" patternUnits="userSpaceOnUse">
          <line x1="35" y1="0" x2="35" y2="70" stroke={p.primary} strokeOpacity="0.025" strokeWidth="0.4" />
          <line x1="0" y1="35" x2="70" y2="35" stroke={p.primary} strokeOpacity="0.025" strokeWidth="0.4" />
        </pattern>
      </defs>

      {/* Base */}
      <rect width="1400" height="340" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* Grid layers */}
      <rect width="1400" height="340" fill="url(#lgDots)" />
      <rect width="1400" height="340" fill="url(#lgPersp)" />

      {/* Glow blobs */}
      <rect width="1400" height="340" fill="url(#lgGlow1)" />
      <rect width="1400" height="340" fill="url(#lgGlow2)" />
      <rect width="1400" height="340" fill="url(#lgGlow3)" />
      <rect width="1400" height="340" fill="url(#lgGlow4)" />
      <rect width="1400" height="340" fill="url(#lgGlow5)" />
      <rect width="1400" height="340" fill="url(#lgGlow6)" />
      <rect width="1400" height="340" fill="url(#lgGlow7)" />
      <rect width="1400" height="340" fill="url(#lgShimmer)" />

      {/* Concentric rounded-rect "shield" shapes centred at (700, 170) */}
      <rect x="600" y="80" width="200" height="180" rx="40" fill="none" stroke={p.glow} strokeOpacity="0.14" strokeWidth="1.2" />
      <rect x="560" y="55" width="280" height="230" rx="55" fill="none" stroke={p.glow} strokeOpacity="0.09" strokeWidth="0.9" />
      <rect x="510" y="25" width="380" height="290" rx="70" fill="none" stroke={p.glow} strokeOpacity="0.05" strokeWidth="0.6" />

      {/* Central bright node — keyhole / gateway */}
      <circle cx="700" cy="170" r="5" fill={p.glow} opacity="0.85" />
      <circle cx="700" cy="170" r="18" fill={p.glow} opacity="0.14" />
      <circle cx="700" cy="170" r="40" fill={p.glow} opacity="0.05" />

      {/* Lock-bolt geometric accents */}
      <line x1="700" y1="185" x2="700" y2="230" stroke={p.glow} strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" />
      <circle cx="700" cy="232" r="4" fill={p.glow} opacity="0.20" />

      {/* Flanking nodes — identity / access points */}
      <circle cx="350" cy="140" r="2.8" fill={p.surge} opacity="0.75" />
      <circle cx="350" cy="140" r="11" fill={p.surge} opacity="0.09" />
      <circle cx="1050" cy="140" r="2.8" fill={p.spark} opacity="0.75" />
      <circle cx="1050" cy="140" r="11" fill={p.spark} opacity="0.09" />
      <circle cx="480" cy="260" r="2.5" fill={warmC} opacity="0.70" />
      <circle cx="480" cy="260" r="10" fill={warmC} opacity="0.08" />
      <circle cx="920" cy="260" r="2.5" fill={p.surge} opacity="0.70" />
      <circle cx="920" cy="260" r="10" fill={p.surge} opacity="0.08" />
      <circle cx="250" cy="220" r="2.5" fill={warmA} opacity="0.72" />
      <circle cx="250" cy="220" r="10" fill={warmA} opacity="0.08" />
      <circle cx="1150" cy="200" r="2.5" fill={warmB} opacity="0.72" />
      <circle cx="1150" cy="200" r="10" fill={warmB} opacity="0.08" />

      {/* Connection lines — identity network */}
      <line x1="350" y1="140" x2="700" y2="170" stroke={p.surge} strokeOpacity="0.09" strokeWidth="0.5" />
      <line x1="1050" y1="140" x2="700" y2="170" stroke={p.spark} strokeOpacity="0.09" strokeWidth="0.5" />
      <line x1="480" y1="260" x2="700" y2="170" stroke={p.blaze} strokeOpacity="0.07" strokeWidth="0.4" />
      <line x1="920" y1="260" x2="700" y2="170" stroke={p.surge} strokeOpacity="0.07" strokeWidth="0.4" />
      <line x1="350" y1="140" x2="480" y2="260" stroke={p.surge} strokeOpacity="0.04" strokeWidth="0.3" />
      <line x1="1050" y1="140" x2="920" y2="260" stroke={p.spark} strokeOpacity="0.04" strokeWidth="0.3" />
      <line x1="250" y1="220" x2="700" y2="170" stroke={warmA} strokeOpacity="0.07" strokeWidth="0.4" />
      <line x1="1150" y1="200" x2="700" y2="170" stroke={warmB} strokeOpacity="0.07" strokeWidth="0.4" />
      <line x1="250" y1="220" x2="480" y2="260" stroke={warmA} strokeOpacity="0.04" strokeWidth="0.3" />
      <line x1="1150" y1="200" x2="1050" y2="140" stroke={warmB} strokeOpacity="0.04" strokeWidth="0.3" />

      {/* Flowing wave curves — gentle, horizontal */}
      <path d="M0 240 Q200 200, 400 225 T800 210 T1200 230 T1400 215" fill="none" stroke={p.glow} strokeOpacity="0.12" strokeWidth="1" />
      <path d="M0 280 Q250 250, 500 270 T1000 255 T1400 270" fill="none" stroke={p.surge} strokeOpacity="0.09" strokeWidth="0.8" />
      <path d="M0 310 Q300 290, 600 305 T1200 295 T1400 305" fill="none" stroke={p.surge} strokeOpacity="0.06" strokeWidth="0.6" />
      <path d="M0 190 Q350 160, 700 180 T1400 170" fill="none" stroke={p.flame} strokeOpacity="0.08" strokeWidth="0.7" />
      <path d="M0 160 Q400 130, 800 150 T1400 140" fill="none" stroke={p.gold} strokeOpacity="0.07" strokeWidth="0.6" />

      {/* Sparkle accents */}
      <circle cx="90" cy="50" r="1.5" fill={p.glow} opacity="0.50" />
      <circle cx="250" cy="35" r="1.2" fill={p.surge} opacity="0.42" />
      <circle cx="500" cy="30" r="1.6" fill={p.spark} opacity="0.48" />
      <circle cx="900" cy="40" r="1.3" fill={p.blaze} opacity="0.40" />
      <circle cx="1150" cy="35" r="1.5" fill={p.surge} opacity="0.45" />
      <circle cx="1320" cy="55" r="1.2" fill={p.glow} opacity="0.38" />
      <circle cx="700" cy="40" r="1.5" fill={p.flame} opacity="0.48" />
      <circle cx="400" cy="305" r="1.3" fill={p.gold} opacity="0.42" />
      <circle cx="60" cy="300" r="1.3" fill={p.surge} opacity="0.40" />
      <circle cx="300" cy="310" r="1.5" fill={p.glow} opacity="0.38" />
      <circle cx="600" cy="320" r="1.2" fill={p.surge} opacity="0.35" />
      <circle cx="1100" cy="310" r="1.4" fill={p.spark} opacity="0.38" />
      <circle cx="1350" cy="300" r="1.3" fill={p.blaze} opacity="0.35" />

      {/* Larger halo glows */}
      <circle cx="280" cy="120" r="50" fill={p.surge} opacity="0.03" />
      <circle cx="700" cy="280" r="65" fill={p.glow} opacity="0.035" />
      <circle cx="1120" cy="100" r="45" fill={p.spark} opacity="0.03" />

      {/* Diagonal streaks */}
      <line x1="50" y1="340" x2="450" y2="0" stroke={p.glow} strokeOpacity="0.06" strokeWidth="30" />
      <line x1="500" y1="340" x2="900" y2="0" stroke={p.surge} strokeOpacity="0.06" strokeWidth="25" />
      <line x1="950" y1="340" x2="1350" y2="0" stroke={p.spark} strokeOpacity="0.06" strokeWidth="25" />
      </g>
    </svg>
  );
}
