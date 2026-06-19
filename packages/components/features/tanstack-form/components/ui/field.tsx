'use client';

import { memo, useMemo } from 'react';

import { HelpCircleIcon, InfoIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { cva, type VariantProps } from 'class-variance-authority';
import { Label } from './label';

const fieldVariants = cva('group/field flex w-full gap-2 data-[invalid=true]:text-danger *:data-[slot=field-content]:gap-0', {
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
});

/**
 * Outermost `<fieldset>` wrapper that stacks multiple `Field` rows with consistent vertical spacing.
 *
 * @example
 * import { FieldSet } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldSet>
 *   <Field><FieldLabel>Name</FieldLabel><FieldContent><input /></FieldContent></Field>
 * </FieldSet>
 */
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

/**
 * Props for {@link FieldLegend}.
 */
type FieldLegendProps = React.ComponentProps<'legend'> & {
  /**
   * Visual weight of the legend text.
   * - `'legend'` — larger base-size text (section heading).
   * - `'label'` — smaller label-size text (matches field label weight).
   * @default 'legend'
   */
  variant?: 'legend' | 'label';
};

/**
 * `<legend>` element for a `<fieldset>`, styled as either a section heading or a compact label.
 *
 * @example
 * import { FieldSet, FieldLegend } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldSet>
 *   <FieldLegend variant="legend">Personal details</FieldLegend>
 * </FieldSet>
 */
const FieldLegend = memo(({ className, variant = 'legend', ...props }: FieldLegendProps) => {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn('mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className)}
      {...props}
    />
  );
});
FieldLegend.displayName = 'FieldLegend';

/**
 * Container `<div>` that groups a set of `Field` rows with container-query support for responsive layouts.
 *
 * @example
 * import { FieldGroup } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldGroup>
 *   <Field>…</Field>
 *   <Field>…</Field>
 * </FieldGroup>
 */
const FieldGroup = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group',
        'flex flex-col gap-7 pt-4',
        'data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        className
      )}
      {...props}
    />
  );
});
FieldGroup.displayName = 'FieldGroup';

/**
 * Single form field row that arranges label, input, and meta elements with configurable orientation.
 *
 * @example
 * import { Field } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <Field orientation="horizontal">
 *   <FieldLabel htmlFor="username">Username</FieldLabel>
 *   <FieldContent><input id="username" /></FieldContent>
 * </Field>
 */
const Field = memo(({ className, orientation = 'vertical', ...props }: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) => {
  return <div data-slot="field" data-orientation={orientation} className={cn(fieldVariants({ orientation }), className)} {...props} />;
});
Field.displayName = 'Field';

/**
 * Flex column wrapper that houses the primary input control together with description and error slots.
 *
 * @example
 * import { FieldContent } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldContent>
 *   <input type="text" />
 *   <FieldDescription>Enter your full name.</FieldDescription>
 * </FieldContent>
 */
const FieldContent = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="field-content" className={cn('group/field-content flex flex-col gap-1.5 leading-snug', className)} {...props} />;
});
FieldContent.displayName = 'FieldContent';

/**
 * Positioned wrapper for the main input element that enables absolutely-placed adornments (icons, spinners).
 *
 * @example
 * import { FieldContentMain } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldContentMain>
 *   <input type="text" className="pr-8" />
 *   <SearchIcon className="absolute right-2 top-2" />
 * </FieldContentMain>
 */
const FieldContentMain = memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="field-content-main" className={cn('relative', className)} {...props} />;
});
FieldContentMain.displayName = 'FieldContentMain';

/**
 * Styled `<label>` element for a `Field`, extending the base `Label` with field-group-aware spacing and border states.
 *
 * @example
 * import { FieldLabel } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldLabel htmlFor="email" aria-required>Email</FieldLabel>
 */
