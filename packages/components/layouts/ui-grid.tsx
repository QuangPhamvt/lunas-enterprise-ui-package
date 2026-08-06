'use client';
import { memo, Suspense } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

/**
 * Container-query breakpoint keys used by `UIGrid`'s `cols` and `UIGridItem`'s
 * `span`, resolved against the nearest ancestor `@container/ui-grid` (i.e. the
 * grid's own rendered width, not the viewport). These match Tailwind v4's default
 * container-query scale exactly:
 * - `'base'` — always applied, no minimum width (the fallback/mobile-first value).
 * - `'sm'` — applies from **384px** (`24rem`) and up.
 * - `'md'` — applies from **448px** (`28rem`) and up.
 * - `'lg'` — applies from **512px** (`32rem`) and up.
 * - `'xl'` — applies from **576px** (`36rem`) and up.
 * - `'2xl'` — applies from **672px** (`42rem`) and up.
 * - `'3xl'` — applies from **768px** (`48rem`) and up.
 *
 * Whichever breakpoint's minimum width is currently satisfied (in ascending
 * order) wins, same cascade behavior as Tailwind's ordinary `sm:`/`md:`/`lg:`
 * responsive classes.
 */
export type TUIGridBreakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type TUIGridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type TUIGridColsConfig = TUIGridCols | Partial<Record<TUIGridBreakpoint, TUIGridCols>>;

/**
 * Every `grid-cols-N` class this component can emit, per breakpoint, written out
 * literally so Tailwind's JIT scanner can find each one as static text — a
 * dynamically interpolated string (e.g. `` `@${bp}/ui-grid:grid-cols-${n}` ``) would
 * never be picked up and would silently compile to nothing (the exact bug the
 * previous `Grid` component had with its `@8xl`/`@9xl`/`@10xl` classes, which don't
 * exist in Tailwind's default container-query scale).
 */
