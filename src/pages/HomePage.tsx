/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * The front page of the design site.
 *
 * It has one job the rest of the site does not: to say what this collection is
 * for before anyone opens a gallery. So the page is an argument in three
 * moves — what Datalayer builds, why one visual system matters for it, and
 * where to go next — and each move gets a band of its own.
 *
 * The furniture is local on purpose. This package is upstream of the
 * applications, so it cannot borrow their landing components; what it shares
 * with them is the language — a monospace label over a short rule, headings
 * set large and tight, hairlines instead of boxes, and one card treatment.
 *
 * @module pages/HomePage
 */

import { Box, Heading, Link, Text } from "@primer/react";
import { Link as RouterLink } from "react-router-dom";
import { useColorPalette } from "@datalayer/primer-addons";
import { SvgAgentsHomeHero } from "../svg";

/** The measure everything on the page is set against. */
const CONTENT_WIDTH = 1200;

/**
 * The face the small labels are set in. No webfont: the contrast comes from
 * pairing the interface face set large against this one set small and wide.
 */
const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** The small label that names a band, preceded by a rule so it is not a stray line. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
      <Box sx={{ width: 24, height: "1px", bg: "accent.fg", opacity: 0.5 }} />
      <Text
        sx={{
          fontFamily: MONO,
          fontSize: "11px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "accent.fg",
        }}
      >
        {children}
      </Text>
    </Box>
  );
}

/** A band of the page: the measure, the rhythm, and an optional dividing rule. */
function Band({
  children,
  divided,
}: {
  children: React.ReactNode;
  divided?: boolean;
}) {
  return (
    <Box
      sx={{
        maxWidth: CONTENT_WIDTH,
        mx: "auto",
        py: [5, 6],
        ...(divided && {
          borderTop: "1px solid",
          borderColor: "border.subtle",
        }),
      }}
    >
      {children}
    </Box>
  );
}

/**
 * The one card treatment on the page.
 *
 * Cards used to sit inside a bordered panel, which drew a border around a
 * border. The panel is gone; these carry the only frame.
 */
