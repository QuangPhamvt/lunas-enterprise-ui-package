'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Paragraph } from '@/components/typography/paragraph';

export const DescriptionNumberPhone: React.FC<{ value: string }> = ({ value }) => {
  return (
    <Tooltip>
      <TooltipTrigger data-slot="description-phone">
        <Paragraph variant="sm" className="tabular-nums transition-colors">
          {value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p className="tabular-nums">{value.slice(1).replace(/(\d{2})(\d{3})(\d{4})/, '(00) (+84) ($1) $2-$3')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
