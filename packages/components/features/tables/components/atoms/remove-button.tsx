import { useCallback } from 'react';

import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const UITableRemoveButton: React.FC<{
  title?: string;
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
