/** biome-ignore-all lint/style/useComponentExportOnlyModules: true */
import { useCallback, useMemo, useState } from 'react';

import { createFormHook, createFormHookContexts, useStore } from '@tanstack/react-form';
import { GripVerticalIcon, PlusIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { type DragCancelEvent, type DragEndEvent, DragOverlay, type DragStartEvent, type UniqueIdentifier, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { nanoid } from 'nanoid';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useUpdateFieldMapper } from '../hooks/use-update-field-mapper';
import type { FIELD_ID, UseFormBuilderFormContext } from '../types';
import { toCamelCase, updateRecursiveField } from '../utils';
import { FormBuilderComboboxField } from './form-builder-field/combobox-field';
import { FormBuilderDateField } from './form-builder-field/date-field';
import { FormBuilderEmptyField } from './form-builder-field/empty-field';
import { FormBuilderNumberField } from './form-builder-field/number-field';
import { FormBuilderRadioGroupField } from './form-builder-field/radio-group-field';
import { FormBuilderSelectField } from './form-builder-field/select-field';
import { FormBuilderSwitchField } from './form-builder-field/switch-field';
import { FormBuilderTextField } from './form-builder-field/text-field';
import { FormBuilderTextAreaField } from './form-builder-field/textarea-field';
import { FormBuilderTitleField } from './form-builder-field/title-field';
import { Field, FieldContent, FieldGroup, FieldLabel, FieldSeparator } from './ui/fields';
import { Input } from './ui/input';

const { fieldContext, formContext, useFieldContext: useFormBuilderFieldContext, useFormContext: useFormBuilderFormContext } = createFormHookContexts();

const FormBuilderSectionFieldSortable: React.FC<
  React.PropsWithChildren<{
    fieldId: string;
  }>
> = ({ fieldId, children }) => {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef, setActivatorNodeRef } = useSortable({
    id: fieldId,
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

const FormBuilderSectionFieldDropable: React.FC<
  React.PropsWithChildren<{
    sectionId: number;
    fieldId: string;
  }>
> = ({ sectionId, fieldId, children }) => {
  const form = useFormBuilderFormContext() as unknown as UseFormBuilderFormContext;
  const currentSection = useStore(form.store, s => s.values.sections[sectionId]);
  const { updateFieldMapper } = useUpdateFieldMapper(fieldId);

  const { setNodeRef, isOver, active } = useDroppable({
    id: fieldId,
    data: {
      variant: ['FORM_FIELD_DROPPABLE'],
      accepts: ['FIELD'],
    },
  });

  const handleDragStart = useCallback(() => {}, []);
  const handleDragOver = useCallback(() => {}, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active } = event;
      if (!isOver) return;
      if (!active.data.current?.variant?.includes('FIELD')) return;
      const [_, fieldType] = active.data.current.variant as ['FIELD', FIELD_ID];
      const newField = updateRecursiveField(fieldId, updateFieldMapper[fieldType], currentSection.fields);
      form.setFieldValue(`sections[${sectionId}].fields`, newField);
    },
    [isOver, sectionId, fieldId, currentSection, updateFieldMapper, form.setFieldValue]
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
    <div ref={setNodeRef} className={cn(isOver && active?.data.current?.variant?.includes('FIELD') && 'outline-1 outline-primary outline-offset-1')}>
      {children}
    </div>
  );
};

const FormBuilderSectionFieldCreateFieldButton: React.FC<{
  sectionIndex: number;
}> = ({ sectionIndex }) => {
  const form = useFormBuilderFormContext() as unknown as UseFormBuilderFormContext;

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        if (!open) {
          setValue('');
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" color="muted" size="sm" className="w-24">
          <PlusIcon />
          Add Field
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Field</DialogTitle>
          <DialogDescription>Select the type of field you would like to add to your form.</DialogDescription>
        </DialogHeader>
        <div>
          <FieldGroup>
            <Field>
              <FieldContent>
                <FieldLabel>Name</FieldLabel>
              </FieldContent>
              <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter field name" />
            </Field>
            <FieldSeparator />
          </FieldGroup>
        </div>
        <DialogFooter>
          <Button
            disabled={!value.trim()}
            onClick={() => {
              form.pushFieldValue(`sections[${sectionIndex}].fields`, {
                type: 'empty',
                id: `field-${nanoid(10)}`,
                name: value,
                camelCaseName: toCamelCase(value),
              });
              setValue('');
              setOpen(false);
            }}
          >
            Create Field
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const FormBuilderSectionFieldContainer: React.FC<
  React.PropsWithChildren<{
    id: number;
  }>
> = ({ id, children }) => {
  const form = useFormBuilderFormContext() as unknown as UseFormBuilderFormContext;
  const sections = useStore(form.store, s => s.values.sections);

  const currentSection = useMemo(() => {
    return sections[id];
  }, [id, sections]);

  const fieldIds = useMemo(() => {
    return currentSection.fields.map(field => field.id);
  }, [currentSection.fields]);

  const handleDragStart = useCallback(() => {}, []);
  const handleDragOver = useCallback(() => {}, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || !over.data.current?.variant?.includes('FORM_FIELD') || !active.data.current?.variant?.includes('FORM_FIELD')) return;
      const activeIndex = currentSection.fields.findIndex(field => field.id === (active.id as string));
      const overIndex = currentSection.fields.findIndex(field => field.id === (over.id as string));
      form.moveFieldValues(`sections[${id}].fields`, activeIndex, overIndex);
    },
    [currentSection.fields, id, form.moveFieldValues]
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
    <div data-slot="section-field-container" className="flex w-full flex-col space-y-4 p-4">
      <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </div>
  );
};

const FormBuilderCreateSectionButton: React.FC = () => {
  const form = useFormBuilderFormContext() as unknown as UseFormBuilderFormContext;
  const sections = useStore(form.store, s => s.values.sections);

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const sectionNames = useMemo(() => {
    return sections.map(section => section.name);
  }, [sections]);

  const handleCreateField = useCallback(() => {
    form.pushFieldValue('sections' as never, { name: value, fields: [] } as never);
    setValue('');
    setOpen(false);
  }, [form.pushFieldValue, value]);

  const handleToggleModal = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      setValue('');
    }
    setOpen(isOpen);
  }, []);

  const handleValueChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
    setValue(e.target.value);
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleToggleModal}>
      <DialogTrigger asChild>
        <Button variant="outline" color="muted" className="size-10 rounded-full">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Sections</DialogTitle>
          <DialogDescription>Enter a name for the new section you would like to add to your form.</DialogDescription>
        </DialogHeader>
        <div>
          <FieldGroup>
            <Field>
              <FieldContent>
                <FieldLabel>Name</FieldLabel>
              </FieldContent>
              <Input value={value} onChange={handleValueChange} placeholder="Enter section name" />
            </Field>
            <FieldSeparator />
          </FieldGroup>
        </div>
        <DialogFooter>
          <Button disabled={!value.trim() || sectionNames.includes(value.trim())} onClick={handleCreateField}>
            Create Field
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const FormBuilderSectionSortable: React.FC<
  React.PropsWithChildren<{
    id: number;
    name: string;
  }>
