'use client';

import { useId, useState } from 'react';

import { useSelector } from '@tanstack/react-store';

import { useIsMobile } from '@customafk/react-toolkit/hooks/useMobile';
import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useTanStackFieldContext } from '../../tanstack-form';
import { FieldError } from '../ui/field';

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options: Array<{ value: string; label: string }>;
};

export const SimpleComboboxField: React.FC<Props> = ({ label, placeholder, required, disabled, options }) => {
  const id = useId();
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const isSubmitting = useSelector(form.store, ({ isSubmitting }) => isSubmitting);
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const _invalid = state.meta.isTouched && !state.meta.isValid;
  const isDisabled = disabled || isSubmitting;

  const selectedLabel = options.find(({ value }) => value === state.value)?.label;

  const commandList = (
    <Command>
      <CommandInput placeholder={placeholder ?? 'Tìm kiếm…'} />
      <CommandList>
        <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
        <CommandGroup>
          {options.map(option => (
            <CommandItem
              key={option.value}
              value={option.label}
              onSelect={() => {
                handleChange(option.value === state.value ? null : option.value);
                setDrawerOpen(false);
              }}
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <span className="text-danger-strong">*</span>}
          </Label>
        )}
        <Button
          id={id}
          type="button"
          variant="outline"
          color="muted"
          disabled={isDisabled}
          aria-invalid={_invalid}
          className={cn(
            'w-full justify-start font-normal outline-1 outline-border -outline-offset-1',
            !state.value && 'text-text-positive-muted',
            _invalid && 'outline-danger bg-danger-bg-subtle'
          )}
          onBlur={handleBlur}
          onClick={() => setDrawerOpen(true)}
        >
          {selectedLabel ?? <span className="text-text-positive-muted">{placeholder}</span>}
        </Button>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{label ?? placeholder ?? 'Tìm kiếm…'}</DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto pb-safe-bottom">{commandList}</div>
          </DrawerContent>
        </Drawer>

        {_invalid && <FieldError errors={state.meta.errors} />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-danger-strong">*</span>}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            color="muted"
            size="lg"
            disabled={isDisabled}
            aria-invalid={_invalid}
            className={cn(
              'flex w-full items-center justify-start rounded outline-border font-normal',
              'hover:bg-transparent',
              'focus:outline-1 focus:outline-primary-strong focus:ring-4 focus:ring-primary-weak',
              'data-[state=open]:outline-1 data-[state=open]:outline-primary-strong data-[state=open]:ring-4 data-[state=open]:ring-primary-weak',
              !state.value && 'text-text-positive-muted'
            )}
          >
            {selectedLabel ?? <span className="text-text-positive-muted">{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" side="bottom" className="w-[--radix-popover-trigger-width] p-0 rounded" onBlur={handleBlur}>
          {commandList}
        </PopoverContent>
      </Popover>
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
