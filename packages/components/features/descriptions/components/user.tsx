'use client';

import { UserDataDisplay } from '@/components/data-display/user';
import { DescriptionEmpty } from './empty';

type DescriptionUserProps = {
  /** User id — also seeds the avatar color. */
  uuid?: string | null;
  /** Display name. */
  username?: string | null;
  /** Email shown under the name. */
  email?: string | null;
};

/**
 * A user (avatar, name, email) via `UserDataDisplay`. Renders `DescriptionEmpty` when neither
 * `uuid` nor `username` is set.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="…">
 *   <DescriptionUser uuid={order.createdBy.uuid} username={order.createdBy.name} email={order.createdBy.email} />
 * </DescriptionItem>
 * ```
 */
export const DescriptionUser: React.FC<DescriptionUserProps> = ({ uuid, username, email }) => {
  if (!uuid && !username) return <DescriptionEmpty />;
  return <UserDataDisplay uuid={uuid ?? ''} username={username ?? ''} email={email ?? ''} />;
};
