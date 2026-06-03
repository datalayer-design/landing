/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Blog Hero — shiny abstract background (wide, short banner).
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgBlogHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const warmA = p.isLight ? p.surge : p.flame;
  const warmB = p.isLight ? p.spark : p.gold;
  const warmC = p.isLight ? p.pop : p.blaze;
  return (
    <svg
      viewBox="0 0 1400 420"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />
        {/* Mesh gradient fills */}
        <radialGradient id="heroGlow1" cx="20%" cy="35%" r="55%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.50" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heroGlow2" cx="75%" cy="60%" r="50%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.45" />
          <stop offset="45%" stopColor={p.surge} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heroGlow3" cx="55%" cy="20%" r="40%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.40" />
          <stop offset="50%" stopColor={p.spark} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heroGlow4" cx="90%" cy="25%" r="35%">
          <stop offset="0%" stopColor={warmC} stopOpacity="0.35" />
          <stop offset="55%" stopColor={warmC} stopOpacity="0.08" />
          <stop offset="100%" stopColor={warmC} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heroGlow5" cx="10%" cy="75%" r="40%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.38" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heroGlow6" cx="40%" cy="80%" r="35%">
          <stop offset="0%" stopColor={warmA} stopOpacity="0.36" />
          <stop offset="50%" stopColor={warmA} stopOpacity="0.08" />
          <stop offset="100%" stopColor={warmA} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heroGlow7" cx="70%" cy="15%" r="32%">
          <stop offset="0%" stopColor={warmB} stopOpacity="0.34" />
          <stop offset="50%" stopColor={warmB} stopOpacity="0.07" />
          <stop offset="100%" stopColor={warmB} stopOpacity="0" />
        </radialGradient>
        {/* Shimmer sweep */}
        <linearGradient id="heroShimmer" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0" />
          <stop offset="35%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="65%" stopColor={p.surge} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </linearGradient>
        {/* Dot grid */}
        <pattern id="heroDots" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill={p.primary} opacity="0.08" />
        </pattern>
        {/* Fine line grid */}
        <pattern id="heroLines" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0L0 0 0 80" fill="none" stroke={p.primary} strokeOpacity="0.04" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Base fill */}
      <rect width="1400" height="420" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* Dot grid layer */}
      <rect width="1400" height="420" fill="url(#heroDots)" />
      <rect width="1400" height="420" fill="url(#heroLines)" />

      {/* Large soft glow blobs — create the "shiny" feel */}
      <rect width="1400" height="420" fill="url(#heroGlow1)" />
      <rect width="1400" height="420" fill="url(#heroGlow2)" />
      <rect width="1400" height="420" fill="url(#heroGlow3)" />
      <rect width="1400" height="420" fill="url(#heroGlow4)" />
      <rect width="1400" height="420" fill="url(#heroGlow5)" />
      <rect width="1400" height="420" fill="url(#heroGlow6)" />
      <rect width="1400" height="420" fill="url(#heroGlow7)" />

      {/* Horizontal shimmer band */}
      <rect width="1400" height="420" fill="url(#heroShimmer)" />

      {/* Flowing curved lines — abstract network connections */}
      <path d="M0 280 Q200 180, 400 240 T800 200 T1200 260 T1400 220" fill="none" stroke={p.glow} strokeOpacity="0.18" strokeWidth="1.5" />
      <path d="M0 320 Q250 240, 500 300 T1000 260 T1400 300" fill="none" stroke={p.surge} strokeOpacity="0.14" strokeWidth="1" />
      <path d="M0 200 Q300 140, 600 180 T1100 150 T1400 180" fill="none" stroke={p.spark} strokeOpacity="0.12" strokeWidth="1" />
      <path d="M0 360 Q350 300, 700 340 T1400 320" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.8" />
      <path d="M0 250 Q400 190, 800 230 T1400 210" fill="none" stroke={warmA} strokeOpacity="0.12" strokeWidth="0.9" />
      <path d="M0 170 Q350 120, 700 155 T1400 140" fill="none" stroke={warmB} strokeOpacity="0.10" strokeWidth="0.8" />

      {/* Bright node dots along the curves */}
      <circle cx="200" cy="216" r="3.5" fill={p.glow} opacity="0.85" />
      <circle cx="200" cy="216" r="14" fill={p.glow} opacity="0.12" />
      <circle cx="520" cy="236" r="2.5" fill={p.surge} opacity="0.80" />
      <circle cx="520" cy="236" r="10" fill={p.surge} opacity="0.10" />
      <circle cx="830" cy="198" r="3" fill={p.spark} opacity="0.80" />
      <circle cx="830" cy="198" r="12" fill={p.spark} opacity="0.10" />
      <circle cx="1100" cy="252" r="2.8" fill={warmC} opacity="0.75" />
      <circle cx="1100" cy="252" r="11" fill={warmC} opacity="0.10" />
      <circle cx="350" cy="175" r="3" fill={warmA} opacity="0.78" />
      <circle cx="350" cy="175" r="12" fill={warmA} opacity="0.10" />
      <circle cx="1250" cy="190" r="2.5" fill={warmB} opacity="0.75" />
      <circle cx="1250" cy="190" r="10" fill={warmB} opacity="0.09" />

      {/* Small sparkle accents scattered across */}
      <circle cx="100" cy="80" r="1.8" fill={p.glow} opacity="0.6" />
      <circle cx="340" cy="60" r="1.5" fill={p.surge} opacity="0.5" />
      <circle cx="580" cy="45" r="2" fill={p.spark} opacity="0.55" />
      <circle cx="870" cy="70" r="1.5" fill={p.blaze} opacity="0.45" />
      <circle cx="1150" cy="55" r="1.8" fill={p.surge} opacity="0.5" />
      <circle cx="1300" cy="90" r="1.3" fill={p.glow} opacity="0.4" />
      <circle cx="720" cy="58" r="1.6" fill={p.flame} opacity="0.52" />
      <circle cx="1000" cy="85" r="1.4" fill={p.gold} opacity="0.48" />
      <circle cx="60" cy="350" r="1.5" fill={p.surge} opacity="0.5" />
      <circle cx="450" cy="380" r="1.8" fill={p.glow} opacity="0.45" />
      <circle cx="750" cy="370" r="1.3" fill={p.surge} opacity="0.4" />
      <circle cx="1050" cy="360" r="1.6" fill={p.spark} opacity="0.5" />
      <circle cx="1350" cy="350" r="1.4" fill={p.blaze} opacity="0.4" />

      {/* Larger halo glows for depth */}
      <circle cx="350" cy="160" r="60" fill={p.glow} opacity="0.04" />
      <circle cx="700" cy="300" r="80" fill={p.surge} opacity="0.035" />
      <circle cx="1050" cy="120" r="55" fill={p.spark} opacity="0.04" />
      <circle cx="1250" cy="340" r="50" fill={p.surge} opacity="0.035" />

      {/* Diagonal streak highlights */}
      <line x1="0" y1="420" x2="500" y2="0" stroke={p.glow} strokeOpacity="0.06" strokeWidth="40" />
      <line x1="400" y1="420" x2="900" y2="0" stroke={p.surge} strokeOpacity="0.06" strokeWidth="35" />
      <line x1="900" y1="420" x2="1400" y2="0" stroke={p.spark} strokeOpacity="0.06" strokeWidth="30" />
      </g>
    </svg>
  );
}
