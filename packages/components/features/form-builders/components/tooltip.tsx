import { useCallback, useState } from 'react';

import { BoltIcon, CopyIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFormBuilderValueContext } from './providers';

export const FormBuilderTooltipFieldCopy: React.FC = () => {
  return (
    <Button size="icon" variant="ghost" color="muted">
      <CopyIcon />
    </Button>
  );
};

export const FormBuilderTooltipFieldSettings: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [settingOpen, setSettingOpen] = useState<boolean>(false);
  return (
    <Popover open={settingOpen} onOpenChange={setSettingOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" color="muted">
          <BoltIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" side="right" className="w-124 rounded px-2.5">
        <Tabs defaultValue="field-type">
          <TabsList className="mt-2 w-full rounded-none bg-transparent px-2.5">
            <TabsTrigger
              value="field-type"
              className="rounded-none border-b border-b-border shadow-none! hover:bg-transparent data-[state=active]:border-2 data-[state=active]:border-b-border-strong"
            >
              Field Type
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="rounded-none border-b border-b-border shadow-none! hover:bg-transparent data-[state=active]:border-2 data-[state=active]:border-b-border-strong"
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

export const FormBuilderTooltipFieldSettingsFieldType: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TabsContent value="field-type" className="px-2.5 pb-2">
      {children}
    </TabsContent>
  );
};

export const FormBuilderTooltipFieldSettingsRules: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <TabsContent value="rules" className="px-2.5 pb-2">
      {children}
    </TabsContent>
  );
};

export const FormBuilderTooltipFieldTrash: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { onFieldDelete } = useFormBuilderValueContext();

  const handleFieldDelete = useCallback(() => {
    onFieldDelete(fieldId);
  }, [fieldId, onFieldDelete]);
  return (
    <Button size="icon" variant="ghost" color="muted" onClick={handleFieldDelete}>
      <TrashIcon />
    </Button>
  );
};

export const FormBuilderTooltipField: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ButtonGroup>{children}</ButtonGroup>;
};
