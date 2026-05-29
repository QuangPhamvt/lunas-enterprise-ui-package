/**
 * @file filter.tsx
 * Collapsible side-panel with column-visibility toggles and a dynamic filter builder.
 *
 * - "Columns" tab: toggle individual column visibility.
 * - "Filters" tab: "Add Filter" dropdown → active filter chips → per-filter Popover editor.
 */
import { Activity, useState } from 'react';

import { CalendarIcon, Columns4Icon, HashIcon, ListFilterIcon, ListFilterPlus, TagIcon, ToggleLeftIcon, Trash2Icon, TypeIcon, XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ResizablePanel } from '@/components/ui/resizable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { useUITableContext, useUITableFilterContext } from '../../hooks/use-context';
import type {
  ActiveFilter,
  BooleanFilterValue,
  DateRangeFilterValue,
  FilterDefinition,
  FilterType,
  FilterValue,
  NumberFilterValue,
  TagFilterValue,
  TextFilterValue,
} from '../../types';
import { Label } from '@/components/ui/label';

// ── icons per filter type ──────────────────────────────────────────────────────

const TYPE_ICONS: Record<FilterType, React.ReactNode> = {
  tag: <TagIcon size={14} />,
  'date-range': <CalendarIcon size={14} />,
  number: <HashIcon size={14} />,
  text: <TypeIcon size={14} />,
  boolean: <ToggleLeftIcon size={14} />,
};

// ── operator options ───────────────────────────────────────────────────────────

const NUMBER_OPERATORS: { value: NumberFilterValue['operator']; label: string }[] = [
  { value: 'eq', label: 'Equals (=)' },
  { value: 'ne', label: 'not equals (≠)' },
  { value: 'gt', label: 'greater than (>)' },
  { value: 'gte', label: 'At least (≥)' },
  { value: 'lt', label: 'less than (<)' },
  { value: 'lte', label: 'at most (≤)' },
  { value: 'between', label: 'Between' },
];

const TEXT_OPERATORS: { value: TextFilterValue['operator']; label: string }[] = [
  { value: 'contains', label: 'Contains' },
  { value: 'equals', label: 'Equals' },
  { value: 'starts-with', label: 'Starts with' },
  { value: 'ends-with', label: 'Ends with' },
];

// ── summary label ──────────────────────────────────────────────────────────────

function formatFilterValue(value: FilterValue, def: FilterDefinition): string {
  switch (value.type) {
    case 'tag': {
      if (!value.values.length) return 'Unset';
      return value.values.map(v => def.options?.find(o => o.value === v)?.label ?? v).join(', ');
    }
    case 'date-range': {
      if (!value.from && !value.to) return 'Unknow date';
      if (value.from && value.to) return `${value.from} → ${value.to}`;
      if (value.from) return `from ${value.from}`;
      return `until ${value.to}`;
    }
    case 'number': {
      const op = { eq: '=', ne: '≠', gt: '>', gte: '≥', lt: '<', lte: '≤', between: 'between' }[value.operator];
      if (value.value === undefined) return op;
      if (value.operator === 'between') return `${op} ${value.value} – ${value.valueTo ?? '?'}`;
      return `${op} ${value.value}`;
    }
    case 'text': {
      const op = {
        contains: 'contains',
        equals: 'is',
        'starts-with': 'starts with',
        'ends-with': 'ends with',
      }[value.operator];
      return value.value ? `${op} "${value.value}"` : op;
    }
    case 'boolean':
      if (value.value === null) return 'Unknow';
      return value.value ? 'Yes' : 'No';
  }
}

// ── filter editors ─────────────────────────────────────────────────────────────

const TagFilterEditor: React.FC<{
  value: TagFilterValue;
  definition: FilterDefinition;
  onChange: (v: TagFilterValue) => void;
}> = ({ value, definition, onChange }) => (
  <div className="flex flex-col gap-1 p-3">
    {(definition.options ?? []).length === 0 ? (
      <p className="text-xs text-text-positive-muted">No options defined</p>
    ) : (
      definition.options!.map(option => (
        <Label
          key={option.value}
          className={cn(
            'flex items-center gap-2 bg-secondary-bg-subtle hover:bg-secondary-muted px-4 py-2 rounded transition-colors',
            value.values.includes(option.value) && 'bg-primary-muted hover:bg-primary-subtle'
          )}
        >
          <Checkbox
            checked={value.values.includes(option.value)}
            onCheckedChange={checked => {
              const next = checked ? [...value.values, option.value] : value.values.filter(v => v !== option.value);
              onChange({ type: 'tag', values: next });
            }}
          />
          <span className="text-sm">{option.label}</span>
        </Label>
      ))
    )}
  </div>
);

