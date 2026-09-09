/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide, tall SVG hero background for the Agents home / landing page.
 *
 * Visual motif: a vibrant multi-agent collaboration network — seven named
 * "agent" nodes arranged across the canvas, each with a unique colour, a
 * glowing halo, and a label.  Curved bidirectional arcs connect pairs of
 * agents to evoke active message-passing and collaboration.  A central
 * orchestrator node anchors the composition.  Concentric coordination
 * rings, flowing data-stream curves, message-pulse dots along arcs, and
 * a honeycomb + dot grid underlay complete the picture.
 *
 * Uses a 1400×560 viewBox to fill the hero's minHeight: 560.
 */

import { useRef, useEffect } from 'react';
import { type ColorPalette, useColorPalette, LightBoostFilter } from '@datalayer/primer-addons';

/**
 * Simple seeded PRNG (mulberry32) — deterministic per session but
 * different across page loads so the animation never looks the same.
 */
function createRng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Agent node positions & colours ─────────────────────────────── */
interface AgentNode { x: number; y: number; label: string; colorKey: keyof Pick<ColorPalette, 'glow' | 'pop' | 'spark' | 'blaze' | 'surge' | 'flame' | 'gold'> }

const AGENTS: AgentNode[] = [
  { x: 700, y: 260, label: 'Orchestrator', colorKey: 'glow' },
  { x: 240, y: 150, label: 'Researcher',   colorKey: 'pop' },
  { x: 420, y: 380, label: 'Analyst',      colorKey: 'spark' },
  { x: 980, y: 380, label: 'Writer',       colorKey: 'blaze' },
  { x: 1160, y: 150, label: 'Reviewer',    colorKey: 'surge' },
  { x: 180, y: 420, label: 'Coder',        colorKey: 'flame' },
  { x: 1220, y: 420, label: 'Planner',     colorKey: 'gold' },
];

/* Collaboration links (index pairs into AGENTS) + quadratic curve offsets */
const LINKS: { from: number; to: number; bend: number }[] = [
  // Orchestrator ↔ every outer agent
  { from: 0, to: 1, bend: -40 },
  { from: 0, to: 2, bend:  30 },
  { from: 0, to: 3, bend: -30 },
  { from: 0, to: 4, bend:  40 },
  { from: 0, to: 5, bend:  35 },
  { from: 0, to: 6, bend: -35 },
  // Peer-to-peer collaboration
  { from: 1, to: 2, bend: -25 },
  { from: 1, to: 4, bend:  50 },
  { from: 2, to: 3, bend: -45 },
  { from: 3, to: 4, bend:  25 },
  { from: 2, to: 5, bend: -20 },
  { from: 3, to: 6, bend:  20 },
  { from: 5, to: 6, bend: -55 },
];

/** Compute quadratic bézier control-point perpendicular to the midpoint. */
function ctrlPt(ax: number, ay: number, bx: number, by: number, bend: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { cx: mx + (-dy / len) * bend, cy: my + (dx / len) * bend };
}

/** Pre-computed link geometry (static — depends only on AGENTS & LINKS). */
const LINK_GEOM = LINKS.map(({ from, to, bend }) => {
  const a = AGENTS[from];
  const b = AGENTS[to];
  const c = ctrlPt(a.x, a.y, b.x, b.y, bend);
  return { a, b, cx: c.cx, cy: c.cy };
});

const NUM_TRAVELLERS = 18;

/**
 * `labels` — a word for each of the seven nodes, in `AGENTS` order, for a
 * page whose story names them differently: a benchmark run at the centre
 * with agents working its tasks around it, rather than an orchestrator and
 * its roles. A missing entry keeps the node's own label.
 */
