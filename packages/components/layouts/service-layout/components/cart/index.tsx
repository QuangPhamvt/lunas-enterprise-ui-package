import { useCallback, useEffect, useState } from 'react'
import { useDebounceCallback } from '@customafk/react-toolkit/hooks/useDebounceCallback'
import { cn } from '@customafk/react-toolkit/utils'

import { Minus, Plus, ShoppingBasketIcon, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { useServiceLayout } from '../../hooks/use-service-layout'

type CartItemProps = {
  productUuid: string
  productName: string
  variantUuid: string
  variantName: string
  imageUrl: string
  optionValue: string
  optionTitle: string
  quantity: number
  price: number
}

export const CartItem: React.FC<
  CartItemProps & {
    type: 'in_stock' | 'pre_order'
  }
> = ({ type, productUuid, variantUuid, productName, variantName, imageUrl, optionValue, optionTitle, quantity, price }) => {
  const { onDeletingCart, onUpdatingCart } = useServiceLayout()
  const [itemQuantity, setItemQuantity] = useState(quantity)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleUpdate = useCallback(() => {
    onUpdatingCart?.(variantUuid, itemQuantity, type)
  }, [onUpdatingCart, variantUuid, itemQuantity, type])

  const handleUpdateDebounced = useDebounceCallback(handleUpdate, 500)

  const handleQuantityChange = useCallback((value: number) => {
    if (value < 1) value = 1
    if (value > 99) value = 99
    setItemQuantity(value)
  }, [])

  const handleRemoveItem = useCallback(async () => {
    setIsDeleting(true)
    await onDeletingCart?.(productUuid)
    setIsDeleting(false)
  }, [productUuid, onDeletingCart])

  useEffect(() => {
    if (itemQuantity !== quantity) {
      handleUpdateDebounced()
    }
    return () => {
      handleUpdateDebounced.cancel()
    }
  }, [itemQuantity, quantity, handleUpdateDebounced])

  return (
    <Card className="border-border-weak relative mb-3 overflow-x-auto border p-4 shadow-none">
      {isDeleting && (
        <div className="bg-muted-muted/80 absolute inset-0 z-10 flex items-center justify-center">
          <div className="loader-dots" />
        </div>
      )}
      <CardContent className="p-0">
        <Button
          variant="ghost"
          size="icon"
          color="muted"
          disabled={isDeleting}
          className="text-text-positive-weak absolute top-2 right-2 z-10"
          onClick={handleRemoveItem}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>
        <div className="flex gap-3">
          <div className="relative size-20 flex-shrink-0">
            {imageUrl ? (
              <Image src={imageUrl} alt={productName} className="rounded-md border-none shadow-xs" width={80} height={80} />
            ) : (
              <div className="bg-muted text-muted-foreground flex size-full items-center justify-center text-xs">No image</div>
            )}
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <h3 className="text-text-positive line-clamp-1 text-sm font-medium">{productName}</h3>
            </div>

            <p className="text-text-positive-weak mb-1 text-xs">
              {variantName}
              {optionTitle && ` - ${optionTitle}: ${optionValue}`}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <button
                  disabled={itemQuantity <= 1}
                  className="border-border active:bg-muted-muted flex size-6 cursor-pointer items-center justify-center rounded-full border transition-all disabled:opacity-60"
                  onClick={() => handleQuantityChange(itemQuantity - 1)}
                >
                  <Minus size={12} />
                </button>
                <Input
                  value={itemQuantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value || '1'))}
                  className="border-border h-6.5 w-14 rounded-md border p-1 text-center text-sm"
                  min={1}
                />
                <button
                  disabled={itemQuantity >= 99}
                  className="border-border active:bg-muted-muted flex size-6 cursor-pointer items-center justify-center rounded-full border transition-all disabled:opacity-60"
                  onClick={() => handleQuantityChange(itemQuantity + 1)}
                >
                  <Plus size={12} />
                </button>
              </div>

              <div className="text-sm font-semibold">{(price * itemQuantity).toLocaleString()} ₫</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type CartListProps = {
  items?: CartItemProps[]
  cartType: 'in_stock' | 'pre_order'
  className?: string
}

export const CartList: React.FC<CartListProps> = ({ items = [], cartType, className }) => {
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className={cn('bg-muted-muted flex size-full max-h-80 flex-col items-center justify-center rounded-lg p-8', className)}>
        <div className="text-text-positive-weak bg-card shadow-card mb-4 flex size-20 items-center justify-center rounded-full text-5xl">
          <ShoppingBasketIcon size={42} strokeWidth={1} />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="text-text-positive text-center text-base font-semibold">Giỏ hàng trống</p>
          <p className="text-text-positive-weak mb-4 text-center text-sm">
            {cartType === 'in_stock' ? 'Thêm sản phẩm có sẵn vào giỏ hàng của bạn!' : 'Thêm sản phẩm đặt trước vào giỏ hàng của bạn!'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex h-full flex-col space-y-4 overflow-y-auto', className)}>
      <ScrollArea className="h-full flex-1">
        {items.map((item) => (
          <CartItem key={`${item.productUuid}-${item.variantUuid}`} {...item} type={cartType} />
        ))}
      </ScrollArea>

      <div className="flex-0 space-y-3">
        <div className="flex justify-between">
          <span className="text-text-positive-weak text-sm">Tạm tính:</span>
          <span className="text-sm">{totalAmount.toLocaleString()} ₫</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-text-positive font-medium">Tổng cộng:</span>
          <span className="text-lg font-semibold">{totalAmount.toLocaleString()} ₫</span>
        </div>
        <Button className="mt-2 w-full">Thanh toán ngay</Button>
        {cartType === 'pre_order' && <p className="text-text-positive-weak text-center text-xs italic">* Sản phẩm đặt trước sẽ được giao sau khi có hàng</p>}
      </div>
    </div>
  )
}
