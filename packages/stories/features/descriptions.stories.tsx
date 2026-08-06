import {
  Description,
  DescriptionCollapsibleSection,
  DescriptionGroup,
  DescriptionHeader,
  DescriptionItem,
  DescriptionRow,
  DescriptionSearch,
  DescriptionSection,
} from '@/components/features/descriptions';
import {
  DescriptionBadge,
  DescriptionBoolean,
  DescriptionColor,
  DescriptionCopy,
  DescriptionCopyAll,
  DescriptionDate,
  DescriptionEmpty,
  DescriptionFile,
  DescriptionImages,
  DescriptionJson,
  DescriptionLink,
  DescriptionLongText,
  DescriptionName,
  DescriptionNumberPhone,
  DescriptionProgress,
  DescriptionStatistic,
  DescriptionStatus,
  DescriptionTagList,
  DescriptionText,
  DescriptionUser,
} from '@/components/features/descriptions/components';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  tags: ['autodocs'],
  title: 'Features/Descriptions',
  component: Description,
} satisfies Meta<typeof Description>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Test helpers ──────────────────────────────────────────────────────────────

/** Radix portals tooltip content to `document.body`, so `within(canvasElement)` can never see it. */
const tooltipContent = () => document.body.querySelector('[data-slot="tooltip-content"]');

/** Chromium exposes `navigator.clipboard` as a prototype getter; `defineProperty` shadows it with an own, stubbable prop. */
const stubClipboard = () => {
  const writeText = fn(async () => {});
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
  return writeText;
};

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rows = canvasElement.querySelectorAll('[data-slot="description-item"]');
    await expect(rows.length).toBe(8);
    for (const row of rows) {
      await expect(row).toHaveAttribute('data-orientation', 'horizontal');
      await expect(row.querySelector('[data-slot="description-item-label"]')).toBeInTheDocument();
      await expect(row.querySelector('[data-slot="description-item-value"]')).toBeInTheDocument();
    }
    // The formatted Vietnamese phone number, not the raw/garbled input.
    await expect(canvas.getByText('0987 654 321')).toBeInTheDocument();
    await expect(canvasElement.querySelector('[data-slot="description-empty"]')).toHaveAttribute('aria-label', 'Empty value');
  },
};

