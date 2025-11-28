import { Separator } from '../ui/separator';

const SectionHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <header data-slot="section-header" className="px-4 pt-2.5 pb-2 font-medium text-base text-primary-strong">
      {children}
    </header>
  );
};

const SectionMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main data-slot="section-main" className="relative flex flex-col space-y-4 py-4">
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
    <section data-slot="section-form" className="flex flex-col rounded-md bg-card shadow-card">
      <SectionHeader>{title}</SectionHeader>
      <Separator />
      <SectionMain>{children}</SectionMain>
    </section>
  );
};
