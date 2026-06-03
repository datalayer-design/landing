/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Illustration for "Not Found" views.
 *
 * Visual motif: a document card and magnifier over a soft grid,
 * hinting that the requested resource could not be located.
 * Uses the shared ColorPalette for theming.
 */

import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

export function SvgNotFound({
  palette: paletteProp,
}: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  const cardFill = p.isLight ? p.bgPanel : p.bgAlt;
  const accent = p.isLight ? p.surge : p.flame;
  const lensGlow = p.isLight ? p.glow : p.secondary;

  return (
    <svg
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Resource not found illustration"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <radialGradient id="notFoundGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={lensGlow} stopOpacity="0.32" />
          <stop offset="62%" stopColor={lensGlow} stopOpacity="0.09" />
          <stop offset="100%" stopColor={lensGlow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="notFoundCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cardFill} />
          <stop offset="100%" stopColor={p.bg} />
        </linearGradient>
        <pattern id="notFoundGrid" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0H0V18" fill="none" stroke={p.primary} strokeOpacity="0.08" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="320" height="240" fill="url(#notFoundGlow)" />
      <rect x="16" y="16" width="288" height="208" rx="14" fill="url(#notFoundGrid)" />

      <g>
        <rect
          x="64"
          y="56"
          width="132"
          height="140"
          rx="10"
          fill="url(#notFoundCard)"
          stroke={p.primary}
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <path d="M166 56 L196 86 H166 Z" fill={p.primary} fillOpacity="0.14" />
        <line x1="84" y1="98" x2="170" y2="98" stroke={p.primary} strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
        <line x1="84" y1="118" x2="158" y2="118" stroke={p.primary} strokeOpacity="0.26" strokeWidth="3" strokeLinecap="round" />
        <line x1="84" y1="138" x2="148" y2="138" stroke={p.primary} strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" />
        <circle cx="116" cy="168" r="11" fill={accent} fillOpacity="0.2" />
        <text x="110" y="173" fill={p.primary} fontSize="15" fontWeight="700">?</text>
      </g>

      <g transform="translate(178 114)">
        <circle cx="42" cy="42" r="31" fill={p.bg} stroke={accent} strokeWidth="7" />
        <circle cx="42" cy="42" r="17" fill={accent} fillOpacity="0.18" />
        <path d="M64 64 L90 90" stroke={accent} strokeWidth="9" strokeLinecap="round" />
      </g>

      <path
        d="M42 208 C90 190, 128 194, 176 206"
        fill="none"
        stroke={p.primary}
        strokeOpacity="0.2"
        strokeWidth="2"
        strokeDasharray="5 6"
      />
      <path
        d="M192 202 C224 188, 250 192, 284 204"
        fill="none"
        stroke={p.primary}
        strokeOpacity="0.2"
        strokeWidth="2"
        strokeDasharray="5 6"
      />
    </svg>
  );
}

export default SvgNotFound;
