'use client';

import { use, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { DescriptionConfigContext, DescriptionGroupContext, type TDescriptionConfig } from './context';
import { descriptionGroupVariants, type TDescriptionSize } from './descriptions.variants';

export type DescriptionGroupProps = React.PropsWithChildren<{
  /** Additional CSS class names applied to the group wrapper. */
  className?: string;
  /** Applied to every child `Description` that doesn't set its own. @default 'md' */
  size?: TDescriptionSize;
  /** Applied to every child `Description` that doesn't set its own. @default true */
  bordered?: boolean;
}>;

/**
 * A scrollable container that groups multiple `Description` blocks and makes each
 * `DescriptionHeader` sticky. As you scroll, the next section header stacks above
 * (pushes out) the previous one — standard CSS sticky behaviour within a single scroll context.
 *
 * `size`/`bordered` set here cascade to every child `Description` that doesn't set its own.
 *
 * Also self-caps its own max-width via a container query against its own available space — same
 * automatic behavior as `Description`'s standalone `card` surface, no prop needed.
 *
 * @example
 * import { DescriptionGroup, Description, DescriptionHeader, DescriptionItem } from '@customafk/lunas-ui/features/descriptions';
 *
 * <DescriptionGroup>
 *   <Description>
 *     <DescriptionHeader title="Personal info" />
 *     <DescriptionItem label="Name">John Doe</DescriptionItem>
 *   </Description>
 *   <Description>
 *     <DescriptionHeader title="Contact" />
 *     <DescriptionItem label="Email">john@example.com</DescriptionItem>
 *   </Description>
 * </DescriptionGroup>
 */
export const DescriptionGroup: React.FC<DescriptionGroupProps> = ({ children, className, size, bordered }) => {
  const inherited = use(DescriptionConfigContext);
  const config = useMemo<TDescriptionConfig>(
    () => ({
      labelColSpan: inherited.labelColSpan,
      size: size ?? inherited.size,
      bordered: bordered ?? inherited.bordered,
    }),
    [size, bordered, inherited]
  );

  return (
    <DescriptionGroupContext.Provider value={true}>
      <DescriptionConfigContext.Provider value={config}>
        {/* Same self-capping container-query wrapper as `Description`'s `card` surface — see
            `SELF_CAPPING_MAX_WIDTH` in `descriptions.variants.ts`. */}
        <div data-slot="description-panel" className="@container/description-panel size-full">
          <div data-slot="description-group" className={cn(descriptionGroupVariants({ bordered: config.bordered }), className)}>
            {children}
          </div>
        </div>
      </DescriptionConfigContext.Provider>
    </DescriptionGroupContext.Provider>
  );
};
