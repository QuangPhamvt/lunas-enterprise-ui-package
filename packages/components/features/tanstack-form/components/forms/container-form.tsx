import { cn } from '@customafk/react-toolkit/utils';

/**
 * Wraps a set of TanStack form sections in a vertically-stacked flex container.
 *
 * @example
 * import { TanStackContainerForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackContainerForm>
 *   <TanStackSectionForm title="Personal Info">
 *     {/* fields *\/}
 *   </TanStackSectionForm>
 * </TanStackContainerForm>
 */
export const TanStackContainerForm: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <div data-slot="section-form" className={cn('flex flex-col space-y-4', className)}>
      {children}
    </div>
  );
};
