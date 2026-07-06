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
 *   UITableProvider,
 *   UITableWrapper,
 *   UITableTooltip,
 *   UITableTooltipFilter,
 *   UITableTooltipActions,
 *   UITableFilter,
 * } from '@customafk/lunas-ui/features/tables';
 * ```
 */
import type { ComponentProps, ComponentType } from 'react';
import { lazy, Suspense } from 'react';

export { UITableEmpty } from './components/atoms/empty';
export * from './components/common';
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
import type { UITableToggleButton as UITableToggleButtonType } from './components/atoms/toggle-button';
import type { UITableUserDataDisplay as UITableUserDataDisplayType } from './components/atoms/user';
import type {
  UITableTooltipActions as UITableTooltipActionsType,
  UITableTooltipFilter as UITableTooltipFilterType,
  UITableTooltip as UITableTooltipType,
} from './components/table/tooltip';

/**
 * Wraps a `lazy()`-loaded component in its own `Suspense` boundary so it can be dropped
 * anywhere without callers needing to set up Suspense themselves. Keeps this file itself
 * small — the heavy per-atom/per-panel implementations (Radix primitives, lucide icon sets,
 * the filter builder, CSV export, etc.) only load when a table actually renders that piece.
 */
function lazyField<P extends object>(loader: () => Promise<{ default: ComponentType<P> }>): ComponentType<P> {
  const LazyComponent = lazy(loader);
  return (props: P) => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// ─── Cell-renderer atoms (lazy) ────────────────────────────────────────────────

const UITableAvatarNameDisplay = lazyField<ComponentProps<typeof UITableAvatarNameDisplayType>>(() =>
  import('./components/atoms/avatar-name-display').then(m => ({ default: m.UITableAvatarNameDisplay }))
);
const UITableBadgeDisplay = lazyField<ComponentProps<typeof UITableBadgeDisplayType>>(() =>
  import('./components/atoms/badge-display').then(m => ({ default: m.UITableBadgeDisplay }))
);
const UITableBooleanDisplay = lazyField<ComponentProps<typeof UITableBooleanDisplayType>>(() =>
  import('./components/atoms/boolean-display').then(m => ({ default: m.UITableBooleanDisplay }))
);
const UITableCurrencyDisplay = lazyField<ComponentProps<typeof UITableCurrencyDisplayType>>(() =>
  import('./components/atoms/currency-display').then(m => ({ default: m.UITableCurrencyDisplay }))
);
const UITableDateDisplay = lazyField<ComponentProps<typeof UITableDateDisplayType>>(() =>
  import('./components/atoms/date-display').then(m => ({ default: m.UITableDateDisplay }))
);
const UITableDescriptionDisplay = lazyField<ComponentProps<typeof UITableDescriptionDisplayType>>(() =>
  import('./components/atoms/description-display').then(m => ({ default: m.UITableDescriptionDisplay }))
);
const UITableEditButton = lazyField<ComponentProps<typeof UITableEditButtonType>>(() =>
  import('./components/atoms/edit-button').then(m => ({ default: m.UITableEditButton }))
);
const UITableEmailDisplay = lazyField<ComponentProps<typeof UITableEmailDisplayType>>(() =>
  import('./components/atoms/email-display').then(m => ({ default: m.UITableEmailDisplay }))
);
const UITableListDisplay = lazyField<ComponentProps<typeof UITableListDisplayType>>(() =>
  import('./components/atoms/list-display').then(m => ({ default: m.UITableListDisplay }))
);
const UITableMoreButton = lazyField<ComponentProps<typeof UITableMoreButtonType>>(() =>
  import('./components/atoms/more-button').then(m => ({ default: m.UITableMoreButton }))
);
const UITableNameDisplay = lazyField<ComponentProps<typeof UITableNameDisplayType>>(() =>
  import('./components/atoms/name-display').then(m => ({ default: m.UITableNameDisplay }))
);
const UITablePermalink = lazyField<ComponentProps<typeof UITablePermalinkType>>(() =>
  import('./components/atoms/permalink').then(m => ({ default: m.UITablePermalink }))
);
const UITablePhoneNumberDisplay = lazyField<ComponentProps<typeof UITablePhoneNumberDisplayType>>(() =>
  import('./components/atoms/phone-number').then(m => ({ default: m.UITablePhoneNumberDisplay }))
);
const UITableProgressDisplay = lazyField<ComponentProps<typeof UITableProgressDisplayType>>(() =>
  import('./components/atoms/progress-display').then(m => ({ default: m.UITableProgressDisplay }))
);
const UITableRemoveButton = lazyField<ComponentProps<typeof UITableRemoveButtonType>>(() =>
  import('./components/atoms/remove-button').then(m => ({ default: m.UITableRemoveButton }))
);
const UITableStatisticDisplay = lazyField<ComponentProps<typeof UITableStatisticDisplayType>>(() =>
  import('./components/atoms/statistic').then(m => ({ default: m.UITableStatisticDisplay }))
);
const UITableStatusDisplay = lazyField<ComponentProps<typeof UITableStatusDisplayType>>(() =>
  import('./components/atoms/status-display').then(m => ({ default: m.UITableStatusDisplay }))
);
const UITableToggleButton = lazyField<ComponentProps<typeof UITableToggleButtonType>>(() =>
  import('./components/atoms/toggle-button').then(m => ({ default: m.UITableToggleButton }))
);
const UITableUserDataDisplay = lazyField<ComponentProps<typeof UITableUserDataDisplayType>>(() =>
  import('./components/atoms/user').then(m => ({ default: m.UITableUserDataDisplay }))
);

// ─── Optional panels & toolbar (lazy) ──────────────────────────────────────────

const UITableFilter = lazyField<Record<string, never>>(() => import('./components/table/filter').then(m => ({ default: m.UITableFilter })));
const UITableAnalysisPanel = lazyField<Record<string, never>>(() =>
  import('./components/table/analysis-panel').then(m => ({ default: m.UITableAnalysisPanel }))
);
const UITableSummaryBar = lazyField<Record<string, never>>(() => import('./components/table/summary-bar').then(m => ({ default: m.UITableSummaryBar })));
const UITableTooltip = lazyField<ComponentProps<typeof UITableTooltipType>>(() =>
  import('./components/table/tooltip').then(m => ({ default: m.UITableTooltip }))
);
const UITableTooltipFilter = lazyField<ComponentProps<typeof UITableTooltipFilterType>>(() =>
  import('./components/table/tooltip').then(m => ({ default: m.UITableTooltipFilter }))
);
const UITableTooltipActions = lazyField<ComponentProps<typeof UITableTooltipActionsType>>(() =>
  import('./components/table/tooltip').then(m => ({ default: m.UITableTooltipActions }))
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
  UITableSummaryBar,
  UITableToggleButton,
  UITableTooltip,
  UITableTooltipActions,
  UITableTooltipFilter,
  UITableUserDataDisplay,
};
