'use client'

import { cn } from '@/lib/utils'

export const Grid: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="@container size-full">
      <div
        className={cn(
          'grid grid-cols-1 gap-4',
          '@3xs:grid-cols-1',
          '@2xs:grid-cols-1',
          '@xs:grid-cols-1',
          '@sm:grid-cols-1',
          '@md:grid-cols-2',
          '@lg:grid-cols-2',
          '@xl:grid-cols-2',
          '@2xl:grid-cols-2',
          '@3xl:grid-cols-3',
          '@4xl:grid-cols-3',
          '@5xl:grid-cols-4',
          '@6xl:grid-cols-4',
          '@7xl:grid-cols-5',
          '@8xl:grid-cols-6',
          '@9xl:grid-cols-7',
          '@10xl:grid-cols-8',
        )}
      >
        {children}
      </div>
    </div>
  )
}
