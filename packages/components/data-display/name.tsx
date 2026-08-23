'use client';

import { ClampedText } from './clamped-text';

type NameDisplayProps = {
  /** The full name string to display; shown truncated inline and in full via tooltip. */
  name: string;
};

/**
 * Renders a clamped, truncated name with a tooltip that reveals the complete text on hover.
 *
 * @example
 * ```tsx
 * import { NameDisplay } from '@customafk/lunas-ui/data-display/name';
 *
 * <NameDisplay name="Nguyễn Văn An" />
 * ```
 */
export const NameDisplay: React.FC<NameDisplayProps> = ({ name }) => {
  return <ClampedText content={name} wrap="truncate" showCharCount={false} slot="name-display" />;
};
