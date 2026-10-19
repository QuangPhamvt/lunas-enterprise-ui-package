import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

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
          value: z.string().min(1, 'Please select an option'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Field">
          <AppField
            name="value"
            children={({ RadioGroupField }) => {
              return (
                <RadioGroupField
                  label="Radio Group Field"
                  description="This is a radio group field."
                  options={[
                    { label: 'Option 1', value: 'option1', description: 'This is option 1' },
                    { label: 'Option 2', value: 'option2', description: 'This is option 2' },
                    { label: 'Option 3', value: 'option3', description: 'This is option 3' },
                  ]}
                  orientation="responsive"
                  helperText="Please select one of the options."
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

const TEST_OPTIONS = [
  { value: 'a', label: 'Option A', description: 'First option' },
  { value: 'b', label: 'Option B', description: 'Second option' },
  { value: 'c', label: 'Option C', description: 'Third option' },
];

export const TestSelection: Story = {
  tags: TEST_TAGS,
  render: () => {
    const { AppField } = useTanStackForm({ defaultValues: { plan: 'b' as string | null } });
    return <AppField name="plan" children={({ RadioGroupField }) => <RadioGroupField label="Select a plan" options={TEST_OPTIONS} />} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Select a plan')).toBeInTheDocument();
    for (const option of TEST_OPTIONS) {
      await expect(canvas.getByText(option.label)).toBeInTheDocument();
      await expect(canvas.getByText(option.description)).toBeInTheDocument();
    }
    const radios = canvas.getAllByRole('radio');
    await expect(radios).toHaveLength(TEST_OPTIONS.length);
    // The default value is selected.
    await expect(radios[1]).toBeChecked();

    await userEvent.click(radios[0]);
    await expect(radios[0]).toBeChecked();
    await expect(radios[1]).not.toBeChecked();
  },
};
