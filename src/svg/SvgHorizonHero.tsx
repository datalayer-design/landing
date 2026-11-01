/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * CC BY 4.0 License
 */

/**
 * Wide SVG hero for long-horizon agent teams.
 *
 * The motif is a **procession**: ridges stacked one behind the other until
 * they thin into the horizon, and a road that winds over them from the bottom
 * of the frame, where it is now, to the vanishing point, where it is days from
 * now. Teams of three agents walk it, one after the other, for as long as the
 * page is open: the road never reaches anywhere, because the point of the
 * picture is that the work is still going after the reader has looked away.
 *
 * **Everything the sentence promises is something on that road.**
 *
 * - The steps are the marks on it: pending until a team has passed, then lit.
 * - The checkpoint is the pennant half way along: a team goes out beside it, as a
 *   run does when it is interrupted, the pennant stays lit, and the team comes
 *   back on at that spot rather than at the start.
 * - The approval is the gate: the team waits at the bar until the person beside
 *   it lifts their key, and only then does the bar rise.
 * - The privacy is the fence: two lines of posts running to the same vanishing
 *   point, the ground between them lit. The road, the data and the teams all
 *   stay on it, all the way to the horizon. The fence is in the person's colour
 *   and in nobody else's, as the key is: warm is what belongs to them, cool is
 *   what the agents do.
 * - The openness is what crosses the fence: three arcs, named after the open
 *   protocols they speak, leave by a port and go out of the frame, and messages
 *   come and go along them.
 *
 * **One journey, three teams.** A team's whole walk is one set of keyframes,
 * computed below from the same geometry the road is drawn with, so a team is on
 * the road because that is where the numbers put it, and it slows towards the
 * horizon because the ridges get thinner there. Each team runs that walk a
 * third of the way behind the next, and a team that reaches the vanishing point
 * has shrunk to nothing, which is why the loop has no seam. The gate, the
 * pennant and the steps are timed from the walk, not by hand.
 *
 * Teams go behind a ridge by fading over the few pixels at its crest, not by
 * being layered between the ridges: it reads the same at this size, and it lets
 * a team be one drawing rather than one for each ridge.
 *
 * Everything moves with CSS transforms and opacity rather than SMIL, because a
 * CSS rule can stop those: under reduced motion the drawing rests on the moment
 * the transform attributes describe, with a team waiting at the gate.
 *
 * A 1400 × 380 viewBox, sliced, as the other heroes. The road, the gate and the
 * vanishing point sit in the centre, the only part a phone is sure to show.
 */

import { useId } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

const WIDTH = 1400;
const HEIGHT = 380;

/** Seconds for a team to walk from now to the horizon. */
const JOURNEY = 90;
/** Teams on the road at once. */
const TEAMS = 3;
/** Seconds between two teams: the gate and the pennant keep this time. */
const BEAT = JOURNEY / TEAMS;

/** Far to near. Each is about half as far again from the horizon as the last. */
const RIDGES = [
  { base: 151, swell: 1.2, wave: 54, phase: 0.4, wash: 0.42 },
  { base: 174, swell: 4, wave: 86, phase: 2.1, wash: 0.34 },
  { base: 204, swell: 7, wave: 118, phase: 4.3, wash: 0.26 },
  { base: 250, swell: 11, wave: 160, phase: 1.2, wash: 0.2 },
  { base: 316, swell: 13, wave: 214, phase: 3.4, wash: 0.14 },
];

/** Where the ridge's top edge is at this x. */
function crest(ridge: number, x: number) {
  const { base, swell, wave, phase } = RIDGES[ridge];
  return base + swell * (Math.sin(x / wave + phase) + 0.5 * Math.sin(x / (wave * 0.43) + phase * 2.3));
}

const round = (value: number) => Number(value.toFixed(2));

/** A ridge's top edge: what is stroked along the crest. */
function ridgeLine(ridge: number) {
  const points = Array.from({ length: WIDTH / 14 + 1 }, (_, i) => `${i * 14} ${round(crest(ridge, i * 14))}`);
  return `M${points.join(' L')}`;
}

/** The ridge as a filled shape, down to the bottom of the frame. */
const ridgeShape = (ridge: number) => `${ridgeLine(ridge)} L${WIDTH} ${HEIGHT} L0 ${HEIGHT} Z`;

type Point = { x: number; y: number };

