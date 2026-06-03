import { useEffect, useMemo, useRef, useState, type SVGProps } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Heading, Text } from '@primer/react';
import { useColorPalette } from '@datalayer/primer-addons';
import { DATALAYER_SVG_GALLERY } from '../svg/gallery';
import * as SvgAssets from '../svg';
import SpitfireAssetUrl from '../svg/images/legacy/releases/datalayer-1.3.0-spitfire.svg';

type SvgComponent = (props?: any) => JSX.Element;

type SvgEntry = {
  name: string;
  Component: SvgComponent;
};

const BaseSvgLinesLogo = SvgAssets.SvgLinesLogo as SvgComponent;

function SvgSpitfireInline() {
  const p = useColorPalette();
  const tint = p.isLight ? p.primary : p.spark;
  const [svgMarkup, setSvgMarkup] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    const loadAndTint = async () => {
      const response = await fetch(SpitfireAssetUrl);
      const source = await response.text();
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
      svg.setAttribute('style', `width:100%;height:100%;display:block;background:${p.bg};`);

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
    <Box
      aria-label="Spitfire aircraft"
      sx={{
        width: '100%',
        height: '100%',
        display: 'block',
        overflow: 'hidden',
      }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}

function SvgLinesLogo(props?: SVGProps<SVGSVGElement>) {
  const p = useColorPalette();
  const hostStyle = (props as { style?: Record<string, string | number> } | undefined)?.style;

  return (
    <Box
      aria-label="Lines logo"
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 120,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      style={hostStyle}
    >
      <BaseSvgLinesLogo
        height={42}
        colored
        primaryColor={p.primary}
        secondaryColor={p.secondary}
        textColor={p.secondary}
      />
    </Box>
  );
}

const SVG_COMPONENT_OVERRIDES: Record<string, SvgComponent> = {
  SvgSpitfire: SvgSpitfireInline,
  SvgLinesLogo,
};

const DATALAYER_SVGS: SvgEntry[] = [
  ...DATALAYER_SVG_GALLERY
    .map((name): SvgEntry | null => {
      const component = (SvgAssets as Record<string, unknown>)[name];
      if (typeof component !== 'function' && !SVG_COMPONENT_OVERRIDES[name]) {
        return null;
      }
      return {
        name,
        Component: SVG_COMPONENT_OVERRIDES[name] || (component as SvgComponent),
      };
    })
    .filter((entry): entry is SvgEntry => entry !== null),
];

async function downloadSvgElement(svg: SVGSVGElement, fileName: string, format: 'svg' | 'png' | 'jpg') {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  const rect = svg.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));

  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));
  const serializer = new XMLSerializer();
  const markup = serializer.serializeToString(clone);

  if (format === 'svg') {
    const blob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    return;
  }

  const blob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const extension = format === 'jpg' ? 'jpg' : 'png';
  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Unable to create canvas context'));
        return;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((output) => {
        URL.revokeObjectURL(url);
        if (!output) {
          reject(new Error(`Unable to export ${format.toUpperCase()}`));
          return;
        }
        const outUrl = URL.createObjectURL(output);
        const link = document.createElement('a');
        link.href = outUrl;
        link.download = `${fileName}.${extension}`;
        link.click();
        URL.revokeObjectURL(outUrl);
        resolve();
      }, mimeType, 0.95);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Unable to render SVG image'));
    };
    img.src = url;
  });
}

function SvgCard({ name, Component }: SvgEntry) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);
  const openDetail = () => navigate(`/svg/${name}`);

  return (
    <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, p: 3, bg: 'canvas.default' }}>
      <Text sx={{ fontWeight: 600, display: 'block', mb: 2 }}>{name}</Text>
      <Box
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={`Open ${name}`}
        onClick={openDetail}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openDetail();
          }
        }}
        sx={{
          p: 2,
          border: '1px dashed',
          borderColor: 'border.default',
          borderRadius: 2,
          minHeight: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          overflow: 'hidden',
          position: 'relative',
          isolation: 'isolate',
          cursor: 'pointer',
          ':hover': {
            borderColor: 'accent.fg',
            bg: 'canvas.subtle',
          },
          ':focus-visible': {
            outline: '2px solid',
            outlineColor: 'accent.fg',
            outlineOffset: '2px',
          },
        }}
      >
        <Component style={{ width: '100%', height: '100%' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button onClick={openDetail}>View</Button>
        <Button onClick={async () => {
          const svg = ref.current?.querySelector('svg');
          if (!svg) return;
          await downloadSvgElement(svg, name, 'png');
        }}>
          Download PNG
        </Button>
        <Button onClick={async () => {
          const svg = ref.current?.querySelector('svg');
          if (!svg) return;
          await downloadSvgElement(svg, name, 'jpg');
        }}>
          Download JPG
        </Button>
        <Button onClick={async () => {
          const svg = ref.current?.querySelector('svg');
          if (!svg) return;
          await downloadSvgElement(svg, name, 'svg');
        }}>
          Download SVG
        </Button>
      </Box>
    </Box>
  );
}

function SvgDetailPage() {
  const navigate = useNavigate();
  const { name } = useParams<{ name?: string }>();
  const entry = useMemo(() => DATALAYER_SVGS.find((item) => item.name === name), [name]);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!entry) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, py: 5 }}>
        <Text>SVG not found.</Text>
      </Box>
    );
  }

  const Component = entry.Component;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, py: 5 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button onClick={() => navigate('/svg')}>Back</Button>
        <Button onClick={async () => {
          const svg = ref.current?.querySelector('svg');
          if (!svg) return;
          await downloadSvgElement(svg, entry.name, 'png');
        }}>
          Download PNG
        </Button>
        <Button onClick={async () => {
          const svg = ref.current?.querySelector('svg');
          if (!svg) return;
          await downloadSvgElement(svg, entry.name, 'jpg');
        }}>
          Download JPG
        </Button>
        <Button onClick={async () => {
          const svg = ref.current?.querySelector('svg');
          if (!svg) return;
          await downloadSvgElement(svg, entry.name, 'svg');
        }}>
          Download SVG
        </Button>
      </Box>
      <Heading as="h2" sx={{ mt: 3, mb: 3 }}>{entry.name}</Heading>
      <Box
        ref={ref}
        sx={{ p: 4, border: '1px solid', borderColor: 'border.default', borderRadius: 2, display: 'flex', justifyContent: 'center', minHeight: 280, overflow: 'hidden', position: 'relative', isolation: 'isolate' }}
      >
        <Component style={{ width: '100%', maxWidth: 900 }} />
      </Box>
    </Box>
  );
}

export function SvgPage() {
  const { name } = useParams<{ name?: string }>();

  if (name) {
    return <SvgDetailPage />;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 4, py: 5 }}>
      <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, bg: 'canvas.subtle', p: [3, 4], mb: 4 }}>
        <Heading as="h2" sx={{ fontSize: 4, mb: 2 }}>SVG Gallery</Heading>
        <Text sx={{ color: 'fg.muted' }}>
          Gallery generated from local design SVG exports.
        </Text>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'], gap: 3 }}>
        {DATALAYER_SVGS.map((entry) => (
          <SvgCard key={entry.name} {...entry} />
        ))}
      </Box>
    </Box>
  );
}

export default SvgPage;
