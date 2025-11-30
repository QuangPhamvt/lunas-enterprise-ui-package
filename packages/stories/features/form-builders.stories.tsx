import { FormBuilder } from '@/components/features/form-builders/form-builder';

import type { Meta, StoryObj } from '@storybook/react-vite';

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
        <FormBuilder.Provider>
          <FormBuilder.Container>
            <FormBuilder.Sidebar>
              <FormBuilder.SidebarHeader />
              <FormBuilder.SidebarField />
            </FormBuilder.Sidebar>
            <FormBuilder.Main>
              <FormBuilder.MainFormBuilder />
              <FormBuilder.MainFormPreview />
            </FormBuilder.Main>
          </FormBuilder.Container>
        </FormBuilder.Provider>
      </div>
    );
  },
};
