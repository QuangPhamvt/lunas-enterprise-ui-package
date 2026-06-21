'use client';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { useTanStackForm } from '../../../tanstack-form';

// Prevent Tiptap's ProseMirror from running in jsdom
vi.mock('@/components/features/text-editor', () => ({
  TextEditor: () => null,
  TextEditorToolbar: () => null,
  LinkDialog: () => null,
}));

function TextFieldHarness({
  label = 'Test Label',
  description,
  placeholder,
  helperText,
  required = false,
  disabled = false,
  defaultValue = null as string | null,
  counter = false,
  showClearButton = false,
  showErrorMessage = true,
  maxLength,
  validators,
}: {
  label?: string;
  description?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string | null;
  counter?: boolean;
  showClearButton?: boolean;
  showErrorMessage?: boolean;
  maxLength?: number;
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
        <field.TextField
          label={label}
          description={description}
          placeholder={placeholder}
          helperText={helperText}
          required={required}
          disabled={disabled}
          counter={counter}
          showClearButton={showClearButton}
          showErrorMessage={showErrorMessage}
          maxLength={maxLength}
        />
      )}
    />
  );
}

function TextFieldWithFormHarness({ onSubmit }: { onSubmit: React.FormEventHandler }) {
  const { AppField } = useTanStackForm({ defaultValues: { testField: 'hello' } });
  return (
    <form onSubmit={onSubmit}>
      <AppField name="testField">{field => <field.TextField label="Test" />}</AppField>
    </form>
  );
}

