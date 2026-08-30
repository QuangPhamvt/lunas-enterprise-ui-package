'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Paragraph, type ParagraphProps } from '../typography/paragraph';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { clampedTextVariants } from './clamped-text.variants';

export type ClampedTextProps = {
  /** Text or numeric value to display. Empty/null handling is the caller's responsibility — pass a fallback element instead of rendering this component when there's nothing to show. */
  content: string | number;
  /**
   * How the clamped line wraps.
   * - `'break'` — preserves line breaks and force-breaks long unbroken runs (URLs, IDs); for free-form text.
   * - `'truncate'` — single-style ellipsis truncation; for short values like names.
   * @default 'break'
   */
  wrap?: 'break' | 'truncate';
  /** Passed straight through to the underlying {@link Paragraph}. @default 'sm' */
  variant?: ParagraphProps['variant'];
  /** Shows a "N chars" line under the full text in the tooltip. @default true */
  showCharCount?: boolean;
  /** Adds a cursor-pointer + hover color affordance and makes the whole trigger clickable (`asChild`), signaling "click for more" rather than plain hover-to-reveal. @default false */
  interactive?: boolean;
  /** `data-slot` applied to the rendered trigger text, so each caller can keep its own existing slot name for styling/DOM-querying purposes. @default 'clamped-text' */
  slot?: string;
  className?: string;
};

/**
 * Clamps `content` to 2 lines and reveals the full text — plus its character count — in a tooltip on
 * hover/focus. This is the shared primitive behind every "long text preview" display across the
 * library (description panels, table cells, name displays) so the clamp/tooltip/char-count behavior
 * only needs to be reasoned about, styled, and fixed in one place.
 *
 * @example
 * import { ClampedText } from '@customafk/lunas-ui/data-display/clamped-text';
 *
 * <ClampedText content="A long free-form note that may span several lines..." wrap="break" />
 * <ClampedText content="John Doe" wrap="truncate" interactive={false} showCharCount={false} />
 */
export const ClampedText: React.FC<ClampedTextProps> = ({
  content,
  wrap = 'break',
  variant = 'sm',
  showCharCount = true,
  interactive = false,
  slot = 'clamped-text',
  className,
}) => {
  const text = String(content);

  return (
    <Tooltip>
      <TooltipTrigger asChild={interactive}>
        <Paragraph data-slot={slot} variant={variant} className={cn(clampedTextVariants({ wrap, interactive }), 'w-auto', className)}>
          {content}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent align="start" className="h-fit min-w-48 max-w-80 pt-4">
        <div className="flex flex-col gap-y-2">
          <p className="whitespace-pre-line text-wrap break-keep">{content}</p>
          {showCharCount ? <p className="w-full text-end text-text-positive-subtle">{text.length} chars</p> : null}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
