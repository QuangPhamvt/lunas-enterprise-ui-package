'use client';

import type { BadgeProps } from '@/components/ui/badge';
import { Badge } from '@/components/ui/badge';

import { DescriptionEmpty } from './empty';

type DescriptionBadgeProps = {
  /** Badge text. */
  label: string | number | null | undefined;
  /**
   * Badge color.
   * @default 'secondary'
   */
  color?: BadgeProps['color'];
  /**
   * Badge fill style.
   * @default 'soft'
   */
  variant?: BadgeProps['variant'];
  /**
   * Badge size.
   * @default 'sm'
   */
  size?: BadgeProps['size'];
};

/**
 * A single soft badge — for categories, types and short enum values. Renders `DescriptionEmpty`
 * when there is nothing to show.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="…">
 *   <DescriptionBadge label={order.channel} color="info" />
 * </DescriptionItem>
 * ```
 */
export const DescriptionBadge: React.FC<DescriptionBadgeProps> = ({ label, color = 'secondary', variant = 'soft', size = 'sm' }) => {
  if (!label) return <DescriptionEmpty />;
  return (
    <Badge data-slot="description-badge" pill={false} color={color} variant={variant} size={size} className="min-w-20">
      {label}
    </Badge>
  );
};
