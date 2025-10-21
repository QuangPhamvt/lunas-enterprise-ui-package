import type { Meta, StoryObj } from '@storybook/react-vite';

import { CreateDialog } from '@/components/dialogs/create-dialog';
import { sleep } from '@customafk/react-toolkit/utils/sleep';

const meta = {
  tags: ['autodocs'],
  title: 'Dialogs/CreateDialog',
  component: CreateDialog,
} satisfies Meta<typeof CreateDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    label: 'Create Dialog Title',
    nameLabel: 'Entity Name',
    maxLength: 50,
    placeholder: 'Enter the name of the entity',
    onSubmit: async values => {
      await sleep(2000);
      console.log('Submitted values:', values);
    },
  },
};
