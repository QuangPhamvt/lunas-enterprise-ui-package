'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { ChartContainer } from '@/components/ui/chart';

import type { SankeyLinkProps, SankeyNodeProps } from 'recharts';
import { Rectangle, Sankey } from 'recharts';
import type { BaseChartProps } from '../types';
import { getChartColor } from '../utils';

export type SankeyFlowNode = {
  name: string;
  color?: string;
};

export type SankeyFlowLink = {
  /** Node name, matching an entry in `nodes`. */
  source: string;
  /** Node name, matching an entry in `nodes`. */
  target: string;
  value: number;
};

export type SankeyFlowChartProps = BaseChartProps & {
  nodes: Array<SankeyFlowNode | string>;
  links: SankeyFlowLink[];
  valueFormatter?: (value: number) => string;
  nodeWidth?: number;
  nodePadding?: number;
  /** Minimum horizontal space reserved for node labels outside the plot area; grows to fit the longest root/leaf label. Defaults to `170`. */
  labelWidth?: number;
};

/**
 * A Sankey flow diagram — revenue/cost breakdowns, funnels with branching paths, budget
 * allocation — where band width is proportional to the flow value between named nodes.
 *
 * @example
 * ```tsx
 * import { SankeyFlowChart } from '@customafk/lunas-ui/features/charts';
 *
 * <SankeyFlowChart
 *   height={500}
 *   nodes={['iPhone', 'Mac', 'Net Sales', 'Cost of Sales', 'Gross Profit']}
 *   links={[
 *     { source: 'iPhone', target: 'Net Sales', value: 205489 },
 *     { source: 'Mac', target: 'Net Sales', value: 40177 },
 *     { source: 'Net Sales', target: 'Cost of Sales', value: 223546 },
 *     { source: 'Net Sales', target: 'Gross Profit', value: 170782 },
 *   ]}
 * />
 * ```
 */
const estimateLabelWidth = (label: string): number => label.length * 5.6 + 14;

