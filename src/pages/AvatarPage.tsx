/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

import { Box, Heading, Text } from '@primer/react';
import { SvgAvatarOrb, type AvatarOrbState } from '../avatar';

const SIZES = [24, 32, 56, 120];
const STATES: AvatarOrbState[] = ['idle', 'thinking'];

/** The Avatar category: each avatar, idle and thinking, at the sizes it is drawn at, in the current theme. */
export function AvatarPage() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Heading as="h1">Avatar</Heading>
        <Text sx={{ color: 'fg.muted' }}>
          An agent's avatar: a lit sphere in the theme's colours. It breathes while idle, and turns faster with a ring
          leaving it while thinking. Change the theme and the colour mode to see it follow.
        </Text>
        <Heading as="h2" sx={{ fontSize: 3 }}>
          Orb
        </Heading>
        {STATES.map(state => (
          <Box key={state} sx={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
            <Text sx={{ width: 80, fontFamily: 'mono', fontSize: 1 }}>{state}</Text>
            {SIZES.map(size => (
              <Box key={size} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <SvgAvatarOrb size={size} state={state} title={`Avatar, ${state}, ${size} pixels`} />
                <Text sx={{ fontSize: 0, color: 'fg.muted' }}>{size}px</Text>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default AvatarPage;
