import { useState } from 'react'

import { UserDataDisplay } from '@/components/data-display/user'
import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/User Display',
  component: UserDataDisplay,
} satisfies Meta<typeof UserDataDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    username: 'John Doe',
    email: 'user@example.com',
  },
  render: (args) => {
    const [uuid, setUuid] = useState(args.uuid)
    return (
      <div className="flex flex-col gap-y-10">
        <UserDataDisplay {...args} uuid={uuid} />
        <Button
          className="w-24"
          onClick={() => {
            const randomUuid = crypto.randomUUID()
            setUuid(randomUuid)
          }}
        >
          Random
        </Button>
        <p>{`Current UUID: ${uuid}`}</p>
      </div>
    )
  },
}

export const LongName: Story = {
  args: {
    ...Default.args,
    username: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  render: (args) => <UserDataDisplay {...args} />,
}
