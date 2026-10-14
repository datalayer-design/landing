/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { forwardRef, type SVGProps } from 'react';
import { type ThemeVariant } from '@datalayer/primer-addons';
import { getLogoColors } from '@datalayer/primer-addons';

export interface SvgDlaProps
  extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Height of the mark; the width follows (the mark is wider than tall). */
  size?: number;
  variant?: ThemeVariant;
  colorMode?: 'light' | 'dark' | 'auto';
  /** Colour of the A's right leg — the "I" hidden in the mark. */
  primaryColor?: string;
  /** Colour of the D and the rest of the A. */
  secondaryColor?: string;
}

const VIEW_WIDTH = 29.849;
const VIEW_HEIGHT = 24;

/**
 * Datalayer monogram: the D and A of DAtalayer, married.
 *
 * As AI picks the A and I out of AnthropIc, this picks the D and A out of
 * Datalayer, and hides the AI inside: the A's right leg is the slanted I of
 * the AI mark, in the accent colour. The D is the one from DI, the A the one
 * from AI, so the three marks share one grid, cap height and stroke weight.
 * The A's left leg lands tangent on the D's bowl, so the two letters touch
 * at one point and read as one shape while each stays whole.
 */
export const SvgDla = forwardRef<SVGSVGElement, SvgDlaProps>(
  function SvgDla(
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
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        width={(size * VIEW_WIDTH) / VIEW_HEIGHT}
        height={size}
        role="img"
        aria-label="Datalayer"
        ref={ref}
        {...svgProps}
      >
        {/* The D, then the A's left leg and crossbar. */}
        <path
          d="M0.75 3.932H7.2A8.068 8.068 0 0 1 7.2 20.068H0.75ZM4.25 7.182H7.2A4.818 4.818 0 0 1 7.2 16.818H4.25ZM19.102 3.932L22.698 3.932L16.266 20.068L12.669 20.068ZM18.811 13.683L23.006 13.683L24.178 16.68L17.617 16.68Z"
          fill={resolvedSecondary}
          fillRule="evenodd"
          clipRule="evenodd"
        />
        {/* The A's right leg: the I. */}
        <path
          d="M19.194 3.932L22.79 3.932L29.099 20.068L25.503 20.068Z"
          fill={resolvedPrimary}
        />
      </svg>
    );
  },
);

export default SvgDla;
