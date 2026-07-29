'use client';

import { cn } from '@customafk/react-toolkit/utils';
import { Separator } from '../ui/separator';

/**
 * Internal header sub-component for `TanStackSectionForm` that renders a styled section title.
 */
const SectionHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <header
      data-slot="section-header"
      className="flex items-center px-4 py-3 font-semibold text-base text-text-positive tracking-tight gap-x-2 [&>svg]:size-5 [&>svg]:min-w-5"
    >
      {children}
    </header>
  );
};

/**
 * Internal body sub-component for `TanStackSectionForm` that wraps field content with vertical padding.
 */
const SectionMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main data-slot="section-main" className="relative flex flex-col py-4">
      {children}
    </main>
  );
};

/**
 * Renders a card-like form section with a titled header, separator, and a content area for form fields.
 *
 * @example
 * import { TanStackSectionForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <TanStackSectionForm title="Account Settings">
 *   <EmailField />
 *   <PasswordField />
 * </TanStackSectionForm>
 */
export const TanStackSectionForm: React.FC<
  React.PropsWithChildren<{
    /** Heading text displayed in the section header bar. */
    title: string;
    icon?: React.ReactNode;
    className?: string;
  }>
> = ({ title, icon: Icon, className, children }) => {
  return (
    <section data-slot="section-form" className={cn('flex flex-col rounded-md bg-background shadow-card ring-1 ring-border', className)}>
      <SectionHeader>
        {Icon}
        {title}
      </SectionHeader>
      <Separator />
      <SectionMain>{children}</SectionMain>
    </section>
  );
};
