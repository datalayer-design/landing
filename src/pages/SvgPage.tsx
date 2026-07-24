import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type RefObject, type SVGProps } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionList, ActionMenu, Box, Button, Heading, Text, TextInput } from '@primer/react';
import { ArrowLeftIcon } from '@primer/octicons-react';
import GIF from 'gif.js';
import gifWorkerUrl from 'gif.js/dist/gif.worker.js?url';
import {
  AI,
  AI2,
  DI,
  DatalayerLogo,
  DatalayerLogoText,
  DatalayerTextAI,
  getLogoColors,
  useColorPalette,
  useThemeStore,
} from '@datalayer/primer-addons';
import { DATALAYER_SVG_GALLERY } from '../svg/gallery';
import * as SvgAssets from '../svg';
import SpitfireAssetUrl from '../svg/images/datalayer-1.3.0-spitfire.svg';
import BlackSnakeAssetUrl from '../svg/images/datalayer-1.2.0-black-snake.svg';

type SvgComponent = (props?: any) => JSX.Element;

type SvgEntry = {
  name: string;
  Component: SvgComponent;
};

type SvgSegment = 'All' | 'Heros' | 'Features' | 'Systems' | 'Artifacts' | 'Pixels' | 'Pictos' | 'Communication' | 'Cases' | 'Releases' | 'Logos';

const SEGMENTS: SvgSegment[] = ['All', 'Artifacts', 'Cases', 'Communication', 'Features', 'Heros', 'Logos', 'Pictos', 'Pixels', 'Releases', 'Systems'];
const SEGMENT_BY_SLUG: Record<string, SvgSegment> = SEGMENTS.reduce(
  (acc, segment) => {
    acc[segment.toLowerCase()] = segment;
    return acc;
  },
  {} as Record<string, SvgSegment>,
);
SEGMENT_BY_SLUG.logo = 'Logos';
SEGMENT_BY_SLUG.hero = 'Heros';
SEGMENT_BY_SLUG.system = 'Systems';
const slugForSegment = (segment: SvgSegment) => segment.toLowerCase();

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

function SvgBlackSnakeInline() {
  const p = useColorPalette();
  const tint = p.isLight ? p.primary : p.spark;
  const [svgMarkup, setSvgMarkup] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    const loadAndTint = async () => {
      const response = await fetch(BlackSnakeAssetUrl);
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
    <Box
      aria-label="Black snake"
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
  const { colorMode, theme } = useThemeStore();
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const logoColors = getLogoColors(theme, effectiveColorMode);
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
        primaryColor={logoColors.primary}
        secondaryColor={logoColors.secondary}
        textColor={logoColors.textColor}
      />
    </Box>
  );
}

function SvgLinesColored(props?: SVGProps<SVGSVGElement>) {
  const hostStyle = (props as { style?: Record<string, string | number> } | undefined)?.style;

  return (
    <Box
      aria-label="Colored lines"
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
      <SvgAssets.SvgLines colored width="100%" height={44} />
    </Box>
  );
}

function SvgDatalayerLogo(props?: SVGProps<SVGSVGElement>) {
  const { colorMode, theme } = useThemeStore();
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const logoColors = getLogoColors(theme, effectiveColorMode);
  const hostStyle = (props as { style?: Record<string, string | number> } | undefined)?.style;

  return (
    <Box
      aria-label="Datalayer logo"
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
      <DatalayerLogo
        size={64}
        variant={theme}
        colorMode={effectiveColorMode}
        primaryColor={logoColors.primary}
        secondaryColor={logoColors.secondary}
        primaryGradient={logoColors.primaryGradient}
        secondaryGradient={logoColors.secondaryGradient}
      />
    </Box>
  );
}

