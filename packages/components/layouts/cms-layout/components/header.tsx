'use client';

import { useCallback } from 'react';

import { EarthIcon, LogOutIcon, MenuIcon, UserRoundIcon } from 'lucide-react';

import { colorHashLight } from '@customafk/react-toolkit/color-hash';
import { cn } from '@customafk/react-toolkit/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LunasLogo } from '@/components/features/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useSidebar } from './sidebar';

export type CMSLayoutUser = {
  /** Display name shown in the header and user dropdown. */
  name: string;
  /** Email address shown below the name in the dropdown. */
  email?: string;
  /** Role or position shown as a muted label in the dropdown. */
  role?: string;
  /** Optional avatar image URL; falls back to a color-hashed icon. */
  avatarUrl?: string;
};

export const CMSLayoutHeader: React.FC<{
  i18nText?: string;
  onChangeToEnLocale?: () => void;
  onChangeToViLocale?: () => void;
  user?: CMSLayoutUser;
  onLogout?: () => void;
  logoutLabel?: string;
  logo?: React.ReactNode;
}> = ({ i18nText, onChangeToEnLocale, onChangeToViLocale, user, onLogout, logoutLabel = 'Log out', logo }) => {
  const { toggleSidebar } = useSidebar();

  const handleToggleSidebar = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSidebar();
    },
    [toggleSidebar]
  );

  const handleEnLocale = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onChangeToEnLocale?.();
    },
    [onChangeToEnLocale]
  );

  const handleViLocale = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onChangeToViLocale?.();
    },
    [onChangeToViLocale]
  );

  const avatarBg = user ? colorHashLight.hex(user.name) : undefined;

  return (
    <header
      data-slot="cms-layout-header"
      className={cn(
        'bg-card',
        'h-(--header-height)',
        'sm:h-(--header-height) sm:px-4 sm:pr-6',
        'absolute inset-x-0 top-0 z-20 gap-2 px-2 pr-4.5',
        'flex items-center shadow-nav',
        'transition-[height] ease-linear'
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

      <div className="flex flex-1 items-center sm:ml-2.5">{logo ?? <LunasLogo variant="horizontal" size="xs" />}</div>

      <div className="flex items-center gap-1">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" color="muted" className="h-9 gap-2.5 rounded-full px-2 transition-all">
                <Avatar className="size-7 shrink-0">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback style={{ backgroundColor: avatarBg }}>
                    <UserRoundIcon size={14} className="text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden flex-col items-start sm:flex">
                  <span className="max-w-36 truncate text-xs font-semibold leading-tight text-text-positive">{user.name}</span>
                  {user.email && <span className="max-w-36 truncate text-xs leading-tight text-text-positive-weak">{user.email}</span>}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <div className="flex flex-col items-center gap-2 px-4 py-4 text-center">
                <Avatar className="size-12">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback style={{ backgroundColor: avatarBg }}>
                    <UserRoundIcon size={22} className="text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 w-full flex-col items-center gap-0.5">
                  <p className="truncate text-sm font-semibold text-text-positive">{user.name}</p>
                  {user.email && <p className="truncate text-xs text-text-positive-weak">{user.email}</p>}
                  {user.role && (
                    <span className="mt-1 w-fit rounded-sm border border-border bg-secondary-muted px-2 py-0.5 text-xs font-medium text-text-positive-weak">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
              {onLogout && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="text-danger focus:text-danger" onClick={onLogout}>
                      <LogOutIcon className="size-4" />
                      {logoutLabel}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {user && (onChangeToEnLocale || onChangeToViLocale) && <div className="mx-1 h-5 w-px bg-border" />}

        {(onChangeToEnLocale || onChangeToViLocale) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button data-slot="locale-trigger" variant="ghost" color="muted" className="gap-x-1 rounded-full transition-all hover:text-text-positive">
                <EarthIcon className="size-6!" />
                {i18nText}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleEnLocale}>EN - English</DropdownMenuItem>
                <DropdownMenuItem onClick={handleViLocale}>VI - Vietnamese</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
