'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Paragraph } from '@/components/typography/paragraph';

import { DescriptionEmpty } from './empty';

export const DescriptionLongText: React.FC<{ content: string | null | undefined | number }> = ({ content }) => {
  if (content == null) return <DescriptionEmpty />;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Paragraph
          data-slot="description-longtext"
          variant="sm"
          className="line-clamp-2 cursor-pointer whitespace-pre-line break-all text-start text-sm underline decoration-dashed decoration-border-strong underline-offset-2"
        >
          {content}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start" className="h-fit min-w-48 max-w-80 pt-4">
        <div className="flex flex-col gap-y-2">
          <p className="whitespace-pre-line text-wrap break-keep">{content}</p>
          <p className="w-full text-end text-text-positive-subtle">{content.toString().length} chars</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
