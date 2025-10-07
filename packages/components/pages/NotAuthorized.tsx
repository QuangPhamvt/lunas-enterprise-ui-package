import { Button } from '../ui/button';
import { cn } from '@customafk/react-toolkit/utils';
import { ShieldAlert } from 'lucide-react';

export interface NotAuthorizedProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  iconClassName?: string;
}

/**
 * NotAuthorized component for displaying 403 forbidden/unauthorized pages
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
