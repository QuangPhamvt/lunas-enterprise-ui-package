'use client';

import { Paragraph } from '../typography/paragraph';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type NameDisplayProps = {
  /** The full name string to display; shown truncated inline and in full via tooltip. */
  name: string;
};

/**
 * Renders a clamped, truncated name with a tooltip that reveals the complete text on hover.
 *
 * @example
 * ```tsx
 * import { NameDisplay } from '@customafk/lunas-ui/data-display/name';
 *
 * <NameDisplay name="Nguyễn Văn An" />
 * ```
 */
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
