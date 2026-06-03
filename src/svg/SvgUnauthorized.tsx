/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Illustration for the "Unauthorized" view.
 *
 * Visual motif: a striped traffic barrier in front of a glowing
 * shield silhouette — communicating "access blocked" without being
 * alarming. Uses the shared ColorPalette for theming.
 */

import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

export function SvgUnauthorized({
  palette: paletteProp,
}: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const stripeA = p.isLight ? p.flame : p.surge;
  const stripeB = p.isLight ? p.bgPanel : p.bgAlt;
  const postFill = p.isLight ? p.bgAlt : p.bgPanel;
  return (
    <svg
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Access blocked illustration"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <radialGradient id="unauthGlow" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.35" />
          <stop offset="55%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="unauthShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.primary} stopOpacity="0.85" />
          <stop offset="100%" stopColor={p.secondary} stopOpacity="0.85" />
        </linearGradient>
        <pattern
          id="unauthStripes"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-45)"
        >
          <rect width="22" height="22" fill={stripeB} />
          <rect width="11" height="22" fill={stripeA} />
        </pattern>
      </defs>

      {/* Soft ambient glow */}
      <rect x="0" y="0" width="320" height="240" fill="url(#unauthGlow)" />

      {/* Shield silhouette behind barrier */}
      <path
        d="M160 52 L210 70 V128 C210 158 188 178 160 188 C132 178 110 158 110 128 V70 Z"
        fill="url(#unauthShield)"
        stroke={p.primary}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />

      {/* Lock body on shield */}
      <rect
        x="142"
        y="118"
        width="36"
        height="32"
        rx="4"
        fill={p.bg}
        stroke={p.primary}
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
      {/* Lock shackle */}
      <path
        d="M148 118 V108 a12 12 0 0 1 24 0 V118"
        fill="none"
        stroke={p.primary}
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Keyhole */}
      <circle cx="160" cy="132" r="3.5" fill={p.primary} />
      <rect x="158.5" y="132" width="3" height="9" fill={p.primary} />

      {/* Left post */}
      <rect x="32" y="120" width="14" height="92" rx="2" fill={postFill} stroke={p.primary} strokeOpacity="0.4" />
      <rect x="28" y="116" width="22" height="8" rx="2" fill={p.primary} opacity="0.6" />

      {/* Right post */}
      <rect x="274" y="120" width="14" height="92" rx="2" fill={postFill} stroke={p.primary} strokeOpacity="0.4" />
      <rect x="270" y="116" width="22" height="8" rx="2" fill={p.primary} opacity="0.6" />

      {/* Striped barrier bar */}
      <g>
        <rect
          x="40"
          y="156"
          width="240"
          height="22"
          rx="3"
          fill="url(#unauthStripes)"
          stroke={p.primary}
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        {/* Bolts on bar */}
        <circle cx="50" cy="167" r="2" fill={p.primary} opacity="0.7" />
        <circle cx="270" cy="167" r="2" fill={p.primary} opacity="0.7" />
      </g>

      {/* Ground line */}
      <line
        x1="20"
        y1="214"
        x2="300"
        y2="214"
        stroke={p.primary}
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

export default SvgUnauthorized;
