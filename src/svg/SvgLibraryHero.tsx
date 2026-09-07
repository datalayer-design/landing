/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Wide SVG background for the library section of the home page.
 *
 * The motif is the word the library uses for a star: an **orbit**. What
 * travels on them is what the library holds — a notebook, a document, a cell,
 * a dataset, an agent — because a background for a library should be made of
 * the things in it rather than of anonymous dots.
 *
 * **Two anchors, both off the canvas, neither in the middle.** The drawing
 * used to be one bullseye centred at 700 × 260, which is exactly where the
 * section puts its search field: the bright core surfaced above and below the
 * input like a coin behind a letterbox, and every ring was concentric with the
 * headline. Now the systems are pinned past the bottom-left and top-right
 * corners, so only their outer arcs reach in, sweeping diagonally and leaving
 * the middle to the words. There is no core to collide with anything — what
 * marked the centre is a soft glow at each anchor, off screen.
 *
 * The orbits are circles rather than ellipses so that a rotation is real
 * travel. Rotating a point around an ellipse's centre traces a circle, not the
 * ellipse, which is why the marks used to drift off the ring they belonged to.
 * Each artifact then counter-rotates at the same rate, so it rides the circle
 * without tumbling — a notebook stays the right way up all the way round.
 *
 * Every colour comes from the palette, so the drawing holds in light and dark
 * and under every theme variant rather than being a picture of one of them.
 *
 * A 1400 × 520 viewBox, sliced: the section is wider than it is tall on a
 * desktop and taller than it is wide on a phone, and the composition must
 * survive both — which is another reason nothing important sits at the centre,
 * since the centre is the only part guaranteed to be visible.
 */

import { useId, type CSSProperties } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';

/** What the library holds, as a mark small enough to be background. */
type ArtifactKind = 'notebook' | 'document' | 'cell' | 'dataset' | 'agent';

/**
 * One artifact, drawn in a 24 × 24 box centred on the origin.
 *
 * Stroked rather than filled, and reduced to the one feature that tells each
 * kind from the others at this size: the notebook its spine, the document its
 * folded corner, the cell its run marker, the dataset its cylinder, the agent
 * its spark. Anything more is lost by the time it is this small and this faint.
 */
function ArtifactGlyph({
  kind,
  size,
  color,
}: {
  kind: ArtifactKind;
  size: number;
  color: string;
}) {
  const scale = size / 24;
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <g transform={`scale(${scale}) translate(-12 -12)`}>
      {kind === 'notebook' && (
        <>
          <rect x="4" y="3" width="16" height="18" rx="2.5" {...common} />
          <line x1="8.5" y1="3" x2="8.5" y2="21" {...common} />
          <line x1="11.5" y1="9" x2="16.5" y2="9" {...common} />
          <line x1="11.5" y1="13" x2="16.5" y2="13" {...common} />
        </>
      )}
      {kind === 'document' && (
        <>
          <path d="M6 3h8l4 4v14H6z" {...common} />
          <path d="M14 3v4h4" {...common} />
          <line x1="9" y1="12" x2="15" y2="12" {...common} />
          <line x1="9" y1="16" x2="15" y2="16" {...common} />
        </>
      )}
      {kind === 'cell' && (
        <>
          <rect x="3" y="7" width="18" height="11" rx="2.5" {...common} />
          <path d="M7 11l2.5 1.5L7 14" {...common} />
          <line x1="12.5" y1="14" x2="17" y2="14" {...common} />
        </>
      )}
      {kind === 'dataset' && (
        <>
          <ellipse cx="12" cy="7" rx="7" ry="3" {...common} />
          <path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7" {...common} />
          <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" {...common} />
        </>
      )}
      {kind === 'agent' && (
        <>
          <circle cx="11" cy="13" r="6" {...common} />
          <path d="M18.5 4.5v4M16.5 6.5h4" {...common} />
          <circle cx="9" cy="12" r="0.9" fill={color} stroke="none" />
          <circle cx="13" cy="12" r="0.9" fill={color} stroke="none" />
        </>
      )}
    </g>
  );
}

/** An orbital system: where its centre is, and the rings around it. */
type System = {
  cx: number;
  cy: number;
  rings: Array<{
    r: number;
    /** Seconds for a full turn. Slower the further out, as a sky behaves. */
    duration: number;
    opacity: number;
    /** What rides this ring, and at what angle it starts. */
    riders: Array<{ kind: ArtifactKind; angle: number; size: number }>;
  }>;
};

