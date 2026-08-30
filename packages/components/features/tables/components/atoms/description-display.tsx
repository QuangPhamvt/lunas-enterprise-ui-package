import { ClampedText } from '@/components/data-display/clamped-text';
import { UITableEmptyValue } from './empty';

/**
 * Renders a two-line-clamped description in a table cell with a tooltip that
 * reveals the full text and its character count; falls back to
 * {@link UITableEmptyValue} when `content` is `null` or `undefined`.
 *
 * @example
 * import { UITableDescriptionDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableDescriptionDisplay content="A detailed description of this record." />
 */
export const UITableDescriptionDisplay: React.FC<{
  /** The text or numeric value to display; `null`/`undefined` renders an empty state. */
  content: string | null | undefined | number;
}> = ({ content }) => {
  if (content === undefined || content === null) {
    return <UITableEmptyValue />;
  }
  return <ClampedText content={content} wrap="break" showCharCount slot="description-display" />;
};
