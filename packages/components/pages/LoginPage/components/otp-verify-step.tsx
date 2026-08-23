'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '../../../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../../../ui/input-otp';
import { OTP_LENGTH, OTP_PATTERN } from '../constants';

export interface OtpVerifyStepProps {
  otp: string;
  onOtpChange: (value: string) => void;
  onComplete: () => void;
  isLoading: boolean;
  resendCooldownSeconds: number;
  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
}

export const OtpVerifyStep = memo(function OtpVerifyStep({
  otp,
  onOtpChange,
  onComplete,
  isLoading,
  resendCooldownSeconds,
  onVerify,
  onResend,
  onBack,
}: OtpVerifyStepProps) {
  // Đếm ngược sống hẳn trong component này — tick mỗi giây chỉ re-render
  // OtpVerifyStep, không kéo theo LoginPage cha re-render liên tục.
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

  // Bắt đầu đếm ngược ngay khi bước này được mount, dừng khi unmount (quay lại/đóng dialog)
  // biome-ignore lint/correctness/useExhaustiveDependencies: chỉ chạy 1 lần lúc mount, không cần re-run khi resendCooldownSeconds/startCountdown đổi
  useEffect(() => {
    startCountdown(resendCooldownSeconds);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleResendClick = useCallback(() => {
    startCountdown(resendCooldownSeconds);
    onResend();
  }, [onResend, resendCooldownSeconds, startCountdown]);

  return (
    <div className="flex flex-col items-center gap-4">
      <InputOTP
        maxLength={OTP_LENGTH}
        pattern={OTP_PATTERN}
        inputMode="text"
        value={otp}
        onChange={value => onOtpChange(value.toUpperCase())}
        onComplete={onComplete}
        disabled={isLoading}
        containerClassName="gap-1 sm:gap-2"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} className="size-7 text-xs sm:size-9 sm:text-sm" />
          <InputOTPSlot index={1} className="size-7 text-xs sm:size-9 sm:text-sm" />
          <InputOTPSlot index={2} className="size-7 text-xs sm:size-9 sm:text-sm" />
          <InputOTPSlot index={3} className="size-7 text-xs sm:size-9 sm:text-sm" />
        </InputOTPGroup>
        <InputOTPSeparator className="max-sm:[&>svg]:size-3" />
        <InputOTPGroup>
          <InputOTPSlot index={4} className="size-7 text-xs sm:size-9 sm:text-sm" />
          <InputOTPSlot index={5} className="size-7 text-xs sm:size-9 sm:text-sm" />
          <InputOTPSlot index={6} className="size-7 text-xs sm:size-9 sm:text-sm" />
          <InputOTPSlot index={7} className="size-7 text-xs sm:size-9 sm:text-sm" />
        </InputOTPGroup>
      </InputOTP>

      <Button type="button" isLoading={isLoading} disabled={otp.length < OTP_LENGTH} className="w-full" onClick={onVerify}>
        Đăng nhập
      </Button>

      <div className="flex items-center gap-1 text-text-positive-weak text-sm">
        <span>Chưa nhận được mã?</span>
        <Button variant="link" size="sm" className="h-auto p-0" disabled={countdown > 0 || isLoading} onClick={handleResendClick}>
          {countdown > 0 ? `Gửi lại (${countdown}s)` : 'Gửi lại'}
        </Button>
      </div>

      <Button type="button" variant="ghost" size="sm" className="w-full" disabled={isLoading} onClick={onBack}>
        Quay lại
      </Button>
    </div>
  );
});
