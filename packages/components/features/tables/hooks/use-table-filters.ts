import { useCallback, useMemo, useState } from 'react';

import type { ActiveFilter, FilterDefinition, FilterType, FilterValue, TTableFilterContext } from '../types';

function createDefaultFilterValue(type: FilterType): FilterValue {
  switch (type) {
    case 'tag':
      return { type: 'tag', values: [] };
    case 'single-tag':
      return { type: 'single-tag', value: null };
    case 'date-range':
      return { type: 'date-range' };
    case 'number':
      return { type: 'number', operator: 'eq' };
    case 'text':
      return { type: 'text', operator: 'contains', value: '' };
    case 'boolean':
      return { type: 'boolean', value: null };
  }
}

type UseTableFiltersArgs = {
  filterDefinitions: FilterDefinition[];
  onFilterChange?: (filters: ActiveFilter[]) => void;
};

/**
 * Owns the "active filters" list consumed by `UITableFilter`, including
 * add/remove/update mutators, and bridges every change to the consumer-facing
 * `onFilterChange` callback declared on `UITableProvider`.
 */
export function useTableFilters({ filterDefinitions, onFilterChange }: UseTableFiltersArgs): TTableFilterContext {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  const addFilter = useCallback(
    (definitionId: string) => {
      const def = filterDefinitions.find(d => d.id === definitionId);
      if (!def) return;
      const newFilter: ActiveFilter = {
        id: `${definitionId}-${crypto.randomUUID()}`,
        definitionId,
        value: createDefaultFilterValue(def.type),
      };
      setActiveFilters(prev => {
        const next = [...prev, newFilter];
        onFilterChange?.(next);
        return next;
      });
    },
    [filterDefinitions, onFilterChange]
  );

  const removeFilter = useCallback(
    (filterId: string) => {
      setActiveFilters(prev => {
        const next = prev.filter(f => f.id !== filterId);
        onFilterChange?.(next);
        return next;
      });
    },
    [onFilterChange]
  );

  const updateFilter = useCallback(
    (filterId: string, value: FilterValue) => {
      setActiveFilters(prev => {
        const next = prev.map(f => (f.id === filterId ? { ...f, value } : f));
        onFilterChange?.(next);
        return next;
      });
    },
    [onFilterChange]
  );

  return useMemo<TTableFilterContext>(
    () => ({ filterDefinitions, activeFilters, addFilter, removeFilter, updateFilter }),
    [filterDefinitions, activeFilters, addFilter, removeFilter, updateFilter]
  );
}
