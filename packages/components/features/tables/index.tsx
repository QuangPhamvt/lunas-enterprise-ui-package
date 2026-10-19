'use client';

/**
 * @module @customafk/lunas-ui/features/tables
 *
 * Public surface of the UITable feature module.
 *
 * Re-exports the required building blocks (root `UITableProvider`, the
 * `commons/*` DOM primitives, and `UITableContainer`) eagerly, and the
 * optional/composable pieces — the 18 cell-renderer atoms plus the filter
 * panel, analysis panel, summary bar, and toolbar — behind `React.lazy` so
 * that importing this module only pays for what a given table actually
 * renders. Mirrors the `lazyField` pattern used by
 * `@customafk/lunas-ui/features/tanstack-form`.
 *
 * @example
 * ```tsx
 * import {
 *   type TUITableColumn,
 *   UITableContainer,
 *   UITableDateDisplay,
 *   UITableFilter,
 *   UITableProvider,
 *   UITableToolbar,
 *   UITableToolbarActions,
 *   UITableWrapper,
 * } from '@customafk/lunas-ui/features/tables';
 *
 * const columns: TUITableColumn<Order>[] = [
 *   { accessorKey: 'code', header: 'Mã đơn' },
 *   { accessorKey: 'createdAt', header: 'Ngày tạo', cell: ({ row }) => <UITableDateDisplay date={row.original.createdAt} /> },
 * ];
 *
 * <UITableProvider
 *   title="Đơn hàng"
 *   columns={columns}
 *   data={orders}
 *   keyOfClickRow="uuid"
 *   isLoading={isFetching}
 *   totalRows={total}
 *   fetchMoreData={fetchNextPage}
 *   filterDefinitions={filterDefinitions}
 *   onFilterChange={setFilters}
 * >
 *   <UITableWrapper>
 *     <UITableToolbar>
 *       <UITableToolbarActions onRefresh={refetch} />
 *     </UITableToolbar>
 *     <UITableContainer sidePanels={[<UITableFilter key="filter" />]} />
 *   </UITableWrapper>
 * </UITableProvider>
 * ```
 */
import type { ComponentProps, ComponentType } from 'react';
import { lazy, Suspense } from 'react';

import type { TSlotKey } from './components/commons/wrapper';

export { UITableEmptyValue } from './components/atoms/empty';
export type { UITableStatusListItem } from './components/atoms/status-list-display';
export * from './components/commons';
export * from './components/table';
export { UITableProvider } from './components/table/provider';
export * from './types';

import type { UITableAvatarNameDisplay as UITableAvatarNameDisplayType } from './components/atoms/avatar-name-display';
import type { UITableBadgeDisplay as UITableBadgeDisplayType } from './components/atoms/badge-display';
import type { UITableBooleanDisplay as UITableBooleanDisplayType } from './components/atoms/boolean-display';
import type { UITableCurrencyDisplay as UITableCurrencyDisplayType } from './components/atoms/currency-display';
import type { UITableDateDisplay as UITableDateDisplayType } from './components/atoms/date-display';
import type { UITableDescriptionDisplay as UITableDescriptionDisplayType } from './components/atoms/description-display';
import type { UITableEditButton as UITableEditButtonType } from './components/atoms/edit-button';
import type { UITableEmailDisplay as UITableEmailDisplayType } from './components/atoms/email-display';
import type { UITableListDisplay as UITableListDisplayType } from './components/atoms/list-display';
import type { UITableMoreButton as UITableMoreButtonType } from './components/atoms/more-button';
import type { UITableNameDisplay as UITableNameDisplayType } from './components/atoms/name-display';
import type { UITablePermalink as UITablePermalinkType } from './components/atoms/permalink';
import type { UITablePhoneNumberDisplay as UITablePhoneNumberDisplayType } from './components/atoms/phone-number';
import type { UITableProgressDisplay as UITableProgressDisplayType } from './components/atoms/progress-display';
import type { UITableRemoveButton as UITableRemoveButtonType } from './components/atoms/remove-button';
import type { UITableStatisticDisplay as UITableStatisticDisplayType } from './components/atoms/statistic';
import type { UITableStatusDisplay as UITableStatusDisplayType } from './components/atoms/status-display';
import type { UITableStatusListDisplay as UITableStatusListDisplayType } from './components/atoms/status-list-display';
import type { UITableToggleButton as UITableToggleButtonType } from './components/atoms/toggle-button';
import type { UITableUserDataDisplay as UITableUserDataDisplayType } from './components/atoms/user';
import type {
  UITableToolbarActions as UITableToolbarActionsType,
  UITableToolbarSearch as UITableToolbarSearchType,
  UITableToolbar as UITableToolbarType,
} from './components/table/toolbar';

