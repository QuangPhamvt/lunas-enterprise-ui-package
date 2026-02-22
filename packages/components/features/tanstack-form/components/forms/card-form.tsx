import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Separator } from '../ui/separator';

export const TanStackCardForm: React.FC<
  React.PropsWithChildren<{
    title: string;
    description?: string;
    onDelete?: () => void | Promise<void>;
  }>
> = ({ title, description, onDelete, children }) => {
  return (
    <section data-slot="card-form" className="relative flex flex-col rounded-md bg-card pb-4 shadow-card ring-4 ring-border-weak">
      <div data-slot="card-form-header" className="flex flex-col space-y-1 p-4">
        <p className="font-semibold text-lg">{title}</p>
        {!!description && <p className="text-muted text-sm">{description}</p>}
      </div>
      <Separator />
      <div data-slot="card-form-main" className="flex flex-col space-y-4 py-4">
        {children}
      </div>
      {!!onDelete && (
        <Button
          color="danger"
          variant="outline"
          size="sm"
          className="absolute top-2 right-2"
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
