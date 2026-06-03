/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG hero background for the Research / Paper page.
 *
 * Visual motif: a rich, layered data–science landscape merging code and
 * empirical analysis.  Left side shows a stylised code-editor card (Codemode).
 * Centre features an abstract neural-network graph with animated data-flow
 * pulses.  Right side shows a floating eval-metrics dashboard.  The background
 * uses a hexagonal grid, multiple gradient orbs, and animated aurora bands
 * for a polished, "shiny" look.
 *
 * Uses a 1400 × 380 viewBox to match the hero's minHeight.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgResearchHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <svg
      viewBox="0 0 1400 380"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* ── Aurora / gradient mesh ── */}
        <linearGradient id="rh_aurora1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.25" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0.20" />
        </linearGradient>
        <linearGradient id="rh_aurora2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.18" />
          <stop offset="50%" stopColor={p.flame} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0.15" />
        </linearGradient>

        {/* Glowing orbs */}
        <radialGradient id="rh_orb1" cx="20%" cy="40%" r="35%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.40" />
          <stop offset="60%" stopColor={p.glow} stopOpacity="0.08" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rh_orb2" cx="60%" cy="30%" r="30%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.35" />
          <stop offset="55%" stopColor={p.surge} stopOpacity="0.06" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rh_orb3" cx="85%" cy="55%" r="32%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.32" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.05" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rh_orb4" cx="45%" cy="70%" r="28%">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0.28" />
          <stop offset="60%" stopColor={p.spark} stopOpacity="0.04" />
          <stop offset="100%" stopColor={p.spark} stopOpacity="0" />
        </radialGradient>

        {/* Hexagonal grid */}
        <pattern id="rh_hex" width="30" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <polygon points="15,1 28,9 28,25 15,33 2,25 2,9" fill="none" stroke={p.primary} strokeWidth="0.3" strokeOpacity="0.06" />
          <polygon points="15,27 28,35 28,51 15,59 2,51 2,35" fill="none" stroke={p.primary} strokeWidth="0.3" strokeOpacity="0.04" />
        </pattern>

        {/* Shimmer gradient for aurora band */}
        <linearGradient id="rh_shimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.12;0" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.08">
            <animate attributeName="stopOpacity" values="0.08;0.20;0.08" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor={p.surge} stopOpacity="0">
            <animate attributeName="stopOpacity" values="0;0.10;0" dur="6s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Code editor glow */}
        <filter id="rh_glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="rh_softGlow">
          <feGaussianBlur stdDeviation="12" />
        </filter>

        {/* Dashed line pattern for data flow */}
        <linearGradient id="rh_flowGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.5" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ═══ BASE ═══ */}
      <rect width="1400" height="380" fill={p.bg} />

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        {/* Hex grid underlay */}
        <rect width="1400" height="380" fill="url(#rh_hex)" />

        {/* Aurora gradient bands */}
        <rect width="1400" height="380" fill="url(#rh_aurora1)" opacity="0.7" />
        <rect width="1400" height="380" fill="url(#rh_aurora2)" opacity="0.5" />

        {/* Animated shimmer band */}
        <rect y="100" width="1400" height="180" fill="url(#rh_shimmer)" />

        {/* Bokeh orbs */}
        <rect width="1400" height="380" fill="url(#rh_orb1)" />
        <rect width="1400" height="380" fill="url(#rh_orb2)" />
        <rect width="1400" height="380" fill="url(#rh_orb3)" />
        <rect width="1400" height="380" fill="url(#rh_orb4)" />

        {/* ═══ LEFT: Codemode Editor Card ═══ */}
        <g opacity="0.65" transform="translate(60, 60)">
          {/* Card shadow */}
          <rect x="4" y="4" width="240" height="155" rx="10" fill={p.primary} opacity="0.06" filter="url(#rh_softGlow)" />
          {/* Card body */}
          <rect width="240" height="155" rx="10" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.7" strokeOpacity="0.2" />
          {/* Title bar */}
          <rect width="240" height="24" rx="10" fill={p.bgAlt} />
          <rect y="12" width="240" height="12" fill={p.bgAlt} />
          {/* Traffic lights */}
          <circle cx="16" cy="12" r="3.5" fill={p.blaze} opacity="0.7" />
          <circle cx="28" cy="12" r="3.5" fill={p.gold} opacity="0.7" />
          <circle cx="40" cy="12" r="3.5" fill={p.glow} opacity="0.7" />
          {/* Tab label */}
          <rect x="60" y="8" width="45" height="8" rx="2" fill={p.glow} opacity="0.15" />
          <rect x="112" y="8" width="35" height="8" rx="2" fill={p.primary} opacity="0.08" />
          {/* Code lines */}
          <rect x="16" y="36" width="12" height="5" rx="1.5" fill={p.surge} opacity="0.4" />
          <rect x="34" y="36" width="65" height="5" rx="1.5" fill={p.glow} opacity="0.3" />
          <rect x="105" y="36" width="40" height="5" rx="1.5" fill={p.textMuted} opacity="0.15" />

          <rect x="16" y="48" width="18" height="5" rx="1.5" fill={p.surge} opacity="0.35" />
          <rect x="40" y="48" width="90" height="5" rx="1.5" fill={p.textMuted} opacity="0.12" />

          {/* Highlighted active line (Codemode) */}
          <rect x="8" y="60" width="224" height="18" rx="3" fill={p.glow} opacity="0.06" />
          <rect x="16" y="65" width="8" height="5" rx="1.5" fill={p.spark} opacity="0.5" />
          <rect x="30" y="65" width="55" height="5" rx="1.5" fill={p.glow} opacity="0.5" />
          <rect x="90" y="65" width="30" height="5" rx="1.5" fill={p.surge} opacity="0.4" />
          <rect x="126" y="65" width="70" height="5" rx="1.5" fill={p.spark} opacity="0.3" />
          {/* Blinking cursor */}
          <rect x="200" y="63" width="2" height="10" rx="1" fill={p.glow} opacity="0.8">
            <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite" />
          </rect>

          <rect x="16" y="84" width="25" height="5" rx="1.5" fill={p.surge} opacity="0.3" />
          <rect x="47" y="84" width="48" height="5" rx="1.5" fill={p.textMuted} opacity="0.12" />
          <rect x="101" y="84" width="55" height="5" rx="1.5" fill={p.glow} opacity="0.2" />

          <rect x="16" y="96" width="15" height="5" rx="1.5" fill={p.surge} opacity="0.25" />
          <rect x="37" y="96" width="85" height="5" rx="1.5" fill={p.textMuted} opacity="0.10" />

          {/* Output / result indicator */}
          <rect x="12" y="112" width="216" height="30" rx="4" fill={p.glow} opacity="0.04" />
          <rect x="20" y="120" width="8" height="5" rx="1.5" fill={p.glow} opacity="0.6" />
          <text x="34" y="126" fontSize="7" fill={p.glow} opacity="0.5" fontFamily="monospace">DataFrame [1247 × 8]</text>
          <rect x="20" y="132" width="80" height="4" rx="1" fill={p.surge} opacity="0.15" />
          <rect x="106" y="132" width="50" height="4" rx="1" fill={p.glow} opacity="0.12" />
        </g>

        {/* ═══ CENTER: Neural Network / Research Graph ═══ */}
        {/* Network nodes */}
        {[
          { cx: 500, cy: 120, r: 6, color: p.glow,  op: 0.5 },
          { cx: 620, cy: 80,  r: 5, color: p.surge,   op: 0.45 },
          { cx: 700, cy: 190, r: 10, color: p.spark, op: 0.6 },   /* Central node */
          { cx: 780, cy: 100, r: 5, color: p.surge,  op: 0.4 },
          { cx: 850, cy: 170, r: 6, color: p.glow,   op: 0.45 },
          { cx: 580, cy: 200, r: 5, color: p.flame,  op: 0.4 },
          { cx: 660, cy: 280, r: 5, color: p.surge,    op: 0.35 },
          { cx: 750, cy: 270, r: 6, color: p.surge,  op: 0.4 },
          { cx: 530, cy: 300, r: 4, color: p.gold,   op: 0.35 },
          { cx: 870, cy: 280, r: 4, color: p.spark,  op: 0.3 },
        ].map((n, i) => (
          <g key={`node-${i}`}>
            {/* Glow halo */}
            <circle cx={n.cx} cy={n.cy} r={n.r * 3} fill={n.color} opacity={n.op * 0.15} />
            {/* Node ring */}
            <circle cx={n.cx} cy={n.cy} r={n.r} fill="none" stroke={n.color} strokeWidth="1" strokeOpacity={n.op * 0.6} />
            {/* Node core */}
            <circle cx={n.cx} cy={n.cy} r={n.r * 0.5} fill={n.color} opacity={n.op}>
              <animate attributeName="opacity" values={`${n.op};${n.op * 0.5};${n.op}`} dur={`${3 + i * 0.7}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Network connections */}
        {[
          { x1: 500, y1: 120, x2: 620, y2: 80 },
          { x1: 500, y1: 120, x2: 580, y2: 200 },
          { x1: 620, y1: 80,  x2: 700, y2: 190 },
          { x1: 620, y1: 80,  x2: 780, y2: 100 },
          { x1: 700, y1: 190, x2: 780, y2: 100 },
          { x1: 700, y1: 190, x2: 850, y2: 170 },
          { x1: 700, y1: 190, x2: 580, y2: 200 },
          { x1: 700, y1: 190, x2: 660, y2: 280 },
          { x1: 700, y1: 190, x2: 750, y2: 270 },
          { x1: 850, y1: 170, x2: 870, y2: 280 },
          { x1: 580, y1: 200, x2: 530, y2: 300 },
          { x1: 580, y1: 200, x2: 660, y2: 280 },
          { x1: 750, y1: 270, x2: 870, y2: 280 },
        ].map((l, i) => (
          <line
            key={`conn-${i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={p.primary}
            strokeWidth="0.6"
            strokeOpacity="0.12"
            strokeDasharray="4 4"
          >
            <animate attributeName="strokeDashoffset" from="0" to="-16" dur={`${4 + i * 0.3}s`} repeatCount="indefinite" />
          </line>
        ))}

        {/* Central node special treatment (sweet spot) */}
        <circle cx="700" cy="190" r="22" fill={p.spark} opacity="0.06">
          <animate attributeName="r" values="22;28;22" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.06;0.12;0.06" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* Travelling data pulses along connections */}
        <circle r="2.5" fill={p.glow} opacity="0.7">
          <animateMotion path="M500,120 L620,80 L700,190 L850,170" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill={p.surge} opacity="0.6">
          <animateMotion path="M580,200 L700,190 L780,100 L620,80" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill={p.surge} opacity="0.5">
          <animateMotion path="M700,190 L660,280 L530,300 L580,200 L500,120" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle r="1.8" fill={p.spark} opacity="0.6">
          <animateMotion path="M700,190 L750,270 L870,280 L850,170 L700,190" dur="7s" repeatCount="indefinite" />
        </circle>

        {/* Floating annotation labels near graph */}
        <g opacity="0.4">
          <text x="700" y="224" textAnchor="middle" fontSize="7" fill={p.spark} fontFamily="system-ui" fontWeight="bold">Pareto optimal</text>
        </g>
        <g opacity="0.3">
          <text x="505" y="110" fontSize="6" fill={p.glow} fontFamily="monospace">tokens</text>
          <text x="855" y="162" fontSize="6" fill={p.glow} fontFamily="monospace">latency</text>
          <text x="660" y="296" fontSize="6" fill={p.surge} fontFamily="monospace">cost</text>
        </g>

        {/* ═══ RIGHT: Eval Metrics Dashboard ═══ */}
        <g opacity="0.6" transform="translate(1060, 80)">
          {/* Card shadow */}
          <rect x="4" y="4" width="260" height="210" rx="10" fill={p.primary} opacity="0.05" filter="url(#rh_softGlow)" />
          {/* Card body */}
          <rect width="260" height="210" rx="10" fill={p.bgPanel} stroke={p.primary} strokeWidth="0.6" strokeOpacity="0.18" />
          {/* Header */}
          <rect width="260" height="22" rx="10" fill={p.bgAlt} />
          <rect y="10" width="260" height="12" fill={p.bgAlt} />
          <rect x="12" y="7" width="55" height="6" rx="2" fill={p.primary} opacity="0.15" />
          <rect x="74" y="7" width="30" height="6" rx="2" fill={p.glow} opacity="0.12" />

          {/* Metric row 1: Task Completion */}
          <text x="14" y="42" fontSize="6" fill={p.textMuted} opacity="0.5" fontFamily="system-ui">Task Completion</text>
          <rect x="14" y="48" width="180" height="6" rx="3" fill={p.primary} opacity="0.08" />
          <rect x="14" y="48" width="158" height="6" rx="3" fill={p.glow} opacity="0.35">
            <animate attributeName="width" values="158;162;158" dur="4s" repeatCount="indefinite" />
          </rect>
          <text x="200" y="54" fontSize="7" fill={p.glow} opacity="0.6" fontFamily="monospace" fontWeight="bold">87.6%</text>

          {/* Metric row 2: Token Efficiency */}
          <text x="14" y="72" fontSize="6" fill={p.textMuted} opacity="0.5" fontFamily="system-ui">Token Efficiency</text>
          <rect x="14" y="78" width="180" height="6" rx="3" fill={p.primary} opacity="0.08" />
          <rect x="14" y="78" width="143" height="6" rx="3" fill={p.surge} opacity="0.35">
            <animate attributeName="width" values="143;148;143" dur="5s" repeatCount="indefinite" />
          </rect>
          <text x="200" y="84" fontSize="7" fill={p.surge} opacity="0.6" fontFamily="monospace" fontWeight="bold">79.4%</text>

          {/* Metric row 3: Hallucination Rate */}
          <text x="14" y="102" fontSize="6" fill={p.textMuted} opacity="0.5" fontFamily="system-ui">Hallucination Rate</text>
          <rect x="14" y="108" width="180" height="6" rx="3" fill={p.primary} opacity="0.08" />
          <rect x="14" y="108" width="14" height="6" rx="3" fill={p.blaze} opacity="0.35" />
          <text x="200" y="114" fontSize="7" fill={p.blaze} opacity="0.6" fontFamily="monospace" fontWeight="bold">2.1%</text>

          {/* Mini spark-line chart */}
          <text x="14" y="134" fontSize="6" fill={p.textMuted} opacity="0.5" fontFamily="system-ui">Accuracy vs Reduction</text>
          <polyline
            points="14,170 40,168 66,166 92,164 118,162 144,158 170,152 196,140"
            fill="none" stroke={p.glow} strokeWidth="1.5" strokeOpacity="0.5"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <polyline
            points="14,170 40,170 66,168 92,164 118,156 144,148 170,142 196,140"
            fill="none" stroke={p.surge} strokeWidth="1" strokeOpacity="0.3"
            strokeDasharray="3 2"
          />
          {/* Chart area fill */}
          <polygon
            points="14,170 40,168 66,166 92,164 118,162 144,158 170,152 196,140 196,182 14,182"
            fill={p.glow} opacity="0.04"
          />
          {/* X-axis */}
          <line x1="14" y1="182" x2="232" y2="182" stroke={p.primary} strokeWidth="0.4" strokeOpacity="0.1" />
          {/* Sweet-spot marker */}
          <circle cx="144" cy="158" r="4" fill={p.spark} opacity="0.4" stroke={p.spark} strokeWidth="0.8" strokeOpacity="0.4">
            <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="144" cy="158" r="2" fill={p.spark} opacity="0.7" />

          {/* Tier labels */}
          <text x="35" y="196" fontSize="5" fill={p.textMuted} opacity="0.3" fontFamily="monospace">prompt</text>
          <text x="100" y="196" fontSize="5" fill={p.textMuted} opacity="0.3" fontFamily="monospace">RAG</text>
          <text x="168" y="196" fontSize="5" fill={p.textMuted} opacity="0.3" fontFamily="monospace">codemode</text>
        </g>

        {/* ═══ DATA FLOW LINES (editor → graph → dashboard) ═══ */}
        <path
          d="M300 140 C 400 140, 430 130, 500 120"
          fill="none" stroke={p.glow} strokeWidth="0.8" strokeOpacity="0.15"
          strokeDasharray="6 4"
        >
          <animate attributeName="strokeDashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite" />
        </path>
        <path
          d="M850 170 C 920 165, 980 140, 1060 130"
          fill="none" stroke={p.surge} strokeWidth="0.8" strokeOpacity="0.15"
          strokeDasharray="6 4"
        >
          <animate attributeName="strokeDashoffset" from="0" to="-20" dur="3.5s" repeatCount="indefinite" />
        </path>

        {/* ═══ FLOATING PARTICLES ═══ */}
        {[
          { cx: 40,   cy: 50,  r: 2,   color: p.flame, dur: 4,    op: 0.3 },
          { cx: 380,  cy: 30,  r: 1.5, color: p.glow,  dur: 5,    op: 0.25 },
          { cx: 450,  cy: 330, r: 2,   color: p.gold,  dur: 3.5,  op: 0.3 },
          { cx: 960,  cy: 50,  r: 2.5, color: p.spark, dur: 4.5,  op: 0.25 },
          { cx: 1000, cy: 330, r: 2,   color: p.blaze, dur: 5.5,  op: 0.2 },
          { cx: 1370, cy: 40,  r: 1.5, color: p.glow,  dur: 6,    op: 0.2 },
          { cx: 1350, cy: 350, r: 2,   color: p.surge, dur: 4,    op: 0.25 },
          { cx: 200,  cy: 300, r: 1.5, color: p.surge,   dur: 5,    op: 0.2 },
          { cx: 680,  cy: 40,  r: 1.8, color: p.flame, dur: 3.8,  op: 0.22 },
          { cx: 920,  cy: 340, r: 2,   color: p.gold,  dur: 4.2,  op: 0.2 },
        ].map((pt, i) => (
          <circle key={`pt-${i}`} cx={pt.cx} cy={pt.cy} r={pt.r} fill={pt.color} opacity={pt.op}>
            <animate attributeName="opacity" values={`${pt.op};${pt.op * 0.3};${pt.op}`} dur={`${pt.dur}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* ═══ ORBITING PARTICLES around central node ═══ */}
        <circle r="2" fill={p.glow} opacity="0.5">
          <animateMotion path="M700 190 m-28,0 a28,28 0 1,0 56,0 a28,28 0 1,0 -56,0" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="1.5" fill={p.surge} opacity="0.45">
          <animateMotion path="M700 190 m-20,0 a20,20 0 1,1 40,0 a20,20 0 1,1 -40,0" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle r="2.5" fill={p.spark} opacity="0.3">
          <animateMotion path="M700 190 m-36,0 a36,36 0 1,0 72,0 a36,36 0 1,0 -72,0" dur="12s" repeatCount="indefinite" />
        </circle>

        {/* ═══ BOTTOM WAVEFORM (data signal) ═══ */}
        <path
          d="M0 360 Q 100 350, 200 355 T 400 352 T 600 358 T 800 350 T 1000 356 T 1200 348 T 1400 355"
          fill="none" stroke={p.glow} strokeWidth="0.8" strokeOpacity="0.1"
        />
        <path
          d="M0 365 Q 120 358, 240 362 T 480 356 T 720 364 T 960 354 T 1200 360 T 1400 358"
          fill="none" stroke={p.surge} strokeWidth="0.6" strokeOpacity="0.06"
        />
      </g>
    </svg>
  );
}

export default SvgResearchHero;
