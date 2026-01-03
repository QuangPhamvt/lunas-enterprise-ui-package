import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Paragraph } from '@/components/typography/paragraph';

type NameDisplayProps = {
  name: string;
};

export const UITableNameDisplay: React.FC<NameDisplayProps> = ({ name }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Paragraph variant="sm" className="line-clamp-2 w-full truncate text-wrap pb-px text-start">
          {name}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start" className="h-fit max-w-80 whitespace-pre-line text-wrap break-keep">
        {name}
      </TooltipContent>
    </Tooltip>
  );
};
