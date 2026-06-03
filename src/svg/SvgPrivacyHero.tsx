/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, abstract SVG hero background for the Privacy Policy page.
 *
 * Visual motif: concentric shield rings radiating from the centre with
 * encrypted-data hex streams, lock-bolt silhouettes, and a subtle grid
 * of privacy "cells" — evokes protection, confidentiality, and trust.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgPrivacyHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
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

        {/* Centre shield glow */}
        <radialGradient id="pvGlow1" cx="50%" cy="48%" r="45%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.50" />
          <stop offset="40%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        {/* Left warm glow */}
        <radialGradient id="pvGlow2" cx="18%" cy="60%" r="40%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.38" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        {/* Right cool glow */}
        <radialGradient id="pvGlow3" cx="82%" cy="35%" r="42%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.36" />
          <stop offset="45%" stopColor={p.surge} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        {/* Top spark */}
        <radialGradient id="pvGlow4" cx="40%" cy="12%" r="35%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.34" />
          <stop offset="50%" stopColor={p.spark} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>
        {/* Bottom-left blaze */}
        <radialGradient id="pvGlow5" cx="25%" cy="85%" r="34%">
          <stop offset="0%" stopColor={warmC} stopOpacity="0.30" />
          <stop offset="50%" stopColor={warmC} stopOpacity="0.06" />
          <stop offset="100%" stopColor={warmC} stopOpacity="0" />
        </radialGradient>
        {/* Bottom-right flame */}
        <radialGradient id="pvGlow6" cx="72%" cy="78%" r="36%">
          <stop offset="0%" stopColor={warmA} stopOpacity="0.32" />
          <stop offset="50%" stopColor={warmA} stopOpacity="0.06" />
          <stop offset="100%" stopColor={warmA} stopOpacity="0" />
        </radialGradient>
        {/* Top-right gold */}
        <radialGradient id="pvGlow7" cx="90%" cy="15%" r="30%">
          <stop offset="0%" stopColor={warmB} stopOpacity="0.30" />
          <stop offset="50%" stopColor={warmB} stopOpacity="0.05" />
          <stop offset="100%" stopColor={warmB} stopOpacity="0" />
        </radialGradient>

        {/* Shimmer */}
        <linearGradient id="pvShimmer" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0" />
          <stop offset="42%" stopColor={p.spark} stopOpacity="0.08" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="58%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>

        {/* Honeycomb privacy cell grid */}
        <pattern id="pvHex" width="30" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
          <polygon points="15,0 28.0,7.5 28.0,22.5 15,30 2.0,22.5 2.0,7.5" fill="none" stroke={p.primary} strokeOpacity="0.04" strokeWidth="0.5" />
          <polygon points="15,26 28.0,33.5 28.0,48.5 15,56 2.0,48.5 2.0,33.5" fill="none" stroke={p.primary} strokeOpacity="0.04" strokeWidth="0.5" />
        </pattern>

        {/* Fine dot grid */}
        <pattern id="pvDots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.4" fill={p.primary} opacity="0.06" />
        </pattern>
      </defs>

      {/* Base */}
      <rect width="1400" height="420" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* Pattern layers */}
      <rect width="1400" height="420" fill="url(#pvDots)" />
      <rect width="1400" height="420" fill="url(#pvHex)" />

      {/* Radial glows */}
      <rect width="1400" height="420" fill="url(#pvGlow1)" />
      <rect width="1400" height="420" fill="url(#pvGlow2)" />
      <rect width="1400" height="420" fill="url(#pvGlow3)" />
      <rect width="1400" height="420" fill="url(#pvGlow4)" />
      <rect width="1400" height="420" fill="url(#pvGlow5)" />
      <rect width="1400" height="420" fill="url(#pvGlow6)" />
      <rect width="1400" height="420" fill="url(#pvGlow7)" />
      <rect width="1400" height="420" fill="url(#pvShimmer)" />

      {/* === Central shield motif — concentric rings === */}
      <circle cx="700" cy="210" r="160" fill="none" stroke={p.glow} strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="8 6" />
      <circle cx="700" cy="210" r="125" fill="none" stroke={p.glow} strokeOpacity="0.12" strokeWidth="1.2" strokeDasharray="5 4" />
      <circle cx="700" cy="210" r="90" fill="none" stroke={p.primary} strokeOpacity="0.14" strokeWidth="1.0" />
      <circle cx="700" cy="210" r="55" fill="none" stroke={p.primary} strokeOpacity="0.18" strokeWidth="0.8" />
      {/* Inner filled node */}
      <circle cx="700" cy="210" r="8" fill={p.glow} opacity="0.55" />
      <circle cx="700" cy="210" r="20" fill={p.glow} opacity="0.06" />

      {/* Shield / keyhole silhouette at centre */}
      <path
        d="M700 170 L700 170 Q720 170 728 180 L728 210 Q728 240 700 258 Q672 240 672 210 L672 180 Q680 170 700 170 Z"
        fill="none" stroke={p.primary} strokeOpacity="0.18" strokeWidth="1.2"
      />
      {/* Keyhole */}
      <circle cx="700" cy="205" r="5" fill="none" stroke={p.glow} strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="700" y1="210" x2="700" y2="225" stroke={p.glow} strokeOpacity="0.22" strokeWidth="1.2" strokeLinecap="round" />

      {/* === Lock motifs scattered across canvas === */}
      {/* Left lock */}
      <rect x="210" y="140" width="24" height="18" rx="3" fill="none" stroke={p.surge} strokeOpacity="0.15" strokeWidth="0.8" />
      <path d="M216 140 L216 132 Q216 124 222 124 Q228 124 228 132 L228 140" fill="none" stroke={p.surge} strokeOpacity="0.12" strokeWidth="0.7" />
      <circle cx="222" cy="149" r="2" fill={p.surge} opacity="0.20" />
      {/* Right lock */}
      <rect x="1140" y="250" width="28" height="20" rx="3.5" fill="none" stroke={p.surge} strokeOpacity="0.15" strokeWidth="0.8" />
      <path d="M1147 250 L1147 241 Q1147 232 1154 232 Q1161 232 1161 241 L1161 250" fill="none" stroke={p.surge} strokeOpacity="0.12" strokeWidth="0.7" />
      <circle cx="1154" cy="260" r="2.2" fill={p.surge} opacity="0.20" />
      {/* Top-right lock (smaller) */}
      <rect x="1020" y="55" width="20" height="15" rx="2.5" fill="none" stroke={p.spark} strokeOpacity="0.13" strokeWidth="0.7" />
      <path d="M1025 55 L1025 48 Q1025 42 1030 42 Q1035 42 1035 48 L1035 55" fill="none" stroke={p.spark} strokeOpacity="0.10" strokeWidth="0.6" />
      <circle cx="1030" cy="62" r="1.6" fill={p.spark} opacity="0.18" />

      {/* === Encrypted data hex streams (vertical columns of "hex" chars) === */}
      {/* Stream 1 */}
      {[60, 95, 130, 165, 200, 235, 270, 305, 340, 375].map((y, i) => (
        <text key={`hs1-${i}`} x="100" y={y} fill={p.glow} opacity={0.06 + (i % 3) * 0.02} fontSize="8" fontFamily="monospace">{['A7', 'F3', '9E', '1B', 'D4', '6C', '88', '2F', 'E1', '5A'][i]}</text>
      ))}
      {/* Stream 2 */}
      {[45, 80, 115, 150, 185, 220, 255, 290, 325, 360].map((y, i) => (
        <text key={`hs2-${i}`} x="380" y={y} fill={p.spark} opacity={0.05 + (i % 4) * 0.015} fontSize="7" fontFamily="monospace">{['3D', 'C8', '71', 'AE', '0F', 'B2', '94', 'E7', '56', '1C'][i]}</text>
      ))}
      {/* Stream 3 */}
      {[55, 90, 125, 160, 195, 230, 265, 300, 335, 370].map((y, i) => (
        <text key={`hs3-${i}`} x="1250" y={y} fill={p.surge} opacity={0.05 + (i % 3) * 0.018} fontSize="7.5" fontFamily="monospace">{['FF', '42', 'DA', '07', '8B', 'C3', '6E', '15', 'A9', '3F'][i]}</text>
      ))}
      {/* Stream 4 */}
      {[70, 105, 140, 175, 210, 245, 280, 315, 350, 385].map((y, i) => (
        <text key={`hs4-${i}`} x="950" y={y} fill={p.surge} opacity={0.04 + (i % 3) * 0.015} fontSize="7" fontFamily="monospace">{['B5', '2A', 'E0', '7D', '49', 'FC', '16', '83', 'D1', '6B'][i]}</text>
      ))}

      {/* === Privacy ring arcs on sides === */}
      <path d="M140 340 A120 120 0 0 1 140 100" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.9" strokeDasharray="6 5" />
      <path d="M160 320 A100 100 0 0 1 160 120" fill="none" stroke={warmC} strokeOpacity="0.07" strokeWidth="0.7" strokeDasharray="4 4" />
      <path d="M1260 100 A120 120 0 0 1 1260 340" fill="none" stroke={p.surge} strokeOpacity="0.10" strokeWidth="0.9" strokeDasharray="6 5" />
      <path d="M1240 120 A100 100 0 0 1 1240 320" fill="none" stroke={warmA} strokeOpacity="0.07" strokeWidth="0.7" strokeDasharray="4 4" />

      {/* === Fingerprint-like concentric arcs (top-left) === */}
      <path d="M260 80 Q300 60 340 80" fill="none" stroke={p.glow} strokeOpacity="0.10" strokeWidth="0.7" />
      <path d="M255 90 Q300 65 345 90" fill="none" stroke={p.glow} strokeOpacity="0.08" strokeWidth="0.6" />
      <path d="M250 100 Q300 70 350 100" fill="none" stroke={p.glow} strokeOpacity="0.06" strokeWidth="0.5" />
      <path d="M245 110 Q300 75 355 110" fill="none" stroke={p.glow} strokeOpacity="0.05" strokeWidth="0.4" />

      {/* === Scattered sparkle nodes === */}
      <circle cx="55" cy="50" r="1.5" fill={p.glow} opacity="0.48" />
      <circle cx="230" cy="380" r="1.8" fill={p.surge} opacity="0.45" />
      <circle cx="480" cy="35" r="1.4" fill={p.spark} opacity="0.50" />
      <circle cx="620" cy="395" r="1.6" fill={warmC} opacity="0.42" />
      <circle cx="820" cy="45" r="1.7" fill={p.surge} opacity="0.50" />
      <circle cx="990" cy="380" r="1.3" fill={warmA} opacity="0.40" />
      <circle cx="1170" cy="55" r="1.5" fill={warmB} opacity="0.46" />
      <circle cx="1340" cy="360" r="1.4" fill={p.glow} opacity="0.42" />
      <circle cx="340" cy="310" r="1.3" fill={p.surge} opacity="0.38" />
      <circle cx="880" cy="350" r="1.5" fill={p.spark} opacity="0.40" />
      <circle cx="1300" cy="90" r="1.2" fill={p.surge} opacity="0.38" />
      <circle cx="560" cy="330" r="1.4" fill={warmC} opacity="0.36" />

      {/* Halo glows */}
      <circle cx="250" cy="200" r="55" fill={p.surge} opacity="0.035" />
      <circle cx="900" cy="160" r="65" fill={p.surge} opacity="0.03" />
      <circle cx="1150" cy="340" r="50" fill={p.spark} opacity="0.03" />
      <circle cx="450" cy="300" r="45" fill={warmA} opacity="0.025" />

      {/* Diagonal light streaks */}
      <line x1="100" y1="420" x2="600" y2="0" stroke={p.glow} strokeOpacity="0.05" strokeWidth="30" />
      <line x1="550" y1="420" x2="1050" y2="0" stroke={p.spark} strokeOpacity="0.05" strokeWidth="25" />
      <line x1="900" y1="420" x2="1400" y2="30" stroke={p.surge} strokeOpacity="0.05" strokeWidth="28" />
      </g>
    </svg>
  );
}
