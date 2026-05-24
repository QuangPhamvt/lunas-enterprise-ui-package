'use client';

import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { DateDisplay } from './date';

type DateTooltipProps = {
  /** The date value to display; accepts a `Date` object, an ISO string, or a Unix timestamp (ms). */
  date: Date | string | number;
};

/**
 * Displays a date as a badge; hovering reveals a tooltip with the full Vietnamese weekday and time.
 *
 * @example
 * ```tsx
 * import { DateTooltip } from '@customafk/lunas-ui/data-display/date-tooltip';
 *
 * <DateTooltip date="2024-03-15T14:30:00Z" />
 * ```
 */
export const DateTooltip: React.FC<DateTooltipProps> = ({ date }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge data-slot="date-tooltip-trigger" className="h-fit">
            <DateDisplay date={date} format="medium" className="text-xs font-normal text-text-negative" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent data-slot="date-tooltip-content">
          <DateDisplay date={date} format="full" showTime className="font-[Inter]! font-medium" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
