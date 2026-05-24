'use client';

import { useCallback, useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { cn } from '@customafk/react-toolkit/utils';

import { DescriptionEmpty } from './empty';

type DescriptionCopyProps = {
  value: string | null | undefined;
  truncate?: boolean;
};

export const DescriptionCopy: React.FC<DescriptionCopyProps> = ({ value, truncate = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [value]);

  if (!value) return <DescriptionEmpty />;

  return (
    <button
      type="button"
      data-slot="description-copy"
      onClick={handleCopy}
      className={cn(
        'group inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-sm border border-border-weak bg-secondary-muted px-2 py-0.5 font-mono text-xs text-text-positive-weak transition-[border-color,color,box-shadow] hover:border-border hover:text-text-positive hover:shadow-xs',
        truncate && 'min-w-0'
      )}
    >
      <span className={cn('tabular-nums', truncate && 'truncate')}>{value}</span>
      {copied ? <CheckIcon size={12} className="shrink-0 text-success" /> : <CopyIcon size={12} className="shrink-0 opacity-50 group-hover:opacity-100" />}
    </button>
  );
};
