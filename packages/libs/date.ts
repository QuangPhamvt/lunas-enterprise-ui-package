import { format } from '@customafk/react-toolkit/date-fns';

import { vietnameseLocale } from '@/constants';

export const getVietnameseWeekday = (d: Date, short = false): string => {
  return short ? vietnameseLocale.weekdaysShort[d.getDay()] : vietnameseLocale.weekdays[d.getDay()];
};

export const getVietnameseMonth = (d: Date, short = false): string => {
  return short ? vietnameseLocale.monthsShort[d.getMonth()] : vietnameseLocale.months[d.getMonth()];
};

/** Long date, e.g. `15 Tháng 03, 2024` — Vietnamese equivalent of date-fns' `PPP` token. */
export const formatVietnameseLongDate = (d: Date): string => `${format(d, 'd')} ${getVietnameseMonth(d)}, ${format(d, 'yyyy')}`;

/** Full date with weekday, e.g. `Thứ Sáu, ngày 15 Tháng 03 năm 2024` — Vietnamese equivalent of date-fns' `PPPP` token. */
export const formatVietnameseFullDate = (d: Date): string =>
  `${getVietnameseWeekday(d)}, ngày ${format(d, 'd')} ${getVietnameseMonth(d)} năm ${format(d, 'yyyy')}`;
