/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import type { JSX } from 'react';
import { Text } from '@primer/react';
import { Box, useColorPalette } from '@datalayer/primer-addons';
import { ZapIcon } from '@primer/octicons-react';

export type SvgNotebookMockProps = {
  style?: React.CSSProperties;
  className?: string;
};

/**
 * Notebook-like hero mock used in landing pages. Despite the `Svg` prefix, it
 * is implemented as themed Primer blocks so it adapts to color modes.
 */
export function SvgNotebookMock({
  style,
  className,
}: SvgNotebookMockProps): JSX.Element {
  const p = useColorPalette();
  const barColors = [p.surge, p.flame, p.spark, p.primary, p.accent, p.glow];

  return (
    <Box
      style={style}
      className={className}
      sx={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'border.default',
        bg: 'canvas.default',
        boxShadow: 'shadow.xlarge',
        textAlign: 'left',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'border.muted',
          bg: 'canvas.subtle',
        }}
      >
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bg: 'danger.emphasis' }} />
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bg: 'attention.emphasis' }} />
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bg: 'success.emphasis' }} />
        <Text sx={{ ml: 2, fontSize: 0, color: 'fg.muted', fontWeight: 'bold' }}>
          analysis.ipynb
        </Text>
      </Box>
      <Box sx={{ p: 3, display: 'grid', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '8px',
              bg: 'accent.subtle',
              color: 'accent.fg',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ZapIcon size={16} />
          </Box>
          <Box sx={{ bg: 'accent.subtle', borderRadius: '10px', px: 3, py: 2 }}>
            <Text sx={{ fontSize: 1, color: 'fg.default' }}>
              Plot revenue by region from the Snowflake datasource.
            </Text>
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: '10px',
            border: '1px solid',
            borderColor: 'border.default',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 1,
              bg: 'canvas.subtle',
              borderBottom: '1px solid',
              borderColor: 'border.muted',
            }}
          >
            <Text sx={{ fontSize: 0, color: 'fg.muted', fontFamily: 'mono' }}>
              In [1]
            </Text>
          </Box>
          <Box
            sx={{
              p: 3,
              fontFamily: 'mono',
              fontSize: 0,
              lineHeight: 1.7,
              color: 'fg.default',
            }}
          >
            <Text sx={{ display: 'block', color: 'accent.fg' }}>df = ds.query(</Text>
            <Text sx={{ display: 'block', pl: 3 }}>
              "select region, sum(revenue) r ..."
            </Text>
            <Text sx={{ display: 'block', color: 'accent.fg' }}>)</Text>
            <Text sx={{ display: 'block' }}>df.plot.bar(x="region", y="r")</Text>
          </Box>
        </Box>
        <Box sx={{ borderRadius: '10px', bg: 'canvas.subtle', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 96 }}>
            {[42, 68, 55, 88, 73, 60].map((h, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: '6px 6px 0 0',
                  bg: barColors[i % barColors.length],
                  opacity: 0.85,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SvgNotebookMock;