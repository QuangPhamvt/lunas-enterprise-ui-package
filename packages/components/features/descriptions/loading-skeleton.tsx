'use client';

import { use } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { Flex } from '@/components/layouts/flex';
import { UIGrid, UIGridItem } from '@/components/layouts/ui-grid';
import { DescriptionConfigContext } from './context';
import { descriptionHeaderVariants, descriptionItemLabelVariants, descriptionItemValueVariants, descriptionItemVariants } from './descriptions.variants';
import { DEFAULT_LABEL_COL_SPAN, normalizeLabelSpan, toValueSpan } from './label-span-utils';

/** Fixed pool of stable row keys for the loading skeleton — avoids array-index keys while still supporting up to 24 `loadingRows`. */
const SKELETON_ROW_KEYS = Array.from({ length: 24 }, (_, i) => `description-loading-row-${i}`);

/** Skeleton placeholder rendered by {@link Description} while `loading` is true. Internal — not part of the public API. */
export const DescriptionLoadingSkeleton: React.FC<{ rows: number }> = ({ rows }) => {
  const config = use(DescriptionConfigContext);
  const labelSpan = normalizeLabelSpan(config.labelColSpan ?? DEFAULT_LABEL_COL_SPAN);
  const valueSpan = toValueSpan(labelSpan);

  return (
    <div data-slot="description-loading">
      <Flex
        data-slot="description-loading-header"
        width="full"
        padding="none"
        gap="md"
        wrap={false}
        justify="between"
        align="center"
        className={descriptionHeaderVariants({ sticky: false, size: config.size, bordered: config.bordered })}
      >
        <Flex vertical padding="none" gap="none" align="start" className="gap-1.5">
          <Skeleton className="h-3.5 w-36" />
          <Skeleton className="h-2.5 w-24" />
        </Flex>
        <Skeleton className="h-5 w-16" />
      </Flex>
      {SKELETON_ROW_KEYS.slice(0, rows).map(key => (
        <div key={key} data-slot="description-loading-row" className={descriptionItemVariants({ orientation: 'horizontal', bordered: config.bordered })}>
          <UIGrid cols={12} gap="none">
            <UIGridItem span={labelSpan} suspense={false} className="min-w-0">
              <Flex
                width="full"
                padding="none"
                gap="none"
                wrap={false}
                align="center"
                className={descriptionItemLabelVariants({ orientation: 'horizontal', size: config.size, bordered: config.bordered })}
              >
                <Skeleton className="h-3 w-20" />
              </Flex>
            </UIGridItem>
            <UIGridItem span={valueSpan} suspense={false} className="min-w-0">
              <Flex width="full" padding="none" wrap align="center" gap="sm" className={descriptionItemValueVariants({ size: config.size })}>
                <Skeleton className="h-3 w-28" />
              </Flex>
            </UIGridItem>
          </UIGrid>
        </div>
      ))}
    </div>
  );
};
