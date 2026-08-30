import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Date Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as Date | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Trường chọn ngày">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField label="Hạn chót" description="Chọn ngày từ lịch hoặc dùng mốc có sẵn." placeholder="Chọn ngày" orientation="responsive" />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Trigger shows placeholder initially
    const trigger = await canvas.findByRole('button', { name: /chọn ngày/i });
    await userEvent.click(trigger);

    // Click the "Hôm nay" preset — popover should close
    const todayBtn = await waitFor(() => within(document.body).getByRole('button', { name: /hôm nay/i }));
    await userEvent.click(todayBtn);

    // Trigger now shows the formatted date (not the placeholder)
    await waitFor(() => expect(canvas.queryByRole('button', { name: /^chọn ngày$/i })).not.toBeInTheDocument());
  },
};

export const Submitting: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultState: { isSubmitting: true },
      defaultValues: { value: new Date() },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Trường chọn ngày — Đang gửi">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField label="Hạn chót" description="Nút bị vô hiệu hoá khi biểu mẫu đang được gửi." placeholder="Chọn ngày" orientation="responsive" />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button');
    expect(trigger).toBeDisabled();
  },
};

export const Disabled: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        withValue: new Date() as Date | null,
        empty: null as Date | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Trường chọn ngày — Vô hiệu hoá">
          <AppField
            name="withValue"
            children={({ DateField }) => (
              <DateField
                label="Ngày bắt đầu (đã chọn sẵn + vô hiệu hoá)"
                description="Có giá trị nhưng không thể thay đổi."
                placeholder="Chọn ngày"
                orientation="responsive"
                disabled
              />
            )}
          />
          <AppField
            name="empty"
            children={({ DateField }) => (
              <DateField
                label="Ngày kết thúc (trống + vô hiệu hoá)"
                description="Không thể mở khi đang vô hiệu hoá."
                placeholder="Chọn ngày"
                orientation="responsive"
                disabled
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    triggers.forEach(btn => expect(btn).toBeDisabled());
    expect(within(document.body).queryByRole('listbox')).not.toBeInTheDocument();
  },
};

export const Validation: Story = {
  render: () => {
    const schema = z.object({
      value: z
        .date()
        .nullable()
        .refine(v => v !== null, 'Vui lòng chọn ngày'),
    });
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as Date | null },
      // onMount pre-computes errors; they're revealed once the field is touched
      validators: { onMount: schema, onChange: schema },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Trường chọn ngày — Kiểm tra hợp lệ">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField
                label="Hạn chót"
                description="Mở rồi đóng lại mà không chọn để xem lỗi trường bắt buộc."
                placeholder="Chọn ngày"
                orientation="responsive"
                required
                showErrorMessage
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // No error initially (field not yet touched)
    expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

    // Open then close without selecting → blur fires → error appears
    const trigger = await canvas.findByRole('button', { name: /chọn ngày/i });
    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');

    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('Vui lòng chọn ngày'));

    // Select today → error clears
    await userEvent.click(canvas.getByRole('button', { name: /chọn ngày/i }));
    const todayBtn = await waitFor(() => within(document.body).getByRole('button', { name: /hôm nay/i }));
    await userEvent.click(todayBtn);

    await waitFor(() => expect(canvas.getByRole('alert')).not.toHaveTextContent('Vui lòng chọn ngày'));
  },
};

export const WithConstraints: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as Date | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Trường chọn ngày — Có giới hạn">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField
                label="Ngày hẹn"
                description="Chỉ có thể chọn ngày trong khoảng ±7 ngày kể từ hôm nay."
                placeholder="Chọn ngày"
                orientation="responsive"
                minDate={minDate}
                maxDate={maxDate}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByRole('button', { name: /chọn ngày/i }));

    // Calendar should be visible
    await waitFor(() => expect(within(document.body).getByRole('grid')).toBeInTheDocument());

    // Close without selecting
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(within(document.body).queryByRole('grid')).not.toBeInTheDocument());
  },
};

export const WithTooltip: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: null as Date | null },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Trường chọn ngày — Gợi ý & Ghi chú">
          <AppField
            name="value"
            children={({ DateField }) => (
              <DateField
                label="Ngày hết hạn hợp đồng"
                description="Ngày mà hợp đồng hết hiệu lực."
                placeholder="Chọn ngày"
                orientation="responsive"
                tooltip="Ngày này quyết định thời điểm tự động gia hạn được kích hoạt."
                helperText="Bạn sẽ nhận được nhắc nhở 30 ngày trước ngày này."
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const Orientations: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        horizontal: null as Date | null,
        vertical: null as Date | null,
        responsive: null as Date | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Trường chọn ngày — Bố cục">
          <AppField
            name="horizontal"
            children={({ DateField }) => <DateField label="Ngang" description="Nhãn nằm bên trái." placeholder="Chọn…" orientation="horizontal" />}
          />
          <AppField
            name="vertical"
            children={({ DateField }) => <DateField label="Dọc" description="Nhãn nằm phía trên." placeholder="Chọn…" orientation="vertical" />}
          />
          <AppField
            name="responsive"
            children={({ DateField }) => (
              <DateField label="Đáp ứng" description="Chuyển đổi theo kích thước màn hình." placeholder="Chọn…" orientation="responsive" />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const KitchenSink: Story = {
  render: () => {
    const schema = z.object({
      start: z
        .date()
        .nullable()
        .refine(v => v !== null, 'Ngày bắt đầu là bắt buộc'),
      end: z.date().nullable(),
      locked: z.date().nullable(),
    });
    const { AppField, AppForm, TanStackContainerForm, TanStackSectionForm, TanStackActionsForm } = useTanStackForm({
      defaultValues: {
        start: null as Date | null,
        end: new Date() as Date | null,
        locked: new Date() as Date | null,
      } as z.output<typeof schema>,
      validators: { onChange: schema },
      onSubmit: ({ value }) => console.log('Đã gửi:', value),
    });
    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Tổng hợp — toàn bộ tính năng của DateField">
              <AppField
                name="start"
                children={({ DateField }) => (
                  <DateField
                    label="Ngày bắt đầu"
                    description="Bắt buộc. Mở ra để xem lỗi kiểm tra hợp lệ."
                    placeholder="Chọn ngày bắt đầu"
                    orientation="responsive"
                    required
                    showErrorMessage
                    tooltip="Dự án chính thức bắt đầu vào ngày này."
                    helperText="Phải là ngày làm việc."
                  />
                )}
              />
              <AppField
                name="end"
                children={({ DateField }) => (
                  <DateField
                    label="Ngày kết thúc"
                    description="Đã chọn sẵn. Có thể thay đổi."
                    placeholder="Chọn ngày kết thúc"
                    orientation="responsive"
                    showErrorMessage
                  />
                )}
              />
              <AppField
                name="locked"
                children={({ DateField }) => (
                  <DateField
                    label="Ngày rà soát (chỉ đọc)"
                    description="Thuộc tính disabled — không thể thay đổi."
                    placeholder="Chọn ngày"
                    orientation="responsive"
                    disabled
                  />
                )}
              />
            </TanStackSectionForm>
            <TanStackActionsForm type="create" />
          </TanStackContainerForm>
        </AppForm>
      </div>
    );
  },
};
