import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Radio Group Field',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: '',
      },
      validators: {
        onChange: z.object({
          value: z.string().nonempty(),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Date Field">
          <AppField
            name="value"
            children={({ RadioGroupField }) => {
              return (
                <RadioGroupField
                  label="Select Field"
                  description="This is a select field."
                  orientation="responsive"
                  options={[
                    { label: 'Option 1', value: 'option_1', description: 'This is option 1' },
                    { label: 'Option 2', value: 'option_2', description: 'This is option 2' },
                    { label: 'Option 3', value: 'option_3', description: 'This is option 3' },
                  ]}
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
