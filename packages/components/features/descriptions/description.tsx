'use client';

import { use, useMemo, useState } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { DescriptionConfigContext, DescriptionGroupContext, DescriptionSearchContext, type TDescriptionConfig, type TDescriptionLabelColSpan } from './context';
import { type DescriptionVariants, descriptionVariants, type TDescriptionSize } from './descriptions.variants';
import { DescriptionLoadingSkeleton } from './loading-skeleton';

export type DescriptionProps = React.PropsWithChildren<{
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
}>;

/**
 * Root container for a description block — a bordered, rounded card that groups `DescriptionHeader`, `DescriptionSection`, and `DescriptionItem` elements.
 *
 * Set `nested` when embedding one `Description` inside another (removes the outer card shadow/ring and constrains sizing).
 * Set `loading` to replace content with animated skeleton rows while data is being fetched.
 * Set `labelColSpan` to apply the same label column width to every child `DescriptionItem` at once.
 * Set `size`/`bordered` to apply the same size scale / border style to every descendant at once — both
 * inherit from an ancestor `Description`/`DescriptionGroup` when omitted, so a nested panel matches its
 * parent by default.
 *
 * The standalone (`card`) surface also self-caps its own max-width via a container query against
 * however much space its own parent gives it — no prop, always on. It fills 100% inside a narrow host
 * (e.g. a `SidePanel`/`Dialog`) and stops widening past 768px once given more room (e.g. a full desktop
 * page), instead of stretching edge-to-edge. `nested`/`grouped` surfaces are unaffected — they always
 * fill whatever cell/group already constrains them.
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
export const Description: React.FC<DescriptionProps> = ({
  children,
  className,
  nested = false,
  loading = false,
  loadingRows = 4,
  labelColSpan,
  size,
  bordered,
}) => {
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
        {/* Establishes the named container the `card` surface's self-capping max-width (see
            `SELF_CAPPING_MAX_WIDTH` in `descriptions.variants.ts`) queries against — a container query
            can't target the same element that declares it, so this needs its own wrapper. Only the
            `card` surface needs `size-full`: inside a `DescriptionGroup`, the group's scroll container
            already has a definite height, so `size-full` here would stretch every grouped `Description`'s
            invisible panel wrapper to fill that entire height instead of its own content, leaving a blank
            gap before the next group's sticky header. */}
        <div data-slot="description-panel" className={surface === 'card' ? '@container/description-panel size-full' : 'w-full'}>
          <div data-slot="description" data-surface={surface} className={cn(descriptionVariants({ surface, bordered: config.bordered }), className)}>
            {/** biome-ignore lint/complexity/noUselessFragments: more */}
            {loading ? <DescriptionLoadingSkeleton rows={loadingRows} /> : <>{children}</>}
          </div>
        </div>
      </DescriptionSearchContext.Provider>
    </DescriptionConfigContext.Provider>
  );
};
