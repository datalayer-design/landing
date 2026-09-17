/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * A deck: a presentation kept as data.
 *
 * The publication drawing with the things that make a deck a deck rather than
 * a document — a slide in 16:9 with more of them stacked behind it, a title
 * with the rule a slide's title wears, the numbers a deck turns into bars,
 * the dots that say which slide you are on, and the mark for presenting it.
 */

import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

export function SvgDeckArtifact({
  palette: paletteProp,
}: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <svg
      viewBox="0 0 320 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Deck illustration"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <radialGradient id="deckGlow" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.3" />
          <stop offset="66%" stopColor={p.pop} stopOpacity="0.1" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="deckSlide" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bgPanel} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="320" height="240" fill="url(#deckGlow)" />

      <g transform="translate(52 46)">
        {/* Two more slides behind: the one in front is one of a deck. */}
        <rect x="22" y="14" width="196" height="110" rx="10" fill={p.bgAlt} stroke={p.primary} strokeOpacity="0.12" />
        <rect x="11" y="7" width="196" height="110" rx="10" fill={p.bgPanel} stroke={p.primary} strokeOpacity="0.18" />

        {/* The slide itself, in the shape every slide is. */}
        <rect x="0" y="0" width="196" height="110" rx="10" fill="url(#deckSlide)" stroke={p.primary} strokeOpacity="0.3" />

        {/* A title over its rule, as the templates draw one. */}
        <rect x="20" y="20" width="86" height="10" rx="5" fill={p.pop} fillOpacity="0.45" />
        <rect x="20" y="36" width="42" height="4" rx="2" fill={p.surge} fillOpacity="0.5" />

        {/* Two bullets, and the numbers a deck makes bars of. */}
        <rect x="20" y="54" width="92" height="6" rx="3" fill={p.primary} fillOpacity="0.22" />
        <rect x="20" y="68" width="74" height="6" rx="3" fill={p.primary} fillOpacity="0.18" />
        <rect x="132" y="66" width="12" height="20" rx="3" fill={p.glow} fillOpacity="0.4" />
        <rect x="150" y="56" width="12" height="30" rx="3" fill={p.flame} fillOpacity="0.38" />
        <rect x="168" y="46" width="12" height="40" rx="3" fill={p.gold} fillOpacity="0.4" />

        {/* Which slide this is: the one thing a document never has. */}
        <circle cx="86" cy="126" r="3.5" fill={p.primary} fillOpacity="0.25" />
        <circle cx="98" cy="126" r="4.5" fill={p.pop} fillOpacity="0.6" />
        <circle cx="110" cy="126" r="3.5" fill={p.primary} fillOpacity="0.25" />
      </g>

      {/* Presenting it. */}
      <path d="M256 176 L280 189 L256 202 Z" fill={p.flame} fillOpacity="0.45" />
      <circle cx="62" cy="200" r="8" fill={p.gold} fillOpacity="0.3" />
      <circle cx="292" cy="62" r="9" fill={p.spark} fillOpacity="0.26" />
    </svg>
  );
}

export default SvgDeckArtifact;
