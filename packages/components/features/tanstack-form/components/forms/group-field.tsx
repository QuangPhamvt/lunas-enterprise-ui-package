import {
  Field,
  FieldContent,
  FieldContentMain,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldNote,
  FieldSeparator,
} from '@/components/features/tanstack-form/components/ui/field';

export const TanStackFieldGroup: React.FC<
  React.PropsWithChildren<{
    label: string;
    description?: string;
    helperText?: string;

    orientation?: 'horizontal' | 'vertical' | 'responsive';
  }>
> = ({
  label,
  description,
  helperText,

  orientation = 'responsive',
  children,
}) => {
  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation={orientation}>
        <FieldContent>
          <FieldLabel>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldContentMain>
          {children}
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