/** One switchback: the stretch of road on the face of one ridge. */
type Leg = {
  ridge: number;
  curve: [Point, Point, Point, Point];
  /** How big things are at each end of it. */
  scale: [number, number];
};

/**
 * Near to far. A leg starts under the nearer ridge and ends past the crest of
 * its own, and the clip takes off both ends, which is what makes the road go
 * over the top rather than stop at it.
 */
const LEGS: Leg[] = [
  {
    ridge: 4,
    curve: [{ x: 544, y: 482 }, { x: 610, y: 410 }, { x: 716, y: 372 }, { x: 702, y: 298 }],
    scale: [2, 1.2],
  },
  {
    ridge: 3,
    curve: [{ x: 706, y: 342 }, { x: 702, y: 296 }, { x: 614, y: 278 }, { x: 590, y: 232 }],
    scale: [1.2, 0.72],
  },
  {
    ridge: 2,
    curve: [{ x: 582, y: 262 }, { x: 588, y: 214 }, { x: 806, y: 252 }, { x: 822, y: 192 }],
    scale: [0.72, 0.42],
  },
  {
    ridge: 1,
    curve: [{ x: 836, y: 216 }, { x: 826, y: 180 }, { x: 716, y: 200 }, { x: 700, y: 168 }],
    scale: [0.42, 0.22],
  },
  {
    ridge: 0,
    curve: [{ x: 694, y: 186 }, { x: 700, y: 168 }, { x: 750, y: 170 }, { x: 742, y: 151 }],
    scale: [0.22, 0.06],
  },
];

/** The end of the road, on the crest of the farthest ridge. */
const VANISH: Point = { x: 742, y: crest(0, 742) };

function bezier([a, b, c, d]: Leg['curve'], t: number): Point {
  const u = 1 - t;
  const at = (key: keyof Point) =>
    u * u * u * a[key] + 3 * u * u * t * b[key] + 3 * u * t * t * c[key] + t * t * t * d[key];
  return { x: at('x'), y: at('y') };
}

/**
 * The road at `along`, from 0 (now) to 1 (the horizon): where it is, how big
 * things are there, and how far it is in the clear (0 behind a ridge, 1 well
 * inside the face of one), which is what a team's opacity follows.
 */
function roadAt(along: number) {
  const position = Math.min(along, 0.99999) * LEGS.length;
  const index = Math.floor(position);
  const leg = LEGS[index];
  const t = position - index;
  const point = bezier(leg.curve, t);
  const scale = leg.scale[0] + (leg.scale[1] - leg.scale[0]) * t;
  const belowOwn = point.y - crest(leg.ridge, point.x);
  const aboveNearer = leg.ridge < RIDGES.length - 1 ? crest(leg.ridge + 1, point.x) - point.y : Infinity;
  const clear = Math.max(0, Math.min(1, Math.min(belowOwn, aboveNearer) / (6 * scale + 1)));
  return { ...point, scale, clear };
}

/** How wide the road is, at scale 1. */
const ROAD_WIDTH = 34;

/**
 * A leg as a ribbon: wide across, foreshortened along, so that a stretch of road
 * running sideways lies on the ground rather than standing up off it.
 */
function legRibbon(leg: Leg) {
  const samples = Array.from({ length: 29 }, (_, i) => {
    const t = i / 28;
    const point = bezier(leg.curve, t);
    const ahead = bezier(leg.curve, Math.min(1, t + 0.01));
    const behind = bezier(leg.curve, Math.max(0, t - 0.01));
    const dx = ahead.x - behind.x;
    const dy = ahead.y - behind.y;
    const length = Math.hypot(dx, dy) || 1;
    const half = ((leg.scale[0] + (leg.scale[1] - leg.scale[0]) * t) * ROAD_WIDTH) / 2;
    return {
      left: `${round(point.x - (dy / length) * half)} ${round(point.y + (dx / length) * half * 0.38)}`,
      right: `${round(point.x + (dy / length) * half)} ${round(point.y - (dx / length) * half * 0.38)}`,
    };
  });
  return `M${samples.map(s => s.left).join(' L')} L${samples.reverse().map(s => s.right).join(' L')} Z`;
}

function legMiddle(leg: Leg) {
  const samples = Array.from({ length: 29 }, (_, i) => {
    const point = bezier(leg.curve, i / 28);
    return `${round(point.x)} ${round(point.y)}`;
  });
  return `M${samples.join(' L')}`;
}

