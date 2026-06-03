/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Themed SVG illustration for "Individuals & Teams".
 *
 * Visual motif: small group of people icons connecting to multiple API
 * endpoints and data sources through a shared workspace — conveying
 * collaboration, experimentation, and individual value from AI + data.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgIndividualsAndTeams({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const warmA = p.isLight ? p.surge : p.flame;
  const warmB = p.isLight ? p.spark : p.gold;
  const warmC = p.isLight ? p.pop : p.blaze;
  const bgGlowA = p.isLight ? p.surge : p.pop;
  const bgGlowB = p.isLight ? p.spark : p.glow;
  const bgGlowC = p.isLight ? p.accent : p.spark;
  const bgStroke = p.isLight ? p.accent : p.primary;
  return (
    <svg
      viewBox="0 0 600 340"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <LightBoostFilter />
        <radialGradient id="teamGlow1" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={bgGlowA} stopOpacity="0.22" />
          <stop offset="60%" stopColor={bgGlowA} stopOpacity="0.05" />
          <stop offset="100%" stopColor={bgGlowA} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="teamGlow2" cx="30%" cy="35%" r="40%">
          <stop offset="0%" stopColor={bgGlowB} stopOpacity="0.18" />
          <stop offset="100%" stopColor={bgGlowB} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="teamGlow3" cx="75%" cy="60%" r="38%">
          <stop offset="0%" stopColor={bgGlowC} stopOpacity="0.20" />
          <stop offset="100%" stopColor={bgGlowC} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="teamConn" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.4" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0.4" />
        </linearGradient>
        <filter id="teamSoftGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="600" height="340" fill={p.bg} />
      {p.isLight && <rect width="600" height="340" fill="url(#teamGlow1)" filter="url(#svgLightBoost)" />}
      {!p.isLight && <rect width="600" height="340" fill="url(#teamGlow1)" />}
      <rect width="600" height="340" fill="url(#teamGlow2)" />
      <rect width="600" height="340" fill="url(#teamGlow3)" />

      {/* Subtle dot grid */}
      <g opacity="0.06">
        {Array.from({ length: 15 }).map((_, xi) =>
          Array.from({ length: 8 }).map((_, yi) => (
            <circle key={`d${xi}${yi}`} cx={40 + xi * 38} cy={30 + yi * 40} r="1" fill={p.textMuted} />
          ))
        )}
      </g>

      {/* ── People icons (left side) ─────────────────────────────── */}
      <g filter="url(#teamSoftGlow)">
        {/* Person 1 — top */}
        <circle cx="110" cy="100" r="14" fill={p.glow} opacity="0.18" />
        <circle cx="110" cy="93" r="7" fill={p.bgPanel} stroke={p.glow} strokeWidth="1.5" />
        <path d="M 96 115 Q 96 105 110 105 Q 124 105 124 115" fill={p.bgPanel} stroke={p.glow} strokeWidth="1.5" />

        {/* Person 2 — middle */}
        <circle cx="90" cy="175" r="14" fill={p.pop} opacity="0.18" />
        <circle cx="90" cy="168" r="7" fill={p.bgPanel} stroke={p.pop} strokeWidth="1.5" />
        <path d="M 76 190 Q 76 180 90 180 Q 104 180 104 190" fill={p.bgPanel} stroke={p.pop} strokeWidth="1.5" />

        {/* Person 3 — bottom */}
        <circle cx="110" cy="250" r="14" fill={p.spark} opacity="0.18" />
        <circle cx="110" cy="243" r="7" fill={p.bgPanel} stroke={p.spark} strokeWidth="1.5" />
        <path d="M 96 265 Q 96 255 110 255 Q 124 255 124 265" fill={p.bgPanel} stroke={p.spark} strokeWidth="1.5" />
      </g>

      {/* Connection lines from people to shared workspace */}
      <g stroke="url(#teamConn)" strokeWidth="1.2" opacity="0.35">
        <path d="M 124 107 C 180 107 200 155 260 155" fill="none" />
        <path d="M 104 178 C 160 178 200 170 260 170" fill="none" />
        <path d="M 124 253 C 180 253 200 185 260 185" fill="none" />
      </g>

      {/* ── Shared workspace (center) ────────────────────────────── */}
      <g filter="url(#teamSoftGlow)">
        <rect x="255" y="110" width="130" height="120" rx="12" fill={p.bgPanel} stroke={p.primary} strokeWidth="1.5" opacity="0.9" />

        {/* Title bar */}
        <rect x="255" y="110" width="130" height="22" rx="12" fill={p.bgAlt} opacity="0.6" />
        <rect x="263" y="118" width="6" height="6" rx="3" fill={warmC} opacity="0.6" />
        <rect x="273" y="118" width="6" height="6" rx="3" fill={warmB} opacity="0.6" />
        <rect x="283" y="118" width="6" height="6" rx="3" fill={p.glow} opacity="0.6" />
        <rect x="295" y="119" width="50" height="4" rx="1.5" fill={p.textMuted} opacity="0.3" />

        {/* Notebook cells */}
        <rect x="265" y="140" width="110" height="18" rx="4" fill={p.bg} stroke={p.glow} strokeWidth="0.8" opacity="0.5" />
        <rect x="270" y="144" width="40" height="3" rx="1" fill={p.glow} opacity="0.45" />
        <rect x="270" y="150" width="60" height="2" rx="1" fill={p.textMuted} opacity="0.25" />

        <rect x="265" y="164" width="110" height="18" rx="4" fill={p.bg} stroke={p.pop} strokeWidth="0.8" opacity="0.5" />
        <rect x="270" y="168" width="50" height="3" rx="1" fill={p.pop} opacity="0.45" />
        <rect x="270" y="174" width="70" height="2" rx="1" fill={p.textMuted} opacity="0.25" />

        <rect x="265" y="188" width="110" height="18" rx="4" fill={p.bg} stroke={p.spark} strokeWidth="0.8" opacity="0.5" />
        <rect x="270" y="192" width="35" height="3" rx="1" fill={p.spark} opacity="0.45" />
        <rect x="270" y="198" width="55" height="2" rx="1" fill={p.textMuted} opacity="0.25" />

        {/* Cursor indicators (collaboration) */}
        <rect x="330" y="144" width="2" height="10" rx="1" fill={p.glow} opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.2s" repeatCount="indefinite" />
        </rect>
        <rect x="355" y="168" width="2" height="10" rx="1" fill={p.pop} opacity="0.8">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.4s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* Connection lines from workspace to API/data nodes */}
      <g stroke="url(#teamConn)" strokeWidth="1.2" opacity="0.35">
        <path d="M 385 140 C 420 140 430 95 460 95" fill="none" />
        <path d="M 385 170 C 420 170 430 170 460 170" fill="none" />
        <path d="M 385 200 C 420 200 430 245 460 245" fill="none" />
      </g>

      {/* ── API & Data source nodes (right side) ─────────────────── */}
      <g filter="url(#teamSoftGlow)">
        {/* API endpoint 1 */}
        <rect x="458" y="70" width="90" height="50" rx="8" fill={p.bgPanel} stroke={p.glow} strokeWidth="1.5" opacity="0.85" />
        <rect x="466" y="78" width="24" height="10" rx="3" fill={p.glow} opacity="0.3" />
        <text x="470" y="86" fill={p.glow} fontSize="6" fontFamily="monospace" opacity="0.7">API</text>
        <rect x="466" y="93" width="74" height="2" rx="1" fill={p.textMuted} opacity="0.2" />
        <rect x="466" y="99" width="50" height="2" rx="1" fill={p.textMuted} opacity="0.15" />
        <rect x="466" y="105" width="30" height="2" rx="1" fill={p.textMuted} opacity="0.12" />

        {/* Data source 2 */}
        <rect x="458" y="145" width="90" height="50" rx="8" fill={p.bgPanel} stroke={p.pop} strokeWidth="1.5" opacity="0.85" />
        <ellipse cx="480" cy="162" rx="10" ry="5" fill="none" stroke={p.pop} strokeWidth="1" opacity="0.5" />
        <line x1="470" y1="162" x2="470" y2="174" stroke={p.pop} strokeWidth="1" opacity="0.3" />
        <line x1="490" y1="162" x2="490" y2="174" stroke={p.pop} strokeWidth="1" opacity="0.3" />
        <ellipse cx="480" cy="174" rx="10" ry="5" fill="none" stroke={p.pop} strokeWidth="1" opacity="0.4" />
        <rect x="498" y="157" width="42" height="3" rx="1" fill={p.textLight} opacity="0.3" />
        <rect x="498" y="164" width="30" height="2" rx="1" fill={p.textMuted} opacity="0.2" />
        <rect x="498" y="170" width="36" height="2" rx="1" fill={p.textMuted} opacity="0.15" />

        {/* Cloud/CSV source 3 */}
        <rect x="458" y="220" width="90" height="50" rx="8" fill={p.bgPanel} stroke={p.spark} strokeWidth="1.5" opacity="0.85" />
        <path d="M 475 245 Q 475 235 485 235 Q 487 230 493 232 Q 498 228 504 232 Q 510 232 510 238 Q 515 238 515 245 Z"
          fill="none" stroke={p.spark} strokeWidth="1" opacity="0.5" />
        <rect x="466" y="252" width="74" height="2" rx="1" fill={p.textMuted} opacity="0.2" />
        <rect x="466" y="258" width="50" height="2" rx="1" fill={p.textMuted} opacity="0.15" />
      </g>

      {/* Floating particles */}
      <g opacity="0.4">
        <circle cx="180" cy="60" r="1.5" fill={p.glow}><animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.5s" repeatCount="indefinite" /></circle>
        <circle cx="220" cy="300" r="2" fill={p.pop}><animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" /></circle>
        <circle cx="430" cy="50" r="1.5" fill={p.spark}><animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" /></circle>
        <circle cx="440" cy="310" r="1" fill={p.surge}><animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="320" cy="50" r="1.5" fill={warmA}><animate attributeName="opacity" values="0.2;0.5;0.2" dur="4.5s" repeatCount="indefinite" /></circle>
        <circle cx="150" cy="310" r="1" fill={warmB}><animate attributeName="opacity" values="0.3;0.6;0.3" dur="6s" repeatCount="indefinite" /></circle>
      </g>

      {/* Subtle connection arcs (background) */}
      <g opacity="0.08">
        <circle cx="300" cy="170" r="140" fill="none" stroke={bgStroke} strokeWidth="0.5" strokeDasharray="4 6" />
        <circle cx="300" cy="170" r="160" fill="none" stroke={bgStroke} strokeWidth="0.3" strokeDasharray="2 8" />
      </g>
    </svg>
  );
}
