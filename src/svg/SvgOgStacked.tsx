/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * CC BY 4.0 License
 */

/**
 * Open Graph card for Datalayer, stacked: the mark, the wordmark under it,
 * and the baseline under that, all inside the card's centre square.
 *
 * 1200×630 (1.91:1), as `SvgOg`, so Facebook, LinkedIn, X, Slack and Discord
 * show it whole. The difference is for the apps that crop a link's picture
 * to a square around its centre — WhatsApp's thumbnail, among others: there
 * a wide wordmark is cut to its middle letters, blown up. Stacked, everything
 * sits in the centre 630×630, so the square crop is the whole card's subject.
 *
 * The wordmark is drawn from outlines (no web font) and the baseline from a
 * system stack, so it rasterises the same wherever it is exported.
 */

import {
  DatalayerLogo,
  DatalayerText,
  getColorPalette,
  getLogoColors,
  useThemeStore,
  type ColorMode,
  type ColorPalette,
  type ThemeVariant,
} from '@datalayer/primer-addons';

const WIDTH = 1200;
const HEIGHT = 630;

/* The mark, square, centred. */
const MARK_SIZE = 200;
const MARK_Y = 100;

/*
 * The wordmark's ink, in `DatalayerText`'s own coordinates at its base scale
 * (0.7, `x`=0, `y`=0): 72.457×15.002 outline units from (17.358, 281.998),
 * measured with getBBox on the rendered outlines.
 */
const WORD_INK = { x: 17.358 * 0.7, y: 281.998 * 0.7, width: 72.457 * 0.7, height: 15.002 * 0.7 };
const WORD_WIDTH = 460;
const WORD_HEIGHT = (WORD_WIDTH / WORD_INK.width) * WORD_INK.height;
const WORD_Y = MARK_Y + MARK_SIZE + 34;

const TAGLINE_SIZE = 52;
const TAGLINE_BASELINE = WORD_Y + WORD_HEIGHT + 30 + TAGLINE_SIZE;

type SvgOgStackedProps = {
  /** The line under the wordmark. */
  tagline?: string;
  /** Background palette. Derived from `variant`/`colorMode` when absent. */
  palette?: ColorPalette;
  /** Draw the card for this theme rather than for the reader's own. */
  variant?: ThemeVariant;
  /** The colour mode to go with `variant`. The store's when absent. */
  colorMode?: ColorMode;
};

export function SvgOgStacked({
  tagline = 'Agent Applications',
  palette: paletteProp,
  variant,
  colorMode: colorModeProp,
}: SvgOgStackedProps = {}) {
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
        <linearGradient id="og-stacked-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>
        <radialGradient id="og-stacked-halo" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={p.primary} stopOpacity={p.isLight ? '0.14' : '0.24'} />
          <stop offset="100%" stopColor={p.primary} stopOpacity="0" />
        </radialGradient>
        <pattern id="og-stacked-dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill={p.primary} opacity={p.isLight ? '0.14' : '0.10'} />
        </pattern>
      </defs>

      {/* Ground */}
      <rect width={WIDTH} height={HEIGHT} fill="url(#og-stacked-bg)" />
      <rect width={WIDTH} height={HEIGHT} fill="url(#og-stacked-dots)" />
      <rect width={WIDTH} height={HEIGHT} fill="url(#og-stacked-halo)" />

      {/* The mark */}
      <DatalayerLogo
        size={MARK_SIZE}
        x={(WIDTH - MARK_SIZE) / 2}
        y={MARK_Y}
        variant={theme}
        colorMode={effectiveColorMode}
        primaryColor={logoColors.primary}
        secondaryColor={logoColors.secondary}
      />

      {/* The wordmark, its ink framed exactly */}
      <svg
        x={(WIDTH - WORD_WIDTH) / 2}
        y={WORD_Y}
        width={WORD_WIDTH}
        height={WORD_HEIGHT}
        viewBox={`${WORD_INK.x} ${WORD_INK.y} ${WORD_INK.width} ${WORD_INK.height}`}
      >
        <DatalayerText primaryColor={logoColors.primary} secondaryColor={logoColors.textColor} x={0} y={0} />
      </svg>

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

export default SvgOgStacked;
