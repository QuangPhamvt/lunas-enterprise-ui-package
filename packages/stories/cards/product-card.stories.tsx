import { ProductCard } from '@/components/cards/product-card'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  tags: ['autodocs'],
  title: 'Cards/ProductCard',
  component: ProductCard,
  parameters: {
    viewport: {
      options: {
        default: {
          name: '320x480',
          styles: {
            width: '320px',
            height: '480px',
          },
        },
      },
    },
  },
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof ProductCard>

export const Default: Story = {
  args: {
    id: '1',
    name: 'Huy hiệu kim loại Ver. Phòng tiếp tân của Owlbert Huy hiệu kim loại Ver. Phòng tiếp tân của Owlbert Huy hiệu kim loại Ver. Phòng tiếp tân của Owlbert',
    thumbnail: 'https://via.placeholder.com/150',
    price: 2000000,
  },
}
