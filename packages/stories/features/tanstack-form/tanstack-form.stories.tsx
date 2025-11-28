import z from 'zod';

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

  numberField: z.number().gte(5, { message: 'Number Field must be at least 5' }),
  dataField: z.date(),
});

export const Default: Story = {
  render: () => {
    const { TanStackContainerForm, TanStackSectionForm, TanStackTitleField, AppField } = useTanStackForm({
      defaultValues: {
        textField: '',
        textareaField: '',
        numberField: 0,
        dataField: new Date(),
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
                    maxLength={null}
                    showClearButton={true}
                    showCharacterCount={true}
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
                    maxLength={null}
                    showClearButton={true}
                    showCharacterCount={true}
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
                    maxLength={null}
                    showCharacterCount={true}
                    showErrorMessage={true}
                  />
                );
              }}
            />
            <AppField
              name="dataField"
              children={({ DateField }) => {
                return <DateField label="Date Field" placeholder="Select date" description="This is a date field." orientation="responsive" />;
              }}
            />
          </TanStackSectionForm>
          <TanStackSectionForm title="Section Form Title">
            <TanStackTitleField title="Section Title" description="This is the description for the section title." />
            <AppField
              name="numberField"
              children={({ NumberField }) => {
                return (
                  <NumberField
                    label="Number Field"
                    placeholder="Enter number here"
                    description="This is a number field."
                    orientation="responsive"
                    unitText="cm"
                    showErrorMessage={true}
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
