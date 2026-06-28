'use client';
import { useCallback } from 'react';

import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * An on/off toggle switch for table row action columns.
 * Wraps the `Switch` primitive with a tooltip and stops row-click propagation.
 *
 * @example
 * import { UITableToggleButton } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableToggleButton
 *   checked={row.isActive}
 *   titleOn="Deactivate account"
 *   titleOff="Activate account"
 *   onCheckedChange={(checked) => updateStatus(rowId, checked)}
 * />
 */
export const UITableToggleButton: React.FC<{
  /** Current on/off state of the switch. */
  checked?: boolean;
  /** Tooltip shown when the switch is currently ON (describes the toggle-off action). */
  titleOn?: string;
  /** Tooltip shown when the switch is currently OFF (describes the toggle-on action). */
  titleOff?: string;
  /** Whether the switch is disabled. */
  disabled?: boolean;
  /** Called with the new boolean value after the user flips the switch. */
  onCheckedChange?: (checked: boolean) => void | Promise<void>;
}> = ({ checked, titleOn, titleOff, disabled, onCheckedChange }) => {
  const handleCheckedChange = useCallback(
    async (value: boolean) => {
      await onCheckedChange?.(value);
    },
    [onCheckedChange]
  );

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(e => {
    e.stopPropagation();
  }, []);

  const tooltip = checked ? titleOn || 'Turn off' : titleOff || 'Turn on';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span onClick={handleClick}>
          <Switch checked={checked} disabled={disabled} onCheckedChange={handleCheckedChange} />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
