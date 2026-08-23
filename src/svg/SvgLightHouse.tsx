/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Animated lighthouse.
 *
 * The tower is the `LighthouseAlexandriaIcon` geometry (72×72 icon units:
 * roof cone, lantern room, gallery, platform, tapered shaft, sea line) kept
 * verbatim and dropped into an 800×400 scene through one scale transform, so
 * the silhouette stays the icon's.
 *
 * The light TURNS. Two beams 180° apart rotate around the lamp inside a group
 * squashed vertically — the honest projection of a horizontal sweep seen from
 * just above the beam plane. So the beams run flat across the water when they
 * face left and right, foreshorten to a stub as they swing toward and away
 * from the reader, and the lamp flares each time a beam comes round to face
 * them.
 *
 * Everything moving is a transform or an opacity, which is what the gallery's
 * GIF export can bake per frame — animated gradient stops or radii would
 * snap back to their t=0 value in the exported frames.
 *
 * Uses the shared ColorPalette theming system. ViewBox: 800×400.
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

const WIDTH = 800;
const HEIGHT = 400;

/* Where the icon's 72-unit world lands in the scene. */
const SCALE = 4.6;
const SEA_Y = 330;
const ICON_SEA_Y = 62.528;
const ICON_LAMP_X = 36;
/* Middle of the lantern room (icon rect y 14.029 → 20.232). */
const ICON_LAMP_Y = 17.131;
const TX = WIDTH / 2 - ICON_LAMP_X * SCALE;
const TY = SEA_Y - ICON_SEA_Y * SCALE;
const LAMP_X = WIDTH / 2;
const LAMP_Y = TY + ICON_LAMP_Y * SCALE;

/* One full turn of the lamp. */
const TURN_S = 8;
/* Beams reach past the edge of the frame. */
const BEAM_LENGTH = 470;
/* Half-spread of a beam, before the squash. */
const BEAM_HALF_WIDTH = 96;
/*
 * How flat the sweep reads. 1 would be a searchlight spinning in the picture
 * plane; this is the beam plane tipped almost edge-on to the reader.
 */
const BEAM_SQUASH = 0.26;

/* A cone with its apex on the lamp, opening to the right. */
const BEAM_PATH = `M 0 0 L ${BEAM_LENGTH} ${-BEAM_HALF_WIDTH} L ${BEAM_LENGTH} ${BEAM_HALF_WIDTH} Z`;

/* Sky flecks, kept off the tower and out of the beam's flat lane. */
const STARS: Array<{ x: number; y: number; r: number; begin: number }> = [
  { x: 78, y: 52, r: 1.6, begin: 0 },
  { x: 168, y: 96, r: 1.1, begin: 1.4 },
  { x: 246, y: 40, r: 1.4, begin: 2.6 },
  { x: 330, y: 74, r: 1, begin: 0.7 },
  { x: 486, y: 46, r: 1.5, begin: 3.1 },
  { x: 566, y: 88, r: 1.1, begin: 1.9 },
  { x: 654, y: 38, r: 1.3, begin: 0.4 },
  { x: 722, y: 106, r: 1.6, begin: 2.2 },
];

