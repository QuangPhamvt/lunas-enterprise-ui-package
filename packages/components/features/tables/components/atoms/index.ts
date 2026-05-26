/**
 * Atom cell renderers for UITable columns.
 *
 * Each export is a small, focused React component designed to be used as a
 * TanStack Table `cell` renderer.  They accept the raw cell value together
 * with any display-specific props and produce a consistently styled output.
 *
 * Available atoms:
 * - `BadgeDisplay` — renders a value as a coloured badge
 * - `BooleanDisplay` — renders a boolean as a tick/cross icon
 * - `CurrencyDisplay` — locale-aware currency value with optional colorization
 * - `DateDisplay` — formats and displays a date value
 * - `DescriptionDisplay` — truncated long-text with a tooltip
 * - `EmailDisplay` — email address with copy-to-clipboard action
 * - `ListDisplay` — array of values as inline pills with +N overflow
 * - `MoreButton` — "…more" overflow trigger for action menus
 * - `NameDisplay` — formats a person/entity name
 * - `Permalink` — clickable link cell
 * - `PhoneNumber` — formatted telephone number
 * - `ProgressDisplay` — progress bar for 0–100 percentage values
 * - `RemoveButton` — inline delete action button
 * - `Statistic` — numeric value with optional unit label
 * - `StatusDisplay` — color-coded status badge with configurable map
 * - `User` — user avatar + name combination
 *
 * @example
 * ```tsx
 * import { BadgeDisplay, DateDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * const columns = [
 *   { accessorKey: 'status', header: 'Status', cell: ({ getValue }) => <BadgeDisplay value={getValue()} /> },
 *   { accessorKey: 'createdAt', header: 'Created', cell: ({ getValue }) => <DateDisplay value={getValue()} /> },
 * ];
 * ```
 */
export * from './badge-display';
export * from './boolean-display';
export * from './currency-display';
export * from './date-display';
export * from './description-display';
export * from './email-display';
export * from './list-display';
export * from './more-button';
export * from './name-display';
export * from './permalink';
export * from './phone-number';
export * from './progress-display';
export * from './remove-button';
export * from './statistic';
export * from './status-display';
export * from './user';