export const LongLabel: Story = {
  name: 'Long label — truncates with tooltip (never wraps)',
  render: () => (
    // Fixed, very narrow width so the long label reliably overflows regardless of the Storybook canvas's
    // own width or the test runner's font rendering/metrics — the tooltip only mounts when the label is
    // *actually* clipped, so an unconstrained (or only moderately narrow) width risks rendering it wide
    // enough to fit the text without truncating, especially if a fallback font measures narrower.
    <div style={{ width: 200 }}>
      <Description>
        <DescriptionItem label="A very long field label that would otherwise wrap onto a second line">
          <DescriptionText value="Value" />
        </DescriptionItem>
        <DescriptionItem label="Ngày tạo đơn hàng và xác nhận thanh toán từ cổng thanh toán đối tác">
          <DescriptionDate date={new Date()} />
        </DescriptionItem>
        <DescriptionItem label="Short" orientation="vertical">
          <DescriptionText value="Vertical items get the same treatment" />
        </DescriptionItem>
        <DescriptionItem label="Nhãn rất dài để kiểm tra hành vi cắt chữ ở chế độ hiển thị dọc" orientation="vertical">
          <DescriptionText value="Value" />
        </DescriptionItem>
      </Description>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('[data-slot="description-item-label"]');
    for (const row of rows) {
      const label = row.querySelector('span.truncate');
      if (!(label instanceof HTMLElement)) throw new Error('label span missing');
      // A single line of text never exceeds its own line-height — proves it isn't wrapping to a second line.
      await expect(label.getBoundingClientRect().height).toBeLessThan(24);
    }

    const canvas = within(canvasElement);
    const longLabelText = 'A very long field label that would otherwise wrap onto a second line';
    // The Tooltip wrapper mounts asynchronously (after useLayoutEffect + ResizeObserver measure the
    // truncation), swapping in a *new* span — querying once before that settles and reusing the reference
    // would hover a node React has already replaced. Wait for the swap, then re-query fresh right before hovering.
    await waitFor(() => expect(canvas.getByText(longLabelText)).toHaveAttribute('data-state', 'closed'));
    await userEvent.hover(canvas.getByText(longLabelText));
    await waitFor(() => expect(tooltipContent()).toHaveTextContent(longLabelText));
    await userEvent.unhover(canvas.getByText(longLabelText));
    // Radix keeps the content element mounted after close (toggles data-state for its exit animation)
    // rather than removing it from the DOM, so assert the closed state instead of expecting it gone.
    await waitFor(() => expect(tooltipContent()).toHaveAttribute('data-state', 'closed'));

    // A label that already fits (no ellipsis) shouldn't get a Tooltip wrapper at all — hovering it must not open one.
    // (The prior long-label tooltip eventually unmounts entirely once its close animation finishes — Radix's
    // Presence only keeps it around for the animation's duration, not indefinitely — so tooltipContent() may
    // legitimately be null here; guard before asserting on it instead of calling a jest-dom matcher on null.)
    const shortLabel = canvas.getByText('Short');
    await expect(shortLabel).not.toHaveAttribute('data-slot', 'tooltip-trigger');
    await userEvent.hover(shortLabel);
    const staleTooltip = tooltipContent();
    if (staleTooltip) await expect(staleTooltip).not.toHaveAttribute('data-state', 'open');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvasElement.querySelector('[data-slot="description-header"]');
    if (!(header instanceof HTMLElement)) throw new Error('header missing');

    await expect(header).toBeInTheDocument();
    const style = getComputedStyle(header);
    await expect(style.position).toBe('sticky');
    await expect(style.zIndex).toBe('30');
    await expect(header.querySelector('[data-slot="description-header-extra"]')).toBeInTheDocument();

    const phone = canvas.getByText('0987 654 321');
    await userEvent.hover(phone);
    await waitFor(() => expect(tooltipContent()).toHaveTextContent('+84 987 654 321'));
    await userEvent.unhover(phone);
    // Radix keeps the content element mounted after close (toggles data-state for its exit animation)
    // rather than removing it from the DOM, so assert the closed state instead of expecting it gone.
    await waitFor(() => expect(tooltipContent()).toHaveAttribute('data-state', 'closed'));
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sections = canvasElement.querySelectorAll('[data-slot="description-section"]');
    await expect(sections.length).toBe(3);
    for (const title of ['Basic Info', 'Customer', 'Financials']) {
      await expect(canvas.getByText(title)).toBeInTheDocument();
    }
    // vi-VN grouping: 4500000 → "4.500.000". Prefix/value render as separate elements, so assert
    // combined textContent (toHaveTextContent) rather than getByText, which only matches a single element's own text.
    const totalStatistic = canvasElement.querySelector('[data-slot="description-statistic"]');
    await expect(totalStatistic).toHaveTextContent('₫4.500.000');
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const successRow = canvas.getByText('Active').closest('[data-slot="description-status"]');
    await expect(successRow?.querySelector('span')).toBeInTheDocument();

    const noDotRow = canvas.getByText('Draft').closest('[data-slot="description-status"]');
    await expect(noDotRow?.querySelector('span')).not.toBeInTheDocument();

    await expect(canvas.getByText('+3')).toBeInTheDocument();

    const externalLink = canvas.getByText('Visit Example').closest('a');
    await expect(externalLink).toHaveAttribute('target', '_blank');
    await expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');

    const internalLink = canvas.getByText('View Profile').closest('a');
    await expect(internalLink).not.toHaveAttribute('target');

    // DescriptionBoolean value={null} and DescriptionUser with no uuid/username both fall back to DescriptionEmpty.
    const emptyValues = canvasElement.querySelectorAll('[data-slot="description-empty"]');
    await expect(emptyValues.length).toBeGreaterThanOrEqual(2);
  },
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
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('[data-slot="description-item"]');
    await expect(rows.length).toBe(3);
    for (const row of rows) {
      await expect(row).toHaveAttribute('data-orientation', 'vertical');
      // Vertical mode must not build a UIGrid — that's the horizontal-only responsive-column mechanism.
      await expect(row.querySelector('[data-slot="ui-grid"]')).toBeNull();
    }
  },
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
  play: async ({ canvas }) => {
    for (const text of ['Regenerate', 'Edit']) {
      const badges = canvas.getAllByText(text);
      for (const badge of badges) {
        const action = badge.closest('[data-slot="description-item-action"]');
        await expect(action).toBeInTheDocument();
        await expect(action?.closest('[data-slot="description-item-label"]')).toBeInTheDocument();
      }
    }
  },
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
  play: async ({ canvasElement }) => {
    const outer = canvasElement.querySelector('[data-slot="description"]');
    await expect(outer).toHaveAttribute('data-surface', 'card');

    const inner = outer?.querySelector('[data-slot="description"]');
    await expect(inner).toHaveAttribute('data-surface', 'nested');
  },
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Description loading />
      <Description loading loadingRows={6} />
      <Description loading loadingRows={2} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const panels = canvasElement.querySelectorAll('[data-slot="description"]');
    const expectedRows = [4, 6, 2];

    for (const [i, panel] of panels.entries()) {
      await expect(panel.querySelectorAll('[data-slot="description-loading-row"]').length).toBe(expectedRows[i]);
      await expect(panel.querySelector('[data-slot="description-loading-header"]')).toBeInTheDocument();
      await expect(panel.querySelector('[data-slot="description-item"]')).toBeNull();
    }
  },
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
  play: async ({ canvasElement }) => {
    const panel = canvasElement.querySelector('[data-slot="description"]');
    const header = canvasElement.querySelector('[data-slot="description-header"]');
    if (!(panel instanceof HTMLElement) || !(header instanceof HTMLElement)) throw new Error('panel/header missing');

    panel.scrollTop = 200;
    await waitFor(() => {
      const panelTop = panel.getBoundingClientRect().top;
      const headerTop = header.getBoundingClientRect().top;
      // Allow ~1px for border/subpixel rounding — anything beyond that would mean sticky isn't holding.
      expect(Math.abs(panelTop - headerTop)).toBeLessThanOrEqual(1);
    });
  },
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
  play: async ({ canvasElement }) => {
    const group = canvasElement.querySelector('[data-slot="description-group"]');
    await expect(group).toBeInTheDocument();

    const panels = group?.querySelectorAll(':scope > [data-slot="description"]') ?? [];
    await expect(panels.length).toBe(3);
    for (const panel of panels) {
      await expect(panel).toHaveAttribute('data-surface', 'grouped');
      const header = panel.querySelector('[data-slot="description-header"]');
      if (!(header instanceof HTMLElement)) throw new Error('header missing');
      await expect(getComputedStyle(header).zIndex).toBe('30');
    }
  },
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
      <DescriptionItem label="DescriptionNumberPhone">
        <DescriptionNumberPhone value={null} />
      </DescriptionItem>
      <DescriptionItem label="DescriptionText">
        <DescriptionText value={null} />
      </DescriptionItem>
    </Description>
  ),
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('[data-slot="description-item"]');
    const emptyValues = canvasElement.querySelectorAll('[data-slot="description-empty"]');
    // Every single value cell above null-guards — this is the regression class that shipped as the DescriptionNumberPhone crash bug.
    await expect(emptyValues.length).toBe(rows.length);
  },
};

