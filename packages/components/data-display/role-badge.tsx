'use client';

import { ERole } from '@/types';

import { Badge } from '../ui/badge';

const ROLE_COLORS: Record<ERole, React.ComponentProps<typeof Badge>['color']> = {
  [ERole.ADMIN]: 'red',
  [ERole.SUPER_ADMIN]: 'purple',
  [ERole.MODERATOR]: 'indigo',
  [ERole.STAFF]: 'green',
  [ERole.USER]: 'blue',
};

const ROLE_LABELS: Record<ERole, string> = {
  [ERole.SUPER_ADMIN]: 'Super Admin',
  [ERole.ADMIN]: 'Admin',
  [ERole.MODERATOR]: 'Moderator',
  [ERole.STAFF]: 'Staff',
  [ERole.USER]: 'User',
};

type RoleBadgeProps = {
  status: ERole;
};

export const RoleBadge: React.FC<RoleBadgeProps> = ({ status }) => {
  return (
    <Badge data-slot="role-badge" color={ROLE_COLORS[status]} className="min-w-24 justify-center">
      {ROLE_LABELS[status]}
    </Badge>
  );
};
