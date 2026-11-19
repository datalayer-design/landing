/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * CC BY 4.0 License
 */

/**
 * Poppy 1.0: the card of the outbound that says Datalayer's SDK speaks
 * version 1.0 of Poppy, the Personal Agent Protocol (the user, 19 November
 * 2026).
 *
 * 1200×630, the Open Graph size, so LinkedIn, X, Bluesky and the blog draw
 * it large and uncropped.
 *
 * The Datalayer square logo, with a red poppy grown over its corner. The red
 * poppy is the remembrance flower of the First World War, from the fields of
 * Flanders, in Belgium, where poppies came up over the churned earth and
 * where John McCrae wrote "In Flanders Fields". The SDK is built in Belgium:
 * the protocol's nickname and the place meet in one flower.
 *
 * Text is set in a system stack and the logo is drawn from rectangles, so
 * the card rasterises the same wherever it is exported.
 */

import { useId } from 'react';
import {
  DatalayerLogo,
  getColorPalette,
  getLogoColors,
  useThemeStore,
  type ColorMode,
  type ColorPalette,
  type ThemeVariant,
} from '@datalayer/primer-addons';

const WIDTH = 1200;
const HEIGHT = 630;

/* The square logo, on the left third. */
const LOGO_X = 110;
const LOGO_Y = 170;
const LOGO_SIZE = 290;

/* The poppy's head sits over the logo's top-right corner. */
const FLOWER_X = LOGO_X + LOGO_SIZE + 4;
const FLOWER_Y = LOGO_Y - 14;
const PETAL = 108;

/* The text column. */
const TEXT_X = 578;

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/* Poppy reds, fixed: the flower is the subject and must stay red in every theme. */
const RED_DEEP = '#7d0a14';
const RED = '#c8102e';
const RED_BRIGHT = '#e8343a';
const STEM = '#3f6b2a';
const STEM_LIGHT = '#6f9a3c';
const HEART = '#16110f';

/** One petal, pointing up from the flower's centre: a broad fan, length `r`. */
const petalPath = (r: number) =>
  [
    'M0,0',
    `C${-r * 0.62},${-r * 0.12} ${-r * 0.86},${-r * 0.82} ${-r * 0.26},${-r * 0.99}`,
    `C${-r * 0.08},${-r * 1.05} ${r * 0.08},${-r * 1.02} ${r * 0.22},${-r * 0.98}`,
    `C${r * 0.84},${-r * 0.84} ${r * 0.6},${-r * 0.1} 0,0`,
    'Z',
  ].join(' ');

/** The faint creases a poppy petal carries, fanning from the heart. */
const creasePaths = (r: number) =>
  [-0.42, -0.18, 0.06, 0.3].map(
    (t) => `M0,${-r * 0.18} Q${r * t * 0.6},${-r * 0.55} ${r * t},${-r * 0.88}`,
  );

type SvgPoppy1_0Props = {
  /** The headline. */
  title?: string;
  /** The line under it. */
  subtitle?: string;
  /** Background palette. Derived from `variant`/`colorMode` when absent. */
  palette?: ColorPalette;
  /** Draw the card for this theme rather than for the reader's own. */
  variant?: ThemeVariant;
  /** The colour mode to go with `variant`. The store's when absent. */
  colorMode?: ColorMode;
};

