import { Button } from '../ui/button';
import { cn } from '@customafk/react-toolkit/utils';
import { FileQuestion } from 'lucide-react';

export interface NotFoundProps {
  /** Main heading shown beneath the file-question icon. Defaults to `'Không tìm thấy trang'`. */
  title?: string;
  /** Supporting text shown below the title. Defaults to a Vietnamese 404 message. */
  subtitle?: string;
  /** Label for the action button. Defaults to `'Trở về trang chủ'`. */
  buttonText?: string;
  /** Handler called when the action button is clicked. Defaults to `window.history.back()`. */
  onButtonClick?: () => void;
  /** Additional class names applied to the root container element. */
  className?: string;
  /** Additional class names applied to the `FileQuestion` icon. */
  iconClassName?: string;
}

/**
 * Full-page 404 error screen displayed when a requested route or resource does not exist.
 *
 * @example
 * ```tsx
 * import { NotFound } from '@customafk/lunas-ui/pages/NotFound';
 *
 * <NotFound
 *   title="Page Not Found"
 *   subtitle="The page you are looking for does not exist."
 *   buttonText="Go Home"
 *   onButtonClick={() => router.push('/')}
 * />
 * ```
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
