'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Slot } from '@radix-ui/react-slot';
import { type ButtonVariantProps, buttonVariants } from './button-variants';

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
}

/**
 * Button component with variants, loading state and composition support
 */
function Button({ className, variant, size, color, asChild = false, isLoading = false, children, disabled, type = 'button', ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const isDisabled = disabled || isLoading;

  return (
    <Comp
      type={type}
      data-slot="button"
      data-state={isLoading ? 'loading' : undefined}
      className={cn(
        buttonVariants({
          variant,
          size,
          color: color as ButtonVariantProps['color'],
          className,
        })
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled ? true : undefined}
      {...props}
    >
      <span className={cn('flex items-center justify-center gap-2 text-nowrap', isLoading && 'opacity-0')}>{children}</span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="loader-spinner text-current" />
        </span>
      )}
    </Comp>
  );
}

export { Button };
