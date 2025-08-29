import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from 'lucide-react'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
        </Alert>
        <Alert>
          <PopcornIcon />
          <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
        </Alert>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>Please verify your billing information and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    )
  },
}

export const TitleOnly: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => {
    return (
      <div className="grid w-full max-w-xl items-start gap-4">
        <Alert {...args}>
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
        </Alert>
        <Alert {...args}>
          <PopcornIcon />
          <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
        </Alert>
      </div>
    )
  },
}
