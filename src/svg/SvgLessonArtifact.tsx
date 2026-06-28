/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

type SvgLessonArtifactProps = {
  palette?: ColorPalette;
  width?: number | string;
  height?: number | string;
};

export function SvgLessonArtifact({
  palette: paletteProp,
  width = '100%',
  height = 'auto',
}: SvgLessonArtifactProps = {}) {
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
        <radialGradient id={`lesson-bg-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill={`url(#lesson-bg-${id})`} />
      <rect x="90" y="70" width="220" height="260" rx="16" fill={p.glow} opacity="0.12" />
      <rect x="110" y="95" width="180" height="26" rx="8" fill={p.pop} opacity="0.32" />
      <rect x="110" y="135" width="150" height="10" rx="5" fill={p.surge} opacity="0.5" />
      <rect x="110" y="153" width="130" height="10" rx="5" fill={p.spark} opacity="0.38" />
      <rect x="110" y="180" width="180" height="60" rx="10" fill={p.pop} opacity="0.14" />
      <rect x="120" y="192" width="120" height="8" rx="4" fill={p.glow} opacity="0.48" />
      <rect x="120" y="208" width="90" height="8" rx="4" fill={p.spark} opacity="0.36" />
      <rect x="120" y="242" width="180" height="60" rx="10" fill={p.surge} opacity="0.14" />
      <rect x="132" y="255" width="100" height="8" rx="4" fill={p.surge} opacity="0.48" />
      <rect x="132" y="271" width="75" height="8" rx="4" fill={p.gold} opacity="0.36" />
    </svg>
  );
}

export default SvgLessonArtifact;
