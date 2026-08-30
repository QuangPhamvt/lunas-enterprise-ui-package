import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Date Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { date: null as Date | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Trường chọn ngày đơn giản">
            <div className="px-4 pb-4">
              <AppField name="date" children={({ SimpleDateField }) => <SimpleDateField label="Ngày" placeholder="Chọn ngày" />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const WithMinMaxDate: Story = {
  render: () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { dueDate: null as Date | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Trường chọn ngày đơn giản — Giới hạn Min / Max">
            <div className="px-4 pb-4">
              <AppField
                name="dueDate"
                children={({ SimpleDateField }) => <SimpleDateField label="Hạn chót" placeholder="Chọn hạn chót" required minDate={today} maxDate={maxDate} />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const WithValidationError: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { date: null as Date | null },
      validators: {
        onChange: z.object({
          date: z.date({ error: 'Vui lòng chọn ngày.' }).nullable(),
        }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Trường chọn ngày đơn giản — Kiểm tra hợp lệ">
            <div className="px-4 pb-4">
              <AppField
                name="date"
                validators={{
                  onMount: () => 'Vui lòng chọn ngày.',
                }}
                children={({ SimpleDateField }) => <SimpleDateField label="Ngày" placeholder="Chọn ngày" required />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { date: new Date() as Date | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Trường chọn ngày đơn giản — Vô hiệu hoá">
            <div className="px-4 pb-4">
              <AppField name="date" children={({ SimpleDateField }) => <SimpleDateField label="Ngày" placeholder="Chọn ngày" disabled />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};
