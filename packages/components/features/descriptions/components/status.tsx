'use client';

import { cn } from '@customafk/react-toolkit/utils';

import type { BadgeProps } from '@/components/ui/badge';
import { Badge, badgeDotVariants } from '@/components/ui/badge';

import { DescriptionEmpty } from './empty';

type StatusColor = NonNullable<BadgeProps['color']>;

type DescriptionStatusProps = {
  /** Status text. */
  label: string | null | undefined;
  /**
   * Badge color.
   * @default 'info'
   */
  color?: StatusColor;
  /**
   * Show a dot before the text.
   * @default true
   */
  dot?: boolean;
};

/**
 * A solid status badge with an optional white dot — for lifecycle states. Renders
 * `DescriptionEmpty` when there is nothing to show.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="…">
 *   <DescriptionStatus label="Đang giao" color="info" />
 * </DescriptionItem>
 * ```
 */
export const DescriptionStatus: React.FC<DescriptionStatusProps> = ({ label, color = 'info', dot = true }) => {
  if (!label) return <DescriptionEmpty />;
  return (
    <Badge data-slot="description-status" pill={false} variant="solid" color={color} size="sm" className={cn('min-w-20 gap-1.5', dot && 'pr-3')}>
      {!!dot && <span className={badgeDotVariants({ color: 'white' })} />}
      {label}
    </Badge>
  );
};
