'use client';

import { use, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Flex } from '@/components/layouts/flex';
import { type TUIGridItemSpan, UIGrid, UIGridItem } from '@/components/layouts/ui-grid';
import {
  DescriptionConfigContext,
  DescriptionGroupContext,
  DescriptionRowContext,
  DescriptionSearchContext,
  DescriptionSectionScopeContext,
  type TDescriptionConfig,
  type TDescriptionLabelColSpan,
} from './context';
import {
  type DescriptionVariants,
  descriptionGroupVariants,
  descriptionHeaderDescriptionVariants,
  descriptionHeaderTitleVariants,
  descriptionHeaderVariants,
  descriptionItemLabelVariants,
  descriptionItemValueVariants,
  descriptionItemVariants,
  descriptionSectionVariants,
  descriptionVariants,
  type TDescriptionSize,
} from './descriptions.variants';
import { matchesSearch } from './search-utils';

export * from './collapsible-section';
export * from './components';
export * from './context';
export * from './descriptions.variants';
export * from './row';
export * from './search';

const DEFAULT_BASE_LABEL_SPAN = 5 as const;
/** Wider label column below 384px/448px (roomier inside a narrow SidePanel/Dialog), settling to today's 3/12 from 448px up. */
const DEFAULT_LABEL_COL_SPAN: TDescriptionLabelColSpan = { base: DEFAULT_BASE_LABEL_SPAN, sm: 4, md: 3 };

/** Guarantees a `base` entry so no container width is left without a col-span class. */
function normalizeLabelSpan(value: TDescriptionLabelColSpan): TUIGridItemSpan {
  return typeof value === 'number' ? value : { base: DEFAULT_BASE_LABEL_SPAN, ...value };
}

/** Complement of the label span at every breakpoint — always 1–11 since the label span type excludes 12. */
function toValueSpan(value: TUIGridItemSpan): TUIGridItemSpan {
  if (typeof value === 'number') return (12 - value) as TUIGridItemSpan;
  return Object.fromEntries(Object.entries(value).map(([breakpoint, span]) => [breakpoint, 12 - (span as number)])) as TUIGridItemSpan;
}

/**
 * Tracks whether an element's content is currently clipped by `truncate` (`scrollWidth > clientWidth`),
 * re-checking on resize since a responsive label column changes width without the element unmounting.
 *
 * Uses a callback ref rather than a ref object + mount-only effect: the caller's returned JSX shape
 * changes once `truncated` flips (bare span → `Tooltip`-wrapped span), which makes React unmount the old
 * span and mount a new one at that position. A one-time effect would keep observing the now-detached old
 * node — which reports a spurious resize to 0×0 once removed — flipping `truncated` back off. A callback
 * ref fires again on every such swap, so the observer always tracks the currently-mounted node.
 */
function useIsTruncated<T extends HTMLElement>() {
  const [truncated, setTruncated] = useState(false);
  const cleanupRef = useRef<() => void>(() => {});

  const ref = useCallback((el: T | null) => {
    cleanupRef.current();
    if (!el) {
      cleanupRef.current = () => {};
      return;
    }
    const check = () => setTruncated(el.scrollWidth > el.clientWidth);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    // ResizeObserver only fires when the element's own box size changes — not when its content's natural
    // width changes while the box stays fixed (e.g. a web font finishing load after the initial layout,
    // which reflows text metrics without resizing the already-truncated box). Re-check once fonts settle.
    document.fonts?.ready.then(check);
    cleanupRef.current = () => observer.disconnect();
  }, []);

  return [ref, truncated] as const;
}

/** Keeps the label column to a single line — a long label truncates with an ellipsis instead of wrapping to a second line. Only wraps in a `Tooltip` when the text is actually clipped, so a label that already fits doesn't get a redundant hover affordance. */
const DescriptionItemLabelText: React.FC<{ label: string }> = ({ label }) => {
  const [ref, truncated] = useIsTruncated<HTMLSpanElement>();
  const span = (
    <span ref={ref} data-slot="description-item-label-text" className="min-w-0 flex-1 cursor-default truncate">
      {label}
    </span>
  );

  if (!truncated) return span;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{span}</TooltipTrigger>
      <TooltipContent align="start">{label}</TooltipContent>
    </Tooltip>
  );
};

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
 * {@link DescriptionSearch}-enabled panel, hides itself (`hidden` + `data-search-hidden`) when its `label`
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
export const DescriptionItem: React.FC<
  React.PropsWithChildren<{
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
  }>
