'use client';

import { Paragraph } from '../typography/paragraph';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type NameDisplayProps = {
  name: string;
};

export const NameDisplay: React.FC<NameDisplayProps> = ({ name }) => {
  return (
    <Tooltip>
      <TooltipTrigger data-slot="name-display">
        <Paragraph variant="sm" className="line-clamp-2 w-full truncate text-wrap pb-px text-start">
          {name}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start" className="max-w-80 whitespace-pre-line text-wrap break-keep">
        {name}
      </TooltipContent>
    </Tooltip>
  );
};
