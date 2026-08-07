/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

/**
 * Jupyter brand orange, kept constant across themes so the logo stays
 * recognizable regardless of the active color mode.
 */
const JUPYTER_ORANGE = '#f37726';

/**
 * Builds the Jupyter cell outputshot placeholder SVG markup from a
 * {@link ColorPalette}. Because every color is derived from the palette,
 * the result automatically reflects the active theme and color mode.
 */
export function buildCellOutputshotPlaceholderSvg(p: ColorPalette): string {
  const backdrop = p.bg;
  const surface = p.bgPanel;
  const border = p.isLight ? 'rgba(27,31,36,0.15)' : 'rgba(240,246,252,0.16)';
  const codeBg = p.isLight ? '#11161d' : '#0b0f14';
  const outputBg = p.bgAlt;
  const text = p.textMuted;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" role="img" aria-label="Jupyter cell placeholder">
  <rect id="dla-cell-placeholder" width="800" height="480" fill="${backdrop}"/>
  <rect x="80" y="56" width="640" height="368" rx="28" fill="${surface}" stroke="${border}" stroke-width="2"/>
  <text x="112" y="96" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="15" fill="${text}">In [ ]:</text>
  <rect x="112" y="108" width="576" height="120" rx="14" fill="${codeBg}"/>
  <rect x="140" y="134" width="300" height="12" rx="6" fill="${p.glow}" opacity="0.95"/>
  <rect x="140" y="160" width="360" height="12" rx="6" fill="${p.accent}" opacity="0.9"/>
  <rect x="140" y="186" width="240" height="12" rx="6" fill="${p.primary}" opacity="0.85"/>
  <rect x="112" y="248" width="576" height="140" rx="14" fill="${outputBg}" stroke="${border}" stroke-width="2"/>
  <rect x="160" y="330" width="70" height="40" rx="8" fill="${p.surge}" opacity="0.9"/>
  <rect x="250" y="300" width="70" height="70" rx="8" fill="${p.flame}" opacity="0.9"/>
  <rect x="340" y="315" width="70" height="55" rx="8" fill="${p.spark}" opacity="0.9"/>
  <rect x="430" y="284" width="70" height="86" rx="8" fill="${p.primary}" opacity="0.9"/>
  <rect x="520" y="320" width="70" height="50" rx="8" fill="${p.accent}" opacity="0.9"/>
  <circle cx="648" cy="104" r="16" fill="${JUPYTER_ORANGE}"/>
  <circle cx="680" cy="86" r="7" fill="${JUPYTER_ORANGE}" opacity="0.6"/>
  <circle cx="683" cy="122" r="6" fill="${JUPYTER_ORANGE}" opacity="0.6"/>
  <circle cx="618" cy="86" r="6" fill="${JUPYTER_ORANGE}" opacity="0.6"/>
  <circle cx="616" cy="122" r="7" fill="${JUPYTER_ORANGE}" opacity="0.6"/>
  <text x="112" y="416" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="15" fill="${text}">Jupyter Cell Preview</text>
</svg>`;
}

/**
 * Returns the themed placeholder SVG encoded as a `data:` URI for the active
 * color palette. Suitable for `<img src>` or `Card.Image`.
 */
export function cellOutputshotPlaceholderDataUri(p: ColorPalette): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    buildCellOutputshotPlaceholderSvg(p),
  )}`;
}

/**
 * Hook variant of {@link cellOutputshotPlaceholderDataUri} that reads the
 * active palette so callers re-render when the theme or color mode changes.
 */
export function useCellOutputshotPlaceholderDataUri(): string {
  const palette = useColorPalette();
  return cellOutputshotPlaceholderDataUri(palette);
}

export type SvgCellOutputshotPlaceholderProps = {
  style?: React.CSSProperties;
  className?: string;
  alt?: string;
};

/**
 * Themed, color-moded Jupyter cell outputshot placeholder. Renders the
 * palette-driven SVG so it responds to the user's theme and color mode.
 */
export function SvgCellOutputshotPlaceholder({
  style,
  className,
  alt = 'Jupyter cell placeholder',
}: SvgCellOutputshotPlaceholderProps): JSX.Element {
  const src = useCellOutputshotPlaceholderDataUri();
  return <img src={src} alt={alt} className={className} style={style} />;
}

export default SvgCellOutputshotPlaceholder;