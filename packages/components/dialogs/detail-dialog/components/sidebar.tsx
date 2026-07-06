'use client';

/**
 * @module @customafk/lunas-ui/dialogs/detail-dialog/components/sidebar
 *
 * Full sidebar micro-framework used by `DetailDialog`. Split into `./sidebar-core` (the pieces
 * `DetailDialog` itself renders — provider, container, header/footer/menu, trigger) and
 * `./sidebar-extras` (groups, submenus, the skeleton, and the desktop drag rail, which
 * `DetailDialog` never renders). This barrel re-exports both for standalone use; `DetailDialog`'s
 * own entry imports only `./sidebar-core` so its bundle doesn't pay for the unused extras.
 */
export * from './sidebar-core';
export * from './sidebar-extras';
