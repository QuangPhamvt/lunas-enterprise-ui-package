import { UserRoundIcon } from 'lucide-react';

import { colorHashLight } from '@customafk/react-toolkit/color-hash';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { Flex } from '@/components/layouts/flex';
import { Paragraph } from '@/components/typography/paragraph';

type Props = {
  uuid?: string | null | undefined;
  username?: string | null | undefined;
  email?: string | null | undefined;
};

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
