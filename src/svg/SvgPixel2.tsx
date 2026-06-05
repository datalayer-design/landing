/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgPixel2({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const id = useId().replace(/:/g, '');

  const columns = 12;
  const rows = 8;
  const cell = 17;
  const gap = 5;
  const startX = 0;
  const baseY = 163;
  const skylineProfile = [1, 2, 2, 3, 3, 4, 4, 5, 4, 5, 6, 7];
  const detachedSquares = [
    { x: 188, y: 100, o: 0.72, s: 0.68 },
    { x: 246, y: 68, o: 0.76, s: 0.68 },
    { x: 288, y: 32, o: 0.62, s: 0.74 },
  ];

  const isFoundationHole = (col: number, row: number) => {
    if (row > 1) {
      return false;
    }
    const holes = new Set([
      '1-0', '3-1', '4-0', '6-1', '8-0', '10-1',
    ]);
    return holes.has(`${col}-${row}`);
  };

  const isRandomGap = (col: number, row: number) => {
    if (row < 2) {
      return false;
    }
    return ((col * 11 + row * 7) % 17) === 0;
  };

  const squares: JSX.Element[] = [];
  const occupiedRects: Array<{ x: number; y: number; w: number; h: number }> = [];

  for (let col = 0; col < columns; col += 1) {
    const x = startX + col * (cell + gap);
    const stackHeight = Math.max(1, Math.min(rows, skylineProfile[col] ?? 1));

    for (let row = 0; row < stackHeight; row += 1) {
      if (isFoundationHole(col, row) || isRandomGap(col, row)) {
        continue;
      }
      const y = baseY - row * (cell + gap);
      const opacity = 0.55 + Math.min(0.35, row * 0.06);
      squares.push(
        <rect
          key={`sq2-${col}-${row}`}
          x={x}
          y={y}
          width={cell}
          height={cell}
          fill={`url(#sq2-px-${id})`}
          opacity={opacity}
        />,
      );
      occupiedRects.push({ x, y, w: cell, h: cell });
    }
  }

  const overlaps = (
    a: { x: number; y: number; w: number; h: number },
    b: { x: number; y: number; w: number; h: number },
  ) => {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  };

  const detachedRects = detachedSquares
    .map((sq) => {
      return {
        ...sq,
        w: cell * sq.s,
        h: cell * sq.s,
      };
    })
    .filter((candidate) => {
      return !occupiedRects.some((occupied) => overlaps(candidate, occupied));
    });

  return (
    <svg
      viewBox="0 0 320 180"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pixel square closeup illustration"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <LightBoostFilter />
        <linearGradient id={`sq2-bg-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>
        <linearGradient id={`sq2-px-${id}`} x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={p.flame} />
          <stop offset="32%" stopColor={p.surge} />
          <stop offset="58%" stopColor={p.pop} />
          <stop offset="80%" stopColor={p.glow} />
          <stop offset="100%" stopColor={p.spark} />
        </linearGradient>
        <radialGradient id={`sq2-mist-${id}`} cx="75%" cy="94%" r="45%">
          <stop offset="0%" stopColor={p.pop} stopOpacity={p.isLight ? 0.16 : 0.26} />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="180" fill={`url(#sq2-bg-${id})`} />

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        <rect x="132" y="122" width="188" height="58" fill={`url(#sq2-mist-${id})`} />

        {squares}
        {detachedRects.map((sq, index) => (
          <rect
            key={`sq2-detached-${index}`}
            x={sq.x}
            y={sq.y}
            width={sq.w}
            height={sq.h}
            fill={`url(#sq2-px-${id})`}
            opacity={sq.o}
          />
        ))}
      </g>
    </svg>
  );
}

export default SvgPixel2;