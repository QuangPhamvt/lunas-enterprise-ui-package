import { XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

export const CloseButton: React.FC<React.ComponentProps<'button'>> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-[100px] p-2 text-text-positive-weak transition-colors hover:bg-muted-muted hover:text-text-positive active:bg-muted-weak active:text-text-positive-strong disabled:pointer-events-none disabled:opacity-60',
        className
      )}
      {...props}
    >
      <XIcon size={24} />
    </button>
  );
};
