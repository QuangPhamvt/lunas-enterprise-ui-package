import { colorHashLight } from '@customafk/react-toolkit/color-hash';

import { UserRoundIcon } from 'lucide-react';

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
      <Avatar className="shadow-card size-10">
        <AvatarFallback style={{ backgroundColor: colorHashLight.hex(uuid) }}>
          <UserRoundIcon size={28} className="text-white" />
        </AvatarFallback>
      </Avatar>
      <Flex vertical padding="none" gap="none" align="start">
        <Paragraph className="text-text-positive text-sm font-medium">{username}</Paragraph>
        <Paragraph variant="sm" className="text-text-positive-weak !mt-0 text-xs">
          {email}
        </Paragraph>
      </Flex>
    </Flex>
  );
};
