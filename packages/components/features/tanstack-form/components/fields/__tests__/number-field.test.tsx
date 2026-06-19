'use client';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useTanStackForm } from '../../../tanstack-form';

vi.mock('@/components/features/text-editor', () => ({
  TextEditor: () => null,
  TextEditorToolbar: () => null,
  LinkDialog: () => null,
}));

function NumberFieldHarness({
  label = 'Amount',
  placeholder,
  defaultValue = null as number | null,
}: {
  label?: string;
  placeholder?: string;
  defaultValue?: number | null;
}) {
  const { AppField } = useTanStackForm({
    defaultValues: { amount: defaultValue },
  });
  return <AppField name="amount" children={field => <field.NumberField label={label} placeholder={placeholder} />} />;
}

describe('NumberField', () => {
  describe('label', () => {
    it('renders the label text', () => {
      render(<NumberFieldHarness label="Quantity" />);
      expect(screen.getByText('Quantity')).toBeInTheDocument();
    });
  });

  describe('placeholder', () => {
    it('renders placeholder text in the input', () => {
      render(<NumberFieldHarness placeholder="0" />);
      expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
    });
  });

  describe('value binding', () => {
    it('renders empty when defaultValue is null', () => {
      render(<NumberFieldHarness defaultValue={null} />);
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });
});
