import { CalendarIcon } from 'lucide-react'

import { DateDisplay } from '@/components/data-display/date'
import { Flex } from '@/components/layouts/flex'
import { Title } from '@/components/typography/title'

import { DetailDialogSidebarTrigger } from './sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const DetailDialogMain: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main data-slot="detail-dialog-main" className="relative h-full flex-1">
    <Flex padding="none" gap="none" vertical align="stretch" className="absolute inset-0 size-full">
      {children}
    </Flex>
  </main>
)

type DetailDialogMainHeaderProps = {
  title: string
  createdAt?: string | Date | number
}
export const DetailDialogMainHeader: React.FC<React.PropsWithChildren<DetailDialogMainHeaderProps>> = ({ title, createdAt }) => (
  <header className="bg-card border-border-weak flex w-full flex-0 items-start gap-x-2.5 border-b py-2.5 pr-12 pl-2">
    <DetailDialogSidebarTrigger />
    <Flex vertical align="start" padding="none" width="null" wrap={false} className="flex-1">
      <Title level={5} className="line-clamp-1 truncate text-wrap">
        {title || 'Detail Dialog'}
      </Title>
      <Flex padding="none" className="text-text-positive-weak relative">
        <CalendarIcon size={12} className="absolute top-0.5 md:top-1" />
        {!!createdAt && <DateDisplay showTime showHoliday date={createdAt} format="full" className="ml-4 text-xs md:text-sm" />}
      </Flex>
    </Flex>
  </header>
)

export const DetailDialogMainGroup: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Flex vertical gap="md" padding="md" width="full">
    {children}
  </Flex>
)

type DetailDialogMainGroupItemProps = {
  title?: string
  description?: string
}
export const DetailDialogMainGroupItem: React.FC<React.PropsWithChildren<DetailDialogMainGroupItemProps>> = ({ title, description, children }) => (
  <Card className="w-full snap-start scroll-mt-4">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)
