/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

type SvgAssignmentArtifactProps = {
  palette?: ColorPalette;
  width?: number | string;
  height?: number | string;
};

export function SvgAssignmentArtifact({
  palette: paletteProp,
  width = '100%',
  height = 'auto',
}: SvgAssignmentArtifactProps = {}) {
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
        <radialGradient id={`assignment-bg-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill={`url(#assignment-bg-${id})`} />
      <rect x="80" y="65" width="240" height="270" rx="18" fill={p.surge} opacity="0.1" />
      <rect x="100" y="88" width="200" height="34" rx="10" fill={p.pop} opacity="0.3" />
      <rect x="112" y="101" width="120" height="8" rx="4" fill={p.glow} opacity="0.52" />
      <rect x="100" y="140" width="200" height="52" rx="10" fill={p.spark} opacity="0.14" />
      <rect x="114" y="154" width="100" height="8" rx="4" fill={p.gold} opacity="0.44" />
      <rect x="114" y="170" width="76" height="8" rx="4" fill={p.surge} opacity="0.34" />
      <rect x="100" y="206" width="200" height="52" rx="10" fill={p.glow} opacity="0.12" />
      <rect x="114" y="220" width="110" height="8" rx="4" fill={p.flame} opacity="0.44" />
      <rect x="114" y="236" width="88" height="8" rx="4" fill={p.pop} opacity="0.34" />
      <rect x="100" y="272" width="200" height="42" rx="10" fill={p.surge} opacity="0.16" />
      <rect x="114" y="286" width="96" height="8" rx="4" fill={p.spark} opacity="0.44" />
    </svg>
  );
}

export default SvgAssignmentArtifact;
