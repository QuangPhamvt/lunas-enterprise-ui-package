import { Activity, memo, useCallback } from 'react';

import { XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { cva } from 'class-variance-authority';
import { Flex } from '../../layouts/flex';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '../../ui/field';
import { Input } from '../../ui/input';
import { useFieldContext } from '../config';

const clearBtnVariant = cva([
  'text-text-positive-weak hover:text-text-positive focus-visible:ring-border absolute inset-y-0 top-3 end-0 flex h-fit w-8 cursor-pointer items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-2',
]);

type CountCharactersProps = {
  isShowClearButton: boolean;
  isShowErrorMsg?: boolean;
  isShowCount?: boolean;
  maxLength?: number;
  counts?: number;
  errors?: Array<{ message: string }>;
  onClear: () => void;
};
const CountCharacters = memo(({ isShowClearButton, isShowCount, isShowErrorMsg, maxLength, counts, errors, onClear }: CountCharactersProps) => {
  const handleClearInput = useCallback(() => {
    onClear();
  }, [onClear]);
  return (
    <>
      <Activity mode={isShowClearButton ? 'visible' : 'hidden'}>
        <button type="button" className={clearBtnVariant()} aria-label="Clear input" onClick={handleClearInput}>
          <XIcon size={14} aria-hidden="true" />
        </button>
      </Activity>
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
    </>
  );
});
CountCharacters.displayName = 'CountCharacters';

type Props = {
  isShowLabel?: boolean;
  isNested?: boolean;
  isShowClearButton?: boolean;
  isShowErrorMsg?: boolean;
  maxLength?: number;
  label: string;
  description?: string;
  placeholder?: string;
};
export const TextField: React.FC<Props> = ({
  isShowLabel = true,
  isNested = false,
  isShowClearButton = false,
  isShowErrorMsg = true,
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
          <Input
            id={name}
            name={name}
            value={state.value}
            aria-invalid={state.meta.isTouched && !state.meta.isValid}
            autoComplete="off"
            placeholder={placeholder}
            className={cn('w-full', isShowClearButton && 'pr-9')}
            onBlur={handleBlur}
            onChange={e => handleChange(e.target.value)}
          />
          <CountCharacters
            isShowClearButton={isShowClearButton}
            isShowCount={true}
            isShowErrorMsg={isShowErrorMsg}
            maxLength={maxLength}
            counts={state.value?.length}
            errors={state.meta.errors}
            onClear={() => handleChange('')}
          />
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
            <Activity mode={description ? 'visible' : 'hidden'}>
              <FieldDescription>{description}</FieldDescription>
            </Activity>
          </Activity>
        </FieldContent>
        <div className="relative basis-3/5">
          <Input
            id={name}
            name={name}
            value={state.value}
            aria-invalid={state.meta.isTouched && !state.meta.isValid}
            autoComplete="off"
            placeholder={placeholder}
            onBlur={handleBlur}
            onChange={e => handleChange(e.target.value)}
          />
          <CountCharacters
            isShowClearButton={isShowClearButton}
            isShowCount={true}
            isShowErrorMsg={isShowErrorMsg}
            maxLength={maxLength}
            counts={state.value?.length}
            errors={state.meta.errors}
            onClear={() => handleChange('')}
          />
        </div>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
