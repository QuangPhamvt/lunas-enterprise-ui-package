'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { CheckIcon, ChevronDownIcon, PlusIcon, XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Command as CommandPrimitive, useCommandState } from 'cmdk';
import { Badge } from './badge';
import { comboboxVariants } from './combobox.variants';
import { Command, CommandGroup, CommandItem, CommandList } from './command';
import { inputVariants } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Spinner } from './spinner';
import { Button } from './button';

/** A single selectable/creatable option rendered in the `Combobox` dropdown. */
export interface ComboboxOption {
  /** Unique value used for selection, comparison, and de-duplication. */
  value: string;
  /** Human-readable label displayed in the dropdown and as a chip. */
  label: string;
  /** When true, the option cannot be selected. */
  disable?: boolean;
  /** When true, the resulting chip cannot be removed via the ×/Backspace and is excluded from "clear all". */
  fixed?: boolean;
  /** Group the options by providing a matching key. */
  [key: string]: string | boolean | undefined;
}

interface GroupOption {
  [key: string]: ComboboxOption[];
}

/** Props for the `Combobox` component. */
export interface ComboboxProps {
  /** Controlled list of currently selected options. */
  value?: ComboboxOption[];
  /** Initial selection when uncontrolled. */
  defaultValue?: ComboboxOption[];
  /** Fired whenever the selection changes. */
  onChange?: (options: ComboboxOption[]) => void;

  /** Manually controlled options. */
  options?: ComboboxOption[];
  /** Initial options pre-loaded into the dropdown (uncontrolled). */
  defaultOptions?: ComboboxOption[];
  /** Async search, called (debounced) whenever the typed query changes while the dropdown is open. */
  onSearch?: (query: string) => Promise<ComboboxOption[]>;
  /** Debounce delay in ms for `onSearch`. Defaults to 500. */
  delay?: number;
  /** Trigger `onSearch` as soon as the dropdown opens, even before typing. */
  triggerSearchOnFocus?: boolean;
  /** Group options in the dropdown by this option key. */
  groupBy?: string;

  /** Placeholder shown on the closed trigger (when nothing is selected) and in the search input. */
  placeholder?: string;
  disabled?: boolean;
  /** Visual color variant of the trigger box. Defaults to `'normal'`. */
  color?: 'normal' | 'danger';
  /** Size of the trigger box, chips, and dropdown text. Defaults to `'md'`. */
  size?: 'sm' | 'md' | 'lg';

  /** Full override of the loading row content, shown while `onSearch` is pending. */
  loadingIndicator?: React.ReactNode;
  /** Convenience text shown next to the default spinner while loading. Ignored if `loadingIndicator` is set. */
  loadingText?: string;

  /** Content shown when no options match the current query. Defaults to `'No results found.'`. Ignored while the creatable prompt is shown. */
  emptyIndicator?: React.ReactNode;

  /** Allow creating a new option when the typed query doesn't match any existing option. */
  creatable?: boolean;
  /** Explanatory hint rendered above the confirm button when no option matches the typed query (e.g. why this value isn't in the list). */
  createHint?: React.ReactNode | ((query: string) => React.ReactNode);
  /** Accessible label for the confirm button. Defaults to `Create "<query>"`. */
  createLabel?: string | ((query: string) => string);
  /** Fired when a new option is created via the creatable flow. */
  onCreateOption?: (query: string) => void;

  /** Maximum number of options that can be selected at once. */
  maxSelected?: number;
  /** Fired when a selection attempt exceeds `maxSelected`, with the configured cap. */
  onMaxSelected?: (max: number) => void;

  /** When true, already-selected options are removed from the dropdown instead of shown with a checkmark. */
  hideSelectedFromList?: boolean;

  /** Hide the "Clear Selected Input" action. */
  hideClearAllButton?: boolean;
  /** Fired after all (non-fixed) selections are cleared via "Clear Selected Input". */
  onClearAll?: () => void;
  /** Hide the search input's clear (×) button. */
  hideClearQueryButton?: boolean;
  /** Fired after the typed query is cleared via the search input's clear button. */
  onClearQuery?: () => void;

