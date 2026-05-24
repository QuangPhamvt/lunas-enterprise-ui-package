import { Field, FieldContent, FieldDescription, FieldGroup, FieldLegend, FieldNote, FieldSeparator } from '../ui/field';

/**
 * Renders a standalone section title with an optional description and helper note, followed by a separator.
 *
 * @example
 * import { TanStackTitleField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackTitleField
 *   title="Billing Address"
 *   description="Provide the address associated with your payment method."
 *   helperText="Must match your bank records."
 * />
 */
export const TanStackTitleField: React.FC<{
  /** The heading text rendered as a legend element. */
  title: string;
  /** Optional supplementary text displayed beneath the title. */
  description?: string;
  /** Optional helper note shown below the description area. */
  helperText?: string;
}> = ({ title, description, helperText }) => {
  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field className="gap-0">
        <FieldContent>
          <FieldLegend className="mb-1">{title}</FieldLegend>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
