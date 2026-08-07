import { Box, Heading, Link, Text } from '@primer/react';
import { Link as RouterLink } from 'react-router-dom';
import { useColorPalette } from '@datalayer/primer-addons';
import { SvgAgentsHomeHero } from '../svg';

export function HomePage() {
  const palette = useColorPalette();
  return (
    <Box sx={{ px: 4, py: 5 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4,
          bg: 'canvas.subtle',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.9 }}>
          <SvgAgentsHomeHero />
        </Box>
        <Box
          sx={{
            position: 'relative',
            p: [4, 5],
            minHeight: [380, 460, 520],
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Text
            sx={{
              color: 'fg.onEmphasis',
              fontSize: 1,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            Datalayer Design
          </Text>
          <Heading
            as="h1"
            sx={{
              fontSize: [5, 6, 7],
              lineHeight: 1.1,
              mb: 3,
              maxWidth: 880,
              color: 'fg.onEmphasis',
            }}
          >
            The visual system behind
            <br />
            Datalayer&rsquo;s AI &amp; data products
          </Heading>
          <Text as="p" sx={{ fontSize: 3, lineHeight: 1.55, maxWidth: 760, color: 'fg.onEmphasis', mb: 0 }}>
            One brand, one palette, one geometry &mdash; so every notebook,
            runtime, agent and document feels like part of the same platform.
          </Text>
        </Box>
      </Box>

      {/* What is Datalayer */}
      <Box sx={{ display: 'grid', gridTemplateColumns: ['1fr', '1fr', '2fr 1fr'], gap: 4, mb: 4 }}>
        <Box>
          <Heading as="h2" sx={{ fontSize: 4, mb: 2 }}>
            What Datalayer is building
          </Heading>
          <Text as="p" sx={{ fontSize: 2, lineHeight: 1.65, color: 'fg.default', mb: 3 }}>
            <Link href="https://datalayer.ai" target="_blank" rel="noopener noreferrer">Datalayer</Link>{' '}
            is the platform to build, run, and ship custom data products
            powered by AI. It unifies Jupyter notebooks, cloud-managed
            runtimes, real-time collaboration, agents, and data assets &mdash;
            so teams can move from a blank notebook to a production data
            product without leaving the workspace.
          </Text>
          <Text as="p" sx={{ fontSize: 2, lineHeight: 1.65, color: 'fg.default', mb: 0 }}>
            Notebooks, lexical documents, cells, datasets and publications
            are first-class artifacts. Agents and AI runtimes plug into
            them through open protocols (MCP, A2A, AG-UI) so developers
            can mix code, content, and intelligence inside a single,
            governed environment.
          </Text>
        </Box>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'border.default',
            borderRadius: 2,
            p: 3,
            bg: 'canvas.subtle',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Text sx={{ fontSize: 1, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'fg.muted' }}>
            Pillars
          </Text>
          <Text sx={{ fontSize: 2, color: 'fg.default' }}>&middot; Notebooks &amp; Documents</Text>
          <Text sx={{ fontSize: 2, color: 'fg.default' }}>&middot; Runtimes &amp; Visualizations</Text>
          <Text sx={{ fontSize: 2, color: 'fg.default' }}>&middot; Agents &amp; AI workflows</Text>
          <Text sx={{ fontSize: 2, color: 'fg.default' }}>&middot; Datasets &amp; Publications</Text>
          <Text sx={{ fontSize: 2, color: 'fg.default' }}>&middot; Spaces, teams &amp; sharing</Text>
        </Box>
      </Box>

      {/* Why this design site exists */}
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'border.default',
          borderRadius: 2,
          p: [3, 4],
          mb: 4,
        }}
      >
        <Heading as="h2" sx={{ fontSize: 4, mb: 2 }}>
          A coherent surface for custom data products
        </Heading>
        <Text as="p" sx={{ fontSize: 2, lineHeight: 1.65, color: 'fg.default', mb: 3, maxWidth: 920 }}>
          This design site is the single source of truth for how Datalayer
          looks and feels. Every illustration, icon, logo variant, and
          themed surface here is the same asset that ships inside the
          product, the marketing site, and partner integrations. That
          consistency is what lets customers assemble custom data products
          from many moving parts &mdash; runtimes, agents, notebooks,
          dashboards &mdash; and still feel like they are using one
          platform.
        </Text>
        <Box sx={{ display: 'grid', gridTemplateColumns: ['1fr', '1fr 1fr', 'repeat(3, 1fr)'], gap: 3 }}>
          <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, p: 3 }}>
            <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>One palette, many themes</Heading>
            <Text sx={{ color: 'fg.muted', lineHeight: 1.55 }}>
              Every illustration pulls colors from the shared theme palette,
              so a single switch re-skins the whole experience across light
              and dark color modes.
            </Text>
          </Box>
          <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, p: 3 }}>
            <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Composable artifacts</Heading>
            <Text sx={{ color: 'fg.muted', lineHeight: 1.55 }}>
              Logos, hero scenes, feature illustrations, and product
              artifacts are exported as reusable React SVGs &mdash; usable in
              landing pages, in-app empty states, and docs.
            </Text>
          </Box>
          <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, p: 3 }}>
            <Heading as="h3" sx={{ fontSize: 2, mb: 2 }}>Shared design tokens</Heading>
            <Text sx={{ color: 'fg.muted', lineHeight: 1.55 }}>
              Color, type, and motion tokens are defined once in
              @datalayer/primer-addons and consumed everywhere &mdash;
              including the SDKs partners use to embed Datalayer.
            </Text>
          </Box>
        </Box>
        <Box sx={{ mt: 3, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Link as={RouterLink} to="/svg">Browse the SVG gallery &rarr;</Link>
          <Link as={RouterLink} to="/icons">Browse icons &rarr;</Link>
          <Link href="https://datalayer.ai" target="_blank" rel="noopener noreferrer">Visit datalayer.ai &rarr;</Link>
        </Box>
      </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
