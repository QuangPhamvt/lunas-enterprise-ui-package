'use client';

import { useCallback, useEffect, useId, useMemo, useState } from 'react';

import { LunasLogo } from '../../features/logo';
import { Alert, AlertDescription } from '../../ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { CredentialsForm } from './components/credentials-form';
import { OtpVerifyStep } from './components/otp-verify-step';
import { OTP_LENGTH, otpRequestSchema, passwordLoginSchema } from './constants';
import type { LoginMethod, LoginPageProps } from './types';

export type { LoginMethod, LoginPageProps } from './types';

/**
 * Modal login dialog for the client authentication flow. Defaults to
 * email/password credentials; a select at the bottom of the form switches
 * to a passwordless login code sent by email instead. The code flow's
 * request and verify steps are both handled inside this single dialog.
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
 *   onRequestOtp={async (email) => {
 *     const res = await authService.requestLoginOtp(email);
 *     return res.success;
 *   }}
 *   onVerifyOtp={async (email, otp) => {
 *     await authService.verifyLoginOtp(email, otp);
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
  onRequestOtp,
  onVerifyOtp,
  onForgotPassword,
  onRegister,
  isLoading = false,
  errorMessage,
  title = 'Đăng nhập',
  subtitle = 'Nhập thông tin để tiếp tục',
  resendCooldownSeconds = 60,
}: LoginPageProps) => {
  const emailId = useId();
  const passwordId = useId();
  const [method, setMethod] = useState<LoginMethod>('password');
  const [step, setStep] = useState<'form' | 'otp-verify'>('form');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (!open) {
      setStep('form');
      setEmail('');
      setPassword('');
      setOtp('');
      setShowPassword(false);
      setFieldErrors({});
      setMethod('password');
    }
  }, [open]);

  // Chuyển đổi giữa phương thức "password" và "otp", xoá lỗi/mật khẩu cũ
  const handleMethodChange = useCallback((value: string) => {
    if (value !== 'password' && value !== 'otp') return;
    setMethod(value as LoginMethod);
    setFieldErrors({});
    setPassword('');
  }, []);

  // Validate rồi gọi onLogin khi đăng nhập bằng email/mật khẩu
  const handlePasswordSubmit = useCallback(async () => {
    const result = passwordLoginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({ email: errors.email?.[0], password: errors.password?.[0] });
      return;
    }
    setFieldErrors({});
    await onLogin(email, password);
  }, [email, password, onLogin]);

  // Validate email rồi gửi yêu cầu OTP, chuyển sang bước nhập mã nếu thành công
  const handleOtpRequestSubmit = useCallback(async () => {
    const result = otpRequestSchema.safeParse({ email });
    if (!result.success) {
      setFieldErrors({ email: result.error.flatten().fieldErrors.email?.[0] });
      return;
    }
    setFieldErrors({});
    const sent = await onRequestOtp(email);
    if (sent) setStep('otp-verify');
  }, [email, onRequestOtp]);

  // Submit form ở bước "form" — rẽ nhánh theo method đang chọn
  const handleSubmit = useCallback(
    async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (method === 'password') await handlePasswordSubmit();
      else await handleOtpRequestSubmit();
    },
    [method, handlePasswordSubmit, handleOtpRequestSubmit]
  );

  // Gửi lại mã OTP — đếm ngược tự quản lý bên trong OtpVerifyStep
  const handleResend = useCallback(async () => {
    await onRequestOtp(email);
  }, [email, onRequestOtp]);

  // Xác thực mã OTP khi đã nhập đủ độ dài
  const handleVerify = useCallback(async () => {
    if (otp.length < OTP_LENGTH) return;
    await onVerifyOtp(email, otp);
  }, [email, otp, onVerifyOtp]);

  // Quay lại bước "form" từ bước nhập OTP
  const handleBackToForm = useCallback(() => {
    setOtp('');
    setStep('form');
  }, []);

  // Đảo trạng thái hiện/ẩn mật khẩu
  const handleToggleShowPassword = useCallback(() => setShowPassword(v => !v), []);

  // Đóng dialog đăng nhập
  const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Nội dung mô tả dialog đổi theo bước hiện tại — chỉ tính lại khi step/email/subtitle đổi
  const dialogDescription = useMemo(
    () =>
      step === 'otp-verify' ? (
        <>
          Nhập mã đăng nhập đã được gửi tới <span className="font-medium text-text-positive-weak">{email}</span>. Mã có hiệu lực trong 10 phút.
        </>
      ) : (
        subtitle
      ),
    [step, email, subtitle]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-sm:data-[state=open]:slide-in-from-bottom max-sm:data-[state=open]:zoom-in-100 max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=closed]:zoom-out-100 max-sm:top-auto max-sm:right-0 max-sm:bottom-0 max-sm:left-0 max-sm:max-w-full max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none sm:max-w-sm"
      >
        <DialogHeader>
          <LunasLogo variant="horizontal" size="sm" className="mx-auto" />
          <div className="flex flex-col gap-0.5 items-center">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </div>
        </DialogHeader>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {step === 'form' ? (
          <CredentialsForm
            emailId={emailId}
            passwordId={passwordId}
            method={method}
            onMethodChange={handleMethodChange}
            email={email}
            onEmailChange={setEmail}
            password={password}
            onPasswordChange={setPassword}
            showPassword={showPassword}
            onToggleShowPassword={handleToggleShowPassword}
            fieldErrors={fieldErrors}
            isLoading={isLoading}
            onForgotPassword={onForgotPassword}
            onRegister={onRegister}
            onClose={handleClose}
            onSubmit={handleSubmit}
          />
        ) : (
          <OtpVerifyStep
            otp={otp}
            onOtpChange={setOtp}
            onComplete={handleVerify}
            isLoading={isLoading}
            resendCooldownSeconds={resendCooldownSeconds}
            onVerify={handleVerify}
            onResend={handleResend}
            onBack={handleBackToForm}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
