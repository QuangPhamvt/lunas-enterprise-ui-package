import { useCallback, useMemo, useState } from 'react';

import { GripVerticalIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { type DragCancelEvent, type DragEndEvent, DragOverlay, type DragStartEvent, type UniqueIdentifier, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createPortal } from 'react-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetCurrentSection } from '../hooks/use-get-current-sectiont';
import type { FIELD_ID, FormBuilderField } from '../types';
import { FormBuilderCreateFieldModal } from './create-field-modal';
import { FormBuilderCreateSectionModal } from './create-section-modal';
import { FormBuilderMapper } from './form-builder-mapper';
import { FormBuilderTanStackForm } from './forms/form';
import { useFormBuilderValueContext } from './providers';

const SectionField: React.FC<
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

const SectionFieldDroppable: React.FC<
  React.PropsWithChildren<{
    sectionId: number;
    fieldId: string;
  }>
> = ({ sectionId, fieldId, children }) => {
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
        type: 'switch-field',
        orientation: 'responsive',

        label: 'Switch Field',
        description: 'This is a switch field',

        options: [],
      },
      'radio-group-field': {
        id: fieldId,
        type: 'radio-group-field',
        orientation: 'responsive',

        label: 'Radio Group Field',
        description: 'This is a radio group field',

        options: [],
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
        type: 'combobox-field',
        orientation: 'responsive',

        label: 'Combo Box Field',
        description: 'This is a combo box field',
        placeholder: 'Select or type an option',

        options: [],
      },
      'array-field': {
        id: fieldId,
        type: 'array-field',

        label: 'Array Field',

        fields: [],
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
      onFieldUpdate(sectionId, fieldId, updateFieldMapper[fieldVariant]);
    },
    [_isOver, sectionId, fieldId, updateFieldMapper, onFieldUpdate]
  );
  const handleDragCancel = useCallback((event: DragCancelEvent) => {
    void event;
  }, []);

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

const SectionFieldSortable: React.FC<
  React.PropsWithChildren<{
    id: string;
    name: string;
  }>
> = ({ id, children }) => {
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
      data-slot="section-field-sortable"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="group relative flex flex-col text-sm hover:rounded hover:outline-1 hover:outline-primary hover:outline-offset-4"
    >
      <button ref={setActivatorNodeRef} {...attributes} {...listeners} className="invisible absolute top-2 right-2 z-10 cursor-grab group-hover:visible">
        <GripVerticalIcon size={16} />
      </button>
      {children}
    </div>
  );
};

const SectionFieldContainer: React.FC<
  React.PropsWithChildren<{
    id: number;
  }>
> = ({ id }) => {
  const { onFieldReorder } = useFormBuilderValueContext();
  const { currentSection } = useGetCurrentSection(id);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const fieldIds = useMemo<string[]>(() => {
    return currentSection?.fields.map(field => field.id) || [];
  }, [currentSection.fields]);

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
      onFieldReorder(id, active.id as string, over.id as string);
    },
    [onFieldReorder, id]
  );
  const handleDragCancel = useCallback(() => {}, []);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
  });

  if (!currentSection) return null;

  return (
    <div data-slot="section-field-container" className="flex w-full flex-col space-y-4 p-4">
      <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
        {currentSection.fields.map(field => {
          return (
            <SectionFieldSortable key={field.id} id={field.id} name={field.label}>
              <SectionFieldDroppable sectionId={id} fieldId={field.id}>
                <SectionField tooltip={FormBuilderMapper(id, field.id)[field.type].TOOLTIP}>{FormBuilderMapper(id, field.id)[field.type].FIELD}</SectionField>
              </SectionFieldDroppable>
            </SectionFieldSortable>
          );
        })}
      </SortableContext>
      {!!activeId &&
        createPortal(
          <DragOverlay className="cursor-grabbing">
            {activeId ? (
              <div className="pointer-events-none flex items-center rounded border border-border bg-card px-2.5 py-2 shadow-lg">
                <div className="flex h-12 w-full items-center justify-center rounded-md border border-border border-dashed" />
              </div>
            ) : null}
          </DragOverlay>,
          document.body
        )}
      <FormBuilderCreateFieldModal sectionIndex={id} />
    </div>
  );
};

const FormSectionSortable: React.FC<
  React.PropsWithChildren<{
    id: number;
  }>
> = ({ id, children }) => {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef, setActivatorNodeRef } = useSortable({
    id,
    data: {
      variant: ['SECTION_FIELD'],
      accepts: ['SECTION_FIELD'],
    },
  });

  const { currentSection } = useGetCurrentSection(id);

  if (!currentSection) return null;

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
      <div className="flex items-center space-x-2 px-4 py-2">
        <p className="flex-1 font-medium text-base text-primary-strong">{currentSection.name}</p>
        <button ref={setActivatorNodeRef} {...attributes} {...listeners} className="cursor-grab">
          <GripVerticalIcon size={16} />
        </button>
      </div>
      <Separator />
      {children}
    </div>
  );
};

const FormSectionContainer: React.FC = () => {
  const { formBuilder, onSectionReorder } = useFormBuilderValueContext();

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (!event.active.data.current?.variant?.includes('SECTION_FIELD')) return;
    setActiveId(event.active.id);
  }, []);
  const handleDragOver = useCallback(() => {}, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;
      if (!over || !over.data.current?.variant?.includes('SECTION_FIELD') || !active.data.current?.variant?.includes('SECTION_FIELD')) return;
      onSectionReorder(active.id as number, over.id as number);
    },
    [onSectionReorder]
  );
  const handleDragCancel = useCallback(() => {}, []);

  const sectionIds = useMemo(() => {
    return formBuilder.sections.map((_, index) => index);
  }, [formBuilder]);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
  });

  return (
    <div className="flex w-full flex-col space-y-6">
      <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
        {formBuilder.sections.map((section, index) => {
          return (
            <FormSectionSortable key={section.name} id={index}>
              <SectionFieldContainer id={index} />
            </FormSectionSortable>
          );
        })}
      </SortableContext>
      {!!activeId &&
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
    </div>
  );
};

const FormContent: React.FC<React.PropsWithChildren> = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <FormSectionContainer />
      <div className="flex w-full items-center justify-center">
        <FormBuilderCreateSectionModal />
      </div>
    </div>
  );
};

const FormPreview: React.FC<React.PropsWithChildren> = () => {
  const { formBuilder } = useFormBuilderValueContext();

  return (
    <div className="flex flex-col rounded border border-border bg-card text-sm">
      <div className="flex items-center space-x-2 px-2.5 py-1">
        <p>Formn Preview</p>
      </div>
      <Separator />
      <div className="bg-muted-muted px-2.5 py-4">
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
          <FormContent />
        </TabsContent>
        <TabsContent value="form-preview" className="mt-4">
          <FormPreview />
        </TabsContent>
      </Tabs>
    </div>
  );
};