function SvgDatalayerTextLogo(props?: SVGProps<SVGSVGElement>) {
  const { colorMode, theme } = useThemeStore();
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const logoColors = getLogoColors(theme, effectiveColorMode);
  const hostStyle = (props as { style?: Record<string, string | number> } | undefined)?.style;

  return (
    <Box
      aria-label="Datalayer text logo"
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
      <DatalayerLogoText
        size={30}
        variant={theme}
        colorMode={effectiveColorMode}
        primaryColor={logoColors.primary}
        secondaryColor={logoColors.secondary}
        textColor={logoColors.textColor}
      />
    </Box>
  );
}

function SvgDatalayerTextLogoFirst(props?: SVGProps<SVGSVGElement>) {
  const { colorMode, theme } = useThemeStore();
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const logoColors = getLogoColors(theme, effectiveColorMode);
  const hostStyle = (props as { style?: Record<string, string | number> } | undefined)?.style;

  return (
    <Box
      aria-label="Datalayer text logo first"
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
      <DatalayerLogoText
        size={30}
        inverse
        variant={theme}
        colorMode={effectiveColorMode}
        primaryColor={logoColors.primary}
        secondaryColor={logoColors.secondary}
        textColor={logoColors.textColor}
      />
    </Box>
  );
}

function SvgAI(props?: SVGProps<SVGSVGElement>) {
  const { colorMode, theme } = useThemeStore();
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const hostStyle = (props as { style?: Record<string, string | number> } | undefined)?.style;

  return (
    <Box
      aria-label="AI mark"
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
      <AI size={96} variant={theme} colorMode={effectiveColorMode} />
    </Box>
  );
}

function SvgAI2(props?: SVGProps<SVGSVGElement>) {
  const { colorMode, theme } = useThemeStore();
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const hostStyle = (props as { style?: Record<string, string | number> } | undefined)?.style;

  return (
    <Box
      aria-label="AI2 mark"
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
      <AI2 size={96} variant={theme} colorMode={effectiveColorMode} />
    </Box>
  );
}

function SvgDI(props?: SVGProps<SVGSVGElement>) {
  const { colorMode, theme } = useThemeStore();
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const hostStyle = (props as { style?: Record<string, string | number> } | undefined)?.style;

  return (
    <Box
      aria-label="DI mark"
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
      <DI size={96} variant={theme} colorMode={effectiveColorMode} />
    </Box>
  );
}

function SvgDatalayerTextAI(props?: SVGProps<SVGSVGElement>) {
  const { colorMode, theme } = useThemeStore();
  const effectiveColorMode: 'light' | 'dark' =
    colorMode === 'auto'
      ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : colorMode;
  const hostStyle = (props as { style?: Record<string, string | number> } | undefined)?.style;

  return (
    <Box
      aria-label="Datalayer text AI"
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
      <DatalayerTextAI
        aiGap={1}
        variant={theme}
        colorMode={effectiveColorMode}
      />
    </Box>
  );
}

const SVG_COMPONENT_OVERRIDES: Record<string, SvgComponent> = {
  SvgSpitfire: SvgSpitfireInline,
  SvgBlackSnake: SvgBlackSnakeInline,
  SvgDI,
  SvgLinesLogo,
  SvgDatalayerLogo,
  SvgDatalayerTextLogo,
  SvgDatalayerTextLogoFirst,
  SvgDatalayerTextAI,
};

const ALL_SVG_ASSET_NAMES = Array.from(
  new Set([
    ...DATALAYER_SVG_GALLERY,
    ...Object.keys(SvgAssets).filter((name) => /^Svg[A-Z]/.test(name)),
  ])
);

