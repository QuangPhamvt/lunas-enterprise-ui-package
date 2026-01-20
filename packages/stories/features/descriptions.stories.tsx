import { Description, DescriptionItem } from '@/components/features/descriptions';
import { DescriptionEmpty } from '@/components/features/descriptions/components';
import { DescriptionBadge } from '@/components/features/descriptions/components/badge';
import { DescriptionDate } from '@/components/features/descriptions/components/date';
import { DescriptionImages } from '@/components/features/descriptions/components/images';
import { DescriptionLongText } from '@/components/features/descriptions/components/longtext';
import { DescriptionName } from '@/components/features/descriptions/components/name';
import { DescriptionNumberPhone } from '@/components/features/descriptions/components/number-phone';
import { DescriptionStatistic } from '@/components/features/descriptions/components/statistic';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Description> = {
  tags: ['autodocs'],
  title: 'Features/Descriptions',
  component: Description,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Description>
        <DescriptionItem label="Item 1 Badge">
          <DescriptionBadge label="Badge 1" />
          <DescriptionBadge label="Badge 2" />
          <DescriptionBadge label="Badge 3" />
          <DescriptionBadge label="Badge 4" />
          <DescriptionBadge label="Badge 5" />
          <DescriptionBadge label="Badge 6" />
          <DescriptionBadge label="Badge 7" />
          <DescriptionBadge label="Badge 8" />
          <DescriptionBadge label="Badge 9" />
          <DescriptionBadge label="Badge 10" />
          <DescriptionBadge label="Badge 11" />
        </DescriptionItem>
        <DescriptionItem label="Item 2 Name">
          <DescriptionName name="John Doe John Doe John Doe John Doe John Doe John Doe John Doe" />
        </DescriptionItem>
        <DescriptionItem label="Item 3">
          <DescriptionDate date={new Date()} />
        </DescriptionItem>
        <DescriptionItem label="Item 4">
          <DescriptionLongText content="This is a long text that will be displayed in a scrollable container." />
        </DescriptionItem>
        <DescriptionItem label="Item 5">
          <DescriptionNumberPhone value="+84987654321" />
        </DescriptionItem>
        <DescriptionItem label="Item 6">
          <DescriptionStatistic value={123456789} />
        </DescriptionItem>
        <DescriptionItem label="Item 7">
          <DescriptionImages
            images={[
              { id: '1', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 1' },
              { id: '2', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 2' },
              { id: '3', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 3' },
              { id: '4', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 4' },
              { id: '5', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 5' },
              { id: '6', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 6' },
              { id: '7', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 7' },
              { id: '8', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 8' },
              { id: '9', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 9' },
            ]}
          />
        </DescriptionItem>
        <DescriptionItem label="Item 8">
          <DescriptionEmpty />
        </DescriptionItem>
      </Description>
    );
  },
};
