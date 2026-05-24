'use client';

import { Badge } from '@/components/ui/badge';

import { DescriptionEmpty } from './empty';

type DescriptionBooleanProps = {
  value: boolean | null | undefined;
  trueLabel?: string;
  falseLabel?: string;
};

export const DescriptionBoolean: React.FC<DescriptionBooleanProps> = ({ value, trueLabel = 'Yes', falseLabel = 'No' }) => {
  if (value == null) return <DescriptionEmpty />;
  return (
    <Badge data-slot="description-boolean" variant="soft" color={value ? 'success' : 'danger'} size="sm">
      {value ? trueLabel : falseLabel}
    </Badge>
  );
};