> = ({ id, name, children }) => {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef, setActivatorNodeRef } = useSortable({
    id,
    data: {
      variant: ['SECTION_FIELD'],
      accepts: ['SECTION_FIELD'],
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
      <div className="flex items-center space-x-2 px-4 py-2">
        <p className="flex-1 font-medium text-base text-primary-strong">{name}</p>
        <button ref={setActivatorNodeRef} {...attributes} {...listeners} className="cursor-grab">
          <GripVerticalIcon size={16} />
        </button>
      </div>
      <Separator />
      {children}
    </div>
  );
};

const FormBuilderSectionContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const form = useFormBuilderFormContext() as unknown as UseFormBuilderFormContext;

  const sections = useStore(form.store, s => s.values.sections);

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
      form.moveFieldValues('sections', active.id as number, over.id as number);
    },
    [form.moveFieldValues]
  );
  const handleDragCancel = useCallback(() => {}, []);

  const sectionIds = useMemo(() => {
    return sections.map((_, index) => index);
  }, [sections]);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
  });

  return (
    <div className="flex w-full flex-col space-y-6">
      <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
        {children}
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

const {
  useAppForm: useFormBuilderForm,
  withForm: withFormBuilderForm,
  withFieldGroup: withFormBuilderFieldGroup,
} = createFormHook({
  fieldContext,
  formContext,

  fieldComponents: {
    FormBuilderTitleField,
    FormBuilderTextField,
    FormBuilderTextAreaField,
    FormBuilderNumberField,
    FormBuilderSelectField,
    FormBuilderComboboxField,
    FormBuilderDateField,
    FormBuilderRadioGroupField,
    FormBuilderSwitchField,
    FormBuilderEmptyField,
  },

  formComponents: {
    FormBuilderSectionSortable,
    FormBuilderSectionContainer,
    FormBuilderCreateSectionButton,
    FormBuilderSectionFieldSortable,
    FormBuilderSectionFieldDropable,
    FormBuilderSectionFieldCreateFieldButton,
    FormBuilderSectionFieldContainer,
  },
});

export { useFormBuilderFieldContext, useFormBuilderFormContext, useFormBuilderForm, withFormBuilderForm, withFormBuilderFieldGroup };
