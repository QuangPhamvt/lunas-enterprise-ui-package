import { SquareMousePointerIcon } from 'lucide-react';

export const FormBuilderEmptyField: React.FC = () => {
  return (
    <div className="flex h-24 items-center justify-center space-x-2 rounded border border-border border-dashed bg-muted-muted px-2.5 py-2 text-text-positive-weak">
      <SquareMousePointerIcon strokeWidth={1} />
      <p>Empty Field</p>
    </div>
  );
};
