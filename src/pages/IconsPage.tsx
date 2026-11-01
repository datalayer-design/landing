import { Suspense, lazy } from "react";
import { Spinner, Text } from "@primer/react";
import { Box } from "@datalayer/primer-addons";

const DatalayerIcons = lazy(() =>
  import("@datalayer/icons-all").then((module) => ({
    default: module.DatalayerIcons,
  })),
);

export function IconsPage() {
  return (
    <Suspense
      fallback={
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={3} minHeight="70vh">
          <Spinner size="large" />
          <Text sx={{ color: "fg.muted", fontSize: 2 }}>Loading icon catalog...</Text>
        </Box>
      }
    >
      <DatalayerIcons />
    </Suspense>
  );
}

export default IconsPage;
