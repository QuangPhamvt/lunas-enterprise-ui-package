/** biome-ignore-all lint/style/useComponentExportOnlyModules: true */

import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

import { type DragCancelEvent, DragOverlay, type DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { GripVerticalIcon } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@customafk/react-toolkit/utils';

import { FormBuilderDndContext } from './components/dnd-kit';
import { useFormBuilderForm } from './components/form-buidler-form';
import { FormBuilderArrayField } from './components/form-builder-field/array-field';
import { FORM_BUILDER_FIELD, FORM_BUILDER_FIELD_MAPPER } from './constants';
import { formOpts } from './form-builder-options';
import { Provider } from './form-builder-provider';
import type { DRAGGABLE_FIELD_ID } from './types';

const SidebarHeader: React.FC = () => {
  return (
    <AccordionItem value="header">
      <AccordionTrigger className="px-2.5">Header</AccordionTrigger>
      <AccordionContent className="px-2.5">Header content</AccordionContent>
    </AccordionItem>
  );
};

const SidebarFieldDraggable: React.FC<
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

const SidebarFieldTypography: React.FC = () => {
  return (
    <TabsContent value="typography">
      <div className="flex flex-col space-y-1">
        {FORM_BUILDER_FIELD.filter(field => field.tab === 'TYPOGRAPHY').map(field => (
          <SidebarFieldDraggable key={field.id} id={field.id}>
            {FORM_BUILDER_FIELD_MAPPER[field.id]}
          </SidebarFieldDraggable>
        ))}
      </div>
    </TabsContent>
  );
};

const SidebarFieldInputField: React.FC = () => {
  return (
    <TabsContent value="input-field">
      <div className="flex flex-col space-y-1">
        {FORM_BUILDER_FIELD.filter(field => field.tab === 'FORM_FIELDS').map(field => (
          <SidebarFieldDraggable key={field.id} id={field.id}>
            {FORM_BUILDER_FIELD_MAPPER[field.id]}
          </SidebarFieldDraggable>
        ))}
      </div>
    </TabsContent>
  );
};

const SidebarField: React.FC = () => {
  const [activeType, setActiveType] = useState<DRAGGABLE_FIELD_ID | null>(null);
  const [activeFieldSectionTab, setActiveFieldSectionTab] = useState<'typography' | 'input-field'>('input-field');

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.variant?.includes('FIELD')) {
      setActiveType('FIELD');
    }
    if (active.data.current?.variant?.includes('SECTION_FIELD')) {
      setActiveType('SECTION_FIELD');
    }
    if (active.data.current?.variant?.includes('FORM_FIELD')) {
      setActiveType('FORM_FIELD');
    }
    if (active.data.current?.variant?.includes('FORM_ARRAY_FIELD')) {
      setActiveType('FORM_ARRAY_FIELD');
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    setActiveType(null);
  }, []);

  const handleDragCancel = useCallback((event: DragCancelEvent) => {
    void event;
    setActiveType(null);
  }, []);

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
  });

  return (
    <AccordionItem value="field">
      <AccordionTrigger className="px-2.5">Field</AccordionTrigger>
      <AccordionContent className="px-2.5">
        <Tabs
          defaultValue="input-field"
          value={activeFieldSectionTab}
          onValueChange={value => setActiveFieldSectionTab(value as 'typography' | 'input-field')}
          className="w-full"
        >
          <TabsList className="w-full rounded-none bg-transparent px-0">
            <TabsTrigger
              value="typography"
              className="rounded-none border-b border-b-border text-text-positive-weak shadow-none! hover:bg-transparent data-[state=active]:border-b-border-strong data-[state=active]:text-text-positive"
            >
              Typography
            </TabsTrigger>

            <TabsTrigger
              value="input-field"
              className="rounded-none border-b border-b-border text-text-positive-weak shadow-none! hover:bg-transparent data-[state=active]:border-b-border-strong data-[state=active]:text-text-positive"
            >
              Input Field
            </TabsTrigger>
          </TabsList>
          <SidebarFieldTypography />
          <SidebarFieldInputField />
          {activeType &&
            createPortal(
              <DragOverlay className={cn('cursor-grabbing', activeType === 'SECTION_FIELD' && 'flex justify-end')}>
                {activeType === 'FIELD' && (
                  <div className="pointer-events-none relative flex h-13 items-center rounded border border-border bg-card px-2.5 py-2 shadow-lg">
                    <div className="absolute inset-y-0 left-0 w-1 rounded-l bg-primary" />
                  </div>
                )}
                {activeType === 'SECTION_FIELD' && (
                  <div className="pointer-events-none relative flex h-24 w-full max-w-64 items-center rounded border border-border bg-card px-2.5 py-2 shadow-lg" />
                )}
                {activeType === 'FORM_FIELD' && (
                  <div className="pointer-events-none relative flex h-24 w-full items-center justify-center rounded border border-border bg-card px-2.5 py-2 shadow-lg">
                    <p className="text-text-positive-weak">Form Field</p>
                  </div>
                )}
                {activeType === 'FORM_ARRAY_FIELD' && (
                  <div className="pointer-events-none relative flex h-24 w-full items-center justify-center rounded border border-border bg-card px-2.5 py-2 shadow-lg">
                    <p className="text-text-positive-weak">Form Array Field</p>
                  </div>
                )}
              </DragOverlay>,
              document.body
            )}
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
};

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div data-slot="form-builder-sidebar" className="w-84 border-border border-r">
      <Accordion type="multiple" defaultValue={['header', 'field']} className="w-full last:border-b last:border-b-border">
        {children}
      </Accordion>
    </div>
  );
};

