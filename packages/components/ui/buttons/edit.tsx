import { Edit2Icon } from 'lucide-react';

import { Button } from '../button';

type Props = {
  /** Callback invoked when the button is clicked. */
  onClick?: () => void;
};

/**
 * An icon-only ghost button that triggers an edit action, rendered with a pencil icon.
 *
 * @example
 * import { EditBtn } from '@customafk/lunas-ui/ui/buttons/edit';
 *
 * <EditBtn onClick={() => openEditDialog(record.id)} />
 */
export const EditBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <Button aria-label="Chỉnh sửa" variant="ghost" color="secondary" size="icon" className="max-sm:aspect-square max-sm:p-0" onClick={onClick}>
      <Edit2Icon size={16} className="opacity-60" />
    </Button>
  );
};
