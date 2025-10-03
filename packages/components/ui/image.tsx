import { useCallback, useRef, useState } from 'react'
import { cn } from '@customafk/react-toolkit/utils'

import { AlertCircleIcon } from 'lucide-react'

import { Skeleton } from './skeleton'

type Props = {
  src?: string
  alt?: string
  width?: number | string
  height?: number | string
  maxRetries?: number
  retryDelay?: number
  className?: string
  onClick?: () => void
}
export const Image: React.FC<Props> = ({ src, alt, width, height, maxRetries = 3, retryDelay = 500, className, onClick }) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src)
  const [retryCount, setRetryCount] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    if (retryCount < maxRetries) {
      // imageRef.current?.style.setProperty('display', 'none')
      setHasError(false)
      const newRetryCount = retryCount + 1
      setRetryCount(newRetryCount)

      // Retry with exponential backoff and cache busting
      setTimeout(() => {
        const cacheBuster = `?retry=${Date.now()}&attempt=${newRetryCount}`
        setCurrentSrc(src + cacheBuster)
      }, retryDelay * newRetryCount)
      return
    }

    setHasError(true)
    setIsLoaded(true)
    setCurrentSrc(src)
  }, [maxRetries, retryCount, retryDelay, src])

  if (hasError) {
    return (
      <div style={{ width, height }} className={cn('@container relative inline-block', className)}>
        <div className="bg-danger-muted shadow-card flex size-full flex-col items-center justify-center gap-y-2 rounded-md">
          <AlertCircleIcon className="text-danger size-8 @max-[52px]:size-6" />
          <span className="text-danger-weak text-center text-xs @max-[96px]:sr-only">Image failed to load</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width, height }} className={cn('relative flex items-center justify-center overflow-hidden rounded-md', className)} onClick={onClick}>
      {!isLoaded && <Skeleton className="absolute inset-0 flex size-full animate-pulse items-center justify-center" />}
      <img src={currentSrc} className="absolute inset-0 z-0 size-full scale-110 object-cover blur-xl brightness-60" />
      <img
        id={currentSrc}
        ref={imageRef}
        src={currentSrc}
        alt={alt}
        loading="lazy"
        className={cn(
          'shadow-card relative h-[120%] w-auto object-cover transition-opacity duration-300',
          isLoaded && 'opacity-100',
          !isLoaded && 'pointer-events-none opacity-0',
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}