export const CopyToClipboard: Story = {
  render: () => (
    <Description>
      <DescriptionItem label="API Key">
        <DescriptionCopy value="sk-live-test-1234567890" />
      </DescriptionItem>
    </Description>
  ),
  play: async ({ canvasElement }) => {
    const writeText = stubClipboard();
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await expect(button).toHaveAttribute('data-copied', 'false');

    await userEvent.click(button);
    await expect(writeText).toHaveBeenCalledWith('sk-live-test-1234567890');
    await waitFor(() => expect(button).toHaveAttribute('data-copied', 'true'));
    await waitFor(() => expect(button).toHaveAttribute('data-copied', 'false'), { timeout: 2500 });

    // Clicking twice in a row must not leave a stale timer / crash — each click restarts the 1.5s window.
    await userEvent.click(button);
    await userEvent.click(button);
    await waitFor(() => expect(button).toHaveAttribute('data-copied', 'true'));
    await waitFor(() => expect(button).toHaveAttribute('data-copied', 'false'), { timeout: 2500 });
  },
};

const RESPONSIVE_LABEL_PREVIEWS: { label: string; width: number; expectedRatio: number }[] = [
  { label: 'Narrow (SidePanel-like) — 320px', width: 320, expectedRatio: 5 / 12 },
  { label: 'Medium — 420px', width: 420, expectedRatio: 4 / 12 },
  { label: 'Wide (full page) — 700px', width: 700, expectedRatio: 3 / 12 },
];

