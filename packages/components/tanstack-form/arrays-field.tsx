import { useCallback } from 'react';

import { PlusIcon, XIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '../ui/field';

const ArrayWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div data-slot="array-wrapper" className="flex flex-col space-y-4">
      {children}
    </div>
  );
};
export const ArraysField: React.FC<
  React.PropsWithChildren<{
    label: string;
    description?: string;
    onAddItem?: () => void;
  }>
> = ({ label, description, onAddItem, children }) => {
  return (
    <FieldGroup>
      <Field>
        <FieldContent>
          <FieldLabel>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <ArrayWrapper>{children}</ArrayWrapper>
      </Field>
      <Button size="sm" variant="outline" color="muted" className="w-fit text-text-positive-weak" onClick={onAddItem}>
        <PlusIcon size={12} />
        Add Item
      </Button>
      <FieldSeparator />
    </FieldGroup>
  );
};

export const ArrayItemField: React.FC<
  React.PropsWithChildren<{
    index: number;
    label: string;
    description?: string;
    onRemove?: (index: number) => void;
  }>
> = ({ index, label, description, onRemove, children }) => {
  const handleRemove = useCallback(() => {
    onRemove?.(index);
  }, [index, onRemove]);
  return (
    <Card className="relative shadow-none border border-border">
      <Button size="icon" variant="outline" color="muted" className="absolute top-4 right-4 text-text-negative-weak" onClick={handleRemove}>
        <XIcon />
      </Button>
      <CardContent>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>{label}</FieldLegend>
            <FieldDescription>{description}</FieldDescription>
            <FieldSeparator />
          </FieldSet>
          {children}
        </FieldGroup>
      </CardContent>
    </Card>
  );
};
