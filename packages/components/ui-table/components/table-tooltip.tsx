import { ArrowRightIcon, CirclePlus, DownloadIcon, RefreshCwIcon, SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useUITableContext } from '../hooks/use-table-context';

export const UITableTooltipFilter: React.FC<React.ComponentProps<typeof Input>> = ({ className: _, ...props }) => {
  return (
    <div className="relative">
      <Input {...props} size="lg" type="search" placeholder="Search records..." className="ps-9 pe-9" />
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

const ActionButton: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <button className="flex cursor-pointer items-center gap-x-1 rounded-sm border border-border bg-background p-2.5 text-sm text-text-positive-weak outline-none transition-all hover:shadow-card focus:border-border-emphasis focus:bg-muted-muted active:border-border-emphasis active:bg-muted-muted active:text-text-positive [&_svg]:size-3.5">
      {children}
    </button>
  );
};

export const UITableTooltipActions: React.FC = () => {
  return (
    <div className="flex [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none">
      <ActionButton>
        <CirclePlus />
      </ActionButton>
      <ActionButton>
        <RefreshCwIcon />
      </ActionButton>
      <ActionButton>
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
      <div className="flex w-full flex-1 justify-between">{children}</div>
    </div>
  );
};
UITableTooltip.displayName = 'TableTooltip';
