'use client';
import { LoaderIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast, type ToasterProps } from 'sonner';

/**
 * Global toast notification container — mount once near the root of your app; use the exported `toast` helper to trigger toasts from anywhere.
 *
 * @example
 * ```tsx
 * import { Toaster, toast } from '@customafk/lunas-ui/ui/sonner';
 *
 * // In your app root:
 * <Toaster />
 *
 * // Anywhere in your code:
 * toast.success('Saved!');
 * toast.error('Something went wrong.');
 * ```
 */
const Toaster = () => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      expand={false}
      visibleToasts={5}
      closeButton={true}
      position="bottom-right"
      swipeDirections={['left', 'right']}
      icons={{
        loading: <LoaderIcon size={16} className="animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'rgb(124 58 237)',
          '--normal-text': 'white',
          '--normal-border': 'transparent',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: '!text-white !border-none !rounded-xl cursor-grab active:cursor-grabbing select-none z-99999 !px-4 !py-3.5 !gap-3 !items-center',
          icon: '!size-8 !rounded-full !bg-white/20 !shrink-0 [&>svg]:!size-4 !flex !items-center !justify-center',
          title: '!text-sm !font-bold !leading-snug !text-white',
          description: '!text-xs !font-medium !text-white/75 !leading-snug',
          success: '!bg-success',
          info: '!bg-blue-700',
          loading: '!bg-slate-500',
          warning: '!bg-warning',
          error: '!bg-danger',
          closeButton: '!text-white/60 hover:!text-white !bg-white/10 hover:!bg-white/20 !border-none !top-1/2 !-translate-y-1/2 !right-3 !left-auto',
        },
      }}
      className="toaster group pointer-events-auto z-999999!"
    />
  );
};

export { Toaster, toast };
export default Toaster;
