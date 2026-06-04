/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

type SvgNotebookArtifactProps = {
  palette?: ColorPalette;
  width?: number | string;
  height?: number | string;
};

export function SvgNotebookArtifact({
  palette: paletteProp,
  width = '100%',
  height = 'auto',
}: SvgNotebookArtifactProps = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const id = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height, maxWidth: '100%', maxHeight: '500px', display: 'block' }}
    >
      <defs>
        <radialGradient id={`nb-bg-glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`nb-grad-1-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.glow} />
          <stop offset="100%" stopColor={p.pop} />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill={`url(#nb-bg-glow-${id})`} />
      <rect x="90" y="55" width="220" height="290" rx="14" fill={`url(#nb-grad-1-${id})`} opacity="0.12" />
      <rect x="100" y="65" width="200" height="270" rx="10" fill={`url(#nb-grad-1-${id})`} opacity="0.2" stroke={p.glow} strokeWidth="1.5" />
      <rect x="100" y="65" width="8" height="270" rx="4" fill={p.glow} opacity="0.35" />
      <rect x="120" y="85" width="168" height="55" rx="6" fill={p.surge} opacity="0.1" stroke={p.surge} strokeWidth="0.8" />
      <text x="128" y="100" fontSize="8" fontFamily="monospace" fill={p.surge} opacity="0.7">In [1]:</text>
      <rect x="128" y="106" width="80" height="5" rx="2.5" fill={p.surge} opacity="0.45" />
      <rect x="128" y="115" width="120" height="5" rx="2.5" fill={p.spark} opacity="0.35" />
      <rect x="128" y="124" width="60" height="5" rx="2.5" fill={p.surge} opacity="0.3" />
      <rect x="120" y="150" width="168" height="65" rx="6" fill={p.glow} opacity="0.06" />
      <rect x="135" y="178" width="16" height="28" rx="3" fill={p.glow} opacity="0.5" />
      <rect x="158" y="168" width="16" height="38" rx="3" fill={p.pop} opacity="0.5" />
      <rect x="181" y="183" width="16" height="23" rx="3" fill={p.spark} opacity="0.5" />
      <rect x="204" y="160" width="16" height="46" rx="3" fill={p.flame} opacity="0.5" />
      <rect x="227" y="173" width="16" height="33" rx="3" fill={p.gold} opacity="0.5" />
      <rect x="250" y="165" width="16" height="41" rx="3" fill={p.surge} opacity="0.4" />
      <rect x="120" y="225" width="168" height="40" rx="6" fill={p.pop} opacity="0.06" />
      <rect x="128" y="237" width="100" height="6" rx="3" fill={p.pop} opacity="0.35" />
      <rect x="128" y="249" width="140" height="5" rx="2.5" fill={p.pop} opacity="0.2" />
      <rect x="120" y="275" width="168" height="45" rx="6" fill={p.surge} opacity="0.1" stroke={p.surge} strokeWidth="0.8" />
      <text x="128" y="290" fontSize="8" fontFamily="monospace" fill={p.surge} opacity="0.7">In [2]:</text>
      <rect x="128" y="296" width="90" height="5" rx="2.5" fill={p.surge} opacity="0.4" />
      <rect x="128" y="305" width="70" height="5" rx="2.5" fill={p.spark} opacity="0.3" />
      <circle cx="330" cy="80" r="22" fill={p.pop} opacity="0.08" />
      <circle cx="330" cy="80" r="8" fill={p.pop} opacity="0.5" />
      <circle cx="330" cy="80" r="4" fill={p.pop} opacity="0.8" />
      <path d="M340 130 L355 140 L340 150 Z" fill={p.glow} opacity="0.35" />
      <path d="M345 160 L358 168 L345 176 Z" fill={p.spark} opacity="0.25" />
      <path d="M330 100 Q 350 120 340 130" stroke={p.pop} strokeWidth="1" opacity="0.2" fill="none" />
      <circle cx="355" cy="200" r="4" fill={p.flame} opacity="0.3" />
      <circle cx="365" cy="225" r="3" fill={p.glow} opacity="0.25" />
      <circle cx="350" cy="250" r="5" fill={p.gold} opacity="0.3" />
      <circle cx="70" cy="310" r="4" fill={p.pop} opacity="0.25" />
      <circle cx="60" cy="330" r="3" fill={p.spark} opacity="0.3" />
    </svg>
  );
}

export default SvgNotebookArtifact;
