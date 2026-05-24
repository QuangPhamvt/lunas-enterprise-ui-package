'use client';

import { cn } from '@customafk/react-toolkit/utils';

type DataListProps = {
  className?: string;
};

export const DataList: React.FC<React.PropsWithChildren<DataListProps>> = ({ children, className }) => {
  return (
    <div data-slot="data-list" className={cn('flex w-full flex-col gap-4', className)}>
      {children}
    </div>
  );
};

type DataListItemProps = {
  label: string;
  value: string | number | React.ReactNode;
  minLabelWidth?: string;
  className?: string;
};

export const DataListItem: React.FC<DataListItemProps> = ({ label, value, minLabelWidth = '120px', className }) => {
  return (
    <div data-slot="data-list-item" className={cn('flex w-full flex-col items-start gap-1 md:flex-row md:items-center md:gap-4', className)}>
      <span data-slot="data-list-label" style={{ minWidth: minLabelWidth }} className="text-sm text-text-positive-weak">
        {label}
      </span>
      <span data-slot="data-list-value" className="text-sm text-text-positive">
        {value}
      </span>
    </div>
  );
};
