'use client';

import { Children, isValidElement, use, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type TUIGridBreakpoint, type TUIGridItemSpan, type TUIGridSpan, UIGrid, UIGridItem } from '@/components/layouts/ui-grid';
import { DescriptionConfigContext, DescriptionRowContext, type TDescriptionConfig, type TDescriptionLabelColSpan } from './context';
import { descriptionRowVariants } from './descriptions.variants';

/** Column counts that divide 12 evenly, so every cell in a `DescriptionRow` is equal-width. */
export type TDescriptionRowColumns = 1 | 2 | 3 | 4 | 6;

/**
 * Number of `DescriptionItem`s laid out per row — a plain number resolves to `{ base: 1, md: N }`
 * (stacked below 448px, `N`-per-row above), or an object varies it per container-query breakpoint
 * the same way `UIGrid.cols`/`labelColSpan` do.
 */
export type TDescriptionRowColumnsConfig = TDescriptionRowColumns | Partial<Record<TUIGridBreakpoint, TDescriptionRowColumns>>;

const COLUMN_TO_SPAN: Record<TDescriptionRowColumns, TUIGridSpan> = { 1: 12, 2: 6, 3: 4, 4: 3, 6: 2 };

function resolveCellSpan(columns: TDescriptionRowColumnsConfig): TUIGridItemSpan {
  if (typeof columns === 'number') return { base: 12, md: COLUMN_TO_SPAN[columns] };
  return Object.fromEntries(
    Object.entries({ base: 1 as TDescriptionRowColumns, ...columns }).map(([breakpoint, n]) => [breakpoint, COLUMN_TO_SPAN[n]])
  ) as TUIGridItemSpan;
}

export type DescriptionRowProps = React.PropsWithChildren<{
  /** @default 2 */
  columns?: TDescriptionRowColumnsConfig;
  /** Label column width override for every `DescriptionItem` in this row (they'd otherwise inherit the panel default). */
  labelColSpan?: TDescriptionLabelColSpan;
  /** Renders a vertical rule between cells. Only safe when every row has exactly `columns` items. @default false */
  divided?: boolean;
  className?: string;
}>;

/**
 * Lays a run of `DescriptionItem`s out `columns`-per-row instead of each taking the full row width —
 * an explicit wrapper rather than auto-detecting consecutive `DescriptionItem` children, so the layout
 * never depends on how the children happen to be written (`.map()`, a `Fragment`, a conditional, ...).
 *
 * Each cell nests its own `UIGrid` (the one `DescriptionItem` already renders internally for its
 * label/value split) inside this row's `UIGrid` cell — both declare the same named `@container/ui-grid`
 * context, so the nearer one wins and a squeezed cell's label column resolves against the *cell's* own
 * width, not the full row's, which is exactly what you want (a half-width cell gets the wider `base: 5`
 * label share automatically).
 *
 * There's no vertical rule between cells by default: with a responsive `columns`, "last cell in a visual
 * row" isn't knowable in CSS, so a blanket rule would put a stray line flush against the card's own right
 * edge on every row. Pass `divided` only when every row is known to divide evenly.
 *
 * @example
 * import { Description, DescriptionRow, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionRow columns={2}>
 *     <DescriptionItem label="First name">John</DescriptionItem>
 *     <DescriptionItem label="Last name">Doe</DescriptionItem>
 *   </DescriptionRow>
 * </Description>
 */
export const DescriptionRow: React.FC<DescriptionRowProps> = ({ columns = 2, labelColSpan, divided = false, className, children }) => {
  const inherited = use(DescriptionConfigContext);
  const span = useMemo(() => resolveCellSpan(columns), [columns]);
  const rowConfig = useMemo<TDescriptionConfig>(() => (labelColSpan ? { ...inherited, labelColSpan } : inherited), [inherited, labelColSpan]);
  const cells = Children.toArray(children).filter(isValidElement);

  return (
    <DescriptionConfigContext.Provider value={rowConfig}>
      <DescriptionRowContext.Provider value={true}>
        <div
          data-slot="description-row"
          data-columns={typeof columns === 'number' ? columns : 'responsive'}
          className={cn(descriptionRowVariants({ bordered: inherited.bordered }), className)}
        >
          <UIGrid cols={12} gap="none">
            {cells.map((cell, i) => (
              <UIGridItem
                key={cell.key ?? i}
                span={span}
                suspense={false}
                data-slot="description-row-cell"
                className={cn('min-w-0', divided && i < cells.length - 1 && 'border-r border-r-border')}
              >
                {cell}
              </UIGridItem>
            ))}
          </UIGrid>
        </div>
      </DescriptionRowContext.Provider>
    </DescriptionConfigContext.Provider>
  );
};
