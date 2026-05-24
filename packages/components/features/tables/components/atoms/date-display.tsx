import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { DateDisplay } from '@/components/data-display/date';
import { UITableEmpty } from './empty';

/** Props for the {@link UITableDateDisplay} component. */
type Props = {
  /** The date value to format and display; `null`/`undefined` renders an empty state. */
  date: Date | string | number | null | undefined;
};

/**
 * Displays a date as a compact badge in a table cell with a tooltip that shows
 * the full date and time on hover; renders {@link UITableEmpty} when `date` is
 * `null` or `undefined`.
 *
 * @example
 * import { UITableDateDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableDateDisplay date={new Date('2024-06-15T10:30:00Z')} />
 */
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
