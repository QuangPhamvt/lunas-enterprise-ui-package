'use client';

import { useMemo } from 'react';
import { cn } from '@customafk/react-toolkit/utils';

import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

import { type AlertVariantProps, alertVariants } from './alert-variants';

/**
 * Props for the Alert component.
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, Omit<AlertVariantProps, 'className'> {
  /**
   * Optional icon to display in the alert; defaults to a variant-appropriate icon when omitted.
   */
  icon?: React.ReactNode;
  /**
   * Whether the alert can be dismissed by the user.
   */
  dismissible?: boolean;
  /**
   * Callback invoked when the dismiss button is clicked.
   */
  onDismiss?: () => void;
}

/**
 * Displays a contextual feedback message with optional icon, title, description, and dismiss button.
 *
 * @example
 * ```tsx
 * import { Alert, AlertTitle, AlertDescription } from '@customafk/lunas-ui/ui/alert';
 *
 * <Alert variant="success" dismissible onDismiss={() => setOpen(false)}>
 *   <AlertTitle>Saved successfully</AlertTitle>
 *   <AlertDescription>Your changes have been saved.</AlertDescription>
 * </Alert>
 * ```
 */
function Alert({ className, variant, children, icon, dismissible, onDismiss, ...props }: AlertProps) {
  // Default icons based on variant
  const defaultIcon = useMemo(() => {
    if (!icon) {
      switch (variant) {
        case 'destructive':
          return <AlertCircle />;
        case 'warning':
          return <AlertTriangle />;
        case 'success':
          return <CheckCircle />;
        case 'info':
          return <Info />;
        default:
          return null;
      }
    }
    return icon;
  }, [icon, variant]);

  return (
    <div data-slot="alert" role="alert" data-variant={variant} className={cn(alertVariants({ variant }), className)} {...props}>
      {defaultIcon}
      {children}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Close alert"
          className="absolute top-2 right-2 size-6 rounded-md p-1 opacity-70 transition-opacity duration-100 hover:opacity-100"
          data-slot="alert-close"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

/**
 * Props for the AlertTitle component.
 */
export interface AlertTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title text or elements to display.
   */
  children: React.ReactNode;
}

/**
 * Renders the bold title line inside an Alert.
 */
function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <div data-slot="alert-title" className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)} {...props} />;
}

/**
 * Props for the AlertDescription component.
 */
export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Descriptive text or elements displayed below the title.
   */
  children: React.ReactNode;
}

/**
 * Renders the supporting body text inside an Alert.
 */
function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-text-positive-weak col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
