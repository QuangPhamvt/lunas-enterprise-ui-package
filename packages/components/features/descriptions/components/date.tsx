'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { DateDisplay } from '@/components/data-display/date';
import { DescriptionEmpty } from './empty';

type DescriptionDateProps = {
  date: Date | string | number | null | undefined;
};

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
