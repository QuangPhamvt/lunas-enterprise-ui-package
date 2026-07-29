import { Combobox } from '@/components/ui/combobox';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const PREFECTURES = [
  { label: 'Hokkaido', value: 'hokkaido' },
  { label: 'Aomori', value: 'aomori' },
  { label: 'Iwate', value: 'iwate' },
  { label: 'Miyagi', value: 'miyagi' },
  { label: 'Akita', value: 'akita' },
];

const PLACEHOLDER = 'Search location…';

/** The search input, option list, and creatable prompt render inside a Radix Popover portal — outside `canvasElement`. */
const body = () => within(document.body);

async function openDropdown(canvas: ReturnType<typeof within>) {
  await userEvent.click(canvas.getByRole('combobox'));
}

export const Default: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(PLACEHOLDER)).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
  },
};

export const WithPreselectedChips: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    defaultValue: [
      { label: 'Hokkaido', value: 'hokkaido' },
      { label: 'Aomori', value: 'aomori', fixed: true },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Hokkaido')).toBeInTheDocument();
    await expect(canvas.getByText('Aomori')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Remove Hokkaido' })).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: 'Remove Aomori' })).not.toBeInTheDocument();
  },
};

export const OpenDropdown: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    await expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
    await expect(body().getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    await expect(body().getAllByRole('option')).toHaveLength(PREFECTURES.length);
  },
};

export const TypeToFilter: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    const input = body().getByPlaceholderText(PLACEHOLDER);
    await userEvent.type(input, 'Akita');
    await waitFor(() => expect(body().getByRole('option', { name: 'Akita' })).toBeInTheDocument());
    await expect(body().queryByRole('option', { name: 'Miyagi' })).not.toBeInTheDocument();
  },
};

export const SelectOption: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    await userEvent.click(await body().findByRole('option', { name: 'Aomori' }));

    await waitFor(() => expect(canvas.getByRole('button', { name: 'Remove Aomori' })).toBeInTheDocument());
    await expect(body().getByPlaceholderText(PLACEHOLDER)).toHaveValue('');
    await expect(args.onChange).toHaveBeenCalledWith([{ label: 'Aomori', value: 'aomori' }]);
  },
};

export const RemoveChip: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    defaultValue: [{ label: 'Hokkaido', value: 'hokkaido' }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Remove Hokkaido' }));
    await waitFor(() => expect(canvas.queryByRole('button', { name: 'Remove Hokkaido' })).not.toBeInTheDocument());
  },
};

export const ClearAll: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    defaultValue: [
      { label: 'Hokkaido', value: 'hokkaido' },
      { label: 'Aomori', value: 'aomori' },
      { label: 'Iwate', value: 'iwate', fixed: true },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    await userEvent.click(await body().findByRole('button', { name: 'Clear Selected Input' }));

    await waitFor(() => expect(canvas.queryByRole('button', { name: 'Remove Hokkaido' })).not.toBeInTheDocument());
    await expect(canvas.queryByRole('button', { name: 'Remove Aomori' })).not.toBeInTheDocument();
    await expect(canvas.getByText('Iwate')).toBeInTheDocument();
  },
};

export const ClearQuery: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    defaultValue: [{ label: 'Hokkaido', value: 'hokkaido' }],
    onClearQuery: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    const input = body().getByPlaceholderText(PLACEHOLDER);
    await userEvent.type(input, 'aom');
    await expect(input).toHaveValue('aom');

    await userEvent.click(body().getByRole('button', { name: 'Clear search' }));
    await expect(input).toHaveValue('');
    await expect(canvas.getByRole('button', { name: 'Remove Hokkaido' })).toBeInTheDocument();
    await expect(args.onClearQuery).toHaveBeenCalled();
  },
};

export const Loading: Story = {
  args: {
    delay: 0,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    loadingText: 'Fetching results',
    onSearch: async (query: string) =>
      new Promise(resolve => {
        setTimeout(() => resolve(PREFECTURES.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))), 300);
      }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    const input = body().getByPlaceholderText(PLACEHOLDER);
    await userEvent.type(input, 'a');

    await waitFor(() => expect(body().getByText('Fetching results')).toBeInTheDocument());
    await waitFor(() => expect(body().queryByText('Fetching results')).not.toBeInTheDocument());
    await expect(body().getAllByRole('option').length).toBeGreaterThan(0);
  },
};

