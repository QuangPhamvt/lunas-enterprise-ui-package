import { Progress } from '@/components/ui/progress';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Progress',
  component: Progress,
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    className: 'w-72',
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestIndicatorOffset: Story = {
  tags: TEST_TAGS,
  render: () => (
    <div className="grid w-64 gap-2">
      <Progress value={0} data-testid="p0" />
      <Progress value={75} data-testid="p75" />
      <Progress value={100} data-testid="p100" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bars = canvas.getAllByRole('progressbar');
    await expect(bars).toHaveLength(3);
    await expect(bars[0]).toHaveAttribute('data-slot', 'progress');
    const indicator = (id: string) => canvas.getByTestId(id).querySelector<HTMLElement>('[data-slot="progress-indicator"]');
    await expect(indicator('p0')?.style.transform).toBe('translateX(-100%)');
    await expect(indicator('p75')?.style.transform).toBe('translateX(-25%)');
    // Browsers normalize `-0%` to `0%`.
    await expect(indicator('p100')?.style.transform).toMatch(/^translateX\(-?0%\)$/);
  },
};
