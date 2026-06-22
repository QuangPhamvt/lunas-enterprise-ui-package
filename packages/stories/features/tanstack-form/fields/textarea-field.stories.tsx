import z from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

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
            children={({ TextareaField }) => (
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
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    // starts empty, counter at 0 / 50
    await expect(textarea).toHaveValue('');
    await expect(canvas.getByText('0 / 50 ký tự')).toBeInTheDocument();

    // no errors before interaction
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

    // typing updates value and counter
    await userEvent.type(textarea, 'Hello');
    await expect(textarea).toHaveValue('Hello');
    await expect(canvas.getByText('5 / 50 ký tự')).toBeInTheDocument();

    // 5 chars satisfies min(5) — FieldError mounts (field dirty) but has no error text
    await expect(canvas.getByRole('alert')).not.toHaveTextContent('Minimum 5 characters');
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
            children={({ TextareaField }) => (
              <TextareaField
                label="Text Field"
                description="This is a text field."
                placeholder="Enter some text"
                maxLength={50}
                orientation="responsive"
                showErrorMessage={true}
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    // disabled while form is submitting
    await expect(textarea).toBeDisabled();

    // copy button not rendered when disabled
    await expect(canvas.queryByRole('button', { name: 'Sao chép' })).not.toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textareas = canvas.getAllByRole('textbox');

    // pre-filled field has exactly one copy button
    await expect(canvas.getAllByRole('button', { name: 'Sao chép' })).toHaveLength(1);

    // empty field has no copy button
    await expect(textareas[1]).toHaveValue('');

    // typing into the empty field makes the copy button appear
    await userEvent.type(textareas[1], 'some text');
    await expect(canvas.getAllByRole('button', { name: 'Sao chép' })).toHaveLength(2);

    // clearing the second textarea removes its copy button
    await userEvent.clear(textareas[1]);
    await expect(canvas.getAllByRole('button', { name: 'Sao chép' })).toHaveLength(1);
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await expect(textarea).toBeDisabled();
    await expect(textarea).toHaveValue('This content is locked and cannot be edited.');

    // copy button hidden when disabled even though field has value
    await expect(canvas.queryByRole('button', { name: 'Sao chép' })).not.toBeInTheDocument();

    // value is unchanged — no interaction can modify a disabled field
    await expect(textarea).toHaveValue('This content is locked and cannot be edited.');
  },
};

export const WithCounter: Story = {
  render: () => {
    const maxLength = 200;
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        fresh: null as string | null,
        // 165 chars = 82.5 % of 200 → triggers warning colour (threshold ≥ 80 %)
        nearLimit:
          'Near the character limit. Keep typing to see the warning colour appear. You are approaching the maximum length allowed for this text input field here. More text now!' as
            | string
            | null,
        // 200 chars = 100 % of 200 → triggers danger colour and blocks further input
        atLimit:
          'Near the character limit. Keep typing to see the warning colour appear. You are approaching the maximum length allowed for this text input field here. More text now! This is now at exactly 200 chars!!' as
            | string
            | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Textarea Field - Character Counter">
          <AppField
            name="fresh"
            children={({ TextareaField }) => (
              <TextareaField label="Empty (0 / 200)" placeholder="Start typing…" orientation="responsive" counter maxLength={maxLength} showErrorMessage />
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // fresh field starts at 0
    await expect(canvas.getByText('0 / 200 ký tự')).toBeInTheDocument();

    // near-limit field: 165 chars = 82.5 % → warning colour
    const nearCounter = canvas.getByText('165 / 200 ký tự');
    await expect(nearCounter).toHaveClass('text-warning-strong');

    // at-limit field: 200 chars = 100 % → danger colour
    const atCounter = canvas.getByText('200 / 200 ký tự');
    await expect(atCounter).toHaveClass('text-danger-strong');

    // typing into the fresh field updates its counter
    const textareas = canvas.getAllByRole('textbox');
    await userEvent.type(textareas[0], 'Hello');
    await expect(canvas.getByText('5 / 200 ký tự')).toBeInTheDocument();

    // at-limit field blocks additional input
    const atLimitTextarea = textareas[2];
    const valueBefore = (atLimitTextarea as HTMLTextAreaElement).value;
    await userEvent.type(atLimitTextarea, 'X');
    await expect(atLimitTextarea).toHaveValue(valueBefore);
  },
};

export const BlurValidation: Story = {
  render: () => {
    const schema = z.object({
      bio: z.string().min(20, 'At least 20 characters').max(500, 'Max 500 characters').nullable(),
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    // no errors before any interaction
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();

    // type something too short — isDirty triggers validation
    await userEvent.type(textarea, 'Too short');
    await waitFor(() => expect(canvas.getByRole('alert')).toBeInTheDocument());
    await expect(canvas.getByRole('alert')).toHaveTextContent('At least 20 characters');

    // fix the value — error text clears (alert container stays in DOM)
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'This is definitely long enough to pass');
    await waitFor(() => expect(canvas.getByRole('alert')).not.toHaveTextContent('At least 20 characters'));
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
              <TextareaField label="Horizontal" description="Label sits to the left." placeholder="Enter text" orientation="horizontal" showErrorMessage />
            )}
          />
          <AppField
            name="vertical"
            children={({ TextareaField }) => (
              <TextareaField label="Vertical" description="Label sits above." placeholder="Enter text" orientation="vertical" showErrorMessage />
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textareas = canvas.getAllByRole('textbox');

    // all three orientations render an enabled, empty textarea
    await expect(textareas).toHaveLength(3);
    for (const textarea of textareas) {
      await expect(textarea).not.toBeDisabled();
      await expect(textarea).toHaveValue('');
    }

    // each textarea accepts input independently
    await userEvent.type(textareas[0], 'horizontal');
    await userEvent.type(textareas[1], 'vertical');
    await userEvent.type(textareas[2], 'responsive');
    await expect(textareas[0]).toHaveValue('horizontal');
    await expect(textareas[1]).toHaveValue('vertical');
    await expect(textareas[2]).toHaveValue('responsive');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // description — type too short, error appears
    const descriptionTextarea = canvas.getByPlaceholderText('Enter at least 10 characters…');
    await userEvent.type(descriptionTextarea, 'Short');
    await waitFor(() => expect(canvas.getByRole('alert')).toBeInTheDocument());
    await expect(canvas.getByRole('alert')).toHaveTextContent('At least 10 characters');

    // fix description — error clears
    await userEvent.type(descriptionTextarea, ' enough now');
    await waitFor(() => expect(canvas.getByRole('alert')).not.toHaveTextContent('At least 10 characters'));

    // notes — pre-filled value shows copy button; description also has content now (2 total)
    await expect(canvas.getAllByRole('button', { name: 'Sao chép' })).toHaveLength(2);
    await expect(canvas.getByText(/\/ 300 ký tự/)).toBeInTheDocument();

    // locked field is disabled; copy button hidden despite having a value
    const lockedTextarea = canvas.getByDisplayValue('Read-only content — disabled prop is set.');
    await expect(lockedTextarea).toBeDisabled();
  },
};
