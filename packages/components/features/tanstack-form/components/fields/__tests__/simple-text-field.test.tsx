'use client';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { useTanStackForm } from '../../../tanstack-form';

vi.mock('@/components/features/text-editor', () => ({
  TextEditor: () => null,
  TextEditorToolbar: () => null,
  LinkDialog: () => null,
}));

function SimpleTextFieldHarness({
  label,
  placeholder,
  required = false,
  maxLength,
  disabled = false,
  defaultValue = null as string | null,
  validators,
}: {
  label?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  disabled?: boolean;
  defaultValue?: string | null;
  validators?: Parameters<ReturnType<typeof useTanStackForm>['AppField']>[0]['validators'];
}) {
  const { AppField } = useTanStackForm({
    defaultValues: { testField: defaultValue },
  });
  return (
    <AppField
      name="testField"
      validators={validators as any}
      children={field => (
        <field.SimpleTextField
          label={label}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          disabled={disabled}
        />
      )}
    />
  );
}

describe('SimpleTextField', () => {
  describe('label', () => {
    it('renders label text when label is provided', () => {
      render(<SimpleTextFieldHarness label="Full Name" />);
      expect(screen.getByText('Full Name')).toBeInTheDocument();
    });

    it('does not render a label element when label is omitted', () => {
      render(<SimpleTextFieldHarness />);
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
      expect(document.querySelector('label')).not.toBeInTheDocument();
    });

    it('shows required asterisk when required is true', () => {
      render(<SimpleTextFieldHarness label="Email" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('does not show required asterisk when required is false', () => {
      render(<SimpleTextFieldHarness label="Email" />);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('placeholder', () => {
    it('renders placeholder text in the input', () => {
      render(<SimpleTextFieldHarness placeholder="Type here…" />);
      expect(screen.getByPlaceholderText('Type here…')).toBeInTheDocument();
    });
  });

  describe('value binding', () => {
    it('reflects a non-null default value', () => {
      render(<SimpleTextFieldHarness defaultValue="initial" />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');
    });

    it('renders empty string when defaultValue is null', () => {
      render(<SimpleTextFieldHarness defaultValue={null} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('updates value on user input', async () => {
      const user = userEvent.setup();
      render(<SimpleTextFieldHarness />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'hello');
      expect(input).toHaveValue('hello');
    });
  });

  describe('disabled state', () => {
    it('disables the input when disabled prop is true', () => {
      render(<SimpleTextFieldHarness disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('maxLength', () => {
    it('does not allow typing beyond maxLength', async () => {
      const user = userEvent.setup();
      render(<SimpleTextFieldHarness maxLength={3} />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'abcdef');
      expect(input).toHaveValue('abc');
    });
  });

  describe('validation', () => {
    it('does not show error before the field is touched', () => {
      render(
        <SimpleTextFieldHarness
          validators={{ onChange: ({ value }) => (!value ? 'Required' : undefined) }}
        />
      );
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('shows error after field is touched with invalid value', async () => {
      const user = userEvent.setup();
      render(
        <SimpleTextFieldHarness
          validators={{ onBlur: ({ value }) => (!value ? 'Required' : undefined) }}
        />
      );
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