const COLS_CLASS_MAP: Record<TUIGridBreakpoint, Record<TUIGridCols, string>> = {
  base: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8',
    9: 'grid-cols-9',
    10: 'grid-cols-10',
    11: 'grid-cols-11',
    12: 'grid-cols-12',
  },
  sm: {
    1: '@sm/ui-grid:grid-cols-1',
    2: '@sm/ui-grid:grid-cols-2',
    3: '@sm/ui-grid:grid-cols-3',
    4: '@sm/ui-grid:grid-cols-4',
    5: '@sm/ui-grid:grid-cols-5',
    6: '@sm/ui-grid:grid-cols-6',
    7: '@sm/ui-grid:grid-cols-7',
    8: '@sm/ui-grid:grid-cols-8',
    9: '@sm/ui-grid:grid-cols-9',
    10: '@sm/ui-grid:grid-cols-10',
    11: '@sm/ui-grid:grid-cols-11',
    12: '@sm/ui-grid:grid-cols-12',
  },
  md: {
    1: '@md/ui-grid:grid-cols-1',
    2: '@md/ui-grid:grid-cols-2',
    3: '@md/ui-grid:grid-cols-3',
    4: '@md/ui-grid:grid-cols-4',
    5: '@md/ui-grid:grid-cols-5',
    6: '@md/ui-grid:grid-cols-6',
    7: '@md/ui-grid:grid-cols-7',
    8: '@md/ui-grid:grid-cols-8',
    9: '@md/ui-grid:grid-cols-9',
    10: '@md/ui-grid:grid-cols-10',
    11: '@md/ui-grid:grid-cols-11',
    12: '@md/ui-grid:grid-cols-12',
  },
  lg: {
    1: '@lg/ui-grid:grid-cols-1',
    2: '@lg/ui-grid:grid-cols-2',
    3: '@lg/ui-grid:grid-cols-3',
    4: '@lg/ui-grid:grid-cols-4',
    5: '@lg/ui-grid:grid-cols-5',
    6: '@lg/ui-grid:grid-cols-6',
    7: '@lg/ui-grid:grid-cols-7',
    8: '@lg/ui-grid:grid-cols-8',
    9: '@lg/ui-grid:grid-cols-9',
    10: '@lg/ui-grid:grid-cols-10',
    11: '@lg/ui-grid:grid-cols-11',
    12: '@lg/ui-grid:grid-cols-12',
  },
  xl: {
    1: '@xl/ui-grid:grid-cols-1',
    2: '@xl/ui-grid:grid-cols-2',
    3: '@xl/ui-grid:grid-cols-3',
    4: '@xl/ui-grid:grid-cols-4',
    5: '@xl/ui-grid:grid-cols-5',
    6: '@xl/ui-grid:grid-cols-6',
    7: '@xl/ui-grid:grid-cols-7',
    8: '@xl/ui-grid:grid-cols-8',
    9: '@xl/ui-grid:grid-cols-9',
    10: '@xl/ui-grid:grid-cols-10',
    11: '@xl/ui-grid:grid-cols-11',
    12: '@xl/ui-grid:grid-cols-12',
  },
  '2xl': {
    1: '@2xl/ui-grid:grid-cols-1',
    2: '@2xl/ui-grid:grid-cols-2',
    3: '@2xl/ui-grid:grid-cols-3',
    4: '@2xl/ui-grid:grid-cols-4',
    5: '@2xl/ui-grid:grid-cols-5',
    6: '@2xl/ui-grid:grid-cols-6',
    7: '@2xl/ui-grid:grid-cols-7',
    8: '@2xl/ui-grid:grid-cols-8',
    9: '@2xl/ui-grid:grid-cols-9',
    10: '@2xl/ui-grid:grid-cols-10',
    11: '@2xl/ui-grid:grid-cols-11',
    12: '@2xl/ui-grid:grid-cols-12',
  },
  '3xl': {
    1: '@3xl/ui-grid:grid-cols-1',
    2: '@3xl/ui-grid:grid-cols-2',
    3: '@3xl/ui-grid:grid-cols-3',
    4: '@3xl/ui-grid:grid-cols-4',
    5: '@3xl/ui-grid:grid-cols-5',
    6: '@3xl/ui-grid:grid-cols-6',
    7: '@3xl/ui-grid:grid-cols-7',
    8: '@3xl/ui-grid:grid-cols-8',
    9: '@3xl/ui-grid:grid-cols-9',
    10: '@3xl/ui-grid:grid-cols-10',
    11: '@3xl/ui-grid:grid-cols-11',
    12: '@3xl/ui-grid:grid-cols-12',
  },
};

const GAP_CLASS = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  none: 'gap-0',
} as const;

function resolveGridColsClasses(cols: TUIGridColsConfig): string[] {
  if (typeof cols === 'number') return [COLS_CLASS_MAP.base[cols]];

  return (Object.entries(cols) as [TUIGridBreakpoint, TUIGridCols][]).map(([breakpoint, value]) => COLS_CLASS_MAP[breakpoint][value]);
}

type UIGridProps = React.PropsWithChildren<{
  /** Additional Tailwind classes merged on top of the generated classes. */
  className?: string;
  /**
   * Number of base grid columns (`1`–`12`). Every `UIGridItem`'s `span` is
   * expressed against this same column count at every container width.
   * - A plain number fixes the column count at every width.
   * - An object varies the column count as the grid's own rendered width crosses
   *   each container-query breakpoint (see {@link TUIGridBreakpoint} for the
   *   exact pixel value of each key) — e.g. "narrow container → 4 columns, wide
   *   container → 12 columns".
   * @default 12
   * @example
   * ```tsx
   * // 4 cols below 448px, 8 cols from 448px, 12 cols from 512px up
   * <UIGrid cols={{ base: 4, md: 8, lg: 12 }} />
   * ```
   */
  cols?: TUIGridColsConfig;
  /**
   * Gap between grid cells, reusing the same scale as `Flex`'s `gap` prop.
   * - `'none'` — `gap-0`
   * - `'xs'` — `gap-1`
   * - `'sm'` — `gap-2`
   * - `'md'` — `gap-4` (default)
   * - `'lg'` — `gap-6`
   * - `'xl'` — `gap-8`
   * @default 'md'
   */
  gap?: keyof typeof GAP_CLASS;
}> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'className'>;

