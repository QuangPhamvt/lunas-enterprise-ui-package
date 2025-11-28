import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Date Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: new Date(),
      },
      validators: {
        onChange: z.object({
          value: z.date(),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Date Field">
          <AppField
            name="value"
            children={({ DateField }) => {
              return <DateField label="Select Field" description="This is a select field." placeholder="Select an option" orientation="responsive" />;
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
