'use client';

import { useCallback, useMemo } from 'react';

import { CheckIcon, CopyIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { DescriptionEmpty } from './empty';
import { useCopyFeedback } from './use-copy-feedback';

type DescriptionJsonProps = {
  value: unknown;
  /** Max rendered height in px before the block scrolls internally rather than growing the row. @default 240 */
  maxHeight?: number;
  /** `JSON.stringify` indent width. @default 2 */
  indent?: number;
  /** Renders a click-to-copy button in the top-right corner of the block. @default true */
  copyable?: boolean;
};

/**
 * Pretty-printed, monospaced JSON viewer for a value inside a `DescriptionItem`. Bounded height + internal
 * scroll rather than collapsible-by-default — inside a description row the JSON is a *value*, and a value
 * that's collapsed by default reads as empty. Reach for `DescriptionCollapsibleSection` if you want the
 * surrounding section itself to start collapsed.
 */
export const DescriptionJson: React.FC<DescriptionJsonProps> = ({ value, maxHeight = 240, indent = 2, copyable = true }) => {
  const text = useMemo(() => {
    if (value == null) return null;
    try {
      return JSON.stringify(value, null, indent);
    } catch {
      // Circular references and other non-serializable values — same "nothing sensible to show" outcome as null.
      return null;
    }
  }, [value, indent]);
  const { copied, copy } = useCopyFeedback();

  const handleCopy = useCallback(() => {
    if (text != null) copy(text);
  }, [copy, text]);

  if (text == null) return <DescriptionEmpty />;

  return (
    <div data-slot="description-json" className="relative w-full min-w-0">
      {!!copyable && (
        <button
          type="button"
          data-slot="description-json-copy"
          data-copied={copied}
          title={copied ? 'Đã sao chép' : 'Sao chép'}
          onClick={handleCopy}
          className={cn(
            'absolute top-2 right-2 cursor-pointer rounded border border-border-weak bg-card p-1 text-text-positive-weak transition-[border-color,color,box-shadow] hover:border-border hover:text-text-positive hover:shadow-xs'
          )}
        >
          {copied ? <CheckIcon size={12} className="text-success" /> : <CopyIcon size={12} />}
        </button>
      )}
      <pre
        style={{ maxHeight }}
        className="overflow-auto rounded-sm border border-border-weak bg-muted-bg-subtle px-2 py-1.5 pr-8 font-mono text-text-positive-weak text-xs leading-relaxed"
      >
        <code data-slot="description-json-code">{text}</code>
      </pre>
    </div>
  );
};
