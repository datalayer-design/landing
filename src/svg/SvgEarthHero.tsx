/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Earth hero: abstract architectural painting — planet, sea, arboreal forms and birds
 * arranged as a flat, geometric composition in the spirit of constructivist art.
 */

import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

export function SvgEarthHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  const lo = p.isLight;
  const planetOpacity   = lo ? 0.82 : 0.68;
  const seaFillOpacity  = lo ? 0.90 : 0.78;
  const leafOpacity     = lo ? 0.88 : 0.72;
  const gridOpacity     = lo ? 0.10 : 0.07;
  const glowOpacity     = lo ? 0.28 : 0.16;
  const strokeMid       = lo ? 0.34 : 0.20;

  return (
    <svg
      viewBox="0 0 1400 420"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* ── Background gradient ────────────────────────────────────── */}
        <linearGradient id="eaBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={p.bg} />
          <stop offset="60%"  stopColor={p.bgAlt} />
          <stop offset="100%" stopColor={p.bgPanel} />
        </linearGradient>

        {/* ── Planet fill ───────────────────────────────────────────── */}
        <radialGradient id="eaPlanet" cx="50%" cy="44%" r="50%">
          <stop offset="0%"   stopColor={p.glow}    stopOpacity="0.95" />
          <stop offset="38%"  stopColor={p.primary} stopOpacity="0.88" />
          <stop offset="72%"  stopColor={p.surge}   stopOpacity="0.80" />
          <stop offset="100%" stopColor={p.bg}       stopOpacity="0.10" />
        </radialGradient>

        {/* ── Planet land masses ────────────────────────────────────── */}
        <radialGradient id="eaLand" cx="42%" cy="38%" r="58%">
          <stop offset="0%"   stopColor={p.pop}  stopOpacity="0.70" />
          <stop offset="50%"  stopColor={p.spark} stopOpacity="0.50" />
          <stop offset="100%" stopColor={p.pop}  stopOpacity="0" />
        </radialGradient>

        {/* ── Sea panel ─────────────────────────────────────────────── */}
        <linearGradient id="eaSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={p.glow}    />
          <stop offset="55%"  stopColor={p.surge}   />
          <stop offset="100%" stopColor={p.primary} />
        </linearGradient>

        {/* ── Sea shimmer ───────────────────────────────────────────── */}
        <linearGradient id="eaSeaShimmer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={p.accent} stopOpacity="0" />
          <stop offset="40%"  stopColor={p.accent} stopOpacity={lo ? 0.38 : 0.22} />
          <stop offset="70%"  stopColor={p.gold}   stopOpacity={lo ? 0.28 : 0.16} />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </linearGradient>

        {/* ── Glow halo ─────────────────────────────────────────────── */}
        <radialGradient id="eaHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={p.gold}  stopOpacity={lo ? 0.50 : 0.30} />
          <stop offset="100%" stopColor={p.gold}  stopOpacity="0" />
        </radialGradient>
        {/* ── Sandy beach ───────────────────────────────────── */}
        <linearGradient id="eaSand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={p.gold} stopOpacity="0" />
          <stop offset="18%"  stopColor={p.gold} stopOpacity={lo ? 0.72 : 0.52} />
          <stop offset="70%"  stopColor={p.gold} stopOpacity={lo ? 0.60 : 0.40} />
          <stop offset="100%" stopColor={p.gold} stopOpacity="0" />
        </linearGradient>
        {/* ── Left panel accent ─────────────────────────────────────── */}
        <linearGradient id="eaLeftPanel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={p.spark}  />
          <stop offset="100%" stopColor={p.pop}    />
        </linearGradient>

        {/* ── Right panel accent ────────────────────────────────────── */}
        <linearGradient id="eaRightPanel" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={p.flame}  />
          <stop offset="100%" stopColor={p.blaze}  />
        </linearGradient>

        {/* ── Grid texture ──────────────────────────────────────────── */}
        <pattern id="eaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 L0 0 L0 40" fill="none" stroke={p.accent} strokeWidth="0.5" opacity={gridOpacity} />
        </pattern>

        {/* ── Fine dot field ────────────────────────────────────────── */}
        <pattern id="eaDots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill={p.accent} opacity={lo ? 0.14 : 0.08} />
        </pattern>

        {/* ── Wave texture for sea ──────────────────────────────────── */}
        <pattern id="eaWaves" width="80" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 9 C14 3, 30 3, 40 9 C50 15, 66 15, 80 9"
            fill="none" stroke={p.accent}
            strokeOpacity={lo ? 0.28 : 0.14} strokeWidth="1.2" />
        </pattern>

        {/* ── Filters ───────────────────────────────────────────────── */}
        <filter id="eaGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
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
          <path d="M 0 390 L 0 325 C 30 312,60 338,100 321 C 135 305,175 337,220 325 C 260 313,295 335,340 323 C 375 311,415 337,458 317 C 480 307,500 325,516 325 L 516 390 Z" />
        </clipPath>

        {/* ── Symbols ───────────────────────────────────────────────── */}

        {/* Architectural tree: geometric layered canopy */}
        <symbol id="eaTreeArch" viewBox="0 0 48 96">
          {/* trunk */}
          <rect x="21" y="66" width="6" height="28" rx="1" fill={p.flame} opacity="0.55" />
          {/* canopy layers — stacked hexagons/diamonds */}
          <polygon points="24,8 38,28 30,28 42,46 6,46 18,28 10,28" fill={p.pop} opacity="0.92" />
          <polygon points="24,16 35,32 13,32" fill={p.spark} opacity="0.64" />
          <polygon points="24,36 36,50 12,50" fill={p.secondary} opacity="0.48" />
        </symbol>

        {/* Tall pine: sharp constructivist triangle */}
        <symbol id="eaPineArch" viewBox="0 0 40 90">
          <rect x="18" y="66" width="4" height="22" rx="1" fill={p.flame} opacity="0.52" />
          <polygon points="20,4 36,68 4,68"  fill={p.pop} opacity="0.88" />
          <polygon points="20,18 34,60 6,60" fill={p.spark} opacity="0.48" />
          <polygon points="20,32 30,54 10,54" fill={p.glow} opacity="0.34" />
        </symbol>

        {/* Broad canopy tree: wide soft crown */}
        <symbol id="eaTreeRound" viewBox="0 0 64 80">
          <rect x="29" y="54" width="6" height="24" rx="1" fill={p.flame} opacity="0.48" />
          <ellipse cx="32" cy="34" rx="26" ry="22" fill={p.pop} opacity="0.84" />
          <ellipse cx="20" cy="38" rx="16" ry="13" fill={p.spark} opacity="0.56" />
          <ellipse cx="44" cy="37" rx="15" ry="12" fill={p.secondary} opacity="0.52" />
          <ellipse cx="32" cy="24" rx="12" ry="10" fill={p.glow} opacity="0.40" />
        </symbol>

        {/* Abstract ground shrub */}
        <symbol id="eaShrubArch" viewBox="0 0 50 28">
          <ellipse cx="12" cy="18" rx="11" ry="9"  fill={p.spark}     opacity="0.78" />
          <ellipse cx="26" cy="13" rx="14" ry="11" fill={p.pop}       opacity="0.84" />
          <ellipse cx="40" cy="18" rx="10" ry="8"  fill={p.secondary} opacity="0.60" />
        </symbol>

        {/* Minimalist bird: two bezier wing arcs */}
        <symbol id="eaBirdArch" viewBox="0 0 52 22">
          <path d="M2 16 C12 4, 22 4, 26 12 C30 4, 40 4, 50 16"
            fill="none" stroke={p.accent} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </symbol>

        {/* Soaring eagle silhouette */}
        <symbol id="eaEagle" viewBox="0 0 80 32">
          <path d="M0 22 C16 8, 30 6, 40 16 C50 6, 64 8, 80 22"
            fill="none" stroke={p.secondary} strokeWidth="3"
            strokeLinecap="round" />
          {/* head nub */}
          <ellipse cx="40" cy="13" rx="4" ry="3" fill={p.secondary} opacity="0.7" />
          {/* tail */}
          <path d="M36 18 L32 28 M44 18 L48 28"
            fill="none" stroke={p.secondary} strokeWidth="2" strokeLinecap="round" />
        </symbol>

      </defs>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 0 — Background field
      ══════════════════════════════════════════════════════════════ */}
      <rect width="1400" height="420" fill="url(#eaBg)" />
      <rect width="1400" height="420" fill="url(#eaGrid)" />
      <rect width="1400" height="420" fill="url(#eaDots)" />

      <g filter={lo ? 'url(#svgLightBoost)' : undefined}>

        {/* ══════════════════════════════════════════════════════════
            LAYER 1 — Architectural horizontal rule bands (golden-ratio
            proportions, 3 bands: sky / equator / earth)
        ══════════════════════════════════════════════════════════ */}
        {/* Top atmosphere strip */}
        <rect x="0" y="0" width="1400" height="140"
          fill={p.bg} opacity={lo ? 0.18 : 0.10} />
        {/* Equator band */}
        <rect x="0" y="140" width="1400" height="2"
          fill={p.accent} opacity={lo ? 0.22 : 0.12} />
        {/* Ground/earth plane */}
        <rect x="0" y="310" width="1400" height="2"
          fill={p.accent} opacity={lo ? 0.22 : 0.12} />

        {/* ══════════════════════════════════════════════════════════
            LAYER 2 — PLANET DISC (centre-left, large architectural
            globe rendered as overlapping geometric arcs)
        ══════════════════════════════════════════════════════════ */}

        {/* Halo glow */}
        <circle cx="700" cy="210" r="232"
          fill="url(#eaHalo)" filter="url(#eaSoftBlur)" opacity={glowOpacity * 2.2} />

        {/* Planet base fill */}
        <circle cx="700" cy="210" r="196" fill="url(#eaPlanet)" opacity={planetOpacity} />

        {/* Land masses on planet surface — irregular blobs */}
        <g clipPath="url(#eaPlanetClip)">
          {/* Major continent – left */}
          <ellipse cx="606" cy="188" rx="88" ry="70"
            fill="url(#eaLand)" opacity={lo ? 0.58 : 0.44} />
          <ellipse cx="638" cy="172" rx="54" ry="38"
            fill={p.pop} opacity={lo ? 0.38 : 0.28} />
          {/* Secondary continent – right */}
          <ellipse cx="792" cy="222" rx="62" ry="52"
            fill={p.spark} opacity={lo ? 0.38 : 0.28} />
          <ellipse cx="810" cy="208" rx="36" ry="26"
            fill={p.pop} opacity={lo ? 0.28 : 0.18} />
          {/* Small island chain – lower */}
          <ellipse cx="682" cy="278" rx="28" ry="16"
            fill={p.spark} opacity={lo ? 0.30 : 0.20} />
          <ellipse cx="726" cy="286" rx="18" ry="10"
            fill={p.pop} opacity={lo ? 0.24 : 0.14} />
          {/* Polar cap */}
          <ellipse cx="700" cy="26"  rx="68" ry="30"
            fill={p.accent} opacity={lo ? 0.28 : 0.16} />
          {/* Equatorial sea glint */}
          <path d="M516 210 C580 196, 700 220, 820 206 C864 200, 884 210, 896 210"
            fill="none" stroke={p.glow}
            strokeOpacity={lo ? 0.52 : 0.34} strokeWidth="6"
            filter="url(#eaMedBlur)" />
          {/* Latitude lines */}
          <ellipse cx="700" cy="210" rx="194" ry="56"
            fill="none" stroke={p.accent}
            strokeOpacity={lo ? 0.14 : 0.08} strokeWidth="1" />
          <ellipse cx="700" cy="210" rx="194" ry="110"
            fill="none" stroke={p.accent}
            strokeOpacity={lo ? 0.10 : 0.06} strokeWidth="1" />
          {/* Longitude arc */}
          <ellipse cx="700" cy="210" rx="72" ry="194"
            fill="none" stroke={p.accent}
            strokeOpacity={lo ? 0.12 : 0.07} strokeWidth="1" />
          <ellipse cx="700" cy="210" rx="148" ry="194"
            fill="none" stroke={p.accent}
            strokeOpacity={lo ? 0.08 : 0.05} strokeWidth="1" />
        </g>

        {/* Planet rim */}
        <circle cx="700" cy="210" r="196"
          fill="none" stroke={p.accent}
          strokeWidth="1.5" strokeOpacity={lo ? 0.28 : 0.16} />

        {/* ══════════════════════════════════════════════════════════
            LAYER 3 — LEFT PANEL: SEA
            Architectural flat rectangle subdivided by wave-grid lines
        ══════════════════════════════════════════════════════════ */}

        {/* Sea panel — organic coastal fill */}
        <path d="M 0 390 L 0 325 C 30 312,60 338,100 321 C 135 305,175 337,220 325 C 260 313,295 335,340 323 C 375 311,415 337,458 317 C 480 307,500 325,516 325 L 516 390 Z"
          fill="url(#eaSea)" opacity={seaFillOpacity} />
        {/* Wave texture + shimmer clipped to organic shape */}
        <g clipPath="url(#eaSeaClip)">
          <rect x="0" y="272" width="530" height="155" fill="url(#eaWaves)" />
          <rect x="0" y="272" width="530" height="155" fill="url(#eaSeaShimmer)" />
          {/* Deep-sea colour wash near the shore top */}
          <path d="M 0 355 C 90 343, 230 363, 380 349 C 430 343, 475 353, 516 347"
            fill="none" stroke={p.accent}
            strokeOpacity={lo ? 0.36 : 0.20} strokeWidth="1.5" />
          <path d="M 0 375 C 110 363, 260 381, 420 367 C 462 361, 494 369, 516 365"
            fill="none" stroke={p.glow}
            strokeOpacity={lo ? 0.24 : 0.13} strokeWidth="1" />
          {/* Surf-foam highlight along coastline */}
          <path d="M 0 325 C 30 312,60 338,100 321 C 135 305,175 337,220 325 C 260 313,295 335,340 323 C 375 311,415 337,458 317 C 480 307,500 325,516 325"
            fill="none" stroke={p.accent}
            strokeOpacity={lo ? 0.55 : 0.32} strokeWidth="2"
            strokeLinecap="round" />
        </g>
        {/* Sea outline — same organic path, stroke only */}
        <path d="M 0 390 L 0 325 C 30 312,60 338,100 321 C 135 305,175 337,220 325 C 260 313,295 335,340 323 C 375 311,415 337,458 317 C 480 307,500 325,516 325 L 516 390 Z"
          fill="none" stroke={p.accent}
          strokeWidth="1" strokeOpacity={lo ? 0.22 : 0.13} />

        {/* ══════════════════════════════════════════════════════════
            LAYER 3b — SANDY BEACH: transition sea → forest
        ══════════════════════════════════════════════════════════ */}

        {/* Sand body — gentle undulating top, fading left and right */}
        <path d="M 460 390 L 460 318 C 510 308,560 328,620 314 C 680 300,740 320,800 312 C 855 304,895 318,950 310 L 950 390 Z"
          fill="url(#eaSand)" opacity={lo ? 0.82 : 0.62} />
        {/* Dry-sand lighter highlight */}
        <path d="M 500 390 L 500 326 C 550 316,610 330,680 318 C 750 306,820 322,900 314 L 900 390 Z"
          fill={p.gold} opacity={lo ? 0.18 : 0.10} />
        {/* Shore edge — wet sand dark line */}
        <path d="M 460 318 C 510 308,560 328,620 314 C 680 300,740 320,800 312 C 855 304,895 318,950 310"
          fill="none" stroke={p.gold}
          strokeOpacity={lo ? 0.70 : 0.45} strokeWidth="1.5"
          strokeLinecap="round" />

        {/* ══════════════════════════════════════════════════════════
            LAYER 4 — RIGHT PANEL: ARCHITECTURAL FOREST COMPOSITION
            Row-based tree grid, right side of canvas
        ══════════════════════════════════════════════════════════ */}

        {/* Ground plane for forest */}
        <rect x="920" y="310" width="408" height="110" rx="3"
          fill={p.spark} opacity={lo ? 0.12 : 0.08} />

        {/* Accent bar at base */}
        <rect x="920" y="406" width="408" height="4" rx="1"
          fill={p.pop} opacity={lo ? 0.32 : 0.20} />

        {/* Deep-background tree row (small, hazy) */}
        <g opacity={lo ? 0.44 : 0.32}>
          <use href="#eaPineArch"  x="938"  y="252" width="30" height="72" />
          <use href="#eaTreeArch"  x="974"  y="258" width="34" height="70" />
          <use href="#eaPineArch"  x="1012" y="248" width="28" height="76" />
          <use href="#eaTreeArch"  x="1050" y="256" width="32" height="70" />
          <use href="#eaPineArch"  x="1090" y="250" width="30" height="74" />
          <use href="#eaTreeRound" x="1128" y="254" width="38" height="72" />
          <use href="#eaPineArch"  x="1170" y="248" width="28" height="76" />
          <use href="#eaTreeArch"  x="1210" y="256" width="32" height="70" />
          <use href="#eaPineArch"  x="1248" y="250" width="30" height="74" />
          <use href="#eaTreeRound" x="1284" y="254" width="36" height="70" />
        </g>

        {/* Mid forest row */}
        <g opacity={leafOpacity * 0.80}>
          <use href="#eaTreeRound" x="924"  y="238" width="52" height="84" />
          <use href="#eaPineArch"  x="972"  y="228" width="44" height="94" />
          <use href="#eaTreeArch"  x="1016" y="236" width="48" height="88" />
          <use href="#eaTreeRound" x="1066" y="240" width="54" height="82" />
          <use href="#eaPineArch"  x="1118" y="226" width="42" height="96" />
          <use href="#eaTreeArch"  x="1162" y="234" width="50" height="90" />
          <use href="#eaTreeRound" x="1212" y="240" width="52" height="82" />
          <use href="#eaPineArch"  x="1264" y="228" width="44" height="94" />
          <use href="#eaTreeArch"  x="1306" y="238" width="48" height="86" />
        </g>

        {/* Foreground tree row (largest, full opacity) */}
        <g opacity={leafOpacity}>
          <use href="#eaPineArch"  x="930"  y="218" width="56" height="104" />
          <use href="#eaTreeRound" x="984"  y="214" width="64" height="108" />
          <use href="#eaPineArch"  x="1046" y="210" width="58" height="112" />
          <use href="#eaTreeArch"  x="1100" y="216" width="60" height="106" />
          <use href="#eaTreeRound" x="1158" y="212" width="64" height="110" />
          <use href="#eaPineArch"  x="1220" y="208" width="56" height="114" />
          <use href="#eaTreeArch"  x="1274" y="218" width="58" height="104" />
          <use href="#eaTreeRound" x="1328" y="214" width="60" height="106" />
        </g>

        {/* Ground shrubs */}
        <g opacity={lo ? 0.72 : 0.56}>
          <use href="#eaShrubArch" x="930"  y="356" width="58" height="34" />
          <use href="#eaShrubArch" x="1016" y="360" width="52" height="30" />
          <use href="#eaShrubArch" x="1108" y="354" width="60" height="36" />
          <use href="#eaShrubArch" x="1202" y="358" width="54" height="32" />
          <use href="#eaShrubArch" x="1300" y="356" width="58" height="34" />
        </g>

        {/* ══════════════════════════════════════════════════════════
            LAYER 5 — ACCENT PANELS (thin vertical bars, left edge)
            Bauhaus-style colour columns
        ══════════════════════════════════════════════════════════ */}
        <rect x="0"  y="0" width="18" height="420"
          fill="url(#eaLeftPanel)" opacity={lo ? 0.50 : 0.36} />
        <rect x="18" y="0" width="6"  height="420"
          fill={p.gold} opacity={lo ? 0.24 : 0.14} />

        {/* Right edge bar */}
        <rect x="1376" y="0" width="18" height="420"
          fill="url(#eaRightPanel)" opacity={lo ? 0.44 : 0.30} />
        <rect x="1370" y="0" width="6"  height="420"
          fill={p.flame} opacity={lo ? 0.20 : 0.12} />

        {/* ══════════════════════════════════════════════════════════
            LAYER 6 — BIRDS — two separate flocks:
            left cluster near sea panel, right cluster near forest
        ══════════════════════════════════════════════════════════ */}

        {/* Flock A — soaring above sea (upper left zone) */}
        <g opacity={lo ? 0.68 : 0.48}>
          {/* large leading eagle */}
          <use href="#eaEagle"    x="148" y="76"  width="92" height="36" />
          {/* flanking birds, decreasing size */}
          <use href="#eaBirdArch" x="98"  y="112" width="70" height="28" />
          <use href="#eaBirdArch" x="198" y="58"  width="56" height="22" />
          <use href="#eaBirdArch" x="262" y="96"  width="40" height="16" />
          <use href="#eaBirdArch" x="302" y="82"  width="30" height="12" />
          <use href="#eaBirdArch" x="346" y="118" width="24" height="10" />
          <use href="#eaBirdArch" x="378" y="104" width="18" height="8"  />
        </g>

        {/* Flock B — high above planet / right portion */}
        <g opacity={lo ? 0.56 : 0.38}>
          <use href="#eaBirdArch" x="820" y="52"  width="52" height="20" />
          <use href="#eaBirdArch" x="876" y="66"  width="38" height="15" />
          <use href="#eaBirdArch" x="922" y="48"  width="28" height="12" />
          <use href="#eaBirdArch" x="956" y="74"  width="22" height="10" />
          <use href="#eaBirdArch" x="990" y="56"  width="16" height="8"  />
        </g>

        {/* Lone eagle above planet right — focal accent */}
        <use href="#eaEagle"
          x="820" y="148" width="76" height="28"
          opacity={lo ? 0.52 : 0.36} />

        {/* ══════════════════════════════════════════════════════════
            LAYER 7 — TYPOGRAPHIC / STRUCTURAL LINES
            Fine horizon construction lines across mid-composition
        ══════════════════════════════════════════════════════════ */}
        <line x1="72"  y1="210" x2="504" y2="210"
          stroke={p.accent} strokeWidth="0.75" strokeOpacity={strokeMid}
          strokeDasharray="4 10" />
        <line x1="920" y1="210" x2="1392" y2="210"
          stroke={p.accent} strokeWidth="0.75" strokeOpacity={strokeMid}
          strokeDasharray="4 10" />

        {/* Cross-hairs on planet centre */}
        <line x1="504" y1="210" x2="898" y2="210"
          stroke={p.accent} strokeWidth="0.5" strokeOpacity={lo ? 0.16 : 0.09} />
        <line x1="700" y1="18"  x2="700" y2="402"
          stroke={p.accent} strokeWidth="0.5" strokeOpacity={lo ? 0.16 : 0.09} />

        {/* ══════════════════════════════════════════════════════════
            LAYER 8 — DECORATIVE STAR FIELD (sparse, architectural)
        ══════════════════════════════════════════════════════════ */}
        <circle cx="112"  cy="48"  r="2.5" fill={p.gold}      opacity={lo ? 0.58 : 0.34} />
        <circle cx="324"  cy="32"  r="1.8" fill={p.accent}    opacity={lo ? 0.46 : 0.28} />
        <circle cx="538"  cy="56"  r="1.5" fill={p.spark}     opacity={lo ? 0.44 : 0.26} />
        <circle cx="488"  cy="22"  r="2"   fill={p.flame}     opacity={lo ? 0.38 : 0.22} />
        <circle cx="862"  cy="38"  r="2.5" fill={p.gold}      opacity={lo ? 0.50 : 0.30} />
        <circle cx="908"  cy="22"  r="1.5" fill={p.accent}    opacity={lo ? 0.42 : 0.24} />
        <circle cx="1068" cy="44"  r="2"   fill={p.spark}     opacity={lo ? 0.40 : 0.22} />
        <circle cx="1284" cy="28"  r="2.5" fill={p.secondary} opacity={lo ? 0.44 : 0.26} />
        <circle cx="1352" cy="56"  r="1.8" fill={p.gold}      opacity={lo ? 0.38 : 0.20} />

      </g>
    </svg>
  );
}