const FieldLabel = memo(({ className, ...props }: React.ComponentProps<typeof Label>) => {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label min-h-6 gap-1 font-medium leading-snug',
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

/**
 * Inline title element (non-`<label>`) for fields whose label cannot be a native `<label>`, such as custom checkbox groups.
 *
 * @example
 * import { FieldTitle } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldTitle>Notification preferences</FieldTitle>
 */
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

/**
 * Supplementary hint text rendered below the input to guide the user, with support for inline anchor links.
 *
 * @example
 * import { FieldDescription } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldDescription>Must be at least 8 characters.</FieldDescription>
 */
const FieldDescription = memo(({ className, ...props }: React.ComponentProps<'p'>) => {
  return (
    <p
      data-slot="field-description"
      className={cn(
        // biome-ignore lint/security/noSecrets: true
        'nth-last-2:-mt-1 font-normal text-text-positive-weak text-xs leading-normal last:mt-0 [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4 [[data-variant=legend]+&]:-mt-1.5',
        className
      )}
      {...props}
    />
  );
});
FieldDescription.displayName = 'FieldDescription';

/**
 * Props for {@link FieldNote}.
 */
type FieldNoteProps = React.ComponentProps<'div'> & {
  /**
   * When `false` the note is not rendered at all; useful for conditional display without wrapper conditionals.
   * @default true
   */
  isShow?: boolean;
};

/**
 * Highlighted informational callout box with an info icon, shown below a field to surface contextual guidance.
 *
 * @example
 * import { FieldNote } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldNote isShow={isDraftMode}>Changes are saved automatically in draft mode.</FieldNote>
 */
const FieldNote = memo(({ isShow = true, className, children, ...props }: FieldNoteProps) => {
  if (isShow === false) return null;
  return (
    <div
      data-slot="field-note"
      className={cn(
        'flex items-start gap-1.5 rounded border border-primary-muted/60 bg-primary-bg-subtle/80 px-2.5 py-2 text-text-positive-weak text-xs',
        className
      )}
      {...props}
    >
      <InfoIcon size={12} className="mt-0.5 shrink-0 text-primary/70" />
      <span>{children}</span>
    </div>
  );
});
FieldNote.displayName = 'FieldNote';

/**
 * Props for {@link FieldTooltip}.
 */
type FieldTooltipProps = {
  /** Text content displayed inside the tooltip when the help icon is hovered or focused. */
  tooltip: string;
};

/**
 * Small help-circle icon button that reveals a tooltip with additional field context on hover or focus.
 *
 * @example
 * import { FieldTooltip } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldLabel>
 *   Password <FieldTooltip tooltip="Use at least one uppercase letter and one number." />
 * </FieldLabel>
 */
const FieldTooltip = memo(({ tooltip }: FieldTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          tabIndex={-1}
          className="inline-flex cursor-default items-center text-text-positive-weak/70 hover:text-text-positive focus:outline-none"
        >
          <HelpCircleIcon size={13} aria-hidden="true" />
          <span className="sr-only">More information</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-balance">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
});
FieldTooltip.displayName = 'FieldTooltip';

/**
 * Visual divider row that optionally displays a centered text label, used to separate logical sections within a `FieldGroup`.
 *
 * @example
 * import { FieldSeparator } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <FieldSeparator>or</FieldSeparator>
 */
const FieldSeparator = memo(({ children, className, ...props }: React.PropsWithChildren<React.ComponentProps<'div'>>) => {
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
});
FieldSeparator.displayName = 'FieldSeparator';

/**
 * Props for {@link FieldError}.
 */
type FieldErrorProps = React.ComponentProps<'div'> & {
  errors?: Array<{ code?: string; message?: string } | undefined>;
  requiredMessage?: string;
};

const FieldError = memo(({ className, children, errors, requiredMessage = 'Trường này là bắt buộc', ...props }: FieldErrorProps) => {
  const content = useMemo(() => {
    const resolve = (error: { code?: string; message?: string }) => (error.code === 'invalid_type' ? requiredMessage : error.message);

    if (children) {
      return children;
    }

    if (!errors) {
      return null;
    }

    if (errors?.length === 1 && errors[0]?.message) {
      return (
        <div className="flex flex-row items-center justify-start gap-x-0.5">
          <p>{resolve(errors[0])}</p>
        </div>
      );
    }

    return (
      <ul className="flex list-none flex-col">
        {errors.map(error => {
          if (typeof error === 'string') return <li key={error}>{error}</li>;
          if (!error?.message) return null;
          return <li key={error.code ?? error.message}>{resolve(error)}</li>;
        })}
      </ul>
    );
  }, [children, errors, requiredMessage]);

  if (!content) {
    return null;
  }

  return (
    <div role="alert" data-slot="field-error" className={cn('w-full font-medium text-danger-strong text-xs', className)} {...props}>
      {content}
    </div>
  );
});
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
  FieldTooltip,
};
