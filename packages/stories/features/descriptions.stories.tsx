import { Description, DescriptionGroup, DescriptionHeader, DescriptionItem, DescriptionSection } from '@/components/features/descriptions';
import {
  DescriptionBadge,
  DescriptionBoolean,
  DescriptionCopy,
  DescriptionDate,
  DescriptionEmpty,
  DescriptionImages,
  DescriptionLink,
  DescriptionLongText,
  DescriptionName,
  DescriptionNumberPhone,
  DescriptionStatistic,
  DescriptionStatus,
  DescriptionTagList,
  DescriptionUser,
} from '@/components/features/descriptions/components';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Description> = {
  tags: ['autodocs'],
  title: 'Features/Descriptions',
  component: Description,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Description>
      <DescriptionItem label="Badge">
        <DescriptionBadge label="Default" />
        <DescriptionBadge label="Primary" color="primary" />
        <DescriptionBadge label="Success" color="success" />
        <DescriptionBadge label="Warning" color="warning" />
        <DescriptionBadge label="Danger" color="danger" />
        <DescriptionBadge label="Info" color="info" />
      </DescriptionItem>
      <DescriptionItem label="Name">
        <DescriptionName name="John Doe John Doe John Doe John Doe John Doe John Doe John Doe" />
      </DescriptionItem>
      <DescriptionItem label="Date">
        <DescriptionDate date={new Date()} />
      </DescriptionItem>
      <DescriptionItem label="Long Text">
        <DescriptionLongText content="This is a long text that will be displayed in a scrollable container. It wraps across multiple lines when the content is too long to fit in a single line." />
      </DescriptionItem>
      <DescriptionItem label="Phone">
        <DescriptionNumberPhone value="+84987654321" />
      </DescriptionItem>
      <DescriptionItem label="Statistic">
        <DescriptionStatistic value={123456789} prefix="$" trend="up" />
      </DescriptionItem>
      <DescriptionItem label="Images">
        <DescriptionImages
          images={[
            { id: '1', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 1' },
            { id: '2', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 2' },
            { id: '3', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 3' },
          ]}
        />
      </DescriptionItem>
      <DescriptionItem label="Empty">
        <DescriptionEmpty />
      </DescriptionItem>
    </Description>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Description>
      <DescriptionHeader
        title="User Information"
        description="Personal details and account settings"
        extra={<DescriptionBadge label="Active" color="success" />}
      />
      <DescriptionItem label="Full Name">
        <DescriptionName name="Nguyen Van A" />
      </DescriptionItem>
      <DescriptionItem label="Email">
        <DescriptionCopy value="nguyenvana@example.com" />
      </DescriptionItem>
      <DescriptionItem label="Phone">
        <DescriptionNumberPhone value="+84987654321" />
      </DescriptionItem>
      <DescriptionItem label="Status">
        <DescriptionStatus label="Active" color="success" />
      </DescriptionItem>
      <DescriptionItem label="Joined">
        <DescriptionDate date={new Date('2023-06-15')} />
      </DescriptionItem>
    </Description>
  ),
};

export const WithSections: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="Order #ORD-20240001" description="Full order details" />
      <DescriptionSection title="Basic Info" />
      <DescriptionItem label="Status">
        <DescriptionStatus label="Pending" color="warning" />
      </DescriptionItem>
      <DescriptionItem label="Created At">
        <DescriptionDate date={new Date()} />
      </DescriptionItem>
      <DescriptionItem label="Reference ID">
        <DescriptionCopy value="ord_01hv3k9x2b5m4n7q8r6p0" />
      </DescriptionItem>
      <DescriptionSection title="Customer" />
      <DescriptionItem label="Account">
        <DescriptionUser uuid="abc-123" username="Nguyen Van A" email="nguyenvana@example.com" />
      </DescriptionItem>
      <DescriptionItem label="Notes">
        <DescriptionLongText content="Customer requested express delivery. Please ensure the package is marked fragile and handled with care during transit." />
      </DescriptionItem>
      <DescriptionSection title="Financials" />
      <DescriptionItem label="Total">
        <DescriptionStatistic value={4500000} prefix="₫" size="md" />
      </DescriptionItem>
      <DescriptionItem label="Discount">
        <DescriptionStatistic value={450000} prefix="-₫" trend="down" />
      </DescriptionItem>
    </Description>
  ),
};

