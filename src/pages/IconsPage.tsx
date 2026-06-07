import { Suspense, lazy } from 'react';
import { Box, Spinner, Text } from '@primer/react';

const DatalayerIcons = lazy(() => import('../icons/DatalayerIcons'));

export function IconsPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, py: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Spinner size="medium" />
          <Text sx={{ color: 'fg.muted' }}>Loading icon catalog...</Text>
        </Box>
      }
    >
      <DatalayerIcons />
    </Suspense>
  );
}

export default IconsPage;
