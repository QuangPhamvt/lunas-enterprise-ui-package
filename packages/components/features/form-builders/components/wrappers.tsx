import { FormBuilderPage } from './content';

export const FormBuilderContent: React.FC<React.PropsWithChildren> = () => {
  return (
    <div data-slot="form-builder-content" className="flex-1 p-4">
      <FormBuilderPage />
    </div>
  );
};