/**
 * Wraps a `lazy()`-loaded component in its own `Suspense` boundary so it can be dropped
 * anywhere without callers needing to set up Suspense themselves. Keeps this file itself
 * small — the heavy per-atom/per-panel implementations (Radix primitives, lucide icon sets,
 * the filter builder, CSV export, etc.) only load when a table actually renders that piece.
 */
function lazyField<P extends object>(
  loader: () => Promise<{ default: ComponentType<P> }>,
  tableWrapperSlot?: TSlotKey
): ComponentType<P> & { tableWrapperSlot?: TSlotKey } {
  const LazyComponent = lazy(loader);
  const Field: ComponentType<P> & { tableWrapperSlot?: TSlotKey } = props => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );
  Field.tableWrapperSlot = tableWrapperSlot;
  return Field;
}

// ─── Cell-renderer atoms (lazy) ────────────────────────────────────────────────

/**
 * Renders a circular avatar paired with a name in a compact horizontal row.
 * When no `avatarUrl` is provided the fallback uses a deterministic background
 * color derived from `uuid` (or `name`) via `colorHashLight`, matching the
 * style of `UserDataDisplay`.
 *
 * @example
 * import { UITableAvatarNameDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableAvatarNameDisplay name="Jane Smith" uuid="user-42" avatarUrl="/avatars/jane.png" />
 */
const UITableAvatarNameDisplay = lazyField<ComponentProps<typeof UITableAvatarNameDisplayType>>(() =>
  import('./components/atoms/avatar-name-display').then(m => ({ default: m.UITableAvatarNameDisplay }))
);
/**
 * Renders a pill-shaped badge for a table cell that optionally supports a click
 * action and an inline remove button; falls back to {@link UITableEmptyValue} when
 * `label` is falsy.
 *
 * @example
 * import { UITableBadgeDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableBadgeDisplay
 *   label="Active"
 *   onClick={() => console.log('badge clicked')}
 *   onRemove={() => console.log('remove clicked')}
 * />
 */
const UITableBadgeDisplay = lazyField<ComponentProps<typeof UITableBadgeDisplayType>>(() =>
  import('./components/atoms/badge-display').then(m => ({ default: m.UITableBadgeDisplay }))
);
/**
 * Table cell for a boolean: a green check for `true`, a red cross for `false`, and the empty-value
 * placeholder for `null`/`undefined`.
 *
 * @example
 * ```tsx
 * import { UITableBooleanDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableBooleanDisplay value={row.original.isActive} />
 * ```
 */
const UITableBooleanDisplay = lazyField<ComponentProps<typeof UITableBooleanDisplayType>>(() =>
  import('./components/atoms/boolean-display').then(m => ({ default: m.UITableBooleanDisplay }))
);
/**
 * Formats a numeric value as a locale-aware currency string in a table cell.
 * Always shows exactly two decimal places and uses the browser's `Intl` API for
 * symbol placement.  Renders {@link UITableEmptyValue} when the value is absent or
 * invalid.
 *
 * @example
 * import { UITableCurrencyDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableCurrencyDisplay value={1234.5} currency="USD" colorize />
 * <UITableCurrencyDisplay value={9800.5} currency="USD" trend="down" />
 */
