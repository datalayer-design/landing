/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG background for the library section of the home page.
 *
 * The motif is the word the library uses for a star: an **orbit**. Artifacts
 * sit on concentric paths around a bright centre, the way published work
 * gathers people around it, with a faint constellation grid behind them and a
 * slow drift so the field is alive without asking to be watched.
 *
 * Every colour comes from the palette, so the drawing holds in light and dark
 * and under every theme variant rather than being a picture of one of them.
 *
 * A 1400 × 520 viewBox, sliced: the section is wider than it is tall on a
 * desktop and taller than it is wide on a phone, and the centre must survive
 * both.
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

export function SvgLibraryHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const id = useId().replace(/:/g, '');

  /** The orbits, from the innermost out: radius, how long a turn takes. */
  const orbits = [
    { rx: 170, ry: 92, duration: 48, opacity: 0.34 },
    { rx: 280, ry: 150, duration: 72, opacity: 0.26 },
    { rx: 400, ry: 214, duration: 104, opacity: 0.18 },
    { rx: 540, ry: 288, duration: 148, opacity: 0.12 },
  ];

  /** What travels on them: an artifact, drawn as a mark of light. */
  const travellers = [
    { orbit: 0, angle: 20, r: 7, color: p.pop },
    { orbit: 0, angle: 200, r: 5, color: p.glow },
    { orbit: 1, angle: 96, r: 8, color: p.glow },
    { orbit: 1, angle: 268, r: 5.5, color: p.accent },
    { orbit: 2, angle: 42, r: 6.5, color: p.pop },
    { orbit: 2, angle: 168, r: 5, color: p.glow },
    { orbit: 2, angle: 312, r: 7, color: p.accent },
    { orbit: 3, angle: 128, r: 5.5, color: p.glow },
    { orbit: 3, angle: 300, r: 6, color: p.pop },
  ];

  return (
    <svg
      viewBox="0 0 1400 520"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <radialGradient id={`lib-core-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.55" />
          <stop offset="45%" stopColor={p.pop} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`lib-field-${id}`} cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor={p.bg} stopOpacity="0" />
          <stop offset="78%" stopColor={p.bg} stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.bg} stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id={`lib-orbit-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.05" />
          <stop offset="50%" stopColor={p.pop} stopOpacity="0.8" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <rect width="1400" height="520" fill={p.bg} />

      {/* The constellation grid: faint, and never the thing being looked at. */}
      <g opacity="0.10" stroke={p.secondary} strokeWidth="1">
        {Array.from({ length: 13 }, (_, column) => (
          <line key={`v${column}`} x1={column * 116} y1="0" x2={column * 116} y2="520" />
        ))}
        {Array.from({ length: 6 }, (_, row) => (
          <line key={`h${row}`} x1="0" y1={row * 104} x2="1400" y2={row * 104} />
        ))}
      </g>

      <ellipse cx="700" cy="260" rx="620" ry="330" fill={`url(#lib-core-${id})`} />

      <g transform="translate(700 260)">
        {orbits.map((orbit, index) => (
          <g key={`orbit-${index}`}>
            <ellipse
              rx={orbit.rx}
              ry={orbit.ry}
              fill="none"
              stroke={`url(#lib-orbit-${id})`}
              strokeWidth={index === 0 ? 1.6 : 1.1}
              opacity={orbit.opacity}
            />
            {/*
              The turn is on the group rather than on each mark, so every
              artifact of one orbit keeps its place relative to the others —
              a system rather than nine independent dots.
            */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur={`${orbit.duration}s`}
                repeatCount="indefinite"
              />
              {travellers
                .filter(traveller => traveller.orbit === index)
                .map((traveller, position) => {
                  const radians = (traveller.angle * Math.PI) / 180;
                  return (
                    <circle
                      key={`traveller-${index}-${position}`}
                      cx={Math.cos(radians) * orbit.rx}
                      cy={Math.sin(radians) * orbit.ry}
                      r={traveller.r}
                      fill={traveller.color}
                      opacity="0.85"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.85;0.45;0.85"
                        dur={`${6 + position * 1.7}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                })}
            </g>
          </g>
        ))}

        {/* The centre: what everything here is published into. */}
        <circle r="26" fill={p.bg} stroke={p.pop} strokeWidth="1.5" opacity="0.9" />
        <circle r="12" fill={p.glow} opacity="0.9">
          <animate attributeName="r" values="12;15;12" dur="7s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* The wash that lets words sit on top of all this and still be read. */}
      <rect width="1400" height="520" fill={`url(#lib-field-${id})`} />
    </svg>
  );
}

export default SvgLibraryHero;
