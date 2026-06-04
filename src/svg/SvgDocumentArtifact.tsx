/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

type SvgDocumentArtifactProps = {
  palette?: ColorPalette;
  width?: number | string;
  height?: number | string;
};

export function SvgDocumentArtifact({
  palette: paletteProp,
  width = '100%',
  height = 'auto',
}: SvgDocumentArtifactProps = {}) {
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
        <radialGradient id={`doc-bg-glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.15" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`doc-grad-1-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.glow} />
          <stop offset="100%" stopColor={p.pop} />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill={`url(#doc-bg-glow-${id})`} />
      <rect x="110" y="60" width="180" height="230" rx="12" fill={`url(#doc-grad-1-${id})`} opacity="0.15" />
      <rect x="120" y="70" width="160" height="210" rx="10" fill={`url(#doc-grad-1-${id})`} opacity="0.25" stroke={p.glow} strokeWidth="1.5" />
      <rect x="145" y="100" width="110" height="8" rx="4" fill={p.glow} opacity="0.6" />
      <rect x="145" y="118" width="90" height="6" rx="3" fill={p.pop} opacity="0.4" />
      <rect x="145" y="132" width="100" height="6" rx="3" fill={p.pop} opacity="0.4" />
      <rect x="145" y="146" width="70" height="6" rx="3" fill={p.pop} opacity="0.3" />
      <rect x="140" y="168" width="120" height="50" rx="6" fill={p.surge} opacity="0.12" stroke={p.surge} strokeWidth="1" />
      <rect x="150" y="180" width="60" height="5" rx="2.5" fill={p.surge} opacity="0.5" />
      <rect x="150" y="190" width="80" height="5" rx="2.5" fill={p.spark} opacity="0.4" />
      <rect x="150" y="200" width="50" height="5" rx="2.5" fill={p.surge} opacity="0.3" />
      <rect x="140" y="232" width="120" height="35" rx="6" fill={p.glow} opacity="0.08" />
      <rect x="150" y="245" width="12" height="16" rx="2" fill={p.glow} opacity="0.5" />
      <rect x="167" y="240" width="12" height="21" rx="2" fill={p.pop} opacity="0.5" />
      <rect x="184" y="248" width="12" height="13" rx="2" fill={p.spark} opacity="0.5" />
      <rect x="201" y="237" width="12" height="24" rx="2" fill={p.flame} opacity="0.5" />
      <rect x="218" y="243" width="12" height="18" rx="2" fill={p.gold} opacity="0.5" />
      <circle cx="305" cy="95" r="30" fill={p.pop} opacity="0.1" />
      <path d="M305 75 L308 90 L320 87 L310 95 L318 108 L305 100 L292 108 L300 95 L290 87 L302 90 Z" fill={p.pop} opacity="0.6" />
      <line x1="290" y1="145" x2="320" y2="130" stroke={p.glow} strokeWidth="1" opacity="0.3" />
      <line x1="290" y1="165" x2="330" y2="155" stroke={p.pop} strokeWidth="1" opacity="0.25" />
      <circle cx="340" cy="180" r="4" fill={p.spark} opacity="0.4" />
      <circle cx="355" cy="200" r="3" fill={p.glow} opacity="0.3" />
      <circle cx="345" cy="220" r="5" fill={p.flame} opacity="0.3" />
      <circle cx="80" cy="300" r="4" fill={p.pop} opacity="0.3" />
      <circle cx="95" cy="320" r="3" fill={p.gold} opacity="0.4" />
    </svg>
  );
}

export default SvgDocumentArtifact;
