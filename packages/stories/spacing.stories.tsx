import type { StoryObj } from '@storybook/react-vite';

type SpacingToken = {
  name: string;
  mobile: number;
  tablet: number;
  desktop: number;
  flat?: boolean;
};

const LAYOUT: SpacingToken[] = [
  { name: 'layout-xl', mobile: 48, tablet: 64, desktop: 128 },
  { name: 'layout-lg', mobile: 32, tablet: 48, desktop: 96 },
  { name: 'layout-md', mobile: 16, tablet: 32, desktop: 64 },
  { name: 'layout-sm', mobile: 12, tablet: 24, desktop: 48 },
  { name: 'layout-xs', mobile: 8, tablet: 16, desktop: 32 },
  { name: 'layout-none', mobile: 0, tablet: 0, desktop: 0 },
];

const SECTION: SpacingToken[] = [
  { name: 'section-xl', mobile: 20, tablet: 32, desktop: 48 },
  { name: 'section-lg', mobile: 16, tablet: 20, desktop: 32 },
  { name: 'section-md', mobile: 12, tablet: 16, desktop: 24 },
  { name: 'section-sm', mobile: 12, tablet: 16, desktop: 16 },
  { name: 'section-xs', mobile: 8, tablet: 12, desktop: 12 },
  { name: 'section-none', mobile: 0, tablet: 0, desktop: 0 },
];

const COMPONENT: SpacingToken[] = [
  { name: 'component-xl', mobile: 12, tablet: 16, desktop: 24 },
  { name: 'component-lg', mobile: 12, tablet: 16, desktop: 16 },
  { name: 'component-md', mobile: 8, tablet: 12, desktop: 12 },
  { name: 'component-sm', mobile: 8, tablet: 8, desktop: 8, flat: true },
  { name: 'component-xs', mobile: 4, tablet: 4, desktop: 4, flat: true },
  { name: 'component-none', mobile: 0, tablet: 0, desktop: 0 },
];

const SpacingRow = ({ token }: { token: SpacingToken }) => {
  const isNone = token.desktop === 0 && token.mobile === 0;
  const isFlat = token.flat;

  return (
    <div className="flex items-center gap-4 py-1.5">
      <span className="font-mono text-sm text-text-positive-strong w-36 shrink-0">{token.name}</span>
      {isNone ? (
        <span className="text-sm text-text-positive-muted">0</span>
      ) : (
        <div className="flex items-center gap-3">
          <div style={{ width: `var(--spacing-${token.name})` }} className="h-3 rounded-sm bg-primary shrink-0" />
          <span className="text-sm text-text-positive-weak">{isFlat ? `${token.mobile}px` : `${token.mobile}px · ${token.tablet}px · ${token.desktop}px`}</span>
        </div>
      )}
    </div>
  );
};

const SpacingGroup = ({ title, tokens }: { title: string; tokens: SpacingToken[] }) => (
  <div className="rounded-lg border border-border px-6 py-5">
    <p className="text-sm font-semibold text-text-positive mb-3">{title}</p>
    <div className="flex flex-col">
      {tokens.map(token => (
        <SpacingRow key={token.name} token={token} />
      ))}
    </div>
  </div>
);

const meta = {
  title: 'Spacing',
  component: null,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <div className="p-10 flex flex-col gap-y-6 max-w-3xl">
      <div className="flex flex-col gap-y-1.5">
        <h2 className="text-3xl font-bold text-text-positive">Token reference</h2>
        <p className="text-sm text-text-positive">
          Values below are the resolved pixels at each breakpoint. Each bar is drawn at its live token width, so it resizes with the viewport exactly as the
          token does.
        </p>
      </div>
      <SpacingGroup title="Layout" tokens={LAYOUT} />
      <SpacingGroup title="Section" tokens={SECTION} />
      <SpacingGroup title="Component" tokens={COMPONENT} />
    </div>
  ),
};
