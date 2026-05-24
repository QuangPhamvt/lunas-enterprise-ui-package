import { UserRoundIcon } from 'lucide-react';

import { colorHashLight } from '@customafk/react-toolkit/color-hash';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { Flex } from '@/components/layouts/flex';
import { Paragraph } from '@/components/typography/paragraph';

/** Props for the {@link UITableUserDataDisplay} component. */
type Props = {
  /** Unique identifier used to deterministically generate the avatar background colour. */
  uuid?: string | null | undefined;
  /** Display name shown below the avatar; falls back to `'Unknown User'` when absent. */
  username?: string | null | undefined;
  /** Email address shown as secondary text beneath the username. */
  email?: string | null | undefined;
};

/**
 * Renders a user avatar paired with username and email for use in table cells;
 * derives a consistent avatar background colour from the user's `uuid` via a
 * colour-hash utility.
 *
 * @example
 * import { UITableUserDataDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableUserDataDisplay
 *   uuid="a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *   username="Jane Smith"
 *   email="jane@example.com"
 * />
 */
export const UITableUserDataDisplay: React.FC<Props> = ({ uuid, username, email }) => {
  return (
    <Flex wrap={false} gap="sm" padding="none">
      {!uuid && (
        <Avatar className="size-10 shadow-card">
          <AvatarFallback className="bg-muted-weak">
            <UserRoundIcon size={28} className="text-text-negative" />
          </AvatarFallback>
        </Avatar>
      )}
      {uuid && (
        <Avatar className="size-10 shadow-card">
          <AvatarFallback style={{ backgroundColor: colorHashLight.hex(uuid) }}>
            <UserRoundIcon size={28} className="text-white" />
          </AvatarFallback>
        </Avatar>
      )}
      <Flex vertical padding="none" gap="none" align="start">
        <Paragraph className="font-medium text-sm text-text-positive-weak">{username ?? 'Unknown User'}</Paragraph>
        <Paragraph variant="sm" className="mt-0! text-text-positive-weak text-xs">
          {email}
        </Paragraph>
      </Flex>
    </Flex>
  );
};