  className?: string;
  badgeClassName?: string;
  contentClassName?: string;
  /** Props forwarded to the underlying `Command` root. `value`/`onValueChange` are excluded — they control cmdk's internal highlighted-item tracking, not this component's selection. */
  commandProps?: Omit<React.ComponentPropsWithoutRef<typeof Command>, 'value' | 'onValueChange'>;
  /** Props forwarded to the underlying `CommandPrimitive.Input`. */
  inputProps?: Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>, 'value' | 'placeholder' | 'disabled'>;
}

/** Imperative handle exposed by `Combobox` via `ref`. */
export interface ComboboxRef {
  /** The currently selected options. */
  selectedValue: ComboboxOption[];
  /** The underlying search `<input>` DOM element. */
  input: HTMLInputElement;
  /** Programmatically open the dropdown and focus the search input. */
  focus: () => void;
  /** Clear all selected options. */
  reset: () => void;
  /** Clear the currently typed query without touching the selection. */
  clearQuery: () => void;
}

/** Shared handler that keeps the search input focused while interacting with a chip/button/row. */
function stopMouseDown(event: React.MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: ComboboxOption[], groupBy?: string) {
  if (options.length === 0) return {};
  if (!groupBy) return { '': options };

  const groupOption: GroupOption = {};
  options.forEach(option => {
    const key = (option[groupBy] as string) || '';
    if (!groupOption[key]) groupOption[key] = [];
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption: GroupOption, pickedValues: Set<string>) {
  const cloneOption: GroupOption = {};
  for (const [key, options] of Object.entries(groupOption)) {
    cloneOption[key] = options.filter(option => !pickedValues.has(option.value));
  }
  return cloneOption;
}

/** Cheap structural-equality check on option identity (by `value`, in order) — avoids `JSON.stringify` comparisons. */
function haveSameOptionValues(a: ComboboxOption[], b: ComboboxOption[]) {
  if (a.length !== b.length) return false;
  return a.every((option, index) => option.value === b[index]?.value);
}

/**
 * shadcn/ui's `CommandEmpty` doesn't render correctly inside a controlled/filtered `Command`, so
 * this re-implements `cmdk`'s own `Empty` primitive directly.
 *
 * @reference https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 */
const CommandEmpty = forwardRef<HTMLDivElement, React.ComponentProps<typeof CommandPrimitive.Empty>>(({ className, ...props }, forwardedRef) => {
  const render = useCommandState(state => state.filtered.count === 0);
  if (!render) return null;
  return <div ref={forwardedRef} className={cn('p-2.5 pt-1 text-center text-xs', className)} cmdk-empty="" role="presentation" {...props} />;
});
CommandEmpty.displayName = 'ComboboxCommandEmpty';

/**
 * A multi-select combobox: a closed trigger shows the current selection as removable chips (or a
 * placeholder) and toggles a popover on click; the popover holds a type-to-filter search input, an
 * optional async-loaded option list, and a creatable "custom input" prompt for values that don't
 * match any existing option.
 *
 * @example
 * ```tsx
 * import { Combobox } from '@customafk/lunas-ui/ui/combobox';
 *
 * const options = [
 *   { value: 'hokkaido', label: 'Hokkaido' },
 *   { value: 'aomori', label: 'Aomori' },
 * ];
 *
 * <Combobox
 *   options={options}
 *   placeholder="Search location…"
 *   creatable
 *   createHint="This location isn't registered yet — it will be added as a custom entry."
 *   onChange={(selected) => console.log(selected)}
 * />
 * ```
 */
export const Combobox = forwardRef<ComboboxRef, ComboboxProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      options: arrayOptions,
      defaultOptions: arrayDefaultOptions = [],
      onSearch,
      delay,
      triggerSearchOnFocus = false,
      groupBy,
      placeholder,
      disabled,
      color,
      size = 'md',
      loadingIndicator,
      loadingText,
      emptyIndicator,
      creatable = false,
      createHint,
      createLabel,
      onCreateOption,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hideSelectedFromList = false,
      hideClearAllButton = false,
      onClearAll,
      hideClearQueryButton = false,
      onClearQuery,
      className,
      badgeClassName,
      contentClassName,
      commandProps,
      inputProps,
    }: ComboboxProps,
    ref: React.Ref<ComboboxRef>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const searchRequestIdRef = useRef(0);
    const isMountedRef = useRef(true);

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [internalSelected, setInternalSelected] = useState<ComboboxOption[]>(defaultValue);
    const [options, setOptions] = useState<GroupOption>(transToGroupOption(arrayDefaultOptions, groupBy));
    const [inputValue, setInputValue] = useState('');

    const selected = value ?? internalSelected;
    const trimmedInputValue = inputValue.trim();
    const debouncedSearchTerm = useDebounce(inputValue, delay ?? 500);

    /** Notifies `onChange` unconditionally; only mirrors into local state when uncontrolled. */
    const setSelected = useCallback(
      (next: ComboboxOption[]) => {
        if (value === undefined) setInternalSelected(next);
        onChange?.(next);
      },
      [onChange, value]
    );

    useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current as HTMLInputElement,
        focus: () => {
          setOpen(true);
          inputRef.current?.focus();
        },
        reset: () => setSelected([]),
        clearQuery: () => setInputValue(''),
      }),
      [selected, setSelected]
    );

    useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);

    // Start each open with a blank query, so reopening always shows the full list first.
    useEffect(() => {
      if (!open) setInputValue('');
    }, [open]);

    const selectedValues = useMemo(() => new Set(selected.map(option => option.value)), [selected]);

    const handleUnselect = useCallback(
      (option: ComboboxOption) => {
        setSelected(selected.filter(s => s.value !== option.value));
      },
      [selected, setSelected]
    );

    const handleSelect = useCallback(
      (option: ComboboxOption) => {
        if (selectedValues.has(option.value)) {
          if (!option.fixed) handleUnselect(option);
          return;
        }
        if (selected.length >= maxSelected) {
          onMaxSelected?.(maxSelected);
          return;
        }
        setInputValue('');
        setSelected([...selected, option]);
      },
      [handleUnselect, maxSelected, onMaxSelected, selected, selectedValues, setSelected]
    );

    useEffect(() => {
      if (!arrayOptions || onSearch) return;
      setOptions(prev => {
        const prevFlat = Object.values(prev).flat();
        return haveSameOptionValues(arrayOptions, prevFlat) ? prev : transToGroupOption(arrayOptions, groupBy);
      });
    }, [arrayOptions, groupBy, onSearch]);

    useEffect(() => {
      const exec = async () => {
        if (!onSearch || !open) return;
        if (!triggerSearchOnFocus && !debouncedSearchTerm) return;

        const requestId = ++searchRequestIdRef.current;
        setIsLoading(true);
        const res = await onSearch(debouncedSearchTerm);
        if (!isMountedRef.current || requestId !== searchRequestIdRef.current) return;
        setOptions(transToGroupOption(res, groupBy));
        setIsLoading(false);
      };
      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus, onSearch]);

    const selectables = useMemo<GroupOption>(
      () => (hideSelectedFromList ? removePickedOption(options, selectedValues) : options),
      [hideSelectedFromList, options, selectedValues]
    );

    const showCreatePrompt = useMemo(() => {
      if (!creatable || !trimmedInputValue || isLoading) return false;

      const normalizedQuery = trimmedInputValue.toLowerCase();
      const matchesExisting = Object.values(options).some(group => group.some(o => o.label.toLowerCase() === normalizedQuery));
      const matchesSelected = selected.some(s => s.label.toLowerCase() === normalizedQuery);
      return !matchesExisting && !matchesSelected;
    }, [creatable, trimmedInputValue, isLoading, options, selected]);

    const resolvedCreateLabel = typeof createLabel === 'function' ? createLabel(trimmedInputValue) : (createLabel ?? `Create "${trimmedInputValue}"`);
    const resolvedCreateHint = typeof createHint === 'function' ? createHint(trimmedInputValue) : createHint;

    const handleCreateOption = useCallback(() => {
      if (selected.length >= maxSelected) {
        onMaxSelected?.(maxSelected);
        return;
      }
      const query = trimmedInputValue;
      setInputValue('');
      setSelected([...selected, { value: query, label: query }]);
      onCreateOption?.(query);
      setOpen(false);
    }, [trimmedInputValue, maxSelected, onCreateOption, onMaxSelected, selected, setSelected]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (!input) return;

        if ((e.key === 'Delete' || e.key === 'Backspace') && input.value === '' && selected.length > 0) {
          const lastSelectOption = selected[selected.length - 1];
          if (!lastSelectOption.fixed) handleUnselect(lastSelectOption);
        }

        if (e.key === 'Enter' && showCreatePrompt) {
          e.preventDefault();
          handleCreateOption();
        }
      },
      [handleCreateOption, handleUnselect, selected, showCreatePrompt]
    );

    const hasClearableSelection = selected.some(s => !s.fixed);

    return (
      <Popover open={open} onOpenChange={next => !disabled && setOpen(next)}>
        <PopoverTrigger asChild>
          <div
            data-slot="combobox-trigger"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : 0}
            className={cn(
              comboboxVariants({ color, size }),
              selected.length !== 0 && 'p-1',
              !disabled && 'cursor-pointer',
              disabled && 'pointer-events-none',
              className
            )}
            onKeyDown={e => {
              if (disabled) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen(o => !o);
              }
            }}
          >
            {selected.length === 0 && <span className="flex-1 truncate px-3 py-2 text-text-positive-muted">{placeholder}</span>}

            {selected.map(option => (
              <Badge
                key={option.value}
                data-slot="combobox-chip"
                data-fixed={option.fixed || undefined}
                variant="soft"
                color={color === 'danger' ? 'danger' : 'secondary'}
                size={size}
                pill={false}
                className={cn('gap-1 text-xs bg-muted-muted font-normal', disabled && 'opacity-50', badgeClassName)}
              >
                {option.label}
                {!option.fixed && !disabled && (
                  <button
                    type="button"
                    data-slot="combobox-chip-remove"
                    aria-label={`Remove ${option.label}`}
                    onMouseDown={stopMouseDown}
                    onClick={e => {
                      e.stopPropagation();
                      handleUnselect(option);
                    }}
                    className="ms-0.5 -me-0.5 rounded-sm outline-hidden hover:text-text-positive text-text-positive-muted"
                  >
                    <XIcon size={12} strokeWidth={2} aria-hidden="true" />
                  </button>
                )}
              </Badge>
            ))}

            <ChevronDownIcon
              size={16}
              aria-hidden="true"
              className={cn('ms-auto me-2 shrink-0 text-text-positive-muted transition-transform', open && 'rotate-180')}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent align="start" data-slot="combobox-content" className={cn('w-(--radix-popover-trigger-width) p-0', contentClassName)}>
          <Command
            {...commandProps}
            onKeyDown={e => {
              handleKeyDown(e);
              commandProps?.onKeyDown?.(e);
            }}
            data-slot="combobox"
            className={cn('overflow-visible bg-white', commandProps?.className)}
            shouldFilter={commandProps?.shouldFilter ?? !onSearch}
          >
            {!hideClearAllButton && hasClearableSelection && (
              <Button
                type="button"
                data-slot="combobox-clear-all"
                tabIndex={-1}
                size="xs"
                variant="ghost"
                color="muted"
                className="w-fit mt-1 font-normal hover:text-text-positive"
                onMouseDown={stopMouseDown}
                onClick={() => {
                  const remaining = selected.filter(s => s.fixed);
                  setSelected(remaining);
                  onClearAll?.();
                }}
              >
                <XIcon size={10} strokeWidth={2} aria-hidden="true" className="size-3!" />
                Clear Selected Input
              </Button>
            )}

            <div data-slot="combobox-search" className="relative px-2.5 pt-2.5 pb-1 border-t border-t-border">
              <CommandPrimitive.Input
                {...inputProps}
                ref={inputRef}
                data-slot="combobox-input"
                value={inputValue}
                onValueChange={val => {
                  setInputValue(val);
                  inputProps?.onValueChange?.(val);
                }}
                placeholder={placeholder}
                className={cn(inputVariants({ size: 'sm' }), 'pe-8', inputProps?.className)}
              />
              {!hideClearQueryButton && inputValue.length > 0 && (
                <button
                  type="button"
                  data-slot="combobox-clear-query"
                  aria-label="Clear search"
                  onMouseDown={stopMouseDown}
                  onClick={() => {
                    setInputValue('');
                    onClearQuery?.();
                    inputRef.current?.focus();
                  }}
                  className="absolute inset-y-6 inset-e-4 flex items-center justify-center text-text-positive-muted transition-colors hover:text-text-positive"
                >
                  <XIcon size={14} strokeWidth={2} aria-hidden="true" />
                </button>
              )}
            </div>

            <CommandList data-slot="combobox-list" className="shadow-lg outline-hidden" onMouseDown={e => e.preventDefault()}>
              {isLoading ? (
                <div data-slot="combobox-loading" className="flex items-center justify-center gap-2 px-2 py-6 text-sm text-text-positive-muted">
                  {loadingIndicator ?? (
                    <>
                      <Spinner className="size-4" />
                      {loadingText}
                    </>
                  )}
                </div>
              ) : showCreatePrompt ? (
                <div data-slot="combobox-create" className="flex flex-col gap-2 p-3">
                  {resolvedCreateHint && <p className="pe-10 text-text-positive-weak text-xs">{resolvedCreateHint}</p>}
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      data-slot="combobox-create-confirm"
                      aria-label={resolvedCreateLabel}
                      size="xs"
                      variant="outline"
                      color="muted"
                      onMouseDown={stopMouseDown}
                      onClick={handleCreateOption}
                    >
                      <PlusIcon />
                      Thêm mới
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <CommandEmpty data-slot="combobox-empty">
                    <div className="bg-muted-muted size-full min-h-14 flex items-center justify-center">{emptyIndicator ?? 'No results found.'}</div>
                  </CommandEmpty>

                  {/* Absorbs cmdk's default "auto-highlight the first item" behavior so opening the
                      dropdown with no typed query doesn't silently arm Enter to toggle a real option. */}
                  <CommandItem value="__combobox-first-item-guard__" className="hidden" aria-hidden="true" />

                  {Object.entries(selectables).map(([key, groupOptions]) => (
                    <CommandGroup key={key} heading={key || undefined} value={key || '__combobox-options__'}>
                      {groupOptions.map(option => {
                        const picked = selectedValues.has(option.value);
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            keywords={[option.label]}
                            disabled={option.disable}
                            data-picked={picked || undefined}
                            onMouseDown={stopMouseDown}
                            onSelect={() => handleSelect(option)}
                            className={cn(
                              'cursor-pointer justify-between',
                              option.disable && 'cursor-not-allowed opacity-50',
                              picked && 'bg-primary-bg-subtle! text-primary!'
                            )}
                          >
                            {option.label}
                            {picked && (
                              <>
                                <CheckIcon size={14} className="ms-auto text-primary" aria-hidden="true" />
                                <span className="sr-only">, selected</span>
                              </>
                            )}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ))}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = 'Combobox';
