import { RefreshCwIcon } from 'lucide-react';

import { Paragraph } from '@/components/typography/paragraph';

import { Button } from '../button';

type Props = {
  /** Callback invoked when the button is clicked. Defaults to a no-op. */
  onClick?: () => void;
};

/**
 * A toolbar button that triggers a refresh/reset action, displaying a rotating arrows icon alongside a "Reset" label that is hidden on small screens.
 *
 * @example
 * import { RefreshBtn } from '@customafk/lunas-ui/ui/buttons/refresh';
 *
 * <RefreshBtn onClick={() => resetFilters()} />
 */
export const RefreshBtn: React.FC<React.PropsWithChildren<Props>> = ({ onClick = () => {} }) => {
  return (
    <Button
      aria-label="Tạo mới"
      variant="outline"
      color="muted"
      className="outline-border-weak max-sm:aspect-square max-sm:size-9 max-sm:p-0"
      onClick={onClick}
    >
      <RefreshCwIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
      <Paragraph variant="sm" className="max-sm:sr-only">
        Reset
      </Paragraph>
    </Button>
  );
};
