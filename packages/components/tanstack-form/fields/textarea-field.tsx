import { Activity, memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Flex } from '@/components/layouts/flex';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { useFieldContext } from '../config';
import type { CommonFieldProps } from '../types';

type CountCharactersProps = {
  isShowErrorMsg?: boolean;
  isShowCount?: boolean;
  maxLength?: number;
  counts?: number;
  errors?: Array<{ message: string }>;
};
const CountCharacters = memo(({ isShowCount, isShowErrorMsg, maxLength, counts, errors }: CountCharactersProps) => {
  return (
    <Flex vertical width="full" padding="none" align="end" justify="end">
      <Activity mode={isShowCount ? 'visible' : 'hidden'}>
        <p
          className={cn(
            'text-text-positive-weak text-end text-xs',
            maxLength !== undefined && counts !== undefined && maxLength >= 5 && counts >= maxLength - 5 && 'text-warning',
            maxLength !== undefined && counts !== undefined && counts >= maxLength && 'text-danger'
          )}
        >
          {counts ?? 0} characters
        </p>
      </Activity>
      <Activity mode={isShowErrorMsg ? 'visible' : 'hidden'}>
        <FieldError errors={errors} />
      </Activity>
    </Flex>
  );
});
CountCharacters.displayName = 'CountCharacters';

type Props = CommonFieldProps & {
  rows?: number;
  maxLength?: number;
};
export const TextareaField: React.FC<Props> = ({
  isShowLabel = true,
  isShowErrorMsg = true,
  isNested = false,
  rows = 5,
  maxLength,
  label,
  description,
  placeholder,
}) => {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>();
  if (isNested) {
    return (
      <Field orientation="vertical" className="gap-1">
        <Activity mode={label || description ? 'visible' : 'hidden'}>
          <FieldContent>
            <FieldLabel htmlFor={name} className="text-xs">
              {label}
            </FieldLabel>
            <Activity mode={description ? 'visible' : 'hidden'}>
              <FieldDescription className="text-xs">{description}</FieldDescription>
            </Activity>
          </FieldContent>
        </Activity>
        <div className="flex flex-col w-full justify-start">
          <Textarea
            id={name}
            name={name}
            value={state.value}
            aria-invalid={state.meta.isTouched && !state.meta.isValid}
            autoComplete="off"
            placeholder={placeholder}
            rows={rows}
            className="w-full"
            onBlur={handleBlur}
            onChange={e => handleChange(e.target.value)}
          />
          <CountCharacters isShowCount={true} isShowErrorMsg={isShowErrorMsg} maxLength={maxLength} counts={state.value?.length} errors={state.meta.errors} />
        </div>
      </Field>
    );
  }
  return (
    <>
      <Field orientation="responsive" data-invalid={state.meta.isTouched && !state.meta.isValid}>
        <FieldContent>
          <Activity mode={label || description ? 'visible' : 'hidden'}>
            <Activity mode={isShowLabel ? 'visible' : 'hidden'}>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
            </Activity>
            <Activity mode={description ? 'visible' : 'hidden'}>
              <FieldDescription>{description}</FieldDescription>
            </Activity>
          </Activity>
        </FieldContent>
        <div className="relative basis-3/5">
          <Textarea
            id={name}
            name={name}
            value={state.value}
            aria-invalid={state.meta.isTouched && !state.meta.isValid}
            autoComplete="off"
            placeholder={placeholder}
            rows={rows}
            onBlur={handleBlur}
            onChange={e => handleChange(e.target.value)}
          />
          <CountCharacters isShowCount={true} isShowErrorMsg={isShowErrorMsg} maxLength={maxLength} counts={state.value?.length} errors={state.meta.errors} />
        </div>
      </Field>
      <FieldSeparator />
    </>
  );
};
