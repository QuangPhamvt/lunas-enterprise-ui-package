import { Trash2Icon } from 'lucide-react';

import { Button } from '../button';

type Props = {
  /** Callback invoked when the button is clicked. */
  onClick?: () => void;
};

/**
 * An icon-only ghost button that triggers a delete action, rendered with a trash-can icon.
 *
 * @example
 * import { TrashBtn } from '@customafk/lunas-ui/ui/buttons/trash';
 *
 * <TrashBtn onClick={() => deleteRecord(record.id)} />
 */
export const TrashBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <Button aria-label="Xoá" variant="ghost" size="icon" color="secondary" className="max-sm:aspect-square max-sm:p-0" onClick={onClick}>
      <Trash2Icon size={16} className="opacity-60" aria-hidden="true" />
    </Button>
  );
};
