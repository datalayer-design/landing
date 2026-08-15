/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { forwardRef, type SVGProps } from "react";
import { getLogoColors, type ThemeVariant } from "@datalayer/primer-addons";

export interface SvgAIProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  size?: number;
  variant?: ThemeVariant;
  colorMode?: "light" | "dark" | "auto";
  primaryColor?: string;
  secondaryColor?: string;
}

export const SvgAI = forwardRef<SVGSVGElement, SvgAIProps>(function SvgAI(
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

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-label="AI"
      ref={ref}
      {...svgProps}
    >
      <path
        d="m13.788825 3.932 6.43325 16.136075h3.5279L17.316725 3.932H13.788825Z"
        fill={resolvedPrimary}
        strokeWidth={0.25}
      />
      <path
        d="m6.325375 13.682775 2.20125 -5.67065 2.201275 5.67065H6.325375ZM6.68225 3.932 0.25 20.068075h3.596525l1.3155 -3.3886h6.729425l1.315275 3.3886h3.59655L10.371 3.932H6.68225Z"
        fill={resolvedSecondary}
        fillRule="evenodd"
        clipRule="evenodd"
        strokeWidth={0.25}
      />
    </svg>
  );
});

export default SvgAI;
