import { useState } from 'react';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Field, FieldContent, FieldGroup, FieldLabel, FieldSeparator } from './forms';
import { useFormBuilderValueContext } from './providers';

export const FormBuilderCreateFieldModal: React.FC = () => {
  const { onFieldCreate } = useFormBuilderValueContext();

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
        <Button variant="outline" color="muted" className="size-10 rounded-full">
          <PlusIcon />
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
              onFieldCreate(value);
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
