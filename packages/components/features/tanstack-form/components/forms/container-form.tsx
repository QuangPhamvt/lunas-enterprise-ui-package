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
export const TanStackContainerForm: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div data-slot="section-form" className="flex flex-col space-y-4">
      {children}
    </div>
  );
};
