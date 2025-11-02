import { Button } from '@/components/ui/button';
import type { ButtonVariantProps } from '@/components/ui/button-variants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleIcon } from 'lucide-react';

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
    isLoading?: boolean;
  }>
> = ({ variant, color, isLoading }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <ButtonBox variant={variant} color={color} size="xs" />
      <ButtonBox variant={variant} color={color} size="sm" />
      <ButtonBox variant={variant} color={color} size="md" />
      <ButtonBox variant={variant} color={color} size="lg" />
      <ButtonBox variant={variant} color={color} size="xl" />
      <ButtonBox variant={variant} color={color} size="xl" disabled />
      <ButtonBox variant={variant} color={color} size="lg" isLoading={isLoading !== undefined ? isLoading : true} />
    </div>
  );
};

const ButtonBox: React.FC<
  React.PropsWithChildren<{
    variant?: ButtonVariantProps['variant'];
    color?: ButtonVariantProps['color'];
    size?: ButtonVariantProps['size'];
    disabled?: boolean;
    isLoading?: boolean;
  }>
> = ({ variant, color, size, disabled, isLoading }) => {
  return (
    <div className="flex size-40 items-center justify-center rounded-md border border-border">
      <Button variant={variant} color={color} size={size} disabled={disabled} isLoading={isLoading}>
        <CircleIcon />
        <p>Button</p>
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
    <div className="flex size-full flex-col gap-y-6">
      <ButtonCard label="Button Default">
        <ButtonList variant="default" color="primary" />
        <ButtonList variant="default" color="secondary" />
        <ButtonList variant="default" color="muted" />
        <ButtonList variant="default" color="success" />
        <ButtonList variant="default" color="info" />
        <ButtonList variant="default" color="warning" />
        <ButtonList variant="default" color="danger" />
      </ButtonCard>
      <ButtonCard label="Button Outline">
        <ButtonList variant="outline" color="primary" />
        <ButtonList variant="outline" color="secondary" />
        <ButtonList variant="outline" color="muted" />
        <ButtonList variant="outline" color="success" />
        <ButtonList variant="outline" color="info" />
        <ButtonList variant="outline" color="warning" />
        <ButtonList variant="outline" color="danger" />
      </ButtonCard>
      <ButtonCard label="Button Soft">
        <ButtonList variant="soft" color="primary" />
        <ButtonList variant="soft" color="secondary" />
        <ButtonList variant="soft" color="muted" />
        <ButtonList variant="soft" color="success" />
        <ButtonList variant="soft" color="info" />
        <ButtonList variant="soft" color="warning" />
        <ButtonList variant="soft" color="danger" />
      </ButtonCard>
      <ButtonCard label="Button Subtle">
        <ButtonList variant="subtle" color="primary" />
        <ButtonList variant="subtle" color="secondary" />
        <ButtonList variant="subtle" color="muted" />
        <ButtonList variant="subtle" color="success" />
        <ButtonList variant="subtle" color="info" />
        <ButtonList variant="subtle" color="warning" />
        <ButtonList variant="subtle" color="danger" />
      </ButtonCard>
      <ButtonCard label="Button Ghost">
        <ButtonList variant="ghost" color="primary" />
        <ButtonList variant="ghost" color="secondary" />
        <ButtonList variant="ghost" color="muted" />
        <ButtonList variant="ghost" color="success" />
        <ButtonList variant="ghost" color="info" />
        <ButtonList variant="ghost" color="warning" />
        <ButtonList variant="ghost" color="danger" />
      </ButtonCard>
      <ButtonCard label="Button Link">
        <ButtonList variant="link" color="primary" isLoading={false} />
        <ButtonList variant="link" color="secondary" isLoading={false} />
        <ButtonList variant="link" color="muted" isLoading={false} />
        <ButtonList variant="link" color="success" isLoading={false} />
        <ButtonList variant="link" color="info" isLoading={false} />
        <ButtonList variant="link" color="warning" isLoading={false} />
        <ButtonList variant="link" color="danger" isLoading={false} />
      </ButtonCard>
    </div>
  ),
};
