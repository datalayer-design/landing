/*
 * Copyright (c) 2021-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { useId } from 'react';
import { DatalayerLogoText, useColorPalette } from '@datalayer/primer-addons';
import { SvgLines } from './SvgLines';

type SvgLinesLogoProps = {
  height?: number;
  inverse?: boolean;
  colored?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
};

export function SvgLinesLogo({
  height = 44,
  inverse = false,
  colored = false,
  primaryColor,
  secondaryColor,
  textColor,
}: SvgLinesLogoProps = {}) {
  const palette = useColorPalette();
  const effectiveColorMode: 'light' | 'dark' = palette.isLight ? 'light' : 'dark';
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
        <SvgLines height={linesHeight} inverse={inverse} colored={colored} />
      </div>
      <DatalayerLogoText
        size={logoSize}
        inverse
        colorMode={effectiveColorMode}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        textColor={textColor}
        className={`${scopeClass}__wordmark`}
      />
    </div>
  );
}

export default SvgLinesLogo;
