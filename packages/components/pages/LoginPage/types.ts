export type LoginMethod = 'otp' | 'password';

export interface LoginPageProps {
  /** Controls whether the dialog is open */
  open: boolean;
  /** Called when the dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** Called when the user submits email + password credentials */
  onLogin: (email: string, password: string) => Promise<void> | void;
  /**
   * Called when the user requests a login code for the given email. Return (or
   * resolve to) `true` to advance to the code-entry step, or `false` to stay on
   * the current step (e.g. after a rate-limit error — set `errorMessage` to explain why).
   */
  onRequestOtp: (email: string) => Promise<boolean> | boolean;
  /** Called when the user submits the login code */
  onVerifyOtp: (email: string, otp: string) => Promise<void> | void;
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
  /**
   * Seconds before the resend button becomes available on the code-entry step. Default: 60.
   * Pass the backend's `retryAfterSeconds` here when re-entering this screen after a 429.
   */
  resendCooldownSeconds?: number;
}
