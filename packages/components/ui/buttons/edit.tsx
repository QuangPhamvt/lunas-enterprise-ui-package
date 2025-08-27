import { Edit2Icon } from "lucide-react";

import { Button } from "../button";

type Props = {
  onClick?: () => void;
};
export const EditBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      aria-label="Chỉnh sửa"
      variant="ghost"
      size="icon"
      className="aspect-square max-sm:p-0"
      onClick={onClick}
    >
      <Edit2Icon size={16} className="opacity-60" />
    </Button>
  );
};
