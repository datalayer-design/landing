/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Tall SVG illustration for the Join / Sign-up page right panel.
 *
 * Visual motif: a new node "joining" an existing agent network.
 * Five established nodes arranged in an arc, with curved connection
 * lines between them.  A sixth node at the bottom-right pulses with
 * a dashed-stroke invitation arc, representing the user being
 * welcomed into the network.  Concentric rings, dot grid, and
 * gentle animated pulse on the new node reinforce the onboarding
 * metaphor.
 *
 * Uses a 560×700 viewBox — taller than wide, suited for the right
 * column of a 50/50 split layout.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

/* ── Node positions ─────────────────────────────────────────────── */
interface Node {
  x: number;
  y: number;
  label: string;
  colorKey: keyof Pick<ColorPalette, 'glow' | 'pop' | 'spark' | 'blaze' | 'surge' | 'flame' | 'gold'>;
  r: number;
}

const NODES: Node[] = [
  { x: 280, y: 140, label: 'Orchestrator', colorKey: 'glow',  r: 28 },
  { x: 130, y: 260, label: 'Researcher',   colorKey: 'pop',   r: 22 },
  { x: 430, y: 260, label: 'Analyst',      colorKey: 'spark', r: 22 },
  { x: 160, y: 420, label: 'Coder',        colorKey: 'flame', r: 22 },
  { x: 400, y: 420, label: 'Reviewer',     colorKey: 'surge', r: 22 },
  // The "new" node — the user joining
  { x: 280, y: 570, label: 'You',          colorKey: 'gold',  r: 30 },
];

/* Links between established nodes */
const LINKS: [number, number, number][] = [
  [0, 1, -30], [0, 2, 30],
  [1, 3, -20], [2, 4, 20],
  [1, 2, 40],  [3, 4, -40],
  [0, 3, 25],  [0, 4, -25],
];

/* Invitation arcs from the "You" node to existing nodes */
const INVITE_LINKS: [number, number][] = [
  [5, 3], [5, 4], [5, 0],
];

function ctrlPt(ax: number, ay: number, bx: number, by: number, bend: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { cx: mx + (-dy / len) * bend, cy: my + (dx / len) * bend };
}

