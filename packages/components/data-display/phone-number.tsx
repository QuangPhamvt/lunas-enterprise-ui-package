import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export const PhoneNumberDisplay: React.FC<React.PropsWithChildren<{ value: string }>> = ({ value }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="font-number text-secondary-foreground text-sm">{value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</p>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p>{value.slice(1).replace(/(\d{2})(\d{3})(\d{4})/, '(00) (+84) ($1) $2-$3')}</p>
      </TooltipContent>
    </Tooltip>
  )
}
