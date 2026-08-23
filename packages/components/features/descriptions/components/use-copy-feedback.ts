import { useCallback, useEffect, useState } from 'react';

import { useCopyToClipboard } from '@customafk/react-toolkit/hooks/useCopyToClipboard';

/**
 * Shared "click to copy, flash a checkmark for 1.5s" behavior — used by `DescriptionCopy`,
 * `DescriptionJson`'s copy button, and `DescriptionCopyAll`. A timestamp (not a boolean) changes
 * identity on every click, so clicking again inside the window restarts the timer instead of
 * leaving a stale one running.
 */
export function useCopyFeedback() {
  const [copiedAt, setCopiedAt] = useState<number | null>(null);
  const [, copy] = useCopyToClipboard();
  const copied = copiedAt !== null;

  const copyText = useCallback(
    async (text: string) => {
      if (!text) return false;
      const ok = await copy(text);
      if (ok) setCopiedAt(Date.now());
      return ok;
    },
    [copy]
  );

  useEffect(() => {
    if (copiedAt === null) return;
    const id = setTimeout(() => setCopiedAt(null), 1500);
    return () => clearTimeout(id);
  }, [copiedAt]);

  return { copied, copy: copyText };
}
