/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

type SvgExerciseArtifactProps = {
  palette?: ColorPalette;
  width?: number | string;
  height?: number | string;
};

export function SvgExerciseArtifact({
  palette: paletteProp,
  width = '100%',
  height = 'auto',
}: SvgExerciseArtifactProps = {}) {
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
        <radialGradient id={`exercise-bg-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill={`url(#exercise-bg-${id})`} />
      <rect x="85" y="70" width="230" height="260" rx="16" fill={p.pop} opacity="0.1" />
      <rect x="105" y="95" width="190" height="40" rx="10" fill={p.surge} opacity="0.28" />
      <rect x="120" y="110" width="90" height="10" rx="5" fill={p.glow} opacity="0.52" />
      <rect x="105" y="150" width="190" height="75" rx="12" fill={p.spark} opacity="0.14" />
      <circle cx="135" cy="187" r="16" fill={p.surge} opacity="0.4" />
      <rect x="160" y="175" width="115" height="10" rx="5" fill={p.gold} opacity="0.46" />
      <rect x="160" y="193" width="95" height="10" rx="5" fill={p.pop} opacity="0.36" />
      <rect x="105" y="240" width="190" height="70" rx="12" fill={p.glow} opacity="0.12" />
      <rect x="120" y="255" width="70" height="40" rx="8" fill={p.flame} opacity="0.34" />
      <rect x="200" y="255" width="80" height="10" rx="5" fill={p.surge} opacity="0.46" />
      <rect x="200" y="273" width="55" height="10" rx="5" fill={p.spark} opacity="0.36" />
    </svg>
  );
}

export default SvgExerciseArtifact;
