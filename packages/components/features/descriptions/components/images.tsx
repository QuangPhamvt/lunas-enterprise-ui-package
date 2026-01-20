import { Image } from '@/components/ui/image';

import { DescriptionEmpty } from './empty';

export const DescriptionImages: React.FC<{
  images?:
    | Array<{
        id: string;
        src: string;
        alt: string;
      }>
    | null
    | undefined;
}> = ({ images }) => {
  if (!images || !images.length) return <DescriptionEmpty />;
  if (images.length === 1)
    return (
      <div className="flex flex-wrap gap-4">
        <div key={images[0].id} className="group relative size-42 rounded-sm border border-border shadow-xs">
          <Image src={images[0].src} alt={images[0].alt} width="100%" height="100%" />
        </div>
      </div>
    );
  return (
    <div className="flex flex-wrap gap-4">
      {images.map(image => (
        <div key={image.id} className="group relative size-16 rounded-lg border border-border shadow-xs">
          <Image src={image.src} alt={image.alt} width="100%" height="100%" />
        </div>
      ))}
    </div>
  );
};
