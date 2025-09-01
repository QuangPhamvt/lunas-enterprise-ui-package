import { DateDisplay } from './date'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

type Props = {
  date: Date | string | number
}
export const DateTooltip: React.FC<Props> = ({ date }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge>
            <DateDisplay date={date} format="medium" className="font-normal text-white" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <DateDisplay date={date} format="full" showTime className="!font-[Inter] font-medium" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