export function SvgJoinHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  const lightFilter = p.isLight ? 'url(#svgLightBoost)' : undefined;

  return (
    <svg
      viewBox="0 0 560 700"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <LightBoostFilter />
        {/* Radial glow for each palette colour */}
        {(['glow', 'pop', 'spark', 'blaze', 'surge', 'flame', 'gold'] as const).map(k => (
          <radialGradient key={k} id={`jh-glow-${k}`}>
            <stop offset="0%"   stopColor={p[k]} stopOpacity="0.7" />
            <stop offset="55%"  stopColor={p[k]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={p[k]} stopOpacity="0" />
          </radialGradient>
        ))}
        {/* Dot grid pattern */}
        <pattern id="jh-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill={p.primary} opacity="0.06" />
        </pattern>
        {/* Dashed-stroke animation for invitation arcs */}
        <style>{`
          @keyframes jhDash {
            to { stroke-dashoffset: -24; }
          }
          @keyframes jhPulse {
            0%, 100% { r: 30; opacity: 0.6; }
            50%      { r: 36; opacity: 1; }
          }
          @keyframes jhRingPulse {
            0%, 100% { r: 44; opacity: 0.25; }
            50%      { r: 56; opacity: 0.08; }
          }
        `}</style>
      </defs>

      {/* Background */}
      <rect width="560" height="700" fill={p.bg} />
      <g filter={lightFilter}>
        {/* Dot grid */}
        <rect width="560" height="700" fill="url(#jh-dots)" />

        {/* Concentric rings around orchestrator */}
        {[80, 130, 190].map((r, i) => (
          <circle
            key={i}
            cx={NODES[0].x} cy={NODES[0].y} r={r}
            fill="none" stroke={p.primary}
            strokeOpacity={0.08 - i * 0.02}
            strokeWidth={1}
          />
        ))}

        {/* Connection arcs between established nodes */}
        {LINKS.map(([from, to, bend], i) => {
          const a = NODES[from];
          const b = NODES[to];
          const c = ctrlPt(a.x, a.y, b.x, b.y, bend);
          return (
            <path
              key={`link-${i}`}
              d={`M${a.x},${a.y} Q${c.cx},${c.cy} ${b.x},${b.y}`}
              fill="none"
              stroke={p.primary}
              strokeOpacity={0.18}
              strokeWidth={1.5}
            />
          );
        })}

        {/* Invitation arcs (dashed, animated) from "You" to established nodes */}
        {INVITE_LINKS.map(([from, to], i) => {
          const a = NODES[from];
          const b = NODES[to];
          const bend = i === 0 ? 35 : i === 1 ? -35 : 0;
          const c = ctrlPt(a.x, a.y, b.x, b.y, bend);
          return (
            <path
              key={`invite-${i}`}
              d={`M${a.x},${a.y} Q${c.cx},${c.cy} ${b.x},${b.y}`}
              fill="none"
              stroke={p.gold}
              strokeOpacity={0.35}
              strokeWidth={2}
              strokeDasharray="8 8"
              style={{ animation: 'jhDash 1.2s linear infinite' }}
            />
          );
        })}

        {/* Established node halos + circles + labels */}
        {NODES.slice(0, 5).map((n, i) => (
          <g key={`node-${i}`}>
            <circle cx={n.x} cy={n.y} r={n.r * 2.2} fill={`url(#jh-glow-${n.colorKey})`} />
            <circle cx={n.x} cy={n.y} r={n.r} fill={p[n.colorKey]} fillOpacity={0.85} />
            <circle cx={n.x} cy={n.y} r={n.r} fill="none" stroke={p[n.colorKey]} strokeOpacity={0.5} strokeWidth={1.5} />
            <text
              x={n.x} y={n.y + n.r + 16}
              textAnchor="middle"
              fill={p.textMuted}
              fontSize="11"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* "You" node — larger, animated pulse */}
        {(() => {
          const n = NODES[5];
          return (
            <g>
              {/* Outer pulsing ring */}
              <circle
                cx={n.x} cy={n.y} r={44}
                fill="none" stroke={p.gold} strokeOpacity={0.25} strokeWidth={2}
                style={{ animation: 'jhRingPulse 2.5s ease-in-out infinite' }}
              />
              {/* Halo */}
              <circle cx={n.x} cy={n.y} r={n.r * 2.5} fill={`url(#jh-glow-${n.colorKey})`} />
              {/* Core circle with pulse */}
              <circle
                cx={n.x} cy={n.y} r={n.r}
                fill={p[n.colorKey]} fillOpacity={0.9}
                style={{ animation: 'jhPulse 2.5s ease-in-out infinite' }}
              />
              <circle
                cx={n.x} cy={n.y} r={n.r}
                fill="none" stroke={p[n.colorKey]} strokeOpacity={0.6} strokeWidth={2}
              />
              {/* "+" icon */}
              <line x1={n.x - 10} y1={n.y} x2={n.x + 10} y2={n.y} stroke={p.bg} strokeWidth={3} strokeLinecap="round" />
              <line x1={n.x} y1={n.y - 10} x2={n.x} y2={n.y + 10} stroke={p.bg} strokeWidth={3} strokeLinecap="round" />
              {/* Label */}
              <text
                x={n.x} y={n.y + n.r + 20}
                textAnchor="middle"
                fill={p.gold}
                fontSize="14"
                fontWeight="600"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {n.label}
              </text>
            </g>
          );
        })()}

        {/* Small travelling dots on invitation arcs */}
        {INVITE_LINKS.map(([from, to], i) => {
          const a = NODES[from];
          const b = NODES[to];
          const bend = i === 0 ? 35 : i === 1 ? -35 : 0;
          const c = ctrlPt(a.x, a.y, b.x, b.y, bend);
          const pathId = `jh-invite-path-${i}`;
          return (
            <g key={`trav-${i}`}>
              <path
                id={pathId}
                d={`M${a.x},${a.y} Q${c.cx},${c.cy} ${b.x},${b.y}`}
                fill="none" stroke="none"
              />
              <circle r="3" fill={p.gold} opacity="0.8">
                <animateMotion dur={`${2 + i * 0.5}s`} repeatCount="indefinite">
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {/* Decorative sparkle dots */}
        {[
          { x: 80,  y: 100, c: 'glow' as const },
          { x: 480, y: 130, c: 'spark' as const },
          { x: 60,  y: 500, c: 'pop' as const },
          { x: 500, y: 550, c: 'surge' as const },
          { x: 280, y: 350, c: 'blaze' as const },
        ].map((dot, i) => (
          <circle key={`sparkle-${i}`} cx={dot.x} cy={dot.y} r={2} fill={p[dot.c]} fillOpacity={0.4} />
        ))}
      </g>
    </svg>
  );
}

export default SvgJoinHero;
