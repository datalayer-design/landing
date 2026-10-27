/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * CC BY 4.0 License
 */

import { Fragment, useId, useSyncExternalStore } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

/**
 * What the avatar is doing: the floating assistant's states, each acted out.
 *
 * - `idle`: resting, its colours swirling slowly.
 * - `greeting`: it has just appeared — a pop, then the idle swirl.
 * - `thinking`: working on an answer — a faster swirl, a ring leaving it.
 * - `working`: running a long task — the fastest swirl, an arc orbiting it.
 * - `waiting`: waiting for the person — a slow, breathing glow around it.
 * - `speaking`: an answer arriving — a gentle pulse, as of a voice.
 * - `paused`: its application paused — still, and greyed.
 * - `goodbye`: being sent away — it shrinks and fades, once.
 */
export type AvatarOrbState = 'idle' | 'greeting' | 'thinking' | 'working' | 'waiting' | 'speaking' | 'paused' | 'goodbye';

/** Every state, in the order a picker shows them. */
export const AVATAR_ORB_STATES: readonly AvatarOrbState[] = [
  'idle',
  'greeting',
  'thinking',
  'working',
  'waiting',
  'speaking',
  'paused',
  'goodbye',
];

/**
 * Its colours: `iridescent`, the cyan, pink and lavender of an agent's orb
 * (after CopilotKit's, on its Soar page); `theme`, the theme's own bright
 * colours (spark, blaze, surge), so it follows the theme as the other SVGs do.
 */
export type AvatarOrbTone = 'iridescent' | 'theme';

type SvgAvatarOrbProps = {
  /** Its diameter in pixels (it is drawn in a 100-unit box). @default 32 */
  size?: number;
  /** What it is doing (`AvatarOrbState`). @default 'idle' */
  state?: AvatarOrbState;
  /** @default 'iridescent' */
  tone?: AvatarOrbTone;
  /** The theme's colours; the current theme's when absent. */
  palette?: ColorPalette;
  /** Read by a screen reader; the avatar is decorative when absent. */
  title?: string;
};

const IRIDESCENT = { a: '#1fd0ff', b: '#ff4fae', c: '#c4bdff' };

/* How fast each state swirls: the blobs' durations are idle's, divided by this. */
const PACE: Record<AvatarOrbState, number> = {
  idle: 1,
  greeting: 1.5,
  thinking: 3,
  working: 5,
  waiting: 0.8,
  speaking: 2,
  paused: 0,
  goodbye: 1.5,
};

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/* Whether the reader asks for reduced motion, followed as it changes. */
function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(REDUCED_MOTION).matches;
}

/*
 * The blobs inside the sphere: each a soft ellipse off the centre, turning
 * about it at its own speed and in its own direction, so the colours flow
 * into one another and never settle into one figure.
 */
const BLOBS: Array<{ colour: 'a' | 'b' | 'c' | 'white'; cx: number; cy: number; rx: number; ry: number; dur: number; turn: 1 | -1; tilt: number }> = [
  { colour: 'c', cx: 50, cy: 50, rx: 46, ry: 46, dur: 0, turn: 1, tilt: 0 },
  { colour: 'a', cx: 36, cy: 62, rx: 38, ry: 20, dur: 7, turn: 1, tilt: -30 },
  { colour: 'b', cx: 66, cy: 40, rx: 36, ry: 19, dur: 9, turn: -1, tilt: 35 },
  { colour: 'white', cx: 50, cy: 30, rx: 24, ry: 12, dur: 11, turn: 1, tilt: -15 },
  { colour: 'b', cx: 40, cy: 72, rx: 20, ry: 11, dur: 6, turn: -1, tilt: 20 },
  { colour: 'a', cx: 70, cy: 64, rx: 18, ry: 10, dur: 8, turn: 1, tilt: -40 },
];

/** A scale about the sphere's centre, as SMIL's `values` take it. */
const scaled = (factors: number[]) => factors.map(f => `${50 - 50 * f} ${50 - 50 * f}`).join(';');
const scales = (factors: number[]) => factors.join(';');

/**
 * An agent's avatar: an iridescent sphere whose colours swirl inside it,
 * after the orb CopilotKit shows beside its agents, acting out what the agent
 * is doing (`state`). Soft blobs of colour turn about the centre at different
 * speeds, blurred together, under a sphere's shading (a pale light high on
 * the left, a darker edge) and a thin rim.
 *
 * Pure SVG and SMIL, so it animates wherever an image does; ids are scoped
 * with `useId`, so several avatars share a page. The drawing starts again on
 * each change of state, so a state's one-off motion (greeting, goodbye) plays
 * from the moment it begins. A reduced-motion reader sees it still: no
 * animation is drawn at all (a CSS rule cannot stop SMIL), each state keeping
 * its still pose — the ring, the glow, the arc held where they stand.
 */
