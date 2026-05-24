'use client';

import { useCallback, useMemo } from 'react';

import { format, isThisMonth, isThisWeek, isThisYear, isToday, isTomorrow, isValid, isYesterday, parseISO } from '@customafk/react-toolkit/date-fns';
import { cn } from '@customafk/react-toolkit/utils';

import { TIME_IN_SECONDS, vietnameseHolidays, vietnameseLocale } from '@/constants';

interface DateDisplayProps {
  date: Date | string | number;
  format?:
    | 'short' // 15/03/24
    | 'medium' // 15/03/2024
    | 'long' // 15 tháng 3, 2024
    | 'full' // Thứ Sáu, ngày 15 tháng 3 năm 2024
    | 'relative' // 2 giờ trước
    | 'datetime' // 15/03/2024 14:30
    | 'time' // 14:30
    | 'smart'; // auto-selects format based on recency
  showHoliday?: boolean;
  showTime?: boolean;
  className?: string;
  title?: string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({
  date,
  format: formatType = 'medium',
  showHoliday = false,
  showTime = false,
  className = '',
  title,
}) => {
  const parsedDate = useMemo(() => {
    try {
      if (date instanceof Date) return isValid(date) ? date : null;
      if (typeof date === 'string') {
        const parsed = parseISO(date);
        return isValid(parsed) ? parsed : new Date(date);
      }
      if (typeof date === 'number') {
        const parsed = new Date(date);
        return isValid(parsed) ? parsed : null;
      }
      return null;
    } catch {
      return null;
    }
  }, [date]);

  const formatRelativeTime = useCallback((d: Date): string => {
    const diffInSeconds = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diffInSeconds < 60) return 'Vừa xong';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.MINUTE)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.HOUR)} giờ trước`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.DAY)} ngày trước`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.WEEK)} tuần trước`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.MONTH)} tháng trước`;
    return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.YEAR)} năm trước`;
  }, []);

  const getVietnameseWeekday = useCallback((d: Date, short = false): string => {
    return short ? vietnameseLocale.weekdaysShort[d.getDay()] : vietnameseLocale.weekdays[d.getDay()];
  }, []);

  const getVietnameseMonth = useCallback((d: Date, short = false): string => {
    return short ? vietnameseLocale.monthsShort[d.getMonth()] : vietnameseLocale.months[d.getMonth()];
  }, []);

  const getHoliday = useCallback((d: Date): string | null => {
    const monthDay = format(d, 'MM-dd') as keyof typeof vietnameseHolidays;
    return vietnameseHolidays[monthDay] || null;
  }, []);

  const getSmartFormat = useCallback(
    (d: Date): string => {
      if (isToday(d)) return showTime ? `Hôm nay ${format(d, 'HH:mm')}` : 'Hôm nay';
      if (isYesterday(d)) return showTime ? `Hôm qua ${format(d, 'HH:mm')}` : 'Hôm qua';
      if (isTomorrow(d)) return showTime ? `Ngày mai ${format(d, 'HH:mm')}` : 'Ngày mai';
      if (isThisWeek(d)) {
        const weekday = getVietnameseWeekday(d);
        return showTime ? `${weekday} ${format(d, 'HH:mm')}` : weekday;
      }
      if (isThisMonth(d)) {
        const day = format(d, 'd');
        return showTime ? `${day}/${format(d, 'M')} ${format(d, 'HH:mm')}` : `${day}/${format(d, 'M')}`;
      }
      if (isThisYear(d)) return showTime ? format(d, 'd/M HH:mm') : format(d, 'd/M');
      return showTime ? format(d, 'd/M/yyyy HH:mm') : format(d, 'd/M/yyyy');
    },
    [getVietnameseWeekday, showTime]
  );

  const formatDate = useCallback(
    (d: Date, type: string): string => {
      const timeStr = showTime ? format(d, ', HH:mm:ss') : '';
      switch (type) {
        case 'short':
          return format(d, 'd/M/yy') + timeStr;
        case 'medium':
          return format(d, 'dd/MM/yyyy') + timeStr;
        case 'long':
          return `${format(d, 'd')} ${getVietnameseMonth(d)} ${format(d, 'yyyy')}` + timeStr;
        case 'full':
          return `${getVietnameseWeekday(d)}, ngày ${format(d, 'd')} ${getVietnameseMonth(d)} năm ${format(d, 'yyyy')}` + timeStr;
        case 'relative':
          return formatRelativeTime(d);
        case 'datetime':
          return format(d, 'd/M/yyyy HH:mm');
        case 'time':
          return format(d, 'HH:mm');
        case 'smart':
          return getSmartFormat(d);
        default:
          return format(d, 'd/M/yyyy') + timeStr;
      }
    },
    [getSmartFormat, getVietnameseMonth, getVietnameseWeekday, formatRelativeTime, showTime]
  );

  if (!parsedDate) {
    return <span className={cn('text-sm text-text-positive-subtle', className)}>--/--/----</span>;
  }

  const formattedDate = formatDate(parsedDate, formatType);
  const holiday = showHoliday ? getHoliday(parsedDate) : null;
  const displayText = holiday ? `${formattedDate} (${holiday})` : formattedDate;
  const tooltipTitle = title || format(parsedDate, 'EEEE, d MMMM yyyy HH:mm:ss');

  return (
    <time
      data-slot="date-display"
      dateTime={parsedDate.toISOString()}
      className={cn('tabular-nums text-xs text-text-positive-weak transition-colors', className)}
      title={tooltipTitle}
    >
      {displayText}
    </time>
  );
};