const UITableCurrencyDisplay = lazyField<ComponentProps<typeof UITableCurrencyDisplayType>>(() =>
  import('./components/atoms/currency-display').then(m => ({ default: m.UITableCurrencyDisplay }))
);
/**
 * Displays a date as a compact badge in a table cell with a tooltip that shows
 * the full date and time on hover; renders {@link UITableEmptyValue} when `date` is
 * `null` or `undefined`.
 *
 * @example
 * import { UITableDateDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableDateDisplay date={new Date('2024-06-15T10:30:00Z')} />
 */
const UITableDateDisplay = lazyField<ComponentProps<typeof UITableDateDisplayType>>(() =>
  import('./components/atoms/date-display').then(m => ({ default: m.UITableDateDisplay }))
);
/**
 * Renders a two-line-clamped description in a table cell with a tooltip that
 * reveals the full text and its character count; falls back to
 * {@link UITableEmptyValue} when `content` is `null` or `undefined`.
 *
 * @example
 * import { UITableDescriptionDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableDescriptionDisplay content="A detailed description of this record." />
 */
const UITableDescriptionDisplay = lazyField<ComponentProps<typeof UITableDescriptionDisplayType>>(() =>
  import('./components/atoms/description-display').then(m => ({ default: m.UITableDescriptionDisplay }))
);
/**
 * A ghost icon button with a pencil icon that triggers an async edit handler;
 * displays a descriptive tooltip on hover. Intended for use in table row action columns.
 *
 * @example
 * import { UITableEditButton } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableEditButton
 *   title="Edit employee details"
 *   onClick={async () => await openEditModal(rowId)}
 * />
 */
const UITableEditButton = lazyField<ComponentProps<typeof UITableEditButtonType>>(() =>
  import('./components/atoms/edit-button').then(m => ({ default: m.UITableEditButton }))
);
/**
 * Displays an email address in a table cell with a copy-to-clipboard button.
 * Shows a brief checkmark confirmation after copying.  Optionally wraps the
 * address in a `mailto:` link.  Renders {@link UITableEmptyValue} when `email` is
 * absent.
 *
 * @example
 * import { UITableEmailDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableEmailDisplay email="jane@example.com" />
 */
const UITableEmailDisplay = lazyField<ComponentProps<typeof UITableEmailDisplayType>>(() =>
  import('./components/atoms/email-display').then(m => ({ default: m.UITableEmailDisplay }))
);
/**
 * Renders an array of values as compact inline pills in a table cell.  When the
 * list exceeds `maxVisible`, a `+N` badge is shown; hovering it reveals the
 * remaining (or, with `tooltipItems="all"`, every) item in a tooltip.  Renders
 * {@link UITableEmptyValue} for empty or absent arrays.
 *
 * @example
 * import { UITableListDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableListDisplay items={['React', 'TypeScript', 'TailwindCSS', 'Vite']} maxVisible={3} />
 * <UITableListDisplay
 *   items={shipmentCodes}
 *   variant="tag"
 *   tooltipItems="all"
 *   moreLabel={n => `+${n}`}
 * />
 */
const UITableListDisplay = lazyField<ComponentProps<typeof UITableListDisplayType>>(() =>
  import('./components/atoms/list-display').then(m => ({ default: m.UITableListDisplay }))
);
/**
 * A vertical-ellipsis icon button that opens a dropdown menu populated from the
 * `items` array; intended for use in table row action columns.
 *
 * @example
 * import { UITableMoreButton } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableMoreButton
 *   items={[
 *     { id: 'edit', label: 'Edit', onClick: (id) => console.log(id) },
 *     { id: 'delete', label: 'Delete', onClick: (id) => console.log(id) },
 *   ]}
 * />
 */
const UITableMoreButton = lazyField<ComponentProps<typeof UITableMoreButtonType>>(() =>
  import('./components/atoms/more-button').then(m => ({ default: m.UITableMoreButton }))
);
/**
 * Renders a clamped, truncated name string inside a tooltip that shows the full
 * text and character count on hover; falls back to {@link UITableEmptyValue} when the
 * value is absent.
 *
 * @example
 * import { UITableNameDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableNameDisplay name="John Doe" />
 */
