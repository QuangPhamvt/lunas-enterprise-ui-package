import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Paragraph } from '@/components/typography/paragraph';
import { UITableEmpty } from './empty';

/** Props for the {@link UITableNameDisplay} component. */
type NameDisplayProps = {
  /** The name string to display; renders an empty placeholder when falsy. */
  name?: string | null | undefined;
};

/**
 * Renders a clamped, truncated name string inside a tooltip that shows the full
 * text and character count on hover; falls back to {@link UITableEmpty} when the
 * value is absent.
 *
 * @example
 * import { UITableNameDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableNameDisplay name="John Doe" />
 */
export const UITableNameDisplay: React.FC<NameDisplayProps> = ({ name }) => {
  if (!name) return <UITableEmpty />;
  return (
    <Tooltip>
      <TooltipTrigger>
        <Paragraph variant="sm" className="line-clamp-2 w-full truncate text-wrap pb-px text-start">
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
