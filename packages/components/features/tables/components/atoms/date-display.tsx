import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { DateDisplay } from '@/components/data-display/date';
import { UITableEmpty } from './empty';

type Props = {
  date: Date | string | number | null | undefined;
};
export const UITableDateDisplay: React.FC<Props> = ({ date }) => {
  if (typeof date === 'undefined' || date === null) return <UITableEmpty />;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="h-fit">
            <DateDisplay date={date} format="medium" className="font-normal text-white" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="rounded px-2">
          <DateDisplay date={date} format="full" showTime className="font-medium text-text-negative text-xs" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
