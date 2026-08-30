'use client';

import { use } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Flex } from '@/components/layouts/flex';
import { DescriptionConfigContext } from './context';
import { descriptionSectionVariants } from './descriptions.variants';

export type DescriptionSectionProps = {
  /** Optional section label rendered as uppercase small-caps text beside the divider line. */
  title?: string;
  /** Additional CSS class names applied to the section wrapper. */
  className?: string;
};

/**
 * A visual section divider inside a {@link Description} container that optionally displays a section title with a decorative horizontal rule.
 *
 * This flat divider stays always-visible during a `DescriptionSearch` filter (it has no ownership of
 * the items that follow it). Use `DescriptionCollapsibleSection` instead when you want a section that
 * auto-hides once every item inside it is filtered out.
 *
 * @example
 * import { Description, DescriptionSection, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionSection title="Contact" />
 *   <DescriptionItem label="Email">john@example.com</DescriptionItem>
 * </Description>
 */
export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ title, className }) => {
  const config = use(DescriptionConfigContext);
  return (
    <Flex
      data-slot="description-section"
      width="full"
      padding="none"
      gap="none"
      wrap={false}
      align="center"
      className={cn(descriptionSectionVariants({ size: config.size, bordered: config.bordered }), className)}
    >
      {!!title && <p className="shrink-0 font-semibold text-text-positive-weak text-xs uppercase tracking-widest">{title}</p>}
      <div className="h-px flex-1 bg-border" />
    </Flex>
  );
};
