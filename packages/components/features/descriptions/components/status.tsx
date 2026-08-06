'use client';

import type { BadgeProps } from '@/components/ui/badge';
import { Badge, badgeDotVariants } from '@/components/ui/badge';

import { DescriptionEmpty } from './empty';

type StatusColor = NonNullable<BadgeProps['color']>;

type DescriptionStatusProps = {
  label: string | null | undefined;
  color?: StatusColor;
  dot?: boolean;
};

export const DescriptionStatus: React.FC<DescriptionStatusProps> = ({ label, color = 'info', dot = true }) => {
  if (!label) return <DescriptionEmpty />;
  return (
    <Badge data-slot="description-status" variant="soft" color={color} size="sm" className="gap-1.5">
      {dot && <span className={badgeDotVariants({ color })} />}
      {label}
    </Badge>
  );
};
