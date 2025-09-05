import { Grid } from '@/components/layouts/grid'
import type { Meta, StoryObj } from '@storybook/react-vite'

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="border-border-weak col-span-1 row-span-1 flex size-full min-h-60 items-center justify-center rounded-md border">{children}</div>
}

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/Grid',
  component: Grid,
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
        <Content>Content</Content>
      </>
    ),
  },
}
