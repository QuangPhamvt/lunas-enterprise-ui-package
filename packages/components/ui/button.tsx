'use client';

import { Activity } from 'react';

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
      style={{
        cornerShape: 'squircle',
      } as React.CSSProperties}
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
      <Activity mode={isLoading ? 'hidden' : 'visible'}>{children}</Activity>
      <Activity mode={isLoading ? 'visible' : 'hidden'}>
        <div className={buttonLoadingVariant({ variant, color })}>
          <Loader2Icon size={16} className="animate-spin" />
        </div>
      </Activity>
    </Comp>
  );
}

export { Button };
