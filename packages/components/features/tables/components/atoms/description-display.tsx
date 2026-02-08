import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { UITableEmpty } from './empty';

export const UITableDescriptionDisplay: React.FC<{ content: string | null | undefined | number }> = ({ content }) => {
  if (content === undefined || content === null) {
    return <UITableEmpty />;
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="line-clamp-2 whitespace-pre-line break-all text-start text-[13px] text-text-positive-weak">{content}</div>
      </TooltipTrigger>
      <TooltipContent align="start" className="h-fit min-w-48 max-w-80 pt-4">
        <div className="flex flex-col gap-y-2">
          <p className="whitespace-pre-line text-wrap break-keep">{content}</p>
          <p className="w-full text-end">{content.toString().length} chars</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
