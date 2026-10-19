import { expect, within } from 'storybook/test';

import { CountryDisplay } from '@/components/data-display/country';
import { ECountry } from '@/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Data Display/Country',
  component: CountryDisplay,
} satisfies Meta<typeof CountryDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    country: ECountry.VIETNAM,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('img', { name: 'Vietnam' })).toBeInTheDocument();
    await expect(canvas.getByText('Vietnam')).toBeInTheDocument();
  },
};

export const AllCountries: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {Object.values(ECountry).map(country => (
        <CountryDisplay key={country} country={country} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Every enum value must have an inline flag — no flag library or network request to fall back on.
    const flags = within(canvasElement).getAllByRole('img');
    await expect(flags).toHaveLength(Object.values(ECountry).length);
    for (const flag of flags) await expect(flag.childElementCount).toBeGreaterThan(0);
  },
};

export const Empty: Story = {
  args: {
    country: null,
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('No country')).toBeInTheDocument();
  },
};