const UITableNameDisplay = lazyField<ComponentProps<typeof UITableNameDisplayType>>(() =>
  import('./components/atoms/name-display').then(m => ({ default: m.UITableNameDisplay }))
);
/**
 * Renders an external-link anchor with an icon for use in table cells, opening
 * the target URL in a new tab with safe `rel` attributes. Renders
 * {@link UITableEmptyValue} when `href` is absent.
 *
 * @example
 * import { UITablePermalink } from '@customafk/lunas-ui/features/tables';
 *
 * <UITablePermalink href="https://example.com/records/42" label="View record" />
 */
const UITablePermalink = lazyField<ComponentProps<typeof UITablePermalinkType>>(() =>
  import('./components/atoms/permalink').then(m => ({ default: m.UITablePermalink }))
);
/**
 * Formats and displays a phone number string in a table cell using the
 * `(NXX) NXX-XXXX` pattern, with a tooltip that shows the full international
 * dialling representation. Renders {@link UITableEmptyValue} when `value` is absent.
 *
 * @example
 * import { UITablePhoneNumberDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITablePhoneNumberDisplay value="0843456789" />
 */
const UITablePhoneNumberDisplay = lazyField<ComponentProps<typeof UITablePhoneNumberDisplayType>>(() =>
  import('./components/atoms/phone-number').then(m => ({ default: m.UITablePhoneNumberDisplay }))
);
/**
 * Renders a horizontal progress bar with an optional percentage label for a
 * table cell.  The bar color shifts from red → yellow → green based on
 * configurable thresholds.  Renders {@link UITableEmptyValue} when `value` is absent.
 *
 * @example
 * import { UITableProgressDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableProgressDisplay value={75} />
 */
const UITableProgressDisplay = lazyField<ComponentProps<typeof UITableProgressDisplayType>>(() =>
  import('./components/atoms/progress-display').then(m => ({ default: m.UITableProgressDisplay }))
);
/**
 * A ghost danger icon button with a trash icon that triggers an async removal
 * handler; displays a descriptive tooltip on hover to confirm the action intent.
 *
 * @example
 * import { UITableRemoveButton } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableRemoveButton
 *   title="Remove member from project"
 *   onClick={async () => await deleteRow(rowId)}
 * />
 */
const UITableRemoveButton = lazyField<ComponentProps<typeof UITableRemoveButtonType>>(() =>
  import('./components/atoms/remove-button').then(m => ({ default: m.UITableRemoveButton }))
);
/**
 * A memoized table-cell component that formats a numeric value with configurable
 * separators, precision, rounding, and size; renders {@link UITableEmptyValue} when
 * the value is zero, invalid, or absent.
 *
 * @example
 * import { UITableStatisticDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableStatisticDisplay value={1234567.89} precision={2} prefix="$" size="md" />
 * <UITableStatisticDisplay value={1234567.89} precision={2} prefix="$" trend="down" />
 */
const UITableStatisticDisplay = lazyField<ComponentProps<typeof UITableStatisticDisplayType>>(() =>
  import('./components/atoms/statistic').then(m => ({ default: m.UITableStatisticDisplay }))
);
/**
 * Renders a color-coded status badge for a table cell.  The mapping from status
 * string to badge color is fully configurable via `colorMap`; unknown statuses
 * fall back to `defaultColor`.
 *
 * @example
 * import { UITableStatusDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableStatusDisplay
 *   value="active"
 *   colorMap={{ active: 'success', inactive: 'danger', pending: 'warning' }}
 * />
 */
const UITableStatusDisplay = lazyField<ComponentProps<typeof UITableStatusDisplayType>>(() =>
  import('./components/atoms/status-display').then(m => ({ default: m.UITableStatusDisplay }))
);
/**
 * Summarises the **set of distinct statuses** across a group of rows as a row of
 * color-coded badges with a `+N` overflow badge. Hovering the overflow badge
 * reveals **every** status (with its `count`) in a tooltip. Use it on an
 * aggregate/parent row where a single-value {@link UITableStatusDisplay} cannot
 * represent the mix — also fits order-type / order-status columns.
 *
 * @example
 * import { UITableStatusListDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableStatusListDisplay
 *   items={[{ value: 'PURCHASED', count: 4 }, { value: 'PURCHASING', count: 1 }]}
 *   colorMap={{ PURCHASED: 'success', PURCHASING: 'warning' }}
 *   formatLabel={t}
 * />
 */
