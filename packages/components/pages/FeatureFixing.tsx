import { Button } from '../ui/button';
import { cn } from '@customafk/react-toolkit/utils';
import { Wrench } from 'lucide-react';

export interface FeatureFixingProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  iconClassName?: string;
}

/**
 * FeatureFixing component for displaying pages with features under maintenance or being fixed
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
