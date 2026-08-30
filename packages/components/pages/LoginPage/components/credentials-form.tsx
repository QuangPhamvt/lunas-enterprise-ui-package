'use client';

import { memo } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import type { LoginMethod } from '../types';

export interface CredentialsFormProps {
  emailId: string;
  passwordId: string;
  method: LoginMethod;
  onMethodChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  fieldErrors: { email?: string; password?: string };
  isLoading: boolean;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  onClose: () => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export const CredentialsForm = memo(function CredentialsForm({
  emailId,
  passwordId,
  method,
  onMethodChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  showPassword,
  onToggleShowPassword,
  fieldErrors,
  isLoading,
  onForgotPassword,
  onRegister,
  onClose,
  onSubmit,
}: CredentialsFormProps) {
  return (
    <>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={emailId}>Email</Label>
          <Input
            id={emailId}
            type="email"
            autoComplete="email"
            placeholder="nguyenvana@example.com"
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            aria-invalid={!!fieldErrors.email}
            disabled={isLoading}
          />
          {fieldErrors.email && <p className="text-danger text-xs">{fieldErrors.email}</p>}
        </div>

        {method === 'password' && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor={passwordId}>Mật khẩu</Label>
              {onForgotPassword && (
                <Button type="button" variant="link" size="sm" className="h-auto p-0 text-xs ring-0! ring-offset-0!" onClick={onForgotPassword}>
                  Quên mật khẩu?
                </Button>
              )}
            </div>
            <div className="relative">
              <Input
                id={passwordId}
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={e => onPasswordChange(e.target.value)}
                aria-invalid={!!fieldErrors.password}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-text-positive-strong"
                onMouseDown={e => {
                  e.preventDefault();
                  onToggleShowPassword();
                }}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && <p className="text-danger text-xs">{fieldErrors.password}</p>}
          </div>
        )}

        <Button type="submit" isLoading={isLoading} className="w-full">
          {method === 'password' ? 'Đăng nhập' : 'Gửi mã đăng nhập'}
        </Button>
        <Button type="button" variant="outline" className="w-full" disabled={isLoading} onClick={onClose}>
          Đóng hộp thoại
        </Button>

        <div className="flex flex-col gap-1.5">
          <Label>Phương thức đăng nhập</Label>
          <Select value={method} onValueChange={onMethodChange} disabled={isLoading}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="otp">Mã gửi qua email</SelectItem>
              <SelectItem value="password">Mật khẩu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>

      {onRegister && (
        <div className="flex justify-center gap-1 text-muted-foreground text-sm">
          <span>Chưa có tài khoản?</span>
          <Button variant="link" size="sm" className="h-auto p-0" onClick={onRegister}>
            Đăng ký
          </Button>
        </div>
      )}
    </>
  );
});
