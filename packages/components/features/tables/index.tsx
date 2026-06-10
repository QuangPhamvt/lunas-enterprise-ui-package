/**
 * @module @customafk/lunas-ui/features/tables
 *
 * Public surface of the UITable feature module.
 *
 * Re-exports all building-block components, the root `UITableProvider`,
 * toolbar/filter helpers, atom cell renderers, and shared TypeScript types.
 *
 * @example
 * ```tsx
 * import {
 *   UITableProvider,
 *   UITableWrapper,
 *   UITableTooltip,
 *   UITableTooltipFilter,
 *   UITableTooltipActions,
 *   UITableFilter,
 * } from '@customafk/lunas-ui/features/tables';
 * ```
 */
export * from './components/atoms';
export * from './components/common';
export * from './components/table';
export * from './components/table/analysis-panel';
export * from './components/table/filter';
export * from './components/table/provider';
export * from './components/table/summary-bar';
export * from './components/table/tooltip';
export * from './types';
