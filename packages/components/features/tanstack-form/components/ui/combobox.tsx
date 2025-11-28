import { PackageSearchIcon, PlusIcon, XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Command } from 'cmdk';
import { Popover as PopoverPrimitive, Separator } from 'radix-ui';

const Combobox: React.FC<React.ComponentProps<typeof PopoverPrimitive.Root>> = ({ children, ...props }) => {
  return (
    <PopoverPrimitive.Root data-slot="combobox" {...props}>
      {children}
    </PopoverPrimitive.Root>
  );
};

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

const ComboboxValue: React.FC<React.ComponentProps<'div'>> = ({ children }) => {
  return <div>asdasd</div>;
};

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

const ComboboxCommand: React.FC<React.ComponentProps<typeof Command>> = ({ className, children, ...props }) => {
  return (
    <Command {...props} className={cn('flex size-full flex-col', className)}>
      {children}
    </Command>
  );
};

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

const ComboboxGroup: React.FC<React.ComponentProps<typeof Command.Group>> = ({ children, ...props }) => {
  return (
    <Command.Group data-slot="combobox-group" {...props} className="flex flex-col overflow-hidden p-1">
      {children}
    </Command.Group>
  );
};

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

const ComboboxList: React.FC<React.ComponentProps<'div'>> = ({ children, ...props }) => {
  return (
    <Command.List data-slot="combobox-list" {...props} className="max-h-80 overflow-y-auto overflow-x-hidden">
      {children}
    </Command.List>
  );
};

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
