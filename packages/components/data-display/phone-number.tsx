'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type PhoneNumberDisplayProps = {
  value: string;
};

export const PhoneNumberDisplay: React.FC<PhoneNumberDisplayProps> = ({ value }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p data-slot="phone-number-display" className="cursor-default font-number text-sm text-text-positive tabular-nums transition-colors">
          {value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
        </p>
      </TooltipTrigger>
      <TooltipContent align="start">
        <p>{value.slice(1).replace(/(\d{2})(\d{3})(\d{4})/, '(00) (+84) ($1) $2-$3')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
