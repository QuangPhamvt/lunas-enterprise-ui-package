'use client';

import { Badge } from '@/components/ui/badge';

import { DescriptionEmpty } from './empty';

type DescriptionBooleanProps = {
  /** Value to show; `null`/`undefined` renders the empty placeholder. */
  value: boolean | null | undefined;
  /**
   * Text for `true`.
   * @default 'Yes'
   */
  trueLabel?: string;
  /**
   * Text for `false`.
   * @default 'No'
   */
  falseLabel?: string;
};

/**
 * A yes/no badge — green for `true`, red for `false`. Renders `DescriptionEmpty` when there is
 * nothing to show.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="…">
 *   <DescriptionBoolean value={product.isPublished} trueLabel="Đã đăng" falseLabel="Nháp" />
 * </DescriptionItem>
 * ```
 */
export const DescriptionBoolean: React.FC<DescriptionBooleanProps> = ({ value, trueLabel = 'Yes', falseLabel = 'No' }) => {
  if (value == null) return <DescriptionEmpty />;
  return (
    <Badge data-slot="description-boolean" pill={false} variant="soft" color={value ? 'success' : 'danger'} size="sm" className="min-w-20">
      {value ? trueLabel : falseLabel}
    </Badge>
  );
};
