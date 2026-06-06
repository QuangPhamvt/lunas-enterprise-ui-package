import z from 'zod';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTanStackForm } from '@/components/features/tanstack-form';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Fields/Text Editor Field',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        content: '',
      },
      validators: {
        onChange: z.object({
          content: z.string().min(1, 'Content is required'),
        }),
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Editor Field">
          <AppField
            name="content"
            children={({ TextEditorField }) => (
              <TextEditorField
                label="Content"
                description="Rich text editor with formatting support."
                placeholder="Start writing..."
                showErrorMessage={true}
                required
              />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const { AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({
      defaultValues: {
        body: '',
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Editor Field — Helper Text">
          <AppField
            name="body"
            children={({ TextEditorField }) => (
              <TextEditorField
                label="Article Body"
                description="Write the main content for the article."
                placeholder="Begin your article here..."
                helperText="Supports bold, italic, underline, headings, lists, and text alignment."
                tooltip="Use the toolbar to format your content."
              />
            )}
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
        content: '<p>Some existing content</p>',
      },
    });
    return (
      <TanStackContainerForm>
        <TanStackSectionForm title="Text Editor Field — Submitting">
          <AppField
            name="content"
            children={({ TextEditorField }) => (
              <TextEditorField label="Content" description="Editor is read-only while submitting." placeholder="Start writing..." />
            )}
          />
        </TanStackSectionForm>
      </TanStackContainerForm>
    );
  },
};