const DateRangeFilterEditor: React.FC<{
  value: DateRangeFilterValue;
  onChange: (v: DateRangeFilterValue) => void;
}> = ({ value, onChange }) => (
  <div className="flex flex-col gap-3 p-3">
    <div className="flex flex-col gap-1">
      <span className="text-xs text-text-positive-muted">From</span>
      <Input type="date" size="md" value={value.from ?? ''} onValueChange={v => onChange({ ...value, from: v || undefined })} />
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-xs text-text-positive-muted">To</span>
      <Input type="date" size="md" value={value.to ?? ''} onValueChange={v => onChange({ ...value, to: v || undefined })} />
    </div>
  </div>
);

const NumberFilterEditor: React.FC<{
  value: NumberFilterValue;
  onChange: (v: NumberFilterValue) => void;
}> = ({ value, onChange }) => (
  <div className="flex flex-col gap-3 p-3">
    <Select value={value.operator} onValueChange={op => onChange({ ...value, operator: op as NumberFilterValue['operator'] })}>
      <SelectTrigger size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {NUMBER_OPERATORS.map(op => (
          <SelectItem key={op.value} value={op.value}>
            {op.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Input
      type="number"
      size="md"
      placeholder="Value"
      value={value.value ?? ''}
      onValueChange={v => onChange({ ...value, value: v ? Number(v) : undefined })}
    />
    {value.operator === 'between' && (
      <Input
        type="number"
        size="md"
        placeholder="To value"
        value={value.valueTo ?? ''}
        onValueChange={v => onChange({ ...value, valueTo: v ? Number(v) : undefined })}
      />
    )}
  </div>
);

const TextFilterEditor: React.FC<{
  value: TextFilterValue;
  onChange: (v: TextFilterValue) => void;
}> = ({ value, onChange }) => (
  <div className="flex flex-col gap-3 p-3">
    <Select value={value.operator} onValueChange={op => onChange({ ...value, operator: op as TextFilterValue['operator'] })}>
      <SelectTrigger size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {TEXT_OPERATORS.map(op => (
          <SelectItem key={op.value} value={op.value}>
            {op.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Input type="text" size="md" placeholder="Enter text..." value={value.value} onValueChange={v => onChange({ ...value, value: v })} />
  </div>
);

const BOOLEAN_OPTIONS = [
  { label: 'Yes', value: true as boolean | null },
  { label: 'No', value: false as boolean | null },
  { label: 'Unknow', value: null as boolean | null },
];

const BooleanFilterEditor: React.FC<{
  value: BooleanFilterValue;
  onChange: (v: BooleanFilterValue) => void;
}> = ({ value, onChange }) => (
  <div className="flex flex-col gap-1 p-3">
    {BOOLEAN_OPTIONS.map(({ label, value: v }) => (
      <Button
        key={label}
        type="button"
        tabIndex={-1}
        variant="outline"
        className={cn(
          'rounded px-3 py-1.5 text-left text-sm transition-colors',
          value.value === v ? 'bg-primary-muted font-medium' : 'hover:bg-muted-bg-subtle'
        )}
        onClick={() => onChange({ type: 'boolean', value: v })}
      >
        {label}
      </Button>
    ))}
  </div>
);

function FilterEditor({ value, definition, onChange }: { value: FilterValue; definition: FilterDefinition; onChange: (v: FilterValue) => void }) {
  switch (value.type) {
    case 'tag':
      return <TagFilterEditor value={value} definition={definition} onChange={onChange} />;
    case 'date-range':
      return <DateRangeFilterEditor value={value} onChange={onChange} />;
    case 'number':
      return <NumberFilterEditor value={value} onChange={onChange} />;
    case 'text':
      return <TextFilterEditor value={value} onChange={onChange} />;
    case 'boolean':
      return <BooleanFilterEditor value={value} onChange={onChange} />;
  }
}

// ── filter item chip ───────────────────────────────────────────────────────────

const FilterItem: React.FC<{
  filter: ActiveFilter;
  definition: FilterDefinition;
  onRemove: () => void;
  onUpdate: (value: FilterValue) => void;
}> = ({ filter, definition, onRemove, onUpdate }) => (
  <div className="flex items-center gap-1">
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          color="muted"
          className="flex-1 bg-white max-w-[calc(100%-32px)] justify-start"
          innerClassName="flex truncate gap-1.5"
        >
          <span className="shrink-0 text-text-positive font-medium">{definition.label}</span>
          <span className="truncate text-xs text-text-positive-weak">{formatFilterValue(filter.value, definition)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start" side="bottom">
        <div className="border-b border-border px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="text-text-positive-muted">{TYPE_ICONS[definition.type]}</span>
            <p className="font-medium">{definition.label}</p>
          </div>
        </div>
        <FilterEditor value={filter.value} definition={definition} onChange={onUpdate} />
      </PopoverContent>
    </Popover>
    <Button type="button" size="icon" variant="soft" color="danger" className="shrink" onClick={onRemove}>
      <Trash2Icon size={13} />
    </Button>
  </div>
);

// ── column visibility row ──────────────────────────────────────────────────────

const ColumnVisibility: React.FC<{
  checked: boolean;
  title: string;
  onCheckedChange?: (checked: boolean) => void;
}> = ({ checked, title, onCheckedChange }) => (
  <div className="flex h-fit items-center gap-2">
    <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
    <p className="text-sm">{title}</p>
  </div>
);

// ── main component ─────────────────────────────────────────────────────────────

/**
 * Collapsible side-panel that lets users toggle column visibility and build
 * row filters without leaving the table view.
 *
 * The panel collapses to a narrow icon strip when no tab is active and expands
 * to at least 64 units when the "Columns" or "Filters" tab is selected.
 *
 * Wire filter capability by passing `filterDefinitions` and `onFilterChange` to
 * the parent `UITableProvider`.
 *
 * @example
 * ```tsx
 * <UITableProvider
 *   filterDefinitions={[
 *     { id: 'status', label: 'Status', type: 'tag', options: [{ label: 'Active', value: 'active' }] },
 *     { id: 'created', label: 'Created At', type: 'date-range' },
 *     { id: 'amount', label: 'Amount', type: 'number' },
 *   ]}
 *   onFilterChange={filters => console.log(filters)}
 * >
 *   <ResizablePanelGroup direction="horizontal">
 *     <ResizablePanel><UITable /></ResizablePanel>
 *     <ResizableHandle />
 *     <UITableFilter />
 *   </ResizablePanelGroup>
 * </UITableProvider>
 * ```
 */
export const UITableFilter = () => {
  const { table } = useUITableContext();
  const { filterDefinitions, activeFilters, addFilter, removeFilter, updateFilter } = useUITableFilterContext();

  const [tab, setTab] = useState<'columns' | 'filters' | null>(null);

  const availableDefinitions = filterDefinitions.filter(def => !activeFilters.some(f => f.definitionId === def.id));

  return (
    <ResizablePanel defaultSize={25} className={cn('bg-card', tab === null ? 'max-w-8!' : 'min-w-64')}>
      <div className="relative z-20 flex size-full bg-muted-bg-subtle">
        <div className="min-w-0 flex-1 overflow-hidden">
          {/* Columns tab */}
          <Activity mode={tab === 'columns' ? 'visible' : 'hidden'}>
            <div className="flex size-full flex-col gap-2 p-4">
              <p className="px-2 font-medium">Columns Visibility</p>
              <Separator />
              <div className="flex flex-col gap-4 pt-4">
                {table.getAllColumns().map(column => {
                  if (['select', 'actions'].includes(column.id)) return null;
                  return (
                    <ColumnVisibility
                      key={column.id}
                      checked={column.getIsVisible()}
                      title={String(column.columnDef.header)}
                      onCheckedChange={value => column.toggleVisibility(!!value)}
                    />
                  );
                })}
              </div>
            </div>
          </Activity>

          {/* Filters tab */}
          <Activity mode={tab === 'filters' ? 'visible' : 'hidden'}>
            <div className="flex size-full flex-col gap-2 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">Filters</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" color="muted" disabled={availableDefinitions.length === 0}>
                      <ListFilterPlus size={13} />
                      Add Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {availableDefinitions.map(def => (
                      <DropdownMenuItem key={def.id} className="flex items-center gap-2" onClick={() => addFilter(def.id)}>
                        {TYPE_ICONS[def.type]}
                        {def.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Separator />
              {activeFilters.length === 0 ? (
                <p className="py-6 text-center text-xs text-text-positive-muted">No active filters</p>
              ) : (
                <div className="flex flex-col gap-2 pt-1">
                  {activeFilters.map(filter => {
                    const def = filterDefinitions.find(d => d.id === filter.definitionId);
                    if (!def) return null;
                    return (
                      <FilterItem
                        key={filter.id}
                        filter={filter}
                        definition={def}
                        onRemove={() => removeFilter(filter.id)}
                        onUpdate={value => updateFilter(filter.id, value)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </Activity>
        </div>

        {/* Vertical tab strip */}
        <div className="flex h-full flex-col border-l border-border bg-muted-bg-subtle text-sm">
          <button
            type="button"
            className={cn('flex h-32 cursor-pointer flex-col items-center gap-y-2 p-2 py-4', tab === 'columns' && 'bg-card')}
            onClick={() => setTab(tab === 'columns' ? null : 'columns')}
          >
            <Columns4Icon size={18} />
            <span className="text-nowrap [writing-mode:vertical-lr]">Columns</span>
          </button>
          <Separator />
          <button
            type="button"
            className={cn('relative flex h-32 cursor-pointer flex-col items-center gap-y-2 p-2 py-4', tab === 'filters' && 'bg-card')}
            onClick={() => setTab(tab === 'filters' ? null : 'filters')}
          >
            <ListFilterIcon size={18} />
            {activeFilters.length > 0 && (
              <span className="absolute top-2 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] leading-none text-primary-foreground">
                {activeFilters.length}
              </span>
            )}
            <span className="text-nowrap [writing-mode:vertical-lr]">Filters</span>
          </button>
          <Separator />
        </div>
      </div>
    </ResizablePanel>
  );
};
