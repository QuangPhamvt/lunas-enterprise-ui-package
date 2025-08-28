// Vietnamese locale configuration
export const vietnameseLocale = {
  weekdays: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
  weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  monthsShort: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
}

// Vietnamese holidays
export const vietnameseHolidays = {
  '01-01': 'Tết Dương lịch',
  '03-08': 'Quốc tế Phụ nữ',
  '04-30': 'Ngày Giải phóng miền Nam',
  '05-01': 'Quốc tế Lao động',
  '09-02': 'Quốc khánh',
  '10-20': 'Ngày Phụ nữ Việt Nam',
  '11-20': 'Ngày Nhà giáo Việt Nam',
}

// Time Constants in milliseconds, seconds, and minutes
export const TIME_IN_MS = Object.freeze({
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000, // Approximation for month length = 30 days
  YEAR: 365 * 24 * 60 * 60 * 1000,
})

export const TIME_IN_SECONDS = Object.freeze({
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 24 * 60 * 60,
  WEEK: 7 * 24 * 60 * 60,
  MONTH: 30 * 24 * 60 * 60,
  YEAR: 365 * 24 * 60 * 60,
})

export const TIME_IN_MINUTES = Object.freeze({
  HOUR: 60,
  DAY: 24 * 60,
  WEEK: 7 * 24 * 60,
  MONTH: 30 * 24 * 60,
})
