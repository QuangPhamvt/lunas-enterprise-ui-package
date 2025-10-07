import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductQuantityControl } from '@/components/products/product-quantity-control';

const meta = {
  title: 'Products/ProductQuantityControl',
  component: ProductQuantityControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    initialValue: {
      control: { type: 'number' },
      description: 'Initial quantity value',
      defaultValue: 1,
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed quantity',
      defaultValue: 1,
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed quantity (default: 100)',
      defaultValue: 100,
    },
    debounceDelay: {
      control: { type: 'number' },
      description: 'Delay in ms before triggering onQuantityChange (using useDebounceCallback from toolkit)',
      defaultValue: 300,
    },
    onQuantityChange: {
      action: 'quantityChanged',
      description: 'Callback when quantity changes',
    },
    onButtonClick: {
      action: 'buttonClicked',
      description: 'Callback when increment/decrement button is clicked',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the control is disabled',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof ProductQuantityControl>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive example with quantity display
const InteractiveTemplate = (args: React.ComponentProps<typeof ProductQuantityControl>) => {
  const [quantity, setQuantity] = useState(args.initialValue || 1);

  useEffect(() => {
    setQuantity(args.initialValue || 1);
  }, [args.initialValue]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <ProductQuantityControl
        {...args}
        onQuantityChange={newQuantity => {
          setQuantity(newQuantity);
          args.onQuantityChange?.(newQuantity);
        }}
        onButtonClick={(action, newQty) => {
          args.onButtonClick?.(action, newQty);
        }}
      />
      <div className="flex flex-col items-center text-sm">
        <div className="font-medium">Current quantity: {quantity}</div>
        <div className="text-xs italic mt-1">Try changing values quickly to see debouncing in action (useDebounceCallback hook)</div>
      </div>
    </div>
  );
};

export const Interactive = {
  render: InteractiveTemplate,
  args: {
    initialValue: 1,
    min: 1,
    debounceDelay: 300,
  },
};

export const Default: Story = {
  args: {
    initialValue: 1,
    min: 1,
  },
};

export const WithMax: Story = {
  args: {
    initialValue: 5,
    min: 1,
    max: 10,
  },
};

export const NoDebounce: Story = {
  args: {
    initialValue: 1,
    min: 1,
    debounceDelay: 0, // Disable debounce
  },
  name: 'No Debounce (Immediate Callback)',
};

export const LongDebounce: Story = {
  args: {
    initialValue: 1,
    min: 1,
    debounceDelay: 1000, // 1 second debounce
  },
  name: 'Long Debounce (1000ms with Toolkit Hook)',
};

export const WithMaxLimit: Story = {
  args: {
    initialValue: 90,
    min: 1,
    max: 150, // This would be overridden by maxLimit
  },
  name: 'With Max Limit (99)',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the maxLimit functionality. Even though max is set to 150, maxLimit of 99 takes precedence.',
      },
    },
  },
};

export const CustomStartingValue: Story = {
  args: {
    initialValue: 3,
    min: 1,
  },
};

export const Disabled: Story = {
  args: {
    initialValue: 1,
    min: 1,
    disabled: true,
  },
};

export const CustomWidth: Story = {
  args: {
    initialValue: 1,
    min: 1,
    className: 'w-40',
  },
};

export const ZeroMinimum: Story = {
  args: {
    initialValue: 0,
    min: 0,
    max: 10,
  },
};