const MainFormBuilder: React.FC = () => {
  const form = useFormBuilderForm({
    ...formOpts,
    onSubmit: async () => {},
    onSubmitInvalid: async () => {},
  });
  const {
    AppForm,
    AppField,
    FormBuilderSectionContainer,
    FormBuilderSectionSortable,
    FormBuilderCreateSectionButton,
    FormBuilderSectionFieldContainer,
    FormBuilderSectionFieldDropable,
    FormBuilderSectionFieldCreateFieldButton,
    FormBuilderSectionFieldSortable,
  } = form;

  return (
    <TabsContent value="form-builder" className="mt-4">
      <AppForm>
        <div className="flex w-full flex-col space-y-4">
          <FormBuilderSectionContainer>
            <form.Subscribe
              selector={state => state.values.sections}
              children={sections => {
                return sections.map((section, index) => {
                  return (
                    <FormBuilderSectionSortable key={index.toString()} id={index} name={section.name}>
                      <FormBuilderSectionFieldContainer id={index}>
                        {section.fields.map((field, fieldIndex) => {
                          return (
                            <FormBuilderSectionFieldSortable key={field.id} fieldId={field.id}>
                              <FormBuilderSectionFieldDropable sectionId={index} fieldId={field.id}>
                                {/*@ts-expect-error*/}
                                <AppField
                                  name={`sections[${index}].fields[${fieldIndex}]`}
                                  children={({
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
                                  }) => {
                                    if (field.type === 'title-field') {
                                      return <FormBuilderTitleField sectionIndex={index} fieldId={field.id} />;
                                    }
                                    if (field.type === 'text-field') {
                                      return <FormBuilderTextField sectionIndex={index} fieldId={field.id} />;
                                    }
                                    if (field.type === 'textarea-field') {
                                      return <FormBuilderTextAreaField sectionIndex={index} fieldId={field.id} />;
                                    }
                                    if (field.type === 'number-field') {
                                      return <FormBuilderNumberField sectionIndex={index} fieldId={field.id} />;
                                    }
                                    if (field.type === 'select-field') {
                                      return <FormBuilderSelectField sectionIndex={index} fieldId={field.id} />;
                                    }
                                    if (field.type === 'combobox-field') {
                                      return <FormBuilderComboboxField sectionIndex={index} fieldId={field.id} />;
                                    }
                                    if (field.type === 'radio-group-field') {
                                      return <FormBuilderRadioGroupField sectionIndex={index} fieldId={field.id} />;
                                    }
                                    if (field.type === 'switch-field') {
                                      return <FormBuilderSwitchField sectionIndex={index} fieldId={field.id} />;
                                    }
                                    if (field.type === 'date-field') {
                                      return <FormBuilderDateField sectionIndex={index} fieldId={field.id} />;
                                    }
                                    if (field.type === 'array-field') {
                                      return <FormBuilderArrayField form={form} sectionIndex={index} fieldId={field.id} />;
                                    }
                                    return <FormBuilderEmptyField />;
                                  }}
                                />
                              </FormBuilderSectionFieldDropable>
                            </FormBuilderSectionFieldSortable>
                          );
                        })}
                        <FormBuilderSectionFieldCreateFieldButton sectionIndex={index} />
                      </FormBuilderSectionFieldContainer>
                    </FormBuilderSectionSortable>
                  );
                });
              }}
            />
          </FormBuilderSectionContainer>
          <div className="flex w-full items-center justify-center">
            <FormBuilderCreateSectionButton />
          </div>
        </div>
      </AppForm>
    </TabsContent>
  );
};

const MainFormPreview: React.FC = () => {
  return (
    <TabsContent value="form-preview" className="mt-4">
      Form Preview Content
    </TabsContent>
  );
};

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div data-slot="form-builder-main" className="relative flex-1 bg-accent-bg-subtle p-4">
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
        {children}
      </Tabs>
    </div>
  );
};

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <FormBuilderDndContext>
      <div data-slot="form-builder" className="relative flex size-full flex-row rounded border border-border text-sm text-text-positive">
        {children}
      </div>
    </FormBuilderDndContext>
  );
};

export const FormBuilder = {
  Provider,
  Container,
  SidebarHeader,
  SidebarField,
  Sidebar,
  Main,
  MainFormBuilder,
  MainFormPreview,
};
