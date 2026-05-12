import { Box, Heading, Text } from '@primer/react';

export function HomePage() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, py: 5 }}>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
          p: [3, 4],
          bg: 'canvas.subtle',
          mb: 4,
        }}
      >
        <Text sx={{ color: 'accent.fg', fontSize: 1, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Brand Manual Summary
        </Text>
        <Heading as="h2" sx={{ fontSize: [4, 6], mb: 3, mt: 2, lineHeight: 1.2, maxWidth: 920 }}>
          Layered by design, clear by default: Datalayer identity for AI and data products.
        </Heading>
        <Text as="p" sx={{ color: 'fg.default', fontSize: 2, lineHeight: 1.65, mb: 0, maxWidth: 900 }}>
          The Datalayer visual system blends structured geometry with technical typography to communicate trust,
          precision, and scale. Use neutral blacks and grays for layout and readability, then apply green accents
          intentionally for action, progress, and brand recognition.
        </Text>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'], gap: 3 }}>
        <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, p: 3 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Logo Usage</Heading>
          <Text sx={{ color: 'fg.muted', lineHeight: 1.55 }}>
            Keep proportion and spacing consistent. Avoid distortion, over-decoration, and low-contrast placement.
            The mark and wordmark should remain recognizable across product and marketing contexts.
          </Text>
        </Box>

        <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, p: 3 }}>
          <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Color Intent</Heading>
          <Text sx={{ color: 'fg.muted', lineHeight: 1.55 }}>
            Base UI should stay calm and legible. Green is the signal color for momentum and positive state.
            Prefer consistent token use instead of hardcoded color values.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
