/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgPixel1({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const id = useId().replace(/:/g, '');

  const columns = 55;
  const rows = 28;
  const cell = 14;
  const gap = 4;
  const startX = 10;
  const baseY = 742;

  const hash01 = (col: number, row: number, seed: number) => {
    const value = (col * 928_371 + row * 364_479 + seed * 61_187) % 1000;
    return value / 1000;
  };

  const squares: Array<{ key: string; x: number; y: number; opacity: number }> = [];

  for (let col = 0; col < columns; col += 1) {
    const x = startX + col * (cell + gap);
    const t = col / (columns - 1);
    const waveA = Math.sin(t * Math.PI * 8) * 0.05;
    const waveB = Math.sin(t * Math.PI * 3 + 0.9) * 0.035;
    const waveC = Math.sin(t * Math.PI * 15 + 0.3) * 0.018;
    const bandTop = Math.max(0.2, Math.min(0.72, 0.24 + 0.38 * t + waveA + waveB + waveC));

    for (let row = 0; row < rows; row += 1) {
      const rel = row / (rows - 1);
      const baseNoise = hash01(col, row, 1);
      const rareNoise = hash01(col, row, 7);
      const rowNoise = hash01(col, row, 19);
      const colNoise = hash01(col, 0, 23);

      let fillProbability = 0;
      if (row === 0) {
        fillProbability = 0.995;
      } else if (row === 1) {
        fillProbability = 0.975;
      } else if (row === 2) {
        fillProbability = 0.95;
      } else if (row === 3) {
        fillProbability = 0.86 + colNoise * 0.09;
      } else if (row === 4) {
        fillProbability = 0.7 + rowNoise * 0.18;
      } else if (row === 5) {
        fillProbability = 0.56 + rowNoise * 0.16;
      } else if (rel <= bandTop) {
        const ratio = (bandTop - rel) / Math.max(0.01, bandTop);
        fillProbability = 0.16 + ratio * 0.57;
      } else if (rel <= bandTop + 0.22) {
        fillProbability = 0.02 + t * 0.055;
      }

      // Add mild per-cell variance so lower rows do not form visible straight bands.
      if (row >= 3 && row <= 6) {
        fillProbability += (rowNoise - 0.5) * 0.08;
      }

      // Small one-cell holes in foundation rows to avoid a perfectly solid edge.
      if (row <= 1 && hash01(col, row, 11) < 0.055) {
        fillProbability = 0;
      }

      // Sparse high outliers; stronger toward the right side.
      if (rel > bandTop && rel <= bandTop + 0.34 && rareNoise < 0.016 + t * 0.07) {
        fillProbability = Math.max(fillProbability, 0.58);
      }

      if (baseNoise > fillProbability) {
        continue;
      }

      const y = baseY - row * (cell + gap);
      const opacity = 0.54 + Math.min(0.34, row * 0.025 + t * 0.05);
      squares.push({ key: `sq1-${col}-${row}`, x, y, opacity });
    }
  }

  const animatedRanks = new Map(
    [...squares]
      .sort((a, b) => a.y - b.y || a.x - b.x)
      .slice(0, 20)
      .map((square, rank) => [square.key, rank]),
  );

  return (
    <svg
      viewBox="0 0 1024 768"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pixel square wave illustration"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <LightBoostFilter />
        <style>{`
          @keyframes sq1-fall-${id} {
            0% {
              transform: translateY(-800px);
              animation-timing-function: cubic-bezier(0.32, 0, 0.78, 0.48);
            }
            78% {
              transform: translateY(0);
              animation-timing-function: ease-out;
            }
            85% { transform: translateY(-8px); }
            92%, 100% { transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .sq1-falling-${id} { animation: none !important; }
          }
        `}</style>
        <linearGradient id={`sq1-bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>
        <linearGradient id={`sq1-px-${id}`} x1="0" y1="0" x2="1024" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={p.flame} />
          <stop offset="35%" stopColor={p.surge} />
          <stop offset="62%" stopColor={p.pop} />
          <stop offset="82%" stopColor={p.glow} />
          <stop offset="100%" stopColor={p.spark} />
        </linearGradient>
      </defs>

      <rect width="1024" height="768" fill={`url(#sq1-bg-${id})`} />

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        {squares.map((square) => {
          const rank = animatedRanks.get(square.key);
          return (
            <rect
              key={square.key}
              className={rank === undefined ? undefined : `sq1-falling-${id}`}
              x={square.x}
              y={square.y}
              width={cell}
              height={cell}
              fill={`url(#sq1-px-${id})`}
              opacity={square.opacity}
              style={
                rank === undefined
                  ? undefined
                  : {
                      animation: `sq1-fall-${id} ${(3.2 + (rank % 5) * 0.12).toFixed(2)}s linear ${(rank * 0.07).toFixed(2)}s both`,
                    }
              }
            />
          );
        })}
      </g>
    </svg>
  );
}

export default SvgPixel1;
