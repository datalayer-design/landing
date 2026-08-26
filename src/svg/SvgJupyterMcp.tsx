/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * SVG illustration combining the Jupyter logo and the MCP (Model Context
 * Protocol) logo, linked by animated connection lines.
 *
 * Visual motif: Jupyter logo on the left, MCP logo on the right, connected
 * by flowing data lines with travelling dots — representing real-time
 * communication between Jupyter and MCP-enabled AI tools.
 *
 * Uses the shared ColorPalette theming system.
 * ViewBox: 800×400, renders inline (no absolute positioning).
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgJupyterMcp({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const jupyterLogoArc = p.isLight ? p.flame : p.glow;
  const jupyterLogoPrimary = p.isLight ? p.blaze : p.gold;
  const jupyterColorSoft = p.isLight ? p.surge : p.glow;

  return (
    <svg
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <LightBoostFilter />

        {/* Glow filter for logos */}
        <filter id="jmcp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Soft halo filter */}
        <filter id="jmcp-halo" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="18" />
        </filter>

        {/* Gradient for connection lines */}
        <linearGradient id="jmcp-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={jupyterLogoPrimary} stopOpacity="0.8" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.6" />
          <stop offset="100%" stopColor={p.primary} stopOpacity="0.8" />
        </linearGradient>

        {/* Dot grid pattern */}
        <pattern id="jmcp-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="0.6" fill={p.primary} opacity="0.12" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="800" height="400" fill={p.bg} />

      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>
        {/* Dot grid underlay */}
        <rect width="800" height="400" fill="url(#jmcp-dots)" />

        {/* Subtle radial glow behind Jupyter */}
        <circle cx="220" cy="200" r="120" fill={jupyterColorSoft} opacity="0.06" filter="url(#jmcp-halo)" />

        {/* Subtle radial glow behind MCP */}
        <circle cx="580" cy="200" r="120" fill={p.primary} opacity="0.04" filter="url(#jmcp-halo)" />

        {/* ── Connection lines ─────────────────────────────────── */}
        {/* Top curve */}
        <path
          d="M 300 170 C 380 120, 480 120, 500 170"
          fill="none"
          stroke="url(#jmcp-line-grad)"
          strokeWidth="1.5"
          opacity="0.5"
        >
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
        </path>

        {/* Middle line */}
        <path
          d="M 300 200 C 370 200, 430 200, 500 200"
          fill="none"
          stroke="url(#jmcp-line-grad)"
          strokeWidth="2"
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.5s" repeatCount="indefinite" />
        </path>

        {/* Bottom curve */}
        <path
          d="M 300 230 C 380 280, 480 280, 500 230"
          fill="none"
          stroke="url(#jmcp-line-grad)"
          strokeWidth="1.5"
          opacity="0.5"
        >
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4.5s" repeatCount="indefinite" />
        </path>

        {/* ── Travelling dots ──────────────────────────────────── */}
        {/* Dot on top curve */}
        <circle r="3" fill={jupyterLogoPrimary} opacity="0.8">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 300 170 C 380 120, 480 120, 500 170" />
        </circle>

        {/* Dot on middle line */}
        <circle r="3.5" fill={p.glow} opacity="0.9">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 300 200 C 370 200, 430 200, 500 200" />
        </circle>

        {/* Dot on bottom curve */}
        <circle r="3" fill={p.primary} opacity="0.8">
          <animateMotion dur="3.5s" repeatCount="indefinite" path="M 300 230 C 380 280, 480 280, 500 230" />
        </circle>

        {/* Reverse dot on middle */}
        <circle r="2.5" fill={p.pop} opacity="0.7">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 500 200 C 430 200, 370 200, 300 200" />
        </circle>

        {/* ── Jupyter logo (left) ──────────────────────────────── */}
        <g transform="translate(220, 200) scale(5.5)" filter="url(#jmcp-glow)">
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
          x="220"
          y="285"
          textAnchor="middle"
          fill={p.textLight}
          fontSize="16"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          Jupyter
        </text>
        <text
          x="220"
          y="305"
          textAnchor="middle"
          fill={p.textMuted}
          fontSize="11"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Notebooks &amp; Sandboxes
        </text>

        {/* ── MCP logo (right) ─────────────────────────────────── */}
        <g transform="translate(580, 200) scale(4)" filter="url(#jmcp-glow)">
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
          x="580"
          y="285"
          textAnchor="middle"
          fill={p.textLight}
          fontSize="16"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.02em"
        >
          MCP
        </text>
        <text
          x="580"
          y="305"
          textAnchor="middle"
          fill={p.textMuted}
          fontSize="11"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Model Context Protocol
        </text>

        {/* ── Decorative corner accents ────────────────────────── */}
        {/* Top-left */}
        <line x1="20" y1="20" x2="60" y2="20" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        <line x1="20" y1="20" x2="20" y2="60" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        {/* Top-right */}
        <line x1="780" y1="20" x2="740" y2="20" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        <line x1="780" y1="20" x2="780" y2="60" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        {/* Bottom-left */}
        <line x1="20" y1="380" x2="60" y2="380" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        <line x1="20" y1="380" x2="20" y2="340" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        {/* Bottom-right */}
        <line x1="780" y1="380" x2="740" y2="380" stroke={p.primary} strokeWidth="1" opacity="0.15" />
        <line x1="780" y1="380" x2="780" y2="340" stroke={p.primary} strokeWidth="1" opacity="0.15" />

        {/* Bottom accent bars */}
        <rect x="0" y="392" width="800" height="2" fill={jupyterLogoPrimary} opacity="0.12" />
        <rect x="0" y="395" width="800" height="3" fill={p.glow} opacity="0.10" />
        <rect x="0" y="398" width="800" height="2" fill={p.primary} opacity="0.08" />
      </g>
    </svg>
  );
}

export default SvgJupyterMcp;
