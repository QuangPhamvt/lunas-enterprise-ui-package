import type { ClientRect, Collision, CollisionDescriptor, CollisionDetection } from '@dnd-kit/core';
import { cornersOfRectangle, sortCollisionsAsc } from './helpers';

type Coordinates = {
  x: number;
  y: number;
};

/**
 * Check if a given point is contained within a bounding rectangle
 */
function isPointWithinRect(point: Coordinates, rect: ClientRect): boolean {
  const { top, left, bottom, right } = rect;

  return top <= point.y && point.y <= bottom && left <= point.x && point.x <= right;
}

/**
 * Returns the distance between two points
 */
export function distanceBetween(p1: Coordinates, p2: Coordinates) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

/**
 * Returns the rectangles that the pointer is hovering over
 */
export const pointerWithin: CollisionDetection = ({ droppableContainers, droppableRects, pointerCoordinates }) => {
  if (!pointerCoordinates) {
    return [];
  }

  const collisions: CollisionDescriptor[] = [];

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect && isPointWithinRect(pointerCoordinates, rect)) {
      /* There may be more than a single rectangle intersecting
       * with the pointer coordinates. In order to sort the
       * colliding rectangles, we measure the distance between
       * the pointer and the corners of the intersecting rectangle
       */
      const corners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner) => {
        return accumulator + distanceBetween(pointerCoordinates, corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));

      collisions.push({
        id,
        data: { droppableContainer, value: effectiveDistance },
      });
    }
  }

  return collisions.sort(sortCollisionsAsc);
};

/**
 * Returns the first collision, or null if there isn't one.
 * If a property is specified, returns the specified property of the first collision.
 */
export function getFirstCollision(collisions: Collision[] | null | undefined): Collision | null;
export function getFirstCollision<T extends keyof Collision>(collisions: Collision[] | null | undefined, property: T): Collision[T] | null;
export function getFirstCollision(collisions: Collision[] | null | undefined, property?: keyof Collision) {
  if (!collisions || collisions.length === 0) {
    return null;
  }

  const [firstCollision] = collisions;

  return property ? firstCollision[property] : firstCollision;
}
