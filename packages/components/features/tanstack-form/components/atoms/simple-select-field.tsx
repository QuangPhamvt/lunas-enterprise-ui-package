'use client';

import { useId, useState } from 'react';

import { PackagePlusIcon } from 'lucide-react';

import { useIsMobile } from '@customafk/react-toolkit/hooks/useMobile';
import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useTanStackFieldContext } from '../form-context';
import { FieldError } from '../ui/field';

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
};

export const SimpleSelectField: React.FC<Props> = ({ label, placeholder, required, options }) => {
  const id = useId();
  const { state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const _invalid = state.meta.isTouched && !state.meta.isValid;
  const selectedLabel = options.find(o => o.value === state.value)?.label;

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
          className={cn(
            'w-full justify-start font-normal outline-1 outline-border -outline-offset-1',
            !state.value && 'text-text-positive-muted',
            _invalid && 'outline-danger bg-danger-bg-subtle'
          )}
          aria-invalid={_invalid}
          onBlur={handleBlur}
          onClick={() => setDrawerOpen(true)}
        >
          {selectedLabel ?? <span className="text-text-positive-muted">{placeholder}</span>}
        </Button>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{label ?? placeholder ?? 'Select an option'}</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col overflow-y-auto pb-safe-bottom">
              {options.length > 0 ? (
                options.map(option => (
                  <DrawerClose key={option.value} asChild>
                    <button
                      type="button"
                      className={cn(
                        'flex w-full items-center px-4 py-3 text-left text-sm transition-colors',
                        'hover:bg-muted-muted active:bg-muted-muted',
                        state.value === option.value && 'bg-primary-bg-subtle font-medium text-primary'
                      )}
                      onClick={() => {
                        handleChange(option.value);
                        setDrawerOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  </DrawerClose>
                ))
              ) : (
                <div className="flex items-center justify-center gap-x-2 px-4 py-8 text-center text-sm text-text-positive-weak">
                  <PackagePlusIcon strokeWidth={1} />
                  No options available
                </div>
              )}
            </div>
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
      <Select value={state.value ?? ''} onValueChange={handleChange}>
        <SelectTrigger id={id} aria-invalid={_invalid ? 'true' : undefined} onBlur={handleBlur}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length > 0 ? (
            options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="flex items-center justify-center gap-x-2 rounded border border-border bg-muted-muted px-4 py-6.5 text-center text-sm text-text-positive-weak">
              <PackagePlusIcon strokeWidth={1} />
              No options available
            </div>
          )}
        </SelectContent>
      </Select>
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
