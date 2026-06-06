import { useCallback } from 'react';

import { LogOutIcon, MenuIcon, ShoppingCartIcon, UserRoundIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { PaymentLayoutUser } from '../index';
import { useSidebar } from './sidebar';
import { Flex } from '../../flex';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Paragraph } from '@/components/typography/paragraph';
import { colorHashLight } from '@customafk/react-toolkit/color-hash';

type UserDataDisplayProps = {
  /** Unique identifier used to deterministically generate the avatar background colour. */
  uuid: string;
  /** Display name rendered as the primary line of the user card. */
  username: string;
  /** Email address rendered as the secondary, muted line below the username. */
  email: string;
};

/**
 * Displays a user identity card with a colour-hashed avatar, username, and email address.
 *
 * @example
 * ```tsx
 * import { UserDataDisplay } from '@customafk/lunas-ui/data-display/user';
 *
 * <UserDataDisplay uuid="abc-123" username="Nguyễn Văn An" email="an@example.com" />
 * ```
 */
export const UserDataDisplay: React.FC<UserDataDisplayProps> = ({ uuid, username, email }) => {
  return (
    <Flex data-slot="user-display" wrap={false} gap="sm" padding="none">
      <Avatar className="size-9 shadow-card">
        <AvatarFallback style={{ backgroundColor: colorHashLight.hex(uuid) }}>
          <UserRoundIcon size={28} className="text-white" />
        </AvatarFallback>
      </Avatar>
      <Flex vertical padding="none" gap="none" align="start" className="hidden sm:flex">
        <Paragraph className="text-sm font-medium text-text-positive">{username}</Paragraph>
        <Paragraph variant="sm" className="mt-0! text-xs text-text-positive-weak">
          {email}
        </Paragraph>
      </Flex>
    </Flex>
  );
};

export const PaymentLayoutHeader: React.FC<{
  user?: PaymentLayoutUser | null;
  onLogin?: () => void;
  onLogout?: () => void;
}> = ({ user, onLogin, onLogout }) => {
  const { toggleSidebar } = useSidebar();

  const handleToggleSidebar = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSidebar();
    },
    [toggleSidebar]
  );

  const handleLogout = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onLogout?.();
    },
    [onLogout]
  );

  const handleLogin = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onLogin?.();
    },
    [onLogin]
  );

  return (
    <header
      data-slot="payment-layout-header"
      className={cn(
        'bg-card',
        'h-(--header-height)',
        'sm:h-[calc(var(--header-height)+0.5rem)] sm:px-4 sm:pr-6',
        'absolute inset-x-0 top-0 z-20 gap-2 px-2 pr-2.5',
        'flex items-center shadow-nav',
        'transition-[width,height] ease-linear'
      )}
    >
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        color="muted"
        size="icon"
        className="size-10 rounded-full transition-all hover:text-text-positive"
        onClick={handleToggleSidebar}
      >
        <MenuIcon className="size-6!" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <div className="flex flex-1 gap-x-2 sm:ml-2.5">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <ShoppingCartIcon size={20} />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Lunas Store</span>
          <span className="truncate text-xs">Quản lý đơn hàng, thanh toán và hóa đơn người dùng</span>
        </div>
      </div>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" color="muted" className="gap-x-2 rounded-full px-2 transition-all hover:text-text-positive">
              <UserDataDisplay uuid={user?.uuid ?? ''} username={user.fullname} email={user.email} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <p className="font-medium">{user.fullname}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon size={14} />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button size="sm" onClick={handleLogin}>
          Đăng nhập
        </Button>
      )}
    </header>
  );
};
