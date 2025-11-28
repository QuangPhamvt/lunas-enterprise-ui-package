import {
  Combobox,
  ComboboxActions,
  ComboboxCommand,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
} from '@/components/features/tanstack-form/components/ui/combobox';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Features/TanStack Form/Atoms/Combobox',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Combobox>
        <ComboboxTrigger>asdasd</ComboboxTrigger>
        <ComboboxContent>
          <ComboboxActions />
          <ComboboxSeparator />
          <ComboboxCommand>
            <ComboboxInput placeholder="Type a command or search..." />
            <ComboboxList>
              <ComboboxEmpty />
              <ComboboxGroup>
                <ComboboxItem value="1">Item 1</ComboboxItem>
                <ComboboxItem value="2">Item 2</ComboboxItem>
                <ComboboxItem value="3">Item 3</ComboboxItem>
                <ComboboxItem value="4">Item 4</ComboboxItem>
                <ComboboxItem value="5">Item 5</ComboboxItem>
                <ComboboxItem value="6">Item 6</ComboboxItem>
                <ComboboxItem value="7">Item 7</ComboboxItem>
                <ComboboxItem value="8">Item 8</ComboboxItem>
                <ComboboxItem value="9">Item 9</ComboboxItem>
                <ComboboxItem value="10">Item 10</ComboboxItem>
                <ComboboxItem value="11">Item 11</ComboboxItem>
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxCommand>
        </ComboboxContent>
      </Combobox>
    );
  },
};
