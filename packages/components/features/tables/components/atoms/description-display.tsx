import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { UITableEmpty } from './empty';
import { Paragraph } from '@/components/typography/paragraph';

/**
 * Renders a two-line-clamped description in a table cell with a tooltip that
 * reveals the full text and its character count; falls back to
 * {@link UITableEmpty} when `content` is `null` or `undefined`.
 *
 * @example
 * import { UITableDescriptionDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableDescriptionDisplay content="A detailed description of this record." />
 */
export const UITableDescriptionDisplay: React.FC<{
  /** The text or numeric value to display; `null`/`undefined` renders an empty state. */
  content: string | null | undefined | number;
}> = ({ content }) => {
  if (content === undefined || content === null) {
    return <UITableEmpty />;
  }
  return (
    <Tooltip>
      <TooltipTrigger>
        <Paragraph variant="sm" className="line-clamp-2 whitespace-pre-line break-all">
          {content}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start" className="h-fit min-w-48 max-w-80 pt-4">
        <div className="flex flex-col gap-y-2">
          <Paragraph variant="xs" className="whitespace-pre-line text-wrap break-keep text-text-negative-weak">
            {content}
          </Paragraph>
          <p className="w-full text-end">{content.toString().length} chars</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
