import { Activity } from 'react';

import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { NumberInput } from '@/components/ui/inputs/number-input';

import { useFieldContext } from '../config';

type Props = {
  isShowLabel?: boolean;
  isNested?: boolean;
  isShowErrorMsg?: boolean;
  label: string;
  description?: string;
  placeholder?: string;
  unitText?: string;
};
export const NumberField: React.FC<Props> = ({ isShowLabel = true, isNested = false, isShowErrorMsg = true, label, description, unitText, placeholder }) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<number>();
  if (isNested) {
    return (
      <Field orientation="vertical" className="gap-1">
        <Activity mode={label || description ? 'visible' : 'hidden'}>
          <FieldContent>
            <FieldLabel htmlFor={name} className="text-xs">
              {label}
            </FieldLabel>
          </FieldContent>
        </Activity>
        <div className="flex w-full flex-col justify-start">
          <NumberInput
            id={name}
            value={state.value}
            aria-invalid={state.meta.isTouched && !state.meta.isValid}
            className="w-full"
            placeholder={placeholder}
            unitText={unitText}
            onBlur={handleBlur}
            onValueChange={value => {
              if (value === undefined) return;
              handleChange(value);
            }}
          />
          <Activity mode={isShowErrorMsg ? 'visible' : 'hidden'}>
            <FieldError errors={state.meta.errors} />
          </Activity>
        </div>
      </Field>
    );
  }
  return (
    <FieldGroup>
      <Field orientation="responsive" data-invalid={state.meta.isTouched && !state.meta.isValid}>
        <FieldContent>
          <Activity mode={label || description ? 'visible' : 'hidden'}>
            <Activity mode={isShowLabel ? 'visible' : 'hidden'}>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
            </Activity>
          </Activity>
          <Activity mode={description ? 'visible' : 'hidden'}>
            <FieldDescription>{description}</FieldDescription>
          </Activity>
        </FieldContent>
        <div className="relative basis-3/5 space-y-0.5">
          <NumberInput
            id={name}
            value={state.value}
            aria-invalid={state.meta.isTouched && !state.meta.isValid}
            unitText={unitText}
            placeholder={placeholder}
            className="w-full"
            onBlur={handleBlur}
            onValueChange={value => {
              if (value === undefined) return;
              handleChange(value);
            }}
          />
          <Activity mode={isShowErrorMsg ? 'visible' : 'hidden'}>
            <FieldError errors={state.meta.errors} />
          </Activity>
        </div>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
