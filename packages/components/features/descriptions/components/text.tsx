'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Paragraph } from '@/components/typography/paragraph';
import { DescriptionEmpty } from './empty';

type DescriptionTextProps = {
  value: string | number | null | undefined;
  /** `'normal'` (default) or `'medium'` — the two weights used across real detail panels. */
  weight?: 'normal' | 'medium';
  /** Clamp to a single line with an ellipsis. @default false */
  truncate?: boolean;
  className?: string;
};

/**
 * Plain-text value cell with a built-in `DescriptionEmpty` fallback — use this instead of hand-wrapping
 * a value in `<p className="text-sm">` (the `DescriptionItem` value slot already applies that styling).
 *
 * @example
 * import { DescriptionItem, DescriptionText } from '@customafk/lunas-ui/features/descriptions';
 *
 * <DescriptionItem label="Ghi chú">
 *   <DescriptionText value={order.note} />
 * </DescriptionItem>
 */
export const DescriptionText: React.FC<DescriptionTextProps> = ({ value, weight = 'normal', truncate = false, className }) => {
  if (value == null || value === '') return <DescriptionEmpty />;
  return (
    <Paragraph data-slot="description-text" variant="sm" className={cn(weight === 'medium' && 'font-medium', truncate && 'truncate', className)}>
      {value}
    </Paragraph>
  );
};
