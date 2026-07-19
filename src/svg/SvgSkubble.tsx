/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Skubble picto illustration.
 *
 * The artwork is baked directly into JSX and colored from the active
 * ColorPalette so the icon reacts to theme and color mode changes.
 */

import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

export function SvgSkubble({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  const ink = p.isLight ? p.primary : p.spark;
  const disc = p.isLight ? p.bg : p.bgAlt;
  const warm = p.glow;
  const accent = p.isLight ? p.flame : p.pop;

  return (
    <svg
      viewBox="0 0 243.74999 243.74999"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Skubble"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <g transform="translate(0,-308.26772)">
        <circle
          cx="121.875"
          cy="430.14273"
          r="120.41112"
          fill={disc}
          stroke={ink}
          strokeWidth="2.92776"
          strokeMiterlimit="4"
        />
        <path
          d="M 112.41246,477.23841 95.46421,403.30415 c -4.2296,-19.16842 -16.97432,-14.7834 -11.44396,-0.55712 6.26679,10.89568 28.38883,21.76275 33.58218,6.10585 -4.52367,-5.74256 -6.62795,-12.58985 1.33229,-16.64929"
          fill="none"
          stroke={warm}
          strokeWidth="2.92759"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
        />
        <path
          d="m 119.67478,477.58822 0.25291,-140.16632 c -73.53155,5.11029 -86.69542,84.24234 -28.2504,114.70058 l 0.61059,25.33929 z"
          fill="none"
          stroke={ink}
          strokeWidth="2.92776"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
        />
        <path
          d="M 120.06949,482.65174 H 93.81434 c -2.94542,4.66719 -3.57543,8.04027 2.74762,13.12758 -6.61918,0.86494 -6.3776,8.54786 -2.90027,10.68524 -4.24126,1.55663 -5.28207,8.72698 6.86908,7.9376 l 1.62533,5.48548 c 0.73287,2.11363 1.746,2.54573 2.75988,2.97329 l 10.45835,-0.0863 c 1.99122,-0.7197 4.29846,-2.10452 4.38988,-5.01432 z"
          fill="none"
          stroke={ink}
          strokeWidth="2.92759"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
        />
        <path
          d="m 124.2911,477.46177 -0.46878,-139.95045 c 73.53155,5.11029 86.69544,84.45821 28.25041,114.91645 l -0.61058,25.33929 z"
          fill="none"
          stroke={accent}
          strokeWidth="2.92776"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
        />
        <path
          d="m 125.31946,482.95703 -0.3053,32.36102 c 1.31731,11.05851 11.07182,8.62882 10.99053,-0.6106 v -31.75042 z"
          fill="none"
          stroke={accent}
          strokeWidth="2.92759"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
        />
        <path
          d="m 139.9574,482.95703 -0.30529,32.36102 c 1.3173,11.05851 11.07181,8.62882 10.99053,-0.6106 v -31.75042 z"
          fill="none"
          stroke={accent}
          strokeWidth="2.92759"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="4"
        />
        <path
          d="m 131.62747,399.81416 c 1.77794,-4.47145 12.6278,-9.48258 19.48634,-14.06198 7.11721,3.21293 17.74166,13.14465 12.80377,25.55515 -1.26467,4.90066 -28.04871,4.54388 -30.22396,2.13705 -4.48061,-4.60617 -3.11506,-10.02441 -2.06615,-13.63022 z"
          fill="none"
          stroke={accent}
          strokeWidth="2.92759"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeMiterlimit="4"
        />
        <path
          d="m 128.19835,428.25108 c -0.91063,7.57617 -0.57735,13.90845 -0.76323,20.75989 3.42438,0.78785 7.2616,0.33714 11.08153,-0.0616 -2.74985,-6.95029 -5.70336,-13.74795 -10.3183,-20.69824 z"
          fill="none"
          stroke={accent}
          strokeWidth="2.92759"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeMiterlimit="4"
        />
      </g>
    </svg>
  );
}

export default SvgSkubble;
