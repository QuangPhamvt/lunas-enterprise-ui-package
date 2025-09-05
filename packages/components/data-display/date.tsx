import React from 'react'
import { format, isThisMonth, isThisWeek, isThisYear, isToday, isTomorrow, isValid, isYesterday, parseISO } from '@customafk/react-toolkit/date-fns'

import { TIME_IN_SECONDS, vietnameseHolidays, vietnameseLocale } from '@/constants'
import { cn } from '@customafk/react-toolkit/utils'

interface Props {
  date: Date | string | number
  format?:
    | 'short' // 15/03/24
    | 'medium' // 15/03/2024
    | 'long' // 15 tháng 3, 2024
    | 'full' // Thứ Sáu, ngày 15 tháng 3 năm 2024
    | 'relative' // 2 giờ trước
    | 'datetime' // 15/03/2024 14:30
    | 'time' // 14:30
    | 'smart' // Tự động chọn format phù hợp
  showHoliday?: boolean
  showTime?: boolean
  className?: string
  title?: string // Tooltip khi hover
}

export const DateDisplay: React.FC<Props> = ({ date, format: formatType = 'medium', showHoliday = false, showTime = false, className = '', title }) => {
  const parsedDate = React.useMemo(() => {
    try {
      if (date instanceof Date) {
        return isValid(date) ? date : null
      }
      if (typeof date === 'string') {
        const parsed = parseISO(date)
        return isValid(parsed) ? parsed : new Date(date)
      }
      if (typeof date === 'number') {
        const parsed = new Date(date)
        return isValid(parsed) ? parsed : null
      }
      return null
    } catch {
      return null
    }
  }, [date])

  // Format relative time in Vietnamese
  const formatRelativeTime = React.useCallback((date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Vừa xong'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.MINUTE)} phút trước`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.HOUR)} giờ trước`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.DAY)} ngày trước`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.WEEK)} tuần trước`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.MONTH)} tháng trước`
    return `${Math.floor(diffInSeconds / TIME_IN_SECONDS.YEAR)} năm trước`
  }, [])

  // Vietnamese weekday
  const getVietnameseWeekday = React.useCallback((date: Date, short: boolean = false): string => {
    const dayIndex = date.getDay()
    return short ? vietnameseLocale.weekdaysShort[dayIndex] : vietnameseLocale.weekdays[dayIndex]
  }, [])

  // Vietnamese month
  const getVietnameseMonth = React.useCallback((date: Date, short: boolean = false): string => {
    const monthIndex = date.getMonth()
    return short ? vietnameseLocale.monthsShort[monthIndex] : vietnameseLocale.months[monthIndex]
  }, [])

  // Check holiday
  const getHoliday = React.useCallback((date: Date): string | null => {
    const monthDay = format(date, 'MM-dd') as keyof typeof vietnameseHolidays
    return vietnameseHolidays[monthDay] || null
  }, [])

  // Smart format - choose appropriate format based on date
  const getSmartFormat = React.useCallback(
    (date: Date): string => {
      if (isToday(date)) {
        return showTime ? `Hôm nay ${format(date, 'HH:mm')}` : 'Hôm nay'
      }
      if (isYesterday(date)) {
        return showTime ? `Hôm qua ${format(date, 'HH:mm')}` : 'Hôm qua'
      }
      if (isTomorrow(date)) {
        return showTime ? `Ngày mai ${format(date, 'HH:mm')}` : 'Ngày mai'
      }
      if (isThisWeek(date)) {
        const weekday = getVietnameseWeekday(date)
        return showTime ? `${weekday} ${format(date, 'HH:mm')}` : weekday
      }
      if (isThisMonth(date)) {
        const day = format(date, 'd')
        return showTime ? `${day}/${format(date, 'M')} ${format(date, 'HH:mm')}` : `${day}/${format(date, 'M')}`
      }
      if (isThisYear(date)) {
        return showTime ? format(date, 'd/M HH:mm') : format(date, 'd/M')
      }
      return showTime ? format(date, 'd/M/yyyy HH:mm') : format(date, 'd/M/yyyy')
    },
    [getVietnameseWeekday, showTime],
  )

  // Main formatting function
  const formatDate = React.useCallback(
    (date: Date, type: string): string => {
      const timeStr = showTime ? format(date, ', HH:mm') : ''

      switch (type) {
        case 'short':
          return format(date, 'd/M/yy') + timeStr

        case 'medium':
          return format(date, 'dd/MM/yyyy') + timeStr

        case 'long':
          return `${format(date, 'd')} ${getVietnameseMonth(date)} ${format(date, 'yyyy')}` + timeStr

        case 'full': {
          const data = `${getVietnameseWeekday(date)}, ngày ${format(date, 'd')} ${getVietnameseMonth(date)} năm ${format(date, 'yyyy')}`
          return data + timeStr
        }

        case 'relative':
          return formatRelativeTime(date)

        case 'datetime':
          return format(date, 'd/M/yyyy HH:mm')

        case 'time':
          return format(date, 'HH:mm')

        case 'smart':
          return getSmartFormat(date)

        default:
          return format(date, 'd/M/yyyy') + timeStr
      }
    },
    [getSmartFormat, getVietnameseMonth, getVietnameseWeekday, formatRelativeTime, showTime],
  )

  if (!parsedDate) {
    return <span className={cn('text-muted-foreground text-sm', className)}>--/--/----</span>
  }

  const formattedDate = formatDate(parsedDate, formatType)
  const holiday = showHoliday ? getHoliday(parsedDate) : null
  const displayText = holiday ? `${formattedDate} (${holiday})` : formattedDate
  const tooltipTitle = title || format(parsedDate, 'EEEE, d MMMM yyyy HH:mm:ss')

  return (
    <time dateTime={parsedDate.toISOString()} className={cn('text-accent-foreground font-number text-sm', className)} title={tooltipTitle}>
      {displayText}
    </time>
  )
}
