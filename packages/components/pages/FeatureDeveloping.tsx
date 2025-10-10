import { Construction } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '../ui/button';

export interface FeatureDevelopingProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  iconClassName?: string;
}

/**
 * FeatureDeveloping component for displaying pages with features under development
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
