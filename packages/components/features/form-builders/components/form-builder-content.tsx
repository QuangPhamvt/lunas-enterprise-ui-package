import { useCallback, useMemo, useState } from 'react';

import { GripVerticalIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { type DragEndEvent, DragOverlay, type DragStartEvent, type UniqueIdentifier, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createPortal } from 'react-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FIELD_ID, FormBuilderField } from '../types';
import { FormBuilderCreateFieldModal } from './create-field-modal';
import { FormBuilderMapper } from './form-builder-mapper';
import { FormBuilderTanStackForm } from './forms/form';
import { useFormBuilderValueContext } from './providers';

export const FormBuilderPageField: React.FC<
  React.PropsWithChildren<{
    tooltip: React.ReactNode;
  }>
> = ({ tooltip, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild tabIndex={0}>
        <div className={cn('cursor-pointer border border-transparent px-2.5 py-2 transition-colors', open && 'rounded border-primary')}>{children}</div>
      </PopoverTrigger>
      <PopoverContent align="start" side="top" className="w-fit rounded p-2">
        {tooltip}
      </PopoverContent>
    </Popover>
  );
};

const FormBuilderFormField: React.FC<
  React.PropsWithChildren<{
    id: string;
    name: string;
  }>
> = ({ id, name, children }) => {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef, setActivatorNodeRef } = useSortable({
    id,
    data: {
      variant: ['FORM_FIELD'],
      accepts: ['FORM_FIELD'],
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
      className="flex flex-col rounded border border-border bg-card text-sm"
    >
      <div className="flex items-center space-x-2 px-2.5 py-1">
        <p className="flex-1">{name}</p>
        <button ref={setActivatorNodeRef} {...attributes} {...listeners} className="cursor-grab">
          <GripVerticalIcon size={16} />
        </button>
      </div>
      <Separator />
      <div className="px-2.5 py-4">{children}</div>
    </div>
  );
};

export const FormBuilderFormFieldDroppable: React.FC<
  React.PropsWithChildren<{
    fieldId: string;
  }>
> = ({ fieldId, children }) => {
  const { onFieldUpdate } = useFormBuilderValueContext();

  const {
    setNodeRef,
    isOver: _isOver,
    active,
  } = useDroppable({
    id: fieldId,
    data: {
      variant: ['FORM_FIELD_DROPPABLE'],
      accepts: ['FIELD'],
    },
  });

  const isOver = useMemo<boolean>(() => {
    return _isOver && !!active?.id && active.data.current?.variant?.includes('FIELD');
  }, [_isOver, active]);

  const updateFieldMapper: Record<FIELD_ID, Partial<FormBuilderField>> = useMemo(() => {
    return {
      'title-field': {
        id: fieldId,
        label: 'Title Field',
        description: 'This is a title field',
        type: 'title-field',
      },
      'text-field': {
        id: fieldId,
        type: 'text-field',
        orientation: 'responsive',
        label: 'Text Field',
        placeholder: 'Enter text here',
        description: 'This is a text field',

        showClearButton: false,
        showCharacterCount: false,
        showErrorMessage: true,

        rules: {
          minLength: null,
          maxLength: null,
        },
      },
      'textarea-field': {
        id: fieldId,
        type: 'textarea-field',
        orientation: 'responsive',

        label: 'Text Area Field',
        placeholder: 'Enter text here',
        description: 'This is a text area field',
        rows: 4,

        showCharacterCount: false,
        showErrorMessage: true,

        rules: {
          minLength: null,
          maxLength: null,
        },
      },
      'number-field': {
        id: fieldId,
        type: 'number-field',
        orientation: 'responsive',

        label: 'Number Field',
        description: 'This is a number field',
        placeholder: '0',
        unitText: '',

        showErrorMessage: true,

        rules: {
          greaterThan: null,
          greaterThanOrEqualTo: null,

          lessThan: null,
          lessThanOrEqualTo: null,

          positive: false,
          negative: false,
        },
      },
      'date-field': {
        id: fieldId,
        type: 'date-field',
        orientation: 'responsive',

        label: 'Date Field',
        description: 'This is a date field',
        placeholder: 'Select a date',
      },
      'switch-field': {
        id: fieldId,
        label: 'Switch Field',
        orientation: 'responsive',
        type: 'switch-field',
      },
      'radio-group-field': {
        id: fieldId,
        label: 'Radio Group Field',
        orientation: 'responsive',
        type: 'radio-group-field',
      },
      'select-field': {
        id: fieldId,
        type: 'select-field',
        orientation: 'responsive',

        label: 'Select Field',
        description: 'This is a select field',
        placeholder: 'Select an option',

        options: [],
      },
      'combobox-field': {
        id: fieldId,
        label: 'Combo Box Field',
        orientation: 'responsive',
        type: 'combobox-field',
      },
      empty: {
        id: fieldId,
        label: 'Empty Field',
        type: 'empty',
      },
    };
  }, [fieldId]);

  const handleDragStart = useCallback(() => {}, []);
  const handleDragOver = useCallback(() => {}, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active } = event;
      if (!_isOver) return;
      if (!active?.data.current?.variant.includes('FIELD')) return;
      const [_, fieldVariant] = active.data.current.variant as ['FIELD', FIELD_ID];
      onFieldUpdate(fieldId, updateFieldMapper[fieldVariant]);
    },
    [_isOver, fieldId, updateFieldMapper, onFieldUpdate]
  );
  const handleDragCancel = useCallback(() => {}, []);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
  });

  return (
    <div ref={setNodeRef} className={cn(isOver && 'outline-1 outline-primary outline-offset-1')}>
      {children}
    </div>
  );
};

