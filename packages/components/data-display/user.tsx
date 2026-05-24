'use client';

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

export const UserDataDisplay: React.FC<UserDataDisplayProps> = ({ uuid, username, email }) => {
  return (
    <Flex data-slot="user-display" wrap={false} gap="sm" padding="none">
      <Avatar className="size-10 shadow-card">
        <AvatarFallback style={{ backgroundColor: colorHashLight.hex(uuid) }}>
          <UserRoundIcon size={28} className="text-white" />
        </AvatarFallback>
      </Avatar>
      <Flex vertical padding="none" gap="none" align="start">
        <Paragraph className="text-sm font-medium text-text-positive">{username}</Paragraph>
        <Paragraph variant="sm" className="mt-0! text-xs text-text-positive-weak">
          {email}
        </Paragraph>
      </Flex>
    </Flex>
  );
};
