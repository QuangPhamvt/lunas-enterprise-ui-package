import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormWrapper } from '@/components/forms/form-wrapper';
import { NumberField } from '@/components/forms/number-field';
import { TextField } from '@/components/forms/text-field';
import { Button } from '@/components/ui/button';
import { FieldGroup, FieldSeparator } from '@/components/ui/field';
import { Toaster } from '@/components/ui/sonner';

type TSchema = {
  code: string;
  name: string;
  exchangeRate: number;
};

const meta: Meta<typeof FormWrapper<TSchema>> = {
  tags: ['autodocs'],
  title: 'Forms/FormWrapper',
  component: FormWrapper,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <>
        <FormWrapper<TSchema>
          form={{
            defaultValues: {
              code: '',
              name: '',
              exchangeRate: 1,
            },
          }}
          isResetAfterSubmit={false}
          title="Form Wrapper Example"
          description="This is a form wrapper where you can add your form elements."
          onSubmit={data => {
            console.log('Form submitted with data:', data);
          }}
          onError={error => {
            console.error('Form submission error:', error);
          }}
        >
          <FieldGroup>
            <TextField<TSchema> name="code" label="Mã tiền tệ" placeholder="VND, USD, EUR..." />
            <FieldSeparator />
            <TextField<TSchema> name="name" label="Tên tiền tệ" placeholder="VND, USD, EUR..." />
            <FieldSeparator />
            <NumberField<TSchema> name="exchangeRate" label="Tỷ giá" placeholder="0" />
            <FieldSeparator />
            <FieldGroup>
              <Button type="submit" className="w-40">
                Submit
              </Button>
            </FieldGroup>
          </FieldGroup>
        </FormWrapper>
        <Toaster />
      </>
    );
  },
};
