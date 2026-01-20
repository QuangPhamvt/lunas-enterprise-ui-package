import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Paragraph } from '@/components/typography/paragraph';
import { DescriptionEmpty } from './empty';

export const DescriptionLongText: React.FC<{ content: string | null | undefined | number }> = ({ content }) => {
  if (content === undefined || content === null) {
    return <DescriptionEmpty />;
  }
  return (
    <Tooltip>
      <TooltipTrigger>
        <Paragraph variant="sm" className="whitespace-pre-line break-all text-start text-sm">
          {content}
        </Paragraph>
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
