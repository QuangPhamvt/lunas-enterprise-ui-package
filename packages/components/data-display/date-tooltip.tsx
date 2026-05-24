'use client';

import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { DateDisplay } from './date';

type DateTooltipProps = {
  date: Date | string | number;
};

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
