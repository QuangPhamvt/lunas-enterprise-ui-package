import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Switch Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: null,
      } as {
        value: boolean | null;
      },
      validators: {
        onChange: z.object({
          value: z.boolean().nullable(),
        }),
      },
    });

    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Switch Field">
          <AppField
            name="value"
            children={({ SwitchField }) => {
              return <SwitchField label="Switch Field" description="This is a switch field." helperText="You can toggle this switch." />;
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
