'use client';

import { Image } from '@/components/ui/image';

import { DescriptionEmpty } from './empty';

/** One image: a stable `id` (used as the React key), its `src` and `alt` text. */
type ImageItem = { id: string; src: string; alt: string };

/**
 * A thumbnail grid (one large thumbnail when there is a single image). Renders `DescriptionEmpty`
 * when there is nothing to show.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="…">
 *   <DescriptionImages images={product.images} />
 * </DescriptionItem>
 * ```
 */
export const DescriptionImages: React.FC<{
  /** Images to show; an empty list renders the empty placeholder. */
  images?: Array<ImageItem> | null | undefined;
}> = ({ images }) => {
  if (!images?.length) return <DescriptionEmpty />;

  const isSingle = images.length === 1;

  return (
    <div data-slot="description-images" className="flex flex-wrap gap-4">
      {images.map(image => (
        <div
          key={image.id}
          className={
            isSingle
              ? 'group relative size-42 overflow-hidden rounded border border-border shadow-xs transition-shadow hover:shadow-card'
              : 'group relative size-20 overflow-hidden rounded border border-border shadow-xs transition-shadow hover:shadow-card'
          }
        >
          <Image src={image.src} alt={image.alt} width="100%" height="100%" className="transition-transform duration-200 group-hover:scale-105" />
        </div>
      ))}
    </div>
  );
};
