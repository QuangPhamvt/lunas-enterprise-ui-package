import { PlusIcon } from "lucide-react";

import { Paragraph } from "@/components/typography/paragraph";

import { Button } from "../button";

type Props = {
  onClick?: () => void;
};
export const AddNewBtn: React.FC<React.PropsWithChildren<Props>> = ({
  onClick = () => {},
}) => {
  return (
    <Button
      aria-label="Tạo mới"
      variant="outline"
      className="aspect-square max-sm:p-0"
      onClick={onClick}
    >
      <PlusIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
      <Paragraph variant="sm" className="max-sm:sr-only">
        Create New
      </Paragraph>
    </Button>
  );
};
