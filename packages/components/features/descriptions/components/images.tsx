'use client';

import { Image } from '@/components/ui/image';

import { DescriptionEmpty } from './empty';

type ImageItem = { id: string; src: string; alt: string };

export const DescriptionImages: React.FC<{
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
