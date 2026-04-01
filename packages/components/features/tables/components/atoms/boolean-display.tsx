import { CheckIcon, XIcon } from 'lucide-react';

import { UITableEmpty } from './empty';

export const UITableBooleanDisplay: React.FC<{
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
