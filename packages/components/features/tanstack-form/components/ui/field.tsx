import { memo, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Separator } from '@/components/ui/separator';

import { cva, type VariantProps } from 'class-variance-authority';
import { Label } from './label';

const fieldVariants = cva(
  'group/field flex w-full gap-2 data-[invalid=true]:text-danger *:data-[slot=field-content]:gap-0 @md/field-group:*:data-[slot=field-content]:gap-2',
  {
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
          '@md/field-group:gap-4',
          '@md/field-group:*:w-auto',
          '@md/field-group:*:data-[slot=field-content]:basis-1/2',
          '@md/field-group:*:data-[slot=field-content-main]:basis-1/2',
          '@md/field-group:*:data-[slot=field-label]:flex-auto',
          '@md/field-group:has-[>[data-slot=field-content]]:items-start',
          '@md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

const FieldSet = memo(({ className, ...props }: React.ComponentProps<'fieldset'>) => {
  return (
    <fieldset
      data-slot="field-set"
      className={cn('flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3', className)}
      {...props}
    />
  );
});
FieldSet.displayName = 'FieldSet';

const FieldLegend = memo(
  ({
    className,
    variant = 'legend',
    ...props
  }: React.ComponentProps<'legend'> & {
    variant?: 'legend' | 'label';
  }) => {
    return (
      <legend
        data-slot="field-legend"
        data-variant={variant}
        className={cn('mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className)}
        {...props}
      />
    );
  }
);
FieldLegend.displayName = 'FieldLegend';

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

const Field = memo(({ className, orientation = 'vertical', ...props }: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) => {
  return <div data-slot="field" data-orientation={orientation} className={cn(fieldVariants({ orientation }), className)} {...props} />;
});
Field.displayName = 'Field';

const FieldContent = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="field-content" className={cn('group/field-content flex flex-col gap-1.5 leading-snug', className)} {...props} />;
});
FieldContent.displayName = 'FieldContent';

const FieldContentMain = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="field-content-main" className={cn('relative', className)} {...props} />;
});

const FieldLabel = memo(({ className, ...props }: React.ComponentProps<typeof Label>) => {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label flex h-6 gap-1 font-normal leading-snug',
        'has-[>[data-slot=field]]:w-full',
        'has-[>[data-slot=field]]:flex-col',
        'has-[>[data-slot=field]]:rounded-md',
        'has-[>[data-slot=field]]:border',
        'has-[>[data-slot=field]]:border-border',
        'has-data-[state=checked]:border-primary',
        '*:data-[slot=field]:p-4 group-data-[disabled=true]/field:opacity-50',
        className
      )}
      {...props}
    />
  );
});
FieldLabel.displayName = 'FieldLabel';

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

const FieldDescription = memo(({ className, ...props }: React.ComponentProps<'p'>) => {
  return (
    <p
      data-slot="field-description"
      className={cn(
        // biome-ignore lint/security/noSecrets: true
        'nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5 font-normal text-sm text-text-positive-weak leading-normal last:mt-0 [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
});
FieldDescription.displayName = 'FieldDescription';

const FieldNote = memo(({ isShow = true, className, ...props }: React.ComponentProps<'div'> & { isShow?: boolean }) => {
  if (isShow === false) return null;
  return <div data-slot="field-note" className={cn('text-wrap rounded bg-primary-bg-subtle p-2 text-text-positive-weak text-xs', className)} {...props} />;
});
FieldNote.displayName = 'FieldNote';

const FieldSeparator = memo(({ children, className, ...props }: React.PropsWithChildren<React.ComponentProps<'div'>>) => {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn('-my-2 group-data-[variant=outline]/field-group:-mb-2 relative h-5 text-sm', className)}
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
});
FieldSeparator.displayName = 'FieldSeparator';

const FieldError = memo(
  ({
    className,
    children,
    errors,
    ...props
  }: React.ComponentProps<'div'> & {
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
            <p>{errors[0].message}</p>
          </div>
        );
      }

      return (
        <ul className="flex list-none flex-col gap-1">
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
      <div role="alert" data-slot="field-error" className={cn('w-full font-semibold text-danger-strong text-xs', className)} {...props}>
        {content}
      </div>
    );
  }
);
FieldError.displayName = 'FieldError';

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldNote,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldContentMain,
  FieldTitle,
};
