import { CheckIcon, XIcon } from 'lucide-react';

import { UITableEmpty } from './empty';

/**
 * Displays a green check icon for `true`, a red X icon for `false`, and a
 * double-dash placeholder via {@link UITableEmpty} when the value is
 * `null` or `undefined`.
 *
 * @example
 * import { UITableBooleanDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableBooleanDisplay value={isActive} />
 */
export const UITableBooleanDisplay: React.FC<{
  /** The boolean value to visualise; `null`/`undefined` renders an empty state. */
  value: boolean | null | undefined;
}> = ({ value }) => {
  if (value === null || value === undefined) return <UITableEmpty />;
  if (value === false) {
    return (
      <div className="text-danger-strong">
        <XIcon />
      </div>
    );
  }
  return (
    <div className="text-success-strong">
      <CheckIcon />
    </div>
  );
};
