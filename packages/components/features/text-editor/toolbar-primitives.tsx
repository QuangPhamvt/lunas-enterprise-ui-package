'use client';

import { cn } from '@customafk/react-toolkit/utils';

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function ToolbarButton({ isActive, className, children, ...props }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      data-slot="toolbar-button"
      data-active={isActive || undefined}
      aria-pressed={isActive === undefined ? undefined : isActive}
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded text-sm outline-none transition-colors min-w-8',
        'hover:bg-muted-weak hover:text-text-positive-strong',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-40',
        isActive && 'bg-primary-muted text-primary hover:bg-primary-muted/80 hover:text-primary',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div data-slot="toolbar-divider" role="separator" aria-orientation="vertical" className="mx-0.5 h-5 w-px shrink-0 bg-border" />;
}

// biome-ignore lint/style/useComponentExportOnlyModules: type export needed by sibling feature files
export type { ToolbarButtonProps };
export { ToolbarButton, ToolbarDivider };
