'use client';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import type { SlashCommandItem } from './slash-command';

export interface SlashCommandMenuProps {
  items: SlashCommandItem[];
  command: (item: SlashCommandItem) => void;
}

export interface SlashCommandMenuHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

const SlashCommandMenu = forwardRef<SlashCommandMenuHandle, SlashCommandMenuProps>(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (items.length === 0) return false;
      if (event.key === 'ArrowDown') {
        setSelectedIndex(i => (i + 1) % items.length);
        return true;
      }
      if (event.key === 'ArrowUp') {
        setSelectedIndex(i => (i - 1 + items.length) % items.length);
        return true;
      }
      if (event.key === 'Enter') {
        const item = items[selectedIndex];
        if (item) command(item);
        return true;
      }
      return false;
    },
  }));

  if (items.length === 0) {
    return (
      <div data-slot="slash-command-menu" className="w-56 rounded-md border border-border bg-popover p-2 text-text-positive-weak text-xs shadow-dropdown">
        Không tìm thấy lệnh phù hợp
      </div>
    );
  }

  return (
    <div
      data-slot="slash-command-menu"
      role="listbox"
      aria-label="Lệnh chèn nhanh"
      className="max-h-72 w-56 overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-dropdown"
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            type="button"
            role="option"
            aria-selected={index === selectedIndex}
            onClick={() => command(item)}
            onMouseEnter={() => setSelectedIndex(index)}
            className={cn(
              'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm transition-colors',
              index === selectedIndex ? 'bg-primary-muted text-primary' : 'text-text-positive hover:bg-muted-muted'
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
});
SlashCommandMenu.displayName = 'SlashCommandMenu';

export { SlashCommandMenu };
