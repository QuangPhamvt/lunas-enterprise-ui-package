'use client';
import { Activity, memo, useCallback } from 'react';

import { EllipsisVerticalIcon, MoveLeftIcon, MoveRightIcon, PinOffIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { TUITableHeadCellOption } from '../../types';
import { tableHeadCellOptionTriggerVariants } from '../table.variants';

export const UITableHeadCellOption = memo<TUITableHeadCellOption>(({ isPinned, onLeftPin, onRightPin, onUnpin, className }) => {
  const handleLeftPin = useCallback(() => {
    onLeftPin?.('left');
  }, [onLeftPin]);

  const handleRightPin = useCallback(() => {
    onRightPin?.('right');
  }, [onRightPin]);

  const handleUnpin = useCallback(() => {
    onUnpin?.(false);
  }, [onUnpin]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={cn(tableHeadCellOptionTriggerVariants(), className)}>
          <EllipsisVerticalIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-4">
        <DropdownMenuGroup className="*:data-[slot=dropdown-menu-item]:rounded-xs *:data-[slot=dropdown-menu-item]:p-2">
          <Activity mode={isPinned ? 'visible' : 'hidden'}>
            <DropdownMenuItem onClick={handleUnpin}>
              {!!isPinned && 'Unpin'}
              <DropdownMenuShortcut>
                <PinOffIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Activity>
          <Activity mode={!isPinned ? 'visible' : 'hidden'}>
            <DropdownMenuItem onClick={handleLeftPin}>
              {isPinned ? 'Unpin' : 'Pin to Left'}
              <DropdownMenuShortcut>
                <MoveLeftIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRightPin}>
              {isPinned ? 'Unpin' : 'Pin to Right'}
              <DropdownMenuShortcut>
                <MoveRightIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Activity>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
UITableHeadCellOption.displayName = 'UITableHeadCellOption';
