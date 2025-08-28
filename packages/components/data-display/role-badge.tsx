import React from 'react'

import { ERole } from '@/types'

import { Badge } from '../ui/badge'

type Props = {
  status: ERole
}
export const RoleBadge: React.FC<React.PropsWithChildren<Props>> = ({ status }) => {
  const colors = React.useMemo<Record<ERole, React.ComponentProps<typeof Badge>['color']>>(() => {
    return {
      [ERole.ADMIN]: 'red',
      [ERole.SUPER_ADMIN]: 'purple',
      [ERole.MODERATOR]: 'indigo',
      [ERole.STAFF]: 'green',
      [ERole.USER]: 'blue',
    }
  }, [])
  return (
    <Badge color={colors[status]} className="min-w-24 justify-center">
      {status === ERole.SUPER_ADMIN && 'Super Admin'}
      {status === ERole.ADMIN && 'Admin'}
      {status === ERole.MODERATOR && 'Moderator'}
      {status === ERole.STAFF && 'Staff'}
      {status === ERole.USER && 'User'}
    </Badge>
  )
}
