import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(['flex w-fit items-center justify-center rounded-full font-bold text-text-negative-strong'], {
  variants: {
    color: {
      default: 'bg-primary-strong',
      secondary: 'bg-secondary-strong',
      success: 'bg-success-strong',
      info: 'bg-info-strong',
      warning: 'bg-warning-strong',
      danger: 'border border-danger-strong bg-linear-to-b from-danger-strong/90 via-danger-strong to-danger-strong/90',
    },
    size: {
      xs: 'px-1.5 py-0.5 text-xs',
      sm: 'px-2 py-0.75 text-xs',
      md: 'px-2.5 py-0.75 text-sm',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'sm',
  },
});

/**
 * Props for the {@link Badge} component.
 */
type BadgeProps = React.PropsWithChildren<{
  /** Text content rendered inside the badge; takes precedence over `children` when both are provided. */
  label: string;
  /**
   * Color theme of the badge.
   * @default 'default'
   */
  color?: VariantProps<typeof badgeVariants>['color'];
  /**
   * Size variant controlling padding and font size.
   * @default 'sm'
   */
  size?: VariantProps<typeof badgeVariants>['size'];
  /** Additional Tailwind class names merged onto the root element. */
  className?: string;
}>;

/**
 * Pill-shaped status badge with configurable color and size, used primarily as the "Required" indicator inside form labels.
 *
 * @example
 * import { Badge } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <Badge label="Required" color="danger" size="xs" />
 */
export const Badge: React.FC<BadgeProps> = ({ label, color, size, className, children }) => {
  return (
    <div data-slot="required-indicator" className={badgeVariants({ color, size, className })}>
      {label || children}
    </div>
  );
};