export function SvgAgentsHomeHero({
  palette: paletteProp,
  labels,
}: { palette?: ColorPalette; labels?: string[] } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  /* Keep a ref to the latest palette so the rAF loop always reads
   * up-to-date colours without re-mounting on every theme change. */
  const paletteRef = useRef(p);
  paletteRef.current = p;

  const travellersRef = useRef<SVGGElement>(null);

  /* ── Imperative rAF animation loop ─────────────────────────────── */
  useEffect(() => {
    const g = travellersRef.current;
    if (!g) return;

    const rng = createRng(Date.now());
    const NS = 'http://www.w3.org/2000/svg';

    interface Trav {
      linkIdx: number;
      fwd: boolean;
      speed: number;      // progress / second
      progress: number;   // 0 → 1
      radius: number;
      haloR: number;
      dotEl: SVGCircleElement;
      haloEl: SVGCircleElement;
    }

    /** Choose a random link, direction, speed, and size. */
    function pickNew() {
      return {
        linkIdx: Math.floor(rng() * LINKS.length),
        fwd: rng() > 0.5,
        speed: 0.14 + rng() * 0.34,           // ~2–7 s per traversal
        radius: 2.0 + rng() * 2.5,            // dot size 2–4.5
        haloR: 0,                              // computed below
      };
    }

    const travellers: Trav[] = [];

    for (let i = 0; i < NUM_TRAVELLERS; i++) {
      const t = pickNew();
      t.haloR = t.radius * 2.2 + rng() * 2;
      const progress = rng();                  // random initial phase

      const haloEl = document.createElementNS(NS, 'circle') as SVGCircleElement;
      const dotEl  = document.createElementNS(NS, 'circle') as SVGCircleElement;
      g.appendChild(haloEl);
      g.appendChild(dotEl);

      travellers.push({ ...t, progress, haloR: t.haloR, dotEl, haloEl });
    }

    let lastTime = performance.now();
    let rafId = 0;

    function tick(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // cap to avoid jumps
      lastTime = now;
      const pal = paletteRef.current;

      for (const tr of travellers) {
        tr.progress += tr.speed * dt;

        /* ── Trajectory finished → pick a brand-new random one ── */
        if (tr.progress >= 1) {
          const next = pickNew();
          tr.linkIdx = next.linkIdx;
          tr.fwd     = next.fwd;
          tr.speed   = next.speed;
          tr.radius  = next.radius;
          tr.haloR   = next.radius * 2.2 + rng() * 2;
          tr.progress = 0;
        }

        const lg = LINK_GEOM[tr.linkIdx];
        const t = tr.progress;

        // Quadratic bézier position (swap endpoints for reverse)
        const sx = tr.fwd ? lg.a.x : lg.b.x;
        const sy = tr.fwd ? lg.a.y : lg.b.y;
        const ex = tr.fwd ? lg.b.x : lg.a.x;
        const ey = tr.fwd ? lg.b.y : lg.a.y;
        const u = 1 - t;
        const px = u * u * sx + 2 * u * t * lg.cx + t * t * ex;
        const py = u * u * sy + 2 * u * t * lg.cy + t * t * ey;

        // Opacity envelope: quick fade-in / sustain / quick fade-out
        let env: number;
        if (t < 0.08) env = t / 0.08;
        else if (t > 0.92) env = (1 - t) / 0.08;
        else env = 1;
        const dotOp = env * (0.75 + 0.25 * Math.sin(t * Math.PI));

        // Gentle radius pulse
        const rPulse = tr.radius * (0.72 + 0.28 * Math.sin(t * Math.PI * 2));

        // Colour from the departure agent of this trajectory
        const colorKey = tr.fwd ? lg.a.colorKey : lg.b.colorKey;
        const color = pal[colorKey];

        tr.dotEl.setAttribute('cx', px.toFixed(1));
        tr.dotEl.setAttribute('cy', py.toFixed(1));
        tr.dotEl.setAttribute('r', rPulse.toFixed(1));
        tr.dotEl.setAttribute('fill', color);
        tr.dotEl.setAttribute('opacity', dotOp.toFixed(2));

        tr.haloEl.setAttribute('cx', px.toFixed(1));
        tr.haloEl.setAttribute('cy', py.toFixed(1));
        tr.haloEl.setAttribute('r', tr.haloR.toFixed(1));
        tr.haloEl.setAttribute('fill', color);
        tr.haloEl.setAttribute('opacity', (dotOp * 0.22).toFixed(2));
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      while (g.firstChild) g.removeChild(g.firstChild);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <svg
      viewBox="0 0 1400 560"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <LightBoostFilter />

        {/* Central orchestrator burst */}
        <radialGradient id="ahGlow1" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.72" />
          <stop offset="35%" stopColor={p.glow} stopOpacity="0.28" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ahGlow2" cx="17%" cy="28%" r="44%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.58" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ahGlow3" cx="30%" cy="68%" r="42%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.54" />
          <stop offset="48%" stopColor={p.surge} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ahGlow4" cx="70%" cy="68%" r="42%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.52" />
          <stop offset="48%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ahGlow5" cx="83%" cy="28%" r="44%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.56" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ahGlow6" cx="13%" cy="75%" r="38%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.50" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ahGlow7" cx="87%" cy="75%" r="38%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.48" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        {/* Top-centre secondary */}
        <radialGradient id="ahGlow8" cx="50%" cy="8%" r="40%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.48" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        {/* Extra green glow — bottom-centre */}
        <radialGradient id="ahGlow9" cx="45%" cy="88%" r="42%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.54" />
          <stop offset="45%" stopColor={p.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        {/* Extra blue glow — left-centre */}
        <radialGradient id="ahGlow10" cx="22%" cy="50%" r="38%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.52" />
          <stop offset="48%" stopColor={p.surge} stopOpacity="0.12" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>
        {/* Extra green glow — top-right */}
        <radialGradient id="ahGlow11" cx="75%" cy="15%" r="36%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.50" />
          <stop offset="50%" stopColor={p.glow} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        {/* Extra blue glow — bottom-right */}
        <radialGradient id="ahGlow12" cx="78%" cy="82%" r="34%">
          <stop offset="0%" stopColor={p.surge} stopOpacity="0.48" />
          <stop offset="50%" stopColor={p.surge} stopOpacity="0.10" />
          <stop offset="100%" stopColor={p.surge} stopOpacity="0" />
        </radialGradient>

        {/* Shimmer sweep */}
        <linearGradient id="ahShimmer" x1="0.1" y1="0.2" x2="0.9" y2="0.8">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0" />
          <stop offset="18%" stopColor={p.glow} stopOpacity="0.22" />
          <stop offset="35%" stopColor={p.surge} stopOpacity="0.18" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="65%" stopColor={p.glow} stopOpacity="0.20" />
          <stop offset="82%" stopColor={p.surge} stopOpacity="0.18" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </linearGradient>

        {/* Dot grid */}
        <pattern id="ahDots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill={p.glow} opacity="0.12" />
        </pattern>
        {/* Honeycomb grid */}
        <pattern id="ahHex" width="30" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(10)">
          <polygon points="15,0 28,7.5 28,22.5 15,30 2,22.5 2,7.5" fill="none" stroke={p.glow} strokeOpacity="0.08" strokeWidth="0.6" />
          <polygon points="15,26 28,33.5 28,48.5 15,56 2,48.5 2,33.5" fill="none" stroke={p.glow} strokeOpacity="0.08" strokeWidth="0.6" />
        </pattern>
        {/* Fine crosshatch */}
        <pattern id="ahCross" width="50" height="50" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="50" y2="50" stroke={p.glow} strokeOpacity="0.05" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="0" y2="50" stroke={p.glow} strokeOpacity="0.05" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Base */}
      <rect width="1400" height="560" fill={p.bg} />
      <g filter={p.isLight ? 'url(#svgLightBoost)' : undefined}>

      {/* Pattern layers */}
      <rect width="1400" height="560" fill="url(#ahDots)" />
      <rect width="1400" height="560" fill="url(#ahHex)" />
      <rect width="1400" height="560" fill="url(#ahCross)" />

      {/* Radial glows — one per agent zone */}
      <rect width="1400" height="560" fill="url(#ahGlow1)" />
      <rect width="1400" height="560" fill="url(#ahGlow2)" />
      <rect width="1400" height="560" fill="url(#ahGlow3)" />
      <rect width="1400" height="560" fill="url(#ahGlow4)" />
      <rect width="1400" height="560" fill="url(#ahGlow5)" />
      <rect width="1400" height="560" fill="url(#ahGlow6)" />
      <rect width="1400" height="560" fill="url(#ahGlow7)" />
      <rect width="1400" height="560" fill="url(#ahGlow8)" />
      <rect width="1400" height="560" fill="url(#ahGlow9)" />
      <rect width="1400" height="560" fill="url(#ahGlow10)" />
      <rect width="1400" height="560" fill="url(#ahGlow11)" />
      <rect width="1400" height="560" fill="url(#ahGlow12)" />
      <rect width="1400" height="560" fill="url(#ahShimmer)" />

      {/* === COORDINATION RINGS around orchestrator === */}
      {[80, 140, 210, 290, 380].map((r, i) => (
        <circle key={`ring-${i}`} cx={700} cy={260} r={r} fill="none"
          stroke={i % 2 === 0 ? p.glow : p.surge} strokeOpacity={0.26 - i * 0.028} strokeWidth={1.8 - i * 0.18} />
      ))}

      {/* === COLLABORATION ARCS (static paths + waypoint dots) === */}
      {LINK_GEOM.map(({ a, b, cx, cy }, i) => {
        const color  = p[a.colorKey];
        const color2 = p[b.colorKey];
        return (
          <g key={`link-${i}`}>
            <path
              d={`M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`}
              fill="none" stroke={color} strokeOpacity="0.30" strokeWidth="1.3"
            />
            <path
              d={`M${a.x} ${a.y} Q${cx + 6} ${cy + 6} ${b.x} ${b.y}`}
              fill="none" stroke={color2} strokeOpacity="0.20" strokeWidth="0.8"
            />
            {/* Message-pulse dots along the arc at 25 / 50 / 75 % */}
            {[0.25, 0.5, 0.75].map((t, di) => {
              const u = 1 - t;
              const px = u * u * a.x + 2 * u * t * cx + t * t * b.x;
              const py = u * u * a.y + 2 * u * t * cy + t * t * b.y;
              return <circle key={di} cx={px} cy={py} r={1.8 - di * 0.15} fill={di === 1 ? color2 : color} opacity={0.65 + di * 0.06} />;
            })}
          </g>
        );
      })}

      {/* === ANIMATED TRAVELLERS — rAF-driven, random link on each completion === */}
      <g ref={travellersRef} />

      {/* === AGENT NODES — glowing circles with labels === */}
      {AGENTS.map((agent, i) => {
        const c = p[agent.colorKey];
        const isCenter = i === 0;
        const r1 = isCenter ? 8 : 5;
        const r2 = isCenter ? 24 : 16;
        const r3 = isCenter ? 50 : 32;
        return (
          <g key={`agent-${i}`}>
            {/* Outer soft halo */}
            <circle cx={agent.x} cy={agent.y} r={r3} fill={c} opacity="0.14" />
            {/* Mid halo */}
            <circle cx={agent.x} cy={agent.y} r={r2} fill={c} opacity={isCenter ? 0.30 : 0.22} />
            {/* Ring */}
            <circle cx={agent.x} cy={agent.y} r={r2 + 2} fill="none" stroke={c} strokeOpacity={isCenter ? 0.45 : 0.35} strokeWidth={isCenter ? 1.4 : 1.0} />
            {/* Core bright node */}
            <circle cx={agent.x} cy={agent.y} r={r1} fill={c} opacity={isCenter ? 1.0 : 0.95} />
            {/* Label */}
            <text
              x={agent.x} y={agent.y + r2 + 14}
              fill={c} opacity={isCenter ? 0.55 : 0.45}
              fontSize={isCenter ? 9 : 7.5} fontFamily="monospace" textAnchor="middle" fontWeight={isCenter ? 'bold' : 'normal'}
            >
              {labels?.[i] ?? agent.label}
            </text>
          </g>
        );
      })}

      {/* === FLOWING DATA-STREAM CURVES across entire width === */}
      <path d="M0 350 Q200 280 400 320 T800 290 T1200 330 T1400 300" fill="none" stroke={p.glow} strokeOpacity="0.34" strokeWidth="1.8" />
      <path d="M0 410 Q260 350 520 390 T1040 360 T1400 385" fill="none" stroke={p.glow} strokeOpacity="0.24" strokeWidth="1.4" />
      <path d="M0 270 Q300 210 600 250 T1100 220 T1400 245" fill="none" stroke={p.surge} strokeOpacity="0.30" strokeWidth="1.6" />
      <path d="M0 490 Q350 440 700 470 T1400 450" fill="none" stroke={p.surge} strokeOpacity="0.22" strokeWidth="1.3" />
      <path d="M0 180 Q400 130 800 170 T1400 150" fill="none" stroke={p.glow} strokeOpacity="0.26" strokeWidth="1.4" />
      <path d="M0 130 Q350 80 700 120 T1400 100" fill="none" stroke={p.surge} strokeOpacity="0.20" strokeWidth="1.2" />
      <path d="M0 530 Q400 480 800 510 T1400 490" fill="none" stroke={p.glow} strokeOpacity="0.20" strokeWidth="1.2" />
      {/* Extra green/blue flowing curves */}
      <path d="M0 80 Q250 40 500 70 T1000 50 T1400 75" fill="none" stroke={p.glow} strokeOpacity="0.18" strokeWidth="1.1" />
      <path d="M0 460 Q300 420 600 445 T1200 425 T1400 440" fill="none" stroke={p.surge} strokeOpacity="0.18" strokeWidth="1.1" />
      <path d="M0 220 Q400 180 800 210 T1400 195" fill="none" stroke={p.glow} strokeOpacity="0.16" strokeWidth="1.0" />
      <path d="M0 320 Q350 290 700 310 T1400 295" fill="none" stroke={p.surge} strokeOpacity="0.16" strokeWidth="1.0" />

      {/* === SPARKLE NODES — upper region === */}
      <circle cx="80" cy="65" r="2.4" fill={p.glow} opacity="0.88" />
      <circle cx="230" cy="50" r="1.9" fill={p.surge} opacity="0.82" />
      <circle cx="480" cy="38" r="2.5" fill={p.glow} opacity="0.86" />
      <circle cx="660" cy="52" r="2.0" fill={p.surge} opacity="0.80" />
      <circle cx="890" cy="42" r="2.3" fill={p.glow} opacity="0.84" />
      <circle cx="1100" cy="58" r="2.2" fill={p.glow} opacity="0.82" />
      <circle cx="1300" cy="48" r="2.0" fill={p.surge} opacity="0.80" />
      <circle cx="1380" cy="75" r="2.2" fill={p.glow} opacity="0.78" />
      <circle cx="380" cy="60" r="2.1" fill={p.glow} opacity="0.84" />
      <circle cx="1050" cy="35" r="2.1" fill={p.surge} opacity="0.80" />
      {/* Extra green/blue sparkles — upper */}
      <circle cx="160" cy="40" r="1.8" fill={p.glow} opacity="0.78" />
      <circle cx="550" cy="55" r="1.7" fill={p.surge} opacity="0.74" />
      <circle cx="780" cy="30" r="1.9" fill={p.glow} opacity="0.76" />
      <circle cx="1200" cy="45" r="1.8" fill={p.surge} opacity="0.74" />

      {/* Lower region */}
      <circle cx="55" cy="495" r="2.2" fill={p.surge} opacity="0.82" />
      <circle cx="210" cy="515" r="2.0" fill={p.glow} opacity="0.78" />
      <circle cx="460" cy="525" r="2.4" fill={p.glow} opacity="0.80" />
      <circle cx="690" cy="505" r="2.1" fill={p.surge} opacity="0.76" />
      <circle cx="940" cy="515" r="2.3" fill={p.glow} opacity="0.80" />
      <circle cx="1200" cy="505" r="2.0" fill={p.surge} opacity="0.76" />
      <circle cx="1360" cy="495" r="2.2" fill={p.glow} opacity="0.78" />
      <circle cx="310" cy="535" r="2.1" fill={p.surge} opacity="0.78" />
      <circle cx="1100" cy="530" r="2.0" fill={p.glow} opacity="0.76" />
      {/* Extra green/blue sparkles — lower */}
      <circle cx="130" cy="540" r="1.7" fill={p.glow} opacity="0.72" />
      <circle cx="580" cy="545" r="1.8" fill={p.surge} opacity="0.70" />
      <circle cx="820" cy="535" r="1.9" fill={p.glow} opacity="0.74" />
      <circle cx="1280" cy="520" r="1.7" fill={p.surge} opacity="0.70" />

      {/* Mid-region */}
      <circle cx="60" cy="210" r="2.0" fill={p.glow} opacity="0.70" />
      <circle cx="1340" cy="230" r="2.2" fill={p.surge} opacity="0.72" />
      <circle cx="150" cy="330" r="1.9" fill={p.surge} opacity="0.68" />
      <circle cx="1250" cy="320" r="2.1" fill={p.glow} opacity="0.70" />
      {/* Extra green/blue sparkles — mid */}
      <circle cx="90" cy="400" r="1.8" fill={p.glow} opacity="0.66" />
      <circle cx="1310" cy="140" r="1.9" fill={p.surge} opacity="0.68" />
      <circle cx="50" cy="130" r="1.7" fill={p.surge} opacity="0.64" />
      <circle cx="1370" cy="380" r="1.8" fill={p.glow} opacity="0.66" />

      {/* === LARGE HALO GLOWS for depth === */}
      <circle cx="300" cy="200" r="90" fill={p.glow} opacity="0.10" />
      <circle cx="700" cy="420" r="100" fill={p.glow} opacity="0.09" />
      <circle cx="1050" cy="150" r="85" fill={p.surge} opacity="0.10" />
      <circle cx="200" cy="460" r="70" fill={p.surge} opacity="0.08" />
      <circle cx="1200" cy="460" r="75" fill={p.glow} opacity="0.09" />
      <circle cx="500" cy="120" r="65" fill={p.surge} opacity="0.08" />
      {/* Extra green/blue halos */}
      <circle cx="100" cy="100" r="80" fill={p.glow} opacity="0.07" />
      <circle cx="1300" cy="280" r="75" fill={p.surge} opacity="0.07" />
      <circle cx="600" cy="500" r="70" fill={p.glow} opacity="0.065" />
      <circle cx="900" cy="80" r="65" fill={p.surge} opacity="0.065" />
      <circle cx="400" cy="350" r="60" fill={p.glow} opacity="0.06" />
      <circle cx="1100" cy="400" r="60" fill={p.surge} opacity="0.06" />

      {/* === DIAGONAL STREAK HIGHLIGHTS === */}
      <line x1="0" y1="560" x2="500" y2="0" stroke={p.glow} strokeOpacity="0.12" strokeWidth="48" />
      <line x1="250" y1="560" x2="750" y2="0" stroke={p.surge} strokeOpacity="0.10" strokeWidth="40" />
      <line x1="600" y1="560" x2="1100" y2="0" stroke={p.glow} strokeOpacity="0.10" strokeWidth="36" />
      <line x1="950" y1="560" x2="1400" y2="60" stroke={p.surge} strokeOpacity="0.10" strokeWidth="32" />
      <line x1="400" y1="560" x2="900" y2="0" stroke={p.glow} strokeOpacity="0.06" strokeWidth="24" />
      <line x1="1100" y1="560" x2="1400" y2="200" stroke={p.surge} strokeOpacity="0.06" strokeWidth="24" />

      {/* === GREEN/BLUE RING ARCS (like Privacy hero) === */}
      <path d="M140 480 A160 160 0 0 1 140 160" fill="none" stroke={p.glow} strokeOpacity="0.20" strokeWidth="1.2" />
      <path d="M165 450 A130 130 0 0 1 165 190" fill="none" stroke={p.surge} strokeOpacity="0.16" strokeWidth="1.0" />
      <path d="M1260 160 A160 160 0 0 1 1260 480" fill="none" stroke={p.surge} strokeOpacity="0.20" strokeWidth="1.2" />
      <path d="M1235 190 A130 130 0 0 1 1235 450" fill="none" stroke={p.glow} strokeOpacity="0.16" strokeWidth="1.0" />
      </g>
    </svg>
  );
}
