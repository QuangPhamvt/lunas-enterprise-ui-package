import { useCallback, useRef, useState } from 'react';

import { AlertCircleIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Skeleton } from './skeleton';

/** Props for the Image component. */
type Props = {
  /** URL of the image to display. */
  src?: string;
  /** Accessible alt text for the image. */
  alt?: string;
  /** Width of the image container (number treated as pixels). */
  width?: number | string;
  /** Height of the image container (number treated as pixels). */
  height?: number | string;
  /** Maximum number of retry attempts on load failure before showing an error state. @default 3 */
  maxRetries?: number;
  /** Base delay in milliseconds between retry attempts (multiplied by the attempt count). @default 500 */
  retryDelay?: number;
  /** Class name applied to the outer container div. */
  className?: string;
  /** Class name applied to the `<img>` element. */
  imageClassName?: string;
  /** Click handler for the image container. */
  onClick?: () => void;
};

/**
 * A lazy-loading image with an automatic retry mechanism, a blurred background placeholder, a skeleton loader, and an error fallback.
 *
 * @example
 * ```tsx
 * import { Image } from '@customafk/lunas-ui/ui/image';
 *
 * <Image src="/hero.jpg" alt="Hero" width={400} height={300} maxRetries={3} />
 * ```
 */
export const Image: React.FC<Props> = ({ src, alt, width, height, maxRetries = 3, retryDelay = 500, className, imageClassName, onClick }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (retryCount < maxRetries) {
      // imageRef.current?.style.setProperty('display', 'none')
      setHasError(false);
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);

      // Retry with exponential backoff and cache busting
      setTimeout(() => {
        const cacheBuster = `?retry=${Date.now()}&attempt=${newRetryCount}`;
        setCurrentSrc(src + cacheBuster);
      }, retryDelay * newRetryCount);
      return;
    }

    setHasError(true);
    setIsLoaded(true);
    setCurrentSrc(src);
  }, [maxRetries, retryCount, retryDelay, src]);

  if (hasError) {
    return (
      <div style={{ width, height }} className={cn('@container relative inline-block', className)}>
        <div className="flex size-full flex-col items-center justify-center gap-y-2 rounded bg-danger-muted shadow-card">
          <AlertCircleIcon className="@max-[52px]:size-6 size-8 text-danger" />
          <span className="@max-[96px]:sr-only text-center text-danger-weak text-xs">Image failed to load</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width, height }} className={cn('relative flex items-center justify-center overflow-hidden rounded', className)} onClick={onClick}>
      {!isLoaded && <Skeleton className="absolute inset-0 flex size-full animate-pulse items-center justify-center" />}
      <img src={currentSrc} className="absolute inset-0 z-0 size-full scale-110 object-cover blur-xl brightness-60" />
      <img
        id={currentSrc}
        ref={imageRef}
        src={currentSrc}
        alt={alt}
        loading="lazy"
        className={cn(
          'relative h-6/5 w-auto object-cover shadow-card transition-opacity duration-300',
          isLoaded && 'opacity-100',
          !isLoaded && 'pointer-events-none opacity-0',
          imageClassName
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};
