'use client';

import { use, useCallback, useMemo, useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { DescriptionConfigContext, DescriptionSearchContext, DescriptionSectionScopeContext, type TDescriptionSectionScope } from './context';
import { descriptionSectionVariants } from './descriptions.variants';
import { matchesSearch } from './search-utils';

export type DescriptionCollapsibleSectionProps = React.PropsWithChildren<{
  /** Section label rendered beside the divider line and chevron. */
  title: string;
  /** Uncontrolled initial state. @default true */
  defaultOpen?: boolean;
  /** Controlled open state — pair with `onOpenChange`. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Set `false` to render a static section header with no trigger/chevron (children always render)
   * while still participating in `DescriptionSearch` — a search-aware alternative to the flat
   * `DescriptionSection` divider.
   * @default true
   */
  collapsible?: boolean;
  className?: string;
}>;

/**
 * A `DescriptionSection`-style divider whose items collapse/expand, and — unlike the flat
 * `DescriptionSection` — auto-hides itself when every `DescriptionItem` inside it is filtered out by a
 * `DescriptionSearch` (and auto-opens while a query matches one of its items, so hits are never buried
 * inside a collapsed section).
 *
 * @example
 * import { Description, DescriptionCollapsibleSection, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionCollapsibleSection title="Advanced" defaultOpen={false}>
 *     <DescriptionItem label="Internal ID">usr_01hv3k9x2b</DescriptionItem>
 *   </DescriptionCollapsibleSection>
 * </Description>
 */
export const DescriptionCollapsibleSection: React.FC<DescriptionCollapsibleSectionProps> = ({
  title,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  collapsible = true,
  className,
  children,
}) => {
  const config = use(DescriptionConfigContext);
  const { query } = use(DescriptionSearchContext);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [matches, setMatches] = useState<Record<string, boolean>>({});

  // Each DescriptionItem inside reports its own match state here; both branches bail out of the state
  // update when nothing actually changed, which is what keeps this from looping on every render.
  const report = useCallback((id: string, matched: boolean | null) => {
    setMatches(prev => {
      if (matched === null) {
        if (!(id in prev)) return prev;
        const { [id]: _dropped, ...rest } = prev;
        return rest;
      }
      if (prev[id] === matched) return prev;
      return { ...prev, [id]: matched };
    });
  }, []);

  const scope = useMemo<TDescriptionSectionScope>(() => ({ report }), [report]);
  const anyChildMatched = useMemo(() => Object.values(matches).some(Boolean), [matches]);
  const titleMatched = matchesSearch(title, query);
  const searching = query.trim() !== '';
  const sectionHidden = searching && !titleMatched && !anyChildMatched;

  const isControlled = openProp !== undefined;
  const baseOpen = isControlled ? openProp : uncontrolledOpen;
  // Auto-open while a query matches one of this section's items, so the hit isn't buried in a collapsed
  // section — only for the uncontrolled case, so a consumer pinning `open` always keeps final say.
  const resolvedOpen = !isControlled && searching && anyChildMatched ? true : baseOpen;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const searchHiddenProps = sectionHidden ? ({ 'data-search-hidden': 'true' } as const) : undefined;
  const triggerClassName = cn(
    'group/section flex w-full items-center gap-3 text-left outline-none',
    collapsible && 'cursor-pointer transition-colors hover:bg-muted-bg-subtle',
    'focus-visible:ring-[3px] focus-visible:ring-border-weak',
    descriptionSectionVariants({ size: config.size, bordered: config.bordered })
  );
  const titleNode = <p className="shrink-0 font-semibold text-text-positive-weak text-xs uppercase tracking-widest">{title}</p>;
  const ruleNode = <span className="h-px flex-1 bg-border" />;

  if (!collapsible) {
    return (
      <div data-slot="description-collapsible-section" {...searchHiddenProps} className={cn(sectionHidden && 'hidden', className)}>
        <div data-slot="description-collapsible-section-trigger" className={triggerClassName}>
          {titleNode}
          {ruleNode}
        </div>
        <DescriptionSectionScopeContext.Provider value={scope}>{children}</DescriptionSectionScopeContext.Provider>
      </div>
    );
  }

  return (
    <Collapsible
      open={resolvedOpen}
      onOpenChange={handleOpenChange}
      data-slot="description-collapsible-section"
      {...searchHiddenProps}
      className={cn(sectionHidden && 'hidden', className)}
    >
      <CollapsibleTrigger data-slot="description-collapsible-section-trigger" className={triggerClassName}>
        <ChevronDownIcon
          size={14}
          className="shrink-0 -rotate-90 text-text-positive-weak transition-transform duration-200 group-data-[state=open]/section:rotate-0"
        />
        {titleNode}
        {ruleNode}
      </CollapsibleTrigger>
      {/*
          forceMount keeps items mounted while collapsed, so a DescriptionSearch query can still match
          against — and auto-open — a section that starts closed (without it, Radix unmounts collapsed
          content entirely and its items could never report a match in the first place). `inert` then
          makes the collapsed content correctly non-focusable/non-perceivable to assistive tech, since
          `forceMount` alone would otherwise leave it tabbable at height:0.
        */}
      <CollapsibleContent
        data-slot="description-collapsible-section-content"
        forceMount
        inert={!resolvedOpen}
        // fill-mode-forwards is required: tw-animate-css's collapsible-up/-down keyframes default to
        // `animation-fill-mode: none`, so without it the element's height snaps back to `auto` (fully
        // visible) the instant each animation finishes, regardless of which direction it just ran.
        // The plain `data-[state=closed]:h-0` is a static safety net alongside the animation: on the very
        // first render (data-state is already "closed", never transitioned from "open") there's no prior
        // --radix-collapsible-content-height measurement yet, so the keyframe's `from` value falls back to
        // `auto` and the animation can't reliably interpolate — the static rule guarantees the settled,
        // non-animating state is still correct even if that first animation pass doesn't land cleanly.
        className="overflow-hidden fill-mode-forwards data-[state=closed]:h-0 data-[state=open]:h-auto data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
      >
        <DescriptionSectionScopeContext.Provider value={scope}>{children}</DescriptionSectionScopeContext.Provider>
      </CollapsibleContent>
    </Collapsible>
  );
};
