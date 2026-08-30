'use client';

import { cn } from '@customafk/react-toolkit/utils';

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
    <Badge data-slot="description-status" pill={false} variant="solid" color={color} size="sm" className={cn('min-w-20 gap-1.5', dot && 'pr-3')}>
      {!!dot && <span className={badgeDotVariants({ color: 'white' })} />}
      {label}
    </Badge>
  );
};
