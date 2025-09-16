import { HeartIcon, ShoppingCartIcon } from 'lucide-react'

import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Image } from '../ui/image'

type Props = {
  id: string
  slug: string
  name: string
  thumbnail: string
  price: number
  salePrice?: number
  salePercentage?: number
}
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
  )
}
