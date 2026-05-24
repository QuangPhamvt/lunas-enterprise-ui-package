'use client';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

/**
 * Root container for an accordion; wraps one or more `AccordionItem` elements and controls
 * whether a single item or multiple items can be open at once.
 *
 * @example
 * ```tsx
 * import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@customafk/lunas-ui/ui/accordion';
 *
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/**
 * A single collapsible section within an `Accordion`; must receive a unique `value` prop that
 * identifies it to the root.
 *
 * @example
 * ```tsx
 * import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@customafk/lunas-ui/ui/accordion';
 *
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="faq-1">
 *     <AccordionTrigger>What is Lunas?</AccordionTrigger>
 *     <AccordionContent>Lunas is an enterprise UI library.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn('border-b border-b-border last:border-b-0', className)} {...props} />;
}

/**
 * Clickable header button that toggles the open/closed state of its parent `AccordionItem`;
 * renders a rotating chevron icon to indicate expansion state.
 *
 * @example
 * ```tsx
 * import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@customafk/lunas-ui/ui/accordion';
 *
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Click me to expand</AccordionTrigger>
 *     <AccordionContent>Hidden content revealed on click.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-border focus-visible:ring-[3px] focus-visible:ring-border-weak disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-text-positive-weak transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * Animated panel that reveals or hides its children when the parent `AccordionItem` is toggled;
 * uses CSS height animations driven by the `data-state` attribute.
 *
 * @example
 * ```tsx
 * import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@customafk/lunas-ui/ui/accordion';
 *
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="details">
 *     <AccordionTrigger>View details</AccordionTrigger>
 *     <AccordionContent>
 *       <p>Here are the full details.</p>
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
