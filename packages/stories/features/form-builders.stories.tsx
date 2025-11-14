import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormBuilder, FormBuilderContent, FormBuilderProvider, FormBuilderSidebar } from '@/components/features/form-builders';

const meta = {
  tags: ['autodocs'],
  title: 'Features/Form Builders',
  component: () => null,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div className="size-full min-h-50">
        <FormBuilderProvider>
          <FormBuilder>
            <FormBuilderSidebar />
            <FormBuilderContent />
          </FormBuilder>
        </FormBuilderProvider>
      </div>
    );
  },
};
