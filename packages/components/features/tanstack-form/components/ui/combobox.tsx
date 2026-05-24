import { PackageSearchIcon, PlusIcon, XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Command } from 'cmdk';
import { Popover as PopoverPrimitive, Separator } from 'radix-ui';

/**
 * Root combobox wrapper built on Radix UI Popover; manages open/close state and provides context to sub-components.
 *
 * @example
 * import { Combobox, ComboboxTrigger, ComboboxContent, ComboboxCommand, ComboboxInput, ComboboxList, ComboboxItem } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <Combobox>
 *   <ComboboxTrigger>Select an option</ComboboxTrigger>
 *   <ComboboxContent>
 *     <ComboboxCommand>
 *       <ComboboxInput placeholder="Search…" />
 *       <ComboboxList>
 *         <ComboboxItem value="a">Option A</ComboboxItem>
 *       </ComboboxList>
 *     </ComboboxCommand>
 *   </ComboboxContent>
 * </Combobox>
 */
const Combobox: React.FC<React.ComponentProps<typeof PopoverPrimitive.Root>> = ({ children, ...props }) => {
  return (
    <PopoverPrimitive.Root data-slot="combobox" {...props}>
      {children}
    </PopoverPrimitive.Root>
  );
};

/**
 * Clickable trigger element that toggles the combobox dropdown, styled with focus-ring and open-state outline.
 *
 * @example
 * import { ComboboxTrigger } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxTrigger>Pick a country</ComboboxTrigger>
 */
const ComboboxTrigger: React.FC<React.ComponentProps<typeof PopoverPrimitive.Trigger>> = ({ children, className, ...props }) => {
  return (
    <PopoverPrimitive.Trigger
      data-slot="combobox-trigger"
      {...props}
      className={cn(
        'flex w-full flex-wrap justify-start rounded px-2.5 py-2 transition-all',
        '-outline-offset-1 outline-1 outline-border',
        'data-[state=open]:outline-primary-strong',
        'data-[state=open]:ring-4',
        'data-[state=open]:ring-primary-weak',
        className
      )}
    >
      {children}
    </PopoverPrimitive.Trigger>
  );
};

/**
 * Animated dropdown panel rendered in a portal, aligned to the trigger width with enter/exit transitions.
 *
 * @example
 * import { ComboboxContent } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxContent align="start">…</ComboboxContent>
 */
const ComboboxContent: React.FC<React.ComponentProps<typeof PopoverPrimitive.Content>> = ({ className, align = 'start', children, ...props }) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="combobox-content"
        align={align}
        sideOffset={4}
        {...props}
        className={cn(
          'relative z-50 flex flex-col bg-popover',
          'rounded shadow-dropdown outline-none',
          'min-w-(--radix-popover-trigger-width)',
          'max-h-(--radix-popover-content-available-height)',
          'origin-(--radix-popover-content-transform-origin)',
          'data-[state=open]:animate-in',
          'data-[state=open]:fade-in-0',
          'data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0',
          'data-[state=closed]:zoom-out-95',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          className
        )}
      >
        {children}
        <PopoverPrimitive.Arrow className="fill-popover" />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

/**
 * Placeholder display area for the currently selected combobox value.
 *
 * @example
 * import { ComboboxValue } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxValue>{selectedLabel}</ComboboxValue>
 */
const ComboboxValue: React.FC<React.ComponentProps<'div'>> = ({ children }) => {
  return <div>asdasd</div>;
};

/**
 * Toolbar row with "Clear" and "Add Item" action buttons rendered at the top of the dropdown.
 *
 * @example
 * import { ComboboxActions } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxActions />
 */
const ComboboxActions: React.FC<React.ComponentProps<'div'>> = ({ children, ...props }) => {
  return (
    <div className="flex items-center justify-between px-3 pt-1.5 pb-1 text-text-positive-weak text-xs" {...props}>
      <button type="button" className="flex cursor-pointer items-center outline-none hover:text-text-positive [&>svg]:size-3">
        <XIcon />
        Clear
      </button>
      <button type="button" className="flex cursor-pointer items-center outline-none hover:text-text-positive [&>svg]:size-3">
        <PlusIcon />
        Add Item
      </button>
    </div>
  );
};

