'use client';

import { ERole } from '@/types';

import { Badge } from '../ui/badge';

const ROLE_COLORS: Record<ERole, React.ComponentProps<typeof Badge>['color']> = {
  [ERole.ADMIN]: 'primary',
  [ERole.SUPER_ADMIN]: 'danger',
  [ERole.MODERATOR]: 'info',
  [ERole.STAFF]: 'accent',
  [ERole.USER]: 'muted',
};

const ROLE_LABELS: Record<ERole, string> = {
  [ERole.SUPER_ADMIN]: 'Super Admin',
  [ERole.ADMIN]: 'Admin',
  [ERole.MODERATOR]: 'Moderator',
  [ERole.STAFF]: 'Staff',
  [ERole.USER]: 'User',
};

type RoleBadgeProps = {
  /** The user role enum value that determines the badge label and colour. */
  status: ERole;
};

/**
 * Renders a colour-coded badge for a user role (e.g. Admin, Staff, User).
 *
 * @example
 * ```tsx
 * import { RoleBadge } from '@customafk/lunas-ui/data-display/role-badge';
 * import { ERole } from '@customafk/lunas-ui/types';
 *
 * <RoleBadge status={ERole.ADMIN} />
 * ```
 */
export const RoleBadge: React.FC<RoleBadgeProps> = ({ status }) => {
  return (
    <Badge data-slot="role-badge" color={ROLE_COLORS[status]} className="min-w-24 justify-center">
      {ROLE_LABELS[status]}
    </Badge>
  );
};