export const ResponsiveLabelColumn: Story = {
  name: 'Responsive label column — fixed-width previews',
  render: () => (
    <div className="flex flex-col gap-6">
      {RESPONSIVE_LABEL_PREVIEWS.map(({ label, width }) => (
        <div key={label}>
          <p className="mb-1 text-xs font-medium text-text-positive-weak">
            {label} — container fixed at <span className="font-number">{width}px</span>
          </p>
          <div style={{ width }} className="rounded-md border border-border border-dashed p-2">
            <Description>
              <DescriptionItem label="Label">
                <DescriptionText value="Value" />
              </DescriptionItem>
            </Description>
          </div>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Proves the container queries actually resolve — this is what the old inline-style grid couldn't do responsively at all.
    const rows = Array.from(canvasElement.querySelectorAll('[data-slot="description-item"]'));
    await expect(rows.length).toBe(RESPONSIVE_LABEL_PREVIEWS.length);

    rows.forEach((row, i) => {
      const label = row.querySelector('[data-slot="description-item-label"]');
      if (!(label instanceof HTMLElement)) throw new Error('label missing');
      const rowWidth = row.getBoundingClientRect().width;
      const labelWidth = label.getBoundingClientRect().width;
      const ratio = labelWidth / rowWidth;
      const { expectedRatio } = RESPONSIVE_LABEL_PREVIEWS[i];
      expect(ratio).toBeGreaterThan(expectedRatio - 0.05);
      expect(ratio).toBeLessThan(expectedRatio + 0.05);
    });
  },
};

// ─── Enterprise feature set ─────────────────────────────────────────────────────

export const MultiColumnRow: Story = {
  name: 'DescriptionRow — multi-column layout',
  render: () => (
    <Description>
      <DescriptionHeader title="Shipping address" />
      <DescriptionRow columns={2}>
        <DescriptionItem label="First name">
          <DescriptionText value="John" />
        </DescriptionItem>
        <DescriptionItem label="Last name">
          <DescriptionText value="Doe" />
        </DescriptionItem>
      </DescriptionRow>
      <DescriptionRow columns={3} divided>
        <DescriptionItem label="City" orientation="vertical">
          <DescriptionText value="Hà Nội" />
        </DescriptionItem>
        <DescriptionItem label="District" orientation="vertical">
          <DescriptionText value="Cầu Giấy" />
        </DescriptionItem>
        <DescriptionItem label="Ward" orientation="vertical">
          <DescriptionText value="Dịch Vọng" />
        </DescriptionItem>
      </DescriptionRow>
      <DescriptionItem label="Full-width item after the rows">
        <DescriptionText value="Still lays out full width" />
      </DescriptionItem>
    </Description>
  ),
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('[data-slot="description-row"]');
    await expect(rows.length).toBe(2);

    const firstRow = rows[0] as HTMLElement;
    const cells = Array.from(firstRow.querySelectorAll('[data-slot="description-row-cell"]')) as HTMLElement[];
    await expect(cells.length).toBe(2);
    const rowWidth = firstRow.getBoundingClientRect().width;
    for (const cell of cells) {
      const ratio = cell.getBoundingClientRect().width / rowWidth;
      expect(ratio).toBeGreaterThan(0.4);
      expect(ratio).toBeLessThan(0.6);
    }
    // Every item inside a row must not draw its own bottom rule — the row wrapper owns it
    // (an item wrapped in a UIGridItem becomes an only-child, so plain `last:border-b-0` would otherwise fire on every one).
    for (const cell of cells) {
      const item = cell.querySelector('[data-slot="description-item"]');
      if (!(item instanceof HTMLElement)) throw new Error('item missing');
      expect(getComputedStyle(item).borderBottomWidth).toBe('0px');
    }
    await expect(getComputedStyle(firstRow).borderBottomWidth).toBe('1px');

    const secondRow = rows[1] as HTMLElement;
    const dividedCells = Array.from(secondRow.querySelectorAll('[data-slot="description-row-cell"]')) as HTMLElement[];
    await expect(dividedCells.length).toBe(3);
    await expect(getComputedStyle(dividedCells[0]).borderRightWidth).toBe('1px');
    await expect(getComputedStyle(dividedCells[2]).borderRightWidth).toBe('0px');

    const items = canvasElement.querySelectorAll('[data-slot="description-item"]');
    const standalone = items[items.length - 1];
    await expect(standalone.closest('[data-slot="description-row"]')).toBeNull();
  },
};

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map(size => (
        <div key={size}>
          <p className="mb-1 text-xs font-medium text-text-positive-weak">
            size=&quot;{size}&quot;{size === 'md' && ' (default)'}
          </p>
          <Description size={size}>
            <DescriptionHeader title={`Panel — ${size}`} />
            <DescriptionItem label="Label">
              <DescriptionText value="Value" />
            </DescriptionItem>
          </Description>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const labels = Array.from(canvasElement.querySelectorAll('[data-slot="description-item-label"]')) as HTMLElement[];
    await expect(labels.length).toBe(SIZES.length);
    const fontSizes = labels.map(el => Number.parseFloat(getComputedStyle(el).fontSize));
    const paddings = labels.map(el => Number.parseFloat(getComputedStyle(el).paddingTop));
    for (let i = 1; i < fontSizes.length; i++) {
      expect(fontSizes[i]).toBeGreaterThanOrEqual(fontSizes[i - 1]);
      expect(paddings[i]).toBeGreaterThanOrEqual(paddings[i - 1]);
    }
  },
};

export const Borderless: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Description bordered={false}>
        <DescriptionHeader title="No borders" />
        <DescriptionItem label="Label">
          <DescriptionText value="Value" />
        </DescriptionItem>
      </Description>
      <Description>
        <DescriptionHeader title="With borders (default)" />
        <DescriptionItem label="Label">
          <DescriptionText value="Value" />
        </DescriptionItem>
      </Description>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const panels = canvasElement.querySelectorAll('[data-slot="description"]');
    const [borderless, bordered] = Array.from(panels) as HTMLElement[];

    await expect(getComputedStyle(borderless).borderTopWidth).toBe('0px');
    // Tailwind v4 implements `shadow-none`/`ring-0` as zero-sized layers in a stacked box-shadow value
    // rather than the literal "none" keyword, so compare against the bordered panel instead of an exact string.
    await expect(getComputedStyle(borderless).boxShadow).not.toBe(getComputedStyle(bordered).boxShadow);
    const borderlessLabel = borderless.querySelector('[data-slot="description-item-label"]') as HTMLElement;
    await expect(getComputedStyle(borderlessLabel).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(getComputedStyle(borderlessLabel).borderRightWidth).toBe('0px');

    await expect(getComputedStyle(bordered).borderTopWidth).toBe('1px');
    const borderedLabel = bordered.querySelector('[data-slot="description-item-label"]') as HTMLElement;
    await expect(getComputedStyle(borderedLabel).borderRightWidth).toBe('1px');
  },
};

export const SizeInheritance: Story = {
  render: () => (
    <DescriptionGroup size="sm">
      <Description>
        <DescriptionHeader title="Inherits sm from the group" />
        <DescriptionItem label="Label">
          <DescriptionText value="Value" />
        </DescriptionItem>
      </Description>
      <Description size="lg">
        <DescriptionHeader title="Overrides to lg" />
        <DescriptionItem label="Label">
          <DescriptionText value="Value" />
        </DescriptionItem>
      </Description>
    </DescriptionGroup>
  ),
  play: async ({ canvasElement }) => {
    const labels = canvasElement.querySelectorAll('[data-slot="description-item-label"]');
    const [inherited, overridden] = Array.from(labels) as HTMLElement[];
    const inheritedSize = Number.parseFloat(getComputedStyle(inherited).fontSize);
    const overriddenSize = Number.parseFloat(getComputedStyle(overridden).fontSize);
    expect(overriddenSize).toBeGreaterThan(inheritedSize);
  },
};

export const CollapsibleSections: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="User" />
      <DescriptionCollapsibleSection title="Basic info">
        <DescriptionItem label="Name">
          <DescriptionText value="Nguyen Van A" />
        </DescriptionItem>
      </DescriptionCollapsibleSection>
      <DescriptionCollapsibleSection title="Advanced" defaultOpen={false}>
        <DescriptionItem label="Internal ID">
          <DescriptionText value="usr_01hv3k9x2b" />
        </DescriptionItem>
      </DescriptionCollapsibleSection>
      <DescriptionCollapsibleSection title="Not collapsible" collapsible={false}>
        <DescriptionItem label="Always visible">
          <DescriptionText value="Value" />
        </DescriptionItem>
      </DescriptionCollapsibleSection>
    </Description>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const allSections = canvasElement.querySelectorAll('[data-slot="description-collapsible-section"]');
    await expect(allSections.length).toBe(3);

    const advancedTrigger = canvas.getByText('Advanced').closest('button');
    if (!(advancedTrigger instanceof HTMLElement)) throw new Error('trigger missing');
    const advancedContent = advancedTrigger.parentElement?.querySelector('[data-slot="description-collapsible-section-content"]');
    if (!(advancedContent instanceof HTMLElement)) throw new Error('content missing');

    await expect(advancedTrigger).toHaveAttribute('data-state', 'closed');
    // forceMount keeps "Internal ID" mounted (so search can still match it while collapsed) — collapsed
    // means near-zero rendered height, not absent from the DOM, so assert height rather than jest-dom visibility.
    // The collapse animation plays on mount too (data-state is already "closed" on first render), so wait
    // for it to finish rather than asserting on the pre-animation height.
    await waitFor(() => expect(advancedContent.getBoundingClientRect().height).toBeLessThan(2));

    const chevron = advancedTrigger.querySelector('svg');
    if (!(chevron instanceof SVGElement)) throw new Error('chevron missing');
    // Tailwind v4 emits rotate/scale/translate as their own standalone CSS properties rather than
    // bundling them into `transform`, so the rotation shows up on `.rotate`, not `.transform` (which
    // stays "none" the whole time here).
    const closedRotate = getComputedStyle(chevron).rotate;

    await userEvent.click(advancedTrigger);
    await waitFor(() => expect(advancedTrigger).toHaveAttribute('data-state', 'open'));
    await waitFor(() => expect(advancedContent.getBoundingClientRect().height).toBeGreaterThan(10));
    const openRotate = getComputedStyle(chevron).rotate;
    expect(openRotate).not.toBe(closedRotate);

    await userEvent.click(advancedTrigger);
    await waitFor(() => expect(advancedTrigger).toHaveAttribute('data-state', 'closed'));

    // The non-collapsible section renders a static (non-button) header and its children stay visible.
    const staticTrigger = canvas.getByText('Not collapsible').closest('[data-slot="description-collapsible-section-trigger"]');
    await expect(staticTrigger?.tagName).toBe('DIV');
    await expect(canvas.getByText('Always visible')).toBeVisible();
  },
};

