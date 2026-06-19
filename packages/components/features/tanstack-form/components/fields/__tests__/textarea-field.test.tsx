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

function TextareaFieldHarness({
  label = 'Description',
  placeholder,
  required = false,
  disabled = false,
  counter = false,
  maxLength,
  defaultValue = null as string | null,
}: {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  counter?: boolean;
  maxLength?: number;
  defaultValue?: string | null;
}) {
  const { AppField } = useTanStackForm({
    defaultValues: { notes: defaultValue },
  });
  return (
    <AppField
      name="notes"
      children={field => (
        <field.TextareaField label={label} placeholder={placeholder} required={required} disabled={disabled} counter={counter} maxLength={maxLength} />
      )}
    />
  );
}

describe('TextareaField', () => {
  describe('label', () => {
    it('renders the label text', () => {
      render(<TextareaFieldHarness label="Notes" />);
      expect(screen.getByText('Notes')).toBeInTheDocument();
    });
  });

  describe('placeholder', () => {
    it('renders placeholder text in the textarea', () => {
      render(<TextareaFieldHarness placeholder="Write something…" />);
      expect(screen.getByPlaceholderText('Write something…')).toBeInTheDocument();
    });
  });

  describe('value binding', () => {
    it('reflects a non-null default value', () => {
      render(<TextareaFieldHarness defaultValue="initial content" />);
      expect(screen.getByRole('textbox')).toHaveValue('initial content');
    });

    it('renders empty string when defaultValue is null', () => {
      render(<TextareaFieldHarness defaultValue={null} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('updates value on user input', async () => {
      const user = userEvent.setup();
      render(<TextareaFieldHarness />);
      await user.type(screen.getByRole('textbox'), 'hello');
      expect(screen.getByRole('textbox')).toHaveValue('hello');
    });
  });

  describe('counter', () => {
    it('shows character count when counter is true', async () => {
      const user = userEvent.setup();
      render(<TextareaFieldHarness counter />);
      await user.type(screen.getByRole('textbox'), 'hi');
      expect(screen.getByText(/2 ký tự/)).toBeInTheDocument();
    });

    it('shows count/limit when counter and maxLength are set', async () => {
      const user = userEvent.setup();
      render(<TextareaFieldHarness counter maxLength={100} />);
      await user.type(screen.getByRole('textbox'), 'hello');
      expect(screen.getByText('5 / 100 ký tự')).toBeInTheDocument();
    });

    it('does not show counter when counter is false', () => {
      render(<TextareaFieldHarness defaultValue="some text" />);
      expect(screen.queryByText(/ký tự/)).not.toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('disables the textarea when disabled prop is true', () => {
      render(<TextareaFieldHarness disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });
});