/** Where a team stops, as a fraction of the road. */
const GATE_AT = 0.268;
const CHECKPOINT_AT = 0.497;

/**
 * A team's walk as [fraction of the journey, fraction of the road]: on to the
 * gate, wait, on to the pennant, wait, and the long rest of the way. The two
 * waits fall at different points of the beat, so one is always coming up.
 */
const WALK: Array<[number, number]> = [
  [0, 0],
  [0.11, GATE_AT],
  [0.2, GATE_AT],
  [0.3, CHECKPOINT_AT],
  [0.37, CHECKPOINT_AT],
  [1, 1],
];

/** When, in the journey, the team goes out at the pennant and comes back on. */
const OUTAGE = { out: 0.316, down: 0.322, up: 0.346, on: 0.36 };

function walkAt(time: number) {
  const span = WALK.findIndex(([end], index) => index > 0 && time <= end);
  const [startTime, startRoad] = WALK[span - 1];
  const [endTime, endRoad] = WALK[span];
  const t = (time - startTime) / (endTime - startTime);
  return startRoad + (endRoad - startRoad) * (t * t * (3 - 2 * t));
}

/** How lit a team is: fully, but for the outage at the pennant. */
function lampAt(time: number) {
  if (time > OUTAGE.out && time < OUTAGE.down) {
    return 1 - 0.9 * ((time - OUTAGE.out) / (OUTAGE.down - OUTAGE.out));
  }
  if (time >= OUTAGE.down && time <= OUTAGE.up) {
    return 0.1;
  }
  if (time > OUTAGE.up && time < OUTAGE.on) {
    return 0.1 + 0.9 * ((time - OUTAGE.up) / (OUTAGE.on - OUTAGE.up));
  }
  return 1;
}

/** Where a team is at a moment of the journey, as a transform and an opacity. */
function teamAt(time: number) {
  const road = roadAt(walkAt(time));
  return {
    x: round(road.x),
    y: round(road.y - 11 * road.scale),
    scale: round(road.scale),
    opacity: round(road.clear * lampAt(time)),
  };
}

/** Half a second a stop, which is fine enough for the fade at a crest. */
const JOURNEY_STOPS = Array.from({ length: JOURNEY * 2 + 1 }, (_, i) => {
  const time = i / (JOURNEY * 2);
  const { x, y, scale, opacity } = teamAt(time);
  return `${round(time * 100)}% { transform: translate(${x}px, ${y}px) scale(${scale}); opacity: ${opacity}; }`;
}).join('\n');

/** When, in seconds into the journey, a team reaches this point of the road. */
function arrival(along: number) {
  const moment = Array.from({ length: 1001 }, (_, i) => i / 1000).find(time => walkAt(time) >= along);
  return (moment ?? 1) * JOURNEY;
}

/**
 * The delay that puts a thing keeping the beat at its start when a team reaches
 * it. Negative, so that it is already in step on the first frame.
 */
const onBeat = (seconds: number) => round((seconds % BEAT) - BEAT);

const GATE_SECONDS = WALK[1][0] * JOURNEY;
const CHECKPOINT_SECONDS = WALK[3][0] * JOURNEY;

/** Where the marks of the road are, as fractions of it. */
const STEPS = [0.09, 0.15, 0.3, 0.335, 0.43, 0.56, 0.62, 0.72, 0.78, 0.9].map(along => ({
  along,
  ...roadAt(along),
}));

/** How far from the vanishing point each line of the fence is at the bottom of the frame. */
const FENCE_SPREAD = 520;

/** The fence's x at this y: `side` is -1 for the left line, 1 for the right. */
const fenceAt = (side: -1 | 1, y: number) =>
  VANISH.x + (side * FENCE_SPREAD * (y - VANISH.y)) / (HEIGHT - VANISH.y);

/** Posts bunch up towards the horizon, as they do. */
const FENCE_POSTS = Array.from({ length: 13 }, (_, i) => {
  const y = VANISH.y + 5 + (HEIGHT - VANISH.y) * Math.pow((i + 1) / 13, 2.2);
  return { y: round(y), height: round(2 + (y - VANISH.y) * 0.13) };
});

