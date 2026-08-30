import { memo } from 'react';

import { MinusIcon } from 'lucide-react';

/**
 * Renders a double-dash placeholder used across table atom components to
 * indicate that a cell has no data to display.
 *
 * @example
 * import { UITableEmptyValue } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableEmptyValue />
 */
export const UITableEmptyValue: React.FC = memo(() => {
  return (
    <div className="flex gap-0 text-text-positive-weak">
      <MinusIcon size={16} />
      <MinusIcon size={16} />
    </div>
  );
});
UITableEmptyValue.displayName = 'UITableEmptyValue';
