/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import {
  DatalayerLogoText,
  getColorPalette,
  getLogoColors,
  useThemeStore,
} from '@datalayer/primer-addons';
import type { ColorMode, ThemeVariant } from '@datalayer/primer-addons';
import { SvgLines } from './SvgLines';

type SvgLinesLogoProps = {
  height?: number;
  inverse?: boolean;
  colored?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  /**
   * Draw it for this theme rather than for the reader's own.
   *
   * The wordmark's gradients are chosen by the VARIANT, so naming colours is
   * not enough to move it off the stored theme — which is what a surface with
   * a theme of its own needs, a deck being drawn in one, say. Absent means the
   * theme store, which is what every other caller wants.
   */
  variant?: ThemeVariant;
  /** The colour mode to go with `variant`. The store's when absent. */
  colorMode?: ColorMode;
};

export function SvgLinesLogo({
  height = 44,
  inverse = false,
  colored = false,
  primaryColor,
  secondaryColor,
  textColor,
  variant,
  colorMode: colorModeProp,
}: SvgLinesLogoProps = {}) {
  const stored = useThemeStore();
  const theme = variant ?? stored.theme;
  const colorMode = colorModeProp ?? stored.colorMode;
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const logoColors = getLogoColors(theme, effectiveColorMode);
  // Derived from the theme IN FORCE rather than read from the store: the
  // lines take a palette and would otherwise colour themselves from the
  // reader's own theme while the wordmark beside them had moved.
  const palette = getColorPalette(theme, effectiveColorMode);
  const themedPrimaryColor = primaryColor ?? logoColors.primary ?? palette.primary;
  const themedSecondaryColor = secondaryColor ?? logoColors.secondary ?? palette.secondary;
  const themedTextColor = textColor ?? logoColors.textColor ?? palette.secondary;
  // SvgLines viewBox is 44 tall but the three bars only occupy y=8..36 (28 units).
  // DatalayerLogoText glyphs fill their full viewBox, so the visible text height
  // equals the wordmark `size`. To make the visible text height equal the visible
  // lines-span height we scale by 28/44.
  const LINES_VISIBLE_RATIO = 28 / 44;
  const linesHeight = height;
  const logoSize = Math.round(height * LINES_VISIBLE_RATIO);
  const logoGap = Math.max(8, Math.round(height * 0.16));
  const scopeClass = `dla-svg-lines-logo-${useId().replace(/:/g, '')}`;

  return (
    <div
      className={scopeClass}
      style={{
        width: '100%',
        height,
        display: 'flex',
        alignItems: 'center',
        gap: logoGap,
      }}
    >
      {/*
        Scoped style block: defends inner svg sizing against ancestor CSS that
        sets `& svg { height: auto !important }` etc. Keeps the component
        self-contained so the rendered text height always matches the rendered
        lines-span height.
      */}
      <style>{`
        .${scopeClass} { box-sizing: border-box; }
        .${scopeClass} > .${scopeClass}__lines {
          flex: 1;
          min-width: 0;
          height: ${linesHeight}px !important;
        }
        .${scopeClass} > .${scopeClass}__lines > svg {
          display: block !important;
          width: 100% !important;
          height: ${linesHeight}px !important;
          max-width: none !important;
          max-height: none !important;
        }
        .${scopeClass} > svg.${scopeClass}__wordmark {
          flex-shrink: 0;
          display: block !important;
          height: ${logoSize}px !important;
          width: auto !important;
          max-width: none !important;
          max-height: none !important;
        }
      `}</style>
      <div className={`${scopeClass}__lines`}>
        <SvgLines
          height={linesHeight}
          inverse={inverse}
          colored={colored}
          palette={palette}
        />
      </div>
      <DatalayerLogoText
        size={logoSize}
        inverse
        variant={theme}
        colorMode={effectiveColorMode}
        primaryColor={themedPrimaryColor}
        secondaryColor={themedSecondaryColor}
        textColor={themedTextColor}
        className={`${scopeClass}__wordmark`}
      />
    </div>
  );
}

export default SvgLinesLogo;