/**
 * A 12-column CSS Grid container with a named `@container` context, so both its
 * own column count and its `UIGridItem` children's `span` can vary based on the
 * grid's own rendered width instead of the viewport.
 *
 * @example
 * ```tsx
 * import { UIGrid, UIGridItem } from '@customafk/lunas-ui/layouts/ui-grid';
 *
 * <UIGrid gap="md" cols={{ base: 4, md: 12 }}>
 *   <UIGridItem span={6}>Left</UIGridItem>
 *   <UIGridItem span={6}>Right</UIGridItem>
 * </UIGrid>
 * ```
 */
export const UIGrid = memo(({ cols = 12, gap = 'md', className, children, ...rest }: UIGridProps) => {
  // A container-query subject can never be the same element that establishes the
  // container — `@container/ui-grid` must live on an ancestor of whatever reads
  // `@sm/ui-grid:` etc., so the responsive `cols` classes need their own inner
  // element, separate from the one that declares the named container.
  return (
    <div data-slot="ui-grid" className="@container/ui-grid w-full">
      <div data-slot="ui-grid-columns" {...rest} className={cn('grid w-full', resolveGridColsClasses(cols), GAP_CLASS[gap], className)}>
        {children}
      </div>
    </div>
  );
});
UIGrid.displayName = 'UIGrid';

export type TUIGridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type TUIGridItemSpan = TUIGridSpan | Partial<Record<TUIGridBreakpoint, TUIGridSpan>>;

/**
 * Every `col-span-N` class this component can emit, per breakpoint — same
 * literal-lookup-table reasoning as `COLS_CLASS_MAP` above.
 */
const SPAN_CLASS_MAP: Record<TUIGridBreakpoint, Record<TUIGridSpan, string>> = {
  base: {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  },
  sm: {
    1: '@sm/ui-grid:col-span-1',
    2: '@sm/ui-grid:col-span-2',
    3: '@sm/ui-grid:col-span-3',
    4: '@sm/ui-grid:col-span-4',
    5: '@sm/ui-grid:col-span-5',
    6: '@sm/ui-grid:col-span-6',
    7: '@sm/ui-grid:col-span-7',
    8: '@sm/ui-grid:col-span-8',
    9: '@sm/ui-grid:col-span-9',
    10: '@sm/ui-grid:col-span-10',
    11: '@sm/ui-grid:col-span-11',
    12: '@sm/ui-grid:col-span-12',
  },
  md: {
    1: '@md/ui-grid:col-span-1',
    2: '@md/ui-grid:col-span-2',
    3: '@md/ui-grid:col-span-3',
    4: '@md/ui-grid:col-span-4',
    5: '@md/ui-grid:col-span-5',
    6: '@md/ui-grid:col-span-6',
    7: '@md/ui-grid:col-span-7',
    8: '@md/ui-grid:col-span-8',
    9: '@md/ui-grid:col-span-9',
    10: '@md/ui-grid:col-span-10',
    11: '@md/ui-grid:col-span-11',
    12: '@md/ui-grid:col-span-12',
  },
  lg: {
    1: '@lg/ui-grid:col-span-1',
    2: '@lg/ui-grid:col-span-2',
    3: '@lg/ui-grid:col-span-3',
    4: '@lg/ui-grid:col-span-4',
    5: '@lg/ui-grid:col-span-5',
    6: '@lg/ui-grid:col-span-6',
    7: '@lg/ui-grid:col-span-7',
    8: '@lg/ui-grid:col-span-8',
    9: '@lg/ui-grid:col-span-9',
    10: '@lg/ui-grid:col-span-10',
    11: '@lg/ui-grid:col-span-11',
    12: '@lg/ui-grid:col-span-12',
  },
  xl: {
    1: '@xl/ui-grid:col-span-1',
    2: '@xl/ui-grid:col-span-2',
    3: '@xl/ui-grid:col-span-3',
    4: '@xl/ui-grid:col-span-4',
    5: '@xl/ui-grid:col-span-5',
    6: '@xl/ui-grid:col-span-6',
    7: '@xl/ui-grid:col-span-7',
    8: '@xl/ui-grid:col-span-8',
    9: '@xl/ui-grid:col-span-9',
    10: '@xl/ui-grid:col-span-10',
    11: '@xl/ui-grid:col-span-11',
    12: '@xl/ui-grid:col-span-12',
  },
  '2xl': {
    1: '@2xl/ui-grid:col-span-1',
    2: '@2xl/ui-grid:col-span-2',
    3: '@2xl/ui-grid:col-span-3',
    4: '@2xl/ui-grid:col-span-4',
    5: '@2xl/ui-grid:col-span-5',
    6: '@2xl/ui-grid:col-span-6',
    7: '@2xl/ui-grid:col-span-7',
    8: '@2xl/ui-grid:col-span-8',
    9: '@2xl/ui-grid:col-span-9',
    10: '@2xl/ui-grid:col-span-10',
    11: '@2xl/ui-grid:col-span-11',
    12: '@2xl/ui-grid:col-span-12',
  },
  '3xl': {
    1: '@3xl/ui-grid:col-span-1',
    2: '@3xl/ui-grid:col-span-2',
    3: '@3xl/ui-grid:col-span-3',
    4: '@3xl/ui-grid:col-span-4',
    5: '@3xl/ui-grid:col-span-5',
    6: '@3xl/ui-grid:col-span-6',
    7: '@3xl/ui-grid:col-span-7',
    8: '@3xl/ui-grid:col-span-8',
    9: '@3xl/ui-grid:col-span-9',
    10: '@3xl/ui-grid:col-span-10',
    11: '@3xl/ui-grid:col-span-11',
    12: '@3xl/ui-grid:col-span-12',
  },
};

