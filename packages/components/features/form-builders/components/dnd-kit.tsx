import { useCallback } from 'react';

import { GripVerticalIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import {
  closestCenter,
  DndContext,
  type DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  type Modifiers,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  type UniqueIdentifier,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const FormBuilderFieldDroppable: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'droppable-field',
  });
  return (
    <div ref={setNodeRef} className={cn('h-40 rounded border border-border px-2.5 py-2 transition-colors', isOver && 'border-primary')}>
      {children}
    </div>
  );
};

export const FormBuilderDraggable: React.FC<
  React.PropsWithChildren<{
    id: UniqueIdentifier;
  }>
> = ({ id, children }) => {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef, setActivatorNodeRef } = useSortable({
    id: id,
    transition: {
      duration: 150, // milliseconds
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });
  return (
    <div
      ref={setNodeRef}
      style={
        {
          trasnform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.5 : 1,
        } as React.CSSProperties
      }
      className="relative rounded border border-border bg-card px-2.5 py-2"
    >
      <div className="absolute inset-y-0 left-0 w-1 rounded-l bg-primary" />
      {children}
      <button ref={setActivatorNodeRef} {...attributes} {...listeners} className="-translate-y-1/2 absolute top-1/2 right-2 cursor-pointer">
        <GripVerticalIcon size={14} />
      </button>
    </div>
  );
};

export const FormBuilderDndDroppable: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'droppable',
    data: {
      accepts: ['FIELD'],
    },
  });
  return (
    <div ref={setNodeRef} className={cn('h-40 rounded border border-border px-2.5 py-2 transition-colors', isOver && 'border-primary')}>
      {children}
    </div>
  );
};

export const FormBuilderDndContext: React.FC<
  React.PropsWithChildren<{
    modifiers?: Modifiers;
  }>
> = ({ modifiers, children }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const onDragStart = useCallback((event: DragStartEvent) => {}, []);

  const onDragOver = useCallback(() => {}, []);

  const onDragEnd = useCallback(() => {}, []);

  const onDragCancel = useCallback(() => {}, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      modifiers={modifiers}
    >
      {children}
    </DndContext>
  );
};
