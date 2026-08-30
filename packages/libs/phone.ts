export type TVietnamesePhone = {
  /** Digits only, national significant number with the trunk `0` and any `84`/`+84` prefix removed. */
  nsn: string;
  /** National display form, e.g. `'0987 654 321'`. Falls back to the sanitized digits when `valid` is `false`. */
  national: string;
  /** International display form, e.g. `'+84 987 654 321'`. Falls back to the sanitized digits when `valid` is `false`. */
  international: string;
  /** `false` when the input's national significant number isn't 9–10 digits (not a recognizable VN phone number). */
  valid: boolean;
};

/**
 * Parses a Vietnamese phone number in any common input shape (`0987654321`, `+84987654321`,
 * `84987654321`, with or without spaces/dashes) into national and international display forms.
 * Never throws — returns `null` for empty/blank input, and falls back to sanitized digits
 * (with `valid: false`) for anything that doesn't look like a 9–10 digit VN number.
 */
export function formatVietnamesePhone(raw: string | null | undefined): TVietnamesePhone | null {
  if (!raw?.trim()) return null;

  const digits = raw.replace(/\D/g, '');
  const nsn = digits.length > 9 && digits.startsWith('84') ? digits.slice(2) : digits.startsWith('0') ? digits.slice(1) : digits;
  const valid = /^\d{9,10}$/.test(nsn);

  if (!valid) return { nsn, national: digits, international: digits, valid };

  const groups = nsn.length === 9 ? [nsn.slice(0, 3), nsn.slice(3, 6), nsn.slice(6, 9)] : [nsn.slice(0, 4), nsn.slice(4, 7), nsn.slice(7, 10)];

  return {
    nsn,
    national: `0${groups[0]} ${groups[1]} ${groups[2]}`,
    international: `+84 ${groups[0]} ${groups[1]} ${groups[2]}`,
    valid,
  };
}
