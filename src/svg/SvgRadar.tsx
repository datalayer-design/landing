/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

type SvgRadarProps = {
  width?: number | string;
  height?: number | string;
  palette?: ColorPalette;
};

const SWEEP_PERIOD_S = 6;
const BLIP_COUNT = 6;
// Angles in degrees measured clockwise from 12 o'clock (top).
const BLIPS: Array<{ angle: number; radius: number }> = [
  { angle: 35, radius: 200 },
  { angle: 95, radius: 300 },
  { angle: 145, radius: 235 },
  { angle: 205, radius: 280 },
  { angle: 265, radius: 195 },
  { angle: 320, radius: 270 },
];

function polarToCartesian(cx: number, cy: number, angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function MiniLines({
  cx,
  cy,
  width,
  begin,
  glow,
  pop,
  spark,
}: {
  cx: number;
  cy: number;
  width: number;
  begin: number;
  glow: string;
  pop: string;
  spark: string;
}) {
  const half = width / 2;
  const lineHeight = 4;
  const gap = 6;
  const opacityValues = '0;0.95;0.7;0.45;0.18;0';
  const opacityKeyTimes = '0;0.05;0.18;0.35;0.6;1';
  return (
    <g transform={`translate(${cx - half} ${cy - (lineHeight * 3 + gap * 2) / 2})`}>
      {/* Smallest at the top, widest at the bottom. */}
      <rect x={(width - width * 0.65) / 2} width={width * 0.65} height={lineHeight} rx={lineHeight / 2} fill={spark} opacity="0">
        <animate
          attributeName="opacity"
          values={opacityValues}
          keyTimes={opacityKeyTimes}
          dur={`${SWEEP_PERIOD_S}s`}
          begin={`${begin}s`}
          repeatCount="indefinite"
        />
      </rect>
      <rect y={lineHeight + gap} x={(width - width * 0.85) / 2} width={width * 0.85} height={lineHeight} rx={lineHeight / 2} fill={pop} opacity="0">
        <animate
          attributeName="opacity"
          values={opacityValues}
          keyTimes={opacityKeyTimes}
          dur={`${SWEEP_PERIOD_S}s`}
          begin={`${begin}s`}
          repeatCount="indefinite"
        />
      </rect>
      <rect y={(lineHeight + gap) * 2} width={width} height={lineHeight} rx={lineHeight / 2} fill={glow} opacity="0">
        <animate
          attributeName="opacity"
          values={opacityValues}
          keyTimes={opacityKeyTimes}
          dur={`${SWEEP_PERIOD_S}s`}
          begin={`${begin}s`}
          repeatCount="indefinite"
        />
      </rect>
    </g>
  );
}

export function SvgRadar({ width = '100%', height = 'auto', palette: paletteProp }: SvgRadarProps = {}) {
  const id = useId().replace(/:/g, '');
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  // Theme-responsive palette: derive every color from the active palette so
  // the radar adapts to brand colors and the user's light/dark color mode.
  const bg = p.bg;
  const frame = p.secondary;
  const grid = p.secondary;
  const gridStrong = p.primary;
  const sweep = p.primary;
  const sweepSoft = p.glow ?? p.primary;
  const labelColor = p.primary;
  const ctaText = p.primary;
  const titleColor = p.primary;
  const subtitleColor = p.primary;

  // Per-blip color trios drawn from the wider palette so each detected target
  // pulses in a distinct hue while still sitting inside the brand.
  const fallback = p.primary;
  const blipPalettes: Array<{ glow: string; pop: string; spark: string }> = [
    { glow: p.primary, pop: p.glow ?? fallback, spark: p.spark ?? fallback },
    { glow: p.spark ?? fallback, pop: p.flame ?? fallback, spark: p.gold ?? fallback },
    { glow: p.glow ?? fallback, pop: p.surge ?? fallback, spark: p.pop ?? fallback },
    { glow: p.pop ?? fallback, pop: p.primary, spark: p.spark ?? fallback },
    { glow: p.flame ?? fallback, pop: p.gold ?? fallback, spark: p.glow ?? fallback },
    { glow: p.surge ?? fallback, pop: p.primary, spark: p.spark ?? fallback },
  ];

  const cx = 400;
  const cy = 400;
  const r = 350;

  // Wedge geometry: leading edge at angle 0 (12 o'clock), trail extending
  // counter-clockwise to angle -60. Rotating the wedge clockwise (0 -> 360)
  // makes the leading edge sweep forward and the trail lag behind, like a
  // real radar.
  const leadAngle = 0;
  const trailAngle = -60;
  const lead = polarToCartesian(cx, cy, leadAngle, r);
  const trail = polarToCartesian(cx, cy, trailAngle, r);
  const sweepWedgePath = `M ${cx} ${cy} L ${lead.x} ${lead.y} A ${r} ${r} 0 0 0 ${trail.x} ${trail.y} Z`;

  return (
    <svg
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height, maxWidth: '100%', display: 'block', background: bg }}
      aria-label="Radar"
    >
      <defs>
        {/* User-space gradient so it aligns with the wedge: bright at leading
            tip (top), fading to transparent at the trailing tip. */}
        <linearGradient
          id={`radar-sweep-${id}`}
          gradientUnits="userSpaceOnUse"
          x1={lead.x}
          y1={lead.y}
          x2={trail.x}
          y2={trail.y}
        >
          <stop offset="0%" stopColor={sweep} stopOpacity="0.85" />
          <stop offset="40%" stopColor={sweepSoft} stopOpacity="0.35" />
          <stop offset="100%" stopColor={sweep} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`radar-glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={sweep} stopOpacity="0.06" />
          <stop offset="60%" stopColor={sweep} stopOpacity="0.02" />
          <stop offset="100%" stopColor={sweep} stopOpacity="0" />
        </radialGradient>
        <filter id={`radar-blur-${id}`}>
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        <filter id={`radar-soft-glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer frame */}
      <rect x="0" y="0" width="800" height="800" fill={bg} />
      <circle cx={cx} cy={cy} r={r + 15} fill="none" stroke={frame} strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r} fill={`url(#radar-glow-${id})`} />

      {/* Concentric range rings */}
      {[80, 160, 240, 320].map((rr) => (
        <circle key={rr} cx={cx} cy={cy} r={rr} fill="none" stroke={grid} strokeWidth="1" opacity="0.35" />
      ))}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={gridStrong} strokeWidth="1.2" opacity="0.7" />

      {/* Crosshairs */}
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={grid} strokeWidth="1" opacity="0.4" />
      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={grid} strokeWidth="1" opacity="0.4" />

      {/* Tick marks at 30deg intervals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = i * 30;
        const inner = polarToCartesian(cx, cy, a, r - 14);
        const outer = polarToCartesian(cx, cy, a, r);
        return (
          <line
            key={a}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke={gridStrong}
            strokeWidth={a % 90 === 0 ? 2 : 1}
            opacity={a % 90 === 0 ? 0.9 : 0.55}
          />
        );
      })}

      {/* Cardinal labels */}
      <g fill={labelColor} fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" fontSize="14" opacity="0.85">
        <text x={cx} y={cy - r - 22} textAnchor="middle">000</text>
        <text x={cx + r + 22} y={cy + 5} textAnchor="start">090</text>
        <text x={cx} y={cy + r + 32} textAnchor="middle">180</text>
        <text x={cx - r - 22} y={cy + 5} textAnchor="end">270</text>
      </g>

      {/* Blips: pulse when sweep crosses them, each with its own hue trio. */}
      {BLIPS.slice(0, BLIP_COUNT).map((b, idx) => {
        const pos = polarToCartesian(cx, cy, b.angle, b.radius);
        const begin = (b.angle / 360) * SWEEP_PERIOD_S;
        const colors = blipPalettes[idx % blipPalettes.length];
        return (
          <MiniLines
            key={idx}
            cx={pos.x}
            cy={pos.y}
            width={70}
            begin={begin}
            glow={colors.glow}
            pop={colors.pop}
            spark={colors.spark}
          />
        );
      })}

      {/* Rotating sweep wedge — leading edge is bright, trail fades out. */}
      <g>
        <g filter={`url(#radar-blur-${id})`}>
          <path d={sweepWedgePath} fill={`url(#radar-sweep-${id})`}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${cx} ${cy}`}
              to={`360 ${cx} ${cy}`}
              dur={`${SWEEP_PERIOD_S}s`}
              repeatCount="indefinite"
            />
          </path>
        </g>
        {/* Bright leading edge line at angle 0 (top), rotating with the wedge. */}
        <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke={sweep} strokeWidth="2" strokeOpacity="0.9">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`360 ${cx} ${cy}`}
            dur={`${SWEEP_PERIOD_S}s`}
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Center pulse */}
      <circle cx={cx} cy={cy} r="4" fill={sweep} opacity="0.9" />
      <circle cx={cx} cy={cy} r="10" fill="none" stroke={sweep} strokeWidth="1" opacity="0.4">
        <animate attributeName="r" values="6;28;6" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Center copy */}
      <g filter={`url(#radar-soft-glow-${id})`}>
        <text
          x={cx}
          y={cy - 30}
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="800"
          fontSize="120"
          fill={titleColor}
          letterSpacing="6"
        >
          DATA
        </text>
      </g>

      {/* Subtitle on two lines, fading in one after the other. */}
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize="18"
        fill={subtitleColor}
        opacity="0"
      >
        Efficient AI to discover
        <animate
          attributeName="opacity"
          values="0;0;0.95;0.95;0"
          keyTimes="0;0.05;0.2;0.85;1"
          dur={`${SWEEP_PERIOD_S}s`}
          begin="0s"
          repeatCount="indefinite"
        />
      </text>
      <text
        x={cx}
        y={cy + 46}
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize="18"
        fill={subtitleColor}
        opacity="0"
      >
        and analyse your datasets
        <animate
          attributeName="opacity"
          values="0;0;0.95;0.95;0"
          keyTimes="0;0.18;0.33;0.85;1"
          dur={`${SWEEP_PERIOD_S}s`}
          begin="0s"
          repeatCount="indefinite"
        />
      </text>

      {/* CTA button — entire rect is hit-testable. Hover shifts the button a
          touch down-left and fills the background to feel selected; we
          suppress the default <a> underline. */}
      <style>{`
        .radar-cta-${id} { text-decoration: none; }
        .radar-cta-${id} text { text-decoration: none; }
        .radar-cta-${id} .radar-cta-group-${id} { transition: transform 120ms ease-out; }
        .radar-cta-${id} .radar-cta-bg-${id} { transition: fill-opacity 120ms ease-out; }
        .radar-cta-${id}:hover .radar-cta-group-${id},
        .radar-cta-${id}:focus-visible .radar-cta-group-${id} { transform: translate(-2px, 2px); }
        .radar-cta-${id}:hover .radar-cta-bg-${id},
        .radar-cta-${id}:focus-visible .radar-cta-bg-${id} { fill-opacity: 0.18; }
      `}</style>
      <a
        href="https://datalayer.ai"
        target="_blank"
        rel="noopener noreferrer"
        className={`radar-cta-${id}`}
      >
        <g
          className={`radar-cta-group-${id}`}
          style={{ cursor: 'pointer' }}
          pointerEvents="bounding-box"
        >
          <rect
            className={`radar-cta-bg-${id}`}
            x={cx - 95}
            y={cy + 70}
            width="190"
            height="44"
            rx="2"
            fill={sweep}
            fillOpacity="0.001"
            stroke={sweep}
            strokeWidth="1.5"
          />
          <text
            x={cx}
            y={cy + 98}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
            fontSize="14"
            letterSpacing="2"
            fill={ctaText}
            pointerEvents="none"
            style={{ textDecoration: 'none' }}
          >
            TRY IT NOW _
          </text>
        </g>
      </a>

      {/* Top tag line */}
      <text
        x={cx}
        y={140}
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize="14"
        fill={labelColor}
        opacity="0.75"
        letterSpacing="2"
      >
        ⌐ DATA RADAR ¬
      </text>
    </svg>
  );
}

export default SvgRadar;
