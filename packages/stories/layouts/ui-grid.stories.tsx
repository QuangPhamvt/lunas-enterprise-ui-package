import { lazy, useEffect, useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { UIGrid, UIGridItem } from '@/components/layouts/ui-grid';

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="border-border-weak flex size-full min-h-24 items-center justify-center rounded-md border bg-primary-bg-subtle text-sm font-medium text-primary">
      {children}
    </div>
  );
};

/** Same 7-tier scale as `TUIGridBreakpoint` — kept in sync manually since the component's map is a private module-scope constant. */
const BREAKPOINT_THRESHOLDS: { label: string; minWidth: number }[] = [
  { label: '3xl', minWidth: 768 },
  { label: '2xl', minWidth: 672 },
  { label: 'xl', minWidth: 576 },
  { label: 'lg', minWidth: 512 },
  { label: 'md', minWidth: 448 },
  { label: 'sm', minWidth: 384 },
  { label: 'base', minWidth: 0 },
];

function activeBreakpointLabel(width: number): string {
  const match = BREAKPOINT_THRESHOLDS.find(bp => width >= bp.minWidth);
  return match ? `${match.label} (≥${match.minWidth}px)` : 'base';
}

/**
 * Wraps `children` in a horizontally-resizable box and shows a live readout of
 * the box's current width plus which `TUIGridBreakpoint` tier is active — so a
 * reader dragging the resize handle can see cause (width) and effect
 * (breakpoint match) at the same time, instead of having to infer it from the
 * grid's visual layout alone.
 */
