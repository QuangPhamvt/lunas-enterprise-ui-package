'use client';

import { Button } from '../ui/button';
import { cn } from '@customafk/react-toolkit/utils';
import { ShieldAlert } from 'lucide-react';
import { LunasLogo } from '../features/logo';

export interface NotAuthorizedProps {
  /** Main heading shown beneath the shield icon. Defaults to `'Quyền truy cập bị từ chối'`. */
  title?: string;
  /** Supporting text shown below the title. Defaults to a Vietnamese access-denied message. */
  subtitle?: string;
  /** Label for the action button. Defaults to `'Quay lại'`. */
  buttonText?: string;
  /** Handler called when the action button is clicked. Defaults to `window.history.back()`. */
  onButtonClick?: () => void;
  /** Additional class names applied to the root container element. */
  className?: string;
  /** Additional class names applied to the `ShieldAlert` icon. */
  iconClassName?: string;
}

/**
 * Full-page 403 error screen shown when the current user lacks permission to access a resource.
 *
 * @example
 * ```tsx
 * import { NotAuthorized } from '@customafk/lunas-ui/pages/NotAuthorized';
 *
 * <NotAuthorized
 *   title="Access Denied"
 *   subtitle="You do not have permission to view this page."
 *   buttonText="Go Back"
 *   onButtonClick={() => router.push('/')}
 * />
 * ```
 */
export const NotAuthorized = ({
  title = 'Quyền truy cập bị từ chối',
  subtitle = 'Xin lỗi, bạn không có quyền truy cập vào trang này.',
  buttonText = 'Quay lại',
  onButtonClick = () => window.history.back(),
  className,
  iconClassName,
}: NotAuthorizedProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[50vh] gap-4 sm:gap-6 py-8 sm:py-10 px-4 text-center w-full', className)}>
      <LunasLogo variant="stacked" size="sm" />
      <div className="flex flex-col items-center gap-2">
        <ShieldAlert className={cn('size-16 sm:size-24 text-primary', iconClassName)} />
        <div className="text-4xl sm:text-6xl font-bold text-primary">403</div>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mt-2">{title}</h1>

      <p className="text-muted-foreground max-w-md text-sm sm:text-base">{subtitle}</p>

      <Button onClick={onButtonClick} variant="default" className="mt-2" size="sm">
        {buttonText}
      </Button>
    </div>
  );
};

export default NotAuthorized;
