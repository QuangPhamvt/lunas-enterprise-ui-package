import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Text Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
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
        <TanStackSectionForm title="Text Field">
          <AppField
            name="value"
            children={({ TextField }) => {
              return (
                <TextField
                  label="Text Field"
                  description="This is a text field. It can be used to input text data. It supports validation, error messages, and helper text. The counter can be enabled to show the number of characters entered. The clear button allows users to quickly clear the input. The orientation can be set to responsive, horizontal, or vertical."
                  placeholder="Enter some text"
                  orientation="responsive"
                  helperText="Helper text for additional info."
                  required
                  counter
                  maxLength={50}
                  showClearButton={true}
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
            children={({ TextField }) => {
              return (
                <TextField
                  label="Text Field"
                  description="This is a text field."
                  placeholder="Enter some text"
                  orientation="responsive"
                  showClearButton={true}
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

export const Disabled: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { value: 'Prefilled but locked' },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Field - Disabled">
          <AppField
            name="value"
            children={({ TextField }) => (
              <TextField
                label="Locked Field"
                description="This field is explicitly disabled — the clear button and typing are blocked."
                placeholder="Not editable"
                orientation="responsive"
                disabled
                showClearButton
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
    const maxLength = 30;
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        fresh: null as string | null,
        nearLimit: 'Almost at the character limit' as string | null,
        atLimit: 'Exactly at the character limi' as string | null,
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Field - Character Counter">
          <AppField
            name="fresh"
            children={({ TextField }) => (
              <TextField
                label="Empty (0 / 30)"
                placeholder="Start typing…"
                orientation="responsive"
                counter
                maxLength={maxLength}
                showClearButton
                showErrorMessage
              />
            )}
          />
          <AppField
            name="nearLimit"
            children={({ TextField }) => (
              <TextField
                label="Near limit (≥ 80%)"
                description="Counter turns warning colour."
                orientation="responsive"
                counter
                maxLength={maxLength}
                showClearButton
                showErrorMessage
              />
            )}
          />
          <AppField
            name="atLimit"
            children={({ TextField }) => (
              <TextField
                label="At limit (30 / 30)"
                description="Counter turns danger colour; typing is blocked."
                orientation="responsive"
                counter
                maxLength={maxLength}
                showClearButton
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
      username: z
        .string()
        .min(3, 'At least 3 characters')
        .max(20, 'Max 20 characters')
        .regex(/^[a-z0-9_]+$/, 'Only lowercase letters, numbers and underscores')
        .nullable(),
    });
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { username: null as string | null },
      validators: { onChange: schema },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Field - Blur Validation">
          <AppField
            name="username"
            children={({ TextField }) => (
              <TextField
                label="Username"
                description="Click in, type something invalid, then tab out — the error appears immediately on blur."
                placeholder="e.g. john_doe"
                orientation="responsive"
                showClearButton
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
        <TanStackSectionForm title="Text Field - Orientations">
          <AppField
            name="horizontal"
            children={({ TextField }) => (
              <TextField
                label="Horizontal"
                description="Label sits to the left of the input."
                placeholder="Enter text"
                orientation="horizontal"
                showClearButton
                showErrorMessage
              />
            )}
          />
          <AppField
            name="vertical"
            children={({ TextField }) => (
              <TextField
                label="Vertical"
                description="Label sits above the input."
                placeholder="Enter text"
                orientation="vertical"
                showClearButton
                showErrorMessage
              />
            )}
          />
          <AppField
            name="responsive"
            children={({ TextField }) => (
              <TextField
                label="Responsive"
                description="Switches between vertical (mobile) and horizontal (desktop)."
                placeholder="Enter text"
                orientation="responsive"
                showClearButton
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
      username: z.string().min(3, 'At least 3 characters').nullable(),
      email: z.string().email('Invalid email').nullable(),
      bio: z.string().max(100, 'Max 100 characters').nullable(),
      website: z.string().url('Must be a valid URL').nullable(),
      locked: z.string().nullable(),
    });
    const { AppField, AppForm, TanStackContainerForm, TanStackSectionForm, TanStackActionsForm } = useTanStackForm({
      defaultValues: {
        username: null as string | null,
        email: null as string | null,
        bio: null as string | null,
        website: null as string | null,
        locked: 'Cannot edit this' as string | null,
      } as z.output<typeof schema>,
      validators: { onChange: schema },
      onSubmit: ({ value }) => console.log('Submitted:', value),
    });
    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <AppForm>
          <TanStackContainerForm>
            <TanStackSectionForm title="Kitchen Sink — all TextField features">
              <AppField
                name="username"
                children={({ TextField }) => (
                  <TextField
                    label="Username"
                    description="Validates on change. Shows ban icon and error below."
                    placeholder="john_doe"
                    orientation="responsive"
                    showClearButton
                    showErrorMessage
                    required
                    tooltip="Used as your unique public handle."
                  />
                )}
              />
              <AppField
                name="email"
                children={({ TextField }) => (
                  <TextField
                    label="Email"
                    placeholder="you@example.com"
                    orientation="responsive"
                    showErrorMessage
                    required
                    helperText="We'll send a verification link here."
                  />
                )}
              />
              <AppField
                name="bio"
                children={({ TextField }) => (
                  <TextField
                    label="Short Bio"
                    placeholder="Tell us about yourself…"
                    orientation="responsive"
                    counter
                    maxLength={100}
                    showClearButton
                    showErrorMessage
                    tooltip="Appears on your public profile."
                  />
                )}
              />
              <AppField
                name="website"
                children={({ TextField }) => (
                  <TextField
                    label="Website"
                    placeholder="https://example.com"
                    orientation="responsive"
                    showClearButton
                    showErrorMessage
                    helperText="Must start with https://"
                  />
                )}
              />
              <AppField
                name="locked"
                children={({ TextField }) => (
                  <TextField
                    label="Read-only Field"
                    description="disabled prop prevents all interaction."
                    orientation="responsive"
                    disabled
                    showClearButton
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