export function SvgLightHouse({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const id = useId().replace(/:/g, '');

  /* The lamp reads warm against the brand green in both modes. */
  const lampCore = p.isLight ? p.gold : p.spark;
  const beamColor = p.isLight ? p.blaze : p.gold;
  const towerBody = p.bgPanel;
  const towerShade = p.bgAlt;
  const towerLine = p.isLight ? p.secondary : p.primary;
  const water = p.primary;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Lighthouse sweeping its beam across the water"
    >
      <defs>
        <linearGradient id={`lh-sky-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>

        <linearGradient id={`lh-sea-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={water} stopOpacity={p.isLight ? '0.26' : '0.20'} />
          <stop offset="100%" stopColor={water} stopOpacity={p.isLight ? '0.08' : '0.06'} />
        </linearGradient>

        {/* Bright at the lamp, gone before the beam leaves the frame. */}
        <linearGradient id={`lh-beam-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={beamColor} stopOpacity="0.92" />
          <stop offset="45%" stopColor={beamColor} stopOpacity="0.44" />
          <stop offset="100%" stopColor={beamColor} stopOpacity="0" />
        </linearGradient>

        <radialGradient id={`lh-halo-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={lampCore} stopOpacity="0.95" />
          <stop offset="45%" stopColor={lampCore} stopOpacity="0.35" />
          <stop offset="100%" stopColor={lampCore} stopOpacity="0" />
        </radialGradient>

        {/* The lamp's spill on the water, straight below it. */}
        <linearGradient id={`lh-wake-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={lampCore} stopOpacity="0.42" />
          <stop offset="100%" stopColor={lampCore} stopOpacity="0" />
        </linearGradient>

        <radialGradient id={`lh-haze-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity={p.isLight ? '0.20' : '0.16'} />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        <pattern id={`lh-dots-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill={p.primary} opacity={p.isLight ? '0.14' : '0.10'} />
        </pattern>

        <filter id={`lh-soft-${id}`} x="-30%" y="-120%" width="160%" height="340%">
          <feGaussianBlur stdDeviation="7" />
        </filter>

        <filter id={`lh-glow-${id}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* ── Sky ──────────────────────────────────────────────── */}
      <rect width={WIDTH} height={HEIGHT} fill={`url(#lh-sky-${id})`} />
      <rect width={WIDTH} height={SEA_Y} fill={`url(#lh-dots-${id})`} />

      {/* Haze on the horizon, so the tower has something to stand against. */}
      <ellipse cx={WIDTH / 2} cy={SEA_Y} rx={WIDTH * 0.42} ry="52" fill={`url(#lh-haze-${id})`} />

      {STARS.map((star) => (
        <circle key={`${star.x}-${star.y}`} cx={star.x} cy={star.y} r={star.r} fill={p.textMuted} opacity="0.5">
          <animate
            attributeName="opacity"
            values="0.15;0.65;0.15"
            dur="4s"
            begin={`${star.begin}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* ── The turning beam ─────────────────────────────────── */}
      <g transform={`translate(${LAMP_X} ${LAMP_Y}) scale(1 ${BEAM_SQUASH})`}>
        {/*
          Full at the two horizontal quarters of the turn, almost out as the
          beams point at and away from the reader — the sweep's own fade,
          which is what keeps the foreshortened stub from reading as a
          searchlight aimed at the sky.
        */}
        <g opacity="0.95">
          <animate
            attributeName="opacity"
            values="0.95;0.14;0.03;0.14;0.95"
            keyTimes="0;0.34;0.5;0.66;1"
            dur={`${TURN_S / 2}s`}
            repeatCount="indefinite"
          />
          <g filter={`url(#lh-soft-${id})`}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur={`${TURN_S}s`}
              repeatCount="indefinite"
            />
            <path d={BEAM_PATH} fill={`url(#lh-beam-${id})`} />
            <path d={BEAM_PATH} fill={`url(#lh-beam-${id})`} transform="rotate(180)" />
          </g>
        </g>
      </g>

      {/* ── Lighthouse — LighthouseAlexandriaIcon geometry ───── */}
      <g transform={`translate(${TX} ${TY}) scale(${SCALE})`} strokeLinecap="round" strokeLinejoin="round">
        {/* Shaft */}
        <polygon
          points="45.949 62.528 42.395 36.204 36 36.204 29.605 36.204 26.051 62.528 36 62.528 45.949 62.528"
          fill={towerBody}
          stroke={towerLine}
          strokeWidth="0.55"
        />
        {/* Doorway */}
        <path
          d="M39.9355,40.08a1,1,0,0,0-.9931-.8828H33.0576a1,1,0,0,0-.9931.8828L29.4233,62.41a1,1,0,0,0,.9932,1.1171H41.583a1.0009,1.0009,0,0,0,.9932-1.1171Z"
          fill={towerShade}
          opacity="0.9"
        />
        <polyline
          points="41.224 59.486 38.942 40.197 33.058 40.197 30.776 59.486"
          fill="none"
          stroke={towerLine}
          strokeWidth="0.45"
          opacity="0.75"
        />
        {/* Gallery platform and its braces */}
        <rect x="27.9402" y="32.6514" width="16.1197" height="3.5527" fill={towerBody} stroke={towerLine} strokeWidth="0.55" />
        <line x1="27.9402" x2="27.0351" y1="32.6514" y2="31.0403" stroke={towerLine} strokeWidth="0.45" />
        <line x1="44.0598" x2="44.9649" y1="32.6514" y2="31.0403" stroke={towerLine} strokeWidth="0.45" />
        {/* Gallery */}
        <rect x="31.7709" y="20.2329" width="8.4581" height="12.4186" fill={towerBody} stroke={towerLine} strokeWidth="0.55" />
        <rect x="37.1451" y="20.2329" width="3.0945" height="12.4186" fill={towerShade} opacity="0.85" />
        <line x1="40.2291" x2="31.7709" y1="23.2333" y2="23.2333" stroke={towerLine} strokeWidth="0.45" />
        <line x1="41.1355" x2="30.8645" y1="20.2329" y2="20.2329" stroke={towerLine} strokeWidth="0.55" />
        {/* Lantern room — glazed, so the lamp shows through */}
        <rect x="33.349" y="14.0294" width="5.2692" height="6.2034" fill={lampCore} opacity="0.22" stroke={towerLine} strokeWidth="0.55" />
        {/* Roof and finial */}
        <polygon points="36 10.031 39.269 14.029 32.731 14.029" fill={towerBody} stroke={towerLine} strokeWidth="0.55" />
        <line x1="36" x2="36" y1="7.6143" y2="10.0312" stroke={towerLine} strokeWidth="0.55" />
      </g>

      {/* ── Lamp ─────────────────────────────────────────────── */}
      {/*
        One flare per turn: the quarter where a beam comes round to face the
        reader, at three quarters of the cycle.
      */}
      <circle cx={LAMP_X} cy={LAMP_Y} r="46" fill={`url(#lh-halo-${id})`} opacity="0.3">
        <animate
          attributeName="opacity"
          values="0.28;0.28;1;0.28;0.28"
          keyTimes="0;0.66;0.75;0.86;1"
          dur={`${TURN_S}s`}
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={LAMP_X} cy={LAMP_Y} r="6" fill={lampCore} filter={`url(#lh-glow-${id})`} opacity="0.9">
        <animate
          attributeName="opacity"
          values="0.55;0.55;1;0.55;0.55"
          keyTimes="0;0.66;0.75;0.86;1"
          dur={`${TURN_S}s`}
          repeatCount="indefinite"
        />
      </circle>

      {/* ── Sea ──────────────────────────────────────────────── */}
      <rect y={SEA_Y} width={WIDTH} height={HEIGHT - SEA_Y} fill={`url(#lh-sea-${id})`} />
      <line x1="0" x2={WIDTH} y1={SEA_Y} y2={SEA_Y} stroke={water} strokeWidth="1.5" strokeOpacity="0.55" />

      {/* Spill under the lamp, brightening with it. */}
      <rect
        x={LAMP_X - 46}
        y={SEA_Y}
        width="92"
        height={HEIGHT - SEA_Y}
        fill={`url(#lh-wake-${id})`}
        filter={`url(#lh-soft-${id})`}
        opacity="0.3"
      >
        <animate
          attributeName="opacity"
          values="0.25;0.25;0.85;0.25;0.25"
          keyTimes="0;0.66;0.75;0.86;1"
          dur={`${TURN_S}s`}
          repeatCount="indefinite"
        />
      </rect>

      {/* Swell — drifts sideways, one lane per depth. */}
      {[0, 1, 2].map((lane) => {
        const y = SEA_Y + 16 + lane * 18;
        const drift = lane % 2 === 0 ? 26 : -26;
        return (
          <g key={lane} opacity={0.5 - lane * 0.1}>
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0 0; ${drift} 0; 0 0`}
              dur={`${9 + lane * 3}s`}
              repeatCount="indefinite"
            />
            <line
              x1={60 - lane * 30}
              x2={WIDTH - 60 + lane * 30}
              y1={y}
              y2={y}
              stroke={water}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${34 + lane * 12} ${52 + lane * 10}`}
              strokeOpacity="0.6"
            />
          </g>
        );
      })}
    </svg>
  );
}

export default SvgLightHouse;
