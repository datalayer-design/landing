import { Suspense, lazy } from "react";
import { Box, Spinner, Text } from "@primer/react";

const DatalayerIcons = lazy(() =>
  import("@datalayer/icons-all").then((module) => ({
    default: module.DatalayerIcons,
  })),
);

export function IconsPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ px: 4, py: 6 }}>
          <Box
            sx={{
              maxWidth: 1200,
              mx: "auto",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Spinner size="medium" />
            <Text sx={{ color: "fg.muted" }}>Loading icon catalog...</Text>
          </Box>
        </Box>
      }
    >
      <DatalayerIcons />
    </Suspense>
  );
}

export default IconsPage;
