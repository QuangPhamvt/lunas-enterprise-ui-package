import { FormBuilderPage } from './form-builder-content';

export const FormBuilderContent: React.FC<React.PropsWithChildren> = () => {
  return (
    <div data-slot="form-builder-content" className="flex-1 p-4 bg-accent-bg-subtle">
      <FormBuilderPage />
    </div>
  );
};
