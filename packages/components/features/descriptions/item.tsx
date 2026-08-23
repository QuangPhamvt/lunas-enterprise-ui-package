'use client';

import { use, useEffect, useId } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Flex } from '@/components/layouts/flex';
import { UIGrid, UIGridItem } from '@/components/layouts/ui-grid';
import {
  DescriptionConfigContext,
  DescriptionRowContext,
  DescriptionSearchContext,
  DescriptionSectionScopeContext,
  type TDescriptionLabelColSpan,
} from './context';
import { descriptionItemLabelVariants, descriptionItemValueVariants, descriptionItemVariants } from './descriptions.variants';
import { DescriptionItemLabelText } from './item-label-text';
import { DEFAULT_LABEL_COL_SPAN, normalizeLabelSpan, toValueSpan } from './label-span-utils';
import { matchesSearch } from './search-utils';

export type DescriptionItemProps = React.PropsWithChildren<{
  /** Text displayed in the label column. */
  label: string;
  /**
   * Column width (out of 12) allocated to the label in horizontal orientation. Overrides
   * whatever the parent {@link Description}'s own `labelColSpan` (or the library default) is.
   * @default { base: 5, sm: 4, md: 3 }
   */
  labelColSpan?: TDescriptionLabelColSpan;
  /**
   * Layout direction of the label/value pair.
   * - `'horizontal'` — label and value are side by side.
   * - `'vertical'` — label sits above the value.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /** Optional node rendered in the top-right corner of the label area (e.g. an edit action). */
  action?: React.ReactNode;
  /**
   * Horizontal alignment of the label text within its column.
   * @default 'start'
   */
  labelAlign?: 'start' | 'end';
}>;

/**
 * A single labeled row within a {@link Description} container, supporting both horizontal (side-by-side label/value) and vertical (stacked) layouts.
 *
 * The label column width defaults to a responsive `{ base: 5, sm: 4, md: 3 }` (out of 12) — wider on narrow
 * containers like a `SidePanel`, settling to the classic 3/12 from 448px up — and can be overridden per-item
 * via `labelColSpan`, or for every item in a panel at once via {@link Description}'s own `labelColSpan` prop.
 * A label that doesn't fit its column truncates to a single line with an ellipsis — never wraps to a second
 * line — and shows the full text in a tooltip on hover/focus.
 *
 * Renders inline `size`/`bordered` inherited from the nearest {@link Description}, and, if placed inside a
 * `DescriptionSearch`-enabled panel, hides itself (`hidden` + `data-search-hidden`) when its `label`
 * doesn't match the live query — no props needed for this, it's cross-cutting via context.
 *
 * @example
 * import { Description, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionItem label="Full name">John Doe</DescriptionItem>
 *   <DescriptionItem label="Email" orientation="vertical">john@example.com</DescriptionItem>
 * </Description>
 */
export const DescriptionItem: React.FC<DescriptionItemProps> = ({
  label,
  labelColSpan,
  orientation = 'horizontal',
  action,
  labelAlign = 'start',
  children,
}) => {
  const config = use(DescriptionConfigContext);
  const inRow = use(DescriptionRowContext);
  const { query } = use(DescriptionSearchContext);
  const sectionScope = use(DescriptionSectionScopeContext);
  const matched = matchesSearch(label, query);
  const registrationId = useId();

  // Reports this item's match state to the nearest DescriptionCollapsibleSection (if any), so the section
  // can decide its own visibility. Both branches bail out of the state update when nothing changed, which
  // is what keeps this from looping: report(id, null) on unmount only removes an existing entry.
  useEffect(() => {
    if (!sectionScope) return;
    sectionScope.report(registrationId, matched);
    return () => sectionScope.report(registrationId, null);
  }, [sectionScope, registrationId, matched]);

  const searchHiddenProps = matched ? undefined : ({ 'data-search-hidden': 'true' } as const);

  if (orientation === 'vertical') {
    return (
      <div
        data-slot="description-item"
        data-orientation="vertical"
        {...searchHiddenProps}
        className={cn(descriptionItemVariants({ orientation: 'vertical', bordered: config.bordered, inRow }), !matched && 'hidden')}
      >
        <Flex
          data-slot="description-item-label"
          width="full"
          padding="none"
          gap="none"
          wrap={false}
          align="center"
          justify={labelAlign === 'end' ? 'end' : 'between'}
          className={descriptionItemLabelVariants({ orientation: 'vertical', size: config.size, bordered: config.bordered })}
        >
          <DescriptionItemLabelText label={label} />
          {!!action && (
            <div data-slot="description-item-action" className="flex shrink-0 items-center justify-center">
              {action}
            </div>
          )}
        </Flex>
        <Flex
          data-slot="description-item-value"
          width="full"
          padding="none"
          wrap
          align="center"
          gap="sm"
          className={descriptionItemValueVariants({ size: config.size })}
        >
          {children}
        </Flex>
      </div>
    );
  }

  const labelSpan = normalizeLabelSpan(labelColSpan ?? config.labelColSpan ?? DEFAULT_LABEL_COL_SPAN);
  const valueSpan = toValueSpan(labelSpan);

  return (
    <div
      data-slot="description-item"
      data-orientation="horizontal"
      {...searchHiddenProps}
      className={cn(descriptionItemVariants({ orientation: 'horizontal', bordered: config.bordered, inRow }), !matched && 'hidden')}
    >
      <UIGrid cols={12} gap="none">
        <UIGridItem span={labelSpan} suspense={false} className="min-w-0">
          <Flex
            data-slot="description-item-label"
            width="full"
            padding="none"
            gap="none"
            wrap={false}
            align="center"
            justify={labelAlign === 'end' ? 'end' : 'between'}
            className={descriptionItemLabelVariants({ orientation: 'horizontal', size: config.size, bordered: config.bordered })}
          >
            <DescriptionItemLabelText label={label} />
            {!!action && (
              <div data-slot="description-item-action" className="shrink-0 pr-1">
                {action}
              </div>
            )}
          </Flex>
        </UIGridItem>
        <UIGridItem span={valueSpan} suspense={false} className="min-w-0">
          <Flex
            data-slot="description-item-value"
            width="full"
            padding="none"
            wrap
            align="center"
            gap="sm"
            className={descriptionItemValueVariants({ size: config.size })}
          >
            {children}
          </Flex>
        </UIGridItem>
      </UIGrid>
    </div>
  );
};
