/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG hero background for a "Stars" page.
 *
 * Visual motif: a post or repository earning many stars — a large
 * central star trophy surrounded by smaller orbiting stars, animated
 * twinkles, constellations, and a rising counter banner.  Gentle
 * pulse and sparkle animations create a celebratory atmosphere.
 *
 * Uses a 1400 × 380 viewBox to match the hero's minHeight.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgStarsHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
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

        {/* Star shape (5-pointed) */}
        <polygon
          id="star5"
          points="0,-12 3.5,-4 12,-4 5.5,2 7.6,10 0,5.5 -7.6,10 -5.5,2 -12,-4 -3.5,-4"
        />

        {/* Glow gradients */}
        <radialGradient id="st_orb1" cx="35%" cy="40%" r="40%">
          <stop offset="0%" stopColor={p.gold} stopOpacity="0.35" />
          <stop offset="60%" stopColor={p.gold} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.gold} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="st_orb2" cx="65%" cy="45%" r="35%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.25" />
          <stop offset="60%" stopColor={p.glow} stopOpacity="0.04" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="st_orb3" cx="50%" cy="55%" r="30%">
          <stop offset="0%" stopColor={p.flame} stopOpacity="0.22" />
          <stop offset="50%" stopColor={p.flame} stopOpacity="0.04" />
          <stop offset="100%" stopColor={p.flame} stopOpacity="0" />
        </radialGradient>

        {/* Central halo */}
        <radialGradient id="st_centerGlow" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor={p.gold} stopOpacity="0.28" />
          <stop offset="100%" stopColor={p.gold} stopOpacity="0" />
        </radialGradient>

        {/* Hex grid */}
        <pattern id="st_hex" width="30" height="52" patternUnits="userSpaceOnUse">
          <polygon points="15,1 28,9 28,25 15,33 2,25 2,9" fill="none" stroke={p.primary} strokeWidth="0.3" strokeOpacity="0.05" />
          <polygon points="15,27 28,35 28,51 15,59 2,51 2,35" fill="none" stroke={p.primary} strokeWidth="0.3" strokeOpacity="0.03" />
        </pattern>

        <filter id="st_softGlow">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* ═══ BASE ═══ */}
      <rect width="1400" height="380" fill={p.bg} />

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        {/* Grid underlay */}
        <rect width="1400" height="380" fill="url(#st_hex)" />

        {/* Ambient orbs */}
        <rect width="1400" height="380" fill="url(#st_orb1)" />
        <rect width="1400" height="380" fill="url(#st_orb2)" />
        <rect width="1400" height="380" fill="url(#st_orb3)" />

        {/* Central glow */}
        <rect width="1400" height="380" fill="url(#st_centerGlow)" />

        {/* ═══ CONSTELLATION LINES ═══ */}
        {[
          { d: 'M200 80 L310 130 L340 60', c: p.glow },
          { d: 'M1050 90 L1120 140 L1200 100', c: p.pop },
          { d: 'M150 300 L250 270 L280 310', c: p.spark },
          { d: 'M1100 280 L1200 310 L1260 260', c: p.surge },
        ].map((line, i) => (
          <path
            key={`const-${i}`}
            d={line.d}
            fill="none"
            stroke={line.c}
            strokeWidth="0.8"
            strokeOpacity="0.12"
          />
        ))}

        {/* ═══ CENTRAL TROPHY STAR ═══ */}
        <g transform="translate(700, 175)">
          {/* Outer pulse ring */}
          <circle cx="0" cy="0" r="60" fill="none" stroke={p.gold} strokeWidth="0.8" strokeOpacity="0">
            <animate attributeName="r" values="60;100" dur="3s" repeatCount="indefinite" />
            <animate attributeName="strokeOpacity" values="0.3;0" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="70" fill="none" stroke={p.flame} strokeWidth="0.6" strokeOpacity="0">
            <animate attributeName="r" values="70;120" dur="4s" repeatCount="indefinite" />
            <animate attributeName="strokeOpacity" values="0.2;0" dur="4s" repeatCount="indefinite" />
          </circle>

          {/* Glow disc */}
          <circle cx="0" cy="0" r="55" fill={p.gold} opacity="0.08" filter="url(#st_softGlow)" />
          <circle cx="0" cy="0" r="40" fill={p.gold} opacity="0.12" />

          {/* Central star */}
          <use
            href="#star5"
            transform="scale(3.5)"
            fill={p.gold}
            fillOpacity="0.85"
            stroke={p.gold}
            strokeWidth="0.4"
            strokeOpacity="0.6"
          >
            <animate attributeName="fillOpacity" values="0.85;0.65;0.85" dur="2.5s" repeatCount="indefinite" />
          </use>
        </g>

        {/* ═══ ORBITING SMALLER STARS ═══ */}
        {[
          { cx: 580, cy: 120, scale: 1.4, color: p.glow,  dur: 8 },
          { cx: 820, cy: 110, scale: 1.2, color: p.pop,   dur: 9 },
          { cx: 540, cy: 250, scale: 1.0, color: p.spark, dur: 7 },
          { cx: 860, cy: 260, scale: 1.3, color: p.flame, dur: 10 },
          { cx: 650, cy: 80,  scale: 0.9, color: p.surge, dur: 6 },
          { cx: 750, cy: 300, scale: 1.1, color: p.blaze, dur: 8.5 },
        ].map((s, i) => (
          <g key={`orbit-${i}`} transform={`translate(${s.cx}, ${s.cy})`}>
            <use
              href="#star5"
              transform={`scale(${s.scale})`}
              fill={s.color}
              fillOpacity="0.6"
            >
              <animate attributeName="fillOpacity" values="0.6;0.3;0.6" dur={`${s.dur}s`} repeatCount="indefinite" />
            </use>
          </g>
        ))}

        {/* ═══ LEFT: Star Counter Card ═══ */}
        <g opacity="0.6" transform="translate(80, 90)">
          <rect x="3" y="3" width="170" height="110" rx="10" fill={p.primary} opacity="0.04" filter="url(#st_softGlow)" />
          <rect width="170" height="110" rx="10" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.6" strokeOpacity="0.18" />
          {/* Star icon */}
          <use href="#star5" transform="translate(30, 38) scale(1.6)" fill={p.gold} fillOpacity="0.7" />
          {/* Counter text lines */}
          <rect x="60" y="28" width="80" height="8" rx="3" fill={p.gold} opacity="0.25" />
          <rect x="60" y="44" width="55" height="5" rx="2" fill={p.textMuted} opacity="0.15" />
          {/* Progress bar */}
          <rect x="16" y="70" width="138" height="6" rx="3" fill={p.primary} opacity="0.06" />
          <rect x="16" y="70" width="98" height="6" rx="3" fill={p.gold} opacity="0.3">
            <animate attributeName="width" values="60;98;60" dur="5s" repeatCount="indefinite" />
          </rect>
          {/* Mini stars row */}
          {[0, 1, 2, 3, 4].map(j => (
            <use
              key={`mini-${j}`}
              href="#star5"
              transform={`translate(${24 + j * 18}, 94) scale(0.6)`}
              fill={j < 4 ? p.gold : p.primary}
              fillOpacity={j < 4 ? 0.5 : 0.1}
            />
          ))}
        </g>

        {/* ═══ RIGHT: Leaderboard Card ═══ */}
        <g opacity="0.55" transform="translate(1140, 80)">
          <rect x="3" y="3" width="190" height="130" rx="10" fill={p.primary} opacity="0.04" filter="url(#st_softGlow)" />
          <rect width="190" height="130" rx="10" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.6" strokeOpacity="0.18" />
          {/* Header */}
          <rect x="12" y="10" width="70" height="6" rx="2" fill={p.textMuted} opacity="0.2" />
          {/* Rows with star counts */}
          {[0, 1, 2, 3].map(row => (
            <g key={`lb-${row}`} transform={`translate(12, ${30 + row * 24})`}>
              <circle cx="8" cy="6" r="6" fill={[p.gold, p.glow, p.pop, p.spark][row]} opacity="0.2" />
              <rect x="22" y="2" width={60 - row * 8} height="5" rx="2" fill={p.textMuted} opacity="0.12" />
              <use
                href="#star5"
                transform={`translate(${150 - row * 4}, 6) scale(0.55)`}
                fill={p.gold}
                fillOpacity={0.5 - row * 0.08}
              />
              <rect x="120" y="3" width={20 - row * 3} height="4" rx="1.5" fill={p.gold} opacity={0.2 - row * 0.03} />
            </g>
          ))}
        </g>

        {/* ═══ SCATTERED TWINKLE STARS ═══ */}
        {[
          { cx: 60,   cy: 50,  s: 0.7, color: p.flame, dur: 4.5 },
          { cx: 180,  cy: 330, s: 0.5, color: p.glow,  dur: 5 },
          { cx: 350,  cy: 40,  s: 0.8, color: p.gold,  dur: 3.5 },
          { cx: 450,  cy: 340, s: 0.6, color: p.pop,   dur: 4 },
          { cx: 950,  cy: 35,  s: 0.7, color: p.spark, dur: 5.5 },
          { cx: 1020, cy: 340, s: 0.5, color: p.surge, dur: 3.8 },
          { cx: 1300, cy: 60,  s: 0.6, color: p.blaze, dur: 4.2 },
          { cx: 1350, cy: 320, s: 0.7, color: p.glow,  dur: 5 },
          { cx: 380,  cy: 190, s: 0.5, color: p.pop,   dur: 4 },
          { cx: 1020, cy: 180, s: 0.5, color: p.spark, dur: 4.5 },
        ].map((pt, i) => (
          <g key={`twinkle-${i}`}>
            <use
              href="#star5"
              transform={`translate(${pt.cx}, ${pt.cy}) scale(${pt.s})`}
              fill={pt.color}
              fillOpacity="0.35"
            >
              <animate attributeName="fillOpacity" values="0.35;0.08;0.35" dur={`${pt.dur}s`} repeatCount="indefinite" />
            </use>
          </g>
        ))}

        {/* ═══ STAR TRAIL PARTICLES (ascending) ═══ */}
        {[
          { x: 660, dur: 6 },
          { x: 700, dur: 5 },
          { x: 740, dur: 7 },
        ].map((trail, i) => (
          <use key={`trail-${i}`} href="#star5" transform={`translate(${trail.x}, 300) scale(0.4)`} fill={p.gold} fillOpacity="0.5">
            <animateMotion
              path={`M0,0 C${-15 + i * 15},-80 ${10 - i * 10},-180 ${-5 + i * 5},-260`}
              dur={`${trail.dur}s`}
              repeatCount="indefinite"
            />
            <animate attributeName="fillOpacity" values="0.5;0.1;0.5" dur={`${trail.dur}s`} repeatCount="indefinite" />
          </use>
        ))}

        {/* ═══ ORBITING PARTICLES around centre ═══ */}
        <circle r="2" fill={p.gold} opacity="0.5">
          <animateMotion path="M700 175 m-50,0 a50,25 0 1,0 100,0 a50,25 0 1,0 -100,0" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="1.5" fill={p.flame} opacity="0.4">
          <animateMotion path="M700 175 m-70,0 a70,18 0 1,1 140,0 a70,18 0 1,1 -140,0" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle r="2.5" fill={p.spark} opacity="0.35">
          <animateMotion path="M700 175 m-90,0 a90,30 0 1,0 180,0 a90,30 0 1,0 -180,0" dur="12s" repeatCount="indefinite" />
        </circle>

        {/* ═══ BOTTOM WAVE ═══ */}
        <path
          d="M0 365 Q 180 355, 350 362 T 700 358 T 1050 365 T 1400 360"
          fill="none" stroke={p.gold} strokeWidth="0.6" strokeOpacity="0.08"
        />
      </g>
    </svg>
  );
}

export default SvgStarsHero;
