import { FormWrapper } from '@/components/forms/form-wrapper'
import { NumberField } from '@/components/forms/number-field'
import { TextField } from '@/components/forms/text-field'
import { Flex } from '@/components/layouts/flex'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import type { Meta, StoryObj } from '@storybook/react-vite'

type TSchema = {
  code: string
  name: string
  exchangeRate: number
}

const meta: Meta<typeof FormWrapper<TSchema>> = {
  tags: ['autodocs'],
  title: 'Forms/FormWrapper',
  component: FormWrapper,
}

export default meta
type Story = StoryObj<typeof meta>

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
          onSubmit={(data) => {
            console.log('Form submitted with data:', data)
          }}
          onError={(error) => {
            console.error('Form submission error:', error)
          }}
        >
          <Flex vertical gap="md">
            <TextField<TSchema> name="code" label="Mã tiền tệ" placeholder="VND, USD, EUR..." />
            <Flex padding="none" className="gap-2 *:flex-1">
              <TextField<TSchema> name="name" label="Tên tiền tệ" placeholder="VND, USD, EUR..." />
              <NumberField<TSchema> name="exchangeRate" label="Tỷ giá" placeholder="0" />
            </Flex>
            <Flex justify="end" width="full">
              <Button type="submit">Submit</Button>
            </Flex>
          </Flex>
        </FormWrapper>
        <Toaster />
      </>
    )
  },
}