export function SvgPoppy1_0({
  title = 'Poppy 1.0',
  subtitle = 'Our open-source SDK speaks it.',
  palette: paletteProp,
  variant,
  colorMode: colorModeProp,
}: SvgPoppy1_0Props = {}) {
  const stored = useThemeStore();
  const theme = variant ?? stored.theme;
  const colorMode = colorModeProp ?? stored.colorMode;
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const logoColors = getLogoColors(theme, effectiveColorMode);
  const p = paletteProp ?? getColorPalette(theme, effectiveColorMode);
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `poppy10-${uid}-${name}`;

  /* Four petals, two behind and two in front, the flower turned a little. */
  const petals = [
    { angle: -62, scale: 1.04, fill: `url(#${id('petal-back')})` },
    { angle: 118, scale: 0.96, fill: `url(#${id('petal-back')})` },
    { angle: 22, scale: 1.0, fill: `url(#${id('petal-front')})` },
    { angle: 202, scale: 0.92, fill: `url(#${id('petal-front')})` },
  ];

  /* The stamens, a ring of dark dots around the seed head. */
  const stamens = Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * Math.PI * 2;
    const r = 25 + (i % 3) * 4;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r, s: 3.2 - (i % 3) * 0.6 };
  });

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label={`Datalayer — ${title}. ${subtitle} Built in Belgium.`}
    >
      <defs>
        <linearGradient id={id('bg')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.bgAlt} />
        </linearGradient>
        <radialGradient id={id('halo')} cx={FLOWER_X / WIDTH} cy={FLOWER_Y / HEIGHT} r="0.55">
          <stop offset="0%" stopColor={RED} stopOpacity={p.isLight ? '0.16' : '0.26'} />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </radialGradient>
        <pattern id={id('dots')} width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill={p.primary} opacity={p.isLight ? '0.14' : '0.10'} />
        </pattern>
        <radialGradient id={id('petal-back')} cx="0" cy="0" r={PETAL} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={RED_DEEP} />
          <stop offset="55%" stopColor={RED} />
          <stop offset="100%" stopColor="#a50d22" />
        </radialGradient>
        <radialGradient id={id('petal-front')} cx="0" cy="0" r={PETAL} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={RED_DEEP} />
          <stop offset="40%" stopColor={RED} />
          <stop offset="100%" stopColor={RED_BRIGHT} />
        </radialGradient>
        <linearGradient id={id('stem')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={STEM} />
          <stop offset="100%" stopColor={STEM_LIGHT} />
        </linearGradient>
        <filter id={id('shadow')} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity={p.isLight ? '0.18' : '0.4'} />
        </filter>
      </defs>

      {/* Ground */}
      <rect width={WIDTH} height={HEIGHT} fill={`url(#${id('bg')})`} />
      <rect width={WIDTH} height={HEIGHT} fill={`url(#${id('dots')})`} />
      <rect width={WIDTH} height={HEIGHT} fill={`url(#${id('halo')})`} />

      {/* The earth the poppies come up through: a low, broken ridge. */}
      <path
        d={`M0,${HEIGHT - 34} C120,${HEIGHT - 50} 220,${HEIGHT - 24} 340,${HEIGHT - 40} S560,${HEIGHT - 22} 700,${HEIGHT - 38} S960,${HEIGHT - 26} ${WIDTH},${HEIGHT - 44} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`}
        fill={p.textMuted}
        opacity={p.isLight ? 0.1 : 0.14}
      />

      {/* The Datalayer square logo */}
      <DatalayerLogo
        x={LOGO_X}
        y={LOGO_Y}
        size={LOGO_SIZE}
        variant={theme}
        colorMode={effectiveColorMode}
        primaryColor={logoColors.primary}
        secondaryColor={logoColors.secondary}
      />

      {/* The stem, from the earth up past the logo's right edge to the flower */}
      <path
        d={`M${FLOWER_X + 70},${HEIGHT - 30} C${FLOWER_X + 92},${HEIGHT - 170} ${FLOWER_X + 30},${FLOWER_Y + 240} ${FLOWER_X + 6},${FLOWER_Y + 30}`}
        stroke={`url(#${id('stem')})`}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* A leaf, deeply cut as a poppy's is */}
      <path
        d={`M${FLOWER_X + 74},${HEIGHT - 120} c26,-18 40,-30 62,-34 c-10,10 -8,16 4,18 c-14,8 -18,14 -10,20 c-18,2 -26,6 -26,14 c-12,-8 -22,-12 -30,-18 Z`}
        fill={STEM}
        opacity="0.92"
      />
      {/* A bud, still closed, nodding on its own stem */}
      <path
        d={`M${FLOWER_X + 82},${HEIGHT - 70} C${FLOWER_X + 120},${HEIGHT - 150} ${FLOWER_X + 150},${HEIGHT - 200} ${FLOWER_X + 136},${HEIGHT - 236}`}
        stroke={`url(#${id('stem')})`}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx={FLOWER_X + 136}
        cy={HEIGHT - 252}
        rx="13"
        ry="20"
        transform={`rotate(24 ${FLOWER_X + 136} ${HEIGHT - 252})`}
        fill={STEM_LIGHT}
      />
      <path
        d={`M${FLOWER_X + 131},${HEIGHT - 270} q8,-6 14,2`}
        stroke={RED}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* The poppy */}
      <g transform={`translate(${FLOWER_X} ${FLOWER_Y}) rotate(-12)`} filter={`url(#${id('shadow')})`}>
        {petals.map(({ angle, scale, fill }) => (
          <g key={angle} transform={`rotate(${angle}) scale(${scale})`}>
            <path d={petalPath(PETAL)} fill={fill} />
            {creasePaths(PETAL).map((d) => (
              <path key={d} d={d} stroke={RED_DEEP} strokeWidth="1.4" opacity="0.28" fill="none" />
            ))}
          </g>
        ))}
        {/* The dark heart, its stamens, and the seed head with its rayed cap */}
        <circle r="30" fill={HEART} opacity="0.92" />
        {stamens.map(({ x, y, s }, i) => (
          <circle key={i} cx={x} cy={y} r={s} fill={HEART} />
        ))}
        <circle r="15" fill="#4c5a2c" />
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={Math.cos((i / 8) * Math.PI * 2) * 13}
            y2={Math.sin((i / 8) * Math.PI * 2) * 13}
            stroke={HEART}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* The words */}
      <text x={TEXT_X} y="250" fill={p.textMuted} fontSize="26" fontWeight="600" letterSpacing="3" fontFamily={FONT}>
        PERSONAL AGENT PROTOCOL
      </text>
      <text x={TEXT_X - 4} y="352" fill={p.textLight} fontSize="100" fontWeight="800" letterSpacing="-2" fontFamily={FONT}>
        {title}
      </text>
      <text x={TEXT_X} y="408" fill={p.textLight} fontSize="32" fontWeight="600" fontFamily={FONT}>
        {subtitle}
      </text>
      <text x={TEXT_X} y="454" fill={p.textMuted} fontSize="27" fontWeight="500" fontFamily={FONT}>
        Python · TypeScript · built in Belgium
      </text>
      <text x={TEXT_X} y="540" fill={p.textMuted} fontSize="22" fontStyle="italic" opacity="0.85" fontFamily="Georgia, 'Times New Roman', serif">
        In Flanders fields the poppies blow
      </text>
    </svg>
  );
}

export default SvgPoppy1_0;
