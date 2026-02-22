import { ArrowRightIcon, CirclePlus, DownloadIcon, RefreshCwIcon, SearchIcon } from 'lucide-react';

import { useDebounceCallback } from '@customafk/react-toolkit/hooks/useDebounceCallback';

import { Input } from '@/components/ui/input';

import { useUITableContext } from '../../hooks/use-table-context';

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
        placeholder="Search records..."
        className="flex-1 ps-9 pe-9"
        onChange={e => {
          onChange?.(e);
          debouncedSearch(e.target.value ?? '');
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-text-positive-weak peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
      <button
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-text-positive-weak outline-none transition-[color,box-shadow] hover:text-text-positive focus:z-10 focus-visible:border focus-visible:border-primary-strong focus-visible:ring-[3px] focus-visible:ring-primary-weak disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Submit search"
        type="submit"
      >
        <ArrowRightIcon size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

const ActionButton: React.FC<React.PropsWithChildren<React.ComponentProps<'button'>>> = ({ children, disabled, onClick }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className="flex cursor-pointer items-center gap-x-1 rounded-sm border border-border bg-background p-2.5 text-sm text-text-positive-weak outline-none transition-all hover:shadow-card focus:border-border-emphasis focus:bg-muted-muted active:border-border-emphasis active:bg-muted-muted active:text-text-positive disabled:pointer-events-none disabled:cursor-default disabled:opacity-60 [&_svg]:size-3.5"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const UITableTooltipActions: React.FC<{
  onCreate?: () => void;
  onRefresh?: () => void;
  onDownload?: () => void;
}> = ({ onCreate, onDownload, onRefresh }) => {
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
        disabled={!onDownload}
        onClick={e => {
          onDownload?.();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <DownloadIcon />
      </ActionButton>
    </div>
  );
};

export const UITableTooltip: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { title } = useUITableContext();
  return (
    <div data-slot="table-tooltip" className="relative m-0 flex w-full flex-0 flex-col flex-wrap items-start space-y-2 p-0 px-2 text-sm">
      <h3 className="font-semibold text-base text-text-positive">{title}</h3>
      <div className="flex w-full flex-1 justify-between gap-x-2">{children}</div>
    </div>
  );
};
UITableTooltip.displayName = 'TableTooltip';
