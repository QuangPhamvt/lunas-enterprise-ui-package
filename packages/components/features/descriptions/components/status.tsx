'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Badge } from '@/components/ui/badge';
import type { BadgeProps } from '@/components/ui/badge';

import { DescriptionEmpty } from './empty';

type StatusColor = NonNullable<BadgeProps['color']>;

const dotColorMap: Record<StatusColor, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  muted: 'bg-muted',
  accent: 'bg-accent',
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

type DescriptionStatusProps = {
  label: string | null | undefined;
  color?: StatusColor;
  dot?: boolean;
};

export const DescriptionStatus: React.FC<DescriptionStatusProps> = ({ label, color = 'info', dot = true }) => {
  if (!label) return <DescriptionEmpty />;
  return (
    <Badge data-slot="description-status" variant="soft" color={color} size="sm" className="gap-1.5">
      {dot && <span className={cn('inline-block size-1.5 shrink-0 rounded-full', dotColorMap[color])} />}
      {label}
    </Badge>
  );
};
