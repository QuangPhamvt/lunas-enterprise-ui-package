import { MinusIcon } from 'lucide-react';

/**
 * Renders a double-dash placeholder used across table atom components to
 * indicate that a cell has no data to display.
 *
 * @example
 * import { UITableEmpty } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableEmpty />
 */
export const UITableEmpty: React.FC = () => {
  return (
    <div className="flex gap-0 text-text-positive-weak">
      <MinusIcon size={16} />
      <MinusIcon size={16} />
    </div>
  );
};
