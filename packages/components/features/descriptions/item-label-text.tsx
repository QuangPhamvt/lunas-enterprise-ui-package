'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useIsTruncated } from './use-is-truncated';

/**
 * Keeps the label column to a single line — a long label truncates with an ellipsis instead of
 * wrapping to a second line. Only wraps in a `Tooltip` when the text is actually clipped, so a label
 * that already fits doesn't get a redundant hover affordance. Internal to {@link DescriptionItem}.
 */
export const DescriptionItemLabelText: React.FC<{ label: string }> = ({ label }) => {
  const [ref, truncated] = useIsTruncated<HTMLSpanElement>();
  const span = (
    <span ref={ref} data-slot="description-item-label-text" className="min-w-0 flex-1 cursor-default truncate">
      {label}
    </span>
  );

  if (!truncated) return span;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{span}</TooltipTrigger>
      <TooltipContent align="start">{label}</TooltipContent>
    </Tooltip>
  );
};
