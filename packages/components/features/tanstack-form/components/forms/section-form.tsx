'use client';

import { Separator } from '../ui/separator';

const SectionHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <header data-slot="section-header" className="flex items-center px-4 py-3 font-semibold text-base text-text-positive tracking-tight">
      {children}
    </header>
  );
};

const SectionMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main data-slot="section-main" className="relative flex flex-col py-4">
      {children}
    </main>
  );
};

export const TanStackSectionForm: React.FC<
  React.PropsWithChildren<{
    title: string;
  }>
> = ({ title, children }) => {
  return (
    <section data-slot="section-form" className="flex flex-col rounded-md bg-background shadow-card ring-1 ring-border">
      <SectionHeader>{title}</SectionHeader>
      <Separator />
      <SectionMain>{children}</SectionMain>
    </section>
  );
};
