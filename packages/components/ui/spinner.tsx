import { Loader2Icon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

/**
 * Spinning loading indicator rendered as an animated `Loader2Icon` SVG with an accessible `role="status"` and `aria-label`.
 *
 * @example
 * ```tsx
 * import { Spinner } from '@customafk/lunas-ui/ui/spinner';
 *
 * <Spinner className="size-6 text-primary" />
 *
 * <Button disabled>
 *   <Spinner /> Saving…
 * </Button>
 * ```
 */
function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return <Loader2Icon role="status" aria-label="Loading" className={cn('size-4 animate-spin', className)} {...props} />;
}

export { Spinner };
