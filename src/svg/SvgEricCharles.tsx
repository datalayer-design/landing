/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/**
 * Eric Charles picto illustration.
 *
 * Keeps the original source artwork unchanged and recolors it from the
 * active user theme using a palette-driven tint.
 */

import { useEffect, useState } from 'react';
import { type ColorPalette, useColorPalette } from '@datalayer/primer-addons';
import EricCharlesSource from './images/eric-charles.svg';

export function SvgEricCharles({ palette: paletteProp }: { palette?: ColorPalette } = {}) {
  const auto = useColorPalette();
  const p = paletteProp ?? auto;
  const tint = p.isLight ? p.primary : p.spark;
  const [svgMarkup, setSvgMarkup] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    const loadAndTint = async () => {
      let source: string;
      const raw = EricCharlesSource as unknown as string;
      const looksLikeMarkup =
        typeof raw === 'string' && /^\s*(<\?xml|<svg[\s>])/i.test(raw);
      if (looksLikeMarkup) {
        source = raw;
      } else {
        const response = await fetch(raw);
        source = await response.text();
      }
      if (cancelled) {
        return;
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(source, 'image/svg+xml');
      const svg = doc.querySelector('svg');

      if (!svg) {
        setSvgMarkup(source);
        return;
      }

      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.setAttribute('style', `width:100%;height:100%;display:block;background:${p.bg};color:${tint};`);

      const blackFills = new Set(['#000', '#000000', 'black', 'rgb(0,0,0)']);
      doc.querySelectorAll('[fill]').forEach((node) => {
        const fill = (node.getAttribute('fill') || '').replace(/\s+/g, '').toLowerCase();
        if (blackFills.has(fill)) {
          node.setAttribute('fill', tint);
        }
      });

      doc.querySelectorAll('[stroke]').forEach((node) => {
        const stroke = (node.getAttribute('stroke') || '').replace(/\s+/g, '').toLowerCase();
        if (blackFills.has(stroke)) {
          node.setAttribute('stroke', tint);
        }
      });

      const serialized = new XMLSerializer().serializeToString(svg);
      setSvgMarkup(serialized);
    };

    loadAndTint().catch(() => setSvgMarkup(''));

    return () => {
      cancelled = true;
    };
  }, [p.bg, tint]);

  return (
    <div
      aria-label="Eric Charles"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        overflow: 'hidden',
      }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}

export default SvgEricCharles;
