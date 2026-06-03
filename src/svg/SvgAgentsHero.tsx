/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, abstract SVG hero background for AI agents pages.
 *
 * Inspired by SvgPrivacyHero colour dynamics, but with an AI-agents motif:
 * - central orchestrator core
 * - specialist agent nodes (tools/memory/model/planner)
 * - signal lanes and token streams
 * - side swarms to evoke multi-agent collaboration
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgAgentsHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const accentA = p.isLight ? p.surge : p.flame;
  const accentB = p.isLight ? p.spark : p.gold;
  const accentC = p.isLight ? p.pop : p.blaze;
  const leftGlow = p.isLight ? p.surge : p.pop;
  const rightGlow = p.isLight ? p.glow : p.surge;
  const tokenLeft = p.isLight ? p.surge : p.pop;
  const tokenRight = p.isLight ? p.spark : p.surge;
  const connectorOpacityLeft = p.isLight ? 0.78 : 0.20;
  const connectorOpacityRight = p.isLight ? 0.50 : 0.20;
  const swarmConnectorOpacityLeft = p.isLight ? 0.52 : 0.08;
  const swarmConnectorOpacityRight = p.isLight ? 0.26 : 0.08;
  const pathConnectorOpacity = p.isLight ? 0.24 : 0.11;
  const connectorStrokeWidthLeft = p.isLight ? 1.45 : 1.0;
  const connectorStrokeWidthRight = p.isLight ? 1.2 : 1.0;
  const swarmConnectorStrokeWidthLeft = p.isLight ? 1.2 : 0.8;
  const swarmConnectorStrokeWidthRight = p.isLight ? 0.9 : 0.8;
  const pathConnectorStrokeWidth = p.isLight ? 1.25 : 1.0;
  const nodeLabelFontSize = 15;
  const nodeLabelOpacity = p.isLight ? 0.82 : 0.46;

  const ringNodes = [
    { x: 700, y: 78, label: 'MODEL', c: p.surge },
    { x: 830, y: 140, label: 'TOOLS', c: p.pop },
    { x: 865, y: 250, label: 'MEM', c: p.spark },
    { x: 770, y: 335, label: 'SKILLS', c: accentA },
    { x: 630, y: 335, label: 'EVAL', c: accentB },
    { x: 535, y: 250, label: 'GUARD', c: accentC },
    { x: 570, y: 140, label: 'MCP', c: p.glow },
  ];

  const leftSwarm = [
    [170, 105], [220, 140], [190, 190], [250, 220], [185, 265], [240, 300],
  ];
  const rightSwarm = [
    [1230, 105], [1180, 140], [1210, 190], [1150, 220], [1215, 265], [1160, 300],
  ];

  return (
    <svg
      viewBox="0 0 1400 420"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        <radialGradient id="agCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.36" />
          <stop offset="55%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        <radialGradient id="agGlowCore" cx="50%" cy="48%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.56" />
          <stop offset="35%" stopColor={p.glow} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="agGlowLeft" cx="18%" cy="30%" r="42%">
          <stop offset="0%" stopColor={leftGlow} stopOpacity="0.40" />
          <stop offset="48%" stopColor={leftGlow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={leftGlow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="agGlowRight" cx="82%" cy="30%" r="42%">
          <stop offset="0%" stopColor={rightGlow} stopOpacity="0.40" />
          <stop offset="48%" stopColor={rightGlow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={rightGlow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="agGlowBottomLeft" cx="22%" cy="78%" r="40%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.34" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="agGlowBottomRight" cx="78%" cy="78%" r="40%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.34" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="agGlowTop" cx="50%" cy="8%" r="38%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.30" />
          <stop offset="52%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="agShimmer" x1="0.05" y1="0.92" x2="0.95" y2="0.08">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0" />
          <stop offset="22%" stopColor={p.surge} stopOpacity="0.12" />
          <stop offset="44%" stopColor={p.glow} stopOpacity="0.16" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="78%" stopColor={p.glow} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </linearGradient>

        <pattern id="agDots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill={p.glow} opacity="0.09" />
        </pattern>
        <pattern id="agGrid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0H0V42" fill="none" stroke={p.glow} strokeOpacity="0.05" strokeWidth="0.7" />
        </pattern>
        <pattern id="agTriMesh" width="48" height="42" patternUnits="userSpaceOnUse" patternTransform="rotate(5)">
          <polygon points="24,0 48,42 0,42" fill="none" stroke={p.glow} strokeOpacity="0.045" strokeWidth="0.45" />
          <polygon points="24,42 48,0 0,0" fill="none" stroke={p.surge} strokeOpacity="0.03" strokeWidth="0.35" />
        </pattern>
        <pattern id="agRings" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="19" fill="none" stroke={p.surge} strokeOpacity="0.03" strokeWidth="0.35" />
          <circle cx="30" cy="30" r="10" fill="none" stroke={p.glow} strokeOpacity="0.025" strokeWidth="0.3" />
        </pattern>

        <linearGradient id="agLane" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.isLight ? p.surge : p.pop} stopOpacity="0" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.20" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1400" height="420" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        <rect width="1400" height="420" fill="url(#agDots)" />
        <rect width="1400" height="420" fill="url(#agGrid)" />
        <rect width="1400" height="420" fill="url(#agTriMesh)" />
        <rect width="1400" height="420" fill="url(#agRings)" />
        <rect width="1400" height="420" fill="url(#agGlowCore)" />
        <rect width="1400" height="420" fill="url(#agGlowLeft)" />
        <rect width="1400" height="420" fill="url(#agGlowRight)" />
        <rect width="1400" height="420" fill="url(#agGlowBottomLeft)" />
        <rect width="1400" height="420" fill="url(#agGlowBottomRight)" />
        <rect width="1400" height="420" fill="url(#agGlowTop)" />
        <rect width="1400" height="420" fill="url(#agShimmer)" />

        <line x1="120" y1="210" x2="1280" y2="210" stroke="url(#agLane)" strokeWidth="26" />

        <circle cx="700" cy="210" r="150" fill="none" stroke={p.glow} strokeOpacity="0.10" strokeWidth="1.4" strokeDasharray="8 6" />
        <circle cx="700" cy="210" r="116" fill="none" stroke={p.primary} strokeOpacity="0.12" strokeWidth="1.2" strokeDasharray="5 4" />
        <circle cx="700" cy="210" r="82" fill="none" stroke={p.primary} strokeOpacity="0.18" strokeWidth="1.0" />

        <circle cx="700" cy="210" r="150" fill="url(#agCenterGlow)" />
        <circle
          cx="700"
          cy="210"
          r="64"
          fill="none"
          stroke={p.primary}
          strokeOpacity="0.28"
          strokeWidth="1.4"
        />
        <circle cx="700" cy="210" r="28" fill={p.glow} opacity="0.16" />

        {ringNodes.map((node, i) => (
          <g key={node.label}>
            <line
              x1="700"
              y1="210"
              x2={node.x}
              y2={node.y}
              stroke={node.c}
              strokeOpacity={node.x < 700 ? connectorOpacityLeft : connectorOpacityRight}
              strokeWidth={node.x < 700 ? connectorStrokeWidthLeft : connectorStrokeWidthRight}
              strokeDasharray={i % 2 === 0 ? '4 4' : '6 5'}
            />
            <circle cx={node.x} cy={node.y} r="8" fill={node.c} opacity="0.42" />
            <circle cx={node.x} cy={node.y} r="16" fill={node.c} opacity="0.08" />
            <text
              x={node.x + 12}
              y={node.y + 3}
              fill={node.c}
              opacity={nodeLabelOpacity}
              fontSize={nodeLabelFontSize}
              fontWeight={700}
              fontFamily="monospace"
            >
              {node.label}
            </text>
          </g>
        ))}

        {leftSwarm.map(([x, y], i) => (
          <g key={`ls-${i}`}>
            <circle cx={x} cy={y} r="6" fill={p.pop} opacity={0.22 + (i % 2) * 0.07} />
            <circle cx={x} cy={y} r="14" fill={p.pop} opacity="0.05" />
            <line x1={x} y1={y} x2="700" y2="210" stroke={p.pop} strokeOpacity={swarmConnectorOpacityLeft} strokeWidth={swarmConnectorStrokeWidthLeft} />
          </g>
        ))}
        {rightSwarm.map(([x, y], i) => (
          <g key={`rs-${i}`}>
            <circle cx={x} cy={y} r="6" fill={p.surge} opacity={0.22 + (i % 2) * 0.07} />
            <circle cx={x} cy={y} r="14" fill={p.surge} opacity="0.05" />
            <line x1={x} y1={y} x2="700" y2="210" stroke={p.surge} strokeOpacity={swarmConnectorOpacityRight} strokeWidth={swarmConnectorStrokeWidthRight} />
          </g>
        ))}

        {[90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map((y, i) => (
          <text key={`tok-l-${i}`} x="80" y={y} fill={tokenLeft} opacity={0.05 + (i % 3) * 0.02} fontSize="7.5" fontFamily="monospace">
            {['A1', '7F', '3C', 'D2', '8B', 'E9', '41', 'C7', '5A', '0E'][i]}
          </text>
        ))}
        {[75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((y, i) => (
          <text key={`tok-r-${i}`} x="1280" y={y} fill={tokenRight} opacity={0.05 + (i % 3) * 0.02} fontSize="7.5" fontFamily="monospace">
            {['9D', '24', 'B0', '6E', 'FA', '13', 'C5', '7A', 'E2', '48'][i]}
          </text>
        ))}

        {!p.isLight && (
          <path d="M120 320 C260 240, 420 260, 560 180" fill="none" stroke={p.blaze} strokeOpacity={pathConnectorOpacity} strokeWidth={pathConnectorStrokeWidth} strokeDasharray="5 5" />
        )}
        <path d="M840 170 C980 90, 1140 110, 1280 40" fill="none" stroke={accentB} strokeOpacity={pathConnectorOpacity} strokeWidth={pathConnectorStrokeWidth} strokeDasharray="5 5" />

        <circle cx="58" cy="58" r="1.5" fill={p.glow} opacity="0.45" />
        <circle cx="240" cy="372" r="1.7" fill={p.pop} opacity="0.42" />
        <circle cx="480" cy="52" r="1.4" fill={p.spark} opacity="0.46" />
        <circle cx="930" cy="52" r="1.6" fill={p.surge} opacity="0.45" />
        <circle cx="1160" cy="356" r="1.6" fill={accentA} opacity="0.40" />
        <circle cx="1342" cy="336" r="1.3" fill={accentB} opacity="0.40" />

        <line x1="180" y1="0" x2="640" y2="420" stroke={p.glow} strokeOpacity="0.07" strokeWidth="34" />
        <line x1="560" y1="0" x2="1040" y2="420" stroke={p.surge} strokeOpacity="0.06" strokeWidth="28" />
        <line x1="920" y1="0" x2="1400" y2="360" stroke={p.isLight ? p.surge : p.pop} strokeOpacity="0.06" strokeWidth="30" />
      </g>
    </svg>
  );
}
