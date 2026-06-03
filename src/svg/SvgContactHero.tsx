/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, abstract SVG hero background for the Contact page.
 *
 * Visual motif: interconnected constellation network, speech-bubble-like
 * rounded shapes, and wave-like flowing curves — evokes communication,
 * connection, and openness.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgContactHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  return (
    <svg
      viewBox="0 0 1400 420"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />
        {/* Off-centre glows — asymmetric for dynamism */}
        <radialGradient id="ctGlow1" cx="30%" cy="40%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.46" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ctGlow2" cx="70%" cy="55%" r="48%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.42" />
          <stop offset="45%" stopColor={p.surge} stopOpacity="0.09" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ctGlow3" cx="50%" cy="15%" r="40%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.38" />
          <stop offset="50%" stopColor={p.spark} stopOpacity="0.07" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ctGlow4" cx="88%" cy="75%" r="36%">
          <stop offset="0%" stopColor={p.blaze} stopOpacity="0.30" />
          <stop offset="50%" stopColor={p.blaze} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.blaze} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ctGlow5" cx="12%" cy="80%" r="38%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.35" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.07" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ctGlow6" cx="55%" cy="70%" r="36%">
          <stop offset="0%" stopColor={p.flame} stopOpacity="0.33" />
          <stop offset="50%" stopColor={p.flame} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.flame} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ctGlow7" cx="75%" cy="20%" r="34%">
          <stop offset="0%" stopColor={p.gold} stopOpacity="0.32" />
          <stop offset="50%" stopColor={p.gold} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.gold} stopOpacity="0" />
        </radialGradient>
        {/* Shimmer */}
        <linearGradient id="ctShimmer" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0" />
          <stop offset="40%" stopColor={p.spark} stopOpacity="0.09" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="60%" stopColor={p.glow} stopOpacity="0.09" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>
        {/* Dot grid */}
        <pattern id="ctDots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill={p.primary} opacity="0.07" />
        </pattern>
        {/* Fine crosshatch */}
        <pattern id="ctCross" width="48" height="48" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="48" y2="48" stroke={p.primary} strokeOpacity="0.03" strokeWidth="0.4" />
          <line x1="48" y1="0" x2="0" y2="48" stroke={p.primary} strokeOpacity="0.03" strokeWidth="0.4" />
        </pattern>
        <clipPath id="ctInnerClip">
          <rect x="2" y="0" width="1396" height="420" />
        </clipPath>
      </defs>

      {/* Base */}
      <rect width="1400" height="420" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined} clipPath="url(#ctInnerClip)">

      {/* Grid layers */}
      <rect width="1400" height="420" fill="url(#ctDots)" />
      <rect width="1400" height="420" fill="url(#ctCross)" />

      {/* Glow blobs */}
      <rect width="1400" height="420" fill="url(#ctGlow1)" />
      <rect width="1400" height="420" fill="url(#ctGlow2)" />
      <rect width="1400" height="420" fill="url(#ctGlow3)" />
      <rect width="1400" height="420" fill="url(#ctGlow4)" />
      <rect width="1400" height="420" fill="url(#ctGlow5)" />
      <rect width="1400" height="420" fill="url(#ctGlow6)" />
      <rect width="1400" height="420" fill="url(#ctGlow7)" />
      <rect width="1400" height="420" fill="url(#ctShimmer)" />

      {/* Constellation network — nodes and thin connecting lines */}
      {/* Node positions */}
      <circle cx="180" cy="150" r="3" fill={p.glow} opacity="0.80" />
      <circle cx="180" cy="150" r="13" fill={p.glow} opacity="0.10" />
      <circle cx="400" cy="100" r="2.5" fill={p.surge} opacity="0.75" />
      <circle cx="400" cy="100" r="10" fill={p.surge} opacity="0.08" />
      <circle cx="600" cy="200" r="3.5" fill={p.spark} opacity="0.82" />
      <circle cx="600" cy="200" r="14" fill={p.spark} opacity="0.10" />
      <circle cx="850" cy="130" r="2.8" fill={p.blaze} opacity="0.78" />
      <circle cx="850" cy="130" r="11" fill={p.blaze} opacity="0.09" />
      <circle cx="1050" cy="220" r="3" fill={p.surge} opacity="0.80" />
      <circle cx="1050" cy="220" r="13" fill={p.surge} opacity="0.10" />
      <circle cx="1250" cy="160" r="2.5" fill={p.glow} opacity="0.72" />
      <circle cx="1250" cy="160" r="10" fill={p.glow} opacity="0.08" />
      <circle cx="500" cy="170" r="3" fill={p.flame} opacity="0.80" />
      <circle cx="500" cy="170" r="12" fill={p.flame} opacity="0.09" />
      <circle cx="1100" cy="280" r="2.8" fill={p.gold} opacity="0.76" />
      <circle cx="1100" cy="280" r="11" fill={p.gold} opacity="0.08" />

      {/* Connecting lines between constellation nodes */}
      <line x1="180" y1="150" x2="400" y2="100" stroke={p.glow} strokeOpacity="0.12" strokeWidth="0.7" />
      <line x1="400" y1="100" x2="600" y2="200" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.6" />
      <line x1="600" y1="200" x2="850" y2="130" stroke={p.spark} strokeOpacity="0.10" strokeWidth="0.6" />
      <line x1="850" y1="130" x2="1050" y2="220" stroke={p.blaze} strokeOpacity="0.09" strokeWidth="0.6" />
      <line x1="1050" y1="220" x2="1250" y2="160" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.6" />
      {/* Cross connections */}
      <line x1="180" y1="150" x2="600" y2="200" stroke={p.glow} strokeOpacity="0.06" strokeWidth="0.4" />
      <line x1="400" y1="100" x2="850" y2="130" stroke={p.surge} strokeOpacity="0.05" strokeWidth="0.4" />
      <line x1="600" y1="200" x2="1050" y2="220" stroke={p.spark} strokeOpacity="0.06" strokeWidth="0.4" />
      <line x1="850" y1="130" x2="1250" y2="160" stroke={p.blaze} strokeOpacity="0.05" strokeWidth="0.4" />
      <line x1="500" y1="170" x2="850" y2="130" stroke={p.flame} strokeOpacity="0.06" strokeWidth="0.4" />
      <line x1="1050" y1="220" x2="1100" y2="280" stroke={p.gold} strokeOpacity="0.05" strokeWidth="0.35" />

      {/* Rounded "speech-bubble" shapes — communication motif */}
      <rect x="280" y="250" width="120" height="70" rx="20" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.8" />
      <rect x="720" y="270" width="140" height="75" rx="22" fill="none" stroke={p.glow} strokeOpacity="0.12" strokeWidth="0.9" />
      <rect x="1080" y="245" width="110" height="65" rx="18" fill="none" stroke={p.spark} strokeOpacity="0.10" strokeWidth="0.8" />

      {/* Flowing wave curves — openness & warmth */}
      <path d="M0 310 Q180 260, 360 300 T720 280 T1080 310 T1400 290" fill="none" stroke={p.glow} strokeOpacity="0.15" strokeWidth="1.2" />
      <path d="M0 350 Q220 300, 440 340 T880 320 T1400 345" fill="none" stroke={p.surge} strokeOpacity="0.12" strokeWidth="1" />
      <path d="M0 380 Q300 350, 600 370 T1200 360 T1400 375" fill="none" stroke={p.surge} strokeOpacity="0.08" strokeWidth="0.8" />
      <path d="M0 200 Q350 160, 700 190 T1400 175" fill="none" stroke={p.flame} strokeOpacity="0.10" strokeWidth="0.9" />
      <path d="M0 150 Q400 110, 800 140 T1400 125" fill="none" stroke={p.gold} strokeOpacity="0.08" strokeWidth="0.7" />

      {/* Scattered sparkles */}
      <circle cx="90" cy="60" r="1.5" fill={p.glow} opacity="0.50" />
      <circle cx="300" cy="45" r="1.3" fill={p.surge} opacity="0.45" />
      <circle cx="520" cy="55" r="1.7" fill={p.spark} opacity="0.50" />
      <circle cx="760" cy="40" r="1.4" fill={p.blaze} opacity="0.40" />
      <circle cx="1000" cy="55" r="1.6" fill={p.surge} opacity="0.48" />
      <circle cx="1200" cy="70" r="1.3" fill={p.glow} opacity="0.42" />
      <circle cx="650" cy="48" r="1.5" fill={p.flame} opacity="0.50" />
      <circle cx="1100" cy="390" r="1.4" fill={p.gold} opacity="0.45" />
      <circle cx="1380" cy="50" r="1.5" fill={p.surge} opacity="0.38" />
      <circle cx="50" cy="390" r="1.3" fill={p.surge} opacity="0.40" />
      <circle cx="500" cy="400" r="1.5" fill={p.glow} opacity="0.38" />
      <circle cx="900" cy="395" r="1.2" fill={p.spark} opacity="0.35" />
      <circle cx="1300" cy="400" r="1.4" fill={p.blaze} opacity="0.38" />

      {/* Larger halo glows */}
      <circle cx="300" cy="180" r="60" fill={p.surge} opacity="0.035" />
      <circle cx="750" cy="110" r="70" fill={p.glow} opacity="0.04" />
      <circle cx="1100" cy="300" r="55" fill={p.spark} opacity="0.035" />
      <circle cx="150" cy="340" r="45" fill={p.surge} opacity="0.03" />

      {/* Diagonal streaks */}
      <line x1="50" y1="420" x2="550" y2="0" stroke={p.glow} strokeOpacity="0.06" strokeWidth="35" />
      <line x1="500" y1="420" x2="1000" y2="0" stroke={p.spark} strokeOpacity="0.06" strokeWidth="30" />
      <line x1="950" y1="420" x2="1400" y2="50" stroke={p.surge} strokeOpacity="0.06" strokeWidth="28" />
      </g>
    </svg>
  );
}
