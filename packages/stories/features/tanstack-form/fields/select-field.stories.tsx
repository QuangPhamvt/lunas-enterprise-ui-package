import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Select Field',
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
          value: z.string(),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field">
          <AppField
            name="value"
            children={({ SelectField }) => {
              return (
                <SelectField
                  label="Select Field"
                  description="This is a select field."
                  placeholder="Select an option"
                  orientation="responsive"
                  options={[
                    { label: 'Option 1', value: 'option_1' },
                    { label: 'Option 2', value: 'option_2' },
                    { label: 'Option 3', value: 'option_3' },
                    { label: 'Option 4', value: 'option_4' },
                    { label: 'Option 5', value: 'option_5' },
                    { label: 'Option 6', value: 'option_6' },
                    { label: 'Option 7', value: 'option_7' },
                    { label: 'Option 8', value: 'option_8' },
                    { label: 'Option 9', value: 'option_9' },
                    { label: 'Option 10', value: 'option_10' },
                    { label: 'Option 11', value: 'option_11' },
                    { label: 'Option 12', value: 'option_12' },
                    { label: 'Option 13', value: 'option_13' },
                    { label: 'Option 14', value: 'option_14' },
                    { label: 'Option 15', value: 'option_15' },
                    { label: 'Option 16', value: 'option_16' },
                    { label: 'Option 17', value: 'option_17' },
                    { label: 'Option 18', value: 'option_18' },
                    { label: 'Option 19', value: 'option_19' },
                    { label: 'Option 20', value: 'option_20' },
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

export const Mobile: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: '',
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field — Mobile Drawer">
          <AppField
            name="value"
            children={({ SelectField }) => (
              <SelectField
                label="Select Field"
                description="On mobile this opens a bottom drawer."
                placeholder="Select an option"
                orientation="responsive"
                options={[
                  { label: 'Option 1', value: 'option_1' },
                  { label: 'Option 2', value: 'option_2' },
                  { label: 'Option 3', value: 'option_3' },
                  { label: 'Option 4', value: 'option_4' },
                  { label: 'Option 5', value: 'option_5' },
                ]}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  parameters: {
    viewport: { defaultViewport: 'iphonex' },
  },
};

export const Submitting: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultState: {
        isSubmitting: true,
      },
      defaultValues: {
        value: '',
      },
      validators: {
        onChange: z.object({
          value: z.string().min(5, 'Minimum 5 characters').max(50, 'Maximum 50 characters'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Select Field - Submitting">
          <AppField
            name="value"
            children={({ SelectField }) => {
              return (
                <SelectField
                  label="Select Field"
                  description="This is a select field."
                  placeholder="Select an option"
                  orientation="responsive"
                  options={[
                    { label: 'Option 1', value: 'option_1' },
                    { label: 'Option 2', value: 'option_2' },
                    { label: 'Option 3', value: 'option_3' },
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
