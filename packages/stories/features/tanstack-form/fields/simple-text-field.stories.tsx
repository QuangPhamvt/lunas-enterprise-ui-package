import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

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
