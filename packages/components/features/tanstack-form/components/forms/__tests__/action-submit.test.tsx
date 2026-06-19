'use client';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TanStackActionSubmit, useTanStackForm } from '../../../tanstack-form';

vi.mock('@/components/features/text-editor', () => ({
  TextEditor: () => null,
  TextEditorToolbar: () => null,
  LinkDialog: () => null,
}));

function ActionSubmitHarness({ label, className }: { label?: string; className?: string }) {
  const form = useTanStackForm({
    defaultValues: { field: '' },
  });
  return (
    <form.AppForm>
      <TanStackActionSubmit label={label} className={className} />
    </form.AppForm>
  );
}

describe('TanStackActionSubmit', () => {
  describe('label', () => {
    it('renders "Xác nhận" as the default label', () => {
      render(<ActionSubmitHarness />);
      expect(screen.getByRole('button', { name: /Xác nhận/ })).toBeInTheDocument();
    });

    it('renders a custom label when provided', () => {
      render(<ActionSubmitHarness label="Save Changes" />);
      expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('is disabled when the form is pristine', () => {
      render(<ActionSubmitHarness />);
      expect(screen.getByRole('button', { name: /Xác nhận/ })).toBeDisabled();
    });
  });
});
