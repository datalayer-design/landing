/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Discord community hero illustration.
 *
 * Visual motif: central Discord badge, community members around it,
 * and data-link trajectories inspired by data-analysis infographics.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export const SVG_DISCORD_MATRIX_LIGHT_INLINE = `<svg viewBox="0 0 1100 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Datalayer Discord community" style="display:block;width:100%;height:auto;background:#f0fff0"><defs><linearGradient id="dm-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#e8f5e9"/></linearGradient><linearGradient id="dm-flow" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#00E676" stop-opacity="0.72"/><stop offset="100%" stop-color="#1DE9B6" stop-opacity="0.34"/></linearGradient><radialGradient id="dm-glow" cx="50%" cy="50%" r="65%"><stop offset="0%" stop-color="#00E676" stop-opacity="0.28"/><stop offset="100%" stop-color="#00E676" stop-opacity="0"/></radialGradient></defs><rect width="1100" height="420" fill="url(#dm-bg)"/><rect x="150" y="20" width="800" height="340" rx="26" fill="#ffffff" stroke="#16A085" stroke-opacity="0.30"/><circle cx="550" cy="200" r="128" fill="url(#dm-glow)"/><path d="M120 250 C270 168, 396 144, 550 162 C704 180, 830 205, 980 248" fill="none" stroke="url(#dm-flow)" stroke-width="4"/><path d="M120 304 C278 228, 398 210, 550 224 C704 238, 834 264, 980 312" fill="none" stroke="#00B0FF" stroke-opacity="0.24" stroke-width="2"/><g transform="translate(550 198)"><circle cx="0" cy="0" r="106" fill="#5865F2"/><g transform="translate(0 0) scale(0.62) translate(-122.5 -120)"><path fill="#FFFFFF" d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/><path fill="#FFFFFF" d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/></g></g><g fill="#117A65"><circle cx="246" cy="110" r="21"/><circle cx="854" cy="110" r="21"/><circle cx="214" cy="306" r="21"/><circle cx="886" cy="306" r="21"/><circle cx="550" cy="330" r="24"/></g><g fill="#ffffff" opacity="0.97"><circle cx="246" cy="102" r="7"/><path d="M232 126 C238 114, 254 114, 260 126"/><circle cx="854" cy="102" r="7"/><path d="M840 126 C846 114, 862 114, 868 126"/><circle cx="214" cy="298" r="7"/><path d="M200 322 C206 310, 222 310, 228 322"/><circle cx="886" cy="298" r="7"/><path d="M872 322 C878 310, 894 310, 900 322"/><circle cx="550" cy="322" r="8"/><path d="M536 348 C542 334, 558 334, 564 348"/></g><text x="550" y="66" text-anchor="middle" font-family="-apple-system, Segoe UI, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" fill="#0A2E1A">Join Datalayer on Discord</text><text x="550" y="390" text-anchor="middle" font-family="-apple-system, Segoe UI, Helvetica, Arial, sans-serif" font-size="18" fill="#4A7856">Live AI Agents demos, office hours, and community support</text></svg>`;

export function SvgDiscord({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <svg
      viewBox="0 0 1100 420"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <LightBoostFilter />
        <linearGradient id="discordBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bgPanel} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>
        <linearGradient id="discordFlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.72" />
          <stop offset="50%" stopColor={p.pop} stopOpacity="0.45" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0.34" />
        </linearGradient>
        <radialGradient id="discordHalo" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.34" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1100" height="420" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        <rect x="150" y="20" width="800" height="340" rx="26" fill="url(#discordBg)" stroke={p.primary} strokeOpacity="0.30" />

        <circle cx="550" cy="200" r="128" fill="url(#discordHalo)" />
        <path d="M120 250 C270 168, 396 144, 550 162 C704 180, 830 205, 980 248" fill="none" stroke="url(#discordFlow)" strokeWidth="4" />
        <path d="M120 304 C278 228, 398 210, 550 224 C704 238, 834 264, 980 312" fill="none" stroke={p.surge} strokeOpacity="0.24" strokeWidth="2" />

        <g transform="translate(550 198)">
          <circle cx="0" cy="0" r="106" fill={p.primary} />
          <g transform="translate(0 0) scale(0.62) translate(-122.5 -120)">
            <path
              fill="#FFFFFF"
              d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"
            />
            <path
              fill="#FFFFFF"
              d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"
            />
          </g>
        </g>

        <g fill={p.secondary}>
          <circle cx="246" cy="110" r="21" />
          <circle cx="854" cy="110" r="21" />
          <circle cx="214" cy="306" r="21" />
          <circle cx="886" cy="306" r="21" />
          <circle cx="550" cy="330" r="24" />
        </g>
        <g fill="#FFFFFF" opacity="0.97">
          <circle cx="246" cy="102" r="7" />
          <path d="M232 126 C238 114, 254 114, 260 126" />
          <circle cx="854" cy="102" r="7" />
          <path d="M840 126 C846 114, 862 114, 868 126" />
          <circle cx="214" cy="298" r="7" />
          <path d="M200 322 C206 310, 222 310, 228 322" />
          <circle cx="886" cy="298" r="7" />
          <path d="M872 322 C878 310, 894 310, 900 322" />
          <circle cx="550" cy="322" r="8" />
          <path d="M536 348 C542 334, 558 334, 564 348" />
        </g>

        <text
          x="550"
          y="66"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="34"
          fontWeight="700"
          fill={p.textLight}
        >
          Join Datalayer on Discord
        </text>
        <text
          x="550"
          y="390"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="18"
          fill={p.textMuted}
        >
          Live AI Agents demos, office hours, and community support
        </text>
      </g>
    </svg>
  );
}

export default SvgDiscord;