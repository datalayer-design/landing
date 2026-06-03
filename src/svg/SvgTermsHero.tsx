/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, abstract SVG hero background for the Terms of Service page.
 *
 * Visual motif: balanced scales of justice, document/scroll silhouettes,
 * clause-marker dashes, handshake-agreement lines, and a gavel outline —
 * evokes legality, fairness, structure, and mutual agreement.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgTermsHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
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

        {/* Centre balance glow */}
        <radialGradient id="tmGlow1" cx="50%" cy="42%" r="46%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.48" />
          <stop offset="40%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        {/* Left document glow */}
        <radialGradient id="tmGlow2" cx="22%" cy="55%" r="40%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.40" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        {/* Right glow */}
        <radialGradient id="tmGlow3" cx="78%" cy="50%" r="42%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.38" />
          <stop offset="48%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        {/* Top accent */}
        <radialGradient id="tmGlow4" cx="60%" cy="10%" r="36%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.35" />
          <stop offset="50%" stopColor={p.spark} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>
        {/* Bottom-left warm */}
        <radialGradient id="tmGlow5" cx="15%" cy="82%" r="35%">
          <stop offset="0%" stopColor={warmC} stopOpacity="0.30" />
          <stop offset="50%" stopColor={warmC} stopOpacity="0.06" />
          <stop offset="100%" stopColor={warmC} stopOpacity="0" />
        </radialGradient>
        {/* Bottom-right flame */}
        <radialGradient id="tmGlow6" cx="85%" cy="80%" r="34%">
          <stop offset="0%" stopColor={warmA} stopOpacity="0.32" />
          <stop offset="50%" stopColor={warmA} stopOpacity="0.06" />
          <stop offset="100%" stopColor={warmA} stopOpacity="0" />
        </radialGradient>
        {/* Top-left gold */}
        <radialGradient id="tmGlow7" cx="10%" cy="18%" r="30%">
          <stop offset="0%" stopColor={warmB} stopOpacity="0.30" />
          <stop offset="50%" stopColor={warmB} stopOpacity="0.05" />
          <stop offset="100%" stopColor={warmB} stopOpacity="0" />
        </radialGradient>

        {/* Shimmer */}
        <linearGradient id="tmShimmer" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0" />
          <stop offset="40%" stopColor={p.spark} stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="60%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>

        {/* Ruled-paper line grid */}
        <pattern id="tmLines" width="1400" height="22" patternUnits="userSpaceOnUse">
          <line x1="0" y1="21" x2="1400" y2="21" stroke={p.primary} strokeOpacity="0.035" strokeWidth="0.5" />
        </pattern>

        {/* Dot grid */}
        <pattern id="tmDots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.4" fill={p.primary} opacity="0.05" />
        </pattern>
      </defs>

      {/* Base */}
      <rect width="1400" height="420" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* Pattern layers */}
      <rect width="1400" height="420" fill="url(#tmDots)" />
      <rect width="1400" height="420" fill="url(#tmLines)" />

      {/* Radial glows */}
      <rect width="1400" height="420" fill="url(#tmGlow1)" />
      <rect width="1400" height="420" fill="url(#tmGlow2)" />
      <rect width="1400" height="420" fill="url(#tmGlow3)" />
      <rect width="1400" height="420" fill="url(#tmGlow4)" />
      <rect width="1400" height="420" fill="url(#tmGlow5)" />
      <rect width="1400" height="420" fill="url(#tmGlow6)" />
      <rect width="1400" height="420" fill="url(#tmGlow7)" />
      <rect width="1400" height="420" fill="url(#tmShimmer)" />

      {/* === CENTRAL SCALES OF JUSTICE === */}
      {/* Fulcrum triangle */}
      <polygon points="700,240 690,260 710,260" fill="none" stroke={p.primary} strokeOpacity="0.18" strokeWidth="1" />
      {/* Balance beam */}
      <line x1="600" y1="200" x2="800" y2="200" stroke={p.primary} strokeOpacity="0.16" strokeWidth="1.2" />
      {/* Pillar */}
      <line x1="700" y1="200" x2="700" y2="240" stroke={p.primary} strokeOpacity="0.14" strokeWidth="1" />
      {/* Left pan */}
      <path d="M600 200 L585 230 Q600 240 615 230 Z" fill="none" stroke={p.glow} strokeOpacity="0.14" strokeWidth="0.8" />
      {/* Right pan */}
      <path d="M800 200 L785 230 Q800 240 815 230 Z" fill="none" stroke={p.glow} strokeOpacity="0.14" strokeWidth="0.8" />
      {/* Hanging chains (left) */}
      <line x1="600" y1="200" x2="585" y2="230" stroke={p.glow} strokeOpacity="0.10" strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="600" y1="200" x2="615" y2="230" stroke={p.glow} strokeOpacity="0.10" strokeWidth="0.6" strokeDasharray="2 2" />
      {/* Hanging chains (right) */}
      <line x1="800" y1="200" x2="785" y2="230" stroke={p.glow} strokeOpacity="0.10" strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="800" y1="200" x2="815" y2="230" stroke={p.glow} strokeOpacity="0.10" strokeWidth="0.6" strokeDasharray="2 2" />
      {/* Central glow node */}
      <circle cx="700" cy="200" r="4" fill={p.glow} opacity="0.50" />
      <circle cx="700" cy="200" r="14" fill={p.glow} opacity="0.06" />

      {/* === DOCUMENT / SCROLL SILHOUETTES === */}
      {/* Left document */}
      <rect x="150" y="110" width="70" height="90" rx="3" fill="none" stroke={p.surge} strokeOpacity="0.12" strokeWidth="0.8" />
      {/* Corner fold */}
      <path d="M205 110 L220 110 L220 125" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.6" />
      <line x1="205" y1="110" x2="220" y2="125" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.6" />
      {/* Document text lines */}
      <line x1="162" y1="130" x2="208" y2="130" stroke={p.surge} strokeOpacity="0.08" strokeWidth="0.6" />
      <line x1="162" y1="140" x2="200" y2="140" stroke={p.surge} strokeOpacity="0.07" strokeWidth="0.5" />
      <line x1="162" y1="150" x2="205" y2="150" stroke={p.surge} strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="162" y1="160" x2="195" y2="160" stroke={p.surge} strokeOpacity="0.06" strokeWidth="0.4" />
      <line x1="162" y1="170" x2="203" y2="170" stroke={p.surge} strokeOpacity="0.05" strokeWidth="0.4" />
      <line x1="162" y1="180" x2="190" y2="180" stroke={p.surge} strokeOpacity="0.05" strokeWidth="0.4" />

      {/* Right document */}
      <rect x="1160" y="130" width="75" height="95" rx="3" fill="none" stroke={p.surge} strokeOpacity="0.12" strokeWidth="0.8" />
      <path d="M1220 130 L1235 130 L1235 145" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.6" />
      <line x1="1220" y1="130" x2="1235" y2="145" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.6" />
      <line x1="1172" y1="150" x2="1223" y2="150" stroke={p.surge} strokeOpacity="0.08" strokeWidth="0.6" />
      <line x1="1172" y1="160" x2="1215" y2="160" stroke={p.surge} strokeOpacity="0.07" strokeWidth="0.5" />
      <line x1="1172" y1="170" x2="1220" y2="170" stroke={p.surge} strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="1172" y1="180" x2="1210" y2="180" stroke={p.surge} strokeOpacity="0.06" strokeWidth="0.4" />
      <line x1="1172" y1="190" x2="1218" y2="190" stroke={p.surge} strokeOpacity="0.05" strokeWidth="0.4" />
      <line x1="1172" y1="200" x2="1205" y2="200" stroke={p.surge} strokeOpacity="0.05" strokeWidth="0.4" />

      {/* Bottom-left scroll */}
      <rect x="310" y="270" width="60" height="80" rx="3" fill="none" stroke={p.spark} strokeOpacity="0.10" strokeWidth="0.7" />
      <line x1="320" y1="288" x2="360" y2="288" stroke={p.spark} strokeOpacity="0.07" strokeWidth="0.5" />
      <line x1="320" y1="298" x2="355" y2="298" stroke={p.spark} strokeOpacity="0.06" strokeWidth="0.4" />
      <line x1="320" y1="308" x2="358" y2="308" stroke={p.spark} strokeOpacity="0.05" strokeWidth="0.4" />
      <line x1="320" y1="318" x2="350" y2="318" stroke={p.spark} strokeOpacity="0.05" strokeWidth="0.4" />
      <line x1="320" y1="328" x2="356" y2="328" stroke={p.spark} strokeOpacity="0.04" strokeWidth="0.4" />

      {/* Top-right small document */}
      <rect x="1040" y="50" width="50" height="65" rx="2.5" fill="none" stroke={warmA} strokeOpacity="0.10" strokeWidth="0.7" />
      <line x1="1050" y1="66" x2="1080" y2="66" stroke={warmA} strokeOpacity="0.07" strokeWidth="0.4" />
      <line x1="1050" y1="74" x2="1078" y2="74" stroke={warmA} strokeOpacity="0.06" strokeWidth="0.4" />
      <line x1="1050" y1="82" x2="1075" y2="82" stroke={warmA} strokeOpacity="0.05" strokeWidth="0.4" />
      <line x1="1050" y1="90" x2="1077" y2="90" stroke={warmA} strokeOpacity="0.05" strokeWidth="0.4" />

      {/* === CLAUSE MARKERS — numbered bullets === */}
      {/* Left column */}
      <circle cx="450" cy="120" r="6" fill="none" stroke={p.glow} strokeOpacity="0.12" strokeWidth="0.7" />
      <text x="450" y="123" fill={p.glow} opacity="0.12" fontSize="7" fontFamily="monospace" textAnchor="middle">§</text>
      <line x1="460" y1="120" x2="520" y2="120" stroke={p.glow} strokeOpacity="0.08" strokeWidth="0.5" />

      <circle cx="450" cy="148" r="6" fill="none" stroke={p.glow} strokeOpacity="0.10" strokeWidth="0.7" />
      <text x="450" y="151" fill={p.glow} opacity="0.10" fontSize="7" fontFamily="monospace" textAnchor="middle">§</text>
      <line x1="460" y1="148" x2="515" y2="148" stroke={p.glow} strokeOpacity="0.07" strokeWidth="0.5" />

      <circle cx="450" cy="176" r="6" fill="none" stroke={p.glow} strokeOpacity="0.09" strokeWidth="0.7" />
      <text x="450" y="179" fill={p.glow} opacity="0.09" fontSize="7" fontFamily="monospace" textAnchor="middle">§</text>
      <line x1="460" y1="176" x2="525" y2="176" stroke={p.glow} strokeOpacity="0.06" strokeWidth="0.5" />

      {/* Right column */}
      <circle cx="930" cy="130" r="6" fill="none" stroke={p.surge} strokeOpacity="0.12" strokeWidth="0.7" />
      <text x="930" y="133" fill={p.surge} opacity="0.12" fontSize="7" fontFamily="monospace" textAnchor="middle">§</text>
      <line x1="940" y1="130" x2="1000" y2="130" stroke={p.surge} strokeOpacity="0.08" strokeWidth="0.5" />

      <circle cx="930" cy="158" r="6" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.7" />
      <text x="930" y="161" fill={p.surge} opacity="0.10" fontSize="7" fontFamily="monospace" textAnchor="middle">§</text>
      <line x1="940" y1="158" x2="995" y2="158" stroke={p.surge} strokeOpacity="0.07" strokeWidth="0.5" />

      <circle cx="930" cy="186" r="6" fill="none" stroke={p.surge} strokeOpacity="0.09" strokeWidth="0.7" />
      <text x="930" y="189" fill={p.surge} opacity="0.09" fontSize="7" fontFamily="monospace" textAnchor="middle">§</text>
      <line x1="940" y1="186" x2="1005" y2="186" stroke={p.surge} strokeOpacity="0.06" strokeWidth="0.5" />

      {/* === HANDSHAKE / AGREEMENT LINES (crossing arcs) === */}
      <path d="M460 300 Q530 270 600 290" fill="none" stroke={p.glow} strokeOpacity="0.12" strokeWidth="0.8" />
      <path d="M480 310 Q540 285 595 300" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.7" />
      {/* Mirror on right */}
      <path d="M800 290 Q870 270 940 300" fill="none" stroke={p.glow} strokeOpacity="0.12" strokeWidth="0.8" />
      <path d="M805 300 Q860 285 920 310" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.7" />

      {/* === GAVEL SILHOUETTE (top-left) === */}
      {/* Handle */}
      <line x1="85" y1="300" x2="115" y2="270" stroke={warmC} strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" />
      {/* Head */}
      <rect x="108" y="258" width="28" height="12" rx="3" fill="none" stroke={warmC} strokeOpacity="0.14" strokeWidth="0.8" transform="rotate(-40, 122, 264)" />
      {/* Strike block */}
      <rect x="65" y="310" width="50" height="8" rx="2" fill="none" stroke={warmC} strokeOpacity="0.10" strokeWidth="0.7" />

      {/* === Flowing agreement curves across the width === */}
      <path d="M0 320 Q200 280 400 310 T800 300 T1200 320 T1400 305" fill="none" stroke={p.glow} strokeOpacity="0.13" strokeWidth="1.1" />
      <path d="M0 355 Q250 320 500 345 T1000 335 T1400 350" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.9" />
      <path d="M0 385 Q300 360 600 380 T1200 370 T1400 382" fill="none" stroke={p.surge} strokeOpacity="0.07" strokeWidth="0.7" />
      <path d="M0 100 Q350 70 700 90 T1400 80" fill="none" stroke={warmA} strokeOpacity="0.08" strokeWidth="0.7" />
      <path d="M0 60 Q400 35 800 55 T1400 45" fill="none" stroke={warmB} strokeOpacity="0.06" strokeWidth="0.6" />

      {/* === Sparkle nodes === */}
      <circle cx="70" cy="55" r="1.5" fill={p.gold} opacity="0.48" />
      <circle cx="250" cy="40" r="1.4" fill={p.glow} opacity="0.46" />
      <circle cx="480" cy="50" r="1.6" fill={p.surge} opacity="0.50" />
      <circle cx="660" cy="38" r="1.3" fill={p.spark} opacity="0.44" />
      <circle cx="860" cy="55" r="1.7" fill={p.blaze} opacity="0.48" />
      <circle cx="1100" cy="42" r="1.4" fill={p.surge} opacity="0.45" />
      <circle cx="1320" cy="60" r="1.5" fill={p.flame} opacity="0.42" />
      <circle cx="120" cy="390" r="1.3" fill={p.glow} opacity="0.40" />
      <circle cx="400" cy="400" r="1.5" fill={p.surge} opacity="0.38" />
      <circle cx="750" cy="395" r="1.2" fill={p.spark} opacity="0.36" />
      <circle cx="1050" cy="390" r="1.4" fill={p.gold} opacity="0.40" />
      <circle cx="1350" cy="400" r="1.3" fill={p.surge} opacity="0.38" />

      {/* Halo glows */}
      <circle cx="200" cy="180" r="55" fill={p.surge} opacity="0.035" />
      <circle cx="700" cy="120" r="70" fill={p.glow} opacity="0.04" />
      <circle cx="1100" cy="200" r="60" fill={p.surge} opacity="0.035" />
      <circle cx="400" cy="350" r="50" fill={p.spark} opacity="0.03" />
      <circle cx="1000" cy="340" r="45" fill={p.flame} opacity="0.025" />

      {/* Diagonal streaks */}
      <line x1="80" y1="420" x2="580" y2="0" stroke={p.glow} strokeOpacity="0.05" strokeWidth="30" />
      <line x1="500" y1="420" x2="1000" y2="0" stroke={p.spark} strokeOpacity="0.05" strokeWidth="26" />
      <line x1="920" y1="420" x2="1380" y2="20" stroke={p.surge} strokeOpacity="0.05" strokeWidth="28" />
      </g>
    </svg>
  );
}
