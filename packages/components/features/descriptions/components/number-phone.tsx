'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Paragraph } from '@/components/typography/paragraph';
import { formatVietnamesePhone } from '@/libs/phone';
import { DescriptionEmpty } from './empty';

/**
 * A Vietnamese phone number in national format, with the international format in a tooltip. Renders
 * `DescriptionEmpty` when there is nothing to show.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="…">
 *   <DescriptionNumberPhone value={customer.phone} />
 * </DescriptionItem>
 * ```
 */
export const DescriptionNumberPhone: React.FC<{
  /** Raw phone number in any common Vietnamese format. */
  value?: string | null;
}> = ({ value }) => {
  const phone = formatVietnamesePhone(value);
  if (!phone) return <DescriptionEmpty />;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Paragraph data-slot="description-phone" variant="sm" className="cursor-help tabular-nums transition-colors">
          {phone.national}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p className="tabular-nums">{phone.international}</p>
      </TooltipContent>
    </Tooltip>
  );
};
