import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { DateDisplay } from '@/components/data-display/date';
import { DescriptionEmpty } from './empty';

type Props = {
  date: Date | string | number | null | undefined;
};
export const DescriptionDate: React.FC<Props> = ({ date }) => {
  if (typeof date === 'undefined' || date === null) return <DescriptionEmpty />;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <DateDisplay date={date} format="medium" />
        </TooltipTrigger>
        <TooltipContent>
          <DateDisplay date={date} format="full" showTime className="font-medium text-xs" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
