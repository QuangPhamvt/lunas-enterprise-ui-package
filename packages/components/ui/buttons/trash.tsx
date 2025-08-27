import { Trash2Icon } from "lucide-react";

import { Button } from "../button";

type Props = {
  onClick?: () => void;
};
export const TrashBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      aria-label="Xoá"
      variant="ghost"
      size="icon"
      className="aspect-square max-sm:p-0"
      onClick={onClick}
    >
      <Trash2Icon size={16} className="opacity-60" aria-hidden="true" />
    </Button>
  );
};
