'use client';

import { use } from 'react';

import { SearchIcon, XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Input } from '@/components/ui/input';

import { DescriptionConfigContext, DescriptionSearchContext } from './context';

export type DescriptionSearchProps = {
  /** @default 'Tìm kiếm...' */
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

/**
 * A live, as-you-type filter for a `Description`'s `DescriptionItem`s — no debounce, since matching is a
 * cheap string test over at most a few dozen items. Place it inside `DescriptionHeader`'s `extra` slot
 * (the header is sticky by default, so the input stays reachable while scrolling filtered results); it
 * also works as a direct child of `Description`.
 *
 * Filters by case- and diacritic-insensitive substring match against each `DescriptionItem`'s `label` —
 * this is cross-cutting by design (every sibling item reads the query from context), so no wiring is
 * needed beyond mounting this component once per panel.
 *
 * @example
 * import { Description, DescriptionHeader, DescriptionSearch } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionHeader title="Order details" extra={<DescriptionSearch />} />
 *   ...
 * </Description>
 */
export const DescriptionSearch: React.FC<DescriptionSearchProps> = ({ placeholder = 'Tìm kiếm...', autoFocus, className }) => {
  const { query, setQuery } = use(DescriptionSearchContext);
  const { size } = use(DescriptionConfigContext);
  const inputSize = size === 'xs' || size === 'sm' ? 'xs' : 'sm';

  return (
    <div data-slot="description-search" className={cn('relative w-full max-w-56', className)}>
      <SearchIcon size={14} className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 text-text-positive-muted" />
      <Input
        size={inputSize}
        value={query}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onValueChange={setQuery}
        aria-label={placeholder}
        className="pl-7"
      />
      {query !== '' && (
        <button
          type="button"
          data-slot="description-search-clear"
          aria-label="Xoá tìm kiếm"
          onClick={() => setQuery('')}
          className="-translate-y-1/2 absolute top-1/2 right-1.5 cursor-pointer text-text-positive-muted transition-colors hover:text-text-positive"
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  );
};
