import { XIcon } from 'lucide-react';

import { UITableEmpty } from './empty';

/**
 * Renders a pill-shaped badge for a table cell that optionally supports a click
 * action and an inline remove button; falls back to {@link UITableEmpty} when
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
}> = ({ label, onClick, onRemove }) => {
  if (!label) return <UITableEmpty />;
  if (onRemove) {
    return (
      <div
        className="flex w-fit gap-x-0.5 rounded-full border border-border py-1 pr-2 pl-3 text-text-positive text-xs shadow-xs"
        onClick={e => {
          onClick?.();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {label}
        <button
          className="cursor-pointer text-text-positive-weak hover:text-text-positive-strong"
          onClick={e => {
            onRemove?.();
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <XIcon size={12} />
        </button>
      </div>
    );
  }
  return (
    <button
      className="w-fit rounded-full border border-border px-3 py-1 text-text-positive text-xs shadow-xs"
      onClick={e => {
        onClick?.();
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {label}
    </button>
  );
};
