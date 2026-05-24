import { Construction } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '../ui/button';

export interface FeatureDevelopingProps {
  /** Main heading shown beneath the construction icon. Defaults to `'Tính năng đang phát triển'`. */
  title?: string;
  /** Supporting text shown below the title. Defaults to a Vietnamese message asking the user to check back later. */
  subtitle?: string;
  /** Label for the action button. Defaults to `'Quay lại'`. */
  buttonText?: string;
  /** Handler called when the action button is clicked. Defaults to `window.history.back()`. */
  onButtonClick?: () => void;
  /** Additional class names applied to the root container element. */
  className?: string;
  /** Additional class names applied to the `Construction` icon. */
  iconClassName?: string;
}

/**
 * Full-page placeholder displayed when a feature is still under active development.
 *
 * @example
 * ```tsx
 * import { FeatureDeveloping } from '@customafk/lunas-ui/pages/FeatureDeveloping';
 *
 * <FeatureDeveloping
 *   title="Coming Soon"
 *   subtitle="This feature is not ready yet."
 *   buttonText="Go Back"
 *   onButtonClick={() => router.back()}
 * />
 * ```
 */
export const FeatureDeveloping = ({
  title = 'Tính năng đang phát triển',
  subtitle = 'Chúng tôi đang phát triển tính năng này. Vui lòng quay lại sau.',
  buttonText = 'Quay lại',
  onButtonClick = () => window.history.back(),
  className,
  iconClassName,
}: FeatureDevelopingProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[50vh] gap-4 sm:gap-6 py-8 sm:py-10 px-4 text-center w-full', className)}>
      <div className="flex flex-col items-center gap-2">
        <Construction className={cn('size-16 sm:size-24 text-yellow-500', iconClassName)} />
        <div className="text-3xl sm:text-5xl font-bold text-yellow-500">{/* This text shows the feature is in development */}</div>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mt-2">{title}</h1>

      <p className="text-muted-foreground max-w-md text-sm sm:text-base">{subtitle}</p>

      <Button onClick={onButtonClick} variant="default" className="mt-2" size="sm">
        {buttonText}
      </Button>
    </div>
  );
};

export default FeatureDeveloping;
