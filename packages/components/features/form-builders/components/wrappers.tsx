import { useCallback, useMemo, useState } from 'react';

import { GripVerticalIcon } from 'lucide-react';

import {
  type DragCancelEvent,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  type UniqueIdentifier,
  useDndMonitor,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createPortal } from 'react-dom';
import type { FIELD_ID } from '../types';
import { FormBuilderPage } from './pages';
import { useFormBuilderFieldContext } from './providers';

const FormBuilderFieldDraggable: React.FC<
  React.PropsWithChildren<{
    id: string;
  }>
> = ({ id, children }) => {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef, setActivatorNodeRef } = useSortable({
    id,
    data: {
      variant: ['FIELD', id],
      accepts: ['FIELD'],
    },
  });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="relative rounded border border-border bg-card px-2.5 py-2"
    >
      <div className="absolute inset-y-0 left-0 w-1 rounded-l bg-primary" />
      {children}
      <button ref={setActivatorNodeRef} {...attributes} {...listeners} className="-translate-y-1/2 absolute top-1/2 right-2 cursor-grab">
        <GripVerticalIcon size={14} />
      </button>
    </div>
  );
};

export const FormBuilderSidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { fields, setFields } = useFormBuilderFieldContext();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sortableItems = useMemo(() => {
    return fields.map(field => field.id);
  }, [fields]);

  const Field = useMemo<Record<FIELD_ID, React.ReactNode>>(() => {
    return {
      'text-field': <div className="px-2.5 py-2">Text Field</div>,
      'textarea-field': <div className="px-2.5 py-2">Textarea Field</div>,
      'number-field': <div className="px-2.5 py-2">Number Field</div>,
      'date-field': <div className="px-2.5 py-2">Date Field</div>,
      'switch-field': <div className="px-2.5 py-2">Switch Field</div>,
      'radio-group-field': <div className="px-2.5 py-2">Radio Group Field</div>,
      'select-field': <div className="px-2.5 py-2">Select Field</div>,
      'combobox-field': <div className="px-2.5 py-2">Combobox Field</div>,
      empty: null,
    };
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    if (!active.data.current?.variant?.includes('FIELD')) return;
    setActiveId(active.id);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event;
    if (!over) return;
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;

      if (!over || over.data.current?.variant.includes('FORM_FIELD')) return;
      if (active.id === over.id) return;

      setFields(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    },
    [setFields]
  );

  const handleDragCancel = useCallback((event: DragCancelEvent) => {
    void event;
    setActiveId(null);
  }, []);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
  });

  return (
    <div data-slot="form-builder-sidebar" className="min-w-64 border-border border-r p-4">
      <div className="flex flex-col gap-y-1">
        <SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
          {fields.map(field => (
            <FormBuilderFieldDraggable key={field.id} id={field.id}>
              {Field[field.id]}
            </FormBuilderFieldDraggable>
          ))}
        </SortableContext>
      </div>

      {activeId &&
        createPortal(
          <DragOverlay className="cursor-grabbing">
            {activeId ? (
              <div className="pointer-events-none flex h-13 items-center rounded border border-border bg-card px-2.5 py-2 shadow-lg">
                {Field[activeId as FIELD_ID]}
              </div>
            ) : null}
          </DragOverlay>,
          document.body
        )}
    </div>
  );
};

export const FormBuilderContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div data-slot="form-builder-content" className="flex-1 p-4">
      <FormBuilderPage />
    </div>
  );
};
