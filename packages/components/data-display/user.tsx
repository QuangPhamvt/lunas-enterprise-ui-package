import { UserRoundIcon } from 'lucide-react';

import { colorHashLight } from '@customafk/react-toolkit/color-hash';

import { Flex } from '../layouts/flex';
import { Paragraph } from '../typography/paragraph';
import { Avatar, AvatarFallback } from '../ui/avatar';

type UserDataDisplayProps = {
  uuid: string;
  username: string;
  email: string;
};

export const UserDataDisplay: React.FC<React.PropsWithChildren<UserDataDisplayProps>> = ({ uuid, username, email }) => {
  return (
    <Flex wrap={false} gap="sm" padding="none">
      <Avatar className="size-10 shadow-card">
        <AvatarFallback style={{ backgroundColor: colorHashLight.hex(uuid) }}>
          <UserRoundIcon size={28} className="text-white" />
        </AvatarFallback>
      </Avatar>
      <Flex vertical padding="none" gap="none" align="start">
        <Paragraph className="font-medium text-sm text-text-positive">{username}</Paragraph>
        <Paragraph variant="sm" className="mt-0! text-text-positive-weak text-xs">
          {email}
        </Paragraph>
      </Flex>
    </Flex>
  );
};