const DATALAYER_SVGS: SvgEntry[] = [
  ...ALL_SVG_ASSET_NAMES
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
    .filter((entry): entry is SvgEntry => entry !== null)
    .sort((a, b) => {
      const ia = DATALAYER_SVG_GALLERY.indexOf(a.name as any);
      const ib = DATALAYER_SVG_GALLERY.indexOf(b.name as any);
      if (ia !== -1 && ib !== -1) {
        return ia - ib;
      }
      if (ia !== -1) {
        return -1;
      }
      if (ib !== -1) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    }),
  {
    name: 'SvgDatalayerLogo',
    Component: SvgDatalayerLogo,
  },
  {
    name: 'SvgDatalayerTextLogo',
    Component: SvgDatalayerTextLogo,
  },
  {
    name: 'SvgDatalayerTextLogoFirst',
    Component: SvgDatalayerTextLogoFirst,
  },
  {
    name: 'SvgDatalayerTextAI',
    Component: SvgDatalayerTextAI,
  },
  {
    name: 'SvgAI',
    Component: SvgAI,
  },
  {
    name: 'SvgAI2',
    Component: SvgAI2,
  },
  {
    name: 'SvgLinesColored',
    Component: SvgLinesColored,
  },
];

const RELEASE_SVG_NAMES = new Set(['SvgSpitfire', 'SvgBlackSnake']);
const SYSTEM_SVG_NAMES = new Set(['SvgNotFound', 'SvgUnauthorized']);
const LOGO_SVG_NAMES = new Set([
  'SvgAI',
  'SvgAI2',
  'SvgDI',
  'SvgDatalayerLogo',
  'SvgDatalayerTextLogo',
  'SvgDatalayerTextLogoFirst',
  'SvgDatalayerTextAI',
  'SvgLines',
  'SvgLinesColored',
  'SvgLinesLogo',
]);
const COMMUNICATION_SVG_NAMES = new Set(['SvgFastA2ADonation', 'SvgJupyterMcp', 'SvgDiscord', 'SvgRadar']);
const CASES_SVG_NAMES = new Set(['SvgEarthHero', 'SvgUsecasesHero']);
const ARTIFACTS_SVG_NAMES = new Set([
  'SvgNotebookArtifact',
  'SvgDocumentArtifact',
  'SvgCellArtifact',
  'SvgLessonArtifact',
  'SvgExerciseArtifact',
  'SvgAssignmentArtifact',
  'SvgDataset',
  'SvgPublication',
]);
const PIXELS_SVG_NAMES = new Set(['SvgPixel1', 'SvgPixel2']);
const PICTOS_SVG_NAMES = new Set(['SvgSkubble', 'SvgEricCharles']);

function isCaseSvg(name: string) {
  return CASES_SVG_NAMES.has(name);
}

function isHeroSvg(name: string) {
  return name.endsWith('Hero') && !isCaseSvg(name);
}

function isReleaseSvg(name: string) {
  return RELEASE_SVG_NAMES.has(name);
}

function isSystemSvg(name: string) {
  return SYSTEM_SVG_NAMES.has(name);
}

function isLogoSvg(name: string) {
  return LOGO_SVG_NAMES.has(name);
}

function isCommunicationSvg(name: string) {
  return COMMUNICATION_SVG_NAMES.has(name);
}

function isArtifactsSvg(name: string) {
  return ARTIFACTS_SVG_NAMES.has(name);
}

function isPixelsSvg(name: string) {
  return PIXELS_SVG_NAMES.has(name);
}

function isPictosSvg(name: string) {
  return PICTOS_SVG_NAMES.has(name);
}

function svgInSegment(entry: SvgEntry, segment: SvgSegment) {
  if (segment === 'All') {
    return true;
  }
  if (segment === 'Heros') {
    return isHeroSvg(entry.name);
  }
  if (segment === 'Releases') {
    return isReleaseSvg(entry.name);
  }
  if (segment === 'Systems') {
    return isSystemSvg(entry.name);
  }
  if (segment === 'Logos') {
    return isLogoSvg(entry.name);
  }
  if (segment === 'Communication') {
    return isCommunicationSvg(entry.name);
  }
  if (segment === 'Artifacts') {
    return isArtifactsSvg(entry.name);
  }
  if (segment === 'Pixels') {
    return isPixelsSvg(entry.name);
  }
  if (segment === 'Pictos') {
    return isPictosSvg(entry.name);
  }
  if (segment === 'Cases') {
    return isCaseSvg(entry.name);
  }
  return (
    !isHeroSvg(entry.name)
    && !isReleaseSvg(entry.name)
    && !isSystemSvg(entry.name)
    && !isLogoSvg(entry.name)
    && !isCommunicationSvg(entry.name)
    && !isArtifactsSvg(entry.name)
    && !isPixelsSvg(entry.name)
    && !isPictosSvg(entry.name)
    && !isCaseSvg(entry.name)
  );
}

