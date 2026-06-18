'use client'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useTanStackForm } from '../../../tanstack-form'

// Prevent Tiptap's ProseMirror from running in jsdom
vi.mock('@/components/features/text-editor', () => ({
  TextEditor: () => null,
  TextEditorToolbar: () => null,
  LinkDialog: () => null,
}))

function TextFieldHarness({
  label = 'Test Label',
  placeholder,
  required = false,
  disabled = false,
  defaultValue = null as string | null,
}: {
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  defaultValue?: string | null
}) {
  const { AppField } = useTanStackForm({
    defaultValues: { testField: defaultValue },
  })
  return (
    <AppField
      name="testField"
      children={(field) => (
        <field.TextField
          label={label}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      )}
    />
  )
}

describe('TextField', () => {
  describe('label', () => {
    it('renders the label text', () => {
      render(<TextFieldHarness label="Full Name" />)
      expect(screen.getByText('Full Name')).toBeInTheDocument()
    })

    it('associates label with input via htmlFor/id', () => {
      render(<TextFieldHarness label="Username" />)
      const input = screen.getByRole('textbox')
      // FieldLabel renders a <label for={id}>, find it by matching the input's id
      const label = document.querySelector(`label[for="${input.getAttribute('id')}"]`)
      expect(label).toHaveTextContent('Username')
    })
  })

  describe('placeholder', () => {
    it('renders placeholder text in the input', () => {
      render(<TextFieldHarness placeholder="Enter your name" />)
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
    })
  })

  describe('disabled state', () => {
    it('disables the input when disabled prop is true', () => {
      render(<TextFieldHarness disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('value binding', () => {
    it('reflects a non-null default value', () => {
      render(<TextFieldHarness defaultValue="initial text" />)
      expect(screen.getByRole('textbox')).toHaveValue('initial text')
    })

    it('renders empty string when defaultValue is null', () => {
      render(<TextFieldHarness defaultValue={null} />)
      expect(screen.getByRole('textbox')).toHaveValue('')
    })

    it('updates value on user input', async () => {
      const user = userEvent.setup()
      render(<TextFieldHarness />)
      const input = screen.getByRole('textbox')
      await user.type(input, 'hello')
      expect(input).toHaveValue('hello')
    })
  })

  describe('validation', () => {
    it('does not show error before the field is touched', () => {
      render(<TextFieldHarness />)
      // FieldError only renders when touched
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})
