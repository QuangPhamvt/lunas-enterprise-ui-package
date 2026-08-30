'use client';

import { formatVietnamesePhone } from '@/libs/phone';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type PhoneNumberDisplayProps = {
  /** The raw phone number string (e.g. `'0901234567'`); automatically formatted as `0901 234 567` with a `+84` tooltip. */
  value: string | null | undefined;
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
  const phone = formatVietnamesePhone(value);
  if (!phone) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p data-slot="phone-number-display" className="cursor-default font-number text-sm text-text-positive tabular-nums transition-colors">
          {phone.national}
        </p>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p>{phone.international}</p>
      </TooltipContent>
    </Tooltip>
  );
};