function SegmentControl({
  value,
  onChange,
  counts,
}: {
  value: SvgSegment;
  onChange: (segment: SvgSegment) => void;
  counts: Record<SvgSegment, number>;
}) {
  const segments: SvgSegment[] = SEGMENTS;

  return (
    <Box
      role="tablist"
      aria-label="SVG segment filter"
      sx={{
        display: 'inline-flex',
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 2,
        overflow: 'hidden',
        bg: 'canvas.default',
      }}
    >
      {segments.map((segment, index) => {
        const active = value === segment;
        return (
          <Button
            key={segment}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(segment)}
            sx={{
              border: 'none',
              borderRadius: 0,
              borderLeft: index === 0 ? 'none' : '1px solid',
              borderLeftColor: 'border.default',
              bg: active ? 'accent.subtle' : 'canvas.default',
              color: active ? 'accent.fg' : 'fg.default',
              fontWeight: active ? 600 : 400,
              ':hover': {
                bg: active ? 'accent.subtle' : 'canvas.subtle',
              },
            }}
          >
            {segment} ({counts[segment]})
          </Button>
        );
      })}
    </Box>
  );
}

type RasterFormat = 'png' | 'jpg';
type ExportScale = 1 | 2 | 4;

function getSvgExportDimensions(svg: SVGSVGElement | null): { width: number; height: number } | null {
  if (!svg) {
    return null;
  }
  const rect = svg.getBoundingClientRect();
  return {
    width: Math.max(1, Math.round(rect.width)),
    height: Math.max(1, Math.round(rect.height)),
  };
}

