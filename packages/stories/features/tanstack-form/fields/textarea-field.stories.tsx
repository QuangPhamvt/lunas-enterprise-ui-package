import z from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTanStackForm } from '@/components/features/tanstack-form';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Textarea Field',
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
          value: z.string().min(5, 'Minimum 5 characters').max(3000, 'Maximum 3000 characters'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Field">
          <AppField
            name="value"
            children={({ TextareaField }) => {
              return (
                <TextareaField
                  label="Text Field"
                  description="This is a text field. It can be used to input text data. It supports validation, error messages, and helper text. The counter can be enabled to show the number of characters entered. The clear button allows users to quickly clear the input. The orientation can be set to responsive, horizontal, or vertical."
                  placeholder="Enter some text"
                  orientation="responsive"
                  helperText="Helper text for additional info."
                  required
                  counter
                  maxLength={50}
                  showErrorMessage={true}
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
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
        <TanStackSectionForm title="Text Field - Submitting">
          <AppField
            name="value"
            children={({ TextareaField }) => {
              return (
                <TextareaField
                  label="Text Field"
                  description="This is a text field."
                  placeholder="Enter some text"
                  maxLength={50}
                  orientation="responsive"
                  showErrorMessage={true}
                />
              );
            }}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const CopyButton: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        notes: 'This text was pre-filled. Click the copy icon in the top-right corner to copy it to your clipboard.' as string | null,
        empty: null as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Textarea Field - Copy Button">
          <AppField
            name="notes"
            children={({ TextareaField }) => (
              <TextareaField
                label="With value (copy button visible)"
                description="Copy icon appears when the textarea has content."
                orientation="responsive"
                showErrorMessage
              />
            )}
          />
          <AppField
            name="empty"
            children={({ TextareaField }) => (
              <TextareaField
                label="Empty (no copy button)"
                description="Type something to make the copy icon appear."
                placeholder="Start typing…"
                orientation="responsive"
                showErrorMessage
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        value: 'This content is locked and cannot be edited.' as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Textarea Field - Disabled">
          <AppField
            name="value"
            children={({ TextareaField }) => (
              <TextareaField
                label="Locked Field"
                description="disabled prop prevents typing and hides the copy button."
                orientation="responsive"
                disabled
                showErrorMessage
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const WithCounter: Story = {
  render: () => {
    const maxLength = 200;
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        fresh: null as string | null,
        nearLimit: 'Almost at the character limit — keep typing to see the warning colour change as you approach the maximum allowed length for this field.' as string | null,
        atLimit: 'Exactly at the two-hundred character limit. No more characters can be entered past this point because the field enforces a hard maximum length cap.' as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Textarea Field - Character Counter">
          <AppField
            name="fresh"
            children={({ TextareaField }) => (
              <TextareaField
                label="Empty (0 / 200)"
                placeholder="Start typing…"
                orientation="responsive"
                counter
                maxLength={maxLength}
                showErrorMessage
              />
            )}
          />
          <AppField
            name="nearLimit"
            children={({ TextareaField }) => (
              <TextareaField
                label="Near limit (≥ 80%)"
                description="Counter turns warning colour."
                orientation="responsive"
                counter
                maxLength={maxLength}
                showErrorMessage
              />
            )}
          />
          <AppField
            name="atLimit"
            children={({ TextareaField }) => (
              <TextareaField
                label="At limit (200 / 200)"
                description="Counter turns danger colour; typing is blocked."
                orientation="responsive"
                counter
                maxLength={maxLength}
                showErrorMessage
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const BlurValidation: Story = {
  render: () => {
    const schema = z.object({
      bio: z
        .string()
        .min(20, 'At least 20 characters')
        .max(500, 'Max 500 characters')
        .nullable(),
    });
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { bio: null as string | null },
      validators: { onChange: schema },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Textarea Field - Blur Validation">
          <AppField
            name="bio"
            children={({ TextareaField }) => (
              <TextareaField
                label="Bio"
                description="Click in, type something short, then tab out — the error appears on blur."
                placeholder="Tell us about yourself (min 20 characters)…"
                orientation="responsive"
                counter
                maxLength={500}
                showErrorMessage
                required
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
        horizontal: null as string | null,
        vertical: null as string | null,
        responsive: null as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Textarea Field - Orientations">
          <AppField
            name="horizontal"
            children={({ TextareaField }) => (
              <TextareaField
                label="Horizontal"
                description="Label sits to the left."
                placeholder="Enter text"
                orientation="horizontal"
                showErrorMessage
              />
            )}
          />
          <AppField
            name="vertical"
            children={({ TextareaField }) => (
              <TextareaField
                label="Vertical"
                description="Label sits above."
                placeholder="Enter text"
                orientation="vertical"
                showErrorMessage
              />
            )}
          />
          <AppField
            name="responsive"
            children={({ TextareaField }) => (
              <TextareaField
                label="Responsive"
                description="Switches layout by breakpoint."
                placeholder="Enter text"
                orientation="responsive"
                showErrorMessage
              />
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
      description: z.string().min(10, 'At least 10 characters').nullable(),
      notes: z.string().max(300, 'Max 300 characters').nullable(),
      locked: z.string().nullable(),
    });
    const { AppField, AppForm, TanStackContainerForm, TanStackSectionForm, TanStackActionsForm } = useTanStackForm({
      defaultValues: {
        description: null as string | null,
        notes: 'Pre-filled notes that can be copied to clipboard using the copy icon.' as string | null,
        locked: 'Read-only content — disabled prop is set.' as string | null,
      } as z.output<typeof schema>,
      validators: { onChange: schema },
      onSubmit: ({ value }) => console.log('Submitted:', value),
    });
    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Kitchen Sink — all TextareaField features">
              <AppField
                name="description"
                children={({ TextareaField }) => (
                  <TextareaField
                    label="Description"
                    description="Validates on change. Shows ban icon and error below."
                    placeholder="Enter at least 10 characters…"
                    orientation="responsive"
                    showErrorMessage
                    required
                    tooltip="Shown publicly on your profile."
                    helperText="Keep it concise and professional."
                  />
                )}
              />
              <AppField
                name="notes"
                children={({ TextareaField }) => (
                  <TextareaField
                    label="Notes (with copy)"
                    description="Has a pre-filled value — copy icon appears in the top-right corner."
                    orientation="responsive"
                    counter
                    maxLength={300}
                    showErrorMessage
                    tooltip="Internal notes, not shown publicly."
                  />
                )}
              />
              <AppField
                name="locked"
                children={({ TextareaField }) => (
                  <TextareaField
                    label="Read-only Field"
                    description="disabled prop prevents all interaction and hides the copy button."
                    orientation="responsive"
                    disabled
                    showErrorMessage
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
