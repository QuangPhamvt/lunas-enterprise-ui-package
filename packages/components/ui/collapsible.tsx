'use client';

import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

/**
 * Root provider for a Collapsible section — toggles the visibility of its content.
 *
 * @example
 * ```tsx
 * import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@customafk/lunas-ui/ui/collapsible';
 *
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle section</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>Hidden content revealed on toggle.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 */
function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

/** Button or element that expands or collapses the CollapsibleContent. */
function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props} />;
}

/** The section that is shown or hidden based on the Collapsible open state. */
function CollapsibleContent({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return <CollapsiblePrimitive.CollapsibleContent data-slot="collapsible-content" {...props} />;
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
