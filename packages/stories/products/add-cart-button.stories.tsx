import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddCartButton } from '@/components/products/add-cart-button';

const meta = {
  title: 'Products/AddCartButton',
  component: AddCartButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    productId: {
      control: { type: 'text' },
      description: 'Product ID to add to cart',
    },
    variantId: {
      control: { type: 'text' },
      description: 'Variant ID to add to cart',
    },
    isInCart: {
      control: { type: 'boolean' },
      description: 'Whether the product is already in the cart',
      defaultValue: false,
    },
    onAddToCart: {
      action: 'addToCart',
      description: 'Callback function when adding to cart',
    },
    showText: {
      control: { type: 'boolean' },
      description: 'Whether to show text alongside icon',
      defaultValue: true,
    },
    size: {
      control: { type: 'select', options: ['sm', 'default', 'lg', 'icon'] },
      description: 'Size of the button',
      defaultValue: 'default',
    },
    variant: {
      control: { type: 'select', options: ['default', 'outline', 'ghost'] },
      description: 'Variant of the button',
      defaultValue: 'default',
    },
    quantity: {
      control: { type: 'number' },
      description: 'Initial quantity to add to cart',
      defaultValue: 1,
    },
  },
} satisfies Meta<typeof AddCartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive example that toggles cart state
const InteractiveTemplate = (args: React.ComponentProps<typeof AddCartButton>) => {
  const [inCart, setInCart] = useState(args.isInCart || false);

  return (
    <div className="flex flex-col gap-4 items-center">
      <AddCartButton
        {...args}
        isInCart={inCart}
        onAddToCart={(productId, variantId) => {
          setInCart(true);
          args.onAddToCart?.(productId, variantId);
        }}
      />
      <div className="flex flex-col items-center text-sm mt-4">
        <div className="font-medium">Status: {inCart ? 'Product is in cart' : 'Product is not in cart'}</div>
        {inCart && (
          <button onClick={() => setInCart(false)} className="text-xs text-blue-500 underline mt-2">
            Reset demo (remove from cart)
          </button>
        )}
      </div>
    </div>
  );
};

export const Interactive = {
  render: InteractiveTemplate,
  args: {
    productId: 'product-123',
    variant: 'default',
    type: 'in_stock',
    showText: true,
    size: 'default',
  },
};

export const Default: Story = {
  args: {
    productId: 'product-123',
    isInCart: false,
  },
};

export const AlreadyInCart: Story = {
  args: {
    productId: 'product-123',
    isInCart: true,
  },
};

export const WithVariant: Story = {
  args: {
    productId: 'product-123',
    variantId: 'variant-456',
    isInCart: false,
  },
};

export const PreOrder: Story = {
  args: {
    productId: 'product-789',
    isInCart: false,
  },
};

export const IconOnly: Story = {
  args: {
    productId: 'product-123',
    showText: false,
    size: 'icon',
    isInCart: false,
  },
};

export const OutlineStyle: Story = {
  args: {
    productId: 'product-123',
    variant: 'outline',
    isInCart: false,
  },
};

export const GhostStyle: Story = {
  args: {
    productId: 'product-123',
    variant: 'ghost',
    isInCart: false,
  },
};

export const SmallSize: Story = {
  args: {
    productId: 'product-123',
    size: 'sm',
    isInCart: false,
  },
};

export const LargeSize: Story = {
  args: {
    productId: 'product-123',
    size: 'lg',
    isInCart: false,
  },
};

export const CustomWidth: Story = {
  args: {
    productId: 'product-123',
    isInCart: false,
    className: 'w-64',
  },
};
