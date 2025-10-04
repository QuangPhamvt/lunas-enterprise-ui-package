import { GridProductCard } from '@/components/cards/grid-product-card';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Cards/GridProductCard',
  component: GridProductCard,
  parameters: {
    viewport: {
      options: {
        default: {
          name: '640x480',
          styles: {
            width: '640px',
            height: '480px',
          },
        },
      },
    },
  },
} satisfies Meta<typeof GridProductCard>;

export default meta;
type Story = StoryObj<typeof GridProductCard>;

export const Default: Story = {
  args: {
    id: '1',
    name: 'Huy hiệu kim loại Ver. Phòng tiếp tân của Owlbert Huy hiệu kim loại Ver. Phòng tiếp tân của Owlbert Huy hiệu kim loại Ver. Phòng tiếp tân của Owlbert',
    thumbnail: 'https://via.placeholder.com/150',
    price: 2000000,
  },
};
