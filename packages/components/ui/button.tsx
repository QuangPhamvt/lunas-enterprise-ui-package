'use client';

import { Loader2Icon } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@customafk/react-toolkit/utils';
import { type ButtonVariantProps, buttonLoadingVariant, buttonVariants } from './button.variants';

/**
 * Props for the {@link Button} component.
 *
 * Extends all native `<button>` attributes except `color`, which is
 * re-declared as a semantic design-token via {@link ButtonVariantProps}.
 *
 * @see {@link https://www.radix-ui.com/primitives/docs/utilities/slot} Radix Slot (asChild pattern)
 */
export interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'color'> {
  /**
   * When `true`, renders children through Radix's `<Slot>` primitive,
   * merging all button props directly onto the child element.
   *
   * Use this to swap the rendered HTML element while keeping button styling
   * (e.g. render a Next.js `<Link>` that looks like a button).
   *
   * @default false
   * @example
   * ```tsx
   * <Button asChild variant="ghost">
   *   <Link href="/dashboard">Go to Dashboard</Link>
   * </Button>
   * ```
   */
  asChild?: boolean;

  /**
   * When `true`, shows an animated `Loader2` spinner overlay and sets
   * `aria-busy="true"`. The button is implicitly disabled while loading —
   * no separate `disabled` prop is needed for loading states.
   *
   * @default false
   */
  isLoading?: boolean;

  /**
   * Visual style variant of the button.
   *
   * | Value | Description |
   * |---|---|
   * | `"default"` | Filled surface — primary call-to-action (default) |
   * | `"outline"` | Transparent background with a visible border |
   * | `"ghost"` | No background or border — minimal footprint |
   * | `"link"` | Styled as an underlined hyperlink |
   * | `"icon"` | Square, padding-free — icon-only buttons |
   * | `"destructive"` | Red-toned filled surface for danger actions |
   *
   * @default "default"
   */
  variant?: ButtonVariantProps['variant'];

  /**
   * Semantic color token applied to the button's surface and text.
   *
   * | Value | Usage |
   * |---|---|
   * | `"primary"` | Brand primary (default) |
   * | `"success"` | Confirmation / save actions |
   * | `"danger"` | Destructive / delete actions |
   * | `"warning"` | Cautionary / irreversible actions |
   * | `"muted"` | Secondary / low-emphasis actions |
   *
   * @default "primary"
   */
  color?: ButtonVariantProps['color'];

  /**
   * Controls height, horizontal padding, and font size.
   *
   * | Value | Height |
   * |---|---|
   * | `"sm"` | 32 px |
   * | `"default"` | 36 px |
   * | `"lg"` | 40 px |
   * | `"icon"` | 36 × 36 px (square) |
   *
   * @default "default"
   */
  size?: ButtonVariantProps['size'];

  /**
   * Additional class names applied to the inner `<div>` that wraps `children`.
   * Use this to style the children's flex container without overriding the
   * button's outer layout or focus-ring classes.
   */
  innerClassName?: string;
}

/**
 * Primary interactive button component for `@customafk/lunas-ui`.
 *
 * Built on Radix UI's `<Slot>` primitive. Supports multiple visual variants,
 * semantic color tokens, a built-in loading state with full accessibility
 * attributes, and polymorphic rendering via `asChild`. All native `<button>`
 * attributes are forwarded to the underlying element.
 *
 * **Import:** `import { Button } from '@customafk/lunas-ui/ui/button'`
 *
 * @example Basic usage
 * ```tsx
 * import { Button } from '@customafk/lunas-ui/ui/button';
 *
 * export function SaveAction() {
 *   return <Button color="primary">Save changes</Button>;
 * }
 * ```
 *
 * @example Async loading state
 * ```tsx
 * import { Button } from '@customafk/lunas-ui/ui/button';
 *
 * export function SubmitButton({ isPending }: { isPending: boolean }) {
 *   return (
 *     <Button type="submit" isLoading={isPending}>
 *       Submit
 *     </Button>
 *   );
 * }
 * ```
 *
 * @example Destructive outline button
 * ```tsx
 * import { Button } from '@customafk/lunas-ui/ui/button';
 *
 * export function DeleteButton({ onDelete }: { onDelete: () => void }) {
 *   return (
 *     <Button variant="outline" color="danger" onClick={onDelete}>
 *       Delete account
 *     </Button>
 *   );
 * }
 * ```
 *
 * @example Polymorphic — render as Next.js Link
 * ```tsx
 * import { Button } from '@customafk/lunas-ui/ui/button';
 * import Link from 'next/link';
 *
 * export function NavLink() {
 *   return (
 *     <Button asChild variant="ghost" size="sm">
 *       <Link href="/settings">Settings</Link>
 *     </Button>
 *   );
 * }
 * ```
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
  const isDisabled = disabled || isLoading;

  return (
    <Comp
      {...(!asChild ? { type, disabled: isDisabled } : undefined)}
      data-slot="button"
      data-state={isLoading ? 'loading' : undefined}
      aria-disabled={isDisabled ? true : undefined}
      aria-busy={isLoading ? true : undefined}
      className={cn(
        buttonVariants({
          variant,
          size,
          color,
          className,
        })
      )}
      {...props}
    >
      {isLoading && (
        <div className={buttonLoadingVariant({ variant, color })}>
          <Loader2Icon size={16} className="animate-spin" />
          <span className="sr-only">Loading</span>
        </div>
      )}
      <div className={cn('inline-flex items-center justify-center gap-x-1', isLoading && 'invisible pointer-events-none', innerClassName)}>{children}</div>
    </Comp>
  );
}

export { Button };
