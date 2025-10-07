import { useCallback, useState } from 'react';

import { CheckIcon, ShoppingBagIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

type AddCartButtonProps = {
  /**
   * Product ID to check against cart and add to cart
   */
  productId: string;
  /**
   * Variant ID to check against cart and add to cart
   */
  variantId?: string;
  /**
   * Optional className for styling
   */
  className?: string;
  /**
   * Whether to show text alongside icon
   * @default true
   */
  showText?: boolean;
  /**
   * Size of the button
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg' | 'icon';
  /**
   * Variant of the button
   * @default 'default'
   */
  variant?: 'default' | 'outline' | 'ghost';
  /**
   * Initial quantity to add to cart
   * @default 1
   */
  quantity?: number;
  /**
   * Flag to indicate if the product is already in the cart
   * @default false
   */
  isInCart?: boolean;
  /**
   * Callback function when adding to cart
   */
  onAddToCart?: (productId: string, variantId?: string) => void | Promise<void>;
};

export const AddCartButton: React.FC<AddCartButtonProps> = ({
  productId,
  variantId,
  className,
  showText = true,
  size = 'default',
  isInCart = false,
  onAddToCart,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = useCallback(async () => {
    if (isAdding) return;

    try {
      setIsAdding(true);

      // Use onAddToCart callback with the productId and variantId
      if (onAddToCart) {
        await onAddToCart(productId, variantId);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  }, [productId, variantId, onAddToCart, isAdding]);

  return (
    <button
      className={cn(
        'transition-all cursor-pointer',
        'bg-linear-to-b from-primary to-primary-strong',
        'py-2 px-2.5 rounded-md -outline-offset-1 outline-3 outline-primary-weak',
        'shadow-lg',
        'flex space-x-1.5 items-center',
        'text-sm text-text-negative-intense font-medium',
        'focus:ring-4 focus:ring-primary-weak',
        isInCart ? 'bg-success hover:bg-success/90' : '',
        className
      )}
      disabled={isAdding}
      onClick={handleAddToCart}
    >
      {isInCart ? (
        <>
          <CheckIcon size={16} />
          {showText && <span>{size === 'icon' ? '' : 'Đã thêm vào giỏ'}</span>}
        </>
      ) : (
        <>
          <ShoppingBagIcon size={16} strokeWidth={3} />
          {showText && <span>{size === 'icon' ? '' : 'Thêm vào giỏ'}</span>}
        </>
      )}
    </button>
  );
};
