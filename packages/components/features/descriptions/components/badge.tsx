'use client';

import { Badge } from '@/components/ui/badge';
import type { BadgeProps } from '@/components/ui/badge';

import { DescriptionEmpty } from './empty';

type DescriptionBadgeProps = {
  label: string | number | null | undefined;
  color?: BadgeProps['color'];
  variant?: BadgeProps['variant'];
  size?: BadgeProps['size'];
};

export const DescriptionBadge: React.FC<DescriptionBadgeProps> = ({ label, color = 'secondary', variant = 'soft', size = 'sm' }) => {
  if (!label) return <DescriptionEmpty />;
  return (
    <Badge data-slot="description-badge" color={color} variant={variant} size={size}>
      {label}
    </Badge>
  );
};
