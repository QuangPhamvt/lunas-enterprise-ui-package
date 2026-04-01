import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const UITablePhoneNumberDisplay: React.FC<React.PropsWithChildren<{ value: string }>> = ({ value }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="font-number text-secondary-foreground text-sm tabular-nums">{value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</p>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p className="tabular-nums">{value.slice(1).replace(/(\d{2})(\d{3})(\d{4})/, '(00) (+84) ($1) $2-$3')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
