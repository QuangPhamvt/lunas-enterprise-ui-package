'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp';

export interface VerifyEmailPageProps {
  /** Controls whether the dialog is open */
  open: boolean;
  /** Called when the dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** The email address the OTP was dispatched to — displayed as context and passed to callbacks */
  email: string;
  /** Called when the user submits the OTP code */
  onVerify: (email: string, otp: string) => Promise<void> | void;
  /** Called when the user requests a new OTP; triggers a fresh cooldown */
  onResend: (email: string) => Promise<void> | void;
  /** Called when the back link is clicked */
  onBack?: () => void;
  /** Disables the form and shows a spinner on the submit button */
  isLoading?: boolean;
  /** Server-side error message rendered in a destructive Alert */
  errorMessage?: string;
  /** Dialog heading. Default: "Xác thực email" */
  title?: string;
  /** Dialog subheading. Default: built from the email prop */
  subtitle?: string;
  /** Seconds before the resend button becomes available. Default: 60 */
  resendCooldownSeconds?: number;
}

/**
 * Modal email OTP verification dialog for the client authentication flow.
 *
 * @example
 * ```tsx
 * import { VerifyEmailPage } from '@customafk/lunas-ui/pages/VerifyEmailPage';
 *
 * <VerifyEmailPage
 *   open={open}
 *   onOpenChange={setOpen}
 *   email="user@example.com"
 *   onVerify={async (email, otp) => {
 *     await authService.verifyEmail(email, otp);
 *     setOpen(false);
 *   }}
 *   onResend={async (email) => {
 *     await authService.resendVerification(email);
 *   }}
 * />
 * ```
 */
export const VerifyEmailPage = ({
  open,
  onOpenChange,
  email,
  onVerify,
  onResend,
  onBack,
  isLoading = false,
  errorMessage,
  title = 'Xác thực email',
  subtitle,
  resendCooldownSeconds = 60,
}: VerifyEmailPageProps) => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(resendCooldownSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback((seconds: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCountdown(seconds);
    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (open && resendCooldownSeconds > 0) startCountdown(resendCooldownSeconds);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open, resendCooldownSeconds, startCountdown]);

  const handleResend = useCallback(async () => {
    startCountdown(resendCooldownSeconds);
    await onResend(email);
  }, [email, onResend, resendCooldownSeconds, startCountdown]);

  const handleVerify = useCallback(async () => {
    if (otp.length < 6) return;
    await onVerify(email, otp);
  }, [email, otp, onVerify]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-sm:data-[state=open]:slide-in-from-bottom max-sm:data-[state=open]:zoom-in-100 max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=closed]:zoom-out-100 max-sm:top-auto max-sm:right-0 max-sm:bottom-0 max-sm:left-0 max-sm:max-w-full max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {subtitle ?? (
              <>
                Nhập mã OTP đã được gửi tới <span className="font-medium text-foreground">{email}</span>. Mã có hiệu lực trong 10 phút.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          {errorMessage && (
            <Alert variant="destructive" className="w-full">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <InputOTP maxLength={6} value={otp} onChange={setOtp} onComplete={handleVerify} disabled={isLoading}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button type="button" isLoading={isLoading} disabled={otp.length < 6} className="w-full" onClick={handleVerify}>
            Xác thực
          </Button>

          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <span>Chưa nhận được mã?</span>
            <Button variant="link" size="sm" className="h-auto p-0" disabled={countdown > 0 || isLoading} onClick={handleResend}>
              {countdown > 0 ? `Gửi lại (${countdown}s)` : 'Gửi lại'}
            </Button>
          </div>

          {onBack && (
            <Button variant="ghost" size="sm" className="w-full" onClick={onBack}>
              Quay lại
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
