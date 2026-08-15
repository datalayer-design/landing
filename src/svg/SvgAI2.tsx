/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { forwardRef, type SVGProps } from "react";
import { getLogoColors, type ThemeVariant } from "@datalayer/primer-addons";

export interface SvgAI2Props extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  size?: number;
  variant?: ThemeVariant;
  colorMode?: "light" | "dark" | "auto";
  primaryColor?: string;
  secondaryColor?: string;
}

export const SvgAI2 = forwardRef<SVGSVGElement, SvgAI2Props>(function SvgAI2(
  {
    size = 24,
    variant = "datalayer",
    colorMode = "light",
    primaryColor,
    secondaryColor,
    ...svgProps
  },
  ref,
) {
  const themed = getLogoColors(variant, colorMode);
  const resolvedPrimary = primaryColor ?? themed.primary;
  const resolvedSecondary = secondaryColor ?? themed.textColor;
  const barWidth = 3.1;
  const leftBarBottomInnerX = -2.2 + barWidth;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="-2.2 0 26.2 24"
      width={size}
      height={size}
      role="img"
      aria-label="AI2"
      ref={ref}
      {...svgProps}
    >
      <path
        d={`M15.35 3.5h${barWidth}V20h-${barWidth}z`}
        fill={resolvedPrimary}
      />
      <path
        d={`M-2.2 20 9.8 3.5h${barWidth}L${leftBarBottomInnerX} 20H-2.2z`}
        fill={resolvedSecondary}
      />
      <path
        d={`M10.35 3.5h${barWidth}V20h-${barWidth}z`}
        fill={resolvedSecondary}
      />
      <path d="M3.5 12.95h9.6v2.75H3.5z" fill={resolvedSecondary} />
    </svg>
  );
});

export default SvgAI2;
