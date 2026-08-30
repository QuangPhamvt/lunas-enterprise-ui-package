import { XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

export const CloseButton: React.FC<React.ComponentProps<'button'>> = ({ className, ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-full p-2',
        'size-10 min-w-10',
        'text-text-positive-weak transition-all',
        'hover:bg-muted-muted',
        'hover:text-text-positive',
        'active:bg-muted-weak',
        'active:text-text-positive-strong',
        'disabled:pointer-events-none disabled:opacity-60',
        className
      )}
      {...props}
    >
      <XIcon size={24} />
    </button>
  );
};