async function downloadSvgElement(
  svg: SVGSVGElement,
  fileName: string,
  format: 'svg' | RasterFormat,
  scale: ExportScale = 1,
) {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  const dimensions = getSvgExportDimensions(svg);
  if (!dimensions) {
    return;
  }
  const width = dimensions.width;
  const height = dimensions.height;
  const targetWidth = width * scale;
  const targetHeight = height * scale;

  clone.setAttribute('width', String(targetWidth));
  clone.setAttribute('height', String(targetHeight));
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
  const fileScaleSuffix = scale === 1 ? '' : `@${scale}x`;
  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Unable to create canvas context'));
        return;
      }
      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      canvas.toBlob((output) => {
        URL.revokeObjectURL(url);
        if (!output) {
          reject(new Error(`Unable to export ${format.toUpperCase()}`));
          return;
        }
        const outUrl = URL.createObjectURL(output);
        const link = document.createElement('a');
        link.href = outUrl;
        link.download = `${fileName}${fileScaleSuffix}.${extension}`;
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

async function downloadAnimatedGif(
  svg: SVGSVGElement,
  fileName: string,
  scale: ExportScale = 1,
  durationMs = 10_000,
) {
  const dimensions = getSvgExportDimensions(svg);
  if (!dimensions) {
    return;
  }
  const sourceWidth = dimensions.width;
  const sourceHeight = dimensions.height;
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;

  const gif = new GIF({
    workers: 2,
    quality: 10,
    workerScript: gifWorkerUrl,
    width,
    height,
    repeat: 0,
  });

  const fps = 10;
  const frameDelay = Math.round(1000 / fps);
  const frameCount = Math.max(1, Math.floor(durationMs / frameDelay));

  const stagingHost = document.createElement('div');
  stagingHost.style.position = 'fixed';
  stagingHost.style.left = '-100000px';
  stagingHost.style.top = '-100000px';
  stagingHost.style.width = `${sourceWidth}px`;
  stagingHost.style.height = `${sourceHeight}px`;
  stagingHost.style.pointerEvents = 'none';
  stagingHost.style.opacity = '0';

  const workingSvg = svg.cloneNode(true) as SVGSVGElement;
  workingSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  workingSvg.setAttribute('width', String(sourceWidth));
  workingSvg.setAttribute('height', String(sourceHeight));
  workingSvg.style.width = `${sourceWidth}px`;
  workingSvg.style.height = `${sourceHeight}px`;
  workingSvg.style.display = 'block';
  stagingHost.appendChild(workingSvg);
  document.body.appendChild(stagingHost);

  const ANIMATION_TAGS = new Set(['animate', 'animatemotion', 'animatetransform', 'set']);

  const formatMatrix = (m: DOMMatrix) =>
    `matrix(${m.a},${m.b},${m.c},${m.d},${m.e},${m.f})`;

  // Bake the current animated state (transforms from animateMotion /
  // animateTransform, opacity from animate) of the live SVG into a static
  // snapshot. Serializing an SVG with SMIL animations and loading it through an
  // <img> always renders it at time 0, so we must freeze the computed values.
  const bakeAndRasterizeFrame = async () => {
    const snapshot = workingSvg.cloneNode(true) as SVGSVGElement;

    const liveElements = Array.from(workingSvg.querySelectorAll<SVGElement>('*'));
    const snapElements = Array.from(snapshot.querySelectorAll<SVGElement>('*'));

    for (let index = 0; index < liveElements.length; index += 1) {
      const liveEl = liveElements[index];
      const snapEl = snapElements[index];
      if (!snapEl) {
        continue;
      }

      if (liveEl instanceof SVGGraphicsElement && liveEl.parentNode) {
        const parent = liveEl.parentNode as Element;
        const parentCtm =
          parent instanceof SVGGraphicsElement ? parent.getScreenCTM() : null;
        const elCtm = liveEl.getScreenCTM();
        if (parentCtm && elCtm) {
          const localMatrix = parentCtm.inverse().multiply(elCtm);
          snapEl.setAttribute('transform', formatMatrix(localMatrix));
        }

        const computedOpacity = window.getComputedStyle(liveEl).opacity;
        if (computedOpacity && computedOpacity !== '1') {
          snapEl.setAttribute('opacity', computedOpacity);
        }
      }
    }

    // Remove all animation elements so the snapshot renders as a frozen frame.
    snapshot
      .querySelectorAll('*')
      .forEach((node) => {
        if (ANIMATION_TAGS.has(node.tagName.toLowerCase())) {
          node.parentNode?.removeChild(node);
        }
      });

    const markup = new XMLSerializer().serializeToString(snapshot);
    const blob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Unable to render animated SVG frame'));
        img.src = url;
      });

      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = width;
      frameCanvas.height = height;
      const ctx = frameCanvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        throw new Error('Unable to create canvas context');
      }
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);
      return frameCanvas;
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  try {
    if (typeof workingSvg.pauseAnimations === 'function') {
      workingSvg.pauseAnimations();
    }

    for (let i = 0; i < frameCount; i += 1) {
      if (typeof workingSvg.setCurrentTime === 'function') {
        workingSvg.setCurrentTime((i * frameDelay) / 1000);
      }
      // Force the SMIL engine to update animated values before reading them.
      workingSvg.getBoundingClientRect();
      const frameCanvas = await bakeAndRasterizeFrame();
      gif.addFrame(frameCanvas, { copy: true, delay: frameDelay });
    }
  } finally {
    document.body.removeChild(stagingHost);
  }

  const output = await new Promise<Blob>((resolve) => {
    gif.on('finished', (gifBlob: Blob) => resolve(gifBlob));
    gif.render();
  });

  const outUrl = URL.createObjectURL(output);
  const fileScaleSuffix = scale === 1 ? '' : `@${scale}x`;
  const link = document.createElement('a');
  link.href = outUrl;
  link.download = `${fileName}${fileScaleSuffix}.gif`;
  link.click();
  URL.revokeObjectURL(outUrl);
}

