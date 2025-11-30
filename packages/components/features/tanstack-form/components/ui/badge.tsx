import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(['flex w-fit items-center justify-center rounded-full font-bold text-text-negative-strong'], {
  variants: {
    color: {
      default: 'bg-primary-strong',
      secondary: 'bg-secondary-strong',
      success: 'bg-success-strong',
      info: 'bg-info-strong',
      warning: 'bg-warning-strong',
      danger: 'bg-danger-strong',
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

export const Badge: React.FC<
  React.PropsWithChildren<{
    label: string;
    color?: VariantProps<typeof badgeVariants>['color'];
    size?: VariantProps<typeof badgeVariants>['size'];
    className?: string;
  }>
> = ({ label, color, size, className, children }) => {
  return (
    <div data-slot="required-indicator" className={badgeVariants({ color, size, className })}>
      {label || children}
    </div>
  );
};
