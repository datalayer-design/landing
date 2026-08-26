/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Announcement artwork for Jupyter MCP Server 2, the release built on the
 * second generation of the Model Context Protocol.
 *
 * Visual motif: a hero numeral "2" drawn as a single geometric stroke sits
 * at the centre of a rotating protocol orbit, its gradient melting Jupyter's
 * warm orange into Datalayer's green. The Jupyter mark feeds the orbit from
 * the left, the MCP mark draws from it on the right, with pulses travelling
 * along ports docked on the ring — the version number is the conduit.
 *
 * Sibling of {@link SvgJupyterMcp}, sharing its logo geometry, corner
 * accents and bottom accent bars.
 *
 * The soft passes (halos, numeral bloom) sit OUTSIDE the `svgLightBoost`
 * group: that filter raises alpha by a 0.45 gamma, which turns a 0.06 wash
 * into a 0.28 one and would blow the blurs into flat discs in light mode.
 *
 * Uses the shared ColorPalette theming system.
 * ViewBox: 1200×520, renders inline (no absolute positioning).
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

/**
 * The hero numeral, drawn as one continuous stroke around the origin: a 240°
 * bowl closing level on both sides, a lightly bowed diagonal, then the base
 * bar. Stroked rather than typeset so it renders identically everywhere and
 * can carry a gradient and a travelling shine.
 */
const TWO_PATH = 'M -53.7 -7 A 62 62 0 1 1 53.7 -7 C 33 27, -20 50, -58 82 L 60 82';
const TWO_TRANSFORM = 'translate(600, 228) scale(1.15)';

/**
 * The neon breath: one cycle brightens over the first third and falls away
 * across the rest, which is what reads as a glowing tube rather than a
 * symmetrical throb. Every glow pass shares it so they pulse as one.
 */
const NEON_CYCLE = '3.6s';
const NEON_SPLINES = '0.35 0 0.25 1; 0.45 0 0.55 1';

const CENTER_X = 600;
const CENTER_Y = 218;

/** Ports where the flow lines dock onto the inner orbit (r = 148). */
const PORTS = [
  { x: 455, y: 190 },
  { x: 452, y: 218 },
  { x: 455, y: 246 },
  { x: 745, y: 190 },
  { x: 748, y: 218 },
  { x: 745, y: 246 },
];

const INBOUND = [
  { d: 'M 292 178 C 344 152, 404 156, 455 190', dur: '4s' },
  { d: 'M 292 218 C 348 218, 404 218, 452 218', dur: '3.5s' },
  { d: 'M 292 258 C 344 284, 404 280, 455 246', dur: '4.5s' },
];

const OUTBOUND = [
  { d: 'M 745 190 C 796 156, 856 152, 908 178', dur: '4.2s' },
  { d: 'M 748 218 C 796 218, 852 218, 908 218', dur: '3.7s' },
  { d: 'M 745 246 C 796 280, 856 284, 908 258', dur: '4.7s' },
];

