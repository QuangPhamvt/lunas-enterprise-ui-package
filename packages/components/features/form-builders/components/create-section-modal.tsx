import { useCallback, useMemo, useState } from 'react';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Field, FieldContent, FieldGroup, FieldLabel, FieldSeparator } from '../components/ui/fields';
import { useFormBuilderValueContext } from './providers';
import { Input } from './ui/input';

export const FormBuilderCreateSectionModal: React.FC = () => {
  const { formBuilder, onSectionCreate } = useFormBuilderValueContext();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const sectionNames = useMemo(() => {
    return formBuilder.sections.map(section => section.name);
  }, [formBuilder.sections]);

  const handleCreateField = useCallback(() => {
    onSectionCreate(value);
    setValue('');
    setOpen(false);
  }, [onSectionCreate, value]);

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
