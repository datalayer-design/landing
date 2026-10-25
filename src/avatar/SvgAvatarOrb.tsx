/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

/** What the avatar is doing: resting, or working on an answer. */
export type AvatarOrbState = 'idle' | 'thinking';

type SvgAvatarOrbProps = {
  /** Its diameter in pixels (it is drawn in a 100-unit box). @default 32 */
  size?: number;
  /** Idle breathes slowly; thinking turns its light faster and sends out a ring. @default 'idle' */
  state?: AvatarOrbState;
  /** The theme's colours; the current theme's when absent. */
  palette?: ColorPalette;
  /** Read by a screen reader; the avatar is decorative when absent. */
  title?: string;
};

/**
 * An agent's avatar: a lit sphere in the theme's colours, after the circle
 * CopilotKit shows beside its agents (three layered gradients — a light
 * highlight high on the right, a deep shade low on the left, a diagonal base
 * between them), with motion of its own. The highlight drifts round the
 * sphere, the sphere breathes, and while thinking a ring leaves it.
 *
 * Pure SVG and SMIL, so it animates wherever an image does; ids are scoped
 * with `useId`, so several avatars share a page. A reduced-motion reader
 * sees it still: the animations stop through the `prefers-reduced-motion`
 * rule below.
 */
export function SvgAvatarOrb({ size = 32, state = 'idle', palette, title }: SvgAvatarOrbProps) {
  const current = useColorPalette();
  const p = palette ?? current;
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const thinking = state === 'thinking';
  // Thinking is quicker in every motion.
  const turn = thinking ? 3 : 9;
  const breathe = thinking ? 1.4 : 4;
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
        {/* The base: a diagonal from the accent to the primary colour. */}
        <linearGradient id={`${id}-base`} x1="0.15" y1="0.1" x2="0.85" y2="0.9">
          <stop offset="0%" stopColor={p.accent} />
          <stop offset="100%" stopColor={p.primary} />
        </linearGradient>
        {/* The highlight, high on the right. */}
        {/* Inside the sphere (it turns about the centre and must stay on it), and wide, a soft wash. */}
        <radialGradient id={`${id}-light`} cx="0.7" cy="0.26" r="0.62">
          {/* A pale core, so the light reads as light whatever the theme's colours. */}
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="35%" stopColor={p.glow} stopOpacity="0.45" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        {/* The shade, low on the left. */}
        <radialGradient id={`${id}-shade`} cx="0.08" cy="0.96" r="0.85">
          <stop offset="0%" stopColor={p.secondary} stopOpacity="0.95" />
          <stop offset="70%" stopColor={p.secondary} stopOpacity="0" />
        </radialGradient>
        {/* The soft glow around it. */}
        <radialGradient id={`${id}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="55%" stopColor={p.glow} stopOpacity="0.35" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="50" cy="50" r="40" />
        </clipPath>
      </defs>
      <g id={id}>
        {/* The halo, breathing. */}
        <circle cx="50" cy="50" r="50" fill={`url(#${id}-halo)`}>
          <animate attributeName="opacity" values="0.45;0.9;0.45" dur={`${breathe}s`} repeatCount="indefinite" />
        </circle>
        {/* While thinking, a ring leaves the sphere. */}
        {thinking ? (
          <circle cx="50" cy="50" r="40" fill="none" stroke={p.spark} strokeWidth="3">
            <animate attributeName="r" values="40;50" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="1.4s" repeatCount="indefinite" />
          </circle>
        ) : null}
        {/* Breathing, about the centre: moved there, scaled, moved back. */}
        <g transform="translate(50 50)">
          <g>
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.04;1"
              dur={`${breathe}s`}
              repeatCount="indefinite"
            />
            <g transform="translate(-50 -50)">
              <g clipPath={`url(#${id}-clip)`}>
                <circle cx="50" cy="50" r="40" fill={`url(#${id}-base)`} />
                <circle cx="50" cy="50" r="40" fill={`url(#${id}-shade)`} />
                {/* The highlight drifts round the sphere. */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur={`${turn}s`}
                    repeatCount="indefinite"
                  />
                  <circle cx="50" cy="50" r="40" fill={`url(#${id}-light)`} />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SvgAvatarOrb;
