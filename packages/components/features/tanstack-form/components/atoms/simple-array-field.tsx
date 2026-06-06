'use client';

import { useCallback } from 'react';

import { PlusIcon, Trash2Icon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';

import { useTanStackFieldContext } from '../../tanstack-form';

// ─── ArrayCol ──────────────────────────────────────────────────────────────

type ArrayColProps = {
  /**
   * Fixed column width as a pixel number (e.g. `96`) or any CSS string
   * (e.g. `'8rem'`, `'20%'`). Omit to let the column expand and fill the
   * remaining row space (`flex: 1`).
   */
  width?: number | string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Layout helper for columns inside a `SimpleArrayField` row. Controls width
 * without repeating `<div className="w-24">` or `<div className="flex-1">`.
 *
 * @example
 * <SimpleArrayField defaultRow={...}>
 *   {i => (
 *     <>
 *       <ArrayCol>                 // flex-1 — takes remaining space
 *         <AppField name={`items[${i}].name`}>...</AppField>
 *       </ArrayCol>
 *       <ArrayCol width={96}>     // 96 px fixed
 *         <AppField name={`items[${i}].qty`}>...</AppField>
 *       </ArrayCol>
 *       <ArrayCol width="8rem">   // CSS string
 *         <AppField name={`items[${i}].tax`}>...</AppField>
 *       </ArrayCol>
 *     </>
 *   )}
 * </SimpleArrayField>
 */
export function ArrayCol({ width, className, children }: ArrayColProps) {
  const style: React.CSSProperties = width ? { width: typeof width === 'number' ? `${width}px` : width, flexShrink: 0 } : { flex: 1, minWidth: 0 };

  return (
    <div data-slot="array-col" style={style} className={className}>
      {children}
    </div>
  );
}

// ─── SimpleArrayField ──────────────────────────────────────────────────────

type Props<T> = {
  /**
   * Shape of a brand-new empty row appended when the user clicks "Add row".
   */
  defaultRow: T;
  /**
   * Render function called once per row. Receives the zero-based row `index`
   * so you can build field paths like `` `items[${index}].name` ``.
   */
  children: (index: number) => React.ReactNode;
  /** Label on the add button. Defaults to `'Add row'`. */
  addLabel?: string;
  className?: string;
};

/**
 * Array field wrapper that manages rows (add / remove) while letting you
 * freely compose any fields inside each row.
 *
 * @example
 * const { AppForm, AppField } = useTanStackForm({ defaultValues: { items: [] } });
 *
 * <AppForm>
 *   <AppField name="items">
 *     {({ SimpleArrayField }) => (
 *       <SimpleArrayField defaultRow={{ name: null, qty: null }}>
 *         {(i) => (
 *           <div className="flex gap-2">
 *             <AppField name={`items[${i}].name`}>
 *               {({ SimpleTextField }) => <SimpleTextField label="Name" />}
 *             </AppField>
 *             <AppField name={`items[${i}].qty`}>
 *               {({ SimpleNumberField }) => <SimpleNumberField label="Qty" />}
 *             </AppField>
 *           </div>
 *         )}
 *       </SimpleArrayField>
 *     )}
 *   </AppField>
 * </AppForm>
 */
export function SimpleArrayField<T>({ defaultRow, children, addLabel = 'Add row', className }: Props<T>) {
  const field = useTanStackFieldContext<T[]>();
  const rows = field.state.value ?? [];

  const addRow = useCallback(() => {
    field.pushValue({ ...defaultRow } as T);
  }, [field, defaultRow]);

  const removeRow = useCallback(
    (index: number) => {
      field.removeValue(index);
    },
    [field]
  );

  return (
    <div data-slot="simple-array-field" className={cn('flex flex-col gap-2', className)}>
      {rows.map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: index is the stable identity for form rows
        <div key={i} className="flex items-start gap-2">
          {children(i)}
          <button
            type="button"
            title="Remove row"
            className="mt-auto mb-0.5 flex size-7 shrink-0 items-center justify-center rounded text-muted transition-colors hover:text-danger-strong"
            onClick={() => removeRow(i)}
          >
            <Trash2Icon size={14} />
          </button>
        </div>
      ))}

      <div>
        <Button type="button" variant="ghost" color="muted" size="sm" className="gap-1.5" onClick={addRow}>
          <PlusIcon size={13} />
          {addLabel}
        </Button>
      </div>
    </div>
  );
}
