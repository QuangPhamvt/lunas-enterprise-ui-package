import { Paragraph } from '../typography/paragraph'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type NameDisplayProps = {
  name: string
}

export const NameDisplay: React.FC<React.PropsWithChildren<NameDisplayProps>> = ({ name }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Paragraph variant="sm" className="line-clamp-2 w-full truncate pb-px text-start text-wrap">
          {name}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start" className="max-w-80 text-wrap break-keep whitespace-pre-line">
        {name}
      </TooltipContent>
    </Tooltip>
  )
}
