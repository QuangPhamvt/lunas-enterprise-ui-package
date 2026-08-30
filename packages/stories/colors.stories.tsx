import { cn } from '@customafk/react-toolkit/utils';

import type { StoryObj } from '@storybook/react-vite';

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="border-border border-b pb-2 font-semibold text-text-positive text-xl">{children}</h2>
);

const PaletteGrid = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <div className="font-medium text-sm text-text-positive-weak">{title}</div>
    <div className="flex flex-wrap items-start gap-4">{children}</div>
  </div>
);

const PaletteBox = ({ color }: { color: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className={cn('size-16 rounded-lg', color)} />
    <p className="text-text-positive-weak text-xs">{color.split('-')[color.split('-').length - 1]}</p>
  </div>
);

const ScaleBox = ({ cssVar, label }: { cssVar: string; label: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className="size-16 rounded-lg" style={{ backgroundColor: `var(${cssVar})` }} />
    <p className="text-text-positive-weak text-xs">{label}</p>
  </div>
);

const PaletteScale = ({ title, cssVarPrefix }: { title: string; cssVarPrefix: string }) => (
  <PaletteGrid title={title}>
    {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map(step => (
      <ScaleBox key={step} cssVar={`--${cssVarPrefix}-${step}`} label={step} />
    ))}
  </PaletteGrid>
);

const meta = {
  title: 'Colors',
  component: null,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-y-14 p-10">
        <section className="flex flex-col gap-y-8">
          <SectionHeading>Raw Palette</SectionHeading>
          <PaletteScale title="Primary" cssVarPrefix="primary" />
          <PaletteScale title="Analogously Secondary" cssVarPrefix="analogously-secondary" />
          <PaletteScale title="Analogously Accent" cssVarPrefix="analogously-accent" />
          <PaletteScale title="Complementary" cssVarPrefix="complementary" />
          <PaletteScale title="Triadic Secondary" cssVarPrefix="triadic-secondary" />
          <PaletteScale title="Triadic Accent" cssVarPrefix="triadic-accent" />
          <PaletteGrid title="Neutral">
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map(step => (
              <ScaleBox key={step} cssVar={`--neutral-${step}`} label={step} />
            ))}
          </PaletteGrid>
        </section>

        <section className="flex flex-col gap-y-8">
          <SectionHeading>Semantic Tokens</SectionHeading>

          <PaletteGrid title="Primary">
            <PaletteBox color="bg-primary-muted" />
            <PaletteBox color="bg-primary-weak" />
            <PaletteBox color="bg-primary" />
            <PaletteBox color="bg-primary-strong" />
            <PaletteBox color="bg-primary-intense" />
            <PaletteBox color="bg-primary-bg-subtle" />
            <PaletteBox color="bg-primary-border-subtle" />
          </PaletteGrid>

          <PaletteGrid title="Secondary">
            <PaletteBox color="bg-secondary-muted" />
            <PaletteBox color="bg-secondary-weak" />
            <PaletteBox color="bg-secondary" />
            <PaletteBox color="bg-secondary-strong" />
            <PaletteBox color="bg-secondary-intense" />
            <PaletteBox color="bg-secondary-bg-subtle" />
            <PaletteBox color="bg-secondary-border-subtle" />
          </PaletteGrid>

          <PaletteGrid title="Accent">
            <PaletteBox color="bg-accent-muted" />
            <PaletteBox color="bg-accent-weak" />
            <PaletteBox color="bg-accent" />
            <PaletteBox color="bg-accent-strong" />
            <PaletteBox color="bg-accent-intense" />
          </PaletteGrid>

          <PaletteGrid title="Muted">
            <PaletteBox color="bg-muted-muted" />
            <PaletteBox color="bg-muted-weak" />
            <PaletteBox color="bg-muted" />
            <PaletteBox color="bg-muted-strong" />
            <PaletteBox color="bg-muted-intense" />
          </PaletteGrid>

          <PaletteGrid title="Info">
            <PaletteBox color="bg-info-muted" />
            <PaletteBox color="bg-info-weak" />
            <PaletteBox color="bg-info" />
            <PaletteBox color="bg-info-strong" />
            <PaletteBox color="bg-info-intense" />
          </PaletteGrid>

          <PaletteGrid title="Success">
            <PaletteBox color="bg-success-muted" />
            <PaletteBox color="bg-success-weak" />
            <PaletteBox color="bg-success" />
            <PaletteBox color="bg-success-strong" />
            <PaletteBox color="bg-success-intense" />
          </PaletteGrid>

          <PaletteGrid title="Warning">
            <PaletteBox color="bg-warning-muted" />
            <PaletteBox color="bg-warning-weak" />
            <PaletteBox color="bg-warning" />
            <PaletteBox color="bg-warning-strong" />
            <PaletteBox color="bg-warning-intense" />
          </PaletteGrid>

          <PaletteGrid title="Danger">
            <PaletteBox color="bg-danger-muted" />
            <PaletteBox color="bg-danger-weak" />
            <PaletteBox color="bg-danger" />
            <PaletteBox color="bg-danger-strong" />
            <PaletteBox color="bg-danger-intense" />
          </PaletteGrid>

          <PaletteGrid title="Text Brand">
            <PaletteBox color="bg-text-brand-muted" />
            <PaletteBox color="bg-text-brand-weak" />
            <PaletteBox color="bg-text-brand" />
            <PaletteBox color="bg-text-brand-strong" />
            <PaletteBox color="bg-text-brand-intense" />
            <PaletteBox color="bg-text-brand-subtle" />
          </PaletteGrid>

          <PaletteGrid title="Text Positive">
            <PaletteBox color="bg-text-positive-muted" />
            <PaletteBox color="bg-text-positive-weak" />
            <PaletteBox color="bg-text-positive" />
            <PaletteBox color="bg-text-positive-strong" />
            <PaletteBox color="bg-text-positive-intense" />
            <PaletteBox color="bg-text-positive-subtle" />
          </PaletteGrid>

          <PaletteGrid title="Text Negative">
            <PaletteBox color="bg-text-negative-muted" />
            <PaletteBox color="bg-text-negative-weak" />
            <PaletteBox color="bg-text-negative" />
            <PaletteBox color="bg-text-negative-strong" />
            <PaletteBox color="bg-text-negative-intense" />
          </PaletteGrid>

          <PaletteGrid title="Border">
            <PaletteBox color="bg-border-weak" />
            <PaletteBox color="bg-border" />
            <PaletteBox color="bg-border-strong" />
            <PaletteBox color="bg-border-intense" />
            <PaletteBox color="bg-border-subtle" />
          </PaletteGrid>

          <PaletteGrid title="Chart">
            <PaletteBox color="bg-chart-1" />
            <PaletteBox color="bg-chart-2" />
            <PaletteBox color="bg-chart-3" />
            <PaletteBox color="bg-chart-4" />
            <PaletteBox color="bg-chart-5" />
            <PaletteBox color="bg-chart-6" />
            <PaletteBox color="bg-chart-7" />
            <PaletteBox color="bg-chart-8" />
          </PaletteGrid>
        </section>
      </div>
    );
  },
};
