/**
 * @file tooltip.tsx
 * Toolbar components rendered above the table: a debounced search input,
 * an action button group (create / refresh / download), and the outer
 * toolbar shell that displays the table title.
 */
import { useCallback } from 'react';

import { ArrowRightIcon, BarChart2Icon, CirclePlus, DownloadIcon, RefreshCwIcon, SearchIcon } from 'lucide-react';

import { useDebounceCallback } from '@customafk/react-toolkit/hooks/useDebounceCallback';
import { cn } from '@customafk/react-toolkit/utils';

import { Input } from '@/components/ui/input';

import { useUITableAnalysisContext, useUITableContext } from '../../hooks/use-context';
import { downloadCsv } from '../../utils/csv';

/**
 * Debounced search input rendered inside the table toolbar.
 *
 * Fires `onSearch` 500 ms after the user stops typing and delegates all other
 * native input events via the spread `props`.
 *
 * @example
 * ```tsx
 * import { UITableTooltipFilter } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableTooltipFilter
 *   placeholder="Search users…"
 *   onSearch={value => setQuery(value)}
 * />
 * ```
 */
export const UITableTooltipFilter: React.FC<
  Omit<React.ComponentProps<typeof Input>, 'className'> & {
    onSearch?: (value: string) => void;
  }
> = ({ onSearch, onChange, ...props }) => {
  const debouncedSearch = useDebounceCallback((value: string) => {
    onSearch?.(value);
  }, 500);
  return (
    <div className="relative w-full max-w-80 flex-1">
      <Input
        {...props}
        size="lg"
        type="search"
        placeholder="Tìm kiếm..."
        className="flex-1 ps-9 pe-9"
        onChange={e => {
          onChange?.(e);
          debouncedSearch(e.target.value ?? '');
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 inset-s-0 flex items-center justify-center ps-3 text-text-positive-weak peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
      <button
        className="absolute inset-y-0 inset-e-0 flex h-full w-9 items-center justify-center rounded-e-md text-text-positive-weak outline-none transition-[color,box-shadow] hover:text-text-positive focus:z-10 focus-visible:border focus-visible:border-primary-strong focus-visible:ring-[3px] focus-visible:ring-primary-weak disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Submit search"
        type="submit"
      >
        <ArrowRightIcon size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

const ActionButton: React.FC<React.PropsWithChildren<React.ComponentProps<'button'>>> = ({ children, disabled, onClick, className, ...props }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'flex cursor-pointer items-center gap-x-1 rounded-sm border border-border bg-background p-2.5 text-sm text-text-positive-weak outline-none transition-all hover:shadow-card focus:border-border-emphasis focus:bg-muted-muted active:border-border-emphasis active:bg-muted-muted active:text-text-positive disabled:pointer-events-none disabled:cursor-default disabled:opacity-60 [&_svg]:size-3.5',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Grouped action buttons (create, refresh, download) displayed in the table
 * toolbar.
 *
 * Each button is disabled automatically when the corresponding handler prop is
 * omitted, so only the actions relevant to a given table need to be provided.
 *
 * @example
 * ```tsx
 * import { UITableTooltipActions } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableTooltipActions
 *   onCreate={() => setOpenCreate(true)}
 *   onRefresh={() => refetch()}
 * />
 * ```
 */
export const UITableTooltipActions: React.FC<{
  onCreate?: () => void;
  onRefresh?: () => void;
  onDownload?: () => void;
}> = ({ onCreate, onDownload, onRefresh }) => {
  const { table, csvData, csvFileName, title, showAnalysisPanel } = useUITableContext();
  const { isOpen: isAnalysisOpen, toggle: toggleAnalysis } = useUITableAnalysisContext();

  const handleDownload = useCallback(() => {
    if (onDownload) {
      onDownload();
      return;
    }
    if (!csvData || csvData.length === 0) return;
    const selectedRows = table.getSelectedRowModel().flatRows;
    const rows = selectedRows.length > 0 ? selectedRows.map(row => csvData[row.index]).filter(Boolean) : csvData;
    downloadCsv(rows, csvFileName || title);
  }, [onDownload, csvData, csvFileName, table, title]);

  const isDownloadEnabled = !!(onDownload || (csvData && csvData.length > 0));

  return (
    <div className="flex [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none">
      <ActionButton
        disabled={!onCreate}
        onClick={e => {
          onCreate?.();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <CirclePlus />
      </ActionButton>
      <ActionButton
        disabled={!onRefresh}
        onClick={e => {
          onRefresh?.();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <RefreshCwIcon />
      </ActionButton>
      <ActionButton
        disabled={!isDownloadEnabled}
        onClick={e => {
          handleDownload();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <DownloadIcon />
      </ActionButton>
      {showAnalysisPanel && (
        <ActionButton
          onClick={e => {
            toggleAnalysis();
            e.stopPropagation();
            e.preventDefault();
          }}
          aria-pressed={isAnalysisOpen}
          className={isAnalysisOpen ? 'bg-muted-muted text-text-positive' : undefined}
        >
          <BarChart2Icon />
        </ActionButton>
      )}
    </div>
  );
};

/**
 * Outer toolbar shell for the UITable component.
 *
 * Reads the table `title` from `UITableContext` and renders it as a heading
 * above the `children` slot, which typically contains a
 * `UITableTooltipFilter` and/or `UITableTooltipActions`.
 *
 * @example
 * ```tsx
 * import {
 *   UITableTooltip,
 *   UITableTooltipFilter,
 *   UITableTooltipActions,
 * } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableTooltip>
 *   <UITableTooltipFilter onSearch={setQuery} />
 *   <UITableTooltipActions onCreate={handleCreate} onRefresh={refetch} />
 * </UITableTooltip>
 * ```
 */
export const UITableTooltip: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { title, description, headerActions } = useUITableContext();
  return (
    <div data-slot="table-tooltip" className="relative flex w-full flex-col gap-2 px-2 py-0 text-sm">
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-base text-text-positive">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {headerActions && <div className="flex items-center gap-2 shrink-0">{headerActions}</div>}
      </div>
      <div className="flex w-full flex-1 justify-between gap-x-2">{children}</div>
    </div>
  );
};
UITableTooltip.displayName = 'TableTooltip';
