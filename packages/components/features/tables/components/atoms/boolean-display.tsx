import { memo } from 'react';

import { CheckIcon, XIcon } from 'lucide-react';

import { UITableEmptyValue } from './empty';

/**
 * Table cell for a boolean: a green check for `true`, a red cross for `false`, and the empty-value
 * placeholder for `null`/`undefined`.
 *
 * @example
 * ```tsx
 * import { UITableBooleanDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableBooleanDisplay value={row.original.isActive} />
 * ```
 */
export const UITableBooleanDisplay: React.FC<{
  /** The boolean to show; `null`/`undefined` renders the empty placeholder. */
  value: boolean | null | undefined;
}> = memo(({ value }) => {
  if (value === null || value === undefined) return <UITableEmptyValue />;
  if (value === false) {
    return <XIcon size={16} strokeWidth={3} className="text-danger-strong" />;
  }
  return <CheckIcon size={16} strokeWidth={3} className="text-success-strong" />;
});