const ResizableDemo: React.FC<React.PropsWithChildren<{ initialWidth?: number }>> = ({ children, initialWidth = 700 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(initialWidth);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => setWidth(Math.round(entries[0].contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-text-positive-weak">
        Container width: <span className="font-number">{width}px</span> → active breakpoint:{' '}
        <span className="font-semibold text-primary">{activeBreakpointLabel(width)}</span>
      </p>
      <div
        ref={ref}
        style={{ resize: 'horizontal', overflow: 'auto', width: initialWidth, minWidth: 260, maxWidth: '100%' }}
        className="rounded-md border border-border border-dashed p-2"
      >
        {children}
      </div>
    </div>
  );
};

/** Fixed preview widths, one comfortably inside each breakpoint tier's range, used by the "breakdown" stories to show every tier side by side without requiring interaction. */
const BREAKPOINT_PREVIEW_WIDTHS: { label: string; width: number }[] = [
  { label: 'base — below 384px', width: 320 },
  { label: 'sm — from 384px', width: 420 },
  { label: 'md — from 448px', width: 480 },
  { label: 'lg — from 512px', width: 560 },
  { label: 'xl — from 576px', width: 620 },
  { label: '2xl — from 672px', width: 700 },
  { label: '3xl — from 768px', width: 800 },
];

const meta = {
  tags: ['autodocs'],
  title: 'Layouts/UIGrid',
  component: UIGrid,
} satisfies Meta<typeof UIGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesignConcept: Story = {
  render: () => (
    <UIGrid gap="md">
      <UIGridItem span={12}>
        <Content>100%</Content>
      </UIGridItem>
      <UIGridItem span={3}>
        <Content>25%</Content>
      </UIGridItem>
      <UIGridItem span={3}>
        <Content>25%</Content>
      </UIGridItem>
      <UIGridItem span={3}>
        <Content>25%</Content>
      </UIGridItem>
      <UIGridItem span={3}>
        <Content>25%</Content>
      </UIGridItem>
      <UIGridItem span={4}>
        <Content>33.33%</Content>
      </UIGridItem>
      <UIGridItem span={4}>
        <Content>33.33%</Content>
      </UIGridItem>
      <UIGridItem span={4}>
        <Content>33.33%</Content>
      </UIGridItem>
      <UIGridItem span={6}>
        <Content>50%</Content>
      </UIGridItem>
      <UIGridItem span={6}>
        <Content>50%</Content>
      </UIGridItem>
      <UIGridItem span={8}>
        <Content>66.66%</Content>
      </UIGridItem>
      <UIGridItem span={4}>
        <Content>33.33%</Content>
      </UIGridItem>
    </UIGrid>
  ),
};

export const ResponsiveSpan: Story = {
  name: 'Responsive Span — drag to resize (live readout)',
  render: () => (
    <ResizableDemo>
      <UIGrid gap="sm">
        <UIGridItem span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <Content>Item A</Content>
        </UIGridItem>
        <UIGridItem span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <Content>Item B</Content>
        </UIGridItem>
        <UIGridItem span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <Content>Item C</Content>
        </UIGridItem>
        <UIGridItem span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <Content>Item D</Content>
        </UIGridItem>
      </UIGrid>
    </ResizableDemo>
  ),
};

export const ResponsiveSpanBreakdown: Story = {
  name: 'Responsive Span — every breakpoint side by side',
  render: () => (
    <div className="flex flex-col gap-6">
      {BREAKPOINT_PREVIEW_WIDTHS.map(({ label, width }) => (
        <div key={label}>
          <p className="mb-1 text-xs font-medium text-text-positive-weak">
            {label} — container fixed at <span className="font-number">{width}px</span>
          </p>
          <div style={{ width }} className="rounded-md border border-border border-dashed p-2">
            <UIGrid gap="sm">
              <UIGridItem span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Content>A</Content>
              </UIGridItem>
              <UIGridItem span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Content>B</Content>
              </UIGridItem>
              <UIGridItem span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Content>C</Content>
              </UIGridItem>
              <UIGridItem span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Content>D</Content>
              </UIGridItem>
            </UIGrid>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ResponsiveCols: Story = {
  name: 'Responsive column count — drag to resize (live readout)',
  render: () => (
    <ResizableDemo>
      <UIGrid gap="sm" cols={{ base: 4, sm: 6, md: 8, lg: 12 }}>
        <UIGridItem span={1}>
          <Content>1</Content>
        </UIGridItem>
        <UIGridItem span={1}>
          <Content>2</Content>
        </UIGridItem>
        <UIGridItem span={1}>
          <Content>3</Content>
        </UIGridItem>
        <UIGridItem span={1}>
          <Content>4</Content>
        </UIGridItem>
        <UIGridItem span={1}>
          <Content>5</Content>
        </UIGridItem>
        <UIGridItem span={1}>
          <Content>6</Content>
        </UIGridItem>
        <UIGridItem span={1}>
          <Content>7</Content>
        </UIGridItem>
        <UIGridItem span={1}>
          <Content>8</Content>
        </UIGridItem>
      </UIGrid>
    </ResizableDemo>
  ),
};

export const ResponsiveColsBreakdown: Story = {
  name: 'Responsive column count — every breakpoint side by side',
  render: () => (
    <div className="flex flex-col gap-6">
      {BREAKPOINT_PREVIEW_WIDTHS.slice(0, 4).map(({ label, width }) => (
        <div key={label}>
          <p className="mb-1 text-xs font-medium text-text-positive-weak">
            {label} — container fixed at <span className="font-number">{width}px</span>
          </p>
          <div style={{ width }} className="rounded-md border border-border border-dashed p-2">
            <UIGrid gap="sm" cols={{ base: 4, sm: 6, md: 8, lg: 12 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <UIGridItem key={n} span={1}>
                  <Content>{n}</Content>
                </UIGridItem>
              ))}
            </UIGrid>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Cols: Story = {
  name: 'Custom column count',
  render: () => (
    <div className="flex flex-col gap-6">
      <UIGrid cols={4} gap="sm">
        <UIGridItem span={2}>
          <Content>span 2 / 4</Content>
        </UIGridItem>
        <UIGridItem span={2}>
          <Content>span 2 / 4</Content>
        </UIGridItem>
      </UIGrid>
      <UIGrid cols={6} gap="sm">
        <UIGridItem span={2}>
          <Content>span 2 / 6</Content>
        </UIGridItem>
        <UIGridItem span={2}>
          <Content>span 2 / 6</Content>
        </UIGridItem>
        <UIGridItem span={2}>
          <Content>span 2 / 6</Content>
        </UIGridItem>
      </UIGrid>
    </div>
  ),
};

const LazyWidget = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>(resolve => {
      setTimeout(() => resolve({ default: () => <Content>Loaded!</Content> }), 1200);
    })
);

export const WithSuspense: Story = {
  name: 'Per-item Suspense boundary',
  render: () => (
    <UIGrid gap="md">
      <UIGridItem span={4} fallback={<Content>Loading…</Content>}>
        <LazyWidget />
      </UIGridItem>
      <UIGridItem span={4}>
        <Content>Renders immediately</Content>
      </UIGridItem>
      <UIGridItem span={4}>
        <Content>Renders immediately</Content>
      </UIGridItem>
    </UIGrid>
  ),
};

export const SuspenseDisabled: Story = {
  name: 'Suspense opted out (suspense=false)',
  render: () => (
    <UIGrid gap="md">
      <UIGridItem span={6} suspense={false}>
        <Content>suspense=false</Content>
      </UIGridItem>
      <UIGridItem span={6}>
        <Content>suspense=true (default)</Content>
      </UIGridItem>
    </UIGrid>
  ),
};

export const DefaultSpan: Story = {
  name: 'Default span (omit the prop)',
  render: () => (
    <UIGrid gap="sm">
      <UIGridItem>
        <Content>span omitted → defaults to 12 (full row)</Content>
      </UIGridItem>
      <UIGridItem>
        <Content>span omitted → defaults to 12 (full row)</Content>
      </UIGridItem>
    </UIGrid>
  ),
};

export const GapVariants: Story = {
  name: 'Gap scale',
  render: () => (
    <div className="flex flex-col gap-8">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map(gap => (
        <div key={gap} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-text-positive-weak">gap="{gap}"</p>
          <UIGrid gap={gap}>
            <UIGridItem span={4}>
              <Content>A</Content>
            </UIGridItem>
            <UIGridItem span={4}>
              <Content>B</Content>
            </UIGridItem>
            <UIGridItem span={4}>
              <Content>C</Content>
            </UIGridItem>
          </UIGrid>
        </div>
      ))}
    </div>
  ),
};

export const NestedGrid: Story = {
  name: 'Nested UIGrid (independent container context)',
  render: () => (
    <UIGrid gap="md">
      <UIGridItem span={12}>
        <Content>Outer row (span 12)</Content>
      </UIGridItem>
      <UIGridItem span={8} suspense={false}>
        <div className="rounded-md border border-border-weak p-2">
          <p className="mb-2 text-xs font-medium text-text-positive-weak">Nested UIGrid inside this item (span 8 of the outer grid)</p>
          <UIGrid gap="sm" cols={6}>
            <UIGridItem span={2}>
              <Content>Nested 2/6</Content>
            </UIGridItem>
            <UIGridItem span={2}>
              <Content>Nested 2/6</Content>
            </UIGridItem>
            <UIGridItem span={2}>
              <Content>Nested 2/6</Content>
            </UIGridItem>
          </UIGrid>
        </div>
      </UIGridItem>
      <UIGridItem span={4} suspense={false}>
        <Content>Sibling (span 4)</Content>
      </UIGridItem>
    </UIGrid>
  ),
};

export const NestedGridIndependentResize: Story = {
  name: 'Nested UIGrid responds to its own width, not the outer grid',
  render: () => (
    <UIGrid gap="md" cols={12}>
      <UIGridItem span={12} suspense={false}>
        <Content>Outer grid stays full-bleed — only the inner box below is resizable</Content>
      </UIGridItem>
      <UIGridItem span={12} suspense={false}>
        <ResizableDemo initialWidth={500}>
          <UIGrid gap="sm">
            <UIGridItem span={{ base: 12, sm: 6, md: 4 }}>
              <Content>Nested A</Content>
            </UIGridItem>
            <UIGridItem span={{ base: 12, sm: 6, md: 4 }}>
              <Content>Nested B</Content>
            </UIGridItem>
            <UIGridItem span={{ base: 12, sm: 6, md: 4 }}>
              <Content>Nested C</Content>
            </UIGridItem>
          </UIGrid>
        </ResizableDemo>
      </UIGridItem>
    </UIGrid>
  ),
};

export const DashboardExample: Story = {
  name: 'Practical example: dashboard layout',
  render: () => (
    <UIGrid gap="md" cols={{ base: 4, md: 8, lg: 12 }}>
      <UIGridItem span={{ base: 4, md: 8, lg: 3 }} suspense={false}>
        <Content>Tổng nhân viên: 35</Content>
      </UIGridItem>
      <UIGridItem span={{ base: 4, md: 4, lg: 3 }} suspense={false}>
        <Content>Đang hoạt động: 19</Content>
      </UIGridItem>
      <UIGridItem span={{ base: 4, md: 4, lg: 3 }} suspense={false}>
        <Content>Tổng lương: 1.010.000.000 ₫</Content>
      </UIGridItem>
      <UIGridItem span={{ base: 4, md: 8, lg: 3 }} suspense={false}>
        <Content>Lương trung bình: 28.857.143 ₫</Content>
      </UIGridItem>
      <UIGridItem span={{ base: 4, md: 8, lg: 12 }} suspense={false}>
        <Content>Bảng dữ liệu chính (span full)</Content>
      </UIGridItem>
    </UIGrid>
  ),
};