export const NewValueCells: Story = {
  render: () => (
    <Description>
      <DescriptionItem label="JSON">
        <DescriptionJson value={{ id: 1, name: 'Áo thun', tags: ['sale', 'new'] }} />
      </DescriptionItem>
      <DescriptionItem label="File (with URL)">
        <DescriptionFile name="invoice.pdf" url="https://example.com/invoice.pdf" size={204800} />
      </DescriptionItem>
      <DescriptionItem label="File (pending)">
        <DescriptionFile name="uploading.png" />
      </DescriptionItem>
      <DescriptionItem label="Color">
        <DescriptionColor value="#4f46e5" />
      </DescriptionItem>
      <DescriptionItem label="Progress">
        <DescriptionProgress value={72} />
      </DescriptionItem>
      <DescriptionItem label="Progress zero">
        <DescriptionProgress value={0} color="danger" />
      </DescriptionItem>
    </Description>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const writeText = stubClipboard();

    const jsonBlock = canvasElement.querySelector('[data-slot="description-json"] pre');
    if (!(jsonBlock instanceof HTMLElement)) throw new Error('json block missing');
    await expect(getComputedStyle(jsonBlock).overflow).toBe('auto');
    await expect(getComputedStyle(jsonBlock).maxHeight).toBe('240px');

    const jsonCopyBtn = canvasElement.querySelector('[data-slot="description-json-copy"]');
    if (!(jsonCopyBtn instanceof HTMLElement)) throw new Error('json copy button missing');
    await userEvent.click(jsonCopyBtn);
    await expect(writeText).toHaveBeenCalledWith(JSON.stringify({ id: 1, name: 'Áo thun', tags: ['sale', 'new'] }, null, 2));

    const fileLink = canvas.getByText('invoice.pdf').closest('a');
    await expect(fileLink).toHaveAttribute('download', 'invoice.pdf');
    await expect(canvas.getByText('200 KB')).toBeInTheDocument();
    await expect(canvas.getByText('uploading.png').closest('a')).toBeNull();

    const swatch = canvasElement.querySelector('[data-slot="description-color"] span');
    if (!(swatch instanceof HTMLElement)) throw new Error('swatch missing');
    await expect(getComputedStyle(swatch).backgroundColor).toBe('rgb(79, 70, 229)');

    const progressBars = canvasElement.querySelectorAll('[data-slot="description-progress"]');
    await expect(progressBars.length).toBe(2);
    const zeroProgress = progressBars[1] as HTMLElement;
    await expect(zeroProgress.querySelector('[data-slot="description-empty"]')).toBeNull();
    await expect(within(zeroProgress).getByText('0%')).toBeInTheDocument();
  },
};

