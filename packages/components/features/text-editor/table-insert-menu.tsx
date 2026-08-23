'use client';

import { useCallback, useState } from 'react';

import { Table as TableIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import type { Editor } from '@tiptap/react';
import { ToolbarButton } from './toolbar-primitives';

export interface TableInsertMenuProps {
  editor: Editor;
}

const GRID_SIZE = 6;

function TableInsertMenu({ editor }: TableInsertMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState({ rows: 0, cols: 0 });

  const handleInsert = useCallback(
    (rows: number, cols: number) => {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
      setIsOpen(false);
    },
    [editor]
  );

  return (
    <Popover
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        if (!open) setHovered({ rows: 0, cols: 0 });
      }}
    >
      <PopoverTrigger asChild>
        <ToolbarButton title="Chèn bảng" aria-label="Chèn bảng" data-slot="toolbar-table-button">
          <TableIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent data-slot="table-insert-menu" sideOffset={6} align="start" className="w-auto p-3">
        <p className="mb-2 font-medium text-text-positive-strong text-xs">
          {hovered.rows > 0 ? `Bảng ${hovered.rows} × ${hovered.cols}` : 'Chọn kích thước bảng'}
        </p>
        <div className="grid grid-cols-6 gap-1" onMouseLeave={() => setHovered({ rows: 0, cols: 0 })}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
            const row = Math.floor(i / GRID_SIZE) + 1;
            const col = (i % GRID_SIZE) + 1;
            const active = row <= hovered.rows && col <= hovered.cols;
            return (
              <button
                key={`${row}-${col}`}
                type="button"
                aria-label={`Bảng ${row} hàng, ${col} cột`}
                onMouseEnter={() => setHovered({ rows: row, cols: col })}
                onClick={() => handleInsert(row, col)}
                className={cn('h-4 w-4 rounded-sm border border-border', active ? 'border-primary bg-primary-muted' : 'bg-muted-muted/40')}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { TableInsertMenu };
