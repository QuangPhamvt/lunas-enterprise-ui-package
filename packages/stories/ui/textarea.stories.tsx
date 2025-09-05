import { Textarea } from '@/components/ui/textarea'
import type { Meta } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Components/Textarea',
  component: Textarea,
} satisfies Meta<typeof Textarea>

export default meta
type Story = Meta<typeof meta>

export const Default: Story = {
  render: () => <Textarea className="w-100" placeholder="Type your message here." rows={5} />,
}

export const Error: Story = {
  render: () => <Textarea aria-invalid placeholder="Type your message here." rows={5} />,
}
