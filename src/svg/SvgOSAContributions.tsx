/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Open Source contributions illustration.
 *
 * Visual motif: OSI and Jupyter connected through a central contribution
 * engine where packets circulate, split, and return as ecosystem value.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgOSAContributions({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  const jupyterTone = p.isLight ? p.flame : p.gold;
  const osiTone = p.isLight ? '#3fa648' : p.primary;
  const workerHelmet = p.isLight ? p.gold : p.flame;
  const workerSuit = p.isLight ? p.surge : p.primary;
  const workerSkin = p.isLight ? '#f2c299' : p.blaze;
  const workerLine = p.isLight ? p.textLight : p.textMuted;

  return (
    <svg
      viewBox="0 0 1100 460"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Open source contribution engine connecting OSI and Jupyter"
    >
      <defs>
        <LightBoostFilter />

        <linearGradient id="osa2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>

        <linearGradient id="osa2-lane-a" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={osiTone} stopOpacity="0.85" />
          <stop offset="55%" stopColor={p.glow} stopOpacity="0.75" />
          <stop offset="100%" stopColor={jupyterTone} stopOpacity="0.88" />
        </linearGradient>

        <linearGradient id="osa2-lane-b" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={jupyterTone} stopOpacity="0.72" />
          <stop offset="50%" stopColor={p.pop} stopOpacity="0.62" />
          <stop offset="100%" stopColor={osiTone} stopOpacity="0.72" />
        </linearGradient>

        <radialGradient id="osa2-left-halo" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor={osiTone} stopOpacity="0.18" />
          <stop offset="100%" stopColor={osiTone} stopOpacity="0" />
        </radialGradient>

        <radialGradient id="osa2-right-halo" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor={jupyterTone} stopOpacity="0.18" />
          <stop offset="100%" stopColor={jupyterTone} stopOpacity="0" />
        </radialGradient>

        <radialGradient id="osa2-core" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.34" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        <pattern id="osa2-mesh" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M 0 18 H 36 M 18 0 V 36" stroke={p.primary} strokeOpacity="0.06" strokeWidth="1" />
          <circle cx="18" cy="18" r="1" fill={p.primary} opacity="0.08" />
        </pattern>

        <filter id="osa2-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>

        <filter id="osa2-chip" x="-100%" y="-100%" width="300%" height="300%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={p.glow} floodOpacity="0.45" />
        </filter>
      </defs>

      <rect width="1100" height="460" fill="url(#osa2-bg)" />
      <rect width="1100" height="460" fill="url(#osa2-mesh)" />

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        <rect x="56" y="44" width="988" height="372" rx="26" fill={p.bgPanel} opacity="0.55" stroke={p.primary} strokeOpacity="0.13" />

        <circle cx="220" cy="230" r="118" fill="url(#osa2-left-halo)" filter="url(#osa2-soft)" />
        <circle cx="880" cy="230" r="118" fill="url(#osa2-right-halo)" filter="url(#osa2-soft)" />
        <circle cx="550" cy="230" r="140" fill="url(#osa2-core)" filter="url(#osa2-soft)" />

        {/* Left and right hubs */}
        <rect x="140" y="148" width="160" height="164" rx="22" fill={p.bg} stroke={osiTone} strokeOpacity="0.36" />
        <rect x="800" y="148" width="160" height="164" rx="22" fill={p.bg} stroke={jupyterTone} strokeOpacity="0.36" />

        {/* Contribution lanes: not parallel bars, but braided routes */}
        <path
          d="M 300 200 C 388 118, 454 110, 550 182 C 646 254, 712 260, 800 194"
          fill="none"
          stroke="url(#osa2-lane-a)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 8"
          opacity="0.86"
        >
          <animate attributeName="stroke-dashoffset" values="0;-72" dur="5s" repeatCount="indefinite" />
        </path>
        <path
          d="M 300 258 C 402 326, 470 338, 550 274 C 630 210, 698 190, 800 264"
          fill="none"
          stroke="url(#osa2-lane-b)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 10"
          opacity="0.74"
        >
          <animate attributeName="stroke-dashoffset" values="0;68" dur="5.8s" repeatCount="indefinite" />
        </path>

        {/* Central contribution core */}
        <g transform="translate(550 230)">
          <circle r="64" fill={p.bg} stroke={p.primary} strokeOpacity="0.45" />
          <circle r="78" fill="none" stroke={p.glow} strokeOpacity="0.30" strokeWidth="2" strokeDasharray="4 8">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="14s" repeatCount="indefinite" />
          </circle>
          <g transform="translate(-43.2 -43.2) scale(1.2)">
            {/* Themed ConstructionWorkerIcon (source: icons/svg/data2/construction-worker.svg) */}
            <path fill={workerSuit} d="M54.0706,58.8969c0,0,2-13.7974-10-13.7974c-3.1919,2.1193-5.9264,3.5838-9,3.5775h0.125 c-3.0736,0.0063-5.8082-1.4582-9-3.5775c-12,0-10,13.7974-10,13.7974" />
            <path fill={p.isLight ? p.primary : p.surge} d="M43.1009,49.1247c5.4463,2.2601,5.5866,6.8076,6.1478,9.7535c4.1614,0,5.0205,0,5.0205,0 s2.1603-14.9254-9.6229-14.9254" />
            <path fill={p.isLight ? p.blaze : p.pop} d="M49.1002,58.8968V45.8237l-4.096-0.7271c-2.3626,5.5058-5.0143,10.899-6.8354,13.8002H49.1002z" />
            <path fill={p.isLight ? p.blaze : p.pop} d="M33.7198,58.8968c-1.8211-2.9012-4.4729-8.2944-6.8355-13.8002l-4.3245,0.7271v13.0729L33.7198,58.8968z" />
            <path fill={workerHelmet} d="M46.9269,21.2821l-0.04,0.1c-0.38-0.13-0.79-0.26-1.23-0.39c-2.11-0.62-4.99-1.16-8.56-1.16v-2.57h2.89 l0.06-5.96C46.8869,12.5121,46.9269,21.2821,46.9269,21.2821z" />
            <path fill={workerHelmet} d="M37.0969,17.2621v2.57c-0.34,0-0.68,0.01-1.03,0.02h-0.16c-0.03,0-0.06-0.01-0.08,0 c-4.02-0.11-7.21,0.47-9.5,1.13v0.01c-0.59,0.17-1.12,0.35-1.59,0.53l-0.09-0.24c0,0,0.05-9.2,7.4-10.06l-0.06,6.04H37.0969z" />
            <path fill={p.isLight ? p.spark : p.gold} d="M40.0469,11.3021l-0.06,5.96h-2.89h-5.11l0.06-6.04c1.59-2.81,7.37-2.07,8,0V11.3021z" />
            <path fill={workerSkin} d="M47.0069,25.0321c0.21,1.08,0.32,2.21,0.32,3.36c0,7.83-5.08,14.18-11.34,14.18s-11.34-6.35-11.34-14.18 c0-1.51,0.19-2.97,0.55-4.33l0.53,0.21c3.35,1.42,9.3-3.52,10.22-4.31c0.92,0.79,6.87,5.73,10.22,4.31l0.62-0.22 C46.8669,24.3721,46.9469,24.7021,47.0069,25.0321z" />
            <path fill={workerLine} opacity="0.9" d="M39.8869,34.8421c0.24,0.49,0.04,1.09-0.45,1.34c-1.14,0.57-2.3,0.86-3.45,0.86s-2.3-0.29-3.44-0.86 c-0.5-0.25-0.7-0.85-0.45-1.34c0.24-0.5,0.84-0.7,1.34-0.45c1.72,0.86,3.39,0.86,5.11,0 C39.0369,34.1421,39.6369,34.3421,39.8869,34.8421z" />
            <circle cx="31.9869" cy="27.0321" r="2" fill={workerLine} />
            <circle cx="39.9869" cy="27.0321" r="2" fill={workerLine} />
          </g>
        </g>

        {/* Packet chips moving through the network */}
        <g filter="url(#osa2-chip)">
          <rect x="-6" y="-4" width="12" height="8" rx="2" fill={osiTone} opacity="0.95">
            <animateMotion dur="3.4s" repeatCount="indefinite" path="M 300 200 C 388 118, 454 110, 550 182 C 646 254, 712 260, 800 194" />
          </rect>
          <rect x="-6" y="-4" width="12" height="8" rx="2" fill={p.glow} opacity="0.95">
            <animateMotion dur="2.9s" begin="0.7s" repeatCount="indefinite" path="M 300 258 C 402 326, 470 338, 550 274 C 630 210, 698 190, 800 264" />
          </rect>
          <rect x="-5" y="-3" width="10" height="6" rx="1.5" fill={jupyterTone} opacity="0.9">
            <animateMotion dur="4.2s" repeatCount="indefinite" path="M 800 218 C 708 146, 640 132, 550 184 C 460 236, 392 244, 300 218" />
          </rect>
        </g>

        {/* Open Source Initiative icon shape (from OpenSourceInitiativeIcon) */}
        <g transform="translate(220 225) scale(0.23) translate(-295 -295)">
          <path
            fill={osiTone}
            stroke={p.isLight ? '#23552a' : p.primary}
            strokeOpacity={p.isLight ? 0.62 : 0.3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="19.212"
            d="M328.7 395.8c40.3-15 61.4-43.8 61.4-93.4S348.3 209 296 208.9c-55.1-.1-96.8 43.6-96.1 93.5s24.4 83 62.4 94.9L195 563C104.8 539.7 13.2 433.3 13.2 302.4 13.2 147.3 137.8 21.5 294 21.5s282.8 125.7 282.8 280.8c0 133-90.8 237.9-182.9 261.1l-65.2-167.6z"
          />
        </g>

        {/* Jupyter base icon shape (from JupyterBaseIcon) */}
        <g transform="translate(880 226) scale(7.4) translate(-10.385 -10.1)">
          <path
            fill={jupyterTone}
            d="M10.385 16.574c-3.755 0-7.055-1.348-8.761-3.338a9.34 9.34 0 0017.522 0c-1.702 1.99-4.99 3.338-8.761 3.338zm0-12.941c3.755 0 7.054 1.348 8.76 3.338a9.342 9.342 0 00-17.521 0c1.706-1.994 4.99-3.338 8.76-3.338z"
          />
        </g>

        {/* Ambient counters */}
        <g fill={p.textMuted} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="11" opacity="0.72">
          <text x="364" y="122">PRs +342</text>
          <text x="522" y="98">maintainers +27</text>
          <text x="676" y="126">reviews +811</text>
        </g>

        <text
          x="220"
          y="334"
          textAnchor="middle"
          fill={p.textLight}
          fontSize="16"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Open Source Initiative
        </text>
        <text
          x="880"
          y="334"
          textAnchor="middle"
          fill={p.textLight}
          fontSize="16"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Jupyter
        </text>

        <text
          x="550"
          y="386"
          textAnchor="middle"
          fill={p.textMuted}
          fontSize="17"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Opensource Community always wins
        </text>
      </g>
    </svg>
  );
}

export default SvgOSAContributions;