describe('TextField', () => {
  describe('label', () => {
    it('renders the label text', () => {
      render(<TextFieldHarness label="Full Name" />);
      expect(screen.getByText('Full Name')).toBeInTheDocument();
    });

    it('associates label with input via htmlFor/id', () => {
      render(<TextFieldHarness label="Username" />);
      const input = screen.getByRole('textbox');
      const label = document.querySelector(`label[for="${input.getAttribute('id')}"]`);
      expect(label).toHaveTextContent('Username');
    });

    it('sets aria-required on the label when required and value is null', () => {
      render(<TextFieldHarness required defaultValue={null} />);
      const input = screen.getByRole('textbox');
      const label = document.querySelector(`label[for="${input.getAttribute('id')}"]`);
      expect(label).toHaveAttribute('aria-required', 'true');
    });

    it('does not set aria-required when required but value is already set', () => {
      render(<TextFieldHarness required defaultValue="filled" />);
      const input = screen.getByRole('textbox');
      const label = document.querySelector(`label[for="${input.getAttribute('id')}"]`);
      expect(label).not.toHaveAttribute('aria-required', 'true');
    });
  });

  describe('description', () => {
    it('renders description text when provided', () => {
      render(<TextFieldHarness description="Nhập đầy đủ họ tên." />);
      expect(screen.getByText('Nhập đầy đủ họ tên.')).toBeInTheDocument();
    });

    it('does not render description element when omitted', () => {
      const { container } = render(<TextFieldHarness />);
      expect(container.querySelector('[data-slot="field-description"]')).not.toBeInTheDocument();
    });
  });

  describe('helperText', () => {
    it('renders helper note when provided', () => {
      render(<TextFieldHarness helperText="Nhập ít nhất 3 ký tự để tìm kiếm." />);
      expect(screen.getByText('Nhập ít nhất 3 ký tự để tìm kiếm.')).toBeInTheDocument();
    });
  });

  describe('placeholder', () => {
    it('renders placeholder text in the input', () => {
      render(<TextFieldHarness placeholder="Enter your name" />);
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('disables the input when disabled prop is true', () => {
      render(<TextFieldHarness disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('hides clear button when disabled even if value is non-empty', () => {
      render(<TextFieldHarness showClearButton disabled defaultValue="hello" />);
      expect(screen.queryByRole('button', { name: 'Xóa' })).not.toBeInTheDocument();
    });
  });

  describe('value binding', () => {
    it('reflects a non-null default value', () => {
      render(<TextFieldHarness defaultValue="initial text" />);
      expect(screen.getByRole('textbox')).toHaveValue('initial text');
    });

    it('renders empty string when defaultValue is null', () => {
      render(<TextFieldHarness defaultValue={null} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('updates value on user input', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'hello');
      expect(input).toHaveValue('hello');
    });
  });

  describe('keyboard', () => {
    it('does not submit the form when Enter is pressed inside the input', async () => {
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
      const user = userEvent.setup();
      render(<TextFieldWithFormHarness onSubmit={onSubmit} />);
      await user.type(screen.getByRole('textbox'), '{Enter}');
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('validation', () => {
    it('does not show error before the field is touched', () => {
      render(<TextFieldHarness />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('shows error message after field is blurred with an invalid value', async () => {
      const user = userEvent.setup();
      render(
        // onBlur fires when focus leaves — onChange alone won't trigger without a value change
        <TextFieldHarness validators={{ onBlur: ({ value }) => (!value ? 'Bắt buộc điền' : undefined) }} />
      );
      await user.click(screen.getByRole('textbox'));
      await user.tab();
      expect(screen.getByText('Bắt buộc điền')).toBeInTheDocument();
    });

    it('clears the error after the user enters a valid value', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness validators={{ onChange: ({ value }) => (!value ? 'Bắt buộc điền' : undefined) }} />);
      const input = screen.getByRole('textbox');
      // Type then clear to trigger onChange with null → error
      await user.type(input, 'a');
      await user.clear(input);
      expect(screen.getByText('Bắt buộc điền')).toBeInTheDocument();
      // Fix the value — onChange fires with non-null → error text disappears
      await user.type(input, 'fixed');
      // FieldError container persists (touched+showErrorMessage) but without the error text
      expect(screen.queryByText('Bắt buộc điền')).not.toBeInTheDocument();
    });

    it('hides error when showErrorMessage is false even after touching', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness showErrorMessage={false} validators={{ onChange: ({ value }) => (!value ? 'Required' : undefined) }} />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('counter', () => {
    it('does not show counter text when counter is false (default)', () => {
      render(<TextFieldHarness defaultValue="hello" />);
      expect(screen.queryByText(/ký tự/)).not.toBeInTheDocument();
    });

    it('shows character count without maxLength', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness counter />);
      await user.type(screen.getByRole('textbox'), 'hi');
      expect(screen.getByText('2 ký tự')).toBeInTheDocument();
    });

    it('shows "N / M ký tự" format with maxLength', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness counter maxLength={10} />);
      await user.type(screen.getByRole('textbox'), 'hello');
      expect(screen.getByText('5 / 10 ký tự')).toBeInTheDocument();
    });

    it('shows "1 ký tự" for a single character', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness counter />);
      await user.type(screen.getByRole('textbox'), 'x');
      expect(screen.getByText('1 ký tự')).toBeInTheDocument();
    });

    it('applies warning color when count reaches 80% of maxLength', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness counter maxLength={10} />);
      await user.type(screen.getByRole('textbox'), '12345678'); // 8/10 = 80%
      expect(screen.getByText('8 / 10 ký tự')).toHaveClass('text-warning-strong');
    });

    it('applies danger color when count reaches 100% of maxLength', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness counter maxLength={5} />);
      await user.type(screen.getByRole('textbox'), 'abcde'); // 5/5 = 100%
      expect(screen.getByText('5 / 5 ký tự')).toHaveClass('text-danger-strong');
    });
  });

  describe('showClearButton', () => {
    it('does not show clear button when value is empty', () => {
      render(<TextFieldHarness showClearButton defaultValue={null} />);
      expect(screen.queryByRole('button', { name: 'Xóa' })).not.toBeInTheDocument();
    });

    it('shows clear button when value is non-empty', () => {
      render(<TextFieldHarness showClearButton defaultValue="hello" />);
      expect(screen.getByRole('button', { name: 'Xóa' })).toBeInTheDocument();
    });

    it('clears the field value when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness showClearButton defaultValue="hello" />);
      await user.click(screen.getByRole('button', { name: 'Xóa' }));
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('hides clear button after the field is cleared', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness showClearButton defaultValue="hello" />);
      await user.click(screen.getByRole('button', { name: 'Xóa' }));
      expect(screen.queryByRole('button', { name: 'Xóa' })).not.toBeInTheDocument();
    });
  });

  describe('maxLength', () => {
    it('does not allow typing beyond maxLength when counter is enabled', async () => {
      const user = userEvent.setup();
      render(<TextFieldHarness counter maxLength={3} />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'abcdef');
      expect(input).toHaveValue('abc');
    });
  });
});
