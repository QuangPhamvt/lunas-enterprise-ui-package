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
      richColors
      theme={theme as ToasterProps['theme']}
      expand={false}
      visibleToasts={5}
      closeButton={true}
      position="bottom-right"
      swipeDirections={['left', 'right']}
      icons={{
        loading: <LoaderIcon size={16} className="animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: '!text-white !border-none rounded-lg cursor-grab active:cursor-grabbing select-none z-99999',
          icon: '!size-6',
          title: '!text-sm !font-bold',
          description: '!text-xs !font-semibold !text-white/80',
          success: '!bg-success',
          info: '!bg-blue-700',
          loading: '!bg-slate-500',
          warning: '!bg-warning',
          error: '!bg-danger',
          closeButton: '!text-gray-400 hover:!text-gray-500 !bg-neutral-50 hover:!bg-gray-100 !border-none !shadow',
        },
      }}
      className="toaster group pointer-events-auto !z-999999"
    />
  );
};

export { Toaster, toast };
export default Toaster;
