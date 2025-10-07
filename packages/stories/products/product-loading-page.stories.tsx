import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductLoadingPage } from '@/components/products/product-loading-page';

const meta = {
  title: 'Products/ProductLoadingPage',
  component: ProductLoadingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class names',
    },
    hideGallery: {
      control: { type: 'boolean' },
      description: 'Hide the product image gallery section',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof ProductLoadingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hideGallery: false,
  },
};

export const WithoutGallery: Story = {
  args: {
    hideGallery: true,
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    hideGallery: false,
  },
};

export const CustomWidth: Story = {
  args: {
    className: 'max-w-4xl mx-auto',
    hideGallery: false,
  },
};

export const EmbeddedInCard: Story = {
  render: args => (
    <div className="border rounded-lg p-6 shadow-sm">
      <ProductLoadingPage {...args} />
    </div>
  ),
  args: {
    hideGallery: false,
  },
};
