'use client';

import { memo, useMemo } from 'react';

import { BanIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { cva, type VariantProps } from 'class-variance-authority';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

/** Groups related fields in a native `<fieldset>`, tightening the gap around checkbox/radio groups. */
const FieldSet = memo(({ className, ...props }: React.ComponentProps<'fieldset'>) => {
  return (
    <fieldset
      data-slot="field-set"
      className={cn('flex flex-col gap-6', 'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3', className)}
      {...props}
    />
  );
});
FieldSet.displayName = 'FieldSet';

/** `<legend>` for a `FieldSet`; `variant="label"` renders it at label size instead of heading size. */
const FieldLegend = memo(
  ({
    className,
    variant = 'legend',
    ...props
  }: React.ComponentProps<'legend'> & {
    /**
     * Text size: `legend` (heading) or `label` (matches `FieldLabel`).
     * @default 'legend'
     */
    variant?: 'legend' | 'label';
  }) => {
    return (
      <legend
        data-slot="field-legend"
        data-variant={variant}
        className={cn('mb-3 font-medium', 'data-[variant=legend]:text-base', 'data-[variant=label]:text-sm', className)}
        {...props}
      />
    );
  }
);
FieldLegend.displayName = 'FieldLegend';

/** Stacks several `Field`s and is the container-query root that `orientation="responsive"` reacts to. */
const FieldGroup = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        className
      )}
      {...props}
    />
  );
});
FieldGroup.displayName = 'FieldGroup';

const fieldVariants = cva('group/field flex w-full gap-3 data-[invalid=true]:text-destructive', {
  variants: {
    orientation: {
      vertical: ['flex-col *:w-full [&>.sr-only]:w-auto'],
      horizontal: [
        'flex-row items-center',
        '*:data-[slot=field-label]:flex-auto',
        'has-[>[data-slot=field-content]]:items-start',
        'has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      ],
      responsive: [
        'flex-col *:w-full [&>.sr-only]:w-auto',
        '@md/field-group:flex-row',
        '@md/field-group:items-center',
        '@md/field-group:*:w-auto',
        '@md/field-group:*:data-[slot=field-label]:flex-auto',
        '@md/field-group:has-[>[data-slot=field-content]]:items-start',
        '@md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      ],
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

/**
 * One form control with its label, description and error. Lay it out with `orientation`:
 * `vertical` (label above), `horizontal` (label beside) or `responsive` (vertical until the parent
 * `FieldGroup` is at least `md` wide).
 *
 * @example
 * ```tsx
 * import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@customafk/lunas-ui/ui/field';
 * import { Input } from '@customafk/lunas-ui/ui/input';
 *
 * <FieldGroup>
 *   <Field orientation="responsive" data-invalid={!!error}>
 *     <FieldLabel htmlFor="email">Email</FieldLabel>
 *     <Input id="email" type="email" aria-invalid={!!error} />
 *     <FieldDescription>Dùng để đăng nhập.</FieldDescription>
 *     <FieldError errors={error ? [{ message: error }] : undefined} />
 *   </Field>
 * </FieldGroup>
 * ```
 */
const Field = memo(({ className, orientation = 'vertical', ...props }: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) => {
  return <div data-slot="field" data-orientation={orientation} className={cn(fieldVariants({ orientation }), className)} {...props} />;
});
Field.displayName = 'Field';

/** Wraps a field's label and description when they sit beside the control in a horizontal `Field`. */
const FieldContent = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="field-content" className={cn('group/field-content flex basis-2/5 flex-col gap-1.5 leading-snug', className)} {...props} />;
});
FieldContent.displayName = 'FieldContent';

/** Label for a `Field`'s control; wrapping a whole `Field` turns it into a selectable card. */
const FieldLabel = memo(({ className, ...props }: React.ComponentProps<typeof Label>) => {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug',
        'group-data-[disabled=true]/field:opacity-50',
        'has-[>[data-slot=field]]:w-full',
        'has-[>[data-slot=field]]:flex-col',
        'has-[>[data-slot=field]]:rounded-md',
        'has-[>[data-slot=field]]:border',
        '*:data-[slot=field]:p-4',
        'has-data-[state=checked]:bg-primary/5',
        'has-data-[state=checked]:border-primary',
        className
      )}
      {...props}
    />
  );
});
FieldLabel.displayName = 'FieldLabel';

/** Label-styled text for a field whose control is not a labelable element (e.g. a card choice). */
const FieldTitle = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="field-label"
      className={cn('flex w-fit items-center gap-2 font-medium text-sm leading-snug group-data-[disabled=true]/field:opacity-50', className)}
      {...props}
    />
  );
});
FieldTitle.displayName = 'FieldTitle';

/** Helper text under (or beside) a field's label. */
const FieldDescription = memo(({ className, ...props }: React.ComponentProps<'p'>) => {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-text-positive-weak text-sm leading-normal font-normal group-has-data-[orientation=horizontal]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
});
FieldDescription.displayName = 'FieldDescription';

/** Horizontal rule between fields, optionally with centered text such as “hoặc”. */
const FieldSeparator = memo(
  ({
    children,
    className,
    ...props
  }: React.ComponentProps<'div'> & {
    children?: React.ReactNode;
  }) => {
    return (
      <div
        data-slot="field-separator"
        data-content={!!children}
        className={cn('relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2', className)}
        {...props}
      >
        <Separator className="absolute inset-0 top-1/2" />
        {children && (
          <span className="relative mx-auto block w-fit bg-background px-2 text-text-positive-weak" data-slot="field-separator-content">
            {children}
          </span>
        )}
      </div>
    );
  }
);
FieldSeparator.displayName = 'FieldSeparator';

/** Validation message area (`role="alert"`): renders `children`, or one/many `errors[].message`; renders nothing when both are empty. */
const FieldError = memo(
  ({
    className,
    children,
    errors,
    ...props
  }: React.ComponentProps<'div'> & {
    /** Validation errors (e.g. from a form library); ignored when `children` is passed. */
    errors?: Array<{ message?: string } | undefined>;
  }) => {
    const content = useMemo(() => {
      if (children) {
        return children;
      }

      if (!errors) {
        return null;
      }

      if (errors?.length === 1 && errors[0]?.message) {
        return (
          <div className="flex flex-row items-center justify-start gap-x-0.5">
            <BanIcon size={14} />
            <p>{errors[0].message}</p>
          </div>
        );
      }

      return (
        <ul className="ml-4 flex list-disc flex-col gap-1">
          {errors.map(error => {
            if (typeof error === 'string') return <li key={error}>{error}</li>;
            if (!error?.message) return null;
            return <li key={error.message}>{error.message}</li>;
          })}
        </ul>
      );
    }, [children, errors]);

    if (!content) {
      return null;
    }

    return (
      <div role="alert" data-slot="field-error" className={cn('w-full font-normal text-danger text-xs', className)} {...props}>
        {content}
      </div>
    );
  }
);
FieldError.displayName = 'FieldError';

export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle };
