/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

export function SvgPublication({
  palette: paletteProp,
}: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <svg
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Publications illustration"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <radialGradient id="pubGlow" cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.3" />
          <stop offset="66%" stopColor={p.pop} stopOpacity="0.1" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pubPaper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bgPanel} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="320" height="240" fill="url(#pubGlow)" />

      <g transform="translate(54 34)">
        <rect x="34" y="16" width="176" height="142" rx="10" fill={p.bgAlt} stroke={p.primary} strokeOpacity="0.12" />
        <rect x="18" y="8" width="176" height="142" rx="10" fill={p.bgPanel} stroke={p.primary} strokeOpacity="0.18" />
        <rect x="0" y="0" width="176" height="142" rx="10" fill="url(#pubPaper)" stroke={p.primary} strokeOpacity="0.3" />

        <rect x="18" y="20" width="94" height="11" rx="5.5" fill={p.pop} fillOpacity="0.42" />
        <rect x="18" y="40" width="140" height="6" rx="3" fill={p.primary} fillOpacity="0.25" />
        <rect x="18" y="54" width="128" height="6" rx="3" fill={p.primary} fillOpacity="0.2" />

        <rect x="18" y="72" width="72" height="46" rx="6" fill={p.surge} fillOpacity="0.18" stroke={p.surge} strokeOpacity="0.45" />
        <rect x="98" y="72" width="60" height="8" rx="4" fill={p.glow} fillOpacity="0.35" />
        <rect x="98" y="86" width="52" height="8" rx="4" fill={p.flame} fillOpacity="0.3" />
        <rect x="98" y="100" width="45" height="8" rx="4" fill={p.gold} fillOpacity="0.3" />
      </g>

      <path d="M246 64 L276 84 L246 104 Z" fill={p.flame} fillOpacity="0.45" />
      <circle cx="72" cy="204" r="8" fill={p.gold} fillOpacity="0.3" />
      <circle cx="252" cy="192" r="10" fill={p.spark} fillOpacity="0.26" />
    </svg>
  );
}

export default SvgPublication;
