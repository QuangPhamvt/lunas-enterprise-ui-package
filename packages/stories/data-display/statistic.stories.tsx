import { Statistic } from '@/components/data-display/statistic'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Statistic',
  component: Statistic,
} satisfies Meta<typeof Statistic>

export default meta
type Story = StoryObj<typeof Statistic>

export const Default: Story = {
  args: {
    value: 1234567.123,
  },
}

export const WithPrefixAndSuffix: Story = {
  args: {
    value: 1234567.123,
    prefix: '$',
    suffix: 'USD',
  },
}

export const WithRounding: Story = {
  args: {
    value: 1234.56789,
    precision: 2,
    roundingMode: 'floor',
  },
}

export const WithCustomDecimalAndGroupSeparators: Story = {
  args: {
    value: 1234.5,
    precision: 2,
    showTrailingZeros: true,
  },
}
