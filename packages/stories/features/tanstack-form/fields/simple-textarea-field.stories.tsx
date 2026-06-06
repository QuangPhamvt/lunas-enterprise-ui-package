import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Textarea Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { notes: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Textarea Field">
            <div className="px-4 pb-4">
              <AppField name="notes" children={({ SimpleTextareaField }) => <SimpleTextareaField label="Notes" placeholder="Enter additional notes…" />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const WithRowsAndMaxLength: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { description: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Textarea Field — Rows & Max Length">
            <div className="px-4 pb-4">
              <AppField
                name="description"
                children={({ SimpleTextareaField }) => (
                  <SimpleTextareaField label="Description" placeholder="Describe in detail… (max 300 chars)" rows={5} maxLength={300} />
                )}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const Required: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { notes: null as string | null },
      validators: {
        onChange: z.object({ notes: z.string().min(10, 'Notes must be at least 10 characters.').nullable() }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Textarea Field — Required">
            <div className="px-4 pb-4">
              <AppField
                name="notes"
                children={({ SimpleTextareaField }) => <SimpleTextareaField label="Notes" placeholder="Enter at least 10 characters" required />}
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
      defaultValues: { notes: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Textarea Field — Validation Error">
            <div className="px-4 pb-4">
              <AppField
                name="notes"
                validators={{ onMount: () => 'Notes must be at least 10 characters.' }}
                children={({ SimpleTextareaField }) => <SimpleTextareaField label="Notes" placeholder="Enter additional notes…" required />}
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
      defaultValues: { notes: 'This field is read-only.' as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Textarea Field — Disabled">
            <div className="px-4 pb-4">
              <AppField
                name="notes"
                children={({ SimpleTextareaField }) => <SimpleTextareaField label="Notes" placeholder="Enter additional notes…" disabled />}
              />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};
