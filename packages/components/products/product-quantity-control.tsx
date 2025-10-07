'use client';

import { useCallback, useEffect, useState } from 'react';

import { Minus, Plus } from 'lucide-react';

import { useDebounceCallback } from '@customafk/react-toolkit/hooks/useDebounceCallback';
import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface ProductQuantityControlProps {
  /**
   * Initial quantity value
   */
  initialValue?: number;
  /**
   * Minimum allowed quantity (default: 1)
   */
  min?: number;
  /**
   * Maximum allowed quantity (default: 100)
   */
  max?: number;
  /**
   * Callback when quantity changes
   */
  onQuantityChange?: (quantity: number) => void;
  /**
   * Callback when increment or decrement button is clicked
   */
  onButtonClick?: (action: 'increment' | 'decrement', newQuantity: number) => void;
  /**
   * Delay in milliseconds before triggering onQuantityChange (default: 300)
   */
  debounceDelay?: number;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Whether the control is disabled
   */
  disabled?: boolean;
}

export function ProductQuantityControl({
  initialValue = 1,
  min = 1,
  max = 100,
  onQuantityChange,
  onButtonClick,
  debounceDelay = 300,
  className,
  disabled = false,
}: ProductQuantityControlProps) {
  const [quantity, setQuantity] = useState<number>(Math.min(Math.max(initialValue, min), max));

  // Create debounced version of the quantity change handler
  const debouncedQuantityChange = useDebounceCallback((value: number) => {
    onQuantityChange?.(value);
  }, debounceDelay);

  useEffect(() => {
    // Ensure initial value is within limits when props change
    const boundedValue = Math.min(Math.max(initialValue, min), max);
    setQuantity(boundedValue);
  }, [initialValue, min, max]);

  // Trigger debounced callback when quantity changes
  useEffect(() => {
    if (debounceDelay <= 0) {
      // If debounce is disabled, call immediately
      onQuantityChange?.(quantity);
    } else {
      debouncedQuantityChange(quantity);
    }
    return () => {
      debouncedQuantityChange.cancel();
    };
  }, [quantity, debouncedQuantityChange, onQuantityChange, debounceDelay]);

  const increment = useCallback(() => {
    if (quantity >= max) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onButtonClick?.('increment', newQuantity);
  }, [quantity, max, onButtonClick]);

  const decrement = useCallback(() => {
    if (quantity <= min) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onButtonClick?.('decrement', newQuantity);
  }, [quantity, min, onButtonClick]);

  const handleInputChange = useCallback(
    (value: string) => {
      const newValue = parseInt(value, 10);

      if (Number.isNaN(newValue)) {
        setQuantity(min);
        return;
      }

      if (newValue < min) {
        setQuantity(min);
      } else if (newValue > max) {
        setQuantity(max);
      } else {
        setQuantity(newValue);
      }
    },
    [min, max]
  );

  const handleBlur = useCallback(() => {
    // Ensure value is within limits when input loses focus
    if (Number.isNaN(quantity) || quantity < min) {
      setQuantity(min);
    } else if (quantity > max) {
      setQuantity(max);
    }
  }, [quantity, min, max]);

  return (
    <div className={cn('flex gap-x-0.5 h-8 items-center', className)}>
      <Button
        variant="outline"
        color="muted"
        size="icon"
        onClick={decrement}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
        className="rounded-xs focus:border focus:border-border bg-background"
      >
        <Minus size={16} />
      </Button>

      <Input
        value={quantity.toString()}
        onValueChange={handleInputChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        disabled={disabled}
        className="h-8 w-14 border border-border p-0 text-center focus-visible:border-muted focus-visible:ring-0 rounded-xs bg-background"
        aria-label="Product quantity"
      />

      <Button
        variant="outline"
        color="muted"
        size="icon"
        onClick={increment}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
        className="rounded-xs focus:border focus:border-border bg-background"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
}
