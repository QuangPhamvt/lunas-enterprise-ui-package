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

function EmailFieldHarness({
  label = 'Email',
  placeholder,
  required = false,
  defaultValue = null as string | null,
}: {
  label?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | null;
}) {
  const { AppField } = useTanStackForm({
    defaultValues: { email: defaultValue },
  });
  return <AppField name="email" children={field => <field.EmailField label={label} placeholder={placeholder} required={required} />} />;
}

describe('EmailField', () => {
  describe('label', () => {
    it('renders the label text', () => {
      render(<EmailFieldHarness label="Email address" />);
      expect(screen.getByText('Email address')).toBeInTheDocument();
    });
  });

  describe('placeholder', () => {
    it('renders placeholder text in the input', () => {
      render(<EmailFieldHarness placeholder="you@example.com" />);
      expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    });
  });

  describe('value binding', () => {
    it('reflects a non-null default value', () => {
      render(<EmailFieldHarness defaultValue="user@example.com" />);
      expect(screen.getByRole('textbox')).toHaveValue('user@example.com');
    });

    it('renders empty string when defaultValue is null', () => {
      render(<EmailFieldHarness defaultValue={null} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('updates value on user input', async () => {
      const user = userEvent.setup();
      render(<EmailFieldHarness />);
      await user.type(screen.getByRole('textbox'), 'test@example.com');
      expect(screen.getByRole('textbox')).toHaveValue('test@example.com');
    });
  });

  describe('clear button', () => {
    it('shows a clear button when the field has a value', async () => {
      const user = userEvent.setup();
      render(<EmailFieldHarness />);
      await user.type(screen.getByRole('textbox'), 'a@b.com');
      expect(screen.getByRole('button', { name: 'Xóa' })).toBeInTheDocument();
    });

    it('clears the value when the clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<EmailFieldHarness />);
      await user.type(screen.getByRole('textbox'), 'a@b.com');
      await user.click(screen.getByRole('button', { name: 'Xóa' }));
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('does not show a clear button when the field is empty', () => {
      render(<EmailFieldHarness />);
      expect(screen.queryByRole('button', { name: 'Xóa' })).not.toBeInTheDocument();
    });
  });
});
