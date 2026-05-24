'use client';

import { PackageOpenIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

type EmptyDisplayProps = {
  label?: string;
  className?: string;
};

export const EmptyDisplay: React.FC<EmptyDisplayProps> = ({ label = 'No data to display.', className }) => {
  return (
    <div data-slot="empty-display" className={cn('flex size-full flex-col items-center justify-center gap-2 text-text-positive-muted', className)}>
      <PackageOpenIcon size={52} strokeWidth={1} />
      <p className="text-sm">{label}</p>
    </div>
  );
};