const UITableStatusListDisplay = lazyField<ComponentProps<typeof UITableStatusListDisplayType>>(() =>
  import('./components/atoms/status-list-display').then(m => ({ default: m.UITableStatusListDisplay }))
);
/**
 * An on/off toggle switch for table row action columns.
 * Wraps the `Switch` primitive with a tooltip and stops row-click propagation.
 *
 * @example
 * import { UITableToggleButton } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableToggleButton
 *   checked={row.isActive}
 *   titleOn="Deactivate account"
 *   titleOff="Activate account"
 *   onCheckedChange={(checked) => updateStatus(rowId, checked)}
 * />
 */
const UITableToggleButton = lazyField<ComponentProps<typeof UITableToggleButtonType>>(() =>
  import('./components/atoms/toggle-button').then(m => ({ default: m.UITableToggleButton }))
);
/**
 * Renders a user avatar paired with username and email for use in table cells;
 * derives a consistent avatar background colour from the user's `uuid` via a
 * colour-hash utility.
 *
 * @example
 * import { UITableUserDataDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableUserDataDisplay
 *   uuid="a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *   username="Jane Smith"
 *   email="jane@example.com"
 * />
 */
const UITableUserDataDisplay = lazyField<ComponentProps<typeof UITableUserDataDisplayType>>(() =>
  import('./components/atoms/user').then(m => ({ default: m.UITableUserDataDisplay }))
);

// ─── Optional panels & toolbar (lazy) ──────────────────────────────────────────

/**
 * Collapsible side-panel that lets users toggle column visibility and build
 * row filters without leaving the table view.
 *
 * The panel collapses to a narrow icon strip when no tab is active and expands
 * to at least 64 units when the "Columns" or "Filters" tab is selected.
 *
 * Wire filter capability by passing `filterDefinitions` and `onFilterChange` to
 * the parent `UITableProvider`.
 *
 * @example
 * ```tsx
 * <UITableProvider
 *   filterDefinitions={[
 *     { id: 'status', label: 'Status', type: 'tag', options: [{ label: 'Active', value: 'active' }] },
 *     { id: 'created', label: 'Created At', type: 'date-range' },
 *     { id: 'amount', label: 'Amount', type: 'number' },
 *   ]}
 *   onFilterChange={filters => console.log(filters)}
 * >
 *   <UITableContainer sidePanels={[<UITableFilter key="filter" />]} />
 * </UITableProvider>
 * ```
 */
const UITableFilter = lazyField<object>(() => import('./components/table/filter').then(m => ({ default: m.UITableFilter })));
/**
 * Collapsible panel under the table that shows, for every column with `meta.aggregation`, the
 * aggregate (sum/avg/count/min/max) over all rows and over the currently selected rows. Reads
 * everything from the surrounding `UITableProvider`; takes no props.
 *
 * @example
 * ```tsx
 * import { UITableAnalysisPanel, UITableProvider } from '@customafk/lunas-ui/features/tables';
 *
 * const columns = [{ accessorKey: 'total', header: 'Tổng tiền', meta: { aggregation: { type: 'sum' } } }];
 *
 * <UITableProvider data={orders} columns={columns}>
 *   {table}
 *   <UITableAnalysisPanel />
 * </UITableProvider>
 * ```
 */
const UITableAnalysisPanel = lazyField<object>(
  () => import('./components/table/analysis-panel').then(m => ({ default: m.UITableAnalysisPanel })),
  'analysisPanel'
);
UITableAnalysisPanel.displayName = 'UITableAnalysisPanel';
/**
 * Row of KPI cards above the table, built from the provider's `summary` items (each with an
 * optional trend accent); cards become buttons when `onSummaryItemClick` is set. Renders nothing
 * while the summary is collapsed or empty. Reads everything from the surrounding `UITableProvider`.
 *
 * @example
 * ```tsx
 * import { UITableProvider, UITableSummaryBar } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableProvider
 *   data={orders}
 *   columns={columns}
 *   summary={[{ label: 'Doanh thu', value: 124_500_000, suffix: '₫', trend: 'up' }]}
 * >
 *   <UITableSummaryBar />
 *   {table}
 * </UITableProvider>
 * ```
 */
