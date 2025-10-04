import { useMemo } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { ECountry } from '@/types';

import { Flex } from '../layouts/flex';
import { Paragraph } from '../typography/paragraph';

type Props = {
  country?: ECountry | null;
};
export const CountryDisplay: React.FC<React.PropsWithChildren<Props>> = ({ country }) => {
  const code = useMemo(() => {
    return {
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
  }, []);
  if (!country) {
    return (
      <Flex padding="none" className="h-4 px-1">
        <Paragraph variant="muted" className="line-clamp-1 text-xs">
          No country
        </Paragraph>
      </Flex>
    );
  }
  return (
    <Flex padding="none" className="h-4 px-1">
      <ReactCountryFlag svg countryCode={country ? code[country] : 'VN'} className="emojiFlag border" />
      <Paragraph variant="sm">
        {country === ECountry.VIETNAM && 'Vietnam'}
        {country === ECountry.USA && 'America'}
        {country === ECountry.JAPAN && 'Japan'}
        {country === ECountry.CHINA && 'China'}
        {country === ECountry.KOREA && 'Korea'}
        {country === ECountry.SINGAPORE && 'Singapore'}
        {country === ECountry.MALAYSIA && 'Malaysia'}
        {country === ECountry.INDONESIA && 'Indonesia'}
        {country === ECountry.TAIWAN && 'Taiwan'}
        {country === ECountry.THAILAND && 'Thailand'}
      </Paragraph>
    </Flex>
  );
};
