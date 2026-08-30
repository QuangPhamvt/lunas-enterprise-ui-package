'use client';

import { ClampedText } from '@/components/data-display/clamped-text';
import { DescriptionEmpty } from './empty';

/**
 * Renders a name clamped to 2 lines inside a {@link Description} value cell, revealing the full text
 * and its character count in a tooltip on hover/click. Falls back to {@link DescriptionEmpty} when
 * `name` is falsy.
 *
 * @example
 * import { DescriptionName } from '@customafk/lunas-ui/features/descriptions';
 *
 * <DescriptionName name="Nguyễn Văn An" />
 */
export const DescriptionName: React.FC<{
  /** The name to display; a falsy value renders an empty state. */
  name?: string | null | undefined;
}> = ({ name }) => {
  if (!name) return <DescriptionEmpty />;
  return <ClampedText content={name} wrap="truncate" interactive showCharCount slot="description-name" />;
};
