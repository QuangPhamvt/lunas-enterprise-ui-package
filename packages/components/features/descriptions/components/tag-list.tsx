'use client';

import type { BadgeProps } from '@/components/ui/badge';
import { Badge } from '@/components/ui/badge';

import { DescriptionEmpty } from './empty';

type DescriptionTagListProps = {
  tags: Array<string | number> | null | undefined;
  max?: number;
  color?: BadgeProps['color'];
  variant?: BadgeProps['variant'];
};

export const DescriptionTagList: React.FC<DescriptionTagListProps> = ({ tags, max = 5, color = 'secondary', variant = 'soft' }) => {
  if (!tags?.length) return <DescriptionEmpty />;

  // A tag list is semantically a set — dedupe by string value (also collapses a `1`/`'1'` collision) so
  // the overflow count and the React key are both stable, instead of relying on array index.
  const unique = Array.from(new Map(tags.map(tag => [String(tag), tag])).values());
  const visible = unique.slice(0, max);
  const overflow = unique.length - visible.length;

  return (
    <div data-slot="description-tag-list" className="flex flex-wrap gap-1">
      {visible.map(tag => (
        <Badge key={String(tag)} variant={variant} color={color} size="sm">
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
