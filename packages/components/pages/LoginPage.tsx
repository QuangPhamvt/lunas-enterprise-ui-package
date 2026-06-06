'use client';

import { useId, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface LoginPageProps {
  /** Controls whether the dialog is open */
  open: boolean;
  /** Called when the dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** Called when the user submits login credentials */
  onLogin: (email: string, password: string) => Promise<void> | void;
  /** Called when the "Quên mật khẩu?" link is clicked */
  onForgotPassword?: () => void;
  /** Called when the "Đăng ký" link is clicked */
  onRegister?: () => void;
  /** Disables the form and shows a spinner on the submit button */
  isLoading?: boolean;
  /** Server-side error message rendered in a destructive Alert */
  errorMessage?: string;
  /** Dialog heading. Default: "Đăng nhập" */
  title?: string;
  /** Dialog subheading. Default: "Nhập thông tin để tiếp tục" */
  subtitle?: string;
}

const loginSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

/**
 * Modal login dialog for the client authentication flow.
 *
 * @example
 * ```tsx
 * import { LoginPage } from '@customafk/lunas-ui/pages/LoginPage';
 *
 * <LoginPage
 *   open={open}
 *   onOpenChange={setOpen}
 *   onLogin={async (email, password) => {
 *     await authService.login(email, password);
 *     setOpen(false);
 *   }}
 *   onRegister={() => { setOpen(false); setRegisterOpen(true); }}
 * />
 * ```
 */
export const LoginPage = ({
  open,
  onOpenChange,
  onLogin,
  onForgotPassword,
  onRegister,
  isLoading = false,
  errorMessage,
  title = 'Đăng nhập',
  subtitle = 'Nhập thông tin để tiếp tục',
}: LoginPageProps) => {
  const emailId = useId();
  const passwordId = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({ email: errors.email?.[0], password: errors.password?.[0] });
      return;
    }
    setFieldErrors({});
    await onLogin(email, password);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-sm:data-[state=open]:slide-in-from-bottom max-sm:data-[state=open]:zoom-in-100 max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=closed]:zoom-out-100 max-sm:top-auto max-sm:right-0 max-sm:bottom-0 max-sm:left-0 max-sm:max-w-full max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={emailId}>Email</Label>
            <Input
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-invalid={!!fieldErrors.email}
              disabled={isLoading}
            />
            {fieldErrors.email && <p className="text-destructive text-xs">{fieldErrors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor={passwordId}>Mật khẩu</Label>
              {onForgotPassword && (
                <Button type="button" variant="link" size="sm" className="h-auto p-0 text-xs" onClick={onForgotPassword}>
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
                onChange={e => setPassword(e.target.value)}
                aria-invalid={!!fieldErrors.password}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                onMouseDown={e => {
                  e.preventDefault();
                  setShowPassword(v => !v);
                }}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && <p className="text-destructive text-xs">{fieldErrors.password}</p>}
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Đăng nhập
          </Button>
        </form>

        {onRegister && (
          <div className="flex justify-center gap-1 text-muted-foreground text-sm">
            <span>Chưa có tài khoản?</span>
            <Button variant="link" size="sm" className="h-auto p-0" onClick={onRegister}>
              Đăng ký
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
