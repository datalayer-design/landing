/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

type SvgLinesProps = {
  palette?: ColorPalette;
  inverse?: boolean;
  colored?: boolean;
  width?: number | string;
  height?: number | string;
};

/**
 * Three horizontal gradient lines inspired by lines.svg.
 * - Uses palette named colors
 * - Supports gradient direction inversion
 * - Supports custom width/height sizing
 */
export function SvgLines({
  palette: paletteProp,
  inverse = false,
  colored = false,
  width = '100%',
  height = 44,
}: SvgLinesProps = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const id = useId().replace(/:/g, '');
  const baseLine = p.isLight ? p.secondary : p.textLight;
  const line1 = colored ? p.glow : baseLine;
  const line2 = colored ? p.pop : baseLine;
  const line3 = colored ? p.spark : baseLine;

  // Intentionally inverted: inverse=true now renders the previous non-inverse direction.
  const x1 = inverse ? '0%' : '100%';
  const x2 = inverse ? '100%' : '0%';

  return (
    <svg
      viewBox="0 0 1422 44"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height, display: 'block' }}
      preserveAspectRatio="none"
    >
      <defs>
        <LightBoostFilter />
        <linearGradient id={`lines-grad-1-${id}`} x1={x1} y1="0" x2={x2} y2="0">
          <stop offset="0%" stopColor={line1} stopOpacity="0.85" />
          <stop offset="100%" stopColor={line1} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`lines-grad-2-${id}`} x1={x1} y1="0" x2={x2} y2="0">
          <stop offset="0%" stopColor={line2} stopOpacity="0.8" />
          <stop offset="100%" stopColor={line2} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`lines-grad-3-${id}`} x1={x1} y1="0" x2={x2} y2="0">
          <stop offset="0%" stopColor={line3} stopOpacity="0.75" />
          <stop offset="100%" stopColor={line3} stopOpacity="0" />
        </linearGradient>
      </defs>

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        <rect x="0" y="8" width="1422" height="4" fill={`url(#lines-grad-1-${id})`} />
        <rect x="0" y="20" width="1422" height="4" fill={`url(#lines-grad-2-${id})`} />
        <rect x="0" y="32" width="1422" height="4" fill={`url(#lines-grad-3-${id})`} />
      </g>
    </svg>
  );
}

export default SvgLines;
