import { useCallback, useState } from 'react';

import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  type Modifiers,
  MouseSensor,
  type PointerActivationConstraint,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Coordinates } from '@dnd-kit/utilities';

export const DndDraggable: React.FC<{
  id: UniqueIdentifier;
}> = () => {
  return <div>aaa</div>;
};

export const DndDraggableArea: React.FC<
  React.PropsWithChildren<{
    activationConstraint?: PointerActivationConstraint;
    defaultCordinates?: Coordinates;
    modifiers?: Modifiers;
  }>
> = ({
  activationConstraint,
  defaultCordinates = {
    x: 0,
    y: 0,
  },
  modifiers,
  children,
}) => {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCordinates);
  const mouseSensor = useSensor(MouseSensor, { activationConstraint });
  const touchSensor = useSensor(TouchSensor, { activationConstraint });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleDragEnd = useCallback(({ delta, over }: DragEndEvent) => {
    setCoordinates(({ x, y }) => {
      return {
        x: x + delta.x,
        y: y + delta.y,
      };
    });
  }, []);
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} modifiers={modifiers}>
      {children}
    </DndContext>
  );
};
