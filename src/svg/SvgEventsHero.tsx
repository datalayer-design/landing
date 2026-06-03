/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG hero background for the Events page.
 *
 * Visual motif: a conference/stage landscape — a stylised podium at
 * centre with radiating spotlight beams, floating calendar cards,
 * microphone & play-button icons, and a scattered audience of glowing
 * dots.  Animated spotlight sweeps, pulse rings around the stage, and
 * drifting particle confetti create a lively event atmosphere.
 *
 * Uses a 1400 × 380 viewBox to match the hero's minHeight.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgEventsHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <svg
      viewBox="0 0 1400 380"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* Spotlight cone gradients */}
        <linearGradient id="ev_spot1" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.30" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ev_spot2" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.25" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ev_spot3" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.22" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </linearGradient>

        {/* Orb glows */}
        <radialGradient id="ev_orb1" cx="30%" cy="40%" r="40%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.35" />
          <stop offset="60%" stopColor={p.glow} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ev_orb2" cx="70%" cy="35%" r="35%">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.30" />
          <stop offset="60%" stopColor={p.pop} stopOpacity="0.05" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ev_orb3" cx="50%" cy="65%" r="30%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.28" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.04" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>

        {/* Hex grid */}
        <pattern id="ev_hex" width="30" height="52" patternUnits="userSpaceOnUse">
          <polygon points="15,1 28,9 28,25 15,33 2,25 2,9" fill="none" stroke={p.primary} strokeWidth="0.3" strokeOpacity="0.05" />
          <polygon points="15,27 28,35 28,51 15,59 2,51 2,35" fill="none" stroke={p.primary} strokeWidth="0.3" strokeOpacity="0.03" />
        </pattern>

        {/* Stage glow */}
        <radialGradient id="ev_stageGlow" cx="50%" cy="80%" r="40%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.20" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        <filter id="ev_softGlow">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* ═══ BASE ═══ */}
      <rect width="1400" height="380" fill={p.bg} />

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        {/* Hex grid underlay */}
        <rect width="1400" height="380" fill="url(#ev_hex)" />

        {/* Ambient orbs */}
        <rect width="1400" height="380" fill="url(#ev_orb1)" />
        <rect width="1400" height="380" fill="url(#ev_orb2)" />
        <rect width="1400" height="380" fill="url(#ev_orb3)" />

        {/* Stage glow at bottom centre */}
        <rect width="1400" height="380" fill="url(#ev_stageGlow)" />

        {/* ═══ SPOTLIGHT BEAMS ═══ */}
        <polygon points="700,20 550,380 650,380" fill="url(#ev_spot1)" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.35;0.6" dur="7s" repeatCount="indefinite" />
        </polygon>
        <polygon points="700,20 750,380 850,380" fill="url(#ev_spot2)" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.3;0.5" dur="8s" repeatCount="indefinite" />
        </polygon>
        <polygon points="700,20 400,380 500,380" fill="url(#ev_spot3)" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.2;0.4" dur="9s" repeatCount="indefinite" />
        </polygon>
        <polygon points="700,20 900,380 1000,380" fill="url(#ev_spot1)" opacity="0.35">
          <animate attributeName="opacity" values="0.35;0.15;0.35" dur="6s" repeatCount="indefinite" />
        </polygon>

        {/* ═══ STAGE PLATFORM ═══ */}
        <ellipse cx="700" cy="340" rx="350" ry="18" fill={p.glow} opacity="0.08" />
        <ellipse cx="700" cy="340" rx="200" ry="10" fill={p.glow} opacity="0.12" />

        {/* Pulse rings from stage */}
        <circle cx="700" cy="340" r="60" fill="none" stroke={p.glow} strokeWidth="0.8" strokeOpacity="0">
          <animate attributeName="r" values="60;180" dur="4s" repeatCount="indefinite" />
          <animate attributeName="strokeOpacity" values="0.25;0" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="700" cy="340" r="80" fill="none" stroke={p.pop} strokeWidth="0.6" strokeOpacity="0">
          <animate attributeName="r" values="80;220" dur="5s" repeatCount="indefinite" />
          <animate attributeName="strokeOpacity" values="0.18;0" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* ═══ LEFT: Calendar Card ═══ */}
        <g opacity="0.6" transform="translate(80, 80)">
          <rect x="3" y="3" width="160" height="130" rx="10" fill={p.primary} opacity="0.04" filter="url(#ev_softGlow)" />
          <rect width="160" height="130" rx="10" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.6" strokeOpacity="0.18" />
          {/* Header bar */}
          <rect width="160" height="22" rx="10" fill={p.blaze} opacity="0.12" />
          <rect y="11" width="160" height="11" fill={p.blaze} opacity="0.12" />
          <rect x="12" y="7" width="40" height="6" rx="2" fill={p.blaze} opacity="0.4" />
          <rect x="60" y="7" width="25" height="6" rx="2" fill={p.textMuted} opacity="0.15" />
          {/* Calendar grid */}
          {[0, 1, 2, 3, 4].map(row =>
            [0, 1, 2, 3, 4, 5, 6].map(col => (
              <rect
                key={`cal-${row}-${col}`}
                x={12 + col * 20}
                y={32 + row * 18}
                width={14}
                height={12}
                rx={2}
                fill={row === 2 && col === 3 ? p.glow : p.primary}
                opacity={row === 2 && col === 3 ? 0.35 : 0.04}
              />
            ))
          )}
          {/* Highlight marker on "today" */}
          <circle cx={12 + 3 * 20 + 7} cy={32 + 2 * 18 + 6} r="3" fill={p.glow} opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ═══ RIGHT: Video/Play Card ═══ */}
        <g opacity="0.55" transform="translate(1140, 70)">
          <rect x="3" y="3" width="190" height="120" rx="10" fill={p.primary} opacity="0.04" filter="url(#ev_softGlow)" />
          <rect width="190" height="120" rx="10" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.6" strokeOpacity="0.18" />
          {/* Video thumbnail */}
          <rect x="8" y="8" width="174" height="78" rx="6" fill={p.surge} opacity="0.06" />
          {/* Play button */}
          <circle cx="95" cy="47" r="16" fill={p.pop} opacity="0.15" />
          <circle cx="95" cy="47" r="10" fill={p.pop} opacity="0.25" />
          <polygon points="91,40 91,54 103,47" fill={p.pop} opacity="0.6" />
          {/* Video info lines */}
          <rect x="12" y="94" width="100" height="5" rx="2" fill={p.textMuted} opacity="0.15" />
          <rect x="12" y="104" width="65" height="4" rx="2" fill={p.pop} opacity="0.2" />
        </g>

        {/* ═══ FLOATING MICROPHONE ICON (left of stage) ═══ */}
        <g opacity="0.35" transform="translate(420, 160)">
          {/* Mic body */}
          <rect x="0" y="0" width="12" height="22" rx="6" fill={p.spark} opacity="0.5" />
          {/* Mic arc */}
          <path d="M-4,18 Q-4,30 6,30 Q16,30 16,18" fill="none" stroke={p.spark} strokeWidth="1.5" strokeOpacity="0.4" />
          {/* Stand */}
          <line x1="6" y1="30" x2="6" y2="38" stroke={p.spark} strokeWidth="1.5" strokeOpacity="0.3" />
          <line x1="0" y1="38" x2="12" y2="38" stroke={p.spark} strokeWidth="1.5" strokeOpacity="0.3" />
        </g>

        {/* ═══ FLOATING SPEAKER ICON (right of stage) ═══ */}
        <g opacity="0.3" transform="translate(960, 170)">
          <rect x="0" y="4" width="10" height="14" rx="1" fill={p.flame} opacity="0.4" />
          <polygon points="10,4 20,0 20,22 10,18" fill={p.flame} opacity="0.35" />
          {/* Sound waves */}
          <path d="M24,6 Q30,11 24,16" fill="none" stroke={p.flame} strokeWidth="1" strokeOpacity="0.3" />
          <path d="M28,3 Q36,11 28,19" fill="none" stroke={p.flame} strokeWidth="0.8" strokeOpacity="0.2" />
        </g>

        {/* ═══ AUDIENCE DOTS ═══ */}
        {[
          { cx: 300, cy: 320 }, { cx: 340, cy: 330 }, { cx: 380, cy: 325 },
          { cx: 430, cy: 335 }, { cx: 480, cy: 328 }, { cx: 530, cy: 340 },
          { cx: 580, cy: 332 }, { cx: 630, cy: 338 }, { cx: 680, cy: 345 },
          { cx: 720, cy: 340 }, { cx: 770, cy: 335 }, { cx: 820, cy: 342 },
          { cx: 870, cy: 330 }, { cx: 920, cy: 338 }, { cx: 970, cy: 325 },
          { cx: 1020, cy: 335 }, { cx: 1060, cy: 328 }, { cx: 1100, cy: 332 },
        ].map((dot, i) => (
          <circle
            key={`aud-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r={2 + (i % 3) * 0.5}
            fill={[p.glow, p.pop, p.spark, p.surge, p.flame, p.gold][i % 6]}
            opacity={0.15 + (i % 4) * 0.06}
          >
            <animate attributeName="opacity" values={`${0.15 + (i % 4) * 0.06};${0.08};${0.15 + (i % 4) * 0.06}`} dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* ═══ CONFETTI PARTICLES ═══ */}
        {[
          { cx: 60,   cy: 40,  color: p.flame, dur: 4.5 },
          { cx: 200,  cy: 60,  color: p.glow,  dur: 5 },
          { cx: 350,  cy: 30,  color: p.gold,  dur: 3.5 },
          { cx: 550,  cy: 50,  color: p.pop,   dur: 4 },
          { cx: 750,  cy: 25,  color: p.spark, dur: 5.5 },
          { cx: 950,  cy: 45,  color: p.surge, dur: 3.8 },
          { cx: 1100, cy: 35,  color: p.blaze, dur: 4.2 },
          { cx: 1300, cy: 55,  color: p.glow,  dur: 5 },
          { cx: 150,  cy: 280, color: p.pop,   dur: 4 },
          { cx: 1250, cy: 250, color: p.spark, dur: 4.5 },
        ].map((pt, i) => (
          <g key={`conf-${i}`}>
            <circle cx={pt.cx} cy={pt.cy} r={1.8} fill={pt.color} opacity="0.3">
              <animate attributeName="opacity" values="0.3;0.08;0.3" dur={`${pt.dur}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ═══ CONNECTION LINES (calendar → stage, stage → video) ═══ */}
        <path
          d="M240 145 C 320 145, 400 200, 500 260"
          fill="none" stroke={p.glow} strokeWidth="0.6" strokeOpacity="0.1"
          strokeDasharray="5 4"
        >
          <animate attributeName="strokeDashoffset" from="0" to="-18" dur="3s" repeatCount="indefinite" />
        </path>
        <path
          d="M900 260 C 1000 200, 1080 145, 1140 130"
          fill="none" stroke={p.pop} strokeWidth="0.6" strokeOpacity="0.1"
          strokeDasharray="5 4"
        >
          <animate attributeName="strokeDashoffset" from="0" to="-18" dur="3.5s" repeatCount="indefinite" />
        </path>

        {/* ═══ ORBITING PARTICLES around stage centre ═══ */}
        <circle r="2" fill={p.glow} opacity="0.5">
          <animateMotion path="M700 300 m-40,0 a40,20 0 1,0 80,0 a40,20 0 1,0 -80,0" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="1.5" fill={p.pop} opacity="0.4">
          <animateMotion path="M700 310 m-60,0 a60,15 0 1,1 120,0 a60,15 0 1,1 -120,0" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle r="2.5" fill={p.spark} opacity="0.35">
          <animateMotion path="M700 290 m-80,0 a80,25 0 1,0 160,0 a80,25 0 1,0 -160,0" dur="12s" repeatCount="indefinite" />
        </circle>

        {/* ═══ BOTTOM WAVE ═══ */}
        <path
          d="M0 365 Q 180 355, 350 362 T 700 358 T 1050 365 T 1400 360"
          fill="none" stroke={p.glow} strokeWidth="0.6" strokeOpacity="0.08"
        />
      </g>
    </svg>
  );
}

export default SvgEventsHero;
