import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

const meta = {
  tags: ['autodocs'],
  title: 'Components/Calendar',
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <Calendar
        mode="single"
        selected={date}
        disabled={[
          {
            before: new Date(2025, 9, 10),
            after: new Date(2025, 9, 5),
          },
        ]}
        onSelect={setDate}
        className="rounded-md border border-border shadow-sm"
        captionLayout="dropdown"
      />
    );
  },
};
