import { CheckIcon, XIcon } from 'lucide-react';

import { UITableEmpty } from './empty';

export const UITableBooleanDisplay: React.FC<{
  value: boolean | null | undefined;
}> = ({ value }) => {
  if (value === null || value === undefined) return <UITableEmpty />;
  if (value === false) {
    return <XIcon size={14} strokeWidth={2} className="text-danger-strong" />;
  }
  return <CheckIcon size={14} strokeWidth={2} className="text-success-strong" />;
};
