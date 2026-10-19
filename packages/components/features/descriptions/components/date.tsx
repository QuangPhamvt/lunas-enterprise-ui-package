'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { DateDisplay } from '@/components/data-display/date';
import { DescriptionEmpty } from './empty';

type DescriptionDateProps = {
  /** A `Date`, an ISO string or a timestamp. */
  date: Date | string | number | null | undefined;
};

/**
 * A medium-format date with the full date and time in a tooltip. Renders `DescriptionEmpty` when
 * there is nothing to show.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="…">
 *   <DescriptionDate date={order.createdAt} />
 * </DescriptionItem>
 * ```
 */
export const DescriptionDate: React.FC<DescriptionDateProps> = ({ date }) => {
  if (date == null) return <DescriptionEmpty />;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* DateDisplay doesn't spread ...props, so Radix's Slot-injected hover/focus handlers need a real element to land on. */}
        <span data-slot="description-date" className="cursor-help">
          <DateDisplay date={date} format="medium" />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <DateDisplay date={date} format="full" showTime className="text-text-negative-strong text-xs" />
      </TooltipContent>
    </Tooltip>
  );
};
