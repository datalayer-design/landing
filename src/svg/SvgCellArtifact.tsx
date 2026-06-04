/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

type SvgCellArtifactProps = {
  palette?: ColorPalette;
  width?: number | string;
  height?: number | string;
};

export function SvgCellArtifact({
  palette: paletteProp,
  width = '100%',
  height = 'auto',
}: SvgCellArtifactProps = {}) {
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
        <radialGradient id={`cell-bg-glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`cell-grad-1-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.surge} />
          <stop offset="100%" stopColor={p.spark} />
        </linearGradient>
        <linearGradient id={`cell-grad-2-${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={p.pop} />
          <stop offset="100%" stopColor={p.glow} />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="180" fill={`url(#cell-bg-glow-${id})`} />

      <rect x="95" y="70" width="210" height="250" rx="14" fill={`url(#cell-grad-1-${id})`} opacity="0.12" />
      <rect x="110" y="85" width="180" height="220" rx="10" fill={`url(#cell-grad-2-${id})`} opacity="0.18" stroke={p.glow} strokeWidth="1.2" />

      <rect x="128" y="105" width="145" height="52" rx="8" fill={p.surge} opacity="0.15" stroke={p.surge} strokeWidth="0.8" />
      <text x="136" y="120" fontSize="8" fontFamily="monospace" fill={p.surge} opacity="0.75">Cell 01</text>
      <rect x="136" y="126" width="110" height="5" rx="2.5" fill={p.surge} opacity="0.45" />
      <rect x="136" y="135" width="125" height="5" rx="2.5" fill={p.spark} opacity="0.35" />
      <rect x="136" y="144" width="85" height="5" rx="2.5" fill={p.surge} opacity="0.3" />

      <rect x="128" y="168" width="145" height="52" rx="8" fill={p.pop} opacity="0.12" stroke={p.pop} strokeWidth="0.8" />
      <text x="136" y="183" fontSize="8" fontFamily="monospace" fill={p.pop} opacity="0.75">Cell 02</text>
      <rect x="136" y="189" width="95" height="5" rx="2.5" fill={p.pop} opacity="0.45" />
      <rect x="136" y="198" width="118" height="5" rx="2.5" fill={p.spark} opacity="0.35" />
      <rect x="136" y="207" width="70" height="5" rx="2.5" fill={p.pop} opacity="0.3" />

      <rect x="128" y="231" width="145" height="52" rx="8" fill={p.glow} opacity="0.1" stroke={p.glow} strokeWidth="0.8" />
      <text x="136" y="246" fontSize="8" fontFamily="monospace" fill={p.glow} opacity="0.75">Cell 03</text>
      <rect x="136" y="252" width="120" height="5" rx="2.5" fill={p.glow} opacity="0.45" />
      <rect x="136" y="261" width="100" height="5" rx="2.5" fill={p.spark} opacity="0.35" />
      <rect x="136" y="270" width="82" height="5" rx="2.5" fill={p.glow} opacity="0.3" />

      <circle cx="320" cy="105" r="22" fill={p.pop} opacity="0.1" />
      <path d="M320 90 L323 101 L334 98 L325 105 L333 116 L320 109 L307 116 L315 105 L306 98 L317 101 Z" fill={p.pop} opacity="0.6" />

      <line x1="290" y1="140" x2="325" y2="126" stroke={p.glow} strokeWidth="1" opacity="0.3" />
      <line x1="290" y1="190" x2="334" y2="178" stroke={p.spark} strokeWidth="1" opacity="0.24" />

      <circle cx="342" cy="220" r="4" fill={p.spark} opacity="0.35" />
      <circle cx="355" cy="245" r="3" fill={p.flame} opacity="0.35" />
      <circle cx="74" cy="308" r="4" fill={p.pop} opacity="0.3" />
      <circle cx="88" cy="328" r="3" fill={p.gold} opacity="0.32" />
    </svg>
  );
}

export default SvgCellArtifact;
