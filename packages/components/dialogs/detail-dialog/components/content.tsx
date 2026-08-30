'use client';

import { Suspense } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Flex } from '@/components/layouts/flex';

export type DetailDialogContentProps = React.PropsWithChildren<{
  /** When `true`, replaces the content with a centered loading spinner. */
  isLoading?: boolean;
}>;

function DetailDialogLoader() {
  return (
    <Flex justify="center" className="inset-shadow-sm size-full min-h-0 bg-muted-muted">
      <div className="loader" />
    </Flex>
  );
}

export function DetailDialogContent({ isLoading, children }: DetailDialogContentProps) {
  return (
    <main
      data-slot="detail-dialog-main"
      className="@container/detail-content inset-shadow-sm col-start-2 row-start-2 grid min-h-0 min-w-0 grid-rows-1 overflow-y-auto"
    >
      {isLoading ? (
        <DetailDialogLoader />
      ) : (
        <Suspense fallback={<DetailDialogLoader />}>
          <section
            data-slot="detail-dialog-body"
            className={cn(
              'relative grid min-h-0 w-full snap-y grid-cols-1',
              '@3xl/detail-content:max-w-3xl',
              '@4xl/detail-content:max-w-4xl',
              '@5xl/detail-content:max-w-5xl',
              '@6xl/detail-content:max-w-6xl',
              '@7xl/detail-content:max-w-7xl'
            )}
          >
            {children}
          </section>
        </Suspense>
      )}
    </main>
  );
}