> = ({ label, labelColSpan, orientation = 'horizontal', action, labelAlign = 'start', children }) => {
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
            <div data-slot="description-item-action" className="shrink-0">
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

/**
 * A header bar for a {@link Description} block, showing a title, an optional subtitle, and an optional trailing action area.
 *
 * @example
 * import { Description, DescriptionHeader } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionHeader title="User details" description="Read-only overview" extra={<EditBtn />} />
 * </Description>
 */
export const DescriptionHeader: React.FC<{
  /** Primary heading text. */
  title: string;
  /** Optional secondary text rendered below the title in a smaller, muted style. */
  description?: string;
  /** Optional node rendered on the right side of the header (e.g. action buttons, a {@link DescriptionSearch}). */
  extra?: React.ReactNode;
  /**
   * Sticks the header to the top of its scroll container (`sticky top-0 z-30`). Disable when the
   * header is rendered inside a non-scrolling context (e.g. a `Dialog`) where stickiness has no effect.
   * @default true
   */
  sticky?: boolean;
  /** Additional CSS class names applied to the header wrapper. */
  className?: string;
}> = ({ title, description, extra, sticky = true, className }) => {
  const config = use(DescriptionConfigContext);
  return (
    <Flex
      data-slot="description-header"
      width="full"
      padding="none"
      gap="md"
      wrap={false}
      justify="between"
      align="center"
      className={cn(descriptionHeaderVariants({ sticky, size: config.size, bordered: config.bordered }), className)}
    >
      <Flex vertical width="full" padding="none" gap="none" align="start" className="min-w-0 gap-0.5">
        <p className={descriptionHeaderTitleVariants({ size: config.size })}>{title}</p>
        {!!description && <p className={descriptionHeaderDescriptionVariants({ size: config.size })}>{description}</p>}
      </Flex>
      {!!extra && (
        <div data-slot="description-header-extra" className="shrink-0">
          {extra}
        </div>
      )}
    </Flex>
  );
};

/**
 * A visual section divider inside a {@link Description} container that optionally displays a section title with a decorative horizontal rule.
 *
 * This flat divider stays always-visible during a {@link DescriptionSearch} filter (it has no ownership of
 * the items that follow it). Use {@link DescriptionCollapsibleSection} instead when you want a section that
 * auto-hides once every item inside it is filtered out.
 *
 * @example
 * import { Description, DescriptionSection, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionSection title="Contact" />
 *   <DescriptionItem label="Email">john@example.com</DescriptionItem>
 * </Description>
 */
export const DescriptionSection: React.FC<{
  /** Optional section label rendered as uppercase small-caps text beside the divider line. */
  title?: string;
  /** Additional CSS class names applied to the section wrapper. */
  className?: string;
}> = ({ title, className }) => {
  const config = use(DescriptionConfigContext);
  return (
    <Flex
      data-slot="description-section"
      width="full"
      padding="none"
      gap="none"
      wrap={false}
      align="center"
      className={cn(descriptionSectionVariants({ size: config.size, bordered: config.bordered }), className)}
    >
      {!!title && <p className="shrink-0 font-semibold text-text-positive-weak text-xs uppercase tracking-widest">{title}</p>}
      <div className="h-px flex-1 bg-border" />
    </Flex>
  );
};

/** Fixed pool of stable row keys for the loading skeleton — avoids array-index keys while still supporting up to 24 `loadingRows`. */
const SKELETON_ROW_KEYS = Array.from({ length: 24 }, (_, i) => `description-loading-row-${i}`);

const DescriptionLoadingSkeleton: React.FC<{ rows: number }> = ({ rows }) => {
  const config = use(DescriptionConfigContext);
  const labelSpan = normalizeLabelSpan(config.labelColSpan ?? DEFAULT_LABEL_COL_SPAN);
  const valueSpan = toValueSpan(labelSpan);

  return (
    <div data-slot="description-loading">
      <Flex
        data-slot="description-loading-header"
        width="full"
        padding="none"
        gap="md"
        wrap={false}
        justify="between"
        align="center"
        className={descriptionHeaderVariants({ sticky: false, size: config.size, bordered: config.bordered })}
      >
        <Flex vertical padding="none" gap="none" align="start" className="gap-1.5">
          <Skeleton className="h-3.5 w-36" />
          <Skeleton className="h-2.5 w-24" />
        </Flex>
        <Skeleton className="h-5 w-16" />
      </Flex>
      {SKELETON_ROW_KEYS.slice(0, rows).map(key => (
        <div key={key} data-slot="description-loading-row" className={descriptionItemVariants({ orientation: 'horizontal', bordered: config.bordered })}>
          <UIGrid cols={12} gap="none">
            <UIGridItem span={labelSpan} suspense={false} className="min-w-0">
              <Flex
                width="full"
                padding="none"
                gap="none"
                wrap={false}
                align="center"
                className={descriptionItemLabelVariants({ orientation: 'horizontal', size: config.size, bordered: config.bordered })}
              >
                <Skeleton className="h-3 w-20" />
              </Flex>
            </UIGridItem>
            <UIGridItem span={valueSpan} suspense={false} className="min-w-0">
              <Flex width="full" padding="none" wrap align="center" gap="sm" className={descriptionItemValueVariants({ size: config.size })}>
                <Skeleton className="h-3 w-28" />
              </Flex>
            </UIGridItem>
          </UIGrid>
        </div>
      ))}
    </div>
  );
};

/**
 * Root container for a description block — a bordered, rounded card that groups {@link DescriptionHeader}, {@link DescriptionSection}, and {@link DescriptionItem} elements.
 *
 * Set `nested` when embedding one `Description` inside another (removes the outer card shadow/ring and constrains sizing).
 * Set `loading` to replace content with animated skeleton rows while data is being fetched.
 * Set `labelColSpan` to apply the same label column width to every child `DescriptionItem` at once.
 * Set `size`/`bordered` to apply the same size scale / border style to every descendant at once — both
 * inherit from an ancestor `Description`/`DescriptionGroup` when omitted, so a nested panel matches its
 * parent by default.
 *
 * @example
 * import { Description, DescriptionHeader, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionHeader title="Order #1234" />
 *   <DescriptionItem label="Status">Shipped</DescriptionItem>
 *   <DescriptionItem label="Total">$99.00</DescriptionItem>
 * </Description>
 */
export const Description: React.FC<
  React.PropsWithChildren<{
    /** Additional CSS class names applied to the root wrapper element. */
    className?: string;
    /** Strips the outer card shadow/ring and adapts sizing for embedding inside another Description. */
    nested?: boolean;
    /** Replaces children with animated skeleton rows while data is loading. */
    loading?: boolean;
    /** Number of skeleton rows shown when `loading` is true (max 24). @default 4 */
    loadingRows?: number;
    /** Label column width applied to every child `DescriptionItem` that doesn't set its own `labelColSpan`. */
    labelColSpan?: TDescriptionLabelColSpan;
    /** Padding/typography scale for every descendant. Inherits from an ancestor `Description`/`DescriptionGroup` when omitted. @default 'md' */
    size?: TDescriptionSize;
    /** Whether the card chrome and every internal grid line render. `false` strips both the outer border and the inner label background/dividers for a flat look. Inherits when omitted. @default true */
    bordered?: boolean;
  }>
> = ({ children, className, nested = false, loading = false, loadingRows = 4, labelColSpan, size, bordered }) => {
  const inGroup = use(DescriptionGroupContext);
  const inherited = use(DescriptionConfigContext);
  const [query, setQuery] = useState('');
  const config = useMemo<TDescriptionConfig>(
    () => ({
      labelColSpan: labelColSpan ?? inherited.labelColSpan,
      size: size ?? inherited.size,
      bordered: bordered ?? inherited.bordered,
    }),
    [labelColSpan, size, bordered, inherited]
  );
  const search = useMemo(() => ({ query, setQuery }), [query]);
  const surface: NonNullable<DescriptionVariants['surface']> = inGroup ? 'grouped' : nested ? 'nested' : 'card';

  return (
    <DescriptionConfigContext.Provider value={config}>
      <DescriptionSearchContext.Provider value={search}>
        <div data-slot="description" data-surface={surface} className={cn(descriptionVariants({ surface, bordered: config.bordered }), className)}>
          {loading ? <DescriptionLoadingSkeleton rows={loadingRows} /> : children}
        </div>
      </DescriptionSearchContext.Provider>
    </DescriptionConfigContext.Provider>
  );
};

/**
 * A scrollable container that groups multiple {@link Description} blocks and makes each
 * {@link DescriptionHeader} sticky. As you scroll, the next section header stacks above
 * (pushes out) the previous one — standard CSS sticky behaviour within a single scroll context.
 *
 * `size`/`bordered` set here cascade to every child `Description` that doesn't set its own.
 *
 * @example
 * import { DescriptionGroup, Description, DescriptionHeader, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <DescriptionGroup>
 *   <Description>
 *     <DescriptionHeader title="Personal info" />
 *     <DescriptionItem label="Name">John Doe</DescriptionItem>
 *   </Description>
 *   <Description>
 *     <DescriptionHeader title="Contact" />
 *     <DescriptionItem label="Email">john@example.com</DescriptionItem>
 *   </Description>
 * </DescriptionGroup>
 */
export const DescriptionGroup: React.FC<
  React.PropsWithChildren<{
    /** Additional CSS class names applied to the group wrapper. */
    className?: string;
    /** Applied to every child `Description` that doesn't set its own. @default 'md' */
    size?: TDescriptionSize;
    /** Applied to every child `Description` that doesn't set its own. @default true */
    bordered?: boolean;
  }>
> = ({ children, className, size, bordered }) => {
  const inherited = use(DescriptionConfigContext);
  const config = useMemo<TDescriptionConfig>(
    () => ({
      labelColSpan: inherited.labelColSpan,
      size: size ?? inherited.size,
      bordered: bordered ?? inherited.bordered,
    }),
    [size, bordered, inherited]
  );

  return (
    <DescriptionGroupContext.Provider value={true}>
      <DescriptionConfigContext.Provider value={config}>
        <div data-slot="description-group" className={cn(descriptionGroupVariants({ bordered: config.bordered }), className)}>
          {children}
        </div>
      </DescriptionConfigContext.Provider>
    </DescriptionGroupContext.Provider>
  );
};
