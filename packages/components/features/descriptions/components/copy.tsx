'use client';

import { useCallback } from 'react';

import { CheckIcon, CopyIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { DescriptionEmpty } from './empty';
import { useCopyFeedback } from './use-copy-feedback';

type DescriptionCopyProps = {
  value: string | null | undefined;
  truncate?: boolean;
};

export const DescriptionCopy: React.FC<DescriptionCopyProps> = ({ value, truncate = true }) => {
  const { copied, copy } = useCopyFeedback();

  const handleCopy = useCallback(() => {
    if (value) {
      copy(value);
    }
  }, [value, copy]);

  if (!value) return <DescriptionEmpty />;

  return (
    <button
      type="button"
      data-slot="description-copy"
      data-copied={copied}
      title={copied ? 'Đã sao chép' : 'Sao chép'}
      onClick={handleCopy}
      className={cn(
        'group inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded border border-border bg-muted-bg-subtle px-2 py-0.5',
        'font-mono text-text-positive-weak text-xs transition-all',
        'hover:border-border hover:text-text-positive hover:shadow-xs',
        truncate && 'min-w-0'
      )}
    >
      <span className={cn('tabular-nums', truncate && 'truncate')}>{value}</span>
      {copied ? (
        <CheckIcon data-slot="description-copy-icon" size={12} className="shrink-0 text-success-strong" />
      ) : (
        <CopyIcon data-slot="description-copy-icon" size={12} className="shrink-0 opacity-60 group-hover:opacity-100" />
      )}
    </button>
  );
};
