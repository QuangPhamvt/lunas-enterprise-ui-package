import { ArrowRightIcon, SearchIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Input } from '../input';

/**
 * Props for {@link SearchInput}. Accepts all native props of the underlying
 * `Input` component (itself a thin wrapper around `<input>`), including
 * `value`, `defaultValue`, `onChange`, `placeholder`, `disabled`, etc.
 * The `type` prop is fixed to `"search"` and cannot be overridden.
 */
type Props = React.ComponentPropsWithoutRef<typeof Input>;

/**
 * A search input field with a leading search icon and a trailing arrow submit button, intended for use inside an HTML `<form>` element.
 *
 * @example
 * import { SearchInput } from '@customafk/lunas-ui/ui/inputs/search-input';
 *
 * <form onSubmit={handleSearch}>
 *   <SearchInput placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
 * </form>
 */
export const SearchInput = ({ className, ...rest }: Props) => {
  return (
    <div className="relative">
      <Input {...rest} type="search" className={cn('ps-9 pe-9', className)} />
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
