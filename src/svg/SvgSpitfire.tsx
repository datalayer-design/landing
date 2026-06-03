/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Spitfire release illustration.
 *
 * Keeps the original source artwork unchanged and only recolors it based on
 * the active user theme.
 */

import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';
import SpitfireSource from './images/legacy/releases/datalayer-1.3.0-spitfire.svg';

export function SvgSpitfire({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;

  return (
    <img
      src={SpitfireSource}
      alt="Spitfire aircraft"
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        background: p.bg,
      }}
    />
  );
}

export default SvgSpitfire;
