import { memo, useCallback } from 'react';

import { XIcon } from 'lucide-react';

import { UITableEmptyValue } from './empty';

/**
 * Renders a pill-shaped badge for a table cell that optionally supports a click
 * action and an inline remove button; falls back to {@link UITableEmptyValue} when
 * `label` is falsy.
 *
 * @example
 * import { UITableBadgeDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableBadgeDisplay
 *   label="Active"
 *   onClick={() => console.log('badge clicked')}
 *   onRemove={() => console.log('remove clicked')}
 * />
 */
export const UITableBadgeDisplay: React.FC<{
  /** The text or number to display inside the badge. */
  label: string | number | null | undefined;
  /** Optional callback fired when the badge itself is clicked. */
  onClick?: () => void;
  /** When provided, renders a remove (×) button and fires this callback on click. */
  onRemove?: () => void;
}> = memo(({ label, onClick, onRemove }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      onClick?.();
      e.stopPropagation();
      e.preventDefault();
    },
    [onClick]
  );

  const handleRemoveClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onRemove?.();
      e.stopPropagation();
      e.preventDefault();
    },
    [onRemove]
  );

  if (!label) return <UITableEmptyValue />;
  if (onRemove) {
    return (
      <div
        className="flex w-fit min-w-20 gap-x-0.5 rounded border border-border bg-white py-1 pr-2 pl-3 text-text-positive text-xs shadow-xs"
        onClick={handleClick}
      >
        {label}
        <button className="cursor-pointer text-text-positive-weak hover:text-text-positive-strong" onClick={handleRemoveClick}>
          <XIcon size={12} />
        </button>
      </div>
    );
  }
  return (
    <button className="w-fit min-w-20 rounded border border-border bg-white px-3 py-1 text-text-positive text-xs shadow-xs" onClick={handleClick}>
      {label}
    </button>
  );
});
