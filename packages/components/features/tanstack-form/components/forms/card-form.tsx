'use client';

import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Separator } from '../ui/separator';

/**
 * Renders a card-style form section with a header, optional description, a delete button, and a content area for fields.
 *
 * @example
 * import { TanStackCardForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackCardForm
 *   title="Shipping Address"
 *   description="Where should we deliver your order?"
 *   onDelete={() => removeAddress(id)}
 * >
 *   <TextField name="street" />
 * </TanStackCardForm>
 */
export const TanStackCardForm: React.FC<
  React.PropsWithChildren<{
    /** Bold heading text shown at the top of the card. */
    title: string;
    /** Optional secondary text rendered beneath the title. */
    description?: string;
    /** When provided, renders a danger "Remove" button in the card's top-right corner. */
    onDelete?: () => void | Promise<void>;
  }>
> = ({ title, description, onDelete, children }) => {
  return (
    <section data-slot="card-form" className="relative flex flex-col rounded-md bg-card pb-4 shadow-card ring-1 ring-border">
      <div data-slot="card-form-header" className="flex flex-col space-y-0.5 px-4 py-3">
        <p className="font-semibold text-base tracking-tight">{title}</p>
        {!!description && <p className="text-text-positive-weak text-sm">{description}</p>}
      </div>
      <Separator />
      <div data-slot="card-form-main" className="flex flex-col py-4">
        {children}
      </div>
      {!!onDelete && (
        <Button
          color="danger"
          variant="ghost"
          size="sm"
          className="absolute top-2.5 right-3"
          onClick={e => {
            onDelete?.();
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Trash2Icon />
          Remove
        </Button>
      )}
    </section>
  );
};
