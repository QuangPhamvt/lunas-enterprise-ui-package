import { SimpleCard } from '@/components/cards/simple-card';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Cards/SimpleCard',
  component: SimpleCard,
} satisfies Meta<typeof SimpleCard>;

export default meta;
type Story = StoryObj<typeof SimpleCard>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a simple card description.',
    children: (
      <div>
        <p>This is the content of the card.</p>
        <p>You can put any React elements here.</p>
      </div>
    ),
  },
};
