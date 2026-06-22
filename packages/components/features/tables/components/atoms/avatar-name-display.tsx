'use client';

import { UserRoundIcon } from 'lucide-react';

import { colorHashLight } from '@customafk/react-toolkit/color-hash';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

/** Props for the {@link UITableAvatarNameDisplay} component. */
type Props = {
  /** Display name shown beside the avatar. */
  name: string;
  /** Optional image URL for the avatar. Falls back to a color-hashed icon when absent. */
  avatarUrl?: string;
  /** Seed for deterministic avatar background color generation. Defaults to `name`. */
  uuid?: string;
};

/**
 * Renders a circular avatar paired with a name in a compact horizontal row.
 * When no `avatarUrl` is provided the fallback uses a deterministic background
 * color derived from `uuid` (or `name`) via `colorHashLight`, matching the
 * style of `UserDataDisplay`.
 *
 * @example
 * import { UITableAvatarNameDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableAvatarNameDisplay name="Jane Smith" uuid="user-42" avatarUrl="/avatars/jane.png" />
 */
export const UITableAvatarNameDisplay: React.FC<Props> = ({ name, avatarUrl, uuid }) => {
  const bgColor = colorHashLight.hex(uuid ?? name);
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Avatar className="size-8 shrink-0">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback style={{ backgroundColor: bgColor }}>
          <UserRoundIcon size={18} className="text-white" />
        </AvatarFallback>
      </Avatar>
      <span className="truncate text-sm font-medium">{name}</span>
    </div>
  );
};
