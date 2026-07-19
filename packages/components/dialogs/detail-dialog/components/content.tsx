'use client';

import { Suspense } from 'react';

import { Flex } from '@/components/layouts/flex';

export type DetailDialogContentProps = React.PropsWithChildren<{
  /** When `true`, replaces the content with a centered loading spinner. */
  isLoading?: boolean;
}>;

function DetailDialogLoader() {
  return (
    <Flex justify="center" className="inset-shadow-sm min-h-0 bg-muted-muted">
      <div className="loader" />
    </Flex>
  );
}

export function DetailDialogContent({ isLoading, children }: DetailDialogContentProps) {
  return (
    <main data-slot="detail-dialog-main" className="@container col-start-2 row-start-2 grid min-h-0 min-w-0 grid-rows-1">
      {isLoading ? (
        <DetailDialogLoader />
      ) : (
        <Suspense fallback={<DetailDialogLoader />}>
          <section data-slot="detail-dialog-body" className="relative inset-shadow-sm grid min-h-0 snap-y grid-cols-1 overflow-y-auto bg-white">
            {children}
          </section>
        </Suspense>
      )}
    </main>
  );
}
