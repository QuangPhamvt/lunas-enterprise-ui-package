import { createContext } from 'react';

import type { TUIGridBreakpoint } from '@/components/layouts/ui-grid';
import type { TDescriptionSize } from './descriptions.variants';

/** Number of grid columns (out of 12) a label column can occupy. `12` is deliberately excluded so the value column always keeps at least 1. */
export type TDescriptionLabelSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Label column width — a plain number fixes it at every container width, or an object varies it
 * per container-query breakpoint (see {@link TUIGridBreakpoint} for the exact pixel value of each key).
 */
export type TDescriptionLabelColSpan = TDescriptionLabelSpan | Partial<Record<TUIGridBreakpoint, TDescriptionLabelSpan>>;

/** Whether the nearest ancestor is a `DescriptionGroup` — read by `Description` to pick its `grouped` surface. */
export const DescriptionGroupContext = createContext<boolean>(false);

export type TDescriptionConfig = {
  labelColSpan: TDescriptionLabelColSpan | null;
  size: TDescriptionSize;
  bordered: boolean;
};

export const DESCRIPTION_CONFIG_DEFAULT: TDescriptionConfig = { labelColSpan: null, size: 'md', bordered: true };

/**
 * Cascading config a `Description`/`DescriptionGroup`/`DescriptionRow` publishes for every descendant
 * `DescriptionItem`/`DescriptionHeader`/`DescriptionSection` to read. Each provider MERGES over the
 * inherited value (only overriding the keys it was explicitly given), so `size`/`bordered` inherit
 * through nested panels and groups unless a descendant sets its own.
 */
export const DescriptionConfigContext = createContext<TDescriptionConfig>(DESCRIPTION_CONFIG_DEFAULT);

/** Set by `DescriptionRow` so a wrapped `DescriptionItem` knows to skip its own bottom rule — the row wrapper owns it instead. */
export const DescriptionRowContext = createContext(false);

export type TDescriptionSearch = { query: string; setQuery: (query: string) => void };

const noopSetQuery = () => {};

/** Live search query published by `Description`, set by a `DescriptionSearch` input and read by every `DescriptionItem`/`DescriptionCollapsibleSection` to decide their own visibility. */
export const DescriptionSearchContext = createContext<TDescriptionSearch>({ query: '', setQuery: noopSetQuery });

export type TDescriptionSectionScope = { report: (id: string, matched: boolean | null) => void };

/** Lets a `DescriptionItem` report its own search-match state up to the nearest `DescriptionCollapsibleSection`, which aggregates matches to decide its own visibility. `matched: null` means "this item is unmounting". */
export const DescriptionSectionScopeContext = createContext<TDescriptionSectionScope | null>(null);
