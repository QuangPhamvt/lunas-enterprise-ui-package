import { AspectRatio } from '@/components/ui/aspect-ratio'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <AspectRatio ratio={16 / 9}>
        <div className="size-24">aa</div>
      </AspectRatio>
    )
  },
}
