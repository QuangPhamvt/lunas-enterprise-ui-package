import { Button } from '@/components/ui/button';
import type { ButtonVariantProps } from '@/components/ui/button-variants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleOffIcon } from 'lucide-react';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const ButtonCard: React.FC<
  React.PropsWithChildren<{
    label: string;
  }>
> = ({ label, children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4">{children}</div>
      </CardContent>
    </Card>
  );
};

const ButtonList: React.FC<
  React.PropsWithChildren<{
    variant?: ButtonVariantProps['variant'];
    color?: ButtonVariantProps['color'];
  }>
> = ({ variant, color, children }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <ButtonBox variant={variant} color={color} size="xs" />
      <ButtonBox variant={variant} color={color} size="sm" />
      <ButtonBox variant={variant} color={color} size="md" />
      <ButtonBox variant={variant} color={color} size="lg" />
      <ButtonBox variant={variant} color={color} size="xl" />
      <ButtonBox variant={variant} color={color} size="xl" disabled />
    </div>
  );
};

const ButtonBox: React.FC<
  React.PropsWithChildren<{
    variant?: ButtonVariantProps['variant'];
    color?: ButtonVariantProps['color'];
    size?: ButtonVariantProps['size'];
    disabled?: boolean;
  }>
> = ({ variant, color, size, disabled }) => {
  return (
    <div className="size-40 flex items-center justify-center border border-border rounded-md">
      <Button variant={variant} color={color} size={size} disabled={disabled}>
        <CircleOffIcon />
        Button
      </Button>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: 'Button',
    size: 'default',
    isLoading: false,
    className: 'w-40',
  },
  render: () => (
    <div className="size-full flex flex-col gap-y-6">
      <ButtonCard label="Button Default">
        <ButtonList variant="default" color="primary" />
        <ButtonList variant="default" color="secondary" />
        <ButtonList variant="default" color="success" />
        <ButtonList variant="default" color="info" />
        <ButtonList variant="default" color="warning" />
        <ButtonList variant="default" color="danger" />
      </ButtonCard>
      <ButtonCard label="Button Outline">
        <ButtonList variant="outline" color="primary" />
        <ButtonList variant="outline" color="secondary" />
        <ButtonList variant="outline" color="success" />
        <ButtonList variant="outline" color="info" />
        <ButtonList variant="outline" color="warning" />
        <ButtonList variant="outline" color="danger" />
      </ButtonCard>
    </div>
  ),
};
