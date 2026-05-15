'use client';

import { Loader2Icon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Slot } from '@radix-ui/react-slot';
import { type ButtonVariantProps, buttonLoadingVariant, buttonVariants } from './button.variants';

export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'color'> {
  /**
   * When true, the button will render its children without wrapping them
   */
  asChild?: boolean;
  /**
   * Shows a loading spinner when true
   */
  isLoading?: boolean;
  /**
   * Visual style variant
   */
  variant?: ButtonVariantProps['variant'];
  /**
   * Color theme of the button
   */
  color?: ButtonVariantProps['color'];
  /**
   * Size of the button
   */
  size?: ButtonVariantProps['size'];

  innerClassName?: string;
}

/**
 * Button component with variants, loading state and composition support
 */
function Button({
  className,
  variant,
  size = 'default',
  color,
  asChild = false,
  isLoading = false,
  children,
  disabled,
  type = 'button',
  innerClassName,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type={type}
      data-slot="button"
      data-state={isLoading ? 'loading' : undefined}
      disabled={disabled}
      aria-disabled={disabled ? true : undefined}
      className={cn(
        buttonVariants({
          variant,
          size,
          color: color as ButtonVariantProps['color'],
          className,
        })
      )}
      {...props}
    >
      {isLoading && (
        <div className={buttonLoadingVariant({ variant, color })}>
          <Loader2Icon size={16} className="animate-spin" />
        </div>
      )}
      <div className={cn('inline-flex items-center justify-center gap-x-1', isLoading && 'invisible', innerClassName)}>{children}</div>
    </Comp>
  );
}

export { Button };
