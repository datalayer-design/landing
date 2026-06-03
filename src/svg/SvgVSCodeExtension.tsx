/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * VS Code Extension — IDE composition SVG illustration.
 */

import { type ColorPalette, useColorPalette, SharedDefs, BgGrid } from '@datalayer/primer-addons';

export function SvgVSCodeExtension({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
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

      {/* Three-layer bands at top — 7-color vivid */}
      <rect x="0" y="0" width="800" height="2" fill={p.blaze} opacity="0.10" />
      <rect x="0" y="3" width="800" height="3" fill={p.flame} opacity="0.12" />
      <rect x="0" y="7" width="800" height="3" fill={p.pop} opacity="0.16" />
      <rect x="0" y="11" width="800" height="3" fill={p.glow} opacity="0.20" />
      <rect x="0" y="15" width="800" height="3" fill={p.surge} opacity="0.24" />
      <rect x="0" y="18" width="800" height="2" fill={p.gold} opacity="0.14" />
      <rect x="0" y="21" width="800" height="2" fill={p.spark} opacity="0.12" />

      {/* IDE frame */}
      <rect x="100" y="40" width="600" height="340" rx="10" fill={p.bgPanel} stroke={p.primary} strokeOpacity="0.15" strokeWidth="1" />

      {/* Sidebar */}
      <rect x="100" y="40" width="48" height="340" rx="10" fill={p.bgAlt} />
      <rect x="148" y="40" width="0" height="340" stroke={p.primary} strokeOpacity="0.08" strokeWidth="1" />
      {/* Sidebar icons */}
      {[80, 120, 160, 200, 240].map((y, i) => (
        <rect key={i} x="114" y={y} width="20" height="20" rx="4" fill={p.primary} opacity={0.08 + i * 0.03} />
      ))}

      {/* File explorer pane */}
      <rect x="148" y="40" width="120" height="340" fill={p.bg} />
      {/* File tree lines */}
      {['analysis.dlex', 'notebook.ipynb', 'config.json', 'README.md', 'data.csv'].map((f, i) => (
        <text key={i} x="160" y={80 + i * 22} fontFamily="monospace" fontSize="9" fill={p.textMuted} opacity="0.6">
          {f}
        </text>
      ))}

      {/* Editor area */}
      <rect x="268" y="64" width="420" height="24" fill={p.primary} opacity="0.05" />
      <text x="280" y="80" fontFamily="monospace" fontSize="10" fill={p.primary} opacity="0.4">
        analysis.dlex — Datalayer Document
      </text>

      {/* Document blocks — mixed rich text + code */}
      <rect x="284" y="100" width="380" height="18" rx="3" fill={p.bgAlt} />
      <text x="292" y="113" fontFamily="sans-serif" fontSize="11" fill={p.textLight} opacity="0.7" fontWeight="600">
        Quarterly Data Analysis
      </text>

      <rect x="284" y="126" width="280" height="10" rx="2" fill={p.textMuted} opacity="0.08" />
      <rect x="284" y="140" width="320" height="10" rx="2" fill={p.textMuted} opacity="0.06" />

      {/* Code cell */}
      <rect x="284" y="160" width="380" height="60" rx="6" fill={p.bg} stroke={p.primary} strokeOpacity="0.12" strokeWidth="1" />
      <text x="296" y="178" fontFamily="monospace" fontSize="10" fill={p.primary} opacity="0.7">
        import pandas as pd
      </text>
      <text x="296" y="194" fontFamily="monospace" fontSize="10" fill={p.textMuted} opacity="0.5">
        df = pd.read_csv("data.csv")
      </text>
      <text x="296" y="210" fontFamily="monospace" fontSize="10" fill={p.textMuted} opacity="0.5">
        df.describe()
      </text>

      {/* Output visualization placeholder */}
      <rect x="284" y="230" width="380" height="50" rx="6" fill={p.secondary} opacity="0.06" />
      {/* Chart bars — vivid 7-color */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={304 + i * 44}
          y={260 - (12 + Math.sin(i * 0.8) * 16)}
          width="24"
          height={12 + Math.sin(i * 0.8) * 16}
          rx="2"
          fill={[p.blaze, p.glow, p.surge, p.pop, p.spark, p.flame, p.gold][i % 7]}
          opacity={0.35 + i * 0.06}
        />
      ))}

      {/* Copilot AI sidebar glow — vivid */}
      <rect x="284" y="290" width="380" height="40" rx="6" fill={p.glow} opacity="0.06" />
      <text x="296" y="310" fontFamily="sans-serif" fontSize="9" fill={p.glow} opacity="0.75">
        ✦ AI: The quarterly trend shows a 23% increase...
      </text>
      <text x="296" y="324" fontFamily="sans-serif" fontSize="9" fill={p.textMuted} opacity="0.4">
        Based on columns: revenue, growth_rate, segment
      </text>

      {/* Runtime indicator (bottom-right) — vivid */}
      <circle cx="670" cy="365" r="5" fill={p.pop} opacity="0.9" />
      <circle cx="670" cy="365" r="12" fill="url(#glowPop)" opacity="0.6" />
      <text x="660" y="369" fontFamily="monospace" fontSize="8" fill={p.pop} opacity="0.6" textAnchor="end">
        GPU Runtime
      </text>

      {/* Floating vivid glow accents — 7-color */}
      <circle cx="690" cy="60" r="34" fill="url(#glowBlaze)" />
      <circle cx="690" cy="60" r="5" fill={p.blaze} opacity="0.7" />
      <circle cx="130" cy="360" r="24" fill="url(#glowSurge)" />
      <circle cx="130" cy="360" r="3.5" fill={p.surge} opacity="0.7" />
      <circle cx="400" cy="30" r="16" fill="url(#glowPop)" opacity="0.4" />
      <circle cx="280" cy="50" r="12" fill="url(#glowVivid)" opacity="0.35" />
      <circle cx="520" cy="375" r="10" fill="url(#glowSpark)" opacity="0.35" />
      <circle cx="720" cy="375" r="14" fill="url(#glowFlame)" />
      <circle cx="720" cy="375" r="2.5" fill={p.flame} opacity="0.7" />
      <circle cx="180" cy="32" r="12" fill="url(#glowGold)" />
      <circle cx="180" cy="32" r="2.2" fill={p.gold} opacity="0.7" />
      </g>
    </svg>
  );
}
