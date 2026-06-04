/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Invites hero illustration.
 *
 * Visual motif: layered envelopes, mail trajectory curves, and network nodes.
 * Built with the shared SVG palette so it follows the active theme.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgInvites({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <svg
      viewBox="0 0 900 560"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <LightBoostFilter />
        <radialGradient id="invGlow1" cx="25%" cy="30%" r="55%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.46" />
          <stop offset="55%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="invGlow2" cx="78%" cy="70%" r="52%">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.42" />
          <stop offset="55%" stopColor={p.pop} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="invCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bgPanel} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>
        <linearGradient id="invEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.primary} stopOpacity="0.45" />
          <stop offset="100%" stopColor={p.secondary} stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="invPath" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.75" />
          <stop offset="50%" stopColor={p.pop} stopOpacity="0.60" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0.75" />
        </linearGradient>
        <pattern id="invDots" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill={p.primary} opacity="0.08" />
        </pattern>
      </defs>

      <rect width="900" height="560" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        <rect width="900" height="560" fill="url(#invDots)" />
        <rect width="900" height="560" fill="url(#invGlow1)" />
        <rect width="900" height="560" fill="url(#invGlow2)" />

        {/* mail trajectories */}
        <path d="M40 440 C180 300, 320 320, 450 245 C590 165, 725 190, 860 86" fill="none" stroke="url(#invPath)" strokeWidth="2.2" strokeOpacity="0.55" />
        <path d="M70 485 C210 380, 330 400, 480 325 C620 255, 760 260, 865 205" fill="none" stroke={p.surge} strokeWidth="1.4" strokeOpacity="0.30" />
        <path d="M32 390 C180 260, 320 240, 460 170 C610 95, 750 110, 870 45" fill="none" stroke={p.flame} strokeWidth="1.2" strokeOpacity="0.28" />

        {/* network nodes */}
        <g>
          <circle cx="150" cy="332" r="5" fill={p.spark} opacity="0.85" />
          <circle cx="150" cy="332" r="18" fill={p.spark} opacity="0.16" />
          <circle cx="448" cy="246" r="5" fill={p.glow} opacity="0.86" />
          <circle cx="448" cy="246" r="20" fill={p.glow} opacity="0.16" />
          <circle cx="742" cy="188" r="5" fill={p.pop} opacity="0.85" />
          <circle cx="742" cy="188" r="18" fill={p.pop} opacity="0.16" />
          <circle cx="852" cy="88" r="4" fill={p.blaze} opacity="0.84" />
          <circle cx="852" cy="88" r="15" fill={p.blaze} opacity="0.15" />
        </g>

        {/* envelopes */}
        <g transform="translate(115 330) rotate(-16)">
          <rect x="-70" y="-42" width="140" height="84" rx="12" fill="url(#invCard)" stroke="url(#invEdge)" strokeWidth="1.2" />
          <path d="M-70 -42 L0 10 L70 -42" fill="none" stroke={p.primary} strokeOpacity="0.45" strokeWidth="1.2" />
          <path d="M-70 42 L-10 -4" fill="none" stroke={p.primary} strokeOpacity="0.30" strokeWidth="1" />
          <path d="M70 42 L10 -4" fill="none" stroke={p.primary} strokeOpacity="0.30" strokeWidth="1" />
        </g>

        <g transform="translate(430 250) rotate(-8)">
          <rect x="-120" y="-72" width="240" height="144" rx="16" fill="url(#invCard)" stroke="url(#invEdge)" strokeWidth="1.4" />
          <path d="M-120 -72 L0 18 L120 -72" fill="none" stroke={p.glow} strokeOpacity="0.55" strokeWidth="1.8" />
          <path d="M-120 72 L-16 -8" fill="none" stroke={p.primary} strokeOpacity="0.35" strokeWidth="1.2" />
          <path d="M120 72 L16 -8" fill="none" stroke={p.primary} strokeOpacity="0.35" strokeWidth="1.2" />
          <line x1="-74" y1="-26" x2="74" y2="-26" stroke={p.textMuted} strokeOpacity="0.28" strokeWidth="2.8" />
          <line x1="-74" y1="0" x2="54" y2="0" stroke={p.textMuted} strokeOpacity="0.24" strokeWidth="2.8" />
        </g>

        <g transform="translate(730 192) rotate(14)">
          <rect x="-82" y="-50" width="164" height="100" rx="12" fill="url(#invCard)" stroke="url(#invEdge)" strokeWidth="1.2" />
          <path d="M-82 -50 L0 12 L82 -50" fill="none" stroke={p.pop} strokeOpacity="0.50" strokeWidth="1.4" />
          <path d="M-82 50 L-12 -5" fill="none" stroke={p.primary} strokeOpacity="0.30" strokeWidth="1" />
          <path d="M82 50 L12 -5" fill="none" stroke={p.primary} strokeOpacity="0.30" strokeWidth="1" />
        </g>

        {/* sparkles */}
        <circle cx="90" cy="90" r="2" fill={p.glow} opacity="0.45" />
        <circle cx="220" cy="72" r="1.6" fill={p.pop} opacity="0.40" />
        <circle cx="320" cy="110" r="1.8" fill={p.spark} opacity="0.42" />
        <circle cx="560" cy="70" r="1.6" fill={p.flame} opacity="0.38" />
        <circle cx="640" cy="120" r="1.5" fill={p.surge} opacity="0.36" />
        <circle cx="812" cy="132" r="1.8" fill={p.gold} opacity="0.38" />
        <circle cx="840" cy="310" r="1.7" fill={p.glow} opacity="0.34" />
        <circle cx="120" cy="505" r="1.6" fill={p.pop} opacity="0.34" />
      </g>
    </svg>
  );
}

export default SvgInvites;
