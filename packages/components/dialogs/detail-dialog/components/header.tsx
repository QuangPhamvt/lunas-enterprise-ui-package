'use client';

import { Suspense } from 'react';

import { CalendarIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

import { DateDisplay } from '@/components/data-display/date';
import { Title } from '@/components/typography/title';
import { DetailDialogSidebarTrigger } from './sidebar-core';

export type DetailDialogHeaderProps = {
  /** Primary title displayed in the dialog header. */
  title?: string;
  /** ISO string, `Date` object, or Unix timestamp shown as a formatted creation date below the title. */
  createdAt?: string | Date | number | null;
  /** Custom content replacing the default title/date block, e.g. for consumer-specific headers. Suspense-wrapped. */
  headerComponent?: React.ReactNode;
};

function DetailDialogHeaderSkeleton() {
  return (
    <div data-slot="detail-dialog-header-skeleton" className="grid justify-items-start gap-1.5">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function DetailDialogHeader({ title, createdAt, headerComponent }: DetailDialogHeaderProps) {
  return (
    <header
      data-slot="detail-dialog-header"
      className="col-start-2 row-start-1 grid grid-cols-[auto_1fr] items-start gap-x-2.5 border-border-weak border-b bg-card py-2.5 pr-12 pl-2"
    >
      <DetailDialogSidebarTrigger />
      <div data-slot="detail-dialog-header-content" className="min-w-0 overflow-x-auto">
        <Suspense fallback={<DetailDialogHeaderSkeleton />}>
          {headerComponent ?? (
            <div className="grid justify-items-start gap-0">
              <Title level={5} className="line-clamp-1 truncate text-wrap">
                {title || 'Detail Dialog'}
              </Title>
              {!!createdAt && (
                <div className="relative grid grid-flow-col items-center gap-1 text-text-positive-weak">
                  <CalendarIcon size={12} className="text-primary-strong" />
                  <p className="text-primary-strong text-xs">Ngày Tạo</p>
                  <DateDisplay showHoliday date={createdAt} format="medium" />
                </div>
              )}
            </div>
          )}
        </Suspense>
      </div>
    </header>
  );
}
