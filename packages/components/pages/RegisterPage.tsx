'use client';

import { useId, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface RegisterPageProps {
  /** Controls whether the dialog is open */
  open: boolean;
  /** Called when the dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** Called when the user submits registration credentials */
  onRegister: (email: string, password: string) => Promise<void> | void;
  /** Called when the "Đăng nhập" link is clicked */
  onLogin?: () => void;
  /** Disables the form and shows a spinner on the submit button */
  isLoading?: boolean;
  /** Server-side error message rendered in a destructive Alert */
  errorMessage?: string;
  /** Dialog heading. Default: "Đăng ký" */
  title?: string;
  /** Dialog subheading. Default: "Tạo tài khoản mới để bắt đầu" */
  subtitle?: string;
}

const registerSchema = z
  .object({
    email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .max(50, 'Mật khẩu không được vượt quá 50 ký tự')
      .regex(/[A-Z]/, 'Phải có ít nhất một chữ hoa')
      .regex(/[a-z]/, 'Phải có ít nhất một chữ thường')
      .regex(/[0-9]/, 'Phải có ít nhất một chữ số')
      .regex(/[^A-Za-z0-9]/, 'Phải có ít nhất một ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

/**
 * Modal registration dialog for the client authentication flow.
 *
 * @example
 * ```tsx
 * import { RegisterPage } from '@customafk/lunas-ui/pages/RegisterPage';
 *
 * <RegisterPage
 *   open={open}
 *   onOpenChange={setOpen}
 *   onRegister={async (email, password) => {
 *     await authService.register(email, password);
 *     setOpen(false);
 *   }}
 *   onLogin={() => { setOpen(false); setLoginOpen(true); }}
 * />
 * ```
 */
export const RegisterPage = ({
  open,
  onOpenChange,
  onRegister,
  onLogin,
  isLoading = false,
  errorMessage,
  title = 'Đăng ký',
  subtitle = 'Tạo tài khoản mới để bắt đầu',
}: RegisterPageProps) => {
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = registerSchema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
        confirmPassword: errors.confirmPassword?.[0],
      });
      return;
    }
    setFieldErrors({});
    await onRegister(email, password);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
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
            <Label htmlFor={passwordId}>Mật khẩu</Label>
            <div className="relative">
              <Input
                id={passwordId}
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
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
            {fieldErrors.password ? (
              <p className="text-destructive text-xs">{fieldErrors.password}</p>
            ) : (
              <p className="text-muted-foreground text-xs">Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={confirmPasswordId}>Xác nhận mật khẩu</Label>
            <div className="relative">
              <Input
                id={confirmPasswordId}
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                aria-invalid={!!fieldErrors.confirmPassword}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                onMouseDown={e => {
                  e.preventDefault();
                  setShowConfirmPassword(v => !v);
                }}
                aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.confirmPassword && <p className="text-destructive text-xs">{fieldErrors.confirmPassword}</p>}
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Đăng ký
          </Button>
        </form>

        {onLogin && (
          <div className="flex justify-center gap-1 text-muted-foreground text-sm">
            <span>Đã có tài khoản?</span>
            <Button variant="link" size="sm" className="h-auto p-0" onClick={onLogin}>
              Đăng nhập
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
