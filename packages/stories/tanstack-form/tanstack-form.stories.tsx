import { z } from 'zod/v4';

import { sleep } from '@customafk/react-toolkit/utils/sleep';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTanStackForm } from '@/components/tanstack-form';

const Schema = z.object({
  textField: z.string().min(10, 'Text Field is required'),
  textFieldTwo: z.string().min(1, 'Text Field Two is required'),
  textareaField: z.string().min(1, 'Textarea Field is required'),
  numberField: z.number().gte(5, { message: 'Number Field must be at least 5' }),

  nestedGroupOne: z.object({
    nestedTextField: z.string().min(1, 'Nested Text Field is required'),
    nestedNumberField: z.number().min(0, { message: 'Nested Number Field must be at least 0' }),
  }),

  selectField: z.string().nonempty('Select Field is required'),
  comboboxField: z.string().nonempty('Combobox Field is required'),

  dateField: z.date(),

  switchGroup: z.object({
    switchOne: z.boolean(),
    switchTwo: z.boolean(),
    switchThree: z.boolean(),
    switchFour: z.boolean(),
  }),

  radioGroup: z.string().nonempty('Radio Group selection is required'),

  arrays: z.array(
    z.object({
      itemName: z.string().min(1, 'Item Name is required'),
      itemQuantity: z.number().min(1, { message: 'Item Quantity must be at least 1' }),
    })
  ),
});

const meta = {
  tags: ['autodocs'],
  title: 'TanStack Form',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { AppForm, AppField, TanStackForm, TanStackFormGroup, TanStackSwitchGroup, TanStackRadioGroup, TanStackFormFooter, SubscribeButton } =
      useTanStackForm({
        defaultValues: {
          textField: '',
          textFieldTwo: '',
          textareaField: '',
          numberField: 0,
          nestedGroupOne: {
            nestedTextField: '',
            nestedNumberField: 0,
          },
          selectField: '',
          comboboxField: '',

          dateField: new Date(),

          switchGroup: {
            switchOne: false,
            switchTwo: false,
            switchThree: false,
            switchFour: false,
          },

          radioGroup: '',

          arrays: [
            {
              itemName: '',
              itemQuantity: 0,
            },
          ],
        },
        validators: {
          onSubmit: Schema,
          onChange: Schema,
        },
        onSubmit: async data => {
          await sleep(1000);
          console.log('Form Submitted:', data.formApi.getAllErrors());
        },
        onSubmitInvalid: async errors => {
          console.log('Form Submission Failed with errors:', errors.formApi.getAllErrors());
        },
      });
    return (
      <TanStackForm label="Sample TanStack Form" description="This is a sample form using TanStack Form.">
        <AppField
          name="textField"
          children={({ TextField }) => (
            <TextField isShowClearButton label="Text Field" description="This is a text field." maxLength={10} placeholder="Enter text..." />
          )}
        />
        <AppField
          name="textFieldTwo"
          children={({ TextField }) => <TextField label="Text Field Two" description="This is a text field." placeholder="Enter text..." />}
        />
        <AppField
          name="numberField"
          children={({ NumberField }) => <NumberField label="Number Field" description="This is a number field." placeholder="0" unitText="cm" />}
        />
        <AppField
          name="textareaField"
          children={({ TextareaField }) => (
            <TextareaField label="Textarea Field" description="This is a textarea field." placeholder="Enter detailed text..." rows={5} />
          )}
        />
        <TanStackFormGroup label="Nested Group One" description="This section contains additional information fields.">
          <AppField
            name="nestedGroupOne.nestedTextField"
            children={({ TextField }) => <TextField label="Nested Text Field" isNested isShowClearButton={false} placeholder="Enter nested text..." />}
          />
          <AppField
            name="nestedGroupOne.nestedNumberField"
            children={({ NumberField }) => <NumberField label="Nested Number Field" isNested={true} unitText="kg" placeholder="0" />}
          />
        </TanStackFormGroup>
        <AppField
          name="selectField"
          children={({ SelectField }) => (
            <SelectField
              label="Select Field"
              description="This is a select field."
              placeholder="Choose an option"
              options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
            />
          )}
        />
        <AppField
          name="comboboxField"
          children={({ ComboboxField }) => (
            <ComboboxField
              label="Combobox Field"
              description="This is a combobox field."
              placeholder="Select or type an option"
              options={[
                { label: 'Combobox Option 1', value: 'comboboxOption1' },
                { label: 'Combobox Option 2', value: 'comboboxOption2' },
                { label: 'Combobox Option 3', value: 'comboboxOption3' },
              ]}
            />
          )}
        />
        <AppField
          name="dateField"
          children={({ DateField }) => <DateField label="Date Field" description="This is a date field." placeholder="Select a date" />}
        />
        <TanStackSwitchGroup label="Switch Group" description="This section contains multiple switch fields to toggle various options.">
          <AppField name="switchGroup.switchOne" children={({ SwitchField }) => <SwitchField label="Switch One" description="This is the first switch." />} />
          <AppField name="switchGroup.switchTwo" children={({ SwitchField }) => <SwitchField label="Switch Two" description="This is the second switch." />} />
          <AppField
            name="switchGroup.switchThree"
            children={({ SwitchField }) => <SwitchField label="Switch Three" description="This is the third switch." />}
          />
          <AppField
            name="switchGroup.switchFour"
            children={({ SwitchField }) => <SwitchField label="Switch Four" description="This is the fourth switch." />}
          />
        </TanStackSwitchGroup>
        <TanStackRadioGroup label="Radio Group" description="This section contains multiple radio button options to select from.">
          <AppField
            name="radioGroup"
            children={({ RadioGroupField }) => (
              <RadioGroupField
                label="Radio Group Field"
                description="This is a radio group field."
                options={[
                  { label: 'Radio Option 1', value: 'radioOption1', description: 'This is the first radio option.' },
                  { label: 'Radio Option 2', value: 'radioOption2', description: 'This is the second radio option.' },
                  { label: 'Radio Option 3', value: 'radioOption3', description: 'This is the third radio option.' },
                ]}
              />
            )}
          />
        </TanStackRadioGroup>

        <AppField
          name="arrays"
          mode="array"
          children={({ ArrayField, state, pushValue, removeValue }) => (
            <ArrayField
              label="Arrays"
              description="This section allows you to manage a list of items."
              onAddItem={() => {
                pushValue({
                  itemName: '',
                  itemQuantity: 0,
                });
              }}
            >
              {state.value.map((_, index) => (
                <AppField
                  key={index.toString()}
                  name={`arrays[${index}]`}
                  children={({ ArrayItemField }) => (
                    <ArrayItemField index={index} label={`Item ${index + 1}`} description="This is an array item field." onRemove={removeValue}>
                      <AppField
                        name={`arrays[${index}].itemName`}
                        children={({ TextField }) => <TextField label="Item Name" description="Name of the item." placeholder="Enter item name..." />}
                      />
                      <AppField
                        name={`arrays[${index}].itemQuantity`}
                        children={({ NumberField }) => <NumberField label="Item Quantity" description="Quantity of the item." placeholder="0" />}
                      />
                    </ArrayItemField>
                  )}
                />
              ))}
            </ArrayField>
          )}
        />

        <AppForm>
          <TanStackFormFooter>
            <SubscribeButton />
          </TanStackFormFooter>
        </AppForm>
      </TanStackForm>
    );
  },
};
