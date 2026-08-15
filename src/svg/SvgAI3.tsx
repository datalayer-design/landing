/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { forwardRef, type SVGProps } from "react";
import { getLogoColors, type ThemeVariant } from "@datalayer/primer-addons";

export interface SvgAI3Props extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  size?: number;
  variant?: ThemeVariant;
  colorMode?: "light" | "dark" | "auto";
  primaryColor?: string;
  secondaryColor?: string;
}

const ARTBOARD_WIDTH = 83;
const ARTBOARD_HEIGHT = 48;
const TOP = 2;
const BOTTOM = 46;
const APEX_X = 32;
const APEX_GAP = 2;
const I_HALF_WIDTH = 4.5;
const A_WEIGHT_RATIO = 0.9;
const A_HALF_WIDTH = I_HALF_WIDTH * A_WEIGHT_RATIO;
const I_GAP = I_HALF_WIDTH * 2;
const BASELINE_WIDTH = 24;
const FOOT_GAP = 1.5;

type Point = readonly [x: number, y: number];

const points = (values: readonly Point[]) =>
  values.map(([x, y]) => `${x},${y}`).join(" ");

const leftApexX = APEX_X - APEX_GAP / 2;
const rightApexX = APEX_X + APEX_GAP / 2;
const baselineX = APEX_X - BASELINE_WIDTH / 2;
const leftBaseCenter = baselineX - FOOT_GAP - A_HALF_WIDTH;
const legRun = leftApexX + A_HALF_WIDTH - leftBaseCenter;
const legSlope = legRun / (BOTTOM - TOP);
const apexShoulderY = TOP + (A_HALF_WIDTH * 2) / legSlope;
const baselineHeight = (A_HALF_WIDTH * 2) / Math.sqrt(1 + legSlope * legSlope);
const baselineTop = BOTTOM - baselineHeight;
const baselineEndInset = legSlope * baselineHeight;

const leftLegPoints: readonly Point[] = [
  [leftBaseCenter - A_HALF_WIDTH, BOTTOM],
  [leftApexX, TOP],
  [leftApexX, apexShoulderY],
  [leftBaseCenter + A_HALF_WIDTH, BOTTOM],
];

const leftLeg = points(leftLegPoints);
const rightLeg = points(
  leftLegPoints.map(([x, y]) => [APEX_X * 2 - x, y] as const),
);

const iTopLeft = rightApexX + I_GAP;
const iStroke = points([
  [iTopLeft, TOP],
  [iTopLeft + I_HALF_WIDTH * 2, TOP],
  [iTopLeft + I_HALF_WIDTH * 2 + legRun, BOTTOM],
  [iTopLeft + legRun, BOTTOM],
]);

const baseline = points([
  [baselineX + baselineEndInset, baselineTop],
  [baselineX + BASELINE_WIDTH - baselineEndInset, baselineTop],
  [baselineX + BASELINE_WIDTH, BOTTOM],
  [baselineX, BOTTOM],
]);

/** AI mark constructed from a shared stroke width, slope, and gap system. */
export const SvgAI3 = forwardRef<SVGSVGElement, SvgAI3Props>(function SvgAI3(
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
      viewBox={`0 0 ${ARTBOARD_WIDTH} ${ARTBOARD_HEIGHT}`}
      width={size * (ARTBOARD_WIDTH / ARTBOARD_HEIGHT)}
      height={size}
      role="img"
      aria-label="AI3"
      ref={ref}
      {...svgProps}
    >
      <polygon points={leftLeg} fill={resolvedSecondary} />
      <polygon points={rightLeg} fill={resolvedSecondary} />
      <polygon points={iStroke} fill={resolvedPrimary} />
      <polygon points={baseline} fill={resolvedSecondary} />
    </svg>
  );
});

export default SvgAI3;
