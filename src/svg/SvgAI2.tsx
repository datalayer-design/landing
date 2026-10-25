/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 *
 * MIT License
 */

import { forwardRef, type SVGProps } from 'react';
import { getLogoColors, type ThemeVariant } from '@datalayer/primer-addons';

export interface SvgAI2Props
  extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Height of the mark; width follows the compact A proportions. */
  size?: number;
  variant?: ThemeVariant;
  colorMode?: 'light' | 'dark' | 'auto';
  /** Colour of the A's right leg — the I embedded in the mark. */
  primaryColor?: string;
  /** Colour of the A's left leg and crossbar. */
  secondaryColor?: string;
}

const VIEW_WIDTH = 16.929;
const VIEW_HEIGHT = 24;

/**
 * Compact AI monogram.
 *
 * The I is moved over the A's right leg, replacing it rather than sitting
 * beside the A. Its geometry is the standalone A embedded in SvgDla, so both
 * marks share the same cap height, slope, stroke weight, and colour language.
 */
export const SvgAI2 = forwardRef<SVGSVGElement, SvgAI2Props>(function SvgAI2(
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
      aria-label="AI"
      ref={ref}
      {...svgProps}
    >
      {/* The A's left leg and crossbar. */}
      <path
        d="M6.682 3.932L10.278 3.932L3.846 20.068L0.249 20.068ZM6.391 13.683L10.586 13.683L11.758 16.68L5.197 16.68Z"
        fill={resolvedSecondary}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      {/* The A's right leg is also the I. */}
      <path
        d="M6.774 3.932L10.37 3.932L16.679 20.068L13.083 20.068Z"
        fill={resolvedPrimary}
      />
    </svg>
  );
});

export default SvgAI2;
