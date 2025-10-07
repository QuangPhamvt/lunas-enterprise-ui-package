'use client';
import { cn } from '@customafk/react-toolkit/utils';

import { Flex } from '@/components/layouts/flex';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ProductLoadingPageProps {
  className?: string;
  hideGallery?: boolean;
}

export const ProductLoadingPage: React.FC<ProductLoadingPageProps> = ({ className, hideGallery = false }) => {
  return (
    <div className={cn('flex w-full flex-col lg:flex-row gap-8 animate-in fade-in duration-300', className)}>
      {/* Gallery Skeleton */}
      {!hideGallery && (
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-20 h-20 flex-shrink-0 rounded-md" />
            ))}
          </div>
        </div>
      )}

      {/* Product Info Skeleton */}
      <div className={cn('flex-1 flex flex-col gap-6', hideGallery ? 'w-full' : 'w-full lg:w-1/2')}>
        {/* Basic Info */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* Price and Stock */}
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="h-8 w-1/3" />
          <div className="flex gap-2 items-center">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        {/* Actions */}
        <Flex gap="md" className="mt-2">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </Flex>

        {/* Tabs */}
        <div className="mt-6">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details" disabled>
                <Skeleton className="h-4 w-20" />
              </TabsTrigger>
              <TabsTrigger value="specs" disabled>
                <Skeleton className="h-4 w-24" />
              </TabsTrigger>
              <TabsTrigger value="reviews" disabled>
                <Skeleton className="h-4 w-20" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-5 w-11/12" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
