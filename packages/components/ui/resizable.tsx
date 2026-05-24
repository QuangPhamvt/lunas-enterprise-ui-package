'use client';

import { memo } from 'react';

import { GripVerticalIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import * as ResizablePrimitive from 'react-resizable-panels';

type TResizablePanelGroup = React.ComponentProps<typeof ResizablePrimitive.PanelGroup>;

type TResizablePanel = React.ComponentProps<typeof ResizablePrimitive.Panel>;

type TResizableHandle = React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
};

/**
 * Root container that manages a group of resizable panels; supports horizontal and vertical orientations.
 *
 * @example
 * ```tsx
 * import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@customafk/lunas-ui/ui/resizable';
 *
 * <ResizablePanelGroup direction="horizontal">
 *   <ResizablePanel defaultSize={50}>Left</ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={50}>Right</ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizablePanelGroup = memo<TResizablePanelGroup>(({ className, ...props }) => {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', className)}
      {...props}
    />
  );
});
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

/** An individual resizable panel within a ResizablePanelGroup. */
const ResizablePanel = memo<TResizablePanel>(({ ...props }) => {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
});
ResizablePanel.displayName = 'ResizablePanel';

/**
 * The drag handle placed between two ResizablePanels to resize them.
 *
 * @param withHandle - When true, renders a visible grip icon centered on the handle.
 */
const ResizableHandle = memo<TResizableHandle>(({ withHandle, className, ...props }) => {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90',
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
});
ResizableHandle.displayName = 'ResizableHandle';

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