const FormBuilderFormContent: React.FC<React.PropsWithChildren> = () => {
  const { formBuilder, onFieldReorder } = useFormBuilderValueContext();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (!event.active.data.current?.variant?.includes('FORM_FIELD')) return;
    setActiveId(event.active.id);
  }, []);
  const handleDragOver = useCallback(() => {}, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;
      if (!over || !over.data.current?.variant?.includes('FORM_FIELD') || !active.data.current?.variant?.includes('FORM_FIELD')) return;
      onFieldReorder(active.id as string, over.id as string);
    },
    [onFieldReorder]
  );
  const handleDragCancel = useCallback((event: DragEndEvent) => {
    void event;
  }, []);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
  });

  return (
    <div className="flex w-full flex-col space-y-4">
      <SortableContext items={formBuilder.form.map(field => field.id) ?? []} strategy={verticalListSortingStrategy}>
        {formBuilder.form.map(field => {
          return (
            <FormBuilderFormField key={field.id} id={field.id} name={field.name}>
              <FormBuilderFormFieldDroppable fieldId={field.id}>
                <FormBuilderPageField tooltip={FormBuilderMapper(field.id)[field.type].TOOLTIP}>
                  {FormBuilderMapper(field.id)[field.type].FIELD}
                </FormBuilderPageField>
              </FormBuilderFormFieldDroppable>
            </FormBuilderFormField>
          );
        })}
      </SortableContext>

      {activeId &&
        createPortal(
          <DragOverlay className="cursor-grabbing">
            {activeId ? (
              <div className="pointer-events-none flex items-center rounded border border-border bg-card px-2.5 py-2 shadow-lg">
                <div className="flex h-24 w-full items-center justify-center rounded-md border border-border border-dashed" />
              </div>
            ) : null}
          </DragOverlay>,
          document.body
        )}

      <div className="flex w-full items-center justify-center">
        <FormBuilderCreateFieldModal />
      </div>
    </div>
  );
};

const FormBuilderFormPreview: React.FC<React.PropsWithChildren> = () => {
  const { formBuilder } = useFormBuilderValueContext();

  return (
    <div className="flex flex-col rounded border border-border bg-card text-sm">
      <div className="flex items-center space-x-2 px-2.5 py-1">
        <p>Formn Preview</p>
      </div>
      <Separator />
      <div className="px-2.5 py-4">
        <FormBuilderTanStackForm formBuilder={formBuilder} />
      </div>
    </div>
  );
};

export const FormBuilderPage: React.FC<React.PropsWithChildren> = () => {
  return (
    <div data-slot="form-builder-page">
      <Tabs defaultValue="form-builder">
        <TabsList className="rounded-none bg-transparent px-0">
          <TabsTrigger
            value="form-builder"
            className="rounded-none border-b border-b-border text-text-positive-weak shadow-none! hover:bg-transparent data-[state=active]:border-b-border-strong data-[state=active]:bg-transparent data-[state=active]:text-text-positive"
          >
            Form Builder
          </TabsTrigger>
          <TabsTrigger
            value="form-preview"
            className="rounded-none border-b border-b-border text-text-positive-weak shadow-none! hover:bg-transparent data-[state=active]:border-b-border-strong data-[state=active]:bg-transparent data-[state=active]:text-text-positive"
          >
            Form Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="form-builder" className="mt-4">
          <FormBuilderFormContent />
        </TabsContent>
        <TabsContent value="form-preview" className="mt-4">
          <FormBuilderFormPreview />
        </TabsContent>
      </Tabs>
    </div>
  );
};
