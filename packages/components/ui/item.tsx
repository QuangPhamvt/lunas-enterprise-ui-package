import { cn } from '@customafk/react-toolkit/utils';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Separator } from '@/components/ui/separator';

/**
 * A list-row layout primitive for rendering structured content rows with optional media, title, description, and action areas.
 *
 * @example
 * ```tsx
 * import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup } from '@customafk/lunas-ui/ui/item';
 * import { User } from 'lucide-react';
 *
 * <ItemGroup>
 *   <Item variant="outline">
 *     <ItemMedia variant="icon"><User /></ItemMedia>
 *     <ItemContent>
 *       <ItemTitle>Alice</ItemTitle>
 *       <ItemDescription>alice@example.com</ItemDescription>
 *     </ItemContent>
 *     <ItemActions><button>Edit</button></ItemActions>
 *   </Item>
 * </ItemGroup>
 * ```
 */
function ItemGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div role="list" data-slot="item-group" className={cn('group/item-group flex flex-col', className)} {...props} />;
}

/** Horizontal separator rendered between items in an ItemGroup. */
function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot="item-separator" orientation="horizontal" className={cn('my-0', className)} {...props} />;
}

const itemVariants = cva(
  'group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-primary-strong focus-visible:ring-primary-weak focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border',
        muted: 'bg-muted-weak',
      },
      size: {
        default: 'p-4 gap-4 ',
        sm: 'py-3 px-4 gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * The primary row container inside an ItemGroup.
 *
 * @param variant - Visual style: `'default'`, `'outline'`, or `'muted'`.
 * @param size - Spacing size: `'default'` or `'sm'`.
 * @param asChild - When true, renders as the child element via Radix Slot.
 */
function Item({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';
  return <Comp data-slot="item" data-variant={variant} data-size={size} className={cn(itemVariants({ variant, size, className }))} {...props} />;
}

const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: 'size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Left-aligned slot for an avatar, icon, or image within an Item.
 *
 * @param variant - `'default'` for a transparent wrapper, `'icon'` for a small bordered square, or `'image'` for a rounded thumbnail.
 */
function ItemMedia({ className, variant = 'default', ...props }: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) {
  return <div data-slot="item-media" data-variant={variant} className={cn(itemMediaVariants({ variant, className }))} {...props} />;
}

/** Flex-1 column that holds the ItemTitle and ItemDescription. */
function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-content" className={cn('flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none', className)} {...props} />;
}

/** Primary label text rendered in medium weight inside an ItemContent. */
function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-title" className={cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium', className)} {...props} />;
}

/** Secondary, muted body text clamped to two lines inside an ItemContent. */
function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
}

/** Right-aligned slot for buttons or other interactive controls within an Item. */
function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-actions" className={cn('flex items-center gap-2', className)} {...props} />;
}

/** Full-width row at the top of an Item for header-level labels or metadata. */
function ItemHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-header" className={cn('flex basis-full items-center justify-between gap-2', className)} {...props} />;
}

/** Full-width row at the bottom of an Item for footer-level content or secondary actions. */
function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="item-footer" className={cn('flex basis-full items-center justify-between gap-2', className)} {...props} />;
}

export { Item, ItemMedia, ItemContent, ItemActions, ItemGroup, ItemSeparator, ItemTitle, ItemDescription, ItemHeader, ItemFooter };
