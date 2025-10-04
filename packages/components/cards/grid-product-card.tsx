import { HeartIcon, ShoppingCartIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Image } from '../ui/image';

type Props = {
  id: string;
  slug: string;
  name: string;
  thumbnail: string;
  price: number;
  salePrice?: number;
  salePercentage?: number;
};
export const GridProductCard: React.FC<Props> = ({ name, thumbnail, price }) => {
  return (
    <Card className="h-36 w-full flex-row gap-4 p-2 pr-4">
      <Image className="aspect-square h-full flex-0" src={thumbnail} />
      <div className="flex flex-1 flex-col gap-y-1">
        <p className="text-text-positive line-clamp-2 h-10 text-sm font-semibold">{name}</p>
        <p className="text-success text-base font-bold">
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
