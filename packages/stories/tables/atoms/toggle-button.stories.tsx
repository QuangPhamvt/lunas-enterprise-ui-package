import { useState } from 'react';

import { UITableToggleButton } from '@/components/features/tables';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/UI Tables/Atoms/Toggle Button',
  component: UITableToggleButton,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof UITableToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const On: Story = {
  args: {
    checked: true,
    titleOn: 'Deactivate account',
    titleOff: 'Activate account',
  },
  render: args => <UITableToggleButton {...args} />,
};

export const Off: Story = {
  args: {
    checked: false,
    titleOn: 'Deactivate account',
    titleOff: 'Activate account',
  },
  render: args => <UITableToggleButton {...args} />,
};

export const Controlled: Story = {
  args: {
    titleOn: 'Deactivate account',
    titleOff: 'Activate account',
  },
  render: args => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-3">
        <UITableToggleButton
          {...args}
          checked={checked}
          onCheckedChange={val => {
            setChecked(val);
            console.log('Toggle changed:', val);
          }}
        />
        <span className="text-sm text-muted-foreground">{checked ? 'Active' : 'Inactive'}</span>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    titleOn: 'Cannot change status',
  },
  render: args => <UITableToggleButton {...args} />,
};
