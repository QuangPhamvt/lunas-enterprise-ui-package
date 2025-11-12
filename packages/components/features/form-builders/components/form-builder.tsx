import type { FormBuilderValue } from '../types';
import { FormBuilderDndContext } from './dnd-kit';
import { FormBuilderProvider } from './providers';

export const FormBuilder: React.FC<
  React.PropsWithChildren<{
    initialData?: FormBuilderValue;
  }>
> = ({ initialData, children }) => {
  return (
    <FormBuilderProvider initialFormBuilders={initialData}>
      <FormBuilderDndContext>
        <div data-slot="form-builder" className="relative flex size-full flex-row rounded border border-border text-sm text-text-positive">
          {children}
        </div>
      </FormBuilderDndContext>
    </FormBuilderProvider>
  );
};
