import { cn } from '@customafk/react-toolkit/utils';

export const DataGridInput: React.FC<React.ComponentPropsWithRef<'input'>> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={cn(
        'w-full select-none border-none bg-none px-2.5 py-1.5 text-start text-sm text-text-positive outline-none aria-invalid:bg-danger-bg-subtle aria-invalid:pr-8 aria-invalid:text-text-positive-weak',
        className
      )}
    />
  );
};
