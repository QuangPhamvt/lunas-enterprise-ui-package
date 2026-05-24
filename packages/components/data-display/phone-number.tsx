'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type PhoneNumberDisplayProps = {
  /** The raw phone number string (e.g. `'0901234567'`); automatically formatted as `(090) 123-4567` with a +84 tooltip. */
  value: string;
};

/**
 * Formats and displays a Vietnamese phone number with a tooltip showing the international dialling format.
 *
 * @example
 * ```tsx
 * import { PhoneNumberDisplay } from '@customafk/lunas-ui/data-display/phone-number';
 *
 * <PhoneNumberDisplay value="0901234567" />
 * ```
 */
export const PhoneNumberDisplay: React.FC<PhoneNumberDisplayProps> = ({ value }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p data-slot="phone-number-display" className="cursor-default font-number text-sm text-text-positive tabular-nums transition-colors">
          {value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
        </p>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p>{value.slice(1).replace(/(\d{2})(\d{3})(\d{4})/, '(00) (+84) ($1) $2-$3')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