function RasterDownloadMenu({
  label,
  format,
  fileName,
  containerRef,
}: {
  label: string;
  format: RasterFormat;
  fileName: string;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const svg = containerRef.current?.querySelector('svg') ?? null;
  const dimensions = getSvgExportDimensions(svg);

  const sizeLabel = (scale: ExportScale) => {
    if (!dimensions) {
      return 'unknown';
    }
    return `${dimensions.width * scale}x${dimensions.height * scale}`;
  };

  const handleExport = async (scale: ExportScale) => {
    const target = containerRef.current?.querySelector('svg');
    if (!target) {
      return;
    }
    await downloadSvgElement(target, fileName, format, scale);
  };

  return (
    <ActionMenu>
      <ActionMenu.Button>{label}</ActionMenu.Button>
      <ActionMenu.Overlay>
        <ActionList>
          <ActionList.Item onSelect={() => { void handleExport(1); }}>
            Current size ({sizeLabel(1)})
          </ActionList.Item>
          <ActionList.Item onSelect={() => { void handleExport(2); }}>
            Double ({sizeLabel(2)})
          </ActionList.Item>
          <ActionList.Item onSelect={() => { void handleExport(4); }}>
            Double again ({sizeLabel(4)})
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}

function GifDownloadMenu({
  fileName,
  containerRef,
}: {
  fileName: string;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const svg = containerRef.current?.querySelector('svg') ?? null;
  const dimensions = getSvgExportDimensions(svg);

  const sizeLabel = (scale: ExportScale) => {
    if (!dimensions) {
      return 'unknown';
    }
    return `${dimensions.width * scale}x${dimensions.height * scale}`;
  };

  const handleDownload = async (scale: ExportScale) => {
    const targetSvg = containerRef.current?.querySelector('svg');
    if (!targetSvg || isGenerating) {
      return;
    }

    try {
      setIsGenerating(true);
      await downloadAnimatedGif(targetSvg, fileName, scale, 10_000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ActionMenu>
      <ActionMenu.Button disabled={isGenerating}>
        {isGenerating ? 'Generating GIF…' : 'Download GIF (10s)'}
      </ActionMenu.Button>
      <ActionMenu.Overlay>
        <ActionList>
          <ActionList.Item onSelect={() => { void handleDownload(1); }}>
            Current size ({sizeLabel(1)})
          </ActionList.Item>
          <ActionList.Item onSelect={() => { void handleDownload(2); }}>
            Double ({sizeLabel(2)})
          </ActionList.Item>
          <ActionList.Item onSelect={() => { void handleDownload(4); }}>
            Double again ({sizeLabel(4)})
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
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
        onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openDetail();
          }
        }}
        sx={{
          p: 2,
          border: '1px dashed',
          borderColor: 'border.default',
          bg: 'canvas.subtle',
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
        <RasterDownloadMenu label="Download PNG" format="png" fileName={name} containerRef={ref} />
        <RasterDownloadMenu label="Download JPG" format="jpg" fileName={name} containerRef={ref} />
        <GifDownloadMenu fileName={name} containerRef={ref} />
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
  const resolvedName = name?.toLowerCase() === 'logo' ? 'SvgDI' : name;
  const entry = useMemo(() => DATALAYER_SVGS.find((item) => item.name === resolvedName), [resolvedName]);
  const ref = useRef<HTMLDivElement | null>(null);

  if (!entry) {
    return (
      <Box sx={{ px: 4, py: 5 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Text>SVG not found.</Text>
        </Box>
      </Box>
    );
  }

  const Component = entry.Component;

  return (
    <Box sx={{ px: 4, py: 5 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="invisible"
          leadingVisual={ArrowLeftIcon}
          onClick={() => navigate('/svg')}
        >
          Back
        </Button>
        <RasterDownloadMenu label="Download PNG" format="png" fileName={entry.name} containerRef={ref} />
        <RasterDownloadMenu label="Download JPG" format="jpg" fileName={entry.name} containerRef={ref} />
        <GifDownloadMenu fileName={entry.name} containerRef={ref} />
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
    </Box>
  );
}

export function SvgPage() {
  const navigate = useNavigate();
  const { name } = useParams<{ name?: string }>();
  const normalizedName = name?.toLowerCase();
  const routeSegment = normalizedName ? SEGMENT_BY_SLUG[normalizedName] : undefined;
  const isDetailRoute = !!name && !routeSegment;
  const [segment, setSegmentState] = useState<SvgSegment>(routeSegment ?? 'All');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (routeSegment && routeSegment !== segment) {
      setSegmentState(routeSegment);
    }
  }, [routeSegment, segment]);

  const setSegment = (next: SvgSegment) => {
    setSegmentState(next);
    navigate(next === 'All' ? '/svg' : `/svg/${slugForSegment(next)}`);
  };

  const normalizedFilter = filter.trim().toLowerCase();

  const filterMatches = (entry: SvgEntry) => {
    if (!normalizedFilter) {
      return true;
    }
    return entry.name.toLowerCase().includes(normalizedFilter);
  };

  const segmentCounts = useMemo(() => {
    const textFiltered = DATALAYER_SVGS.filter(filterMatches);
    return {
      All: textFiltered.length,
      Heros: textFiltered.filter((entry) => svgInSegment(entry, 'Heros')).length,
      Systems: textFiltered.filter((entry) => svgInSegment(entry, 'Systems')).length,
      Features: textFiltered.filter((entry) => svgInSegment(entry, 'Features')).length,
      Artifacts: textFiltered.filter((entry) => svgInSegment(entry, 'Artifacts')).length,
      Pixels: textFiltered.filter((entry) => svgInSegment(entry, 'Pixels')).length,
      Pictos: textFiltered.filter((entry) => svgInSegment(entry, 'Pictos')).length,
      Releases: textFiltered.filter((entry) => svgInSegment(entry, 'Releases')).length,
      Logos: textFiltered.filter((entry) => svgInSegment(entry, 'Logos')).length,
      Communication: textFiltered.filter((entry) => svgInSegment(entry, 'Communication')).length,
      Cases: textFiltered.filter((entry) => svgInSegment(entry, 'Cases')).length,
    };
  }, [normalizedFilter]);

  const filteredSvgs = useMemo(() => {
    return DATALAYER_SVGS
      .filter(filterMatches)
      .filter((entry) => svgInSegment(entry, segment))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [segment, normalizedFilter]);

  if (isDetailRoute) {
    return <SvgDetailPage />;
  }

  return (
    <Box sx={{ px: 4, py: 5 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, bg: 'canvas.subtle', p: [3, 4], mb: 4 }}>
        <Heading as="h2" sx={{ fontSize: 4, mb: 2 }}>SVG Gallery</Heading>
        <Text sx={{ color: 'fg.muted' }}>
          Gallery generated from local design SVG exports.
        </Text>
        <Box sx={{ mt: 3, maxWidth: 420 }}>
          <TextInput
            block
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Filter SVGs by name..."
            aria-label="Filter SVGs by name"
          />
        </Box>
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <SegmentControl value={segment} onChange={setSegment} counts={segmentCounts} />
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'], gap: 3 }}>
        {filteredSvgs.length === 0 && (
          <Box sx={{ gridColumn: '1 / -1', p: 4, border: '1px solid', borderColor: 'border.default', borderRadius: 2, bg: 'canvas.subtle' }}>
            <Text sx={{ color: 'fg.muted' }}>No SVG matches this filter in the current segment.</Text>
          </Box>
        )}
        {filteredSvgs.map((entry) => (
          <SvgCard key={entry.name} {...entry} />
        ))}
      </Box>
      </Box>
    </Box>
  );
}

export default SvgPage;
