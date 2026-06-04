/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

export function SvgDataset({
  palette: paletteProp,
}: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <svg
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Dataset illustration"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <radialGradient id="datasetGlow" cx="50%" cy="44%" r="60%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.32" />
          <stop offset="65%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="datasetCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.25" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0.18" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="320" height="240" fill="url(#datasetGlow)" />
      <rect x="22" y="22" width="276" height="196" rx="14" fill={p.bgPanel} stroke={p.primary} strokeOpacity="0.22" />

      <rect x="46" y="44" width="228" height="24" rx="7" fill="url(#datasetCard)" />
      <rect x="58" y="51" width="88" height="10" rx="5" fill={p.surge} fillOpacity="0.55" />

      <g transform="translate(50 82)">
        <rect x="0" y="0" width="220" height="108" rx="10" fill={p.bgAlt} stroke={p.primary} strokeOpacity="0.2" />
        <line x1="54" y1="0" x2="54" y2="108" stroke={p.primary} strokeOpacity="0.16" />
        <line x1="106" y1="0" x2="106" y2="108" stroke={p.primary} strokeOpacity="0.16" />
        <line x1="158" y1="0" x2="158" y2="108" stroke={p.primary} strokeOpacity="0.16" />
        <line x1="0" y1="36" x2="220" y2="36" stroke={p.primary} strokeOpacity="0.16" />
        <line x1="0" y1="72" x2="220" y2="72" stroke={p.primary} strokeOpacity="0.16" />

        <rect x="10" y="10" width="36" height="16" rx="4" fill={p.surge} fillOpacity="0.34" />
        <rect x="64" y="46" width="36" height="16" rx="4" fill={p.glow} fillOpacity="0.34" />
        <rect x="168" y="82" width="36" height="16" rx="4" fill={p.flame} fillOpacity="0.34" />
      </g>

      <circle cx="268" cy="56" r="9" fill={p.surge} fillOpacity="0.72" />
      <circle cx="284" cy="72" r="5" fill={p.glow} fillOpacity="0.62" />
    </svg>
  );
}

export default SvgDataset;