/** The protocols the team's links speak, each an arc from a port to out of the frame. */
const LINKS: Array<{
  name: string;
  port: Point;
  control: Point;
  end: Point;
  /** Where the name sits along the arc. */
  label: number;
  duration: number;
}> = [
  {
    name: 'A2A',
    port: { x: fenceAt(-1, 268), y: 268 },
    control: { x: 330, y: 92 },
    end: { x: -40, y: 118 },
    label: 0.3,
    duration: 19,
  },
  {
    name: 'ACP',
    port: { x: fenceAt(-1, 196), y: 196 },
    control: { x: 548, y: 66 },
    end: { x: 250, y: -30 },
    label: 0.42,
    duration: 26,
  },
  {
    name: 'MCP',
    port: { x: fenceAt(1, 236), y: 236 },
    control: { x: 1060, y: 66 },
    end: { x: 1440, y: 98 },
    label: 0.3,
    duration: 22,
  },
];

function linkAt({ port, control, end }: (typeof LINKS)[number], t: number): Point {
  const u = 1 - t;
  return {
    x: round(u * u * port.x + 2 * u * t * control.x + t * t * end.x),
    y: round(u * u * port.y + 2 * u * t * control.y + t * t * end.y),
  };
}

/** A message along a link: in step with nothing, since it is someone else's. */
const LINK_STOPS = LINKS.map(link =>
  Array.from({ length: 33 }, (_, i) => {
    const { x, y } = linkAt(link, i / 32);
    return `${round((i / 32) * 100)}% { transform: translate(${x}px, ${y}px); opacity: ${i === 0 ? 0 : 1}; }`;
  }).join('\n'),
);

/**
 * A team: three agents joined up, a little triangle that keeps turning, so that
 * even a team waiting at the gate is plainly not idle.
 */
function Team({ inks }: { inks: string[] }) {
  const seats = inks.map((_, seat) => {
    const angle = -Math.PI / 2 + (seat * 2 * Math.PI) / 3;
    return { seat, x: round(Math.cos(angle) * 12), y: round(Math.sin(angle) * 12), ink: inks[seat] };
  });
  return (
    <>
      <circle r="24" fill={inks[0]} opacity="0.13" />
      <path
        d={`M${seats.map(seat => `${seat.x} ${seat.y}`).join(' L')} Z`}
        fill={inks[0]}
        fillOpacity="0.12"
        stroke={inks[0]}
        strokeOpacity="0.7"
        strokeWidth="1"
      />
      {seats.map(seat => (
        <g key={seat.seat} transform={`translate(${seat.x} ${seat.y})`}>
          <circle r="8.5" fill={seat.ink} opacity="0.2" />
          <circle r="4.8" fill={seat.ink} />
        </g>
      ))}
    </>
  );
}

