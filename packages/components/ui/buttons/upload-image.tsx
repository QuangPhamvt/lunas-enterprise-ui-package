import type { PropsWithChildren } from 'react';

import { UploadIcon } from 'lucide-react';

import { Button } from '../button';

type Props = {
  /**
   * Numeric pixel value applied to both the `width` and `height` of the button via inline styles.
   * @default '5rem'
   */
  size?: number;
  /** Callback invoked when the button is clicked. */
  onClick?: () => void;
};

/**
 * A square outline button for triggering image upload flows, rendered with an upload icon and a configurable size.
 *
 * @example
 * import { UploadImageBtn } from '@customafk/lunas-ui/ui/buttons/upload-image';
 *
 * <UploadImageBtn size={96} onClick={() => openFilePicker()} />
 */
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
