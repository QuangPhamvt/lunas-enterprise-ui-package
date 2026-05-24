'use client';

import { UserDataDisplay } from '@/components/data-display/user';

import { DescriptionEmpty } from './empty';

type DescriptionUserProps = {
  uuid?: string | null;
  username?: string | null;
  email?: string | null;
};

export const DescriptionUser: React.FC<DescriptionUserProps> = ({ uuid, username, email }) => {
  if (!uuid || !username || !email) return <DescriptionEmpty />;
  return <UserDataDisplay uuid={uuid} username={username} email={email} />;
};
