import { useMemo, useState } from 'react';

import { useStore } from '@tanstack/react-form';

import { BoltIcon, CopyIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { UseFormBuilderFormContext } from '../../types';
import { useFormBuilderFormContext } from '../form-buidler-form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useRecursiveFieldName } from '../../hooks/use-recursive-field-name';

export const FormBuilderFieldWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {children}
    </Popover>
  );
};

export const FormBuilderFieldTrigger: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <PopoverTrigger
      asChild
      tabIndex={0}
      onClick={e => {
        e.stopPropagation();
      }}
      className="data-[state=open]:border data-[state=open]:border-border data-[state=open]:shadow"
    >
      <div className="cursor-pointer border border-transparent px-2.5 py-2 transition-colors">{children}</div>
    </PopoverTrigger>
  );
};

export const FormBuilderFieldTooltip: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <PopoverContent align="start" side="top" className="w-fit rounded p-2">
      <ButtonGroup>{children}</ButtonGroup>
    </PopoverContent>
  );
};

export const FormBuilderFieldTooltipCopy: React.FC = () => {
  return (
    <Button size="icon" variant="ghost" color="muted">
      <CopyIcon />
    </Button>
  );
};

export const FormBuilderFieldTooltipSettings: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          color="muted"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <BoltIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="right" className="w-124 rounded px-2.5">
        <Tabs defaultValue="field-type">
          <TabsList className="mt-2 w-full rounded-none bg-transparent px-2.5">
            <TabsTrigger
              value="field-type"
              className="rounded-none border-b border-b-border shadow-none! hover:bg-transparent data-[state=active]:border-b-border-strong"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              Field Type
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="rounded-none border-b border-b-border shadow-none! hover:bg-transparent data-[state=active]:border-b-border-strong"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              Rules
            </TabsTrigger>
          </TabsList>
          {children}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export const FormBuilderFieldTooltipSettingsFieldType: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TabsContent value="field-type" className="px-2.5 pb-2">
      {children}
    </TabsContent>
  );
};

export const FormBuilderFieldTooltipSettingsRules: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TabsContent value="rules" className="px-2.5 pb-2">
      {children}
    </TabsContent>
  );
};

export const FormBuilderFieldTooltipTrash: React.FC<{
  sectionIndex: number;
  fieldId: string;
}> = ({ sectionIndex, fieldId }) => {
  const form = useFormBuilderFormContext() as unknown as UseFormBuilderFormContext;

  const { getFieldName } = useRecursiveFieldName(sectionIndex);

  const name = useMemo(() => {
    const _name = getFieldName(fieldId);
    return `${_name.split('.').slice(0, -1).join('.')}.fields` as `sections[${number}].fields`;
  }, [fieldId, getFieldName]);

  const fieldIndex = useMemo(() => {
    const _name = getFieldName(fieldId);
    const indexString = _name
      .split('.')
      .pop()
      ?.match(/\[(\d+)\]/)?.[1];
    return indexString ? parseInt(indexString, 10) : -1;
  }, [fieldId, getFieldName]);

  console.log('Deleting field with name:', name, 'and index:', fieldIndex);

  if (fieldIndex === -1) return null;

  return (
    <Button
      size="icon"
      variant="ghost"
      color="muted"
      onClick={e => {
        form.removeFieldValue(name, fieldIndex);
        e.stopPropagation();
      }}
    >
      <TrashIcon />
    </Button>
  );
};
