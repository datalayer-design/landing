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
 * Both are drawn 1200px wide at most and share their search, kept in the
 * address (`?q=`), so switching view keeps it (the user, 27 November 2026).
 *
 * It read `@datalayer/icons-all` until 20 November 2026; that package is
 * never published, and design is.
 */

import { Suspense, lazy, useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { SegmentedControl, Spinner, Text, TextInput } from "@primer/react";
import { SearchIcon } from "@primer/octicons-react";
import { Box } from "@datalayer/primer-addons";
import type { SelectedIcon } from "@datalayer/icons-react/viewer";

type IconComponent = ComponentType<{ size?: number | string }>;

/**
 * The viewer's own details dialog (`@datalayer/icons-react/viewer`), opened
 * from a grid tile: the same dialog as a click in the viewer (the user, 28
 * November 2026). Loaded on the first click.
 */
const IconDetailsDialog = lazy(() =>
  import("@datalayer/icons-react/viewer").then((viewer) => ({ default: viewer.IconDetailsDialog })),
);

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
      const [selected, setSelected] = useState<SelectedIcon | null>(null);
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
              <Box as="li" key={name} display="flex">
              <Box
                as="button"
                type="button"
                onClick={() => setSelected({ name, icon: Icon as SelectedIcon["icon"] })}
                aria-label={`${name}: its treatments, code and downloads`}
                data-icon-tile={name}
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                p={3}
                borderRadius={2}
                border="1px solid"
                borderColor="border.default"
                bg="canvas.default"
                color="fg.default"
                title={name}
                sx={{ cursor: "pointer", font: "inherit", minWidth: 0, "&:hover": { borderColor: "accent.emphasis" } }}
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
              </Box>
            ))}
          </Box>
          {selected ? (
            <Suspense fallback={null}>
              <IconDetailsDialog selected={selected} onClose={() => setSelected(null)} />
            </Suspense>
          ) : null}
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

/** The widest the icons are drawn, the grid as the viewer (`@datalayer/icons-react/viewer`). */
const ICONS_MAX_WIDTH = 1200;

/** The grid, its search kept in the address's `q`, as the viewer's is: switching view keeps it. */
function IconsGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  useEffect(() => {
    setSearchParams(
      (current) => {
        const params = new URLSearchParams(current);
        if (query.trim()) params.set("q", query.trim());
        else params.delete("q");
        return params;
      },
      { replace: true },
    );
  }, [query, setSearchParams]);
  return (
    <Box display="flex" flexDirection="column" gap={3} width="100%" maxWidth={ICONS_MAX_WIDTH} mx="auto">
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
    </Box>
  );
}

export function IconsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view: IconsView = searchParams.get("view") === "viewer" ? "viewer" : "grid";
  const choose = (index: number) => {
    const next = VIEWS[index];
    // Primer calls onChange for the selected segment too: choosing the view
    // already shown keeps the address, and the viewer's search (`q`) with it.
    if (next === view) {
      return;
    }
    // From the address as shown: the viewer writes its search (`q`) there
    // itself, unseen by the router. Both views read `q`, so the search stays.
    const params = new URLSearchParams(window.location.search);
    if (next === "viewer") params.set("view", "viewer");
    else params.delete("view");
    setSearchParams(params, { replace: true });
  };
  return (
    <Box display="flex" flexDirection="column" gap={3} p={4}>
      <Box alignSelf="center" width="100%" maxWidth={ICONS_MAX_WIDTH}>
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
