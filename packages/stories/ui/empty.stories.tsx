import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpRightIcon, BellIcon, CloudIcon, FolderIcon, RefreshCcwIcon } from 'lucide-react';

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
            <Button variant="outline" color="muted">
              Import Project
            </Button>
          </div>
        </EmptyContent>
        <Button variant="link" className="text-text-positive-weak" size="sm">
          Learn More <ArrowUpRightIcon />
        </Button>
      </Empty>
    );
  },
};

export const Outline: Story = {
  render: () => {
    return (
      <Empty className="border border-border-weak border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CloudIcon />
          </EmptyMedia>
          <EmptyTitle>Cloud Storage Empty</EmptyTitle>
          <EmptyDescription>Upload files to your cloud storage to access them anywhere.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" color="muted" size="sm">
            Upload Files
          </Button>
        </EmptyContent>
      </Empty>
    );
  },
};

export const Background: Story = {
  render: () => {
    return (
      <Empty className="from-muted-muted/50 to-background h-full bg-gradient-to-b from-30%">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BellIcon />
          </EmptyMedia>
          <EmptyTitle>No Notifications</EmptyTitle>
          <EmptyDescription>You&apos;re all caught up. New notifications will appear here.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" color="muted" size="sm">
            <RefreshCcwIcon />
            Refresh
          </Button>
        </EmptyContent>
      </Empty>
    );
  },
};

export const AvatarExample: Story = {
  render: () => {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <Avatar className="size-12">
              <AvatarImage src="https://github.com/shadcn.png" className="grayscale" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </EmptyMedia>
          <EmptyTitle>User Offline</EmptyTitle>
          <EmptyDescription>This user is currently offline. You can leave a message to notify them or try again later.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">Leave Message</Button>
        </EmptyContent>
      </Empty>
    );
  },
};
