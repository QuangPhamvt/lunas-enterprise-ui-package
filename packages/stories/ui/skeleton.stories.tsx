import { Skeleton } from '@/components/ui/skeleton'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Components/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div className="h-32 w-120">
        <div className="flex w-full items-center space-x-4">
          <Skeleton className="size-12 min-w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    )
  },
}
