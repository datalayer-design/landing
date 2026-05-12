import { useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Heading, Text } from '@primer/react';
import * as SvgAssets from '@datalayer/ui/lib/assets/svg';
import SpitfireAssetUrl from '@datalayer/ui/lib/assets/images/legacy/releases/datalayer-1.3.0-spitfire.svg';

type SvgComponent = (props?: any) => JSX.Element;

type SvgEntry = {
  name: string;
  Component: SvgComponent;
  assetUrl?: string;
};

const PHARMACIE_BAYART_SVG_NAMES = new Set([
  'SvgPharmacieBayartLogo',
  'SvgPharmacieBayartHero',
]);

const SVG_ASSET_OVERRIDES: Record<string, string> = {
  SvgSpitfire: SpitfireAssetUrl,
};

const DATALAYER_SVGS: SvgEntry[] = Object.entries(SvgAssets)
  .filter(([name, value]) => /^Svg[A-Z]/.test(name) && typeof value === 'function' && !PHARMACIE_BAYART_SVG_NAMES.has(name))
  .map(([name, Component]) => ({
    name,
    Component: Component as SvgComponent,
    assetUrl: SVG_ASSET_OVERRIDES[name],
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

async function downloadSvgElement(svg: SVGSVGElement, fileName: string, format: 'svg' | 'png') {
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
          reject(new Error('Unable to export PNG'));
          return;
        }
        const outUrl = URL.createObjectURL(output);
        const link = document.createElement('a');
        link.href = outUrl;
        link.download = `${fileName}.png`;
        link.click();
        URL.revokeObjectURL(outUrl);
        resolve();
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Unable to render SVG image'));
    };
    img.src = url;
  });
}

function SvgCard({ name, Component, assetUrl }: SvgEntry) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, p: 3, bg: 'canvas.default' }}>
      <Text sx={{ fontWeight: 600, display: 'block', mb: 2 }}>{name}</Text>
      <Box ref={ref} sx={{ p: 2, border: '1px dashed', borderColor: 'border.default', borderRadius: 2, minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        {assetUrl ? (
          <img
            src={assetUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        ) : (
          <Component style={{ width: '100%', height: '100%' }} />
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button onClick={() => navigate(`/svg/${name}`)}>View</Button>
        <Button disabled={Boolean(assetUrl)} onClick={async () => {
          const svg = ref.current?.querySelector('svg');
          if (!svg) return;
          await downloadSvgElement(svg, name, 'png');
        }}>
          Download PNG
        </Button>
        <Button disabled={Boolean(assetUrl)} onClick={async () => {
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
      <Button onClick={() => navigate('/svg')}>Back</Button>
      <Heading as="h2" sx={{ mt: 3, mb: 3 }}>{entry.name}</Heading>
      <Box sx={{ p: 4, border: '1px solid', borderColor: 'border.default', borderRadius: 2, display: 'flex', justifyContent: 'center', minHeight: 280, overflow: 'hidden', position: 'relative', isolation: 'isolate' }}>
        {entry.assetUrl ? (
          <img
            src={entry.assetUrl}
            alt={entry.name}
            style={{ width: '100%', maxWidth: 900, height: 'auto', display: 'block' }}
          />
        ) : (
          <Component style={{ width: '100%', maxWidth: 900 }} />
        )}
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
          Gallery generated from UI lib artifacts imported from @datalayer/ui/lib/assets/svg.
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
