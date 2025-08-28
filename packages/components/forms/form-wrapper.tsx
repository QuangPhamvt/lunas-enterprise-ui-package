import React from 'react'
import { type FieldValues, type FormState, type SubmitErrorHandler, type SubmitHandler, useForm, type UseFormProps } from 'react-hook-form'
import { AlertCircleIcon } from 'lucide-react'

import type { AnyEntity } from '@/types'
import { ErrorMessage } from '@hookform/error-message'

import { ErrorDialog } from '../dialogs/error-dialog'
import { Form } from '../ui/form'

type Props<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormProps<TFieldValues>
  isResetAfterSubmit?: boolean
  className?: string
  onSubmit: (data: TFieldValues, formState: FormState<FieldValues>, dirtyFields: FormState<FieldValues>['dirtyFields']) => void | Promise<void>
  onError?: SubmitErrorHandler<TFieldValues>
  onSubcribe?: (values: TFieldValues) => void
}

export const FormWrapper = <TFieldValues extends FieldValues = FieldValues>({
  form: FormConfig,
  isResetAfterSubmit = true,
  className,
  onSubmit,
  onError,
  onSubcribe,
  children,
}: React.PropsWithChildren<Props<TFieldValues>>) => {
  const form = useForm({
    ...FormConfig,
    criteriaMode: 'all',
  })

  const { formState, reset, handleSubmit, subscribe } = form
  const { dirtyFields } = formState

  const [errorOpen, setErrorOpen] = React.useState<boolean>(false)

  const handleFormSubmit = React.useCallback<SubmitHandler<TFieldValues>>(
    (data) => {
      onSubmit(data, formState, dirtyFields)
      if (isResetAfterSubmit) {
        reset()
      }
    },
    [dirtyFields, formState, isResetAfterSubmit, onSubmit, reset],
  )

  const handleFormError = React.useCallback<SubmitErrorHandler<TFieldValues>>(
    (errors) => {
      const errorKeys = Object.keys(errors)
      if (errorKeys.length === 0) return
      onError?.(errors)
      setErrorOpen(true)
    },
    [onError],
  )

  React.useEffect(() => {
    if (!onSubcribe) return
    const callback = subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        onSubcribe(values)
      },
    })
    return () => callback()
  }, [onSubcribe, subscribe])

  return (
    <Form {...form}>
      <form className={className} onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
        {children}
      </form>
      <ErrorDialog
        open={errorOpen}
        title="Lỗi nhập dữ liệu"
        description="An unexpected error has occurred. Please check the errors below and try again."
        onOpenChange={setErrorOpen}
      >
        {errorOpen && (
          <>
            {Object.keys(formState.errors).length > 0 ? (
              <div className="flex max-w-100 flex-col gap-2 px-4">
                <p className="text-muted-foreground text-sm font-semibold">Cảnh báo: Vui lòng kiểm tra các lỗi sau:</p>
                <div className="flex flex-col space-y-1">
                  {Object.entries(formState.errors).map(([key]) => (
                    <ErrorMessage
                      key={key}
                      errors={formState.errors}
                      name={key as AnyEntity}
                      render={({ messages }) => {
                        return (
                          <>
                            {messages
                              ? Object.entries(messages).map(([type, message]) => {
                                  return (
                                    <div key={type} className="text-accent-foreground flex items-start gap-x-1 truncate text-sm font-normal">
                                      <AlertCircleIcon size={16} className="text-destructive mt-0.5 min-w-4 flex-0" />
                                      <p className="line-clamp-2 flex-1 text-wrap">{message}</p>
                                    </div>
                                  )
                                })
                              : null}
                          </>
                        )
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No errors found.</p>
            )}
          </>
        )}
      </ErrorDialog>
    </Form>
  )
}
