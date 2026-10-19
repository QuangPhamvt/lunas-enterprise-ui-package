// ============ Filter system ============

/** Kind of editor a filter shows, and the shape of its {@link FilterValue}. */
export type FilterType = 'tag' | 'single-tag' | 'date-range' | 'number' | 'text' | 'boolean';

/** A selectable option for tag/enum filters. */
export type FilterOption = {
  /** Text shown in the picker and on the filter chip. */
  label: string;
  /** Value sent back in the filter's {@link FilterValue}. */
  value: string;
};

/**
 * Declares a filterable field available in the "Add Filter" dropdown.
 * `options` is required when `type === 'tag'`.
 */
export type FilterDefinition = {
  /** Stable id; active filters refer to it as `definitionId`. */
  id: string;
  /** Name shown in the "Add Filter" dropdown and on the chip. */
  label: string;
  /** Which editor to show — see {@link FilterType}. */
  type: FilterType;
  /** Choices for `tag` / `single-tag` filters. */
  options?: FilterOption[];
};

/** Value of a `tag` filter: any of the selected option values. */
export type TagFilterValue = {
  type: 'tag';
  /** Selected option values; an empty list means “no constraint”. */
  values: string[];
};

/** Value of a `single-tag` filter: exactly one option value, or none yet. */
export type SingleTagFilterValue = {
  type: 'single-tag';
  /** Selected option value. */
  value: string | null;
};

/** Value of a `date-range` filter; either bound may be open. */
export type DateRangeFilterValue = {
  type: 'date-range';
  /** Inclusive start, as an ISO date string, e.g. `"2024-01-01"`. */
  from?: string;
  /** Inclusive end, as an ISO date string. */
  to?: string;
};

/** Value of a `number` filter: a comparison, or a range with `between`. */
export type NumberFilterValue = {
  type: 'number';
  /** Comparison operator; `between` uses both `value` and `valueTo`. */
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'between';
  /** Operand, or the lower bound for `between`. */
  value?: number;
  /** Upper bound for `between`. */
  valueTo?: number;
};

/** Value of a `text` filter: a string match. */
export type TextFilterValue = {
  type: 'text';
  /** How `value` is matched against the field. */
  operator: 'contains' | 'equals' | 'starts-with' | 'ends-with';
  /** Text to match. */
  value: string;
};

/** Value of a `boolean` filter. */
export type BooleanFilterValue = {
  type: 'boolean';
  /** Required value; `null` until the user picks one. */
  value: boolean | null;
};

/** Current value of an active filter, discriminated by `type`. */
export type FilterValue = TagFilterValue | SingleTagFilterValue | DateRangeFilterValue | NumberFilterValue | TextFilterValue | BooleanFilterValue;

/** An active (added) filter instance with its current value. */
export type ActiveFilter = {
  /** Unique instance id for this filter entry. */
  id: string;
  /** References a `FilterDefinition.id`. */
  definitionId: string;
  /** The filter's current value. */
  value: FilterValue;
};

/** Context value exposed by `UITableProvider` for the filter panel. */
export type TTableFilterContext = {
  /** Every filter the user can add. */
  filterDefinitions: FilterDefinition[];
  /** Filters currently applied, in the order they were added. */
  activeFilters: ActiveFilter[];
  /** Adds a new filter instance for the given definition. */
  addFilter: (definitionId: string) => void;
  /** Removes an active filter by its instance id. */
  removeFilter: (filterId: string) => void;
  /** Replaces an active filter's value. */
  updateFilter: (filterId: string, value: FilterValue) => void;
};
