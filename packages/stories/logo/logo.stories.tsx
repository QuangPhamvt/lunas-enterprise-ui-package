'use client';

import { LunasLogo } from '@/components/features/logo';
import type { LunasLogoColorScheme, LunasLogoIconStyle, LunasLogoSize, LunasLogoVariant } from '@/components/features/logo';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Features/Logo',
  component: LunasLogo,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['horizontal', 'stacked', 'icon'] satisfies LunasLogoVariant[] },
    colorScheme: { control: 'select', options: ['purple', 'white', 'black'] satisfies LunasLogoColorScheme[] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] satisfies LunasLogoSize[] },
    iconStyle: { control: 'select', options: ['plain', 'solid', 'outline'] satisfies LunasLogoIconStyle[] },
  },
} satisfies Meta<typeof LunasLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'horizontal', colorScheme: 'purple', size: 'md' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Horizontal</p>
        <LunasLogo variant="horizontal" colorScheme="purple" size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Stacked</p>
        <LunasLogo variant="stacked" colorScheme="purple" size="md" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Icon</p>
        <LunasLogo variant="icon" colorScheme="purple" size="md" />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-xs text-muted-foreground">Purple</span>
        <LunasLogo variant="horizontal" colorScheme="purple" size="sm" />
      </div>
      <div className="flex items-center gap-4 rounded-lg bg-[#3B1F73] p-3">
        <span className="w-16 text-xs text-white">White</span>
        <LunasLogo variant="horizontal" colorScheme="white" size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-xs text-muted-foreground">Black</span>
        <LunasLogo variant="horizontal" colorScheme="black" size="sm" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-6 text-xs font-mono text-muted-foreground">{size}</span>
          <LunasLogo variant="horizontal" colorScheme="purple" size={size} />
        </div>
      ))}
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-4">
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <LunasLogo variant="icon" colorScheme="purple" size={size} />
          <span className="text-xs font-mono text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const IconStyles: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Plain</p>
        <div className="flex items-end gap-4">
          {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
            <LunasLogo key={size} variant="icon" colorScheme="purple" iconStyle="plain" size={size} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Solid</p>
        <div className="flex items-end gap-4">
          {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
            <LunasLogo key={size} variant="icon" colorScheme="purple" iconStyle="solid" size={size} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Outline</p>
        <div className="flex items-end gap-4">
          {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
            <LunasLogo key={size} variant="icon" colorScheme="purple" iconStyle="outline" size={size} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Solid — all color schemes</p>
        <div className="flex items-center gap-4">
          <LunasLogo variant="icon" colorScheme="purple" iconStyle="solid" size="lg" />
          <div className="rounded-lg bg-[#3B1F73] p-2">
            <LunasLogo variant="icon" colorScheme="white" iconStyle="solid" size="lg" />
          </div>
          <LunasLogo variant="icon" colorScheme="black" iconStyle="solid" size="lg" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Outline — all color schemes</p>
        <div className="flex items-center gap-4">
          <LunasLogo variant="icon" colorScheme="purple" iconStyle="outline" size="lg" />
          <div className="rounded-lg bg-[#3B1F73] p-2">
            <LunasLogo variant="icon" colorScheme="white" iconStyle="outline" size="lg" />
          </div>
          <LunasLogo variant="icon" colorScheme="black" iconStyle="outline" size="lg" />
        </div>
      </div>
    </div>
  ),
};

export const StackedVariants: Story = {
  render: () => (
    <div className="flex gap-8 p-4">
      <LunasLogo variant="stacked" colorScheme="purple" size="md" />
      <div className="rounded-lg bg-[#3B1F73] p-3">
        <LunasLogo variant="stacked" colorScheme="white" size="md" />
      </div>
      <LunasLogo variant="stacked" colorScheme="black" size="md" />
    </div>
  ),
};
