import type { ClientRect, CollisionDescriptor } from '@dnd-kit/core';

/**
 * Sort collisions from greatest to smallest value
 */
export function sortCollisionsDesc({ data: { value: a } }: CollisionDescriptor, { data: { value: b } }: CollisionDescriptor) {
  return b - a;
}

type TopLeft = { x: number; y: number };
type TopRight = { x: number; y: number };
type BottomLeft = { x: number; y: number };
type BottomRight = { x: number; y: number };
/**
 * Returns the coordinates of the corners of a given rectangle:
 *
 * [TopLeft {x, y}, TopRight {x, y}, BottomLeft {x, y}, BottomRight {x, y}]
 */
export function cornersOfRectangle({ left, top, height, width }: ClientRect): [TopLeft, TopRight, BottomLeft, BottomRight] {
  return [
    { x: left, y: top },
    { x: left + width, y: top },
    { x: left, y: top + height },
    { x: left + width, y: top + height },
  ];
}

/**
 * Sort collisions from smallest to greatest value
 */
export function sortCollisionsAsc({ data: { value: a } }: CollisionDescriptor, { data: { value: b } }: CollisionDescriptor) {
  return a - b;
}