/** A dataset, as the library draws one: stroked, the cylinder and nothing more. */
function Data({ x, y, size, color }: Point & { size: number; color: string }) {
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24}) translate(-12 -12)`}>
      <ellipse cx="12" cy="6" rx="8" ry="3.2" {...common} />
      <path d="M4 6v12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6" {...common} />
      <path d="M4 12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2" {...common} />
    </g>
  );
}

export function SvgHorizonHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const id = useId().replace(/:/g, '');

  /** The palette, cycled so that a team's three agents are not the same colour. */
  const inks = [p.glow, p.pop, p.accent];

  /** What belongs to the person: the fence, the key, and the person. */
  const theirs = p.gold;

  const gate = roadAt(GATE_AT + 0.022);
  const gateHalf = (gate.scale * ROAD_WIDTH) / 2 + 9;
  const gatePost = 40;
  const gateLeft = round(gate.x - gateHalf);
  const gateRight = round(gate.x + gateHalf);
  const gateBar = gate.y - gatePost + 13;
  const person = { x: gateLeft - 46, y: gate.y + 12 };
  /* The shoulder, from the feet, and the hand, from the shoulder. */
  const shoulder = { x: 0, y: -31 };
  const hand = { x: 22, y: 3 };

  const pennant = roadAt(CHECKPOINT_AT);
  const pennantX = round(pennant.x + 22);
  const pennantY = round(pennant.y + 1);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <style>{`
          @keyframes hz-walk-${id} {
            ${JOURNEY_STOPS}
          }
          ${LINK_STOPS.map((stops, index) => `@keyframes hz-link-${index}-${id} {\n${stops}\n}`).join('\n')}
          @keyframes hz-turn-${id} { to { transform: rotate(360deg); } }
          /* Out from the vanishing point, as the hours go by. */
          @keyframes hz-ripple-${id} {
            0% { transform: scale(0.06); opacity: 0; }
            16% { opacity: 0.36; }
            100% { transform: scale(1); opacity: 0; }
          }
          /* From the team reaching a mark: lit at once, dimming until the next one. */
          @keyframes hz-step-${id} {
            0% { opacity: 0.04; }
            3% { opacity: 1; }
            62% { opacity: 0.8; }
            100% { opacity: 0.04; }
          }
          /* From the team reaching the gate, on the beat. */
          @keyframes hz-wait-${id} {
            0%, 2% { opacity: 0; }
            6%, 20% { opacity: 0.8; }
            25%, 100% { opacity: 0; }
          }
          /* The arm goes up, the key turns in the hand, and only then the bar. */
          @keyframes hz-arm-${id} {
            0%, 5% { transform: rotate(0deg); }
            11%, 30% { transform: rotate(-42deg); }
            38%, 100% { transform: rotate(0deg); }
          }
          @keyframes hz-key-${id} {
            0%, 10% { transform: rotate(0deg); }
            15%, 30% { transform: rotate(90deg); }
            38%, 100% { transform: rotate(0deg); }
          }
          @keyframes hz-grant-${id} {
            0%, 13% { opacity: 0; }
            16%, 24% { opacity: 0.9; }
            29%, 100% { opacity: 0; }
          }
          @keyframes hz-bar-${id} {
            0%, 17% { transform: rotate(0deg); }
            25%, 50% { transform: rotate(-74deg); }
            60%, 100% { transform: rotate(0deg); }
          }
          /* From the team reaching the pennant: a ring as it comes back on there. */
          @keyframes hz-saved-${id} {
            0%, 14% { transform: scale(0.2); opacity: 0; }
            16% { transform: scale(0.24); opacity: 0.95; }
            46%, 100% { transform: scale(1); opacity: 0; }
          }
          .hz-walk-${id} { animation: hz-walk-${id} ${JOURNEY}s linear infinite; }
          .hz-turn-${id} { transform-origin: 0 0; animation: hz-turn-${id} 28s linear infinite; }
          .hz-ripple-${id} { transform-origin: 0 0; animation: hz-ripple-${id} 48s linear infinite; }
          .hz-step-${id} { animation: hz-step-${id} ${BEAT}s linear infinite; }
          .hz-wait-${id} { animation: hz-wait-${id} ${BEAT}s linear infinite; }
          .hz-arm-${id} { transform-origin: 0 0; animation: hz-arm-${id} ${BEAT}s ease-in-out infinite; }
          .hz-key-${id} { transform-origin: 0 0; animation: hz-key-${id} ${BEAT}s ease-in-out infinite; }
          .hz-grant-${id} { animation: hz-grant-${id} ${BEAT}s linear infinite; }
          .hz-bar-${id} { transform-origin: 0 0; animation: hz-bar-${id} ${BEAT}s ease-in-out infinite; }
          .hz-saved-${id} { transform-origin: 0 0; animation: hz-saved-${id} ${BEAT}s ease-out infinite; }
          ${LINKS.map((link, index) => `.hz-link-${index}-${id} { animation: hz-link-${index}-${id} ${link.duration}s linear infinite; }`).join('\n')}
          @media (prefers-reduced-motion: reduce) {
            .hz-walk-${id}, .hz-turn-${id}, .hz-ripple-${id}, .hz-step-${id}, .hz-wait-${id},
            .hz-arm-${id}, .hz-key-${id}, .hz-grant-${id}, .hz-bar-${id}, .hz-saved-${id},
            ${LINKS.map((_, index) => `.hz-link-${index}-${id}`).join(', ')} { animation: none; }
          }
        `}</style>

        {/* The sky: light gathering on the horizon, not a sun on it. */}
        <linearGradient id={`hz-sky-${id}`} x1="0" y1="0" x2="0" y2={VANISH.y} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={p.pop} stopOpacity="0" />
          <stop offset="62%" stopColor={p.pop} stopOpacity="0.1" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0.34" />
        </linearGradient>
        <radialGradient id={`hz-dawn-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.62" />
          <stop offset="34%" stopColor={p.glow} stopOpacity="0.2" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>

        {/* The horizon itself: drawn from nothing, brightest where the road ends. */}
        <linearGradient id={`hz-line-${id}`} x1="0" y1="0" x2={WIDTH} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.1" />
          <stop offset={`${round((VANISH.x / WIDTH) * 100)}%`} stopColor={p.glow} stopOpacity="1" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0.1" />
        </linearGradient>

        {/* A ridge is lit along its crest and falls away into the dark below it. */}
        {RIDGES.map((ridge, index) => (
          <linearGradient
            key={`wash-${index}`}
            id={`hz-wash-${index}-${id}`}
            x1="0"
            y1={ridge.base - ridge.swell * 1.5}
            x2="0"
            y2={ridge.base + 34 + index * 18}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={p.glow} stopOpacity={ridge.wash} />
            <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
          </linearGradient>
        ))}
        {RIDGES.map((_, index) => (
          <clipPath key={`clip-${index}`} id={`hz-clip-${index}-${id}`}>
            <path d={ridgeShape(index)} />
          </clipPath>
        ))}

        <clipPath id={`hz-above-${id}`}>
          <rect width={WIDTH} height={VANISH.y} />
        </clipPath>

        {/* The ground inside the fence: the part that is theirs. */}
        <linearGradient id={`hz-ground-${id}`} x1="0" y1={VANISH.y} x2="0" y2={HEIGHT} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={theirs} stopOpacity="0.13" />
          <stop offset="100%" stopColor={theirs} stopOpacity="0.04" />
        </linearGradient>

        {LINKS.map((link, index) => (
          <linearGradient
            key={`arc-${link.name}`}
            id={`hz-arc-${index}-${id}`}
            x1={link.port.x}
            y1={link.port.y}
            x2={link.end.x}
            y2={link.end.y}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={inks[index]} stopOpacity="0.85" />
            <stop offset="100%" stopColor={inks[index]} stopOpacity="0.3" />
          </linearGradient>
        ))}
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill={p.bg} />
      <rect width={WIDTH} height={VANISH.y + 2} fill={`url(#hz-sky-${id})`} />

      {/* Rings of time, widening out of the horizon and gone before they repeat. */}
      <g clipPath={`url(#hz-above-${id})`}>
        <g transform={`translate(${VANISH.x} ${VANISH.y})`} fill="none" stroke={p.glow} strokeWidth="1">
          {[0, 1, 2, 3].map(ring => (
            <circle
              key={`ring-${ring}`}
              className={`hz-ripple-${id}`}
              r="620"
              vectorEffect="non-scaling-stroke"
              opacity="0.1"
              transform={`scale(${0.2 + ring * 0.22})`}
              style={{ animationDelay: `${-ring * 12}s` }}
            />
          ))}
        </g>
      </g>
      <ellipse cx={VANISH.x} cy={VANISH.y} rx="300" ry="90" fill={`url(#hz-dawn-${id})`} />

      {/* Far to near, each ridge painting out the foot of the one behind it. */}
      {RIDGES.map((ridge, index) => (
        <g key={`ridge-${index}`}>
          <path d={ridgeShape(index)} fill={p.bg} />
          <path d={ridgeShape(index)} fill={`url(#hz-wash-${index}-${id})`} />
          <g clipPath={`url(#hz-clip-${index}-${id})`}>
            {/* Contours, the way a map would give the slope. */}
            {[7, 15, 25].map((drop, line) => (
              <path
                key={`contour-${index}-${line}`}
                d={ridgeLine(index)}
                transform={`translate(0 ${drop + index * 2 * line})`}
                fill="none"
                stroke={p.glow}
                strokeWidth="0.7"
                strokeOpacity={0.15 - line * 0.04}
              />
            ))}
            <polygon
              points={`${VANISH.x},${VANISH.y} ${fenceAt(-1, HEIGHT)},${HEIGHT} ${fenceAt(1, HEIGHT)},${HEIGHT}`}
              fill={`url(#hz-ground-${id})`}
            />
            {LEGS.filter(leg => leg.ridge === index).map(leg => (
              <g key={`leg-${leg.ridge}`}>
                <path d={legRibbon(leg)} fill={p.bg} opacity="0.75" />
                <path d={legRibbon(leg)} fill={p.glow} opacity="0.16" />
                <path
                  d={legMiddle(leg)}
                  fill="none"
                  stroke={p.glow}
                  strokeOpacity="0.5"
                  strokeWidth={round(leg.scale[1] * 1.1)}
                  strokeDasharray={`${round(leg.scale[1] * 7)} ${round(leg.scale[1] * 6)}`}
                />
              </g>
            ))}
          </g>
          <path
            d={ridgeLine(index)}
            fill="none"
            stroke={index === 0 ? `url(#hz-line-${id})` : p.glow}
            strokeWidth={index === 0 ? 1.4 : 0.9}
            strokeOpacity={index === 0 ? 1 : 0.5}
          />
        </g>
      ))}

      {/* The fence: two lines that only meet at the horizon. */}
      {([-1, 1] as const).map(side => (
        <g key={`fence-${side}`} stroke={theirs} strokeLinecap="round">
          <line
            x1={VANISH.x}
            y1={VANISH.y}
            x2={fenceAt(side, HEIGHT)}
            y2={HEIGHT}
            strokeWidth="1.1"
            strokeOpacity="0.75"
          />
          {FENCE_POSTS.map(post => (
            <line
              key={post.y}
              x1={round(fenceAt(side, post.y))}
              y1={post.y}
              x2={round(fenceAt(side, post.y))}
              y2={round(post.y - post.height)}
              strokeWidth={round(0.7 + post.height * 0.05)}
              strokeOpacity="0.8"
            />
          ))}
        </g>
      ))}

      {/* The links: the only things that cross the fence, and they keep going. */}
      {LINKS.map((link, index) => {
        const label = linkAt(link, link.label);
        return (
          <g key={link.name}>
            <path
              d={`M${link.port.x} ${link.port.y} Q${link.control.x} ${link.control.y} ${link.end.x} ${link.end.y}`}
              fill="none"
              stroke={`url(#hz-arc-${index}-${id})`}
              strokeWidth="1.2"
            />
            <rect
              x={round(link.port.x - 4)}
              y={round(link.port.y - 4)}
              width="8"
              height="8"
              transform={`rotate(45 ${link.port.x} ${link.port.y})`}
              fill={p.bg}
              stroke={inks[index]}
              strokeWidth="1.4"
            />
            {[0, 1].map(pulse => {
              const rest = linkAt(link, 0.22 + pulse * 0.42);
              return (
                <circle
                  key={`pulse-${pulse}`}
                  className={`hz-link-${index}-${id}`}
                  r="2.6"
                  fill={inks[index]}
                  transform={`translate(${rest.x} ${rest.y})`}
                  style={{
                    animationDelay: `${-(link.duration * (0.3 + pulse * 0.5))}s`,
                    animationDirection: pulse === 0 ? 'normal' : 'reverse',
                  }}
                />
              );
            })}
            <rect
              x={label.x - 20}
              y={label.y - 9}
              width="40"
              height="18"
              rx="9"
              fill={p.bg}
              stroke={inks[index]}
              strokeOpacity="0.7"
              strokeWidth="0.9"
            />
            <text
              x={label.x}
              y={label.y + 3.6}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              letterSpacing="0.7"
              fill={inks[index]}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {link.name}
            </text>
          </g>
        );
      })}

      {/* The data: well inside the fence, and joined to nothing outside it. */}
      <Data x={882} y={294} size={30} color={theirs} />
      <Data x={498} y={330} size={34} color={theirs} />

      {/* The marks of the road: a ring until a team has been by. */}
      {STEPS.filter(step => step.clear > 0.8).map(step => (
        <g key={step.along} transform={`translate(${round(step.x)} ${round(step.y)})`}>
          <circle
            r={round(Math.max(1.8, step.scale * 3.4))}
            fill={p.bg}
            stroke={p.glow}
            strokeOpacity="0.8"
            strokeWidth={round(Math.max(0.5, step.scale * 1))}
          />
          <circle
            className={`hz-step-${id}`}
            r={round(Math.max(1.1, step.scale * 2.2))}
            fill={p.glow}
            opacity="0.7"
            style={{ animationDelay: `${onBeat(arrival(step.along))}s` }}
          />
        </g>
      ))}

      {/* The pennant: it does not dim, which is the whole of its job. */}
      <g transform={`translate(${pennantX} ${pennantY})`}>
        <g
          className={`hz-saved-${id}`}
          opacity="0"
          style={{ animationDelay: `${onBeat(CHECKPOINT_SECONDS)}s` }}
        >
          <ellipse rx="56" ry="17" fill="none" stroke={p.spark} strokeWidth="1.4" />
        </g>
        <ellipse rx="9" ry="3" fill={p.spark} opacity="0.34" />
        <line y2="-32" stroke={p.spark} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M0 -32 L17 -26 L0 -20 Z" fill={p.spark} />
      </g>

      {/* The gate: the bar is down unless the person has said otherwise. */}
      <g>
        <ellipse
          className={`hz-wait-${id}`}
          cx={gate.x}
          cy={gate.y}
          rx={gateHalf + 15}
          ry="12"
          fill="none"
          stroke={theirs}
          strokeWidth="1.3"
          opacity="0.8"
          style={{ animationDelay: `${onBeat(GATE_SECONDS)}s` }}
        />
        {/* The tall post carries the bar; the short one is where it comes to rest. */}
        <line
          x1={gateLeft}
          y1={gate.y}
          x2={gateLeft}
          y2={gate.y - gatePost}
          stroke={theirs}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1={gateRight}
          y1={gate.y}
          x2={gateRight}
          y2={gateBar + 2}
          stroke={theirs}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g transform={`translate(${gateLeft} ${gateBar})`}>
          <g className={`hz-bar-${id}`} style={{ animationDelay: `${onBeat(GATE_SECONDS)}s` }}>
            <line x2={gateHalf * 2} stroke={theirs} strokeWidth="3.4" strokeLinecap="round" />
            {[0.28, 0.6].map(along => (
              <line
                key={along}
                x1={gateHalf * 2 * along}
                x2={gateHalf * 2 * along + 8}
                stroke={p.bg}
                strokeWidth="3.4"
              />
            ))}
          </g>
        </g>
        <path
          className={`hz-grant-${id}`}
          d={`M${person.x + 30} ${person.y - 62} Q${person.x + 44} ${gateBar - 26} ${gateLeft} ${gateBar}`}
          fill="none"
          stroke={theirs}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0"
          style={{ animationDelay: `${onBeat(GATE_SECONDS)}s` }}
        />
      </g>

      {/* The person, and the key that stays in their hand. */}
      <g transform={`translate(${person.x} ${person.y})`} stroke={theirs} strokeLinecap="round" fill="none">
        <ellipse rx="17" ry="4" fill={theirs} stroke="none" opacity="0.26" />
        <circle cy="-41" r="6" fill={theirs} stroke="none" />
        <path d="M0 -30 V-14" strokeWidth="8" />
        <path d="M-1.6 -12 L-5 -1 M1.6 -12 L5 -1" strokeWidth="4.4" />
        <path d="M-4 -29 L-8 -15" strokeWidth="3.2" />
        <g transform={`translate(${shoulder.x} ${shoulder.y})`}>
          <g className={`hz-arm-${id}`} style={{ animationDelay: `${onBeat(GATE_SECONDS)}s` }}>
            <path d={`M3 0 L${hand.x} ${hand.y}`} strokeWidth="3.2" />
            <g transform={`translate(${hand.x + 6} ${hand.y})`}>
              <g className={`hz-key-${id}`} style={{ animationDelay: `${onBeat(GATE_SECONDS)}s` }}>
                <circle cx="-2" r="4" strokeWidth="2" />
                <path d="M2 0 H13 M9 0 V4 M13 0 V4" strokeWidth="2" />
              </g>
            </g>
          </g>
        </g>
      </g>

      {/* Now, hours, days: all the scale this picture needs. */}
      <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={p.textMuted} letterSpacing="1.2">
        <text x="740" y="352" fontSize="12">now</text>
        <text x="858" y="232" fontSize="10">hours</text>
        <text x="800" y="170" fontSize="8.5">days</text>
      </g>

      {/* The teams last: a third of the road apart, and never anywhere else. */}
      {Array.from({ length: TEAMS }, (_, team) => {
        const delay = team * BEAT;
        const rest = teamAt(((GATE_SECONDS + 3 + delay) % JOURNEY) / JOURNEY);
        return (
          <g
            key={`team-${team}`}
            className={`hz-walk-${id}`}
            transform={`translate(${rest.x} ${rest.y}) scale(${rest.scale})`}
            opacity={rest.opacity}
            style={{ animationDelay: `${-delay}s` }}
          >
            <g className={`hz-turn-${id}`}>
              <Team inks={[inks[team], inks[(team + 1) % 3], inks[(team + 2) % 3]]} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export default SvgHorizonHero;
