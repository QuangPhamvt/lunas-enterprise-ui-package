import { Separator } from '../ui/separator';

export const TanStackCardForm: React.FC<
  React.PropsWithChildren<{
    title: string;
    description?: string;
  }>
> = ({ title, description, children }) => {
  return (
    <section data-slot="card-form" className="flex flex-col rounded-md bg-card pb-4 shadow-card ring-3 ring-border-muted">
      <div data-slot="card-form-header" className="flex flex-col space-y-1 p-4">
        <p className="font-semibold text-lg">{title}</p>
        {!!description && <p className="text-muted text-sm">{description}</p>}
      </div>
      <Separator />
      <div data-slot="card-form-main" className="flex flex-col space-y-4 py-4">
        {children}
      </div>
    </section>
  );
};
