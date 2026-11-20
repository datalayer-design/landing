/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * The icon catalogue of datalayer.design: every icon of `@datalayer/icons-react`
 * (published on npm), searchable by name. It read `@datalayer/icons-all` until
 * 20 November 2026; that package is never published, and design is.
 */

import { Suspense, lazy, useMemo, useState, type ComponentType } from "react";
import { Spinner, Text, TextInput } from "@primer/react";
import { SearchIcon } from "@primer/octicons-react";
import { Box } from "@datalayer/primer-addons";

type IconComponent = ComponentType<{ size?: number | string }>;

const IconGrid = lazy(() =>
  import("@datalayer/icons-react").then((module) => {
    const icons = Object.entries(module as Record<string, unknown>)
      .filter(([name, value]) => name.endsWith("Icon") && typeof value === "function")
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

export function IconsPage() {
  const [query, setQuery] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3} p={4}>
      <TextInput
        leadingVisual={SearchIcon}
        placeholder="Search the icons"
        aria-label="Search the icons"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        sx={{ maxWidth: 420 }}
      />
      <Suspense
        fallback={
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={3} minHeight="60vh">
            <Spinner size="large" />
            <Text sx={{ color: "fg.muted", fontSize: 2 }}>Loading the icons...</Text>
          </Box>
        }
      >
        <IconGrid query={query} />
      </Suspense>
    </Box>
  );
}

export default IconsPage;
