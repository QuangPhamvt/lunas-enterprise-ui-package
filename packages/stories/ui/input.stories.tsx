import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { InputVariantProps } from '@/components/ui/input.variants';
import type { Meta, StoryObj } from '@storybook/react-vite';

const InputVariant: React.FC<
  React.PropsWithChildren<{
    variant?: InputVariantProps['variant'];
  }>
> = ({ variant, children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input Variants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4">
          <Input variant={variant} size="xs" placeholder="Extra Small" />
          <Input variant={variant} size="sm" placeholder="Small" />
          <Input variant={variant} size="md" placeholder="Medium" />
          <Input variant={variant} size="lg" placeholder="Large" />
          <Input variant={variant} size="xl" placeholder="Extra Large" />
          <Input variant={variant} size="md" placeholder="With value" aria-invalid value="Invalid" />
          <Input variant={variant} size="md" placeholder="Disabled" disabled />
        </div>
      </CardContent>
    </Card>
  );
};

const meta = {
  tags: ['autodocs'],
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
  render: () => {
    return (
      <div className="flex flex-col w-full gap-y-4">
        <InputVariant variant="outline" />
      </div>
    );
  },
};