export const NewDisplayTypes: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="New Display Types" description="All newly added description components" />

      <DescriptionSection title="Status" />
      <DescriptionItem label="Success">
        <DescriptionStatus label="Active" color="success" />
      </DescriptionItem>
      <DescriptionItem label="Warning">
        <DescriptionStatus label="Pending" color="warning" />
      </DescriptionItem>
      <DescriptionItem label="Danger">
        <DescriptionStatus label="Blocked" color="danger" />
      </DescriptionItem>
      <DescriptionItem label="Info">
        <DescriptionStatus label="Processing" color="info" />
      </DescriptionItem>
      <DescriptionItem label="No Dot">
        <DescriptionStatus label="Draft" color="muted" dot={false} />
      </DescriptionItem>

      <DescriptionSection title="Boolean" />
      <DescriptionItem label="True">
        <DescriptionBoolean value={true} />
      </DescriptionItem>
      <DescriptionItem label="False">
        <DescriptionBoolean value={false} />
      </DescriptionItem>
      <DescriptionItem label="Custom Labels">
        <DescriptionBoolean value={true} trueLabel="Enabled" falseLabel="Disabled" />
      </DescriptionItem>
      <DescriptionItem label="Null">
        <DescriptionBoolean value={null} />
      </DescriptionItem>

      <DescriptionSection title="Copy" />
      <DescriptionItem label="ID / Token">
        <DescriptionCopy value="usr_01hv3k9x2b5m4n7q8r6p0wze" />
      </DescriptionItem>
      <DescriptionItem label="API Key">
        <DescriptionCopy value="sk-live-abcdefghijklmnopqrstuvwxyz1234567890" />
      </DescriptionItem>
      <DescriptionItem label="No Truncate">
        <DescriptionCopy value="short-id-123" truncate={false} />
      </DescriptionItem>

      <DescriptionSection title="Link" />
      <DescriptionItem label="External">
        <DescriptionLink href="https://example.com" label="Visit Example" />
      </DescriptionItem>
      <DescriptionItem label="Internal">
        <DescriptionLink href="/dashboard/users/123" label="View Profile" external={false} />
      </DescriptionItem>
      <DescriptionItem label="URL as Label">
        <DescriptionLink href="https://example.com/some/deep/path" />
      </DescriptionItem>

      <DescriptionSection title="Tag List" />
      <DescriptionItem label="Tags">
        <DescriptionTagList tags={['React', 'TypeScript', 'TailwindCSS', 'Radix UI', 'Storybook']} />
      </DescriptionItem>
      <DescriptionItem label="Overflow (max 3)">
        <DescriptionTagList tags={['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6']} max={3} color="info" />
      </DescriptionItem>
      <DescriptionItem label="Danger Variant">
        <DescriptionTagList tags={['Restricted', 'NSFW', 'Flagged']} color="danger" variant="outline" />
      </DescriptionItem>

      <DescriptionSection title="User" />
      <DescriptionItem label="Assigned To">
        <DescriptionUser uuid="abc-123" username="Nguyen Van A" email="nguyenvana@example.com" />
      </DescriptionItem>
      <DescriptionItem label="Null User">
        <DescriptionUser uuid={null} username={null} email={null} />
      </DescriptionItem>
    </Description>
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="Vertical Layout" description="Label stacked above value" />
      <DescriptionItem label="Description" orientation="vertical">
        <DescriptionLongText content="This item uses vertical orientation where the label sits above the value instead of beside it. Useful for longer content that needs more horizontal space." />
      </DescriptionItem>
      <DescriptionItem label="Tags" orientation="vertical">
        <DescriptionTagList tags={['React', 'TypeScript', 'Vite', 'Radix UI', 'CVA', 'Biome', 'Storybook']} max={10} />
      </DescriptionItem>
      <DescriptionItem label="Images" orientation="vertical">
        <DescriptionImages
          images={[
            { id: '1', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 1' },
            { id: '2', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 2' },
            { id: '3', src: 'https://ui.shadcn.com/placeholder.svg', alt: 'Image 3' },
          ]}
        />
      </DescriptionItem>
    </Description>
  ),
};

