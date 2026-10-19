import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

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

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestToggle: Story = {
  tags: TEST_TAGS,
  render: () => {
    const { AppField } = useTanStackForm({ defaultValues: { off: null as boolean | null, on: true as boolean | null } });
    return (
      <div className="grid gap-4">
        <AppField name="off" children={({ SwitchField }) => <SwitchField label="Enable notifications" description="Receive email alerts" />} />
        <AppField name="on" children={({ SwitchField }) => <SwitchField label="Marketing emails" />} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Enable notifications')).toBeInTheDocument();
    await expect(canvas.getByText('Receive email alerts')).toBeInTheDocument();
    const [off, on] = await canvas.findAllByRole('switch');
    // null renders as unchecked.
    await expect(off).not.toBeChecked();
    await expect(on).toBeChecked();
    await userEvent.click(off);
    await expect(off).toBeChecked();
    await userEvent.click(on);
    await expect(on).not.toBeChecked();
  },
};
