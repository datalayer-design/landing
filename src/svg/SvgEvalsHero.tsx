/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG hero background for evaluation-heavy research pages.
 *
 * Visual motif: experiment pipelines, benchmark sweeps, and judge-score
 * calibration. Left pane shows experiment setup and run queue, center pane
 * renders metric trajectories and confidence bars, right pane highlights
 * leaderboard and pass/fail gates with animated signals.
 *
 * Uses a 1400 × 380 viewBox to match hero containers.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgEvalsHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
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

        <linearGradient id="eh_aurora1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.24" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.13" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="eh_aurora2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.18" />
          <stop offset="50%" stopColor={p.flame} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0.14" />
        </linearGradient>

        <radialGradient id="eh_orb1" cx="15%" cy="35%" r="36%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.4" />
          <stop offset="60%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eh_orb2" cx="55%" cy="32%" r="32%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.34" />
          <stop offset="60%" stopColor={p.surge} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eh_orb3" cx="85%" cy="60%" r="34%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.3" />
          <stop offset="60%" stopColor={p.spark} stopOpacity="0.05" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>

        <pattern id="eh_grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke={p.primary} strokeOpacity="0.06" strokeWidth="0.5" />
        </pattern>

        <linearGradient id="eh_shimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.18">
            <animate attributeName="stopOpacity" values="0.1;0.24;0.1" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>

        <linearGradient id="eh_flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0" />
          <stop offset="45%" stopColor={p.glow} stopOpacity="0.56" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </linearGradient>

        <linearGradient id="eh_liquidA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="eh_liquidB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.85" />
          <stop offset="100%" stopColor={p.flame} stopOpacity="0.68" />
        </linearGradient>

        <filter id="eh_softGlow">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="eh_bubbleGlow">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect width="1400" height="380" fill={p.bg} />

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        <rect width="1400" height="380" fill="url(#eh_grid)" />
        <rect width="1400" height="380" fill="url(#eh_aurora1)" opacity="0.72" />
        <rect width="1400" height="380" fill="url(#eh_aurora2)" opacity="0.52" />
        <rect y="96" width="1400" height="188" fill="url(#eh_shimmer)" />
        <rect width="1400" height="380" fill="url(#eh_orb1)" />
        <rect width="1400" height="380" fill="url(#eh_orb2)" />
        <rect width="1400" height="380" fill="url(#eh_orb3)" />

        {/* Laboratory experiment rig */}
        <g opacity="0.78" transform="translate(70, 238)">
          <rect x="0" y="82" width="560" height="8" rx="4" fill={p.primary} opacity="0.2" />
          <rect x="72" y="12" width="6" height="78" rx="2" fill={p.primary} opacity="0.34" />
          <rect x="72" y="12" width="110" height="4" rx="2" fill={p.primary} opacity="0.28" />
          <rect x="248" y="4" width="6" height="86" rx="2" fill={p.primary} opacity="0.34" />
          <rect x="248" y="4" width="96" height="4" rx="2" fill={p.primary} opacity="0.28" />

          {/* Conical flask */}
          <path d="M92 20 L136 20 L130 44 L162 84 L66 84 L98 44 Z" fill={p.bgPanel} stroke={p.primary} strokeWidth="1" strokeOpacity="0.45" />
          <path d="M74 74 C94 60, 134 58, 154 74 L154 84 L74 84 Z" fill="url(#eh_liquidA)" opacity="0.86" />
          <path d="M74 74 C95 67, 132 64, 154 74" fill="none" stroke={p.glow} strokeWidth="1" strokeOpacity="0.5" />

          {/* Test tube rack */}
          <rect x="188" y="66" width="138" height="8" rx="3" fill={p.primary} opacity="0.24" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${198 + i * 30}, 32)`}>
              <rect width="16" height="40" rx="6" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.9" strokeOpacity="0.45" />
              <rect x="2" y={18 + (i % 2) * 6} width="12" height={20 - (i % 2) * 6} rx="4" fill={i % 2 === 0 ? 'url(#eh_liquidA)' : 'url(#eh_liquidB)'} opacity="0.82" />
            </g>
          ))}

          {/* Round-bottom flask */}
          <path d="M360 20 L382 20 L378 42 C396 50, 404 64, 404 78 C404 93, 392 104, 371 104 C350 104, 338 93, 338 78 C338 64, 346 50, 364 42 Z" fill={p.bgPanel} stroke={p.primary} strokeWidth="1" strokeOpacity="0.45" />
          <path d="M344 82 C352 74, 390 72, 398 82 C396 95, 384 101, 371 101 C358 101, 346 95, 344 82 Z" fill="url(#eh_liquidB)" opacity="0.9" />

          {/* Measuring beaker */}
          <path d="M430 34 L486 34 L486 92 C486 98, 482 102, 476 102 L440 102 C434 102, 430 98, 430 92 Z" fill={p.bgPanel} stroke={p.primary} strokeWidth="1" strokeOpacity="0.45" />
          <path d="M434 82 L482 82 L482 94 C482 97, 480 99, 477 99 L439 99 C436 99, 434 97, 434 94 Z" fill="url(#eh_liquidA)" opacity="0.84" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="436" y={46 + i * 9} width={10 + i * 7} height="1.6" rx="0.8" fill={p.textMuted} opacity="0.34" />
          ))}

          {/* Rising bubbles */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              cx={90 + i * 58}
              cy={80}
              r={1.8 + (i % 3) * 0.6}
              fill={i % 2 === 0 ? p.glow : p.surge}
              opacity="0.75"
              filter="url(#eh_bubbleGlow)"
            >
              <animate attributeName="cy" values="80;22" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.78;0" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* Right: metrics panel */}
        <g opacity="0.78" transform="translate(1142, 124.5)">
          <g transform="scale(0.5)">
            <rect x="4" y="4" width="456" height="262" rx="14" fill={p.surge} opacity="0.08" filter="url(#eh_softGlow)" />
            <rect width="456" height="262" rx="14" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.8" strokeOpacity="0.24" />

            <rect x="18" y="20" width="132" height="8" rx="3" fill={p.glow} opacity="0.34" />
            <rect x="160" y="20" width="90" height="8" rx="3" fill={p.textMuted} opacity="0.14" />

            <g transform="translate(24, 52)">
              <rect width="408" height="132" rx="8" fill={p.bgAlt} opacity="0.5" />
              <path d="M10 108 C70 95, 120 70, 168 62 C218 54, 272 36, 320 40 C350 42, 374 34, 398 22" fill="none" stroke={p.surge} strokeWidth="2.2" strokeOpacity="0.85" />
              <path d="M10 116 C64 100, 118 84, 168 80 C220 76, 274 62, 324 64 C354 66, 378 58, 398 52" fill="none" stroke={p.glow} strokeWidth="1.8" strokeOpacity="0.55" />
              <path d="M10 120 C66 108, 120 98, 170 98 C220 98, 276 90, 324 92 C356 94, 382 90, 398 88" fill="none" stroke={p.textMuted} strokeWidth="1.1" strokeOpacity="0.28" />

              {[70, 120, 170, 220, 270, 320].map((x, i) => (
                <circle key={x} cx={x} cy={i % 2 === 0 ? 66 : 58} r="2.4" fill={p.spark} opacity="0.82">
                  <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2.8 + i * 0.35}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>

            <g transform="translate(24, 196)">
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(0, ${i * 18})`}>
                  <rect width="300" height="10" rx="3" fill={p.textMuted} opacity="0.12" />
                  <rect width={220 + i * 26} height="10" rx="3" fill={i === 0 ? p.surge : i === 1 ? p.glow : p.spark} opacity="0.5" />
                </g>
              ))}
            </g>
          </g>
        </g>

        {/* Stylized microscope silhouette */}
        <g opacity="0.58" transform="translate(540, 236)">
          <rect x="0" y="70" width="120" height="8" rx="4" fill={p.primary} opacity="0.24" />
          <path d="M26 66 C26 40, 44 26, 66 26 L82 26" fill="none" stroke={p.primary} strokeWidth="7" strokeOpacity="0.28" strokeLinecap="round" />
          <rect x="68" y="10" width="38" height="8" rx="4" fill={p.primary} opacity="0.3" transform="rotate(-18 68 10)" />
          <rect x="56" y="34" width="36" height="6" rx="3" fill={p.primary} opacity="0.26" />
          <circle cx="42" cy="52" r="6" fill={p.glow} opacity="0.32" />
          <circle cx="94" cy="52" r="5" fill={p.surge} opacity="0.28" />
        </g>

        {/* Signal paths and pulses */}
        <path d="M640 182 C740 178, 808 178, 860 182" fill="none" stroke="url(#eh_flow)" strokeWidth="2" strokeOpacity="0.75" />

        <circle r="2.6" fill={p.glow} opacity="0.82">
          <animateMotion path="M640,182 C740,178 808,178 860,182" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle r="2.4" fill={p.surge} opacity="0.82">
          <animateMotion path="M640,182 C740,178 808,178 860,182" dur="3.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3.6s" repeatCount="indefinite" />
        </circle>

        {/* Floor traces */}
        <path
          d="M0 358 Q120 350, 240 354 T480 350 T720 356 T960 348 T1200 354 T1400 350"
          fill="none"
          stroke={p.glow}
          strokeWidth="0.9"
          strokeOpacity="0.12"
        />
        <path
          d="M0 364 Q130 358, 260 362 T520 358 T780 364 T1040 356 T1300 362 T1400 360"
          fill="none"
          stroke={p.surge}
          strokeWidth="0.7"
          strokeOpacity="0.08"
        />
      </g>
    </svg>
  );
}

export default SvgEvalsHero;
