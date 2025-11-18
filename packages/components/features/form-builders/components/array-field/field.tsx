import { useCallback, useMemo, useState } from 'react';

import { GripVerticalIcon, PlusIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { type DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FIELD_ID, FormBuilderField, FormBuilderArrayField as TFormBuilderArrayField } from '../../types';
import { FormBuilderMapper } from '../form-builder-mapper';
import { useFormBuilderValueContext } from '../providers';
import { Field, FieldContent, FieldContentMain, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../ui/fields';
import { Input } from '../ui/input';

const updateFieldMapper = (fieldId: string): Record<FIELD_ID, Partial<FormBuilderField> | null> => {
  return {
    'title-field': null,
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
    'array-field': null,
    empty: null,
  };
};

const CreateFieldModal: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const { onArrayFieldCreate } = useFormBuilderValueContext();

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
        <Button
          variant="outline"
          color="muted"
          className="size-10 rounded-full"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        onClick={e => {
          e.stopPropagation();
        }}
      >
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
              onArrayFieldCreate(fieldId, value);
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

const FormFieldDroppable: React.FC<
  React.PropsWithChildren<{
    fieldId: string;
    itemId: string;
  }>
> = ({ fieldId, itemId, children }) => {
  const { onArrayFieldUpdate } = useFormBuilderValueContext();

  const {
    setNodeRef,
    isOver: _isOver,
    active,
  } = useDroppable({
    id: itemId,
    data: {
      variant: ['FORM_FIELD_DROPPABLE', 'FORM_FIELD_DROPPABLE_ARRAY'],
      accepts: ['FIELD'],
    },
  });

  const isOver = useMemo<boolean>(() => {
    return _isOver && active?.data.current?.variant?.includes('FIELD');
  }, [_isOver, active]);

  const handleDragStart = useCallback(() => {}, []);
  const handleDragOver = useCallback(() => {}, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!_isOver) return;
      if (!over?.data?.current?.variant?.includes('FORM_FIELD_DROPPABLE_ARRAY')) return;
      if (!active?.data.current?.variant?.includes('FIELD')) return;

      const [_, fieldVariant] = active.data.current.variant as ['FIELD', FIELD_ID];
      const prepareField = updateFieldMapper(itemId);
      if (!prepareField[fieldVariant]) return;

      onArrayFieldUpdate(fieldId, itemId, prepareField[fieldVariant]);
    },
    [_isOver, fieldId, itemId, onArrayFieldUpdate]
  );
  const handleCancel = useCallback(() => {}, []);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDragCancel: handleCancel,
  });

  return (
    <div ref={setNodeRef} className={cn(isOver && 'outline-1 outline-primary outline-offset-5')}>
      {children}
    </div>
  );
};

const FormField: React.FC<
  React.PropsWithChildren<{
    id: string;
    name: string;
  }>
> = ({ id, name, children }) => {
  const { attributes, listeners, transform, transition, isDragging, setNodeRef, setActivatorNodeRef } = useSortable({
    id,
    data: {
      variant: ['FORM_ARRAY_FIELD'],
      accepts: ['FORM_ARRAY_FIELD'],
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

export const FormBuilderArrayField: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderArrayField>('array-field', fieldId);

  const fields = useMemo(() => {
    if (!currentField) return [];
    return currentField.fields;
  }, [currentField]);

  if (!currentField) return null;

  return (
    <FieldSet className="rounded-md bg-muted-muted">
      <FieldGroup className="p-3">
        <Field orientation="vertical">
          <FieldContent>
            <FieldLabel className="text-sm leading-4">{currentField.label}</FieldLabel>
          </FieldContent>

          <FieldContentMain className="space-y-3 rounded-md bg-card p-2">
            <div className="flex items-center gap-x-2">
              <div className="w-fit rounded-full bg-muted-muted px-3 py-1 text-xs tabular-nums">1/2</div>
              <p className="font-semibold">No Name</p>
            </div>

            <SortableContext items={fields.map(field => field.id)} strategy={verticalListSortingStrategy}>
              {fields.map(field => {
                return (
                  <FormField key={field.id} id={field.id} name={field.name}>
                    <FormFieldDroppable fieldId={currentField.id} itemId={field.id}>
                      {FormBuilderMapper(field.id)[field.type].FIELD}
                    </FormFieldDroppable>
                  </FormField>
                );
              })}
            </SortableContext>

            <div className="flex w-full items-center justify-center">
              <CreateFieldModal fieldId={currentField.id} />
            </div>
          </FieldContentMain>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
