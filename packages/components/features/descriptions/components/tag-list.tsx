'use client';

import { Badge } from '@/components/ui/badge';
import type { BadgeProps } from '@/components/ui/badge';

import { DescriptionEmpty } from './empty';

type DescriptionTagListProps = {
  tags: Array<string | number> | null | undefined;
  max?: number;
  color?: BadgeProps['color'];
  variant?: BadgeProps['variant'];
};

export const DescriptionTagList: React.FC<DescriptionTagListProps> = ({ tags, max = 5, color = 'secondary', variant = 'soft' }) => {
  if (!tags?.length) return <DescriptionEmpty />;

  const visible = tags.slice(0, max);
  const overflow = tags.length - visible.length;

  return (
    <div data-slot="description-tag-list" className="flex flex-wrap gap-1">
      {visible.map((tag, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static display list
        <Badge key={i} variant={variant} color={color} size="sm">
          {tag}
        </Badge>
      ))}
      {overflow > 0 && (
        <Badge variant="outline" color="muted" size="sm">
          +{overflow}
        </Badge>
      )}
    </div>
  );
};