/**
 * `cmdk` Command root that provides keyboard-navigable filtering logic for the combobox item list.
 *
 * @example
 * import { ComboboxCommand } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxCommand>
 *   <ComboboxInput placeholder="Search…" />
 *   <ComboboxList>…</ComboboxList>
 * </ComboboxCommand>
 */
const ComboboxCommand: React.FC<React.ComponentProps<typeof Command>> = ({ className, children, ...props }) => {
  return (
    <Command {...props} className={cn('flex size-full flex-col', className)}>
      {children}
    </Command>
  );
};

/**
 * Padded search input wired into the `cmdk` Command context for real-time item filtering.
 *
 * @example
 * import { ComboboxInput } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxInput placeholder="Search countries…" />
 */
const ComboboxInput: React.FC<React.ComponentProps<typeof Command.Input>> = ({ ...props }) => {
  return (
    <div className="p-2">
      <Command.Input
        data-slot="combobox-input"
        className="flex w-full rounded border border-border bg-transparent px-3 py-1 text-sm outline-hidden transition-all placeholder:text-text-positive-muted focus-visible:border-primary-strong focus-visible:ring-4 focus-visible:ring-primary-weak disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
    </div>
  );
};

/**
 * Empty state panel shown by `cmdk` when no items match the current search query.
 *
 * @example
 * import { ComboboxEmpty } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxEmpty>No results found.</ComboboxEmpty>
 */
const ComboboxEmpty: React.FC<React.ComponentProps<'div'>> = ({ ...props }) => {
  return (
    <Command.Empty data-slot="combobox-empty" {...props} className="p-1 pt-0">
      <div className="flex h-40 items-center justify-center space-x-2 rounded border border-border bg-muted-muted px-6 text-sm text-text-positive-weak">
        <PackageSearchIcon size={32} strokeWidth={1} />
        <p>No results found.</p>
      </div>
    </Command.Empty>
  );
};

/**
 * Logical grouping container for a set of related `ComboboxItem` elements within the list.
 *
 * @example
 * import { ComboboxGroup } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxGroup heading="Fruits">
 *   <ComboboxItem value="apple">Apple</ComboboxItem>
 * </ComboboxGroup>
 */
const ComboboxGroup: React.FC<React.ComponentProps<typeof Command.Group>> = ({ children, ...props }) => {
  return (
    <Command.Group data-slot="combobox-group" {...props} className="flex flex-col overflow-hidden p-1">
      {children}
    </Command.Group>
  );
};

/**
 * Individual selectable row inside a `ComboboxList`, highlighted on keyboard or pointer selection.
 *
 * @example
 * import { ComboboxItem } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxItem value="react">React</ComboboxItem>
 */
const ComboboxItem: React.FC<React.ComponentProps<typeof Command.Item>> = ({ children, className, ...props }) => {
  return (
    <Command.Item
      data-slot="combobox-item"
      tabIndex={0}
      {...props}
      className={cn(
        'relative flex cursor-pointer select-none items-center px-2.5 py-2 text-sm outline-hidden transition-all duration-150',
        'data-[selected=true]:bg-muted-muted',
        'data-[selected=true]:text-text-positive-strong',
        'data-[disabled=true]:opacity-50',
        'data-[disabled=true]:pointer-events-none',
        className
      )}
    >
      {children}
    </Command.Item>
  );
};

/**
 * Scrollable container that wraps all `ComboboxItem` / `ComboboxGroup` children with a max-height overflow scroll.
 *
 * @example
 * import { ComboboxList } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxList>
 *   <ComboboxItem value="a">Option A</ComboboxItem>
 * </ComboboxList>
 */
const ComboboxList: React.FC<React.ComponentProps<'div'>> = ({ children, ...props }) => {
  return (
    <Command.List data-slot="combobox-list" {...props} className="max-h-80 overflow-y-auto overflow-x-hidden">
      {children}
    </Command.List>
  );
};

/**
 * Thin horizontal rule used to visually separate sections within a combobox dropdown.
 *
 * @example
 * import { ComboboxSeparator } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <ComboboxSeparator />
 */
const ComboboxSeparator: React.FC<React.ComponentProps<typeof Separator.Root>> = ({ ...props }) => {
  return <Separator.Root data-slot="combobox-separator" {...props} className="h-px w-full bg-border-weak" />;
};

export {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxValue,
  ComboboxActions,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxCommand,
  ComboboxGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
};