function Card({
  children,
  ...props
}: { children: React.ReactNode } & Record<string, any>) {
  return (
    <Box
      {...props}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        p: 4,
        borderRadius: "12px",
        border: "1px solid",
        borderColor: "border.default",
        bg: "canvas.default",
        transition: `border-color 240ms ${EASE}, transform 240ms ${EASE}, box-shadow 240ms ${EASE}`,
        ":hover": {
          borderColor: "accent.emphasis",
          transform: "translateY(-3px)",
          boxShadow:
            "0 1px 2px rgba(0, 0, 0, 0.04), 0 16px 36px -20px rgba(0, 0, 0, 0.28)",
        },
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
}

/** What the platform is made of, as a list rather than a paragraph of commas. */
const PILLARS = [
  "Notebooks & Documents",
  "Runtimes & Visualizations",
  "Agents & AI workflows",
  "Datasets & Publications",
  "Spaces, teams & sharing",
];

/** What this collection guarantees, one claim each. */
const PRINCIPLES = [
  {
    title: "One palette, many themes",
    body: "Every illustration takes its colours from the shared theme palette, so one switch re-skins the whole experience across light and dark.",
  },
  {
    title: "Composable artifacts",
    body: "Logos, hero scenes and product illustrations ship as reusable React SVGs — the same file in a landing page, an empty state, or the docs.",
  },
  {
    title: "Shared design tokens",
    body: "Colour, type and motion are defined once in @datalayer/primer-addons and consumed everywhere, including the SDKs partners embed.",
  },
];

/** Where to go from here. */
const NEXT = [
  { label: "SVG gallery", desc: "Every illustration, themed live", to: "/svg" },
  { label: "Icons", desc: "The full icon set, searchable", to: "/icons" },
  {
    label: "datalayer.ai",
    desc: "The platform these assets ship in",
    href: "https://datalayer.ai",
  },
];

export function HomePage() {
  const palette = useColorPalette();

  return (
    <Box sx={{ px: [3, 4], py: [4, 5] }}>
      {/* HERO */}
      <Box sx={{ maxWidth: CONTENT_WIDTH, mx: "auto" }}>
        <Box
          sx={{
            position: "relative",
            border: "1px solid",
            borderColor: "border.default",
            borderRadius: "16px",
            overflow: "hidden",
            bg: "canvas.subtle",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0, opacity: 0.9 }}>
            <SvgAgentsHomeHero />
          </Box>
          {/* The artwork is busiest exactly where the copy sits, so it is
              pulled back to a wash under the words and left alone above them. */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, ${palette.bg} 6%, ${palette.bg}D9 34%, ${palette.bg}00 78%)`,
            }}
          />
          <Box
            sx={{
              position: "relative",
              p: [4, 5],
              minHeight: [380, 460, 520],
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Text
              sx={{
                fontFamily: MONO,
                fontSize: "11px",
                fontWeight: "bold",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: palette.isLight ? palette.secondary : palette.primary,
                mb: 3,
              }}
            >
              Datalayer Design
            </Text>
            <Heading
              as="h1"
              sx={{
                fontSize: [5, 6, 7],
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                mb: 3,
                maxWidth: 880,
                color: palette.textLight,
              }}
            >
              The visual system behind
              <br />
              Datalayer&rsquo;s AI &amp; data products
            </Heading>
            <Text
              as="p"
              sx={{
                fontSize: 3,
                lineHeight: 1.55,
                maxWidth: 720,
                color: palette.textLight,
                opacity: 0.82,
                mb: 0,
              }}
            >
              One brand, one palette, one geometry — so every notebook, runtime,
              agent and document feels like part of the same platform.
            </Text>
          </Box>
        </Box>
      </Box>

      {/* WHAT DATALAYER BUILDS */}
      <Band>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ["1fr", "1fr", "1.6fr 1fr"],
            gap: [4, 5, 6],
            alignItems: "start",
          }}
        >
          <Box>
            <Eyebrow>The platform</Eyebrow>
            <Heading
              as="h2"
              sx={{
                fontSize: [4, 5],
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                mb: 3,
              }}
            >
              What Datalayer is building
            </Heading>
            <Text
              as="p"
              sx={{ fontSize: 2, lineHeight: 1.7, mt: 0, mb: 3, maxWidth: 620 }}
            >
              <Link
                href="https://datalayer.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datalayer
              </Link>{" "}
              is the platform for building, running and shipping custom data
              products powered by AI — Jupyter notebooks, managed runtimes,
              real-time collaboration, agents and data assets in one place, so a
              team gets from a blank notebook to something in production without
              leaving the workspace.
            </Text>
            <Text
              as="p"
              sx={{
                fontSize: 2,
                lineHeight: 1.7,
                color: "fg.muted",
                mt: 0,
                mb: 0,
                maxWidth: 620,
              }}
            >
              Notebooks, documents, cells, datasets and publications are
              first-class artifacts. Agents reach them through open protocols —
              MCP, A2A, AG-UI — so code, content and intelligence sit in one
              governed environment.
            </Text>
          </Box>

          {/* The pillars, as a list with rules rather than a box of bullets. */}
          <Box>
            <Text
              sx={{
                display: "block",
                fontFamily: MONO,
                fontSize: "11px",
                fontWeight: "bold",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "fg.muted",
                mb: 2,
              }}
            >
              Pillars
            </Text>
            <Box as="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {PILLARS.map((pillar) => (
                <Box
                  as="li"
                  key={pillar}
                  sx={{
                    py: 3,
                    borderTop: "1px solid",
                    borderColor: "border.subtle",
                    fontSize: 2,
                  }}
                >
                  {pillar}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Band>

      {/* WHY ONE SYSTEM */}
      <Band divided>
        <Box sx={{ maxWidth: 780, mb: [4, 5] }}>
          <Eyebrow>Why this site exists</Eyebrow>
          <Heading
            as="h2"
            sx={{
              fontSize: [4, 5],
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              mb: 3,
            }}
          >
            One system, every surface
          </Heading>
          <Text as="p" sx={{ fontSize: 2, lineHeight: 1.7, mt: 0, mb: 0 }}>
            Every illustration, icon, logo and themed surface here is the same
            asset that ships inside the product, the marketing site and partner
            integrations. That is what lets a customer assemble a data product
            out of many moving parts and still feel they are using one platform.
          </Text>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: [
              "1fr",
              "1fr 1fr",
              "repeat(3, minmax(0, 1fr))",
            ],
            gap: [3, 4],
          }}
        >
          {PRINCIPLES.map((principle) => (
            <Card key={principle.title}>
              <Heading as="h3" sx={{ fontSize: 3, mb: 2 }}>
                {principle.title}
              </Heading>
              <Text sx={{ color: "fg.muted", lineHeight: 1.65, fontSize: 1 }}>
                {principle.body}
              </Text>
            </Card>
          ))}
        </Box>
      </Band>

      {/* WHERE NEXT */}
      <Band divided>
        <Eyebrow>Start here</Eyebrow>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ["1fr", "1fr", "repeat(3, minmax(0, 1fr))"],
            gap: [3, 4],
          }}
        >
          {NEXT.map((item) => {
            const linkProps = item.to
              ? { as: RouterLink, to: item.to }
              : {
                  as: "a",
                  href: item.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                };
            return (
              <Card
                key={item.label}
                {...linkProps}
                sx={{
                  textDecoration: "none",
                  color: "fg.default",
                  ":hover .dla-go": { transform: "translateX(4px)" },
                }}
              >
                <Heading as="h3" sx={{ fontSize: 3, mb: 1 }}>
                  {item.label}
                </Heading>
                <Text sx={{ color: "fg.muted", fontSize: 1, mb: 3 }}>
                  {item.desc}
                </Text>
                <Text
                  className="dla-go"
                  sx={{
                    mt: "auto",
                    color: "accent.fg",
                    fontWeight: "bold",
                    fontSize: 1,
                    display: "inline-block",
                    transition: `transform 240ms ${EASE}`,
                  }}
                >
                  Open &rarr;
                </Text>
              </Card>
            );
          })}
        </Box>
      </Band>
    </Box>
  );
}

export default HomePage;
