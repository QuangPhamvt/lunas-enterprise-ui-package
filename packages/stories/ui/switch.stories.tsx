import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { Meta } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Components/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = Meta<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}
