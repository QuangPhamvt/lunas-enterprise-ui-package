import { useCallback, useMemo, useState } from 'react';

import { BoltIcon, BoxIcon, CopyIcon, GripVerticalIcon, PlusIcon, TrashIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { type DragEndEvent, DragOverlay, type DragStartEvent, type UniqueIdentifier, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFormBuilderValueContext } from './providers';
import type { FIELD_ID, FormBuilderField } from '../types';
import { ButtonGroup } from '@/components/ui/button-group';

const FormBuilderTextField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { onFieldDelete } = useFormBuilderValueContext();

  const [open, setOpen] = useState<boolean>(false);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);
  return (
    <Popover
      open={open}
      onOpenChange={_open => {
        if (settingOpen) return;
        setOpen(_open);
      }}
    >
      <PopoverTrigger asChild tabIndex={0}>
        <div className={cn('px-2.5 py-2 border border-transparent transition-colors cursor-pointer', open ? 'border-primary rounded' : '')}>Text Field</div>
      </PopoverTrigger>
      <PopoverContent align="start" side="top" className="p-2 rounded">
        <ButtonGroup>
          <Button size="icon" variant="ghost" color="muted">
            <CopyIcon />
          </Button>
          <Popover open={settingOpen} onOpenChange={setSettingOpen}>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" color="muted">
                <BoltIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="right" className="rounded p-0 w-80">
              <Tabs defaultValue="field-type">
                <TabsList className="w-full bg-transparent rounded-none mt-2 px-2.5">
                  <TabsTrigger
                    value="field-type"
                    className="border-b border-b-border rounded-none shadow-none! data-[state=active]:border-2 data-[state=active]:border-b-border-strong hover:bg-transparent"
                  >
                    Field Type
                  </TabsTrigger>
                  <TabsTrigger
                    value="rules"
                    className="border-b border-b-border rounded-none shadow-none! data-[state=active]:border-2 data-[state=active]:border-b-border-strong hover:bg-transparent"
                  >
                    Rules
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="field-type" className="px-2.5 pb-2">
                  FIeld Type
                </TabsContent>
                <TabsContent value="rules" className="px-2.5 pb-2">
                  Rules
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>
          <Button size="icon" variant="ghost" color="muted" onClick={() => onFieldDelete(fieldId)}>
            <TrashIcon />
          </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  );
};

const FormBuiderTextAreaField: React.FC = () => {
  return <div>Text Area Field</div>;
};

const FormBuilderNumberField: React.FC = () => {
  return <div>Number Field</div>;
};

const FormBuilderSelectField: React.FC = () => {
  return <div>Select Field</div>;
};

const FormBuilderComboBoxField: React.FC = () => {
  return <div>Combo Box Field</div>;
};

const FormBuilderDateField: React.FC = () => {
  return <div>Date Field</div>;
};

const FormBuilderSwitchField: React.FC = () => {
  return <div>Switch Field</div>;
};

const FormBuilderRadioGroupField: React.FC = () => {
  return <div>Radio Group Field</div>;
};

const FormBuilderFormField: React.FC<
  React.PropsWithChildren<{
    id: string;
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
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="flex flex-col rounded border border-border text-sm"
    >
      <div className="flex items-center space-x-2 px-2.5 py-1">
        <p className="flex-1">Form Fields</p>
        <button ref={setActivatorNodeRef} {...attributes} {...listeners} className="cursor-grab">
          <GripVerticalIcon size={16} />
        </button>
      </div>
      <Separator />
      <div className="px-2.5 py-4">{children}</div>
    </div>
  );
};

const FormBuilderFormFieldDroppable: React.FC<
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

  const handleDragStart = useCallback(() => {}, []);
  const handleDragOver = useCallback(() => {}, []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active } = event;
      if (!_isOver) return;
      if (!active?.data.current?.variant.includes('FIELD')) return;
      const [_, fieldVariant] = active.data.current.variant as ['FIELD', FIELD_ID];
      const newData: Record<FIELD_ID, FormBuilderField> = {
        'text-field': {
          id: fieldId,
          label: 'Text Field',
          type: 'text-field',
        },
        'textarea-field': {
          id: fieldId,
          label: 'Text Area Field',
          type: 'textarea-field',
          rows: 4,
        },
        'number-field': {
          id: fieldId,
          label: 'Number Field',
          type: 'number-field',
        },
        'date-field': {
          id: fieldId,
          label: 'Date Field',
          type: 'date-field',
        },
        'switch-field': {
          id: fieldId,
          label: 'Switch Field',
          type: 'switch-field',
        },
        'radio-group-field': {
          id: fieldId,
          label: 'Radio Group Field',
          type: 'radio-group-field',
        },
        'select-field': {
          id: fieldId,
          label: 'Select Field',
          type: 'select-field',
        },
        'combobox-field': {
          id: fieldId,
          label: 'Combo Box Field',
          type: 'combobox-field',
        },
        empty: {
          id: fieldId,
          label: 'Empty Field',
          type: 'empty',
        },
      };
      onFieldUpdate(fieldId, newData[fieldVariant]);
    },
    [_isOver, fieldId, onFieldUpdate]
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
  const { formBuilder, onFieldCreate, onFieldReorder } = useFormBuilderValueContext();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const FieldMapper = useCallback<(fieldId: string) => Record<FIELD_ID, React.ReactNode>>(fieldId => {
    return {
      'text-field': <FormBuilderTextField fieldId={fieldId} />,
      'textarea-field': <FormBuiderTextAreaField />,
      'number-field': <FormBuilderNumberField />,
      'select-field': <FormBuilderSelectField />,
      'combobox-field': <FormBuilderComboBoxField />,
      'date-field': <FormBuilderDateField />,
      'switch-field': <FormBuilderSwitchField />,
      'radio-group-field': <FormBuilderRadioGroupField />,
      empty: (
        <div className="flex h-24 w-full items-center justify-center rounded-md border border-border border-dashed">
          <BoxIcon strokeWidth={1} size={48} />
        </div>
      ),
    };
  }, []);

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
            <FormBuilderFormField key={field.id} id={field.id}>
              <FormBuilderFormFieldDroppable fieldId={field.id}>{FieldMapper(field.id)[field.type]}</FormBuilderFormFieldDroppable>
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
        <Button variant="outline" color="muted" className="size-10 rounded-full" onClick={() => onFieldCreate()}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export const FormBuilderPage: React.FC<React.PropsWithChildren> = () => {
  return (
    <div className="flex flex-col">
      <FormBuilderFormContent />
    </div>
  );
};
