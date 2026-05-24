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
 * A vertical product card displaying a thumbnail, name, price, and add-to-cart / favourite actions.
 *
 * @example
 * ```tsx
 * import { ProductCard } from '@customafk/lunas-ui/cards/product-card';
 *
 * <ProductCard
 *   id="prod-1"
 *   slug="awesome-widget"
 *   name="Awesome Widget"
 *   thumbnail="/images/widget.png"
 *   price={299000}
 * />
 * ```
 */
export const ProductCard: React.FC<Props> = ({ name, thumbnail, price }) => {
  return (
    <Card className="size-full gap-y-2 p-2 pb-4">
      <Image src={thumbnail} className="aspect-square" />
      <div className="flex flex-col gap-y-1">
        <p className="line-clamp-2 h-10 text-sm font-semibold">{name}</p>
        <p className="text-success text-base font-bold">
          {price.toLocaleString('vi-VN')}
          <small className="ml-0.5">VND</small>
        </p>
        <div className="mt-1 flex gap-x-1">
          <Button className="flex-1">
            <ShoppingCartIcon />
            Thêm vào giỏ
          </Button>
          <Button size="icon" variant="outline" color="muted" className="size-9">
            <HeartIcon />
          </Button>
        </div>
      </div>
    </Card>
  );
};
