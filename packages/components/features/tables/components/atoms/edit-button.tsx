import { useCallback } from 'react';

import { PencilIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * A ghost icon button with a pencil icon that triggers an async edit handler;
 * displays a descriptive tooltip on hover. Intended for use in table row action columns.
 *
 * @example
 * import { UITableEditButton } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableEditButton
 *   title="Edit employee details"
 *   onClick={async () => await openEditModal(rowId)}
 * />
 */
export const UITableEditButton: React.FC<{
  /** Tooltip label describing what will be edited; defaults to a generic message. */
  title?: string;
  /** Async-compatible callback invoked when the button is clicked. */
  onClick?: () => void | Promise<void>;
}> = ({ title, onClick }) => {
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async e => {
      e.preventDefault();
      e.stopPropagation();
      await onClick?.();
    },
    [onClick]
  );
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button type="button" variant="ghost" color="secondary" size="icon" onClick={handleClick}>
          <PencilIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{title || 'Edit item'}</p>
      </TooltipContent>
    </Tooltip>
  );
};
