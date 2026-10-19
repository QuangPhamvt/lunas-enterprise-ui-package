// ============ Filter system ============

export type FilterType = 'tag' | 'single-tag' | 'date-range' | 'number' | 'text' | 'boolean';

/** A selectable option for tag/enum filters. */
export type FilterOption = { label: string; value: string };

/**
 * Declares a filterable field available in the "Add Filter" dropdown.
 * `options` is required when `type === 'tag'`.
 */
export type FilterDefinition = {
  id: string;
  label: string;
  type: FilterType;
  options?: FilterOption[];
};

export type TagFilterValue = { type: 'tag'; values: string[] };

export type SingleTagFilterValue = { type: 'single-tag'; value: string | null };

export type DateRangeFilterValue = {
  type: 'date-range';
  /** ISO date string, e.g. `"2024-01-01"`. */
  from?: string;
  to?: string;
};

export type NumberFilterValue = {
  type: 'number';
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'between';
  value?: number;
  valueTo?: number;
};

export type TextFilterValue = {
  type: 'text';
  operator: 'contains' | 'equals' | 'starts-with' | 'ends-with';
  value: string;
};

export type BooleanFilterValue = { type: 'boolean'; value: boolean | null };

export type FilterValue = TagFilterValue | SingleTagFilterValue | DateRangeFilterValue | NumberFilterValue | TextFilterValue | BooleanFilterValue;

/** An active (added) filter instance with its current value. */
export type ActiveFilter = {
  /** Unique instance id for this filter entry. */
  id: string;
  /** References a `FilterDefinition.id`. */
  definitionId: string;
  value: FilterValue;
};

/** Context value exposed by `UITableProvider` for the filter panel. */
export type TTableFilterContext = {
  filterDefinitions: FilterDefinition[];
  activeFilters: ActiveFilter[];
  addFilter: (definitionId: string) => void;
  removeFilter: (filterId: string) => void;
  updateFilter: (filterId: string, value: FilterValue) => void;
};
