import { Flex } from '@/components/layouts/flex'

type DataListProps = {
  title?: string
}
export const DataList: React.FC<React.PropsWithChildren<DataListProps>> = ({ children }) => {
  return (
    <Flex vertical padding="none" gap="md" width="full">
      {children}
    </Flex>
  )
}

type DataListItemProps = {
  label: string
  value: string | number | React.ReactNode
  minLabelWidth?: string
}

export const DataListItem: React.FC<React.PropsWithChildren<DataListItemProps>> = ({ label, value, minLabelWidth = '120px' }) => {
  return (
    <Flex align="center" justify="start" width="full" padding="none" gap="md">
      <div style={{ minWidth: minLabelWidth }} className="text-text-positive-weak text-sm">
        {label}
      </div>
      <div className="text-text-positive text-sm">{value}</div>
    </Flex>
  )
}
