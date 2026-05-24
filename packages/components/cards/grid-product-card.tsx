import { HeartIcon, ShoppingCartIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Image } from '../ui/image';

type Props = {
  /** Unique identifier for the product. */
  id: string;
  /** URL-friendly slug for the product. */
  slug: string;
  /** Display name of the product shown on the card. */
  name: string;
  /** URL of the product's thumbnail image. */
  thumbnail: string;
  /** Regular price of the product in VND. */
  price: number;
  /** Optional sale / discounted price in VND. */
  salePrice?: number;
  /** Optional sale discount percentage (0–100). */
  salePercentage?: number;
};

/**
 * A horizontal (grid-row) product card displaying a thumbnail, name, price, and add-to-cart / favourite actions.
 *
 * @example
 * ```tsx
 * import { GridProductCard } from '@customafk/lunas-ui/cards/grid-product-card';
 *
 * <GridProductCard
 *   id="prod-1"
 *   slug="awesome-widget"
 *   name="Awesome Widget"
 *   thumbnail="/images/widget.png"
 *   price={299000}
 * />
 * ```
 */
export const GridProductCard: React.FC<Props> = ({ name, thumbnail, price }) => {
  return (
    <Card className="h-36 w-full flex-row gap-4 p-2 pr-4">
      <Image className="aspect-square h-full flex-0" src={thumbnail} />
      <div className="flex flex-1 flex-col gap-y-1">
        <p className="line-clamp-2 h-10 font-semibold text-sm text-text-positive">{name}</p>
        <p className="font-bold text-base text-success">
          {price.toLocaleString('vi-VN')}
          <small className="ml-0.5">VND</small>
        </p>
        <div className="mb-3 flex flex-1 items-end justify-end gap-x-1">
          <Button size="icon" variant="outline" color="muted" className="size-9">
            <HeartIcon />
          </Button>
          <Button className="max-w-52 max-sm:size-9 sm:flex-1">
            <ShoppingCartIcon />
            <p className="sr-only sm:not-sr-only">Thêm vào giỏ</p>
          </Button>
        </div>
      </div>
    </Card>
  );
};
