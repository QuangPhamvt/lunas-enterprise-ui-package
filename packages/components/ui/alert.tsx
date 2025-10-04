'use client';

import { useMemo } from 'react';
import { cn } from '@customafk/react-toolkit/utils';

import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

import { type AlertVariantProps, alertVariants } from './alert-variants';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, Omit<AlertVariantProps, 'className'> {
  /**
   * Optional icon to display in the alert
   */
  icon?: React.ReactNode;
  /**
   * Whether the alert can be dismissed
   */
  dismissible?: boolean;
  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;
}

/**
 * Alert component for displaying informational messages to users
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
          className="absolute top-2 right-2 size-6 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
          data-slot="alert-close"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title text or elements
   */
  children: React.ReactNode;
}

/**
 * Title component for the Alert
 */
function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <div data-slot="alert-title" className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)} {...props} />;
}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Description text or elements
   */
  children: React.ReactNode;
}

/**
 * Description component for the Alert
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
