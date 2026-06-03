/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Themed SVG illustration for "Organizations at Scale".
 *
 * Visual motif: a friendly AI robot/agent at the centre, receiving data
 * from source nodes (left) and dispatching structured outputs to
 * dashboard cards (right) — conveying agentic orchestration at scale.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgOrganizationsAtScale({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  return (
    <svg
      viewBox="0 0 600 340"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <LightBoostFilter />
        <radialGradient id="orgGlow1" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.30" />
          <stop offset="60%" stopColor={p.glow} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orgGlow2" cx="25%" cy="30%" r="40%">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.22" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orgGlow3" cx="78%" cy="65%" r="38%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.22" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orgFlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.5" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0.5" />
        </linearGradient>
        <filter id="orgNodeGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Robot head glow */}
        <radialGradient id="robotHeadGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.35" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="600" height="340" fill={p.bg} />
      {p.isLight && <rect width="600" height="340" fill="url(#orgGlow1)" filter="url(#svgLightBoost)" />}
      {!p.isLight && <rect width="600" height="340" fill="url(#orgGlow1)" />}
      <rect width="600" height="340" fill="url(#orgGlow2)" />
      <rect width="600" height="340" fill="url(#orgGlow3)" />

      {/* Background grid */}
      <g opacity="0.08" stroke={p.textMuted}>
        {[60, 120, 180, 240, 300, 360, 420, 480, 540].map(x => (
          <line key={`gv${x}`} x1={x} y1="0" x2={x} y2="340" strokeWidth="0.5" />
        ))}
        {[60, 120, 180, 240, 300].map(y => (
          <line key={`gh${y}`} x1="0" y1={y} x2="600" y2={y} strokeWidth="0.5" />
        ))}
      </g>

      {/* Data pipeline arrows (left to right flow) */}
      <g opacity="0.20">
        <path d="M 60 170 Q 150 120 250 160" stroke={p.glow} strokeWidth="2" fill="none" strokeDasharray="8 4" />
        <path d="M 80 200 Q 160 250 250 185" stroke={p.pop} strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
        <path d="M 100 130 Q 180 80 255 145" stroke={p.surge} strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
      </g>

      {/* Layer 1 — Source nodes (left cluster) */}
      <g filter="url(#orgNodeGlow)">
        {/* Database node */}
        <rect x="50" y="90" width="44" height="44" rx="8" fill={p.bgPanel} stroke={p.glow} strokeWidth="1.5" opacity="0.9" />
        <rect x="58" y="100" width="28" height="4" rx="1" fill={p.glow} opacity="0.6" />
        <rect x="58" y="108" width="28" height="4" rx="1" fill={p.glow} opacity="0.4" />
        <rect x="58" y="116" width="28" height="4" rx="1" fill={p.glow} opacity="0.3" />
        <circle cx="72" cy="128" r="2" fill={p.glow} opacity="0.5" />

        {/* API node */}
        <rect x="50" y="160" width="44" height="44" rx="8" fill={p.bgPanel} stroke={p.pop} strokeWidth="1.5" opacity="0.9" />
        <circle cx="72" cy="175" r="8" fill="none" stroke={p.pop} strokeWidth="1.5" opacity="0.5" />
        <circle cx="72" cy="175" r="3" fill={p.pop} opacity="0.6" />
        <rect x="58" y="188" width="28" height="3" rx="1" fill={p.pop} opacity="0.4" />

        {/* File node */}
        <rect x="50" y="230" width="44" height="44" rx="8" fill={p.bgPanel} stroke={p.surge} strokeWidth="1.5" opacity="0.9" />
        <path d="M 62 248 L 72 240 L 82 248 L 78 248 L 78 260 L 66 260 L 66 248 Z" fill={p.surge} opacity="0.5" />
      </g>

      {/* Connection lines from sources to robot */}
      <g stroke="url(#orgFlow)" strokeWidth="1.2" opacity="0.35">
        <line x1="94" y1="112" x2="255" y2="155" />
        <line x1="94" y1="182" x2="255" y2="170" />
        <line x1="94" y1="252" x2="255" y2="185" />
      </g>

      {/* ═══════ CENTRAL AI ROBOT / AGENT ═══════ */}
      <g filter="url(#orgNodeGlow)">
        {/* Outer glow ring */}
        <circle cx="300" cy="170" r="56" fill="url(#robotHeadGlow)" opacity="0.4" />

        {/* Antenna */}
        <line x1="300" y1="108" x2="300" y2="125" stroke={p.glow} strokeWidth="2" opacity="0.7" />
        <circle cx="300" cy="105" r="4" fill={p.glow} opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Robot head — main shape */}
        <rect x="264" y="125" width="72" height="58" rx="14" fill={p.bgPanel} stroke={p.glow} strokeWidth="2" opacity="0.95" />

        {/* Eyes — glowing circles */}
        <circle cx="284" cy="150" r="9" fill={p.bg} stroke={p.glow} strokeWidth="1.5" />
        <circle cx="284" cy="150" r="5" fill={p.glow} opacity="0.85">
          <animate attributeName="r" values="4;5.5;4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="316" cy="150" r="9" fill={p.bg} stroke={p.pop} strokeWidth="1.5" />
        <circle cx="316" cy="150" r="5" fill={p.pop} opacity="0.85">
          <animate attributeName="r" values="4;5.5;4" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </circle>

        {/* Mouth — friendly curved line */}
        <path d="M 286 168 Q 300 178 314 168" fill="none" stroke={p.spark} strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Robot body */}
        <rect x="272" y="188" width="56" height="36" rx="8" fill={p.bgPanel} stroke={p.glow} strokeWidth="1.5" opacity="0.85" />

        {/* Body core — energy indicator */}
        <circle cx="300" cy="206" r="8" fill={p.bg} stroke={p.surge} strokeWidth="1.5" />
        <circle cx="300" cy="206" r="4" fill={p.surge} opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Body detail bars */}
        <rect x="280" y="196" width="8" height="3" rx="1" fill={p.glow} opacity="0.3" />
        <rect x="312" y="196" width="8" height="3" rx="1" fill={p.pop} opacity="0.3" />
        <rect x="280" y="214" width="8" height="3" rx="1" fill={p.spark} opacity="0.3" />
        <rect x="312" y="214" width="8" height="3" rx="1" fill={p.flame} opacity="0.3" />

        {/* Arms — extending left and right */}
        {/* Left arm */}
        <line x1="272" y1="200" x2="252" y2="195" stroke={p.glow} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="249" cy="194" r="4" fill={p.bgPanel} stroke={p.glow} strokeWidth="1.5" opacity="0.7" />

        {/* Right arm */}
        <line x1="328" y1="200" x2="348" y2="195" stroke={p.pop} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        <circle cx="351" cy="194" r="4" fill={p.bgPanel} stroke={p.pop} strokeWidth="1.5" opacity="0.7" />

        {/* Ear panels */}
        <rect x="256" y="140" width="8" height="18" rx="3" fill={p.bgPanel} stroke={p.surge} strokeWidth="1" opacity="0.6" />
        <rect x="336" y="140" width="8" height="18" rx="3" fill={p.bgPanel} stroke={p.flame} strokeWidth="1" opacity="0.6" />
      </g>

      {/* Connection lines from robot to output nodes */}
      <g stroke="url(#orgFlow)" strokeWidth="1.2" opacity="0.35">
        <line x1="348" y1="155" x2="460" y2="90" />
        <line x1="348" y1="170" x2="460" y2="170" />
        <line x1="348" y1="185" x2="460" y2="250" />
      </g>

      {/* Pipeline arrows (right side) */}
      <g opacity="0.20">
        <path d="M 350 160 Q 400 110 460 90" stroke={p.glow} strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
        <path d="M 350 175 Q 405 175 460 175" stroke={p.pop} strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
        <path d="M 350 190 Q 400 240 460 250" stroke={p.surge} strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
      </g>

      {/* Layer 3 — Output nodes (right cluster) */}
      <g filter="url(#orgNodeGlow)">
        {/* Dashboard card */}
        <rect x="460" y="65" width="80" height="55" rx="8" fill={p.bgPanel} stroke={p.glow} strokeWidth="1.5" opacity="0.85" />
        <rect x="468" y="73" width="30" height="3" rx="1" fill={p.textLight} opacity="0.4" />
        <rect x="468" y="82" width="20" height="12" rx="2" fill={p.glow} opacity="0.2" />
        <rect x="492" y="82" width="20" height="12" rx="2" fill={p.pop} opacity="0.2" />
        <rect x="516" y="82" width="16" height="12" rx="2" fill={p.spark} opacity="0.2" />
        <rect x="468" y="98" width="64" height="3" rx="1" fill={p.textMuted} opacity="0.2" />
        <rect x="468" y="104" width="40" height="3" rx="1" fill={p.textMuted} opacity="0.15" />

        {/* Report card */}
        <rect x="460" y="145" width="80" height="55" rx="8" fill={p.bgPanel} stroke={p.pop} strokeWidth="1.5" opacity="0.85" />
        <rect x="468" y="153" width="36" height="3" rx="1" fill={p.textLight} opacity="0.4" />
        <rect x="468" y="161" width="64" height="2" rx="1" fill={p.textMuted} opacity="0.2" />
        <rect x="468" y="167" width="64" height="2" rx="1" fill={p.textMuted} opacity="0.2" />
        <rect x="468" y="173" width="50" height="2" rx="1" fill={p.textMuted} opacity="0.2" />
        <circle cx="480" cy="186" r="6" fill={p.pop} opacity="0.25" />
        <circle cx="500" cy="186" r="6" fill={p.glow} opacity="0.25" />
        <circle cx="520" cy="186" r="6" fill={p.surge} opacity="0.25" />

        {/* Alert card */}
        <rect x="460" y="225" width="80" height="55" rx="8" fill={p.bgPanel} stroke={p.surge} strokeWidth="1.5" opacity="0.85" />
        <rect x="468" y="233" width="28" height="3" rx="1" fill={p.textLight} opacity="0.4" />
        <path d="M 498 237 L 502 230 L 506 237 Z" fill={p.blaze} opacity="0.5" />
        <rect x="468" y="242" width="64" height="2" rx="1" fill={p.textMuted} opacity="0.2" />
        <rect x="468" y="248" width="64" height="2" rx="1" fill={p.textMuted} opacity="0.2" />
        <rect x="468" y="254" width="40" height="2" rx="1" fill={p.textMuted} opacity="0.2" />
        <rect x="468" y="262" width="30" height="8" rx="3" fill={p.surge} opacity="0.3" />
      </g>

      {/* Floating particles */}
      <g opacity="0.4">
        <circle cx="160" cy="80" r="2" fill={p.glow}><animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="200" cy="280" r="1.5" fill={p.pop}><animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" /></circle>
        <circle cx="400" cy="60" r="2" fill={p.spark}><animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" /></circle>
        <circle cx="420" cy="300" r="1.5" fill={p.surge}><animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" /></circle>
        <circle cx="180" cy="150" r="1.5" fill={p.flame}><animate attributeName="opacity" values="0.3;0.6;0.3" dur="4.5s" repeatCount="indefinite" /></circle>
        <circle cx="380" cy="270" r="1" fill={p.gold}><animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite" /></circle>
      </g>

      {/* Scale indicator — stacked layers */}
      <g opacity="0.12">
        <ellipse cx="300" cy="310" rx="120" ry="10" fill={p.glow} />
        <ellipse cx="300" cy="305" rx="100" ry="8" fill={p.pop} />
        <ellipse cx="300" cy="300" rx="80" ry="6" fill={p.surge} />
      </g>
    </svg>
  );
}
