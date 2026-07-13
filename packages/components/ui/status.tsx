'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { type StatusVariants, statusVariants } from './status.variants';

const dotColorMap: Record<NonNullable<StatusVariants['color']>, string> = {
  none: 'border border-dashed border-gray-300 bg-transparent',
  slate: 'bg-slate-500',
  gray: 'bg-gray-500',
  zinc: 'bg-zinc-500',
  neutral: 'bg-neutral-500',
  stone: 'bg-stone-500',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  green: 'bg-green-500',
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  sky: 'bg-sky-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  purple: 'bg-purple-500',
  fuchsia: 'bg-fuchsia-500',
  pink: 'bg-pink-500',
  rose: 'bg-rose-500',
};

const solidDotColorMap: Record<NonNullable<StatusVariants['color']>, string> = {
  none: 'border border-dashed border-gray-300 bg-transparent',
  slate: 'bg-slate-300',
  gray: 'bg-gray-300',
  zinc: 'bg-zinc-300',
  neutral: 'bg-neutral-300',
  stone: 'bg-stone-300',
  red: 'bg-red-300',
  orange: 'bg-orange-300',
  amber: 'bg-amber-300',
  yellow: 'bg-yellow-300',
  lime: 'bg-lime-300',
  green: 'bg-green-300',
  emerald: 'bg-emerald-300',
  teal: 'bg-teal-300',
  cyan: 'bg-cyan-300',
  sky: 'bg-sky-300',
  blue: 'bg-blue-300',
  indigo: 'bg-indigo-300',
  violet: 'bg-violet-300',
  purple: 'bg-purple-300',
  fuchsia: 'bg-fuchsia-300',
  pink: 'bg-pink-300',
  rose: 'bg-rose-300',
};

/**
 * Props for the `Status` component.
 *
 * @property variant - Visual style — `'dot'` (outlined pill with a colored dot, default), `'solid'`
 * (filled pill with a colored dot), `'soft'` (tinted pill, no dot), or `'bar'` (plain text with a
 * colored left accent bar, for lists/timelines).
 * @property color - Full Tailwind color family, e.g. `'red'` | `'orange'` | `'green'` | `'cyan'` |
 * `'blue'` | `'pink'` | ... , or `'none'` for an unset/dashed neutral state. Defaults to `'gray'`.
 * @property size - `'sm'` | `'md'` (default) | `'lg'`.
 */
export type StatusProps = StatusVariants & React.ComponentPropsWithoutRef<'span'>;

/**
 * Color-coded status indicator for pipeline/lifecycle states (e.g. lead, deal, order status).
 *
 * @example
 * ```tsx
 * import { Status } from '@customafk/lunas-ui/ui/status';
 *
 * <Status color="orange">Đang tư vấn</Status>
 * <Status variant="soft" color="green">Đang đàm phán</Status>
 * <Status variant="bar" color="pink">Hoàn tất giao dịch</Status>
 * ```
 */
function Status({ className, variant = 'dot', color = 'gray', size, children, ...props }: StatusProps) {
  const resolvedColor = color ?? 'gray';
  const showDot = variant === 'dot' || variant === 'solid';

  return (
    <span className={cn(statusVariants({ variant, color, size }), className)} {...props}>
      {showDot && (
        <span
          aria-hidden
          className={cn('inline-block size-1.5 shrink-0 rounded-full', variant === 'solid' ? solidDotColorMap[resolvedColor] : dotColorMap[resolvedColor])}
        />
      )}
      {children}
    </span>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Status, statusVariants };
