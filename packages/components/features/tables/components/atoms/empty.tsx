import { MinusIcon } from 'lucide-react';

export const UITableEmpty: React.FC = () => {
  return (
    <div className="flex gap-0 text-text-positive-weak">
      <MinusIcon size={16} />
      <MinusIcon size={16} />
    </div>
  );
};
