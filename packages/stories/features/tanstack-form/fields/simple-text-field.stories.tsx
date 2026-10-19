import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Text Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { name: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Text Field">
            <div className="px-4 pb-4">
              <AppField name="name" children={({ SimpleTextField }) => <SimpleTextField label="Full name" placeholder="Enter your name" />} />
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
      defaultValues: { name: null as string | null },
      validators: {
        onChange: z.object({ name: z.string().min(1, 'Name is required.').nullable() }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Text Field — Required">
            <div className="px-4 pb-4">
              <AppField name="name" children={({ SimpleTextField }) => <SimpleTextField label="Full name" placeholder="Enter your name" required />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const WithMaxLength: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { bio: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Text Field — Max Length (50)">
            <div className="px-4 pb-4">
              <AppField
                name="bio"
                children={({ SimpleTextField }) => <SimpleTextField label="Short bio" placeholder="Describe yourself (max 50 chars)" maxLength={50} />}
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
      defaultValues: { name: null as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Text Field — Validation Error">
            <div className="px-4 pb-4">
              <AppField
                name="name"
                validators={{ onMount: () => 'Name is required.' }}
                children={({ SimpleTextField }) => <SimpleTextField label="Full name" placeholder="Enter your name" required />}
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
      defaultValues: { name: 'Tom Nguyen' as string | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Text Field — Disabled">
            <div className="px-4 pb-4">
              <AppField name="name" children={({ SimpleTextField }) => <SimpleTextField label="Full name" placeholder="Enter your name" disabled />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

// ─── Behavior tests (hidden from the sidebar and docs; run by `npm run test:storybook`) ───

const TEST_TAGS = ['!dev', '!autodocs'];

export const TestRendering: Story = {
  tags: TEST_TAGS,
  render: () => {
    const { AppField } = useTanStackForm({
      defaultValues: { name: 'initial' as string | null, email: null as string | null, bare: null as string | null, locked: null as string | null },
    });
    return (
      <div className="grid gap-4" data-testid="fields">
        <AppField name="name" children={({ SimpleTextField }) => <SimpleTextField label="Full Name" />} />
        <AppField name="email" children={({ SimpleTextField }) => <SimpleTextField label="Email" required placeholder="Type here…" />} />
        <AppField name="bare" children={({ SimpleTextField }) => <SimpleTextField maxLength={3} />} />
        <AppField name="locked" children={({ SimpleTextField }) => <SimpleTextField label="Locked" disabled />} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Full Name')).toBeInTheDocument();
    const [name, email, bare, locked] = await canvas.findAllByRole('textbox');
    await expect(name).toHaveValue('initial');
    await expect(email).toHaveValue('');
    await expect(canvas.getByPlaceholderText('Type here…')).toBe(email);
    // Only the required field gets an asterisk; the label-less field renders no <label>.
    await expect(canvas.getAllByText('*')).toHaveLength(1);
    await expect(canvasElement.querySelectorAll('label')).toHaveLength(3);
    await expect(locked).toBeDisabled();

    await userEvent.type(email, 'hello');
    await expect(email).toHaveValue('hello');
    await userEvent.type(bare, 'abcdef');
    await expect(bare).toHaveValue('abc');
  },
};

export const TestTouchedValidation: Story = {
  tags: TEST_TAGS,
  render: () => {
    const { AppField } = useTanStackForm({ defaultValues: { username: null as string | null } });
    return (
      <AppField
        name="username"
        validators={{ onBlur: ({ value }) => (value ? undefined : 'Required') }}
        children={({ SimpleTextField }) => <SimpleTextField label="Username" />}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole('textbox');
    // No error before the field is touched…
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    // …and the onBlur validator reports it once the field loses focus.
    await userEvent.click(input);
    await userEvent.tab();
    await waitFor(() => expect(canvas.getByRole('alert')).toHaveTextContent('Required'));
  },
};
