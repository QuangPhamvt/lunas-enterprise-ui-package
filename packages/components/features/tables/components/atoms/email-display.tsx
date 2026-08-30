'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { CheckIcon, CopyIcon, MailIcon } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { UITableEmptyValue } from './empty';

/** Props for the {@link UITableEmailDisplay} component. */
type Props = {
  /** The email address to display; `null`/`undefined`/empty renders an empty state. */
  email: string | null | undefined;
  /** When `true`, a `mailto:` anchor wraps the address (default: `true`). */
  linkable?: boolean;
};

/**
 * Displays an email address in a table cell with a copy-to-clipboard button.
 * Shows a brief checkmark confirmation after copying.  Optionally wraps the
 * address in a `mailto:` link.  Renders {@link UITableEmptyValue} when `email` is
 * absent.
 *
 * @example
 * import { UITableEmailDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableEmailDisplay email="jane@example.com" />
 */
export const UITableEmailDisplay: React.FC<Props> = memo(({ email, linkable = true }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = (e: React.MouseEvent) => {
    if (!email) return;
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      copiedTimeoutRef.current = setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
    };
  }, []);

  if (!email) return <UITableEmptyValue />;

  return (
    <TooltipProvider>
      <div className="group flex items-center gap-x-1.5">
        <MailIcon size={13} className="shrink-0 text-text-positive-weak" />

        {linkable ? (
          <a
            href={`mailto:${email}`}
            className="truncate text-primary text-sm underline-offset-2 hover:text-primary-strong hover:underline"
            onClick={handleMouseDown}
          >
            {email}
          </a>
        ) : (
          <span className="truncate text-sm text-text-positive">{email}</span>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              className="shrink-0 cursor-pointer text-text-positive-weak opacity-0 transition-opacity hover:text-text-positive group-hover:opacity-100"
            >
              {copied ? <CheckIcon size={13} className="text-success-strong" /> : <CopyIcon size={13} />}
            </button>
          </TooltipTrigger>
          <TooltipContent>{copied ? 'Copied!' : 'Copy email'}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
});
