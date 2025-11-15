import { BoltIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormBuilderPage } from './form-builder-content';

export const FormBuilderContent: React.FC<React.PropsWithChildren> = () => {
  return (
    <div data-slot="form-builder-content" className="relative flex-1 bg-accent-bg-subtle p-4">
      <FormBuilderPage />
      <div className="absolute top-4 right-4 flex space-x-1 text-sm">
        <Button>Save & coutinue</Button>
        <Button variant="outline" color="muted" className="w-8">
          <BoltIcon />
        </Button>
      </div>
    </div>
  );
};