export const NewValueCellsEmptyStates: Story = {
  render: () => (
    <Description>
      <DescriptionItem label="JSON">
        <DescriptionJson value={null} />
      </DescriptionItem>
      <DescriptionItem label="File">
        <DescriptionFile name={null} />
      </DescriptionItem>
      <DescriptionItem label="Color">
        <DescriptionColor value={null} />
      </DescriptionItem>
      <DescriptionItem label="Progress">
        <DescriptionProgress value={null} />
      </DescriptionItem>
    </Description>
  ),
  play: async ({ canvasElement }) => {
    const emptyValues = canvasElement.querySelectorAll('[data-slot="description-empty"]');
    await expect(emptyValues.length).toBe(4);
  },
};

export const SearchFilter: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="Contact" extra={<DescriptionSearch />} />
      <DescriptionItem label="Email">
        <DescriptionText value="an@example.com" />
      </DescriptionItem>
      <DescriptionItem label="Phone">
        <DescriptionText value="0987654321" />
      </DescriptionItem>
      <DescriptionItem label="Điện thoại phụ">
        <DescriptionText value="Second phone field" />
      </DescriptionItem>
    </Description>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Tìm kiếm...');

    await userEvent.type(input, 'mail');
    await waitFor(() => {
      const emailItem = canvas.getByText('Email').closest('[data-slot="description-item"]');
      const phoneItem = canvas.getByText('Phone').closest('[data-slot="description-item"]');
      expect(emailItem).not.toHaveAttribute('data-search-hidden');
      expect(phoneItem).toHaveAttribute('data-search-hidden');
    });

    // Only the visible item keeps a bottom rule — proves the "last visible row" selector, not just "last DOM row".
    const emailItem = canvas.getByText('Email').closest('[data-slot="description-item"]') as HTMLElement;
    await expect(getComputedStyle(emailItem).borderBottomWidth).toBe('0px');

    await userEvent.clear(input);
    await userEvent.type(input, 'dien thoai');
    await waitFor(() => {
      expect(canvas.getByText('Điện thoại phụ').closest('[data-slot="description-item"]')).not.toHaveAttribute('data-search-hidden');
    });

    const clearBtn = canvasElement.querySelector('[data-slot="description-search-clear"]');
    if (!(clearBtn instanceof HTMLElement)) throw new Error('clear button missing');
    await userEvent.click(clearBtn);
    await waitFor(() => {
      for (const item of canvasElement.querySelectorAll('[data-slot="description-item"]')) {
        expect(item).not.toHaveAttribute('data-search-hidden');
      }
    });
  },
};

