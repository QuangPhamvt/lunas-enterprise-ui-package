'use client';

import { ClampedText } from '@/components/data-display/clamped-text';
import { DescriptionEmpty } from './empty';

/**
 * Renders free-form text clamped to 2 lines inside a {@link Description} value cell, revealing the
 * full text and its character count in a tooltip on hover/click. Falls back to {@link DescriptionEmpty}
 * when `content` is `null` or `undefined`.
 *
 * @example
 * import { DescriptionLongText } from '@customafk/lunas-ui/features/descriptions';
 *
 * <DescriptionLongText content="A detailed multi-line note about this record." />
 */
export const DescriptionLongText: React.FC<{
  /** The text or numeric value to display; `null`/`undefined` renders an empty state. */
  content: string | null | undefined | number;
}> = ({ content }) => {
  if (content == null) return <DescriptionEmpty />;
  return <ClampedText content={content} wrap="break" interactive showCharCount slot="description-longtext" />;
};