const UITableSummaryBar = lazyField<object>(() => import('./components/table/summary-bar').then(m => ({ default: m.UITableSummaryBar })), 'summaryBar');
UITableSummaryBar.displayName = 'UITableSummaryBar';
/**
 * Outer toolbar shell for the UITable component.
 *
 * Reads the table `title` from `UITableContext` and renders it as a heading
 * above the `children` slot, which typically contains a
 * `UITableToolbarSearch` and/or `UITableToolbarActions`.
 *
 * @example
 * ```tsx
 * import {
 *   UITableToolbar,
 *   UITableToolbarSearch,
 *   UITableToolbarActions,
 * } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableToolbar>
 *   <UITableToolbarSearch onSearch={setQuery} />
 *   <UITableToolbarActions onCreate={handleCreate} onRefresh={refetch} />
 * </UITableToolbar>
 * ```
 */
const UITableToolbar = lazyField<ComponentProps<typeof UITableToolbarType>>(
  () => import('./components/table/toolbar').then(m => ({ default: m.UITableToolbar })),
  'toolbar'
);
UITableToolbar.displayName = 'UITableToolbar';
/**
 * Debounced search input rendered inside the table toolbar.
 *
 * Fires `onSearch` 500 ms after the user stops typing and delegates all other
 * native input events via the spread `props`.
 *
 * @example
 * ```tsx
 * import { UITableToolbarSearch } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableToolbarSearch
 *   placeholder="Search users…"
 *   onSearch={value => setQuery(value)}
 * />
 * ```
 */
const UITableToolbarSearch = lazyField<ComponentProps<typeof UITableToolbarSearchType>>(() =>
  import('./components/table/toolbar').then(m => ({ default: m.UITableToolbarSearch }))
);
/**
 * Grouped action buttons (create, refresh, download) displayed in the table
 * toolbar.
 *
 * Each button is disabled automatically when the corresponding handler prop is
 * omitted, so only the actions relevant to a given table need to be provided.
 * A toggle for `UITableSummaryBar` appears automatically when `summary` is
 * non-empty, and a toggle for `UITableAnalysisPanel` appears when
 * `showAnalysisPanel` is `true` (both set on `UITableProvider`).
 * `onCreateMultiple` renders a separate "bulk create" button next to the
 * single-item create button; omit it to hide the button entirely.
 *
 * @example
 * ```tsx
 * import { UITableToolbarActions } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableToolbarActions
 *   onCreate={() => setOpenCreate(true)}
 *   onCreateMultiple={() => setOpenBulkCreate(true)}
 *   onRefresh={() => refetch()}
 * />
 * ```
 */
const UITableToolbarActions = lazyField<ComponentProps<typeof UITableToolbarActionsType>>(() =>
  import('./components/table/toolbar').then(m => ({ default: m.UITableToolbarActions }))
);

export {
  UITableAnalysisPanel,
  // Cell-renderer atoms
  UITableAvatarNameDisplay,
  UITableBadgeDisplay,
  UITableBooleanDisplay,
  UITableCurrencyDisplay,
  UITableDateDisplay,
  UITableDescriptionDisplay,
  UITableEditButton,
  UITableEmailDisplay,
  // Optional panels & toolbar
  UITableFilter,
  UITableListDisplay,
  UITableMoreButton,
  UITableNameDisplay,
  UITablePermalink,
  UITablePhoneNumberDisplay,
  UITableProgressDisplay,
  UITableRemoveButton,
  UITableStatisticDisplay,
  UITableStatusDisplay,
  UITableStatusListDisplay,
  UITableSummaryBar,
  UITableToggleButton,
  UITableToolbar,
  UITableToolbarActions,
  UITableToolbarSearch,
  UITableUserDataDisplay,
};
