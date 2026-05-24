import { PlusIcon } from 'lucide-react';

import { Paragraph } from '@/components/typography/paragraph';

import { Button } from '../button';

type Props = {
  /** Callback invoked when the button is clicked. Defaults to a no-op. */
  onClick?: () => void;
};

/**
 * A toolbar button that triggers a "create new" action, displaying a plus icon alongside a "Create" label that is hidden on small screens.
 *
 * @example
 * import { AddNewBtn } from '@customafk/lunas-ui/ui/buttons/add-new';
 *
 * <AddNewBtn onClick={() => setOpen(true)} />
 */
export const AddNewBtn: React.FC<React.PropsWithChildren<Props>> = ({ onClick = () => {} }) => {
  return (
    <Button
      aria-label="Tạo mới"
      variant="outline"
      color="muted"
      className="outline-border-weak max-sm:aspect-square max-sm:size-9 max-sm:p-0"
      onClick={onClick}
    >
      <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
      <Paragraph variant="sm" className="max-sm:sr-only">
        Create
      </Paragraph>
    </Button>
  );
};
