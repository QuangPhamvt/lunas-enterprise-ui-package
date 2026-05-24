'use client';

import { useMemo } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { ECountry } from '@/types';

import { Flex } from '../layouts/flex';
import { Paragraph } from '../typography/paragraph';

const COUNTRY_CODES: Record<ECountry, string> = {
  [ECountry.VIETNAM]: 'VN',
  [ECountry.USA]: 'US',
  [ECountry.JAPAN]: 'JP',
  [ECountry.CHINA]: 'CN',
  [ECountry.KOREA]: 'KR',
  [ECountry.SINGAPORE]: 'SG',
  [ECountry.MALAYSIA]: 'MY',
  [ECountry.INDONESIA]: 'ID',
  [ECountry.TAIWAN]: 'TW',
  [ECountry.THAILAND]: 'TH',
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
  const code = useMemo(() => (country ? COUNTRY_CODES[country] : 'VN'), [country]);

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
      <ReactCountryFlag svg countryCode={code} className="emojiFlag border" />
      <Paragraph variant="sm">{COUNTRY_LABELS[country]}</Paragraph>
    </Flex>
  );
};
