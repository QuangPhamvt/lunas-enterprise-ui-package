'use client'
import React from 'react'
import { cn } from '@customafk/react-toolkit/utils'

import { EyeIcon, EyeOffIcon } from 'lucide-react'

import { Input } from '../input'

type Props = React.ComponentPropsWithoutRef<typeof Input>
export const PasswordInput: React.FC<Props> = ({ className, ...rest }) => {
  const id = React.useId()
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  const toggleVisibility = React.useCallback(() => setIsVisible((prevState) => !prevState), [])
  return (
    <div className="relative">
      <Input {...rest} id={id} placeholder="Password" type={isVisible ? 'text' : 'password'} className={cn('pe-9', className)} />
      <button
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? <EyeOffIcon size={16} aria-hidden="true" /> : <EyeIcon size={16} aria-hidden="true" />}
      </button>
    </div>
  )
}
