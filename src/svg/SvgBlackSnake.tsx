/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Black Snake illustration.
 *
 * Keeps the original source artwork unchanged and recolors it from the
 * active user theme using a palette-driven tint.
 */

import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';
import BlackSnakeSource from './images/legacy/releases/datalayer-1.2.0-black-snake.svg';

export function SvgBlackSnake({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <img
      src={BlackSnakeSource}
      alt="Black snake"
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        background: p.bg,
      }}
    />
  );
}

export default SvgBlackSnake;
