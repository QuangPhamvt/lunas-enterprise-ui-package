import { TanStackActionSubmit, TanStackActionsForm, useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Actions Form',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  render: () => {
    const form = useTanStackForm({ defaultValues: { name: '' } });
    return (
      <form.AppForm>
        <div className="grid w-96 gap-4">
          <form.AppField name="name" children={({ TextField }) => <TextField label="Tên" />} />
          <TanStackActionsForm type="create" />
        </div>
      </form.AppForm>
    );
  },
};

export const Update: Story = {
  render: () => {
    const form = useTanStackForm({ defaultValues: { name: 'Lunas' } });
    return (
      <form.AppForm>
        <div className="grid w-96 gap-4">
          <form.AppField name="name" children={({ TextField }) => <TextField label="Tên" />} />
          <TanStackActionsForm type="update" />
        </div>
      </form.AppForm>
    );
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestCreateButtons: Story = {
  ...Create,
  tags: TEST_TAGS,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submit = await canvas.findByRole('button', { name: /Thêm mới/ });
    const cancel = canvas.getByRole('button', { name: /Hủy bỏ/ });
    // Both actions stay disabled until the form is edited.
    await expect(submit).toBeDisabled();
    await expect(cancel).toBeDisabled();

    await userEvent.type(await canvas.findByRole('textbox'), 'Áo thun');
    await expect(submit).toBeEnabled();
    await expect(cancel).toBeEnabled();
  },
};

export const TestUpdateButtons: Story = {
  ...Update,
  tags: TEST_TAGS,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('button', { name: /Cập nhật/ })).toBeDisabled();
    await expect(canvas.queryByRole('button', { name: /Thêm mới/ })).not.toBeInTheDocument();
  },
};

export const TestActionSubmit: Story = {
  tags: TEST_TAGS,
  render: () => {
    const form = useTanStackForm({ defaultValues: { name: '' } });
    return (
      <form.AppForm>
        <div className="flex gap-2">
          <TanStackActionSubmit />
          <TanStackActionSubmit label="Save Changes" />
        </div>
      </form.AppForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Default label, a custom label, and both disabled while the form is pristine.
    await expect(await canvas.findByRole('button', { name: /Xác nhận/ })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Save Changes' })).toBeDisabled();
  },
};
