/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, abstract SVG hero background for the Pricing page.
 *
 * Visual motif: concentric arcs radiating outward from a central point,
 * geometric diamond shapes (evoking "tiers"), and a honeycomb-like grid —
 * gives a structured, trustworthy feel appropriate for pricing.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgPricingHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
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
        {/* Radial spotlight from centre */}
        <radialGradient id="prGlow1" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.48" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="prGlow2" cx="20%" cy="30%" r="45%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.38" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="prGlow3" cx="82%" cy="65%" r="42%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.36" />
          <stop offset="55%" stopColor={p.spark} stopOpacity="0.07" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="prGlow4" cx="15%" cy="80%" r="38%">
          <stop offset="0%" stopColor={p.blaze} stopOpacity="0.32" />
          <stop offset="50%" stopColor={p.blaze} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.blaze} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="prGlow5" cx="88%" cy="20%" r="36%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.34" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="prGlow6" cx="60%" cy="80%" r="38%">
          <stop offset="0%" stopColor={p.flame} stopOpacity="0.34" />
          <stop offset="50%" stopColor={p.flame} stopOpacity="0.07" />
          <stop offset="100%" stopColor={p.flame} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="prGlow7" cx="35%" cy="15%" r="34%">
          <stop offset="0%" stopColor={p.gold} stopOpacity="0.32" />
          <stop offset="50%" stopColor={p.gold} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.gold} stopOpacity="0" />
        </radialGradient>
        {/* Shimmer band */}
        <linearGradient id="prShimmer" x1="0" y1="0.5" x2="1" y2="0.3">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0" />
          <stop offset="30%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="70%" stopColor={p.spark} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </linearGradient>
        {/* Dot grid */}
        <pattern id="prDots" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.55" fill={p.primary} opacity="0.07" />
        </pattern>
        {/* Hexagonal grid */}
        <pattern id="prHex" width="60" height="52" patternUnits="userSpaceOnUse">
          <path d="M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z" fill="none" stroke={p.primary} strokeOpacity="0.04" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Base */}
      <rect width="1400" height="420" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* Grid layers */}
      <rect width="1400" height="420" fill="url(#prDots)" />
      <rect width="1400" height="420" fill="url(#prHex)" />

      {/* Glow blobs */}
      <rect width="1400" height="420" fill="url(#prGlow1)" />
      <rect width="1400" height="420" fill="url(#prGlow2)" />
      <rect width="1400" height="420" fill="url(#prGlow3)" />
      <rect width="1400" height="420" fill="url(#prGlow4)" />
      <rect width="1400" height="420" fill="url(#prGlow5)" />
      <rect width="1400" height="420" fill="url(#prGlow6)" />
      <rect width="1400" height="420" fill="url(#prGlow7)" />
      <rect width="1400" height="420" fill="url(#prShimmer)" />

      {/* Concentric arcs from centre — radiating tiers */}
      {[130, 200, 275, 355].map((r, i) => (
        <circle key={i} cx="700" cy="210" r={r} fill="none" stroke={p.glow} strokeOpacity={0.10 - i * 0.018} strokeWidth={1.2 - i * 0.15} />
      ))}

      {/* Diamond shapes evoking "plans / tiers" */}
      <path d="M350 210 L400 160 L450 210 L400 260 Z" fill="none" stroke={p.surge} strokeOpacity="0.14" strokeWidth="1" />
      <path d="M650 210 L700 150 L750 210 L700 270 Z" fill="none" stroke={p.glow} strokeOpacity="0.16" strokeWidth="1.2" />
      <path d="M950 210 L1000 160 L1050 210 L1000 260 Z" fill="none" stroke={p.spark} strokeOpacity="0.14" strokeWidth="1" />

      {/* Horizontal connecting lines through diamonds */}
      <line x1="0" y1="210" x2="1400" y2="210" stroke={p.primary} strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="0" y1="160" x2="1400" y2="160" stroke={p.primary} strokeOpacity="0.025" strokeWidth="0.4" />
      <line x1="0" y1="260" x2="1400" y2="260" stroke={p.primary} strokeOpacity="0.025" strokeWidth="0.4" />

      {/* Node dots at diamond vertices */}
      <circle cx="400" cy="160" r="3" fill={p.surge} opacity="0.80" />
      <circle cx="400" cy="160" r="12" fill={p.surge} opacity="0.10" />
      <circle cx="700" cy="150" r="4" fill={p.glow} opacity="0.85" />
      <circle cx="700" cy="150" r="16" fill={p.glow} opacity="0.12" />
      <circle cx="1000" cy="160" r="3" fill={p.spark} opacity="0.80" />
      <circle cx="1000" cy="160" r="12" fill={p.spark} opacity="0.10" />
      <circle cx="400" cy="260" r="2.5" fill={p.blaze} opacity="0.70" />
      <circle cx="400" cy="260" r="10" fill={p.blaze} opacity="0.08" />
      <circle cx="700" cy="270" r="3" fill={p.surge} opacity="0.75" />
      <circle cx="700" cy="270" r="12" fill={p.surge} opacity="0.10" />
      <circle cx="1000" cy="260" r="2.5" fill={p.blaze} opacity="0.70" />
      <circle cx="1000" cy="260" r="10" fill={p.blaze} opacity="0.08" />
      <circle cx="550" cy="280" r="3" fill={p.flame} opacity="0.78" />
      <circle cx="550" cy="280" r="12" fill={p.flame} opacity="0.09" />
      <circle cx="1200" cy="120" r="2.8" fill={p.gold} opacity="0.76" />
      <circle cx="1200" cy="120" r="11" fill={p.gold} opacity="0.08" />

      {/* Scattered sparkle accents */}
      <circle cx="120" cy="70" r="1.6" fill={p.glow} opacity="0.55" />
      <circle cx="280" cy="50" r="1.3" fill={p.surge} opacity="0.45" />
      <circle cx="540" cy="40" r="1.8" fill={p.spark} opacity="0.50" />
      <circle cx="860" cy="60" r="1.4" fill={p.blaze} opacity="0.40" />
      <circle cx="1120" cy="45" r="1.7" fill={p.surge} opacity="0.50" />
      <circle cx="1320" cy="75" r="1.2" fill={p.glow} opacity="0.40" />
      <circle cx="680" cy="50" r="1.5" fill={p.flame} opacity="0.48" />
      <circle cx="1000" cy="380" r="1.4" fill={p.gold} opacity="0.45" />
      <circle cx="80" cy="360" r="1.4" fill={p.surge} opacity="0.45" />
      <circle cx="380" cy="380" r="1.6" fill={p.glow} opacity="0.40" />
      <circle cx="620" cy="370" r="1.2" fill={p.surge} opacity="0.35" />
      <circle cx="980" cy="375" r="1.5" fill={p.spark} opacity="0.45" />
      <circle cx="1280" cy="365" r="1.3" fill={p.blaze} opacity="0.38" />

      {/* Larger halo glows */}
      <circle cx="250" cy="140" r="55" fill={p.surge} opacity="0.035" />
      <circle cx="700" cy="320" r="70" fill={p.glow} opacity="0.04" />
      <circle cx="1100" cy="100" r="50" fill={p.spark} opacity="0.035" />

      {/* Diagonal streaks */}
      <line x1="100" y1="420" x2="600" y2="0" stroke={p.surge} strokeOpacity="0.06" strokeWidth="35" />
      <line x1="600" y1="420" x2="1100" y2="0" stroke={p.glow} strokeOpacity="0.06" strokeWidth="30" />
      <line x1="1000" y1="420" x2="1400" y2="80" stroke={p.spark} strokeOpacity="0.06" strokeWidth="28" />
      </g>
    </svg>
  );
}
