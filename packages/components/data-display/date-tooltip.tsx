import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DateDisplay } from './date';

type Props = {
  date: Date | string | number;
};
export const DateTooltip: React.FC<Props> = ({ date }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="h-fit">
            <DateDisplay date={date} format="medium" className="font-normal text-white" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <DateDisplay date={date} format="full" showTime className="!font-[Inter] font-medium" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
