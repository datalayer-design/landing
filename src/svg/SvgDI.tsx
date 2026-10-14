/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, type SVGProps } from 'react';
import { type ThemeVariant } from '@datalayer/primer-addons';
import { getLogoColors } from '@datalayer/primer-addons';

export interface DIProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: number;
  variant?: ThemeVariant;
  colorMode?: 'light' | 'dark' | 'auto';
  /** Colour of the "I" glyph. */
  primaryColor?: string;
  /** Colour of the "D" glyph. */
  secondaryColor?: string;
}

/**
 * DI glyph mark.
 *
 * Uses the same public API and semantic color mapping as AI:
 * primaryColor styles the "I", secondaryColor styles the "D".
 * Drawn on the AI mark's grid: the same slanted I, cap height and stroke
 * weight. The D is five-sided: its right edge runs parallel to the I, on the
 * A's right leg (same gap to the I), for two thirds of the height, then
 * returns to the baseline at the mirrored angle. The counter is the outline
 * inset by the stroke weight.
 */
export const DI = forwardRef<SVGSVGElement, DIProps>(function DI(
  {
    size = 24,
    variant = 'datalayer',
    colorMode = 'light',
    primaryColor,
    secondaryColor,
    ...svgProps
  },
  ref,
) {
  const themed = getLogoColors(variant, colorMode);
  const resolvedPrimary = primaryColor ?? themed.primary;
  const resolvedSecondary = secondaryColor ?? themed.textColor;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-label="DI"
      ref={ref}
      {...svgProps}
    >
      <path
        d="M0.75 3.932H7.2A8.068 8.068 0 0 1 7.2 20.068H0.75ZM4.25 7.182H7.2A4.818 4.818 0 0 1 7.2 16.818H4.25Z"
        fill={resolvedSecondary}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path
        d="m13.788825 3.932 6.43325 16.136075h3.5279L17.316725 3.932H13.788825Z"
        fill={resolvedPrimary}
      />
    </svg>
  );
});

export default DI;