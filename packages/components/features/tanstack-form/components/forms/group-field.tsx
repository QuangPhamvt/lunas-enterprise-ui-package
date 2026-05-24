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

/**
 * Renders a labeled field group with an optional description, helper text, and a bottom separator.
 *
 * @example
 * import { TanStackFieldGroup } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackFieldGroup
 *   label="Contact Details"
 *   description="Enter your contact information."
 *   helperText="All fields are required."
 *   orientation="horizontal"
 * >
 *   <EmailField />
 * </TanStackFieldGroup>
 */
export const TanStackFieldGroup: React.FC<
  React.PropsWithChildren<{
    /** Primary label displayed above the field content. */
    label: string;
    /** Secondary descriptive text shown beneath the label. */
    description?: string;
    /** Supplementary helper note rendered below the field content. */
    helperText?: string;
    /** Layout orientation of the label-to-content axis. Defaults to `'responsive'`. */
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