export const NoMatchesEmpty: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    creatable: false,
    emptyIndicator: 'Nothing matched your search.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    const input = body().getByPlaceholderText(PLACEHOLDER);
    await userEvent.type(input, 'zzz');

    await waitFor(() => expect(body().getByText('Nothing matched your search.')).toBeInTheDocument());
  },
};

export const CreatableFlow: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    creatable: true,
    createHint: "This value isn't in our list yet — add it as a custom entry.",
    onCreateOption: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    const input = body().getByPlaceholderText(PLACEHOLDER);
    await userEvent.type(input, 'Okinawa');

    await waitFor(() => expect(body().getByText(/isn't in our list yet/)).toBeInTheDocument());
    await userEvent.click(body().getByRole('button', { name: 'Create "Okinawa"' }));

    await waitFor(() => expect(canvas.getByText('Okinawa')).toBeInTheDocument());
    await expect(args.onCreateOption).toHaveBeenCalledWith('Okinawa');
    // The creatable flow is a one-shot action — the popover closes afterward.
    await expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  },
};

export const CreatableFlowEnterKey: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    creatable: true,
    onCreateOption: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    const input = body().getByPlaceholderText(PLACEHOLDER);
    await userEvent.type(input, 'Okinawa{Enter}');

    await waitFor(() => expect(canvas.getByText('Okinawa')).toBeInTheDocument());
    await expect(args.onCreateOption).toHaveBeenCalledWith('Okinawa');
  },
};

export const DangerVariant: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    color: 'danger',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('combobox')).toHaveClass('border-danger');
  },
};

export const Disabled: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    disabled: true,
    defaultValue: [{ label: 'Hokkaido', value: 'hokkaido' }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toHaveAttribute('aria-disabled', 'true');
    await expect(trigger).toHaveClass('pointer-events-none');
    await expect(canvas.queryByRole('button', { name: 'Remove Hokkaido' })).not.toBeInTheDocument();

    // `pointer-events: none` blocks even synthetic clicks — the dropdown stays closed by construction.
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(body().queryByRole('listbox')).not.toBeInTheDocument();
  },
};

export const KeyboardBackspaceRemovesLastChip: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    defaultValue: [
      { label: 'Hokkaido', value: 'hokkaido' },
      { label: 'Aomori', value: 'aomori' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    const input = body().getByPlaceholderText(PLACEHOLDER);
    await userEvent.click(input);
    await userEvent.keyboard('{Backspace}');

    await waitFor(() => expect(canvas.queryByRole('button', { name: 'Remove Aomori' })).not.toBeInTheDocument());
    await expect(canvas.getByRole('button', { name: 'Remove Hokkaido' })).toBeInTheDocument();
  },
};

export const KeyboardBackspaceIgnoresFixedChip: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    defaultValue: [{ label: 'Hokkaido', value: 'hokkaido', fixed: true }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    const input = body().getByPlaceholderText(PLACEHOLDER);
    await userEvent.click(input);
    await userEvent.keyboard('{Backspace}');

    await expect(canvas.getByText('Hokkaido')).toBeInTheDocument();
  },
};

export const KeyboardEscapeCloses: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);
    await expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(canvas.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false'));
  },
};

export const MaxSelected: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    maxSelected: 2,
    defaultValue: [
      { label: 'Hokkaido', value: 'hokkaido' },
      { label: 'Aomori', value: 'aomori' },
    ],
    onMaxSelected: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    await userEvent.click(await body().findByRole('option', { name: 'Iwate' }));

    await waitFor(() => expect(args.onMaxSelected).toHaveBeenCalledWith(2));
    await expect(canvas.queryByRole('button', { name: 'Remove Iwate' })).not.toBeInTheDocument();
  },
};

export const SelectedShownWithCheckmarkOnReopen: Story = {
  args: {
    options: PREFECTURES,
    placeholder: PLACEHOLDER,
    className: 'w-80',
    defaultValue: [{ label: 'Hokkaido', value: 'hokkaido' }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDropdown(canvas);

    const option = await body().findByRole('option', { name: /Hokkaido/ });
    await expect(option).toHaveAttribute('data-picked', 'true');
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Combobox options={PREFECTURES} placeholder="Small" size="sm" className="w-80" />
      <Combobox options={PREFECTURES} placeholder="Medium" size="md" className="w-80" />
      <Combobox options={PREFECTURES} placeholder="Large" size="lg" className="w-80" />
    </div>
  ),
};
