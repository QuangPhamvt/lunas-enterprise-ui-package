'use client';

import { ECountry } from '@/types';
import { Flex } from '../layouts/flex';
import { Paragraph } from '../typography/paragraph';

const STAR = '0,-1 0.225,-0.309 0.951,-0.309 0.363,0.118 0.588,0.809 0,0.382 -0.588,0.809 -0.363,0.118 -0.951,-0.309 -0.225,-0.309';

/** Unit five-point star scaled to `size` and centered on (`x`, `y`). */
const Star: React.FC<{ x: number; y: number; size: number; fill: string }> = ({ x, y, size, fill }) => (
  <polygon points={STAR} fill={fill} transform={`translate(${x} ${y}) scale(${size})`} />
);

const stripes = (count: number, height: number, odd: string, even: string) =>
  Array.from({ length: count }, (_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: a fixed-length static stripe list never reorders
    <rect key={i} y={(i * height) / count} width={30} height={height / count} fill={i % 2 === 0 ? odd : even} />
  ));

/**
 * Simplified inline flags (30×20 viewBox) — no flag library and no CDN request, and unlike emoji
 * flags they render on Windows too. Recognizable at icon size, not heraldically exact.
 */
const FLAGS: Record<ECountry, React.ReactNode> = {
  [ECountry.VIETNAM]: (
    <>
      <rect width={30} height={20} fill="#DA251D" />
      <Star x={15} y={10.5} size={6} fill="#FFFF00" />
    </>
  ),
  [ECountry.USA]: (
    <>
      {stripes(13, 20, '#B22234', '#FFFFFF')}
      <rect width={12} height={10.77} fill="#3C3B6E" />
    </>
  ),
  [ECountry.JAPAN]: (
    <>
      <rect width={30} height={20} fill="#FFFFFF" />
      <circle cx={15} cy={10} r={6} fill="#BC002D" />
    </>
  ),
  [ECountry.KOREA]: (
    <>
      <rect width={30} height={20} fill="#FFFFFF" />
      <path d="M10 10a5 5 0 0 1 10 0z" fill="#CD2E3A" />
      <path d="M10 10a5 5 0 0 0 10 0z" fill="#0047A0" />
      <g fill="#000000">
        <rect x={3} y={3} width={4} height={1} transform="rotate(34 5 3.5)" />
        <rect x={23} y={3} width={4} height={1} transform="rotate(-34 25 3.5)" />
        <rect x={3} y={16} width={4} height={1} transform="rotate(-34 5 16.5)" />
        <rect x={23} y={16} width={4} height={1} transform="rotate(34 25 16.5)" />
      </g>
    </>
  ),
  [ECountry.CHINA]: (
    <>
      <rect width={30} height={20} fill="#EE1C25" />
      <Star x={5} y={5} size={3} fill="#FFFF00" />
      <Star x={10} y={2} size={1} fill="#FFFF00" />
      <Star x={12} y={4} size={1} fill="#FFFF00" />
      <Star x={12} y={7} size={1} fill="#FFFF00" />
      <Star x={10} y={9} size={1} fill="#FFFF00" />
    </>
  ),
  [ECountry.TAIWAN]: (
    <>
      <rect width={30} height={20} fill="#FE0000" />
      <rect width={15} height={10} fill="#000095" />
      <circle cx={7.5} cy={5} r={2.5} fill="#FFFFFF" />
    </>
  ),
  [ECountry.THAILAND]: (
    <>
      <rect width={30} height={20} fill="#A51931" />
      <rect y={3.33} width={30} height={13.33} fill="#F4F5F8" />
      <rect y={6.67} width={30} height={6.67} fill="#2D2A4A" />
    </>
  ),
  [ECountry.MALAYSIA]: (
    <>
      {stripes(14, 20, '#CC0001', '#FFFFFF')}
      <rect width={15} height={11.43} fill="#010066" />
      <circle cx={6} cy={5.7} r={3.6} fill="#FFCC00" />
      <circle cx={7} cy={5.7} r={3} fill="#010066" />
      <Star x={11} y={5.7} size={2.2} fill="#FFCC00" />
    </>
  ),
  [ECountry.SINGAPORE]: (
    <>
      <rect width={30} height={10} fill="#EF3340" />
      <rect y={10} width={30} height={10} fill="#FFFFFF" />
      <circle cx={6} cy={5} r={3.5} fill="#FFFFFF" />
      <circle cx={7.3} cy={5} r={3.2} fill="#EF3340" />
      <Star x={11} y={5} size={1} fill="#FFFFFF" />
    </>
  ),
  [ECountry.INDONESIA]: (
    <>
      <rect width={30} height={10} fill="#CE1126" />
      <rect y={10} width={30} height={10} fill="#FFFFFF" />
    </>
  ),
};

const COUNTRY_LABELS: Record<ECountry, string> = {
  [ECountry.VIETNAM]: 'Vietnam',
  [ECountry.USA]: 'America',
  [ECountry.JAPAN]: 'Japan',
  [ECountry.CHINA]: 'China',
  [ECountry.KOREA]: 'Korea',
  [ECountry.SINGAPORE]: 'Singapore',
  [ECountry.MALAYSIA]: 'Malaysia',
  [ECountry.INDONESIA]: 'Indonesia',
  [ECountry.TAIWAN]: 'Taiwan',
  [ECountry.THAILAND]: 'Thailand',
};

type CountryDisplayProps = {
  /** The country enum value to display; renders "No country" when `null` or `undefined`. */
  country?: ECountry | null;
};

/**
 * Displays a country flag (SVG) alongside the country's English name, or a muted "No country" label when the value is absent.
 *
 * @example
 * ```tsx
 * import { CountryDisplay } from '@customafk/lunas-ui/data-display/country';
 * import { ECountry } from '@customafk/lunas-ui/types';
 *
 * <CountryDisplay country={ECountry.VIETNAM} />
 * ```
 */
export const CountryDisplay: React.FC<CountryDisplayProps> = ({ country }) => {
  if (!country) {
    return (
      <Flex data-slot="country-display" padding="none" className="px-1">
        <Paragraph variant="muted" className="line-clamp-1 text-xs">
          No country
        </Paragraph>
      </Flex>
    );
  }

  return (
    <Flex data-slot="country-display" padding="none" className="px-1">
      <svg
        role="img"
        aria-label={COUNTRY_LABELS[country]}
        viewBox="0 0 30 20"
        className="h-[1em] w-[1.5em] shrink-0 overflow-hidden rounded-[2px] border border-border-weak"
      >
        {FLAGS[country]}
      </svg>
      <Paragraph variant="sm">{COUNTRY_LABELS[country]}</Paragraph>
    </Flex>
  );
};
