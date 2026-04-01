'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'rounded-sm inline-flex items-center justify-center font-semibold text-white shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden focus:ring-ring forced-colors:outline',
  {
    variants: {
      color: {
        red: 'bg-red-500 text-white',
        orange: 'bg-orange-500 text-white',
        amber: 'bg-amber-500 text-white',
        yellow: 'bg-yellow-500 text-white',
        lime: 'bg-lime-500 text-white',
        green: 'bg-green-500 text-white',
        emerald: 'bg-emerald-500 text-white',
        teal: 'bg-teal-500 text-white',
        cyan: 'bg-cyan-500 text-white',
        sky: 'bg-sky-500 text-white',
        blue: 'bg-blue-500 text-white',
        indigo: 'bg-indigo-500 text-white',
        violet: 'bg-violet-500 text-white',
        purple: 'bg-purple-500 text-white',
        fuchsia: 'bg-fuchsia-500 text-white',
        pink: 'bg-pink-500 text-white',
        rose: 'bg-rose-500 text-white',
        zinc: 'bg-zinc-500 text-white',
      },
      size: {
        // Lưu ý: text-[8px] là quá nhỏ so với mắt thường. Nếu đây là chủ đích design của bạn thì giữ nguyên.
        xs: 'text-[10px]/3 px-1.5 py-0.5 gap-1',
        sm: 'text-xs px-2 py-0.5 gap-1',
        md: 'text-sm px-2.5 py-0.5 gap-1.5',
        lg: 'text-base px-3 py-1 gap-1.5',
        xl: 'text-lg px-3.5 py-1 gap-1.5',
      },
      pill: {
        true: 'rounded-full',
        false: 'rounded-sm', // Explicitly define false to handle the default shape safely
      },
    },
    defaultVariants: {
      color: 'zinc',
      size: 'md',
      pill: true,
    },
  }
);

export type BadgeProps = VariantProps<typeof badgeVariants> & React.ComponentPropsWithoutRef<'span'>;

function Badge({ className, color, size, pill, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ color, pill, size }), className)} {...props} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
