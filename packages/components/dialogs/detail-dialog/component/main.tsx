import { CalendarIcon } from 'lucide-react'

import { DateDisplay } from '@/components/data-display/date'
import { Flex } from '@/components/layouts/flex'
import { Title } from '@/components/typography/title'

import { SidebarTrigger } from './sidebar'

export const DetailDialogMain: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="relative flex h-full flex-1 flex-col">
      <div className="absolute inset-0 flex size-full flex-col">{children}</div>
    </main>
  )
}

export const DetailDialogMainHeader: React.FC<
  React.PropsWithChildren<{
    title: string
    createdAt: string | Date | number
  }>
> = ({ title, createdAt }) => {
  return (
    <header className="border-border-weak relative flex items-start gap-x-2.5 border-b px-2 py-2.5">
      <SidebarTrigger />
      <Flex vertical align="start" padding="none" className="flex-1">
        <Title level={5}>{title || 'Detail Dialog'}</Title>
        <Flex padding="none" className="text-muted-foreground">
          <CalendarIcon size={12} />
          {!!createdAt && <DateDisplay showTime showHoliday date={createdAt} format="full" />}
        </Flex>
      </Flex>
    </header>
  )
}
