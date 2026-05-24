import { useCallback } from 'react';

import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * A ghost danger icon button with a trash icon that triggers an async removal
 * handler; displays a descriptive tooltip on hover to confirm the action intent.
 *
 * @example
 * import { UITableRemoveButton } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableRemoveButton
 *   title="Remove member from project"
 *   onClick={async () => await deleteRow(rowId)}
 * />
 */
export const UITableRemoveButton: React.FC<{
  /** Tooltip label describing what will be removed; defaults to a generic message. */
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
        <Button type="button" variant="ghost" color="danger" size="icon" onClick={handleClick}>
          <Trash2Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{title || 'Remove item from list table'}</p>
      </TooltipContent>
    </Tooltip>
  );
};
