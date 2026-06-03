/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Themed SVG illustration for the Join-Confirm (account activated) page.
 *
 * Visual motif: an open gateway / portal with a checkmark badge at its
 * centre, flanked by two softly-glowing pillars.  Radial rings and a
 * perspective-dot background reinforce the "welcome through" metaphor.
 * A subtle arrow-hint at the bottom invites the user to proceed to login.
 *
 * Uses a 480×320 viewBox — wide and compact, suited for inline placement
 * above the confirmation message.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgJoinConfirmHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const lightFilter = p.isLight ? 'url(#svgLightBoost)' : undefined;

  return (
    <svg
      viewBox="0 0 480 320"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', maxWidth: 420, height: 'auto', display: 'block' }}
    >
      <defs>
        <LightBoostFilter />

        {/* Central radial glow */}
        <radialGradient id="jcGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.50" />
          <stop offset="40%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        {/* Left pillar glow */}
        <radialGradient id="jcGlowL" cx="28%" cy="50%" r="32%">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.35" />
          <stop offset="60%" stopColor={p.pop} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </radialGradient>

        {/* Right pillar glow */}
        <radialGradient id="jcGlowR" cx="72%" cy="50%" r="32%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.35" />
          <stop offset="60%" stopColor={p.spark} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>

        {/* Badge success glow */}
        <radialGradient id="jcBadge" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.65" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        {/* Keyhole / portal gradient */}
        <linearGradient id="jcPortal" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={p.primary} stopOpacity="0.25" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.primary} stopOpacity="0.02" />
        </linearGradient>

      </defs>

      {/* ── Ambient glows (transparent, no background box) ─── */}
      <ellipse cx="240" cy="150" rx="180" ry="120" fill="url(#jcGlow)" filter={lightFilter} />
      <ellipse cx="160" cy="160" rx="100" ry="100" fill="url(#jcGlowL)" filter={lightFilter} />
      <ellipse cx="320" cy="160" rx="100" ry="100" fill="url(#jcGlowR)" filter={lightFilter} />

      {/* ── Concentric rings (welcome / target) ──────────────── */}
      {[100, 75, 50].map((r, i) => (
        <circle
          key={i}
          cx="240"
          cy="145"
          r={r}
          fill="none"
          stroke={p.primary}
          strokeOpacity={0.06 + i * 0.03}
          strokeWidth={0.6}
        />
      ))}

      {/* ── Portal arch ──────────────────────────────────────── */}
      <path
        d="M 170 260 L 170 110 A 70 70 0 0 1 310 110 L 310 260"
        fill="url(#jcPortal)"
        stroke={p.primary}
        strokeOpacity="0.18"
        strokeWidth="1.2"
        filter={lightFilter}
      />

      {/* Arch inner highlight */}
      <path
        d="M 186 260 L 186 120 A 54 54 0 0 1 294 120 L 294 260"
        fill="none"
        stroke={p.glow}
        strokeOpacity="0.12"
        strokeWidth="0.6"
      />

      {/* ── Left pillar ──────────────────────────────────────── */}
      <rect x="158" y="105" width="14" height="160" rx="5" fill={p.pop} fillOpacity="0.18" filter={lightFilter} />
      <rect x="160" y="107" width="10" height="156" rx="4" fill="none" stroke={p.pop} strokeOpacity="0.25" strokeWidth="0.6" />

      {/* ── Right pillar ─────────────────────────────────────── */}
      <rect x="308" y="105" width="14" height="160" rx="5" fill={p.spark} fillOpacity="0.18" filter={lightFilter} />
      <rect x="310" y="107" width="10" height="156" rx="4" fill="none" stroke={p.spark} strokeOpacity="0.25" strokeWidth="0.6" />

      {/* ── Ground line ──────────────────────────────────────── */}
      <line x1="140" y1="265" x2="340" y2="265" stroke={p.primary} strokeOpacity="0.12" strokeWidth="0.8" />

      {/* ── Success badge — glowing checkmark circle ─────────── */}
      <circle cx="240" cy="170" r="38" fill="url(#jcBadge)" filter={lightFilter} />
      <circle cx="240" cy="170" r="30" fill={p.bgPanel} fillOpacity="0.85" stroke={p.glow} strokeOpacity="0.5" strokeWidth="1.5" />

      {/* Checkmark */}
      <polyline
        points="224,170 236,182 258,158"
        fill="none"
        stroke={p.glow}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Sparkle dots ─────────────────────────────────────── */}
      {[
        { cx: 120, cy: 80, r: 2.0, color: p.pop },
        { cx: 360, cy: 85, r: 1.8, color: p.spark },
        { cx: 95,  cy: 190, r: 1.5, color: p.flame },
        { cx: 385, cy: 195, r: 1.5, color: p.surge },
        { cx: 140, cy: 295, r: 1.2, color: p.gold },
        { cx: 340, cy: 295, r: 1.2, color: p.blaze },
        { cx: 200, cy: 60,  r: 1.3, color: p.glow },
        { cx: 280, cy: 60,  r: 1.3, color: p.pop },
      ].map((dot, i) => (
        <circle key={`sp${i}`} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.color} fillOpacity="0.55" />
      ))}

      {/* ── Floating connector lines (network hints) ─────────── */}
      <line x1="120" y1="80" x2="170" y2="130" stroke={p.pop} strokeOpacity="0.10" strokeWidth="0.6" />
      <line x1="360" y1="85" x2="310" y2="130" stroke={p.spark} strokeOpacity="0.10" strokeWidth="0.6" />

      {/* ── "Enter" arrow at bottom ──────────────────────────── */}
      <g opacity="0.45">
        <line x1="240" y1="280" x2="240" y2="305" stroke={p.glow} strokeWidth="1.8" strokeLinecap="round" />
        <polyline
          points="232,298 240,306 248,298"
          fill="none"
          stroke={p.glow}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* ── Animated pulse ring on the badge ──────────────────── */}
      <circle cx="240" cy="170" r="30" fill="none" stroke={p.glow} strokeWidth="1.2">
        <animate attributeName="r" values="30;44;30" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.40;0;0.40" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default SvgJoinConfirmHero;
