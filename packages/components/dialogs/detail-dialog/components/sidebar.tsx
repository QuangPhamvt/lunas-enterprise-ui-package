'use client';

/**
 * @module @customafk/lunas-ui/dialogs/detail-dialog/components/sidebar
 *
 * Sidebar primitives used by `DetailDialog`. Split into `./sidebar-core` (the pieces
 * `DetailDialog` itself renders — provider, container, header/footer/menu, trigger) and
 * `./sidebar-extras` (groups, submenus, the skeleton, and the desktop drag rail, which
 * `DetailDialog` never renders). This barrel re-exports both for standalone use (pair `Sidebar`
 * with `SidebarProvider`, a plain 2-column sidebar-and-content grid). `DetailDialog`'s own entry
 * uses `DetailDialogProvider` (`./provider`) instead — a separate, DetailDialog-specific provider
 * that bakes in its 2x2 header/content grid shell, sharing the underlying state logic with
 * `SidebarProvider` via `useSidebarState`.
 */
export * from './sidebar-core';
export * from './sidebar-extras';
