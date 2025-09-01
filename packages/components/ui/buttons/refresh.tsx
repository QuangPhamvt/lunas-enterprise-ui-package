import { RefreshCwIcon } from 'lucide-react'

import { Paragraph } from '@/components/typography/paragraph'

import { Button } from '../button'

type Props = {
  onClick?: () => void
}
export const RefreshBtn: React.FC<React.PropsWithChildren<Props>> = ({ onClick = () => {} }) => {
  return (
    <Button aria-label="Tạo mới" variant="outline" color="muted" className="max-sm:aspect-square max-sm:p-0" onClick={onClick}>
      <RefreshCwIcon className="opacity-60 sm:-ms-1" size={16} aria-hidden="true" />
      <Paragraph variant="sm" className="max-sm:sr-only">
        Reset
      </Paragraph>
    </Button>
  )
}
