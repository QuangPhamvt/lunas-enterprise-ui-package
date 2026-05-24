'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Paragraph } from '@/components/typography/paragraph';

import { DescriptionEmpty } from './empty';

export const DescriptionName: React.FC<{
  name?: string | null | undefined;
}> = ({ name }) => {
  if (!name) return <DescriptionEmpty />;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Paragraph
          data-slot="description-name"
          variant="sm"
          className="line-clamp-2 w-full cursor-pointer truncate underline decoration-dashed decoration-border-strong underline-offset-2"
        >
          {name}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start" className="h-fit min-w-48 max-w-80 pt-4">
        <div className="flex flex-col gap-y-2">
          <p className="whitespace-pre-line text-wrap break-keep">{name}</p>
          <p className="w-full text-end text-text-positive-subtle">{name.length} chars</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
