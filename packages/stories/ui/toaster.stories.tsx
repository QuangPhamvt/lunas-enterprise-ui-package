import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import type { Meta, StoryObj } from '@storybook/react-vite'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <>
        <Button onClick={() => toast.info('Default notification', { description: 'This will be closed on 3000ms' })}>Toggle Notification</Button>
        <Toaster />
      </>
    )
  },
}

export const Success: Story = {
  render: () => {
    return (
      <>
        <Button onClick={() => toast.success('Success notification', { description: 'This will be closed on 3000ms' })}>Toggle Notification</Button>
        <Toaster />
      </>
    )
  },
}

export const Info: Story = {
  render: () => {
    return (
      <>
        <Button onClick={() => toast.info('Info notification', { description: 'This will be closed on 3000ms' })}>Toggle Notification</Button>
        <Toaster />
      </>
    )
  },
}

export const Loading: Story = {
  render: () => {
    return (
      <>
        <Button onClick={() => toast.loading('Loading notification', { description: 'This will be closed on 3000ms' })}>Toggle Notification</Button>
        <Toaster />
      </>
    )
  },
}

export const Warning: Story = {
  render: () => {
    return (
      <>
        <Button onClick={() => toast.warning('Warning notification', { description: 'This will be closed on 3000ms' })}>Toggle Notification</Button>
        <Toaster />
      </>
    )
  },
}

export const Error: Story = {
  render: () => {
    return (
      <>
        <Button onClick={() => toast.error('Error notification', { description: 'This will be closed on 3000ms' })}>Toggle Notification</Button>
        <Toaster />
      </>
    )
  },
}
