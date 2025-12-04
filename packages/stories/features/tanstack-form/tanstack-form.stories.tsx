import { useState } from 'react';

import z from 'zod';

import { Button } from '@/components/ui/button';
import { useTanStackForm } from '@/components/features/tanstack-form';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const schema = z.object({
  textField: z.string().min(10, 'Text Field is required'),
  textareaField: z.string().min(20, 'Textarea is required'),
  numberField: z.number().gte(5, { message: 'Number Field must be at least 5' }).nullable(),

  dataField: z.date(),
  switchField: z.boolean(),
  radioField: z.string().min(1, 'Please select an option'),
  checkboxField: z.string().array().min(1, 'Please select at least one option'),
});

export const Default: Story = {
  render: () => {
    const { TanStackContainerForm, TanStackSectionForm, TanStackTitleField, AppField } = useTanStackForm({
      defaultValues: {
        textField: '',
        textareaField: '',
        numberField: null,

        dataField: new Date(),
        switchField: false,
        radioField: '',
        checkboxField: [] as string[],
      } as z.output<typeof schema>,
    });
    return (
      <div className="size-full bg-muted-bg-subtle p-4">
        <TanStackContainerForm>
          <TanStackSectionForm title="Section Form Title">
            <TanStackTitleField title="Section Title" description="This is the description for the section title." />
            <AppField
              name="textField"
              children={({ TextField }) => {
                return (
                  <TextField
                    label="Text Field"
                    placeholder="Enter text here"
                    description="This is a text field."
                    orientation="responsive"
                    showClearButton={true}
                    showErrorMessage={true}
                  />
                );
              }}
            />
            <AppField
              name="textField"
              children={({ TextField }) => {
                return (
                  <TextField
                    label="Text Field"
                    placeholder="Enter text here"
                    description="This is a text field."
                    orientation="responsive"
                    showClearButton={true}
                    showErrorMessage={true}
                  />
                );
              }}
            />
            <AppField
              name="textareaField"
              children={({ TextareaField }) => {
                return (
                  <TextareaField
                    label="Textarea Field"
                    placeholder="Enter text here"
                    description="This is a textarea field."
                    orientation="responsive"
                    showErrorMessage={true}
                  />
                );
              }}
            />
            <AppField
              name="numberField"
              children={({ NumberField }) => {
                return (
                  <NumberField
                    label="Number Field"
                    placeholder="Enter number here"
                    description="This is a number field."
                    orientation="responsive"
                    showErrorMessage={true}
                  />
                );
              }}
            />
          </TanStackSectionForm>
          <TanStackSectionForm title="Selection Fields">
            <TanStackTitleField title="Section Title" description="This is the description for the section title." />
            <AppField
              name="dataField"
              children={({ DateField }) => {
                return <DateField label="Date Field" placeholder="Select date" description="This is a date field." orientation="responsive" />;
              }}
            />
            <AppField
              name="switchField"
              children={({ SwitchField }) => {
                return <SwitchField label="Switch Field" description="This is a switch field." helperText="You can toggle this switch." />;
              }}
            />
            <AppField
              name="radioField"
              children={({ RadioGroupField }) => {
                return (
                  <RadioGroupField
                    label="Radio Group Field"
                    description="This is a radio group field."
                    options={[
                      { label: 'Option 1', value: 'option1', description: 'This is option 1' },
                      { label: 'Option 2', value: 'option2', description: 'This is option 2' },
                      { label: 'Option 3', value: 'option3', description: 'This is option 3' },
                    ]}
                    orientation="responsive"
                    helperText="Please select one of the options."
                  />
                );
              }}
            />
            <AppField
              name="checkboxField"
              children={({ CheckboxField }) => {
                return (
                  <CheckboxField
                    label="Checkbox Field"
                    description="This is a checkbox field."
                    options={[
                      { label: 'Option 1', value: 'option1' },
                      { label: 'Option 2', value: 'option2' },
                      { label: 'Option 3', value: 'option3' },
                    ]}
                    orientation="responsive"
                    helperText="Please select one or more of the options."
                  />
                );
              }}
            />
          </TanStackSectionForm>
          <TanStackSectionForm title="Section Form Title"></TanStackSectionForm>
        </TanStackContainerForm>
      </div>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const { AppForm, TanStackDialogForm, AppField } = useTanStackForm({
      defaultValues: {
        textField: '',
        textareaField: '',
      },
    });
    const [open, setOpen] = useState<boolean>(false);
    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Form Dialog
        </Button>
        <AppForm>
          <TanStackDialogForm title="Form Dialog Title" open={open} onOpenChange={setOpen}>
            <AppField
              name="textField"
              children={({ TextField }) => {
                return (
                  <TextField
                    label="Text Field"
                    placeholder="Enter text here"
                    description="This is a text field."
                    orientation="responsive"
                    showClearButton={true}
                    showErrorMessage={true}
                  />
                );
              }}
            />
            <AppField
              name="textareaField"
              children={({ TextareaField }) => {
                return (
                  <TextareaField
                    label="Textarea Field"
                    placeholder="Enter text here"
                    description="This is a textarea field."
                    orientation="responsive"
                    showErrorMessage={true}
                  />
                );
              }}
            />
          </TanStackDialogForm>
        </AppForm>
      </>
    );
  },
};
