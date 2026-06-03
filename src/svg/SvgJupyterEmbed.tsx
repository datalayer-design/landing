/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Jupyter Embed — layers + browser window SVG illustration.
 */

import { type ColorPalette, useColorPalette, SharedDefs, BgGrid } from '@datalayer/primer-addons';

export function SvgJupyterEmbed({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  return (
    <svg
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <SharedDefs p={p} />
      <rect width="800" height="400" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
      <BgGrid />

      {/* Three abstract data-layer bands (logo motif) — 5-color vivid */}
      <rect x="80" y="44" width="640" height="5" rx="2.5" fill={p.blaze} opacity="0.16" />
      <rect x="70" y="52" width="660" height="5" rx="2.5" fill={p.glow} opacity="0.18" />
      <rect x="60" y="60" width="680" height="6" rx="3" fill={p.pop} opacity="0.22" />
      <rect x="50" y="69" width="700" height="6" rx="3" fill={p.spark} opacity="0.25" />
      <rect x="40" y="78" width="720" height="6" rx="3" fill={p.surge} opacity="0.28" />

      {/* Browser window frame */}
      <rect x="160" y="110" width="480" height="260" rx="12" fill={p.bgPanel} stroke={p.primary} strokeOpacity="0.2" strokeWidth="1" />
      {/* Title bar */}
      <rect x="160" y="110" width="480" height="32" rx="12" fill={p.bgAlt} />
      <rect x="160" y="130" width="480" height="12" fill={p.bgAlt} />
      <circle cx="182" cy="126" r="5" fill="#f85149" opacity="0.7" />
      <circle cx="198" cy="126" r="5" fill="#e3b341" opacity="0.7" />
      <circle cx="214" cy="126" r="5" fill={p.accent} opacity="0.7" />

      {/* Code cell area */}
      <rect x="184" y="156" width="432" height="28" rx="4" fill={p.primary} opacity="0.07" />
      <text x="196" y="175" fontFamily="monospace" fontSize="12" fill={p.primary} opacity="0.8">
        print("Hello from Jupyter!")
      </text>
      {/* Output area */}
      <rect x="184" y="192" width="432" height="24" rx="4" fill={p.bg} />
      <text x="196" y="208" fontFamily="monospace" fontSize="11" fill={p.accent} opacity="0.7">
        Hello from Jupyter!
      </text>

      {/* Notebook cell outlines */}
      <rect x="184" y="228" width="432" height="40" rx="4" fill="none" stroke={p.secondary} strokeOpacity="0.15" strokeWidth="1" />
      <rect x="184" y="278" width="432" height="40" rx="4" fill="none" stroke={p.secondary} strokeOpacity="0.10" strokeWidth="1" />
      <rect x="184" y="328" width="432" height="28" rx="4" fill="none" stroke={p.secondary} strokeOpacity="0.06" strokeWidth="1" />

      {/* Floating connection lines — vivid */}
      <line x1="80" y1="200" x2="160" y2="200" stroke={p.blaze} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="640" y1="240" x2="720" y2="240" stroke={p.surge} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Vivid glow nodes — red left, blue right */}
      <circle cx="70" cy="200" r="26" fill="url(#glowBlaze)" />
      <circle cx="70" cy="200" r="5" fill={p.blaze} opacity="0.9" />
      <circle cx="730" cy="240" r="22" fill="url(#glowSurge)" />
      <circle cx="730" cy="240" r="4" fill={p.surge} opacity="0.9" />

      {/* Warm vivid accents — orange & yellow */}
      <circle cx="760" cy="110" r="18" fill="url(#glowFlame)" />
      <circle cx="760" cy="110" r="3" fill={p.flame} opacity="0.85" />
      <circle cx="40" cy="340" r="16" fill="url(#glowGold)" />
      <circle cx="40" cy="340" r="2.8" fill={p.gold} opacity="0.85" />

      {/* Spark accents — warm & cool halos */}
      <circle cx="680" cy="80" r="14" fill="url(#glowSpark)" />
      <circle cx="680" cy="80" r="2.5" fill={p.spark} opacity="0.8" />
      <circle cx="120" cy="340" r="12" fill="url(#glowVivid)" opacity="0.6" />
      <circle cx="140" cy="100" r="10" fill="url(#glowBlaze)" opacity="0.45" />
      <circle cx="660" cy="340" r="10" fill="url(#glowSurge)" opacity="0.45" />

      {/* Side labels */}
      <text x="44" y="204" fontFamily="sans-serif" fontSize="9" fill={p.blaze} opacity="0.7" textAnchor="middle">
        Kernel
      </text>
      <text x="756" y="244" fontFamily="sans-serif" fontSize="9" fill={p.surge} opacity="0.7" textAnchor="middle">
        Output
      </text>
      </g>
    </svg>
  );
}