function resolveItemSpanClasses(span: TUIGridItemSpan): string[] {
  if (typeof span === 'number') return [SPAN_CLASS_MAP.base[span]];

  return (Object.entries(span) as [TUIGridBreakpoint, TUIGridSpan][]).map(([breakpoint, value]) => SPAN_CLASS_MAP[breakpoint][value]);
}

type UIGridItemProps = React.PropsWithChildren<{
  /** Additional Tailwind classes merged on top of the span classes. */
  className?: string;
  /**
   * Number of the grid's columns this item should occupy (`1`–`12`).
   * - A plain number fixes the span at every container width.
   * - An object varies the span as the *grid's own* rendered width crosses each
   *   container-query breakpoint (see {@link TUIGridBreakpoint} for the exact
   *   pixel value of each key), not the viewport.
   * @default 12
   * @example
   * ```tsx
   * <UIGridItem span={6} />
   * // full-width below 384px, half from 384px, a third from 448px up
   * <UIGridItem span={{ base: 12, sm: 6, md: 4 }} />
   * ```
   */
  span?: TUIGridItemSpan;
  /**
   * Wraps `children` in a `Suspense` boundary so a lazy-loaded cell (e.g. a
   * `React.lazy()` component) doesn't block sibling items from rendering.
   * @default true
   */
  suspense?: boolean;
  /**
   * Fallback UI shown while suspended children are loading. Only relevant when
   * `suspense` is `true`.
   * @default null
   */
  fallback?: React.ReactNode;
}> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'className'>;

/**
 * A single cell inside a `UIGrid`. Spans `12` of the grid's columns by default
 * (a full-width row) and can vary its span per container-query breakpoint.
 *
 * @example
 * ```tsx
 * import { UIGrid, UIGridItem } from '@customafk/lunas-ui/layouts/ui-grid';
 *
 * <UIGrid>
 *   <UIGridItem span={{ base: 12, md: 6 }} suspense fallback={<Skeleton />}>
 *     <LazyWidget />
 *   </UIGridItem>
 * </UIGrid>
 * ```
 */
export const UIGridItem = memo(({ span = 12, className, children, suspense = true, fallback = null, ...rest }: UIGridItemProps) => {
  const content = suspense ? <Suspense fallback={fallback}>{children}</Suspense> : children;
  return (
    <div data-slot="ui-grid-item" {...rest} className={cn(resolveItemSpanClasses(span), className)}>
      {content}
    </div>
  );
});
UIGridItem.displayName = 'UIGridItem';
