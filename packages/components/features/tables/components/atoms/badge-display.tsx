import { XIcon } from 'lucide-react';

import { UITableEmpty } from './empty';

export const UITableBadgeDisplay: React.FC<{
  label: string | number | null | undefined;
  onClick?: () => void;
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
