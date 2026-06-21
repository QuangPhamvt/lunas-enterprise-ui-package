'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DateDisplay } from '@/components/data-display/date';

import { DescriptionEmpty } from './empty';

type DescriptionDateProps = {
  date: Date | string | number | null | undefined;
};

export const DescriptionDate: React.FC<DescriptionDateProps> = ({ date }) => {
  if (date == null) return <DescriptionEmpty />;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DateDisplay data-slot="description-date" date={date} format="medium" className="cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <DateDisplay date={date} format="full" showTime className="text-xs font-medium" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
