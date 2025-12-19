import { useMemo } from 'react';

import { CircleAlertIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Tooltip } from 'radix-ui';

export const DataGridErrorTooltip: React.FC<{ errors: Array<{ message?: string }> }> = ({ errors }) => {
  const content = useMemo(() => {
    if (!errors) {
      return null;
    }

    if (errors?.length === 1 && errors[0]?.message) {
      return (
        <div className="flex flex-row items-center justify-start gap-x-0.5">
          <p>{errors[0].message}</p>
        </div>
      );
    }

    return (
      <ul className="flex list-none flex-col gap-1">
        {errors.map(error => {
          if (typeof error === 'string') return <li key={error}>{error}</li>;
          if (!error?.message) return null;
          return <li key={error.message}>{error.message}</li>;
        })}
      </ul>
    );
  }, [errors]);

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="-translate-y-1/2 absolute top-4 right-2 cursor-pointer text-danger">
            <CircleAlertIcon size={14} />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            align="center"
            sideOffset={5}
            className={cn(
              'rounded border border-danger bg-danger-bg-subtle px-3 py-2 text-danger text-sm shadow-dropdown outline-none',
              'origin-(--radix-tooltip-content-transform-origin)',
              'fade-in-0 zoom-in-95 animate-in',
              'data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0',
              'data-[state=closed]:zoom-out-95',
              'data-[side=bottom]:slide-in-from-top-2',
              'data-[side=left]:slide-in-from-right-2',
              'data-[side=right]:slide-in-from-left-2',
              'data-[side=top]:slide-in-from-bottom-2'
            )}
          >
            {content}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
