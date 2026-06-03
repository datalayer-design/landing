/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgFastA2ADonation({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <svg
      viewBox="0 0 1200 520"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="FastA2A donation artwork"
    >
      <defs>
        <LightBoostFilter />

        <linearGradient id="fa2a-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.isLight ? p.surge : p.primary} />
        </linearGradient>

        <linearGradient id="fa2a-flow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.9" />
          <stop offset="45%" stopColor={p.primary} stopOpacity="0.75" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0.85" />
        </linearGradient>

        <radialGradient id="fa2a-core" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor={p.isLight ? p.flame : p.glow} stopOpacity="0.25" />
          <stop offset="100%" stopColor={p.primary} stopOpacity="0.04" />
        </radialGradient>

        <pattern id="fa2a-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill={p.primary} opacity="0.12" />
        </pattern>

        <filter id="fa2a-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect width="1200" height="520" fill="url(#fa2a-bg)" />
      <rect width="1200" height="520" fill="url(#fa2a-grid)" />

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        <circle cx="600" cy="260" r="240" fill="url(#fa2a-core)" filter="url(#fa2a-soft)" />

        <rect x="96" y="170" width="270" height="178" rx="18" fill={p.bg} opacity="0.94" stroke={p.primary} strokeOpacity="0.32" />
        <text x="126" y="212" fill={p.textLight} fontSize="26" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
          Pydantic
        </text>
        <text x="126" y="246" fill={p.textMuted} fontSize="16" fontFamily="system-ui, -apple-system, sans-serif">
          Donating FastA2A
        </text>
        <rect x="126" y="272" width="210" height="10" rx="5" fill={p.glow} opacity="0.5" />
        <rect x="126" y="292" width="170" height="10" rx="5" fill={p.primary} opacity="0.45" />

        <rect x="834" y="170" width="270" height="178" rx="18" fill={p.bg} opacity="0.94" stroke={p.pop} strokeOpacity="0.35" />
        <text x="864" y="212" fill={p.textLight} fontSize="26" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
          Datalayer
        </text>
        <text x="864" y="246" fill={p.textMuted} fontSize="16" fontFamily="system-ui, -apple-system, sans-serif">
          Managed AI Agents
        </text>
        <rect x="864" y="272" width="210" height="10" rx="5" fill={p.pop} opacity="0.45" />
        <rect x="864" y="292" width="170" height="10" rx="5" fill={p.primary} opacity="0.4" />

        <path d="M 366 220 C 520 140, 684 140, 834 220" fill="none" stroke="url(#fa2a-flow)" strokeWidth="4" strokeLinecap="round" opacity="0.7">
          <animate attributeName="opacity" values="0.45;0.85;0.45" dur="3.8s" repeatCount="indefinite" />
        </path>
        <path d="M 366 258 C 520 258, 684 258, 834 258" fill="none" stroke="url(#fa2a-flow)" strokeWidth="5" strokeLinecap="round" opacity="0.78">
          <animate attributeName="opacity" values="0.52;0.95;0.52" dur="3.1s" repeatCount="indefinite" />
        </path>
        <path d="M 366 296 C 520 376, 684 376, 834 296" fill="none" stroke="url(#fa2a-flow)" strokeWidth="4" strokeLinecap="round" opacity="0.7">
          <animate attributeName="opacity" values="0.45;0.85;0.45" dur="4.2s" repeatCount="indefinite" />
        </path>

        <circle r="7" fill={p.glow}>
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 366 220 C 520 140, 684 140, 834 220" />
        </circle>
        <circle r="8" fill={p.primary}>
          <animateMotion dur="2.1s" repeatCount="indefinite" path="M 366 258 C 520 258, 684 258, 834 258" />
        </circle>
        <circle r="7" fill={p.pop}>
          <animateMotion dur="2.9s" repeatCount="indefinite" path="M 366 296 C 520 376, 684 376, 834 296" />
        </circle>

        <g transform="translate(598, 255)">
          <circle r="54" fill={p.bg} stroke={p.primary} strokeOpacity="0.45" />
          <path d="M -14 -6 L 0 -20 L 14 -6" fill="none" stroke={p.primary} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M -14 6 L 0 20 L 14 6" fill="none" stroke={p.pop} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <animateTransform attributeName="transform" type="translate" values="598 255;598 247;598 255" dur="4.2s" repeatCount="indefinite" />
        </g>

        <text
          x="600"
          y="418"
          textAnchor="middle"
          fill={p.textLight}
          fontSize="30"
          fontWeight="750"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.01em"
        >
          FastA2A: donated, adopted, and accelerated
        </text>
      </g>
    </svg>
  );
}

export default SvgFastA2ADonation;