export const WithActionSlot: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="With Action Slot" description="Label cells with inline actions" />
      <DescriptionItem label="API Key" action={<DescriptionBadge label="Regenerate" color="danger" size="xs" />}>
        <DescriptionCopy value="sk-live-abcdefghijklmnopqrstuvwxyz1234567890" />
      </DescriptionItem>
      <DescriptionItem label="Status" action={<DescriptionBadge label="Edit" color="info" size="xs" />}>
        <DescriptionStatus label="Active" color="success" />
      </DescriptionItem>
      <DescriptionItem label="Notes" action={<DescriptionBadge label="Edit" color="secondary" size="xs" />} orientation="vertical">
        <DescriptionLongText content="These are some important notes about this record that a user might want to edit inline." />
      </DescriptionItem>
    </Description>
  ),
};

export const Nested: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="Order #ORD-20240001" description="Order with nested line-item breakdown" />
      <DescriptionItem label="Status">
        <DescriptionStatus label="Pending" color="warning" />
      </DescriptionItem>
      <DescriptionItem label="Customer">
        <DescriptionUser uuid="abc-123" username="Nguyen Van A" email="nguyenvana@example.com" />
      </DescriptionItem>
      <DescriptionItem label="Line Items" orientation="vertical">
        <Description nested>
          <DescriptionHeader title="Products" />
          <DescriptionItem label="Product A">
            <DescriptionStatistic value={150000} prefix="₫" />
          </DescriptionItem>
          <DescriptionItem label="Product B">
            <DescriptionStatistic value={250000} prefix="₫" />
          </DescriptionItem>
          <DescriptionItem label="Product C">
            <DescriptionStatistic value={100000} prefix="₫" />
          </DescriptionItem>
        </Description>
      </DescriptionItem>
      <DescriptionItem label="Total">
        <DescriptionStatistic value={500000} prefix="₫" trend="up" />
      </DescriptionItem>
    </Description>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Description loading />
      <Description loading loadingRows={6} />
      <Description loading loadingRows={2} />
    </div>
  ),
};

export const ScrollWithStickyHeader: Story = {
  render: () => (
    <div style={{ height: 320 }}>
      <Description>
        <DescriptionHeader
          title="User Information"
          description="Header stays fixed as you scroll"
          extra={<DescriptionBadge label="Active" color="success" />}
        />
        <DescriptionItem label="Full Name">
          <DescriptionName name="Nguyen Van A" />
        </DescriptionItem>
        <DescriptionItem label="Email">
          <DescriptionCopy value="nguyenvana@example.com" />
        </DescriptionItem>
        <DescriptionItem label="Phone">
          <DescriptionNumberPhone value="+84987654321" />
        </DescriptionItem>
        <DescriptionItem label="Status">
          <DescriptionStatus label="Active" color="success" />
        </DescriptionItem>
        <DescriptionItem label="Joined">
          <DescriptionDate date={new Date('2023-06-15')} />
        </DescriptionItem>
        <DescriptionItem label="API Key">
          <DescriptionCopy value="sk-live-abcdefghijklmnopqrstuvwxyz1234567890" />
        </DescriptionItem>
        <DescriptionItem label="Tags">
          <DescriptionTagList tags={['Admin', 'Verified', 'Premium']} />
        </DescriptionItem>
        <DescriptionItem label="Notes" orientation="vertical">
          <DescriptionLongText content="This account has been manually verified by the support team following a KYC review completed on 2024-01-15. All documents are on file and the account is in good standing." />
        </DescriptionItem>
        <DescriptionItem label="Boolean">
          <DescriptionBoolean value={true} trueLabel="Enabled" falseLabel="Disabled" />
        </DescriptionItem>
        <DescriptionItem label="Link">
          <DescriptionLink href="https://example.com" label="Profile page" />
        </DescriptionItem>
      </Description>
    </div>
  ),
};

