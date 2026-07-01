'use client';

import { Button } from '../ui/button';
import { cn } from '@customafk/react-toolkit/utils';
import { Wrench } from 'lucide-react';
import { LunasLogo } from '../features/logo';

export interface FeatureFixingProps {
  /** Main heading shown beneath the wrench icon. Defaults to `'Tính năng đang bảo trì'`. */
  title?: string;
  /** Supporting text shown below the title. Defaults to a Vietnamese maintenance message. */
  subtitle?: string;
  /** Label for the action button. Defaults to `'Quay lại'`. */
  buttonText?: string;
  /** Handler called when the action button is clicked. Defaults to `window.history.back()`. */
  onButtonClick?: () => void;
  /** Additional class names applied to the root container element. */
  className?: string;
  /** Additional class names applied to the `Wrench` icon. */
  iconClassName?: string;
}

/**
 * Full-page placeholder displayed when a feature is temporarily unavailable due to maintenance or bug fixes.
 *
 * @example
 * ```tsx
 * import { FeatureFixing } from '@customafk/lunas-ui/pages/FeatureFixing';
 *
 * <FeatureFixing
 *   title="Under Maintenance"
 *   subtitle="We are fixing an issue. Please check back later."
 *   buttonText="Go Back"
 *   onButtonClick={() => router.back()}
 * />
 * ```
 */
export const FeatureFixing = ({
  title = 'Tính năng đang bảo trì',
  subtitle = 'Chúng tôi đang khắc phục vấn đề với tính năng này. Vui lòng quay lại sau.',
  buttonText = 'Quay lại',
  onButtonClick = () => window.history.back(),
  className,
  iconClassName,
}: FeatureFixingProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[50vh] gap-4 sm:gap-6 py-8 sm:py-10 px-4 text-center w-full', className)}>
      <LunasLogo variant="stacked" size="sm" />
      <div className="flex flex-col items-center gap-2">
        <Wrench className={cn('size-16 sm:size-24 text-orange-500', iconClassName)} />
        <div className="text-3xl sm:text-5xl font-bold text-orange-500">{/* This text indicates the feature is being fixed */}</div>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mt-2">{title}</h1>

      <p className="text-muted-foreground max-w-md text-sm sm:text-base">{subtitle}</p>

      <Button onClick={onButtonClick} variant="default" className="mt-2" size="sm">
        {buttonText}
      </Button>
    </div>
  );
};

export default FeatureFixing;
