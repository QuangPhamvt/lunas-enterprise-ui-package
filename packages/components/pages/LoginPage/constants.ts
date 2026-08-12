import { z } from 'zod/v4';

// Same alphabet as the backend's generated code — visually confusing
// characters (0/O, 1/I/L) are excluded.
export const OTP_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
// Accepts both cases at the input level — input-otp validates each keystroke
// against this pattern *before* our onChange runs, so lowercase must be
// allowed here too or typing it (the common case, no shift/caps-lock) gets
// silently rejected. onChange still upper-cases the accepted value.
export const OTP_PATTERN = `^[${OTP_ALPHABET}${OTP_ALPHABET.toLowerCase()}]*$`;
export const OTP_LENGTH = 8;

export const passwordLoginSchema = z.object({
  email: z.email('Email không hợp lệ').min(1, 'Vui lòng nhập email'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

export const otpRequestSchema = z.object({
  email: z.email('Email không hợp lệ').min(1, 'Vui lòng nhập email'),
});
