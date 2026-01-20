import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Paragraph } from '@/components/typography/paragraph';

export const DescriptionNumberPhone: React.FC<React.PropsWithChildren<{ value: string }>> = ({ value }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Paragraph variant="sm">{value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p className="tabular-nums">{value.slice(1).replace(/(\d{2})(\d{3})(\d{4})/, '(00) (+84) ($1) $2-$3')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
