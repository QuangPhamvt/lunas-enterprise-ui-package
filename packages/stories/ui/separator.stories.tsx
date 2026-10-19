import { Separator } from '@/components/ui/separator';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Separator',
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <div className="space-y-1">
          <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
          <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    );
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestOrientationAndRole: Story = {
  tags: TEST_TAGS,
  render: () => (
    <div className="flex h-10 items-center gap-4">
      <Separator data-testid="default" />
      <Separator orientation="vertical" data-testid="vertical" />
      <Separator decorative={false} data-testid="semantic" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByTestId('default');
    await expect(separator).toHaveAttribute('data-slot', 'separator');
    await expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    // Decorative by default, so it is hidden from assistive tech.
    await expect(separator).toHaveAttribute('role', 'none');
    await expect(canvas.getByTestId('vertical')).toHaveAttribute('data-orientation', 'vertical');
    await expect(canvas.getByRole('separator')).toBe(canvas.getByTestId('semantic'));
  },
};