export const GroupWithStickyHeaders: Story = {
  render: () => (
    <div style={{ height: 400 }}>
      <DescriptionGroup>
        <Description>
          <DescriptionHeader title="Personal Info" description="Basic identity details" />
          <DescriptionItem label="Full Name">
            <DescriptionName name="Nguyen Van A" />
          </DescriptionItem>
          <DescriptionItem label="Date of Birth">
            <DescriptionDate date={new Date('1992-04-18')} />
          </DescriptionItem>
          <DescriptionItem label="Gender">
            <DescriptionBoolean value={true} trueLabel="Male" falseLabel="Female" />
          </DescriptionItem>
          <DescriptionItem label="Notes" orientation="vertical">
            <DescriptionLongText content="Customer has been verified manually by the KYC team. All identity documents are on file and have passed the review process." />
          </DescriptionItem>
        </Description>
        <Description>
          <DescriptionHeader title="Contact" description="Communication channels" />
          <DescriptionItem label="Email">
            <DescriptionCopy value="nguyenvana@example.com" />
          </DescriptionItem>
          <DescriptionItem label="Phone">
            <DescriptionNumberPhone value="+84987654321" />
          </DescriptionItem>
          <DescriptionItem label="Profile">
            <DescriptionLink href="https://example.com/u/nguyenvana" label="View profile" />
          </DescriptionItem>
          <DescriptionItem label="Tags">
            <DescriptionTagList tags={['Admin', 'Verified', 'Premium', 'KYC-passed']} />
          </DescriptionItem>
        </Description>
        <Description>
          <DescriptionHeader title="Account" description="System and subscription details" extra={<DescriptionBadge label="Active" color="success" />} />
          <DescriptionItem label="Status">
            <DescriptionStatus label="Active" color="success" />
          </DescriptionItem>
          <DescriptionItem label="Joined">
            <DescriptionDate date={new Date('2023-06-15')} />
          </DescriptionItem>
          <DescriptionItem label="API Key">
            <DescriptionCopy value="sk-live-abcdefghijklmnopqrstuvwxyz1234567890" />
          </DescriptionItem>
          <DescriptionItem label="Plan">
            <DescriptionBadge label="Enterprise" color="primary" />
          </DescriptionItem>
          <DescriptionItem label="Usage">
            <DescriptionStatistic value={4500000} prefix="₫" trend="up" />
          </DescriptionItem>
        </Description>
      </DescriptionGroup>
    </div>
  ),
};

export const EmptyStates: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="Empty States" description="How each component handles null/undefined" />
      <DescriptionItem label="DescriptionBadge">
        <DescriptionBadge label={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionName">
        <DescriptionName name={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionDate">
        <DescriptionDate date={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionLongText">
        <DescriptionLongText content={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionStatistic">
        <DescriptionStatistic value={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionImages">
        <DescriptionImages images={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionBoolean">
        <DescriptionBoolean value={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionCopy">
        <DescriptionCopy value={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionLink">
        <DescriptionLink href={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionStatus">
        <DescriptionStatus label={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionTagList">
        <DescriptionTagList tags={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionUser">
        <DescriptionUser uuid={null} username={null} email={null} />
      </DescriptionItem>
    </Description>
  ),
};
