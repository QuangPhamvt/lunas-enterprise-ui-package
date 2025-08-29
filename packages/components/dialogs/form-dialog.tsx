import type { FieldValues, FormState, SubmitErrorHandler, UseFormProps } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { FormWrapper } from '../forms/form-wrapper'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'

type Props<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormProps<TFieldValues>

  open: boolean
  isSubmitting?: boolean
  isResetAfterSubmit?: boolean
  disableSubmit?: boolean
  title?: string
  description?: string
  className?: string

  onOpenChange: (open: boolean) => void
  onSubmit: (data: TFieldValues, formState: FormState<FieldValues>, dirtyFields: FormState<FieldValues>['dirtyFields']) => void | Promise<void>
  onError?: SubmitErrorHandler<TFieldValues>
  onReset?: () => void
}
export const FormDialog = <TFieldValues extends FieldValues = FieldValues>({
  form,
  open,
  isSubmitting = false,
  isResetAfterSubmit = true,
  disableSubmit = false,
  title,
  description,
  className,

  onOpenChange,
  onSubmit,
  onError,
  onReset,
  children,
}: React.PropsWithChildren<Props<TFieldValues>>) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn('flex flex-col gap-0 border-none p-0', className)}
        onInteractOutside={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <DialogHeader className="flex-0 gap-2 border-b px-6 pt-6 pb-4">
          <DialogTitle>{title || 'Form Dialog'}</DialogTitle>
          <DialogDescription>{description || 'This is a form dialog where you can add your form elements.'}</DialogDescription>
        </DialogHeader>
        <FormWrapper
          form={form}
          isResetAfterSubmit={isResetAfterSubmit}
          className="flex flex-1 flex-col overflow-y-auto pt-4"
          onSubmit={onSubmit}
          onError={onError}
        >
          <main className="flex-1 overflow-y-auto px-6">{children}</main>
          <DialogFooter className="border-t px-6 pt-4 pb-6">
            <Button tabIndex={-1} type="button" variant="outline" color="muted" className="w-30 rounded-full" onClick={onReset}>
              Reset
            </Button>
            <Button autoFocus tabIndex={0} type="submit" isLoading={isSubmitting} disabled={disableSubmit} className="w-30 rounded-full">
              Xác nhận
            </Button>
          </DialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  )
}
