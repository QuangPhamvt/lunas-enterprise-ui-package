import { cn } from '@customafk/react-toolkit/utils';
import type { StoryObj } from '@storybook/react-vite';

const PaletteGrid = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="flex items-start flex-wrap gap-4">
    <div className="text-sm font-medium text-text-positive w-24">{title}</div>
    {children}
  </div>
);

const PaletteBox = ({ color }: { color: string }) => (
  <div className="flex flex-col space-y-1 items-center">
    <div className={cn('size-16 rounded-lg shadow-card', color)} />
    <p className="text-xs">{color.split('-')[color.split('-').length - 1]}</p>
  </div>
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
      <div className="p-10 flex flex-col gap-y-10">
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

        <PaletteGrid title="Muted">
          <PaletteBox color="bg-muted-muted" />
          <PaletteBox color="bg-muted-weak" />
          <PaletteBox color="bg-muted" />
          <PaletteBox color="bg-muted-strong" />
          <PaletteBox color="bg-muted-intense" />
        </PaletteGrid>

        <PaletteGrid title="Accent">
          <PaletteBox color="bg-accent-muted" />
          <PaletteBox color="bg-accent-weak" />
          <PaletteBox color="bg-accent" />
          <PaletteBox color="bg-accent-strong" />
          <PaletteBox color="bg-accent-intense" />
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
          <PaletteBox color="bg-border-emphasis" />
        </PaletteGrid>
      </div>
    );
  },
};
