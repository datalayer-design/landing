/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The icon catalogue of datalayer.design, in two views, chosen at the top of
 * the page and kept in the address (`?view=viewer`) so a link opens either:
 *
 * - Grid, the default: every icon of `@datalayer/icons-react` (published on
 *   npm), searchable by name.
 * - Viewer: the viewer of the icons repository, which `@datalayer/icons-react`
 *   ships as its subpath `@datalayer/icons-react/viewer` (in no barrel), the
 *   four treatments of each icon with their downloads. Imported when chosen,
 *   so the grid never loads its chunk.
 *
 * It read `@datalayer/icons-all` until 20 November 2026; that package is
 * never published, and design is.
 */

import { Suspense, lazy, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { SegmentedControl, Spinner, Text, TextInput } from "@primer/react";
import { SearchIcon } from "@primer/octicons-react";
import { Box } from "@datalayer/primer-addons";

type IconComponent = ComponentType<{ size?: number | string }>;

/** A React component: a function, or a `forwardRef` / `memo` object. */
const isComponent = (value: unknown): boolean =>
  typeof value === "function" ||
  (typeof value === "object" && value !== null && "$$typeof" in value);

const IconGrid = lazy(() =>
  import("@datalayer/icons-react").then((module) => {
    const icons = Object.entries(module as Record<string, unknown>)
      // Each icon is a `forwardRef` component, an object (a `$$typeof` element
      // type), not a function: a check for functions alone listed none.
      .filter(([name, value]) => name.endsWith("Icon") && isComponent(value))
      .map(([name, value]) => [name, value as IconComponent] as const)
      .sort(([a], [b]) => a.localeCompare(b));
    function Grid({ query }: { query: string }) {
      const shown = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q ? icons.filter(([name]) => name.toLowerCase().includes(q)) : icons;
      }, [query]);
      return (
        <>
          <Text as="p" sx={{ color: "fg.muted", fontSize: 1, m: 0 }}>
            {shown.length} of {icons.length} icons
          </Text>
          <Box
            as="ul"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(136px, 1fr))"
            gap={2}
            p={0}
            m={0}
            style={{ listStyle: "none" }}
          >
            {shown.map(([name, Icon]) => (
              <Box
                as="li"
                key={name}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                p={3}
                borderRadius={2}
                border="1px solid"
                borderColor="border.default"
                bg="canvas.default"
                title={name}
              >
                <Icon size={32} />
                <Text
                  sx={{
                    fontSize: 0,
                    fontFamily: "mono",
                    color: "fg.muted",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </Text>
              </Box>
            ))}
          </Box>
        </>
      );
    }
    return { default: Grid };
  }),
);

/** The icons viewer of `@datalayer/icons-react`, loaded when chosen. */
const IconsViewer = lazy(() => import("@datalayer/icons-react/viewer"));

const VIEWS = ["grid", "viewer"] as const;
type IconsView = (typeof VIEWS)[number];
const VIEW_LABELS: Record<IconsView, string> = { grid: "Grid", viewer: "Viewer" };

function Loading({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={3} minHeight="60vh">
      <Spinner size="large" />
      <Text sx={{ color: "fg.muted", fontSize: 2 }}>{children}</Text>
    </Box>
  );
}

function IconsGrid() {
  const [query, setQuery] = useState("");
  return (
    <>
      <TextInput
        leadingVisual={SearchIcon}
        placeholder="Search the icons"
        aria-label="Search the icons"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        sx={{ maxWidth: 420 }}
      />
      <Suspense fallback={<Loading>Loading the icons...</Loading>}>
        <IconGrid query={query} />
      </Suspense>
    </>
  );
}

export function IconsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view: IconsView = searchParams.get("view") === "viewer" ? "viewer" : "grid";
  const choose = (index: number) => {
    const next = VIEWS[index];
    setSearchParams(
      (current) => {
        const params = new URLSearchParams(current);
        if (next === "viewer") params.set("view", "viewer");
        else params.delete("view");
        // The viewer keeps its search in `q`; the grid has its own.
        params.delete("q");
        return params;
      },
      { replace: true },
    );
  };
  return (
    <Box display="flex" flexDirection="column" gap={3} p={4}>
      <Box alignSelf="flex-start">
        <SegmentedControl aria-label="How to show the icons" onChange={choose}>
          {VIEWS.map((option) => (
            <SegmentedControl.Button key={option} selected={view === option}>
              {VIEW_LABELS[option]}
            </SegmentedControl.Button>
          ))}
        </SegmentedControl>
      </Box>
      {view === "viewer" ? (
        <Box mx={-4} mt={-3}>
          <Suspense fallback={<Loading>Loading the viewer...</Loading>}>
            <IconsViewer />
          </Suspense>
        </Box>
      ) : (
        <IconsGrid />
      )}
    </Box>
  );
}

export default IconsPage;
