import type { PropsWithChildren } from 'react';

import { UploadIcon } from 'lucide-react';

import { Button } from '../button';

type Props = {
  size?: number;
  onClick?: () => void;
};

export const UploadImageBtn: React.FC<PropsWithChildren<Props>> = ({ size = '5rem', onClick }) => {
  return (
    <Button
      style={{
        width: size,
        height: size,
      }}
      variant="outline"
      color="muted"
      onClick={onClick}
    >
      <UploadIcon className="size-6" />
    </Button>
  );
};
