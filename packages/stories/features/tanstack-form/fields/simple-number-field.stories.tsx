import z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Simple Number Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { quantity: null as number | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Number Field">
            <div className="px-4 pb-4">
              <AppField name="quantity" children={({ SimpleNumberField }) => <SimpleNumberField label="Quantity" placeholder="0" />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const WithUnit: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { price: null as number | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Number Field — With Unit">
            <div className="px-4 pb-4">
              <AppField name="price" children={({ SimpleNumberField }) => <SimpleNumberField label="Unit price" placeholder="0" unit="¥" required />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const AllowNegative: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: { adjustment: null as number | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Number Field — Allow Negative">
            <div className="px-4 pb-4">
              <AppField
                name="adjustment"
                children={({ SimpleNumberField }) => <SimpleNumberField label="Price adjustment" placeholder="0" unit="¥" allowNegative />}
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
      defaultValues: { quantity: null as number | null },
      validators: {
        onChange: z.object({ quantity: z.number().min(1, 'Quantity must be at least 1.').nullable() }),
      },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Number Field — Validation Error">
            <div className="px-4 pb-4">
              <AppField
                name="quantity"
                validators={{ onMount: () => 'Quantity must be at least 1.' }}
                children={({ SimpleNumberField }) => <SimpleNumberField label="Quantity" placeholder="0" required />}
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
      defaultValues: { quantity: 5 as number | null },
    });
    return (
      <div className="bg-muted-bg-subtle p-6">
        <TanStackContainerForm>
          <TanStackSectionForm title="Simple Number Field — Disabled">
            <div className="px-4 pb-4">
              <AppField name="quantity" children={({ SimpleNumberField }) => <SimpleNumberField label="Quantity" placeholder="0" disabled />} />
            </div>
          </TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};