export const SearchWithSections: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="Profile" extra={<DescriptionSearch />} />
      <DescriptionCollapsibleSection title="Contact" defaultOpen={false}>
        <DescriptionItem label="Email">
          <DescriptionText value="an@example.com" />
        </DescriptionItem>
      </DescriptionCollapsibleSection>
      <DescriptionCollapsibleSection title="Billing" defaultOpen={false}>
        <DescriptionItem label="Card number">
          <DescriptionText value="**** 4242" />
        </DescriptionItem>
      </DescriptionCollapsibleSection>
    </Description>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Tìm kiếm...');

    const contactTrigger = canvas.getByText('Contact').closest('[data-slot="description-collapsible-section"]');
    const billingSection = canvas.getByText('Billing').closest('[data-slot="description-collapsible-section"]');
    if (!(contactTrigger instanceof HTMLElement) || !(billingSection instanceof HTMLElement)) throw new Error('sections missing');
    await expect(contactTrigger).toHaveAttribute('data-state', 'closed');

    // A query matching an item inside a closed section auto-opens that section (the item was force-mounted,
    // so it could register its match even while collapsed) and leaves the non-matching section hidden.
    await userEvent.type(input, 'email');
    await waitFor(() => expect(contactTrigger).toHaveAttribute('data-state', 'open'));
    await expect(contactTrigger).not.toHaveAttribute('data-search-hidden');
    await waitFor(() => expect(billingSection).toHaveAttribute('data-search-hidden'));

    await userEvent.clear(input);
    await userEvent.type(input, 'billing');
    await waitFor(() => expect(billingSection).not.toHaveAttribute('data-search-hidden'));
  },
};

