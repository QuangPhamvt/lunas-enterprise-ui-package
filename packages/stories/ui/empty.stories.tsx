import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpRightIcon, FolderIcon } from 'lucide-react';

const meta = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderIcon />
          </EmptyMedia>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>You haven&apos;t created any projects yet. Get started by creating your first project.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button>Create Project</Button>
            <Button variant="outline">Import Project</Button>
          </div>
        </EmptyContent>
        <Button variant="link" asChild className="text-text-positive-weak" size="sm">
          <a href="#">
            Learn More <ArrowUpRightIcon />
          </a>
        </Button>
      </Empty>
    );
  },
};