export const SankeyFlowChart = ({
  nodes,
  links,
  valueFormatter = value => value.toLocaleString('en-US'),
  nodeWidth = 14,
  nodePadding = 24,
  labelWidth = 170,
  className,
  animate = true,
  height,
}: SankeyFlowChartProps) => {
  const { data, colorByName, effectiveLabelWidth, rootNames, leafNames } = useMemo(() => {
    const nodeList = nodes.map(node => (typeof node === 'string' ? { name: node } : node));
    const nameToIndex = new Map(nodeList.map((node, index) => [node.name, index]));
    const colors = new Map(nodeList.map((node, index) => [node.name, node.color || getChartColor(index)]));

    const sankeyLinks = links
      .map(link => ({ source: nameToIndex.get(link.source), target: nameToIndex.get(link.target), value: link.value }))
      .filter((link): link is { source: number; target: number; value: number } => link.source !== undefined && link.target !== undefined);

    // Computed from our own link list rather than trusting recharts' `payload.depth`/`sourceLinks`
    // at render time — the latter don't reliably flag terminal (leaf) nodes as such.
    const hasIncoming = new Set(sankeyLinks.map(link => link.target));
    const hasOutgoing = new Set(sankeyLinks.map(link => link.source));
    const roots = new Set(nodeList.filter((_, index) => !hasIncoming.has(index)).map(node => node.name));
    const leaves = new Set(nodeList.filter((_, index) => !hasOutgoing.has(index)).map(node => node.name));

    // Only root/leaf nodes get side labels using this margin; widen it to fit the longest one
    // so long names don't clip past the SVG edge.
    let maxWidth = labelWidth;
    nodeList.forEach((node, index) => {
      if (hasIncoming.has(index) && hasOutgoing.has(index)) return;
      const relatedValue = sankeyLinks.filter(link => link.source === index || link.target === index).reduce((sum, link) => sum + link.value, 0);
      maxWidth = Math.max(maxWidth, estimateLabelWidth(`${node.name}: ${valueFormatter(relatedValue)}`) + 16);
    });

    return { data: { nodes: nodeList, links: sankeyLinks }, colorByName: colors, effectiveLabelWidth: maxWidth, rootNames: roots, leafNames: leaves };
  }, [nodes, links, labelWidth, valueFormatter]);

  return (
    <ChartContainer
      data-slot="sankey-flow-chart"
      config={{}}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <Sankey
        data={data}
        nodeWidth={nodeWidth}
        nodePadding={nodePadding}
        linkCurvature={0.45}
        margin={{ top: 28, right: effectiveLabelWidth, bottom: 8, left: effectiveLabelWidth }}
        node={(props: SankeyNodeProps) => {
          const { x, y, width, height: nodeHeight, payload } = props;
          const color = colorByName.get(payload.name) ?? 'var(--chart-1)';
          const isRoot = rootNames.has(payload.name);
          const isLeaf = leafNames.has(payload.name);
          const label = `${payload.name}: ${valueFormatter(payload.value)}`;
          const pillWidth = estimateLabelWidth(label);
          const pillHeight = 18;

          let textX: number;
          let textY: number;
          let textAnchor: 'start' | 'end' | 'middle';
          let pillX: number;
          let pillY: number;

          if (isRoot || isLeaf) {
            textAnchor = isRoot ? 'end' : 'start';
            textY = y + nodeHeight / 2;
            pillY = textY - pillHeight / 2;
            pillX = isRoot ? x - 8 - pillWidth : x + width + 8;
            textX = isRoot ? pillX + pillWidth - 6 : pillX + 6;
          } else {
            // Intermediate nodes label above the bar (not beside it) so chained, closely-spaced
            // depth columns never collide sideways. Consecutive depths are additionally staggered
            // to two alternating heights (zigzag) — when almost all of a node's value passes
            // straight through to the next depth (e.g. Operating Income -> Profit before tax),
            // both nodes land at nearly the same y, so same-height labels would still overlap.
            textAnchor = 'middle';
            textY = payload.depth % 2 === 0 ? y - 10 : y - 30;
            pillY = textY - pillHeight + 4;
            pillX = x + width / 2 - pillWidth / 2;
            textX = x + width / 2;
          }

          return (
            <g>
              <Rectangle
                className="recharts-sankey-node"
                x={x}
                y={y}
                width={width}
                height={nodeHeight}
                fill={color}
                stroke="var(--background)"
                strokeWidth={1.5}
                isAnimationActive={animate}
              />
              <rect x={pillX} y={pillY} width={pillWidth} height={pillHeight} rx={4} fill="var(--background)" fillOpacity={0.92} />
              <text x={textX} y={textY} textAnchor={textAnchor} dominantBaseline="middle" className="fill-text-positive-strong text-[11px] font-medium">
                {label}
              </text>
            </g>
          );
        }}
        link={(props: SankeyLinkProps) => {
          const { sourceX, sourceY, sourceControlX, targetX, targetY, targetControlX, linkWidth, payload } = props;
          const sourceColor = colorByName.get(payload.source.name) ?? 'var(--chart-1)';
          const targetColor = colorByName.get(payload.target.name) ?? sourceColor;
          // Blending toward the target's color (rather than a flat source-only fill) keeps sibling
          // flows out of the same source visually distinct from each other wherever they run close
          // together or cross — a flat single hue made e.g. Gross Profit's three outgoing flows
          // (-> R&D, -> SG&A, -> Operating Income) indistinguishable from one another.
          const color = `color-mix(in oklch, ${sourceColor} 60%, ${targetColor} 40%)`;
          return (
            <path
              className="recharts-sankey-link"
              d={`M${sourceX},${sourceY} C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
              fill="none"
              stroke={color}
              strokeWidth={linkWidth}
              strokeOpacity={0.4}
            />
          );
        }}
      />
    </ChartContainer>
  );
};