export const CopyAllPanel: Story = {
  render: () => (
    <Description>
      <DescriptionHeader title="Order #ORD-20240001" extra={<DescriptionCopyAll />} />
      <DescriptionSection title="Basic Info" />
      <DescriptionItem label="Status">
        <DescriptionStatus label="Pending" color="warning" />
      </DescriptionItem>
      <DescriptionItem label="Total">
        <DescriptionStatistic value={4500000} prefix="₫" />
      </DescriptionItem>
    </Description>
  ),
  play: async ({ canvasElement }) => {
    const writeText = stubClipboard();
    const button = canvasElement.querySelector('[data-slot="description-copy-all"]');
    if (!(button instanceof HTMLElement)) throw new Error('copy-all button missing');

    await expect(button).toHaveAttribute('data-copied', 'false');
    await userEvent.click(button);

    await waitFor(() => expect(writeText).toHaveBeenCalled());
    await expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Order #ORD-20240001'));
    await expect(writeText).toHaveBeenCalledWith(expect.stringContaining('[Basic Info]'));
    await expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Status: Pending'));
    await expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Total: ₫4.500.000'));
    await waitFor(() => expect(button).toHaveAttribute('data-copied', 'true'));
    await waitFor(() => expect(button).toHaveAttribute('data-copied', 'false'), { timeout: 2500 });
  },
};
