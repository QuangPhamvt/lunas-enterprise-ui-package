'use client';

import { use } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Flex } from '@/components/layouts/flex';
import { DescriptionConfigContext } from './context';
import { descriptionHeaderDescriptionVariants, descriptionHeaderTitleVariants, descriptionHeaderVariants } from './descriptions.variants';

export type DescriptionHeaderProps = {
  /** Primary heading text. */
  title: string;
  /** Optional secondary text rendered below the title in a smaller, muted style. */
  description?: string;
  /** Optional node rendered on the right side of the header (e.g. action buttons, a `DescriptionSearch`). */
  extra?: React.ReactNode;
  /**
   * Sticks the header to the top of its scroll container (`sticky top-0 z-30`). Disable when the
   * header is rendered inside a non-scrolling context (e.g. a `Dialog`) where stickiness has no effect.
   * @default true
   */
  sticky?: boolean;
  /** Additional CSS class names applied to the header wrapper. */
  className?: string;
};

/**
 * A header bar for a {@link Description} block, showing a title, an optional subtitle, and an optional trailing action area.
 *
 * @example
 * import { Description, DescriptionHeader } from '@customafk/lunas-ui/features/descriptions';
 *
 * <Description>
 *   <DescriptionHeader title="User details" description="Read-only overview" extra={<EditBtn />} />
 * </Description>
 */
export const DescriptionHeader: React.FC<DescriptionHeaderProps> = ({ title, description, extra, sticky = true, className }) => {
  const config = use(DescriptionConfigContext);
  return (
    <Flex
      data-slot="description-header"
      width="full"
      padding="none"
      gap="md"
      wrap={false}
      justify="between"
      align="center"
      className={cn(descriptionHeaderVariants({ sticky, size: config.size, bordered: config.bordered }), className)}
    >
      {/*
          Two deviations from Flex's defaults, both required for the title/description below to actually
          truncate/clamp instead of overflowing the header:
          - `align="stretch"` (not `start`): `items-start` shrink-wraps each child to its own content
            width, leaving `truncate`/`line-clamp` nothing to clip against.
          - `wrap={false}`: Flex defaults to `flex-wrap: wrap`, which — combined with `flex-direction:
            column` — lets Chrome size this container by the children's own hypothetical (content) width
            instead of clamping to `w-full`, silently defeating the `min-w-0` override below.
          Neither changes the visual result when text actually fits; both only matter once it doesn't.
      */}
      <Flex vertical width="full" padding="none" gap="none" wrap={false} align="stretch" className="min-w-0 gap-0.5">
        <p className={descriptionHeaderTitleVariants({ size: config.size })}>{title}</p>
        {!!description && <p className={descriptionHeaderDescriptionVariants({ size: config.size })}>{description}</p>}
      </Flex>
      {!!extra && (
        <div data-slot="description-header-extra" className="shrink-0">
          {extra}
        </div>
      )}
    </Flex>
  );
};
