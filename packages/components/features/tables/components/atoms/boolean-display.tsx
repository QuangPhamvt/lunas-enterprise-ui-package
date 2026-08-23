import { memo } from 'react';

import { CheckIcon, XIcon } from 'lucide-react';

import { UITableEmptyValue } from './empty';

export const UITableBooleanDisplay: React.FC<{
  value: boolean | null | undefined;
}> = memo(({ value }) => {
  if (value === null || value === undefined) return <UITableEmptyValue />;
  if (value === false) {
    return <XIcon size={16} strokeWidth={3} className="text-danger-strong" />;
  }
  return <CheckIcon size={16} strokeWidth={3} className="text-success-strong" />;
});
