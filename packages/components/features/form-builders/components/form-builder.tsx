import type { FormBuilderValue } from '../types';
import { FormBuilderDndContext } from './dnd-kit';

export const FormBuilder: React.FC<
  React.PropsWithChildren<{
    initialData?: FormBuilderValue;
  }>
> = ({ children }) => {
  return (
    <FormBuilderDndContext>
      <div data-slot="form-builder" className="relative flex size-full flex-row rounded border border-border text-sm text-text-positive">
        {children}
      </div>
    </FormBuilderDndContext>
  );
};
