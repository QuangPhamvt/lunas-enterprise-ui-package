import { cn } from '@customafk/react-toolkit/utils'

import { ArrowRightIcon, SearchIcon } from 'lucide-react'

import { Input } from '../input'

type Props = React.ComponentPropsWithoutRef<typeof Input>
export const SearchInput = ({ className, ...rest }: Props) => {
  return (
    <div className="relative">
      <Input {...rest} type="search" className={cn('ps-9 pe-9', className)} />
      <div className="text-text-positive-weak pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
      <button
        className="text-text-positive-weak hover:text-text-positive focus-visible:border-primary-strong focus-visible:ring-primary-weak absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:border focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Submit search"
        type="submit"
      >
        <ArrowRightIcon size={16} aria-hidden="true" />
      </button>
    </div>
  )
}
