/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * CC BY 4.0 License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

/** What the avatar is doing: resting, or working on an answer. */
export type AvatarOrbState = 'idle' | 'thinking';

/**
 * Its colours: `iridescent`, the cyan, pink and lavender of an agent's orb
 * (after CopilotKit's, on its Soar page); `theme`, the theme's own bright
 * colours (spark, blaze, surge), so it follows the theme as the other SVGs do.
 */
export type AvatarOrbTone = 'iridescent' | 'theme';

type SvgAvatarOrbProps = {
  /** Its diameter in pixels (it is drawn in a 100-unit box). @default 32 */
  size?: number;
  /** Idle swirls slowly; thinking swirls faster and sends out a ring. @default 'idle' */
  state?: AvatarOrbState;
  /** @default 'iridescent' */
  tone?: AvatarOrbTone;
  /** The theme's colours; the current theme's when absent. */
  palette?: ColorPalette;
  /** Read by a screen reader; the avatar is decorative when absent. */
  title?: string;
};

const IRIDESCENT = { a: '#1fd0ff', b: '#ff4fae', c: '#c4bdff' };

/*
 * The blobs inside the sphere: each a soft ellipse off the centre, turning
 * about it at its own speed and in its own direction, so the colours flow
 * into one another and never settle into one figure. Durations are idle's;
 * thinking runs them three times faster.
 */
const BLOBS: Array<{ colour: 'a' | 'b' | 'c' | 'white'; cx: number; cy: number; rx: number; ry: number; dur: number; turn: 1 | -1; tilt: number }> = [
  { colour: 'c', cx: 50, cy: 50, rx: 46, ry: 46, dur: 0, turn: 1, tilt: 0 },
  { colour: 'a', cx: 36, cy: 62, rx: 38, ry: 20, dur: 7, turn: 1, tilt: -30 },
  { colour: 'b', cx: 66, cy: 40, rx: 36, ry: 19, dur: 9, turn: -1, tilt: 35 },
  { colour: 'white', cx: 50, cy: 30, rx: 24, ry: 12, dur: 11, turn: 1, tilt: -15 },
  { colour: 'b', cx: 40, cy: 72, rx: 20, ry: 11, dur: 6, turn: -1, tilt: 20 },
  { colour: 'a', cx: 70, cy: 64, rx: 18, ry: 10, dur: 8, turn: 1, tilt: -40 },
];

/**
 * An agent's avatar: an iridescent sphere whose colours swirl inside it,
 * after the orb CopilotKit shows beside its agents. Soft blobs of colour turn
 * about the centre at different speeds, blurred together, under a sphere's
 * shading (a pale light high on the left, a darker edge) and a thin rim.
 *
 * Pure SVG and SMIL, so it animates wherever an image does; ids are scoped
 * with `useId`, so several avatars share a page. A reduced-motion reader sees
 * it still (the `prefers-reduced-motion` rule below).
 */
export function SvgAvatarOrb({ size = 32, state = 'idle', tone = 'iridescent', palette, title }: SvgAvatarOrbProps) {
  const current = useColorPalette();
  const p = palette ?? current;
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const thinking = state === 'thinking';
  const pace = thinking ? 1 / 3 : 1;
  const colours =
    tone === 'theme' ? { a: p.spark, b: p.blaze, c: p.surge, white: '#ffffff' } : { ...IRIDESCENT, white: '#ffffff' };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={{ overflow: 'visible' }}
    >
      {title ? <title>{title}</title> : null}
      <style>{`@media (prefers-reduced-motion: reduce) { #${id} animate, #${id} animateTransform { display: none; } }`}</style>
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle cx="50" cy="50" r="44" />
        </clipPath>
        {/* Blur blends the blobs into one another, as paint in water. */}
        <filter id={`${id}-blend`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        {/* The sphere: a pale light high on the left, a deeper edge all round. */}
        <radialGradient id={`${id}-light`} cx="0.32" cy="0.28" r="0.55">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-edge`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="72%" stopColor={colours.c} stopOpacity="0" />
          <stop offset="100%" stopColor={colours.c} stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <g id={id}>
        {/* While thinking, a ring leaves the sphere. */}
        {thinking ? (
          <circle cx="50" cy="50" r="44" fill="none" stroke={colours.a} strokeWidth="3">
            <animate attributeName="r" values="44;52" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="1.4s" repeatCount="indefinite" />
          </circle>
        ) : null}
        <g clipPath={`url(#${id}-clip)`}>
          <g filter={`url(#${id}-blend)`}>
            {BLOBS.map((blob, index) => (
              <g key={index}>
                {blob.dur ? (
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 50 50`}
                    to={`${360 * blob.turn} 50 50`}
                    dur={`${blob.dur * pace}s`}
                    repeatCount="indefinite"
                  />
                ) : null}
                <ellipse
                  cx={blob.cx}
                  cy={blob.cy}
                  rx={blob.rx}
                  ry={blob.ry}
                  transform={`rotate(${blob.tilt} ${blob.cx} ${blob.cy})`}
                  fill={colours[blob.colour]}
                  opacity={blob.colour === 'white' ? 0.85 : 0.95}
                >
                  {/* Each blob also swells and shrinks a little, out of step with the others. */}
                  {blob.dur ? (
                    <animate
                      attributeName="rx"
                      values={`${blob.rx};${blob.rx * 1.25};${blob.rx}`}
                      dur={`${(blob.dur * 0.7 + index) * pace}s`}
                      repeatCount="indefinite"
                    />
                  ) : null}
                </ellipse>
              </g>
            ))}
          </g>
          <circle cx="50" cy="50" r="44" fill={`url(#${id}-light)`} />
          <circle cx="50" cy="50" r="44" fill={`url(#${id}-edge)`} />
        </g>
        {/* A thin rim, so it holds its shape on any background. */}
        <circle cx="50" cy="50" r="43.5" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
      </g>
    </svg>
  );
}

export default SvgAvatarOrb;
