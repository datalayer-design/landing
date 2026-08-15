/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Earth hero: abstract architectural painting — planet, sea, arboreal forms and birds
 * arranged as a flat, geometric composition in the spirit of constructivist art.
 */

import {
  type ColorPalette,
  useColorPalette,
  LightBoostFilter,
} from "@datalayer/primer-addons";

export function SvgEarthHero({
  palette: paletteProp,
}: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  const lo = p.isLight;
  // The disc carries the picture, so it is drawn nearer to full strength than
  // the scenery around it. Below this it reads as a haze rather than a planet.
  const planetOpacity = lo ? 1 : 0.95;
  const seaFillOpacity = lo ? 0.9 : 0.78;
  const leafOpacity = lo ? 0.88 : 0.72;
  const gridOpacity = lo ? 0.1 : 0.07;
  const glowOpacity = lo ? 0.36 : 0.24;
  const strokeMid = lo ? 0.34 : 0.2;

  /**
   * The water, as one shape used by the fill, the clip and the outline.
   *
   * It ended at a vertical edge on x=516, which put a straight seam between
   * the sea and the sand starting at x=460 — two flat panels butted together
   * rather than a coast. It now carries on to the right and drops away
   * beneath the beach, so the sand (which fades in from its own left edge)
   * overlaps open water and the two read as one shoreline.
   *
   * One constant rather than three copies: the clip and the outline have to
   * trace the fill exactly, and three literals is three chances for them not
   * to.
   */
  /** The waterline alone, for the foam drawn along it. Traces `SEA_PATH`. */
  const SEA_COAST =
    "M 0 325 C 30 312,60 338,100 321 C 135 305,175 337,220 325 " +
    "C 260 313,295 335,340 323 C 375 311,415 334,462 330 " +
    "C 510 326,548 344,588 370";

  /** The shore surface: beach and forest floor as one continuous line. */
  const SHORE_TOP =
    "M 432 332 C 500 328,562 324,625 318 C 690 311,758 305,826 300 " +
    "C 890 298,950 300,1010 304 C 1140 308,1270 307,1400 306";

  const SEA_PATH =
    "M 0 420 L 0 325 C 30 312,60 338,100 321 C 135 305,175 337,220 325 " +
    "C 260 313,295 335,340 323 C 375 311,415 334,462 330 " +
    "C 510 326,548 344,588 370 " +
    "C 608 378,608 393,590 401 " +
    "C 546 417,466 423,392 419 C 262 414,130 419,0 420 Z";

  return (
    <svg
      viewBox="0 0 1400 420"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        inset: 0,
      }}
    >
      <defs>
        <LightBoostFilter />

        {/* ── Background gradient ────────────────────────────────────── */}
        <linearGradient id="eaBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="60%" stopColor={p.bgAlt} />
          <stop offset="100%" stopColor={p.bgPanel} />
        </linearGradient>

        {/* ── Planet fill ───────────────────────────────────────────── */}
        <radialGradient id="eaPlanet" cx="50%" cy="44%" r="50%">
          <stop offset="0%" stopColor={p.gold} stopOpacity="1" />
          <stop offset="18%" stopColor={p.spark} stopOpacity="0.98" />
          <stop offset="40%" stopColor={p.glow} stopOpacity="0.95" />
          <stop offset="62%" stopColor={p.primary} stopOpacity="0.92" />
          <stop offset="84%" stopColor={p.surge} stopOpacity="0.85" />
          <stop offset="100%" stopColor={p.bg} stopOpacity="0.12" />
        </radialGradient>

        {/* ── Planet land masses ────────────────────────────────────── */}
        <radialGradient id="eaLand" cx="42%" cy="38%" r="58%">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0.70" />
          <stop offset="50%" stopColor={p.spark} stopOpacity="0.50" />
          <stop offset="100%" stopColor={p.pop} stopOpacity="0" />
        </radialGradient>

        {/* ── Sea panel ─────────────────────────────────────────────── */}
        <linearGradient id="eaSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.glow} />
          <stop offset="55%" stopColor={p.surge} />
          <stop offset="100%" stopColor={p.primary} />
        </linearGradient>

        {/* ── Sea shimmer ───────────────────────────────────────────── */}
        <linearGradient id="eaSeaShimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0" />
          <stop
            offset="40%"
            stopColor={p.accent}
            stopOpacity={lo ? 0.38 : 0.22}
          />
          <stop
            offset="70%"
            stopColor={p.gold}
            stopOpacity={lo ? 0.28 : 0.16}
          />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </linearGradient>

        {/* ── Glow halo ─────────────────────────────────────────────── */}
        <radialGradient id="eaHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.gold} stopOpacity={lo ? 0.5 : 0.3} />
          <stop offset="100%" stopColor={p.gold} stopOpacity="0" />
        </radialGradient>
        {/* ── Sandy beach ───────────────────────────────────── */}
        <linearGradient id="eaSand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.gold} stopOpacity="0" />
          <stop
            offset="18%"
            stopColor={p.gold}
            stopOpacity={lo ? 0.72 : 0.52}
          />
          <stop offset="70%" stopColor={p.gold} stopOpacity={lo ? 0.6 : 0.4} />
          <stop offset="100%" stopColor={p.gold} stopOpacity="0" />
        </linearGradient>

        {/* The shore, as one surface: sand at the waterline on the left
            running to the green of the forest floor on the right. `gold` and
            `surge` are the palette's yellow and its sage, so this stays the
            theme's own colours rather than two literals that would clash with
            every other variant. */}
        <linearGradient id="eaShore" x1="0" y1="0" x2="1" y2="0">
          {/* Fades in from nothing on the left. Begun at full strength it cut
              a vertical edge into the water where the shape starts. */}
          <stop offset="0%" stopColor={p.gold} stopOpacity="0" />
          <stop offset="9%" stopColor={p.gold} stopOpacity={lo ? 0.9 : 0.7} />
          <stop
            offset="34%"
            stopColor={p.gold}
            stopOpacity={lo ? 0.76 : 0.58}
          />
          <stop
            offset="62%"
            stopColor={p.surge}
            stopOpacity={lo ? 0.6 : 0.46}
          />
          <stop
            offset="100%"
            stopColor={p.surge}
            stopOpacity={lo ? 0.72 : 0.54}
          />
        </linearGradient>

        {/* ── Grid texture ──────────────────────────────────────────── */}
        <pattern
          id="eaGrid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0 L0 0 L0 40"
            fill="none"
            stroke={p.accent}
            strokeWidth="0.5"
            opacity={gridOpacity}
          />
        </pattern>

        {/* ── Fine dot field ────────────────────────────────────────── */}
        <pattern
          id="eaDots"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="2"
            cy="2"
            r="1"
            fill={p.accent}
            opacity={lo ? 0.14 : 0.08}
          />
        </pattern>

        {/* ── Wave texture for sea ──────────────────────────────────── */}
        <pattern
          id="eaWaves"
          width="80"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 9 C14 3, 30 3, 40 9 C50 15, 66 15, 80 9"
            fill="none"
            stroke={p.accent}
            strokeOpacity={lo ? 0.28 : 0.14}
            strokeWidth="1.2"
          />
        </pattern>

        {/* ── Filters ───────────────────────────────────────────────── */}
        <filter id="eaGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="eaSoftBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="eaMedBlur" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        {/* ── Clip: planet disc ─────────────────────────────────────── */}
        <clipPath id="eaPlanetClip">
          <circle cx="700" cy="210" r="196" />
        </clipPath>

        {/* ── Clip: sea panel — organic coastline shape ──────────────── */}
        <clipPath id="eaSeaClip">
          <path d={SEA_PATH} />
        </clipPath>

        {/* ── Symbols ───────────────────────────────────────────────── */}

        {/* Architectural tree: geometric layered canopy */}
        <symbol id="eaTreeArch" viewBox="0 0 48 96">
          {/* Trunk. It starts under the lowest canopy layer, which ends at
              y=50 — begun at 66 it stood clear of the leaves with a gap of
              daylight between them. */}
          <rect
            x="21"
            y="46"
            width="6"
            height="48"
            rx="1"
            fill={p.flame}
            opacity="0.55"
          />
          {/* canopy layers — stacked hexagons/diamonds */}
          <polygon
            points="24,8 38,28 30,28 42,46 6,46 18,28 10,28"
            fill={p.pop}
            opacity="0.92"
          />
          <polygon points="24,16 35,32 13,32" fill={p.spark} opacity="0.64" />
          <polygon
            points="24,36 36,50 12,50"
            fill={p.secondary}
            opacity="0.48"
          />
        </symbol>

        {/* Tall pine: sharp constructivist triangle */}
        <symbol id="eaPineArch" viewBox="0 0 40 90">
          <rect
            x="18"
            y="66"
            width="4"
            height="22"
            rx="1"
            fill={p.flame}
            opacity="0.52"
          />
          <polygon points="20,4 36,68 4,68" fill={p.pop} opacity="0.88" />
          <polygon points="20,18 34,60 6,60" fill={p.spark} opacity="0.48" />
          <polygon points="20,32 30,54 10,54" fill={p.glow} opacity="0.34" />
        </symbol>

        {/* Broad canopy tree: wide soft crown */}
        <symbol id="eaTreeRound" viewBox="0 0 64 80">
          <rect
            x="29"
            y="54"
            width="6"
            height="24"
            rx="1"
            fill={p.flame}
            opacity="0.48"
          />
          <ellipse
            cx="32"
            cy="34"
            rx="26"
            ry="22"
            fill={p.pop}
            opacity="0.84"
          />
          <ellipse
            cx="20"
            cy="38"
            rx="16"
            ry="13"
            fill={p.spark}
            opacity="0.56"
          />
          <ellipse
            cx="44"
            cy="37"
            rx="15"
            ry="12"
            fill={p.secondary}
            opacity="0.52"
          />
          <ellipse
            cx="32"
            cy="24"
            rx="12"
            ry="10"
            fill={p.glow}
            opacity="0.40"
          />
        </symbol>

        {/* Abstract ground shrub */}
        <symbol id="eaShrubArch" viewBox="0 0 50 28">
          <ellipse
            cx="12"
            cy="18"
            rx="11"
            ry="9"
            fill={p.spark}
            opacity="0.78"
          />
          <ellipse
            cx="26"
            cy="13"
            rx="14"
            ry="11"
            fill={p.pop}
            opacity="0.84"
          />
          <ellipse
            cx="40"
            cy="18"
            rx="10"
            ry="8"
            fill={p.secondary}
            opacity="0.60"
          />
        </symbol>

        {/* Minimalist bird: two bezier wing arcs */}
        <symbol id="eaBirdArch" viewBox="0 0 52 22">
          <path
            d="M2 16 C12 4, 22 4, 26 12 C30 4, 40 4, 50 16"
            fill="none"
            stroke={p.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>

        {/* Soaring eagle silhouette */}
        <symbol id="eaEagle" viewBox="0 0 80 32">
          <path
            d="M0 22 C16 8, 30 6, 40 16 C50 6, 64 8, 80 22"
            fill="none"
            stroke={p.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* head nub */}
          <ellipse
            cx="40"
            cy="13"
            rx="4"
            ry="3"
            fill={p.secondary}
            opacity="0.7"
          />
          {/* tail */}
          <path
            d="M36 18 L32 28 M44 18 L48 28"
            fill="none"
            stroke={p.secondary}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </symbol>

        {/* Dolphin, mid-leap. Straight-bodied it read as a fish however the
            beak was drawn; a leaping dolphin is an arc. So the body is a
            crescent — back strongly convex, belly concave, tail swinging up
            behind — with the beak, the falcate dorsal and the horizontal
            flukes set on it. */}
        <symbol id="eaDolphin" viewBox="0 0 132 88">
          <path
            d="M126 26
               C110 13, 84 9, 60 19
               C38 28, 21 48, 12 72
               C24 60, 36 50, 52 43
               C76 33, 104 30, 126 26 Z"
            fill={p.accent}
            opacity="0.96"
          />
          {/* falcate dorsal, on the outside of the arc */}
          <path
            d="M46 30 C37 21, 26 16, 15 15 C28 21, 37 28, 41 37 Z"
            fill={p.accent}
            opacity="0.94"
          />
          {/* pectoral, on the inside of the arc */}
          <path
            d="M74 34 C71 45, 64 55, 54 62 C65 53, 71 44, 72 33 Z"
            fill={p.accent}
            opacity="0.8"
          />
          {/* horizontal notched flukes, swung up behind */}
          <path d="M14 70 L1 63 L9 72 L0 85 Z" fill={p.accent} opacity="0.92" />
          <circle cx="106" cy="24" r="2.4" fill={p.bg} opacity="0.66" />
          <path
            d="M125 27 C118 27.6, 111 28.4, 105 29"
            fill="none"
            stroke={p.bg}
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </symbol>

        {/* Whale: a back breaking the surface, a fluke behind it, and the
            spout — which is the part that actually reads at this size. */}
        <symbol id="eaWhale" viewBox="0 0 104 56">
          <path
            d="M8 50 C22 36, 40 24, 62 21 C80 19, 93 31, 99 50 Z"
            fill={p.secondary}
            opacity="0.88"
          />
          <path
            d="M12 50 C7 42, 4 35, 2 28 C9 32, 16 39, 19 46 Z"
            fill={p.secondary}
            opacity="0.7"
          />
          <ellipse cx="78" cy="33" rx="3" ry="2.4" fill={p.bg} opacity="0.45" />
          {/* The spout. Three strokes, not two: two of anything sprouting
              from a head are antennae, whatever they are drawn like. */}
          <path
            d="M60 20 C57 13, 54 8, 50 3"
            fill="none"
            stroke={p.glow}
            strokeWidth="3.4"
            strokeLinecap="round"
            opacity="0.78"
          />
          <path
            d="M62 20 C62 12, 62 7, 62 2"
            fill="none"
            stroke={p.glow}
            strokeWidth="3.4"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M64 20 C67 13, 70 8, 74 3"
            fill="none"
            stroke={p.glow}
            strokeWidth="3.4"
            strokeLinecap="round"
            opacity="0.78"
          />
          <circle cx="48" cy="1" r="2.4" fill={p.glow} opacity="0.5" />
          <circle cx="62" cy="0" r="2.2" fill={p.glow} opacity="0.45" />
          <circle cx="76" cy="1" r="2.4" fill={p.glow} opacity="0.5" />
        </symbol>

        {/* Cloud, upper right — the sky was empty on that side. */}
        <symbol id="eaCloud" viewBox="0 0 96 36">
          <ellipse cx="27" cy="24" rx="21" ry="12" />
          <ellipse cx="52" cy="17" rx="25" ry="15" />
          <ellipse cx="74" cy="24" rx="18" ry="11" />
          <rect x="8" y="21" width="80" height="13" rx="6.5" />
        </symbol>

        {/* Beach parasol: a scalloped dome on a pole, with two lighter
            panels so it reads as fabric segments rather than a mushroom. */}
        <symbol id="eaParasol" viewBox="0 0 60 74">
          <rect
            x="28"
            y="24"
            width="3.5"
            height="50"
            rx="1.5"
            fill={p.flame}
            opacity="0.72"
          />
          <path
            d="M2 26 C4 10, 16 1, 30 1 C44 1, 56 10, 58 26 Z"
            fill={p.blaze}
            opacity="0.94"
          />
          <path
            d="M30 1 C22 1, 14 6, 9 14 L2 26 L17 26 C19 16, 24 7, 30 1 Z"
            fill={p.gold}
            opacity="0.8"
          />
          <path
            d="M30 1 C35 7, 38 16, 40 26 L48 26 C46 15, 40 6, 34 2 Z"
            fill={p.gold}
            opacity="0.8"
          />
          <path
            d="M2 26 L58 26"
            stroke={p.flame}
            strokeOpacity="0.38"
            strokeWidth="1.6"
          />
          <circle cx="30" cy="1.5" r="2.2" fill={p.flame} opacity="0.75" />
        </symbol>

        {/* Bear: heavy, round, low to the ground. */}
        <symbol id="eaBear" viewBox="0 0 76 50">
          <ellipse
            cx="33"
            cy="27"
            rx="27"
            ry="16"
            fill={p.flame}
            opacity="0.9"
          />
          <circle cx="63" cy="19" r="10.5" fill={p.flame} opacity="0.92" />
          <circle cx="57" cy="10" r="3.8" fill={p.flame} opacity="0.8" />
          <circle cx="69" cy="10" r="3.8" fill={p.flame} opacity="0.8" />
          <ellipse
            cx="72"
            cy="22"
            rx="4.5"
            ry="3.2"
            fill={p.pop}
            opacity="0.62"
          />
          <rect
            x="12"
            y="38"
            width="8"
            height="12"
            rx="2.5"
            fill={p.flame}
            opacity="0.86"
          />
          <rect
            x="27"
            y="40"
            width="8"
            height="10"
            rx="2.5"
            fill={p.flame}
            opacity="0.78"
          />
          <rect
            x="43"
            y="38"
            width="8"
            height="12"
            rx="2.5"
            fill={p.flame}
            opacity="0.86"
          />
          <rect
            x="54"
            y="40"
            width="7"
            height="10"
            rx="2.5"
            fill={p.flame}
            opacity="0.78"
          />
        </symbol>

        {/* Wolf: the same animal grammar drawn lean and angular — long back,
            pricked ears, low tail — so the two read as different species rather
            than two sizes of the same one. */}
        <symbol id="eaWolf" viewBox="0 0 80 46">
          <path
            d="M11 23 C20 15, 41 13, 53 17 L60 21 L55 33 L17 33 Z"
            fill={p.secondary}
            opacity="0.88"
          />
          <path
            d="M53 17 L66 12 L75 21 L61 25 Z"
            fill={p.secondary}
            opacity="0.92"
          />
          <path d="M57 13 L59 4 L64 12 Z" fill={p.secondary} opacity="0.78" />
          <path d="M64 12 L69 4 L71 14 Z" fill={p.secondary} opacity="0.78" />
          <path d="M75 21 L80 23 L73 26 Z" fill={p.pop} opacity="0.6" />
          <path
            d="M11 23 C2 18, 0 27, 7 32 Z"
            fill={p.secondary}
            opacity="0.74"
          />
          <rect
            x="19"
            y="33"
            width="5"
            height="13"
            rx="1.6"
            fill={p.secondary}
            opacity="0.86"
          />
          <rect
            x="29"
            y="33"
            width="5"
            height="13"
            rx="1.6"
            fill={p.secondary}
            opacity="0.76"
          />
          <rect
            x="43"
            y="33"
            width="5"
            height="13"
            rx="1.6"
            fill={p.secondary}
            opacity="0.86"
          />
          <rect
            x="51"
            y="33"
            width="5"
            height="13"
            rx="1.6"
            fill={p.secondary}
            opacity="0.76"
          />
        </symbol>

        {/*
          Observation satellite: a bus with two solar wings, drawn in the same
          flat geometric language as the trees rather than as an icon.

          The picture is of Earth observation and had nothing observing in it —
          a planet, a sea, a forest and birds. These are the instrument the
          page is actually about.
        */}
        <symbol id="eaSatellite" viewBox="0 0 64 28">
          {/* solar wings */}
          <rect
            x="0"
            y="9"
            width="20"
            height="10"
            rx="1"
            fill={p.glow}
            opacity="0.72"
          />
          <rect
            x="44"
            y="9"
            width="20"
            height="10"
            rx="1"
            fill={p.glow}
            opacity="0.72"
          />
          {/* wing cell divisions */}
          <path
            d="M7 9 V19 M14 9 V19 M51 9 V19 M58 9 V19"
            stroke={p.bg}
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          {/* boom */}
          <rect
            x="20"
            y="13"
            width="24"
            height="2"
            fill={p.accent}
            opacity="0.6"
          />
          {/* bus */}
          <rect
            x="26"
            y="6"
            width="12"
            height="16"
            rx="2"
            fill={p.accent}
            opacity="0.9"
          />
          {/* sensor aperture, pointed down at the planet */}
          <polygon points="30,22 34,22 32,27" fill={p.gold} opacity="0.9" />
        </symbol>

        {/* The cone a sensor sees through, fading as it opens toward the ground. */}
        <linearGradient id="eaSwath" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.gold} stopOpacity={lo ? 0.34 : 0.24} />
          <stop offset="100%" stopColor={p.gold} stopOpacity="0" />
        </linearGradient>

        {/* Aurora ribbon over the pole. */}
        <linearGradient id="eaAurora" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.spark} stopOpacity="0" />
          <stop
            offset="35%"
            stopColor={p.spark}
            stopOpacity={lo ? 0.4 : 0.26}
          />
          <stop
            offset="65%"
            stopColor={p.glow}
            stopOpacity={lo ? 0.34 : 0.22}
          />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 0 — Background field
      ══════════════════════════════════════════════════════════════ */}
      <rect width="1400" height="420" fill="url(#eaBg)" />
      <rect width="1400" height="420" fill="url(#eaGrid)" />
      <rect width="1400" height="420" fill="url(#eaDots)" />

      <g filter={lo ? "url(#svgLightBoost)" : undefined}>
        {/* ══════════════════════════════════════════════════════════
            LAYER 1 — Architectural horizontal rule bands (golden-ratio
            proportions, 3 bands: sky / equator / earth)
        ══════════════════════════════════════════════════════════ */}
        {/* Ground/earth plane. Starts where the land does — run the full
            width it drew a rule across open water and sky. */}
        <rect
          x="920"
          y="310"
          width="480"
          height="2"
          fill={p.accent}
          opacity={lo ? 0.22 : 0.12}
        />

        {/* ══════════════════════════════════════════════════════════
            LAYER 2 — PLANET DISC (centre-left, large architectural
            globe rendered as overlapping geometric arcs)
        ══════════════════════════════════════════════════════════ */}

        {/* Halo glow */}
        <circle
          cx="700"
          cy="210"
          r="232"
          fill="url(#eaHalo)"
          filter="url(#eaSoftBlur)"
          opacity={glowOpacity * 2.2}
        />

        {/* Planet base fill */}
        <circle
          cx="700"
          cy="210"
          r="196"
          fill="url(#eaPlanet)"
          opacity={planetOpacity}
        />

        {/* A lit core. The disc is the focal point and was flattest exactly
            at its middle. */}
        <circle
          cx="678"
          cy="186"
          r="88"
          fill={p.gold}
          opacity={lo ? 0.5 : 0.34}
          filter="url(#eaSoftBlur)"
        />

        {/* Land masses on planet surface — irregular blobs */}
        <g clipPath="url(#eaPlanetClip)">
          {/* Major continent – left */}
          <ellipse
            cx="606"
            cy="188"
            rx="88"
            ry="70"
            fill="url(#eaLand)"
            opacity={lo ? 0.72 : 0.58}
          />
          <ellipse
            cx="638"
            cy="172"
            rx="54"
            ry="38"
            fill={p.pop}
            opacity={lo ? 0.5 : 0.4}
          />
          {/* Secondary continent – right */}
          <ellipse
            cx="792"
            cy="222"
            rx="62"
            ry="52"
            fill={p.spark}
            opacity={lo ? 0.5 : 0.4}
          />
          <ellipse
            cx="810"
            cy="208"
            rx="36"
            ry="26"
            fill={p.pop}
            opacity={lo ? 0.28 : 0.18}
          />
          {/* Small island chain – lower */}
          <ellipse
            cx="682"
            cy="278"
            rx="28"
            ry="16"
            fill={p.spark}
            opacity={lo ? 0.42 : 0.3}
          />
          <ellipse
            cx="726"
            cy="286"
            rx="18"
            ry="10"
            fill={p.pop}
            opacity={lo ? 0.34 : 0.22}
          />
          {/* Polar cap */}
          <ellipse
            cx="700"
            cy="26"
            rx="68"
            ry="30"
            fill={p.accent}
            opacity={lo ? 0.28 : 0.16}
          />
          {/* Equatorial sea glint */}
          <path
            d="M516 210 C580 196, 700 220, 820 206 C864 200, 884 210, 896 210"
            fill="none"
            stroke={p.glow}
            strokeOpacity={lo ? 0.52 : 0.34}
            strokeWidth="6"
            filter="url(#eaMedBlur)"
          />
          {/* Latitude lines */}
          <ellipse
            cx="700"
            cy="210"
            rx="194"
            ry="56"
            fill="none"
            stroke={p.accent}
            strokeOpacity={lo ? 0.14 : 0.08}
            strokeWidth="1"
          />
          <ellipse
            cx="700"
            cy="210"
            rx="194"
            ry="110"
            fill="none"
            stroke={p.accent}
            strokeOpacity={lo ? 0.1 : 0.06}
            strokeWidth="1"
          />
          {/* Longitude arc */}
          <ellipse
            cx="700"
            cy="210"
            rx="72"
            ry="194"
            fill="none"
            stroke={p.accent}
            strokeOpacity={lo ? 0.12 : 0.07}
            strokeWidth="1"
          />
          <ellipse
            cx="700"
            cy="210"
            rx="148"
            ry="194"
            fill="none"
            stroke={p.accent}
            strokeOpacity={lo ? 0.08 : 0.05}
            strokeWidth="1"
          />
        </g>

        {/* Aurora over the pole, following the curve of the disc. */}
        <g clipPath="url(#eaPlanetClip)">
          <path
            d="M556 76 C620 44, 790 44, 850 78"
            fill="none"
            stroke="url(#eaAurora)"
            strokeWidth="16"
            filter="url(#eaSoftBlur)"
            strokeLinecap="round"
          />
          <path
            d="M572 96 C632 68, 782 68, 836 98"
            fill="none"
            stroke="url(#eaAurora)"
            strokeWidth="8"
            filter="url(#eaMedBlur)"
            strokeLinecap="round"
          />
        </g>

        {/* Planet rim */}
        <circle
          cx="700"
          cy="210"
          r="196"
          fill="none"
          stroke={p.accent}
          strokeWidth="1.5"
          strokeOpacity={lo ? 0.28 : 0.16}
        />

        {/* Atmosphere: a second rim just outside the first, softly blurred. */}
        <circle
          cx="700"
          cy="210"
          r="203"
          fill="none"
          stroke={p.glow}
          strokeWidth="7"
          strokeOpacity={lo ? 0.3 : 0.18}
          filter="url(#eaMedBlur)"
        />

        {/* ══════════════════════════════════════════════════════════
            LAYER 2b — ORBITS AND SATELLITES

            Two inclined orbits, drawn as ellipses rotated about the
            planet centre, with the near half over the disc and the far
            half behind it. The satellites sit on their tracks, and the
            leading one carries the sensing swath down to the surface —
            which is the whole subject of the page.
        ══════════════════════════════════════════════════════════ */}

        {/* Far halves — behind the disc, so drawn dimmer */}
        <g opacity={lo ? 0.42 : 0.3}>
          <ellipse
            cx="700"
            cy="210"
            rx="286"
            ry="96"
            transform="rotate(-18 700 210)"
            fill="none"
            stroke={p.accent}
            strokeWidth="1.25"
          />
          <ellipse
            cx="700"
            cy="210"
            rx="248"
            ry="130"
            transform="rotate(26 700 210)"
            fill="none"
            stroke={p.secondary}
            strokeWidth="1.1"
            strokeDasharray="7 9"
          />
        </g>

        {/* The sensing swath, from the leading satellite to the surface */}
        <polygon
          points="898,150 918,150 986,300 830,300"
          transform="rotate(-18 700 210)"
          fill="url(#eaSwath)"
          opacity={lo ? 0.9 : 0.75}
        />

        {/* Satellites on their tracks */}
        <g opacity={lo ? 0.92 : 0.78}>
          <use
            href="#eaSatellite"
            x="866"
            y="132"
            width="76"
            height="34"
            transform="rotate(-18 700 210)"
          />
          <use
            href="#eaSatellite"
            x="560"
            y="88"
            width="46"
            height="20"
            transform="rotate(26 700 210)"
            opacity="0.6"
          />
        </g>

        {/* Near halves of the same orbits, drawn over the disc so the tracks
            read as passing in front of the planet rather than around it. */}
        <g opacity={lo ? 0.44 : 0.3}>
          <path
            d="M 414 210 A 286 96 0 0 0 986 210"
            transform="rotate(-18 700 210)"
            fill="none"
            stroke={p.accent}
            strokeWidth="1.5"
          />
          <path
            d="M 452 210 A 248 130 0 0 0 948 210"
            transform="rotate(26 700 210)"
            fill="none"
            stroke={p.secondary}
            strokeWidth="1.2"
            strokeDasharray="7 9"
          />
        </g>

        {/* ══════════════════════════════════════════════════════════
            LAYER 3 — LEFT PANEL: SEA
            Architectural flat rectangle subdivided by wave-grid lines
        ══════════════════════════════════════════════════════════ */}

        {/* A single cloud, kept small so it reads as sky rather than weather */}
        <use
          href="#eaCloud"
          x="1104"
          y="62"
          width="118"
          height="44"
          fill={lo ? p.bgPanel : p.glow}
          opacity={lo ? 0.9 : 0.34}
        />
        {/* A second, smaller and flatter, so the pair does not read as one
            shape repeated */}
        <use
          href="#eaCloud"
          x="1236"
          y="96"
          width="86"
          height="30"
          fill={lo ? p.bgPanel : p.glow}
          opacity={lo ? 0.72 : 0.24}
        />

        {/* ══════════════════════════════════════════════════════════
            LAYER 2c — LIFE IN THE WATER

            Drawn before the sea is filled, so the water closes over whatever
            sits below the waterline and each animal is *in* it rather than
            on it. Kept between x=190 and x=470: the hero crops about 160
            units off each side at its widest, and anything nearer the edge
            than that is only sometimes on screen.
        ══════════════════════════════════════════════════════════ */}

        {/* Dolphin, at the top of a leap, fluke still in the water */}
        <use
          href="#eaDolphin"
          x="351"
          y="292"
          width="66"
          height="44"
          transform="rotate(-8 384 314)"
          opacity={lo ? 0.95 : 0.82}
        />

        {/* Whale, surfaced and blowing, submerged to the shoulder */}
        <use
          href="#eaWhale"
          x="213"
          y="290"
          width="96"
          height="52"
          opacity={lo ? 0.82 : 0.68}
        />

        {/* Sea panel — organic coastal fill */}
        <path d={SEA_PATH} fill="url(#eaSea)" opacity={seaFillOpacity} />
        {/* Wave texture + shimmer clipped to organic shape */}
        <g clipPath="url(#eaSeaClip)">
          <rect x="0" y="272" width="820" height="155" fill="url(#eaWaves)" />
          <rect
            x="0"
            y="272"
            width="820"
            height="155"
            fill="url(#eaSeaShimmer)"
          />
          {/* Deep-sea colour wash near the shore top */}
          <path
            d="M 0 355 C 90 343, 230 363, 380 349 C 430 343, 475 353, 516 347"
            fill="none"
            stroke={p.accent}
            strokeOpacity={lo ? 0.36 : 0.2}
            strokeWidth="1.5"
          />
          <path
            d="M 0 375 C 110 363, 260 381, 420 367 C 462 361, 494 369, 516 365"
            fill="none"
            stroke={p.glow}
            strokeOpacity={lo ? 0.24 : 0.13}
            strokeWidth="1"
          />
          {/* Surf-foam highlight along coastline */}
          <path
            d={SEA_COAST}
            fill="none"
            stroke={p.accent}
            strokeOpacity={lo ? 0.55 : 0.32}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        {/* Sea outline — same organic path, stroke only */}
        <path
          d={SEA_PATH}
          fill="none"
          stroke={p.accent}
          strokeWidth="1"
          strokeOpacity={lo ? 0.22 : 0.13}
        />

        {/* ══════════════════════════════════════════════════════════
            LAYER 3b — SANDY BEACH: transition sea → forest
        ══════════════════════════════════════════════════════════ */}
        {/* The shore: one mass from the waterline to the far side of the
            forest, so the beach and the land are no longer two panels meeting
            at a seam. */}
        <path d={`${SHORE_TOP} L 1400 420 L 440 420 Z`} fill="url(#eaShore)" />
        {/* Wet-sand line along the top of it */}
        <path
          d={SHORE_TOP}
          fill="none"
          stroke={p.gold}
          strokeOpacity={lo ? 0.6 : 0.4}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Two parasols on the dry sand, planted on the beach line and
            sized so the one further along reads as further away. */}
        <use
          href="#eaParasol"
          x="536"
          y="322"
          width="54"
          height="62"
          opacity={lo ? 1 : 0.88}
        />
        <use
          href="#eaParasol"
          x="630"
          y="330"
          width="46"
          height="52"
          opacity={lo ? 0.92 : 0.8}
        />

        {/* ══════════════════════════════════════════════════════════
            LAYER 4 — RIGHT PANEL: ARCHITECTURAL FOREST COMPOSITION
            Row-based tree grid, right side of canvas
        ══════════════════════════════════════════════════════════ */}

        {/* Deep-background tree row (small, hazy) */}
        <g opacity={lo ? 0.44 : 0.32}>
          <use href="#eaPineArch" x="938" y="230" width="30" height="72" />
          <use href="#eaTreeArch" x="974" y="232" width="34" height="70" />
          <use href="#eaPineArch" x="1012" y="226" width="28" height="76" />
          <use href="#eaTreeArch" x="1050" y="232" width="32" height="70" />
          <use href="#eaPineArch" x="1090" y="228" width="30" height="74" />
          <use href="#eaTreeRound" x="1128" y="230" width="38" height="72" />
          <use href="#eaPineArch" x="1170" y="226" width="28" height="76" />
          <use href="#eaTreeArch" x="1210" y="232" width="32" height="70" />
          <use href="#eaPineArch" x="1248" y="228" width="30" height="74" />
          <use href="#eaTreeRound" x="1284" y="232" width="36" height="70" />
        </g>

        {/* Mid forest row */}
        <g opacity={leafOpacity * 0.8}>
          <use href="#eaTreeRound" x="924" y="222" width="52" height="84" />
          <use href="#eaPineArch" x="972" y="212" width="44" height="94" />
          <use href="#eaTreeArch" x="1016" y="218" width="48" height="88" />
          <use href="#eaTreeRound" x="1066" y="224" width="54" height="82" />
          <use href="#eaPineArch" x="1118" y="210" width="42" height="96" />
          <use href="#eaTreeArch" x="1162" y="216" width="50" height="90" />
          <use href="#eaTreeRound" x="1212" y="224" width="52" height="82" />
          <use href="#eaPineArch" x="1264" y="212" width="44" height="94" />
          <use href="#eaTreeArch" x="1306" y="220" width="48" height="86" />
        </g>

        {/* Foreground tree row (largest, full opacity) */}
        <g opacity={leafOpacity}>
          <use href="#eaPineArch" x="930" y="206" width="56" height="104" />
          <use href="#eaTreeRound" x="984" y="202" width="64" height="108" />
          <use href="#eaPineArch" x="1046" y="198" width="58" height="112" />
          <use href="#eaTreeArch" x="1100" y="204" width="60" height="106" />
          <use href="#eaTreeRound" x="1158" y="200" width="64" height="110" />
          <use href="#eaPineArch" x="1220" y="196" width="56" height="114" />
          <use href="#eaTreeArch" x="1274" y="206" width="58" height="104" />
          <use href="#eaTreeRound" x="1328" y="204" width="60" height="106" />
        </g>

        {/* Ground shrubs */}
        <g opacity={lo ? 0.72 : 0.56}>
          <use href="#eaShrubArch" x="930" y="356" width="58" height="34" />
          <use href="#eaShrubArch" x="1016" y="360" width="52" height="30" />
          <use href="#eaShrubArch" x="1108" y="354" width="60" height="36" />
          <use href="#eaShrubArch" x="1202" y="358" width="54" height="32" />
          <use href="#eaShrubArch" x="1300" y="356" width="58" height="34" />
        </g>

        {/* ══════════════════════════════════════════════════════════
            LAYER 4b — LIFE ON THE LAND

            Standing on the same ground line as the trees, in front of the
            shrub row so neither is hidden behind it.
        ══════════════════════════════════════════════════════════ */}

        {/* Bear, broadside, near the treeline */}
        <use
          href="#eaBear"
          x="978"
          y="322"
          width="84"
          height="55"
          opacity={lo ? 0.9 : 0.76}
        />

        {/* Wolf, further along and a little smaller, so the two do not read
            as a pair of the same animal */}
        <use
          href="#eaWolf"
          x="1128"
          y="330"
          width="78"
          height="45"
          opacity={lo ? 0.86 : 0.72}
        />

        {/* ══════════════════════════════════════════════════════════
            LAYER 5 — ACCENT PANELS (thin vertical bars, left edge)
            Bauhaus-style colour columns
        ══════════════════════════════════════════════════════════ */}

        {/* ══════════════════════════════════════════════════════════
            LAYER 6 — BIRDS — two separate flocks:
            left cluster near sea panel, right cluster near forest
        ══════════════════════════════════════════════════════════ */}

        {/* Flock A — soaring above sea (upper left zone) */}
        <g opacity={lo ? 0.68 : 0.48}>
          {/* large leading eagle */}
          <use href="#eaEagle" x="148" y="76" width="92" height="36" />
          {/* flanking birds, decreasing size */}
          <use href="#eaBirdArch" x="98" y="112" width="70" height="28" />
          <use href="#eaBirdArch" x="198" y="58" width="56" height="22" />
          <use href="#eaBirdArch" x="262" y="96" width="40" height="16" />
          <use href="#eaBirdArch" x="302" y="82" width="30" height="12" />
          <use href="#eaBirdArch" x="346" y="118" width="24" height="10" />
          <use href="#eaBirdArch" x="378" y="104" width="18" height="8" />
        </g>

        {/* Flock B — high above planet / right portion */}
        <g opacity={lo ? 0.56 : 0.38}>
          <use href="#eaBirdArch" x="820" y="52" width="52" height="20" />
          <use href="#eaBirdArch" x="876" y="66" width="38" height="15" />
          <use href="#eaBirdArch" x="922" y="48" width="28" height="12" />
          <use href="#eaBirdArch" x="956" y="74" width="22" height="10" />
          <use href="#eaBirdArch" x="990" y="56" width="16" height="8" />
        </g>

        {/* Lone eagle above planet right — focal accent */}
        <use
          href="#eaEagle"
          x="820"
          y="148"
          width="76"
          height="28"
          opacity={lo ? 0.52 : 0.36}
        />

        {/* ══════════════════════════════════════════════════════════
            LAYER 7 — TYPOGRAPHIC / STRUCTURAL LINES
            Fine horizon construction lines across mid-composition
        ══════════════════════════════════════════════════════════ */}

        {/* Cross-hairs on planet centre */}
        <line
          x1="504"
          y1="210"
          x2="898"
          y2="210"
          stroke={p.accent}
          strokeWidth="0.5"
          strokeOpacity={lo ? 0.16 : 0.09}
        />
        <line
          x1="700"
          y1="18"
          x2="700"
          y2="402"
          stroke={p.accent}
          strokeWidth="0.5"
          strokeOpacity={lo ? 0.16 : 0.09}
        />

        {/* ══════════════════════════════════════════════════════════
            LAYER 8 — DECORATIVE STAR FIELD (sparse, architectural)
        ══════════════════════════════════════════════════════════ */}
        <circle
          cx="112"
          cy="48"
          r="2.5"
          fill={p.gold}
          opacity={lo ? 0.58 : 0.34}
        />
        <circle
          cx="324"
          cy="32"
          r="1.8"
          fill={p.accent}
          opacity={lo ? 0.46 : 0.28}
        />
        <circle
          cx="538"
          cy="56"
          r="1.5"
          fill={p.spark}
          opacity={lo ? 0.44 : 0.26}
        />
        <circle
          cx="488"
          cy="22"
          r="2"
          fill={p.flame}
          opacity={lo ? 0.38 : 0.22}
        />
        <circle
          cx="862"
          cy="38"
          r="2.5"
          fill={p.gold}
          opacity={lo ? 0.5 : 0.3}
        />
        <circle
          cx="908"
          cy="22"
          r="1.5"
          fill={p.accent}
          opacity={lo ? 0.42 : 0.24}
        />
        <circle
          cx="1068"
          cy="44"
          r="2"
          fill={p.spark}
          opacity={lo ? 0.4 : 0.22}
        />
        <circle
          cx="1284"
          cy="28"
          r="2.5"
          fill={p.secondary}
          opacity={lo ? 0.44 : 0.26}
        />
        <circle
          cx="1352"
          cy="56"
          r="1.8"
          fill={p.gold}
          opacity={lo ? 0.38 : 0.2}
        />
      </g>
    </svg>
  );
}
