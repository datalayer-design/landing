/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Open Graph card for Datalayer.
 *
 * 1200×630 (1.91:1) — the universal OG size, so Facebook, LinkedIn, X,
 * Slack and Discord all render it large and uncropped.
 *
 * Visual motif: the Datalayer logo + wordmark, big and centred, over the
 * house dot grid with a soft glow behind it, and the tagline sitting on a
 * baseline underneath.
 *
 * The wordmark is drawn from outlines (no web font), and the tagline uses a
 * system stack, so the card rasterises identically wherever it is exported
 * from — no font loading in the PNG/JPG path.
 *
 * No LightBoostFilter here on purpose: the brand colours are the subject and
 * must come out exact.
 */

import {
  DatalayerLogoText,
  getColorPalette,
  getLogoColors,
  useThemeStore,
  type ColorMode,
  type ColorPalette,
  type ThemeVariant,
} from '@datalayer/primer-addons';

const WIDTH = 1200;
const HEIGHT = 630;

/* The wordmark's own viewBox when the mark leads: 161.672×25. */
const LOGO_VIEWBOX_HEIGHT = 25;
const LOGO_HEIGHT = 128;
const LOGO_SCALE = LOGO_HEIGHT / LOGO_VIEWBOX_HEIGHT;
/*
 * Mark-first parks the wordmark's intrinsic gutter at the RIGHT of the
 * viewBox — the ink stops at 148.897 of the 161.672 units (measured off the
 * rendered outlines; it mirrors the 12-unit trim the mark-last arrangement
 * takes off its left). Centring the BOX would therefore hang the logo ~33px
 * left of the tagline, so the ink is what gets centred here.
 */
const LOGO_INK_WIDTH_UNITS = 148.897;
const LOGO_INK_WIDTH = LOGO_INK_WIDTH_UNITS * LOGO_SCALE;
/* The ink starts at the viewBox origin, so its left edge IS the svg's x. */
const LOGO_X = (WIDTH - LOGO_INK_WIDTH) / 2;
const LOGO_Y = 196;

const TAGLINE_BASELINE = 430;
const TAGLINE_SIZE = 46;

type SvgOgProps = {
  /** The line under the logo. */
  tagline?: string;
  /** Background palette. Derived from `variant`/`colorMode` when absent. */
  palette?: ColorPalette;
  /**
   * Draw the card for this theme rather than for the reader's own — a page
   * that carries a theme of its own needs that, the reader's store is what
   * every other caller wants.
   */
  variant?: ThemeVariant;
  /** The colour mode to go with `variant`. The store's when absent. */
  colorMode?: ColorMode;
};

export function SvgOg({
  tagline = 'Agent Workers for Data Analysis',
  palette: paletteProp,
  variant,
  colorMode: colorModeProp,
}: SvgOgProps = {}) {
  const stored = useThemeStore();
  const theme = variant ?? stored.theme;
  const colorMode = colorModeProp ?? stored.colorMode;
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const logoColors = getLogoColors(theme, effectiveColorMode);
  const p = paletteProp ?? getColorPalette(theme, effectiveColorMode);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label={`Datalayer — ${tagline}`}
    >
      <defs>
        <linearGradient id="og-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>

        <radialGradient id="og-halo" cx="50%" cy="46%" r="60%">
          <stop offset="0%" stopColor={p.primary} stopOpacity={p.isLight ? '0.14' : '0.22'} />
          <stop offset="100%" stopColor={p.primary} stopOpacity="0" />
        </radialGradient>

        <pattern id="og-dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill={p.primary} opacity={p.isLight ? '0.14' : '0.10'} />
        </pattern>
      </defs>

      {/* Ground */}
      <rect width={WIDTH} height={HEIGHT} fill="url(#og-bg)" />
      <rect width={WIDTH} height={HEIGHT} fill="url(#og-dots)" />
      <rect width={WIDTH} height={HEIGHT} fill="url(#og-halo)" />

      {/* The mark, big and centred */}
      <DatalayerLogoText
        size={LOGO_HEIGHT}
        inverse
        x={LOGO_X}
        y={LOGO_Y}
        variant={theme}
        colorMode={effectiveColorMode}
        primaryColor={logoColors.primary}
        secondaryColor={logoColors.secondary}
        textColor={logoColors.textColor}
      />

      {/* The baseline */}
      <text
        x={WIDTH / 2}
        y={TAGLINE_BASELINE}
        textAnchor="middle"
        fill={p.textLight}
        fontSize={TAGLINE_SIZE}
        fontWeight="600"
        letterSpacing="0.5"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      >
        {tagline}
      </text>
    </svg>
  );
}

export default SvgOg;
