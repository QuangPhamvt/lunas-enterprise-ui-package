import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { DateDisplay } from '@/components/data-display/date';

type Props = {
  date: Date | string | number;
};
export const UITableDateDisplay: React.FC<Props> = ({ date }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="h-fit">
            <DateDisplay date={date} format="medium" className="font-normal text-white" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <DateDisplay date={date} format="full" showTime className="font-[Inter]! font-medium text-xs" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
