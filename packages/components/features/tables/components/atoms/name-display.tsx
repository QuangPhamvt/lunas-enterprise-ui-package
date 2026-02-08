import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Paragraph } from '@/components/typography/paragraph';
import { UITableEmpty } from './empty';

type NameDisplayProps = {
  name?: string | null | undefined;
};

export const UITableNameDisplay: React.FC<NameDisplayProps> = ({ name }) => {
  if (!name) return <UITableEmpty />;
  return (
    <Tooltip>
      <TooltipTrigger>
        <Paragraph variant="sm" className="line-clamp-2 w-full truncate text-wrap pb-px text-start text-sm">
          {name}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start" className="h-fit min-w-48 max-w-80 pt-4">
        <div className="flex flex-col gap-y-2">
          <p className="whitespace-pre-line text-wrap break-keep">{name}</p>
          <p className="w-full text-end">{name.length} chars</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
