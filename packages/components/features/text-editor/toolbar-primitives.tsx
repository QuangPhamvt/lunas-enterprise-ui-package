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
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded text-sm transition-colors',
        'hover:bg-muted-muted hover:text-text-positive-strong',
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
  return <div data-slot="toolbar-divider" className="mx-0.5 h-5 w-px shrink-0 bg-border" />;
}

export { ToolbarButton, ToolbarDivider };
// biome-ignore lint/style/useComponentExportOnlyModules: type export needed by sibling feature files
export type { ToolbarButtonProps };
