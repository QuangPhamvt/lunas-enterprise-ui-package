import { Button } from '../ui/button';
import { cn } from '@customafk/react-toolkit/utils';
import { FileQuestion } from 'lucide-react';

export interface NotFoundProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  iconClassName?: string;
}

/**
 * NotFound component for displaying 404 page content
 */
export const NotFound = ({
  title = 'Không tìm thấy trang',
  subtitle = 'Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.',
  buttonText = 'Trở về trang chủ',
  onButtonClick = () => window.history.back(),
  className,
  iconClassName,
}: NotFoundProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[50vh] gap-4 sm:gap-6 py-8 sm:py-10 px-4 text-center w-full', className)}>
      <div className="flex flex-col items-center gap-2">
        <FileQuestion className={cn('size-16 sm:size-24 text-primary', iconClassName)} />
        <div className="text-4xl sm:text-6xl font-bold text-primary">404</div>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mt-2">{title}</h1>

      <p className="text-muted-foreground max-w-md text-sm sm:text-base">{subtitle}</p>

      <Button onClick={onButtonClick} variant="default" className="mt-2" size="sm">
        {buttonText}
      </Button>
    </div>
  );
};

export default NotFound;
