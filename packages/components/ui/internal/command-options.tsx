'use client';

import { useEffect, useState } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type Command as CommandPrimitive, useCommandState } from 'cmdk';

/**
 * Shared plumbing for the cmdk-based multi-value pickers (`Combobox`, `MultipleSelector`):
 * option grouping, picked-option filtering, a debounced search value and a working `CommandEmpty`.
 * Internal — not part of the public package API.
 */

/** Minimal shape both pickers' option types satisfy. */
export type SelectableOption = { value: string; [key: string]: string | boolean | undefined };

/** Options bucketed by their `groupBy` key (`''` when ungrouped). */
export type GroupedOptions<TOption extends SelectableOption> = Record<string, TOption[]>;

/** Returns `value`, updated only after `delay` ms (default 500) without further changes. */
export function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/** Buckets `options` by the value of their `groupBy` field; everything lands under `''` without one. */
export function groupOptions<TOption extends SelectableOption>(options: TOption[], groupBy?: string): GroupedOptions<TOption> {
  if (options.length === 0) return {};
  if (!groupBy) return { '': options };

  const grouped: GroupedOptions<TOption> = {};
  for (const option of options) {
    const key = (option[groupBy] as string) || '';
    grouped[key] ??= [];
    grouped[key].push(option);
  }
  return grouped;
}

/** Copy of `grouped` without the options whose `value` is in `pickedValues` (O(n), no deep clone). */
export function removePickedOptions<TOption extends SelectableOption>(
  grouped: GroupedOptions<TOption>,
  pickedValues: ReadonlySet<string>
): GroupedOptions<TOption> {
  const result: GroupedOptions<TOption> = {};
  for (const [key, options] of Object.entries(grouped)) {
    result[key] = options.filter(option => !pickedValues.has(option.value));
  }
  return result;
}

/**
 * shadcn/ui's `CommandEmpty` doesn't render inside a controlled/filtered `Command`, so this
 * re-implements cmdk's own `Empty` primitive.
 *
 * @see https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 */
export const CommandEmpty = ({ className, ref, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
  const render = useCommandState(state => state.filtered.count === 0);
  if (!render) return null;
  return <div ref={ref} className={cn('text-center', className)} cmdk-empty="" role="presentation" {...props} />;
};
CommandEmpty.displayName = 'CommandEmpty';