export function SvgJupyterMcp2({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const jupyterLogoArc = p.isLight ? p.flame : p.glow;
  const jupyterWarm = p.isLight ? p.flame : p.gold;
  const accentText = p.isLight ? p.secondary : p.glow;
  /* Light mode goes through the alpha boost, so it needs lower raw values. */
  const dim = (light: string, dark: string) => (p.isLight ? light : dark);

  return (
    <svg
      viewBox="0 0 1200 520"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Jupyter MCP Server 2 is now available, built on MCP 2"
    >
      <defs>
        <LightBoostFilter />

        {/* Glow for the logos — dark mode only, see the note above */}
        <filter id="jmcp2-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Station halos — gradients rather than blurs, which band on light */}
        <radialGradient id="jmcp2-halo-jupyter">
          <stop offset="0%" stopColor={jupyterLogoArc} stopOpacity={dim('0.16', '0.22')} />
          <stop offset="100%" stopColor={jupyterLogoArc} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="jmcp2-halo-mcp">
          <stop offset="0%" stopColor={p.primary} stopOpacity={dim('0.18', '0.26')} />
          <stop offset="100%" stopColor={p.primary} stopOpacity="0" />
        </radialGradient>

        {/* Neon bloom around the numeral — a wide breath and a tight one */}
        <filter id="jmcp2-bloom" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="jmcp2-bloom-tight" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>

        {/*
         * The numeral ramp: Jupyter orange melting through gold and lime into
         * Datalayer green — the two sides of the artwork fused into the
         * version number itself.
         */}
        <linearGradient id="jmcp2-two" x1="0%" y1="0%" x2="20%" y2="100%">
          <stop offset="0%" stopColor={p.flame} />
          <stop offset="26%" stopColor={p.gold} />
          <stop offset="48%" stopColor={p.spark} />
          <stop offset="72%" stopColor={p.glow} />
          <stop offset="100%" stopColor={p.primary} />
        </linearGradient>

        {/* Travelling shine sweeping across the numeral */}
        <linearGradient id="jmcp2-shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" stopColor={dim(p.gold, '#ffffff')} stopOpacity="0">
            <animate attributeName="offset" values="0;0.8" dur="5s" repeatCount="indefinite" />
          </stop>
          <stop offset="0.1" stopColor={dim(p.gold, '#ffffff')} stopOpacity={dim('0.4', '0.6')}>
            <animate attributeName="offset" values="0.1;0.9" dur="5s" repeatCount="indefinite" />
          </stop>
          <stop offset="0.2" stopColor={dim(p.gold, '#ffffff')} stopOpacity="0">
            <animate attributeName="offset" values="0.2;1" dur="5s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Inbound flow: Jupyter warmth heading for the protocol */}
        <linearGradient id="jmcp2-line-in" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={jupyterWarm} stopOpacity="0.85" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0.7" />
        </linearGradient>

        {/* Outbound flow: the protocol answering in Datalayer green */}
        <linearGradient id="jmcp2-line-out" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.7" />
          <stop offset="100%" stopColor={p.primary} stopOpacity="0.85" />
        </linearGradient>

        {/* Centre vignette */}
        <radialGradient id="jmcp2-vignette" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor={p.glow} stopOpacity={dim('0.1', '0.16')} />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        {/* Dot grid pattern */}
        <pattern id="jmcp2-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="0.6" fill={p.primary} opacity="0.12" />
        </pattern>
      </defs>

      {/* ── Background, unboosted ──────────────────────────────── */}
      <rect width="1200" height="520" fill={p.bg} />
      <rect width="1200" height="520" fill="url(#jmcp2-dots)" />
      <rect width="1200" height="520" fill="url(#jmcp2-vignette)" />

      {/* Station halos and the numeral bloom, kept clear of the alpha boost */}
      <circle cx="225" cy={CENTER_Y} r="150" fill="url(#jmcp2-halo-jupyter)" />
      <circle cx="975" cy={CENTER_Y} r="150" fill="url(#jmcp2-halo-mcp)" />
      <g transform={TWO_TRANSFORM}>
        {/* Outer breath: swells fast, falls away slow, the way a tube warms */}
        <path
          d={TWO_PATH}
          fill="none"
          stroke={p.glow}
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#jmcp2-bloom)"
        >
          <animate
            attributeName="opacity"
            values={dim('0.12;0.42;0.12', '0.2;0.78;0.2')}
            keyTimes="0;0.38;1"
            calcMode="spline"
            keySplines={NEON_SPLINES}
            dur={NEON_CYCLE}
            repeatCount="indefinite"
          />
        </path>
      </g>

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        {/* ── Protocol orbit ───────────────────────────────────── */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r="184"
          fill="none"
          stroke={p.primary}
          strokeWidth="1"
          opacity={dim('0.06', '0.14')}
        />

        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CENTER_X} ${CENTER_Y}`}
            to={`360 ${CENTER_X} ${CENTER_Y}`}
            dur="64s"
            repeatCount="indefinite"
          />
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="148"
            fill="none"
            stroke={p.primary}
            strokeWidth="1.5"
            strokeDasharray="2 11"
            opacity={dim('0.24', '0.42')}
          />
          <circle cx={CENTER_X + 148} cy={CENTER_Y} r="4" fill={p.glow} opacity="0.75" />
          <circle cx={CENTER_X - 148} cy={CENTER_Y} r="4" fill={jupyterWarm} opacity="0.7" />
        </g>

        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`360 ${CENTER_X} ${CENTER_Y}`}
            to={`0 ${CENTER_X} ${CENTER_Y}`}
            dur="92s"
            repeatCount="indefinite"
          />
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="170"
            fill="none"
            stroke={p.glow}
            strokeWidth="1"
            strokeDasharray="1 15"
            opacity={dim('0.2', '0.36')}
          />
          <rect x={CENTER_X - 4} y={CENTER_Y - 174} width="8" height="8" rx="2" fill={p.pop} opacity="0.6" />
          <rect x={CENTER_X - 4} y={CENTER_Y + 166} width="8" height="8" rx="2" fill={p.spark} opacity="0.55" />
        </g>

        {/* ── Flow lines, Jupyter → orbit → MCP ────────────────── */}
        {INBOUND.map((line) => (
          <path
            key={line.d}
            d={line.d}
            fill="none"
            stroke="url(#jmcp2-line-in)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={dim('0.45', '0.6')}
          >
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur={line.dur} repeatCount="indefinite" />
          </path>
        ))}
        {OUTBOUND.map((line) => (
          <path
            key={line.d}
            d={line.d}
            fill="none"
            stroke="url(#jmcp2-line-out)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={dim('0.45', '0.6')}
          >
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur={line.dur} repeatCount="indefinite" />
          </path>
        ))}

        {/* Ports where the flows dock onto the orbit */}
        {PORTS.map((port) => (
          <circle key={`${port.x}-${port.y}`} cx={port.x} cy={port.y} r="3.5" fill={p.glow} opacity="0.7" />
        ))}

        {/* ── Travelling pulses ────────────────────────────────── */}
        {INBOUND.map((line, index) => (
          <circle key={`in-${line.d}`} r={index === 1 ? 4.5 : 4} fill={jupyterWarm} opacity="0.9">
            <animateMotion dur={index === 1 ? '2.5s' : `${3 + index * 0.4}s`} repeatCount="indefinite" path={line.d} />
          </circle>
        ))}
        {OUTBOUND.map((line, index) => (
          <circle key={`out-${line.d}`} r={index === 1 ? 4.5 : 4} fill={index === 1 ? p.primary : p.glow} opacity="0.9">
            <animateMotion dur={index === 1 ? '2.6s' : `${3.2 + index * 0.4}s`} repeatCount="indefinite" path={line.d} />
          </circle>
        ))}
        {/* One packet heading back upstream, so the protocol reads two-way */}
        <circle r="3.5" fill={p.pop} opacity="0.8">
          <animateMotion dur="3.6s" repeatCount="indefinite" path="M 908 218 C 852 218, 796 218, 748 218" />
        </circle>

        {/* ── The hero numeral ─────────────────────────────────── */}
        <g transform={TWO_TRANSFORM}>
          {/* Offset echo, for depth */}
          <path
            d={TWO_PATH}
            fill="none"
            stroke={p.primary}
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={dim('0.07', '0.16')}
            transform="translate(9, 9)"
          />
          {/* The numeral itself */}
          <path
            d={TWO_PATH}
            fill="none"
            stroke="url(#jmcp2-two)"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Travelling shine */}
          <path
            d={TWO_PATH}
            fill="none"
            stroke="url(#jmcp2-shine)"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/*
           * Inner breath: the tube itself bleeding light. Same cycle as the
           * outer bloom, so the numeral brightens and fades as one.
           */}
          <path
            d={TWO_PATH}
            fill="none"
            stroke="url(#jmcp2-two)"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#jmcp2-bloom-tight)"
          >
            <animate
              attributeName="opacity"
              values={dim('0.08;0.32;0.08', '0.18;0.58;0.18')}
              keyTimes="0;0.38;1"
              calcMode="spline"
              keySplines={NEON_SPLINES}
              dur={NEON_CYCLE}
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* ── Jupyter mark (left) ──────────────────────────────── */}
        <g transform={`translate(225, ${CENTER_Y}) scale(5.6)`} filter={p.isLight ? undefined : 'url(#jmcp2-glow)'}>
          <g transform="translate(-10.385, -10.1)">
            {/* Top arc */}
            <path
              d="M10.3848 3.63324C14.1395 3.63324 17.4395 4.98077 19.1458 6.97075C18.4837 5.18054 17.2891 3.63609 15.7228 2.54532C14.1564 1.45455 12.2935 0.869812 10.3848 0.869812C8.4761 0.869812 6.61315 1.45455 5.04681 2.54532C3.48046 3.63609 2.28586 5.18054 1.62381 6.97075C3.33012 4.9766 6.61343 3.63324 10.3848 3.63324Z"
              fill={jupyterLogoArc}
            />
            {/* Bottom arc */}
            <path
              d="M10.3848 16.5737C6.63011 16.5737 3.33012 15.2261 1.62381 13.2361C2.28586 15.0264 3.48046 16.5708 5.04681 17.6616C6.61315 18.7524 8.4761 19.3371 10.3848 19.3371C12.2935 19.3371 14.1564 18.7524 15.7228 17.6616C17.2891 16.5708 18.4837 15.0264 19.1458 13.2361C17.4437 15.2261 14.1562 16.5737 10.3848 16.5737Z"
              fill={jupyterLogoArc}
            />
          </g>
        </g>

        {/* Jupyter label */}
        <text
          x="225"
          y="322"
          textAnchor="middle"
          fill={p.textLight}
          fontSize="20"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          Jupyter
        </text>
        <text
          x="225"
          y="346"
          textAnchor="middle"
          fill={p.textMuted}
          fontSize="13"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Notebooks &amp; Sandboxes
        </text>

        {/* ── MCP mark (right) ─────────────────────────────────── */}
        <g transform={`translate(975, ${CENTER_Y}) scale(4.5)`} filter={p.isLight ? undefined : 'url(#jmcp2-glow)'}>
          <g transform="translate(-12, -12)">
            <path
              d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z"
              fill={p.primary}
            />
            <path
              d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z"
              fill={p.primary}
            />
          </g>
        </g>

        {/* MCP label */}
        <text
          x="975"
          y="322"
          textAnchor="middle"
          fill={p.textLight}
          fontSize="20"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          MCP 2
        </text>
        <text
          x="975"
          y="346"
          textAnchor="middle"
          fill={p.textMuted}
          fontSize="13"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Model Context Protocol
        </text>

        {/* ── Availability pill ────────────────────────────────── */}
        <rect x="505" y="26" width="190" height="32" rx="16" fill={p.bg} stroke={accentText} strokeOpacity="0.45" />
        <circle cx="534" cy="42" r="4.5" fill={p.glow}>
          <animate attributeName="opacity" values="0.35;1;0.35" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <text
          x="619"
          y="47"
          textAnchor="middle"
          fill={accentText}
          fontSize="11"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.14em"
        >
          NOW AVAILABLE
        </text>

        {/* ── Headline ─────────────────────────────────────────── */}
        <text
          x="600"
          y="434"
          textAnchor="middle"
          fill={p.textLight}
          fontSize="38"
          fontWeight="750"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          Jupyter MCP Server 2
        </text>
        <text
          x="600"
          y="466"
          textAnchor="middle"
          fill={p.textMuted}
          fontSize="16"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Notebooks and sandboxes for every agent — now speaking MCP 2
        </text>

        {/* ── Decorative corner accents ────────────────────────── */}
        {/* Top-left */}
        <line x1="20" y1="20" x2="60" y2="20" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        <line x1="20" y1="20" x2="20" y2="60" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        {/* Top-right */}
        <line x1="1180" y1="20" x2="1140" y2="20" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        <line x1="1180" y1="20" x2="1180" y2="60" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        {/* Bottom-left */}
        <line x1="20" y1="500" x2="60" y2="500" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        <line x1="20" y1="500" x2="20" y2="460" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        {/* Bottom-right */}
        <line x1="1180" y1="500" x2="1140" y2="500" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        <line x1="1180" y1="500" x2="1180" y2="460" stroke={p.primary} strokeWidth="1" opacity="0.15" />

        {/* Bottom accent bars */}
        <rect x="0" y="512" width="1200" height="2" fill={jupyterWarm} opacity="0.14" />
        <rect x="0" y="515" width="1200" height="3" fill={p.glow} opacity="0.12" />
        <rect x="0" y="518" width="1200" height="2" fill={p.primary} opacity="0.1" />
      </g>
    </svg>
  );
}

export default SvgJupyterMcp2;