export function SvgLibraryHero({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const id = useId().replace(/:/g, '');

  /*
   * Both centres sit outside the frame, in opposite corners. The starting
   * angles put every artifact inside the canvas at rest — which is what a
   * reader with reduced motion sees, and what the first paint shows before
   * anything has turned.
   */
  const systems: System[] = [
    {
      cx: 150,
      cy: 505,
      rings: [
        {
          r: 250,
          duration: 96,
          opacity: 0.3,
          riders: [
            { kind: 'notebook', angle: -62, size: 36 },
            { kind: 'cell', angle: -14, size: 31 },
          ],
        },
        {
          r: 385,
          duration: 148,
          opacity: 0.22,
          riders: [
            { kind: 'document', angle: -78, size: 33 },
            { kind: 'dataset', angle: -32, size: 34 },
          ],
        },
        {
          r: 530,
          duration: 210,
          opacity: 0.15,
          riders: [
            { kind: 'agent', angle: -55, size: 37 },
            { kind: 'notebook', angle: -8, size: 31 },
            { kind: 'cell', angle: -96, size: 29 },
          ],
        },
      ],
    },
    {
      cx: 1275,
      cy: 20,
      rings: [
        {
          r: 215,
          duration: 112,
          opacity: 0.28,
          riders: [
            { kind: 'agent', angle: 118, size: 33 },
            { kind: 'document', angle: 168, size: 30 },
          ],
        },
        {
          r: 355,
          duration: 168,
          opacity: 0.2,
          riders: [
            { kind: 'dataset', angle: 132, size: 32 },
            { kind: 'cell', angle: 176, size: 31 },
          ],
        },
        {
          r: 495,
          duration: 232,
          opacity: 0.13,
          riders: [
            { kind: 'notebook', angle: 150, size: 33 },
            { kind: 'document', angle: 196, size: 29 },
          ],
        },
      ],
    },
  ];

  /** The palette, cycled so neighbouring artifacts are not the same colour. */
  const inks = [p.pop, p.glow, p.accent];

  return (
    <svg
      viewBox="0 0 1400 520"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0 }}
    >
      <defs>
        <style>{`
          @keyframes lib-turn-${id} { to { transform: rotate(360deg); } }
          @keyframes lib-hold-${id} { to { transform: rotate(-360deg); } }
          /*
            Both halves run at the same duration, set per ring through --turn:
            the ring carries its artifacts round, each artifact takes the same
            angle back, and the two cancel to leave it upright.
          */
          .lib-turn-${id} {
            transform-origin: 0 0;
            animation: lib-turn-${id} var(--turn) linear infinite;
          }
          .lib-hold-${id} {
            transform-origin: 0 0;
            animation: lib-hold-${id} var(--turn) linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .lib-turn-${id}, .lib-hold-${id} { animation: none; }
          }
        `}</style>

        {/* The glow that stands in for a core, at each anchor and off screen. */}
        <radialGradient id={`lib-anchor-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.42" />
          <stop offset="40%" stopColor={p.pop} stopOpacity="0.14" />
          <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
        </radialGradient>

        {/*
          The wash reads outward now, not inward.

          It used to be clear in the middle and solid at the edges, which was
          right when the artwork was a centred bullseye and wrong the moment
          the artwork moved to the corners — it would have wiped off exactly
          what there is to see. Calm where the words are, clear where they
          are not.
        */}
        <radialGradient id={`lib-veil-${id}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={p.bg} stopOpacity="0.88" />
          <stop offset="52%" stopColor={p.bg} stopOpacity="0.58" />
          <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`lib-ring-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.06" />
          <stop offset="50%" stopColor={p.pop} stopOpacity="0.85" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0.06" />
        </linearGradient>
      </defs>

      <rect width="1400" height="520" fill={p.bg} />

      {/* The constellation grid: faint, and never the thing being looked at. */}
      <g opacity="0.1" stroke={p.secondary} strokeWidth="1">
        {Array.from({ length: 13 }, (_, column) => (
          <line key={`v${column}`} x1={column * 116} y1="0" x2={column * 116} y2="520" />
        ))}
        {Array.from({ length: 6 }, (_, row) => (
          <line key={`h${row}`} x1="0" y1={row * 104} x2="1400" y2={row * 104} />
        ))}
      </g>

      {systems.map((system, systemIndex) => (
        <g key={`system-${systemIndex}`} transform={`translate(${system.cx} ${system.cy})`}>
          <circle r="330" fill={`url(#lib-anchor-${id})`} />
          {system.rings.map((ring, ringIndex) => (
            <g key={`ring-${systemIndex}-${ringIndex}`}>
              <circle
                r={ring.r}
                fill="none"
                stroke={`url(#lib-ring-${id})`}
                strokeWidth={ringIndex === 0 ? 1.6 : 1.1}
                opacity={ring.opacity}
              />
              <g
                className={`lib-turn-${id}`}
                style={{ ['--turn' as keyof CSSProperties]: `${ring.duration}s` } as CSSProperties}
              >
                {ring.riders.map((rider, riderIndex) => {
                  const radians = (rider.angle * Math.PI) / 180;
                  const ink = inks[(systemIndex + ringIndex + riderIndex) % inks.length];
                  return (
                    <g
                      key={`rider-${systemIndex}-${ringIndex}-${riderIndex}`}
                      transform={`translate(${(Math.cos(radians) * ring.r).toFixed(2)} ${(
                        Math.sin(radians) * ring.r
                      ).toFixed(2)})`}
                    >
                      <g
                        className={`lib-hold-${id}`}
                        style={
                          { ['--turn' as keyof CSSProperties]: `${ring.duration}s` } as CSSProperties
                        }
                      >
                        <g opacity="0.9">
                          <ArtifactGlyph kind={rider.kind} size={rider.size} color={ink} />
                        </g>
                      </g>
                    </g>
                  );
                })}
              </g>
            </g>
          ))}
        </g>
      ))}

      {/* The wash that lets words sit on top of all this and still be read. */}
      <rect width="1400" height="520" fill={`url(#lib-veil-${id})`} />
    </svg>
  );
}

export default SvgLibraryHero;
