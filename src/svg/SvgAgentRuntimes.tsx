/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Agent Runtimes — multi-protocol architecture SVG illustration.
 */

import { type ColorPalette, useColorPalette, SharedDefs, BgGrid } from '@datalayer/primer-addons';

export function SvgAgentRuntimes({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
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

      {/* Three-layer bands — 7-color vivid */}
      <rect x="0" y="374" width="800" height="2" fill={p.flame} opacity="0.10" />
      <rect x="0" y="376" width="800" height="3" fill={p.blaze} opacity="0.12" />
      <rect x="0" y="380" width="800" height="4" fill={p.glow} opacity="0.14" />
      <rect x="0" y="385" width="800" height="4" fill={p.pop} opacity="0.18" />
      <rect x="0" y="390" width="800" height="5" fill={p.spark} opacity="0.22" />
      <rect x="0" y="396" width="800" height="4" fill={p.surge} opacity="0.26" />
      <rect x="0" y="398" width="800" height="2" fill={p.gold} opacity="0.14" />

      {/* Central agent node — vivid halo */}
      <circle cx="400" cy="200" r="70" fill="url(#glowVivid)" />
      <circle cx="400" cy="200" r="44" fill={p.bgPanel} stroke={p.glow} strokeOpacity="0.6" strokeWidth="2" />
      <circle cx="400" cy="200" r="6" fill={p.glow} opacity="0.7" />
      <text x="400" y="196" fontFamily="sans-serif" fontSize="11" fill={p.glow} textAnchor="middle" fontWeight="600">
        Agent
      </text>
      <text x="400" y="210" fontFamily="sans-serif" fontSize="9" fill={p.textMuted} textAnchor="middle">
        Runtime
      </text>

      {/* Protocol nodes — ring around agent, vivid glows (5-color) */}
      {[
        { x: 140, y: 100, label: 'AG-UI', glowId: 'glowBlaze', color: 'blaze' as const },
        { x: 660, y: 100, label: 'Vercel AI', glowId: 'glowSurge', color: 'surge' as const },
        { x: 140, y: 300, label: 'A2A', glowId: 'glowSpark', color: 'spark' as const },
        { x: 660, y: 300, label: 'ACP', glowId: 'glowVivid', color: 'glow' as const },
        { x: 400, y: 56, label: 'MCP', glowId: 'glowPop', color: 'pop' as const },
      ].map((n, i) => (
        <g key={i}>
          <line
            x1="400" y1="200"
            x2={n.x} y2={n.y}
            stroke={p[n.color]} strokeOpacity="0.35" strokeWidth="1.2"
            strokeDasharray="6 4"
          />
          <circle cx={n.x} cy={n.y} r="30" fill={`url(#${n.glowId})`} opacity="0.6" />
          <rect
            x={n.x - 40} y={n.y - 16}
            width="80" height="32" rx="6"
            fill={p.bgAlt} stroke={p[n.color]} strokeOpacity="0.4" strokeWidth="1"
          />
          <text
            x={n.x} y={n.y + 4}
            fontFamily="sans-serif" fontSize="10" fill={p.textLight} opacity="0.8"
            textAnchor="middle"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* MCP tool nodes (bottom row) — vivid 5-color */}
      {[
        { x: 220, y: 350, label: 'Tavily', color: p.blaze, glowId: 'glowBlaze' },
        { x: 340, y: 350, label: 'LinkedIn', color: p.surge, glowId: 'glowSurge' },
        { x: 460, y: 350, label: 'GitHub', color: p.glow, glowId: 'glowVivid' },
        { x: 580, y: 350, label: 'Slack', color: p.spark, glowId: 'glowSpark' },
      ].map((t, i) => (
        <g key={`tool-${i}`}>
          <line
            x1={t.x} y1={t.y - 16}
            x2="400" y2="244"
            stroke={t.color} strokeOpacity="0.3" strokeWidth="1"
          />
          <circle cx={t.x} cy={t.y} r="20" fill={`url(#${t.glowId})`} opacity="0.5" />
          <rect
            x={t.x - 32} y={t.y - 12}
            width="64" height="24" rx="4"
            fill={p.bgAlt} stroke={t.color} strokeOpacity="0.35" strokeWidth="1"
          />
          <text
            x={t.x} y={t.y + 3}
            fontFamily="monospace" fontSize="9" fill={t.color} opacity="0.85"
            textAnchor="middle"
          >
            {t.label}
          </text>
        </g>
      ))}
      </g>
    </svg>
  );
}