export function SvgAvatarOrb({ size = 32, state = 'idle', tone = 'iridescent', palette, title }: SvgAvatarOrbProps) {
  const current = useColorPalette();
  const p = palette ?? current;
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const moving = !useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
  const pace = PACE[state];
  const swirling = moving && pace > 0;
  const colours =
    tone === 'theme' ? { a: p.spark, b: p.blaze, c: p.surge, white: '#ffffff' } : { ...IRIDESCENT, white: '#ffffff' };
  const paused = state === 'paused';

  // The whole sphere's own motion: a pop, a pulse, a fade.
  const body =
    !moving ? null : state === 'greeting' ? (
      <Fragment>
        <animateTransform attributeName="transform" type="translate" values={scaled([0.4, 1.12, 0.96, 1])} keyTimes="0;0.5;0.75;1" dur="0.9s" fill="freeze" />
        <animateTransform attributeName="transform" type="scale" additive="sum" values={scales([0.4, 1.12, 0.96, 1])} keyTimes="0;0.5;0.75;1" dur="0.9s" fill="freeze" />
      </Fragment>
    ) : state === 'speaking' ? (
      <Fragment>
        <animateTransform attributeName="transform" type="translate" values={scaled([1, 1.05, 0.99, 1.04, 1])} dur="0.8s" repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="scale" additive="sum" values={scales([1, 1.05, 0.99, 1.04, 1])} dur="0.8s" repeatCount="indefinite" />
      </Fragment>
    ) : state === 'goodbye' ? (
      <Fragment>
        <animateTransform attributeName="transform" type="translate" values={scaled([1, 1.06, 0.3])} keyTimes="0;0.25;1" dur="1.1s" fill="freeze" />
        <animateTransform attributeName="transform" type="scale" additive="sum" values={scales([1, 1.06, 0.3])} keyTimes="0;0.25;1" dur="1.1s" fill="freeze" />
        <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.25;1" dur="1.1s" fill="freeze" />
      </Fragment>
    ) : null;

  return (
    <svg
      // A new drawing, and a new SMIL timeline, for each state: its one-off motion starts now.
      key={state}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      data-avatar-orb-state={state}
      style={{ overflow: 'visible' }}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <clipPath id={`${id}-clip`}>
          <circle cx="50" cy="50" r="44" />
        </clipPath>
        {/* Blur blends the blobs into one another, as paint in water. */}
        <filter id={`${id}-blend`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        {/* Paused: the colours drained, as a sleeping screen. */}
        <filter id={`${id}-paused`}>
          <feColorMatrix type="saturate" values="0.15" />
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
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="70%" stopColor={colours.a} stopOpacity="0.5" />
          <stop offset="100%" stopColor={colours.a} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g id={id} opacity={paused ? 0.6 : 1} filter={paused ? `url(#${id}-paused)` : undefined}>
        {body}
        {/* Waiting: a glow that breathes around it. */}
        {state === 'waiting' ? (
          <circle cx="50" cy="50" r="56" fill={`url(#${id}-glow)`} opacity={moving ? 0.4 : 0.7}>
            {moving ? <animate attributeName="opacity" values="0.25;0.85;0.25" dur="2.6s" repeatCount="indefinite" /> : null}
          </circle>
        ) : null}
        {/* Thinking: a ring leaves the sphere; held round it when still. */}
        {state === 'thinking' ? (
          <circle cx="50" cy="50" r={moving ? 44 : 48} fill="none" stroke={colours.a} strokeWidth="3" opacity={moving ? 1 : 0.5}>
            {moving ? (
              <Fragment>
                <animate attributeName="r" values="44;52" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="1.4s" repeatCount="indefinite" />
              </Fragment>
            ) : null}
          </circle>
        ) : null}
        {/* Working: an arc orbiting the sphere. */}
        {state === 'working' ? (
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke={colours.b}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="60 248"
          >
            {moving ? (
              <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.2s" repeatCount="indefinite" />
            ) : null}
          </circle>
        ) : null}
        <g clipPath={`url(#${id}-clip)`}>
          <g filter={`url(#${id}-blend)`}>
            {BLOBS.map((blob, index) => (
              <g key={index}>
                {swirling && blob.dur ? (
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 50 50`}
                    to={`${360 * blob.turn} 50 50`}
                    dur={`${blob.dur / pace}s`}
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
                  {swirling && blob.dur ? (
                    <animate
                      attributeName="rx"
                      values={`${blob.rx};${blob.rx * 1.25};${blob.rx}`}
                      dur={`${(blob.dur * 0.7 + index) / pace}s`}
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
