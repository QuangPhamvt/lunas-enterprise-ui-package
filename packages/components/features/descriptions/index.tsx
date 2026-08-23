'use client';

/**
 * @module @customafk/lunas-ui/features/descriptions
 *
 * Public surface of the Description feature module — a labeled key/value display panel (a
 * read-only "detail view") with optional live search, collapsible sections, N-per-row layout,
 * and a set of per-value-type renderer atoms (`components/`).
 *
 * @example
 * ```tsx
 * import { Description, DescriptionHeader, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionHeader title="Order #1234" />
 *   <DescriptionItem label="Status">Shipped</DescriptionItem>
 * </Description>
 * ```
 */
export * from './collapsible-section';
export * from './components';
export * from './context';
export * from './description';
export * from './descriptions.variants';
export * from './group';
export * from './header';
export * from './item';
export * from './row';
export * from './search';
export * from './section';
