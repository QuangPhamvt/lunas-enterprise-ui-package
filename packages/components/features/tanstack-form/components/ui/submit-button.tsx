import { Loader2 } from 'lucide-react';

export const SubmitButton: React.FC<
  React.ComponentProps<'button'> & {
    isSubmitting?: boolean;
  }
> = ({ isSubmitting, ...props }) => {
  return (
    <button
      {...props}
      type="button"
      data-loading={isSubmitting ? 'true' : undefined}
      style={
        {
          'corner-shape': 'squircle',
        } as React.CSSProperties
      }
      className="relative min-h-9.5 min-w-40 cursor-pointer rounded-xl border border-primary-strong bg-linear-to-b from-primary/60 to-primary px-4 py-2 font-semibold text-sm text-text-negative outline-none drop-shadow-[0_2px_4px_var(--primary)] transition-all hover:opacity-90 focus:border-transparent focus:ring-3 focus:ring-primary/80 focus:ring-offset-2 focus:drop-shadow-none disabled:pointer-events-none disabled:opacity-60 disabled:drop-shadow-none data-[loading=true]:pointer-events-none data-[loading=true]:opacity-80"
    >
      {isSubmitting ? (
        <Loader2 size={16} strokeWidth={3} className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10 animate-spin" />
      ) : (
        'Submit'
      )}
    </button>
  );
};
