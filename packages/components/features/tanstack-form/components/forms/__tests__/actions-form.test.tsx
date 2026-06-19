'use client';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TanStackActionsForm, useTanStackForm } from '../../../tanstack-form';

vi.mock('@/components/features/text-editor', () => ({
  TextEditor: () => null,
  TextEditorToolbar: () => null,
  LinkDialog: () => null,
}));

function ActionsFormHarness({ type = 'create' as 'create' | 'update' }) {
  const form = useTanStackForm({
    defaultValues: { field: '' },
  });
  return (
    <form.AppForm>
      <TanStackActionsForm type={type} />
    </form.AppForm>
  );
}

describe('TanStackActionsForm', () => {
  describe('type="create"', () => {
    it('renders the "Add New" submit button', () => {
      render(<ActionsFormHarness type="create" />);
      expect(screen.getByRole('button', { name: /Add New/ })).toBeInTheDocument();
    });

    it('renders the cancel button', () => {
      render(<ActionsFormHarness type="create" />);
      expect(screen.getByRole('button', { name: /Hủy bỏ/ })).toBeInTheDocument();
    });

    it('"Add New" button is disabled when form is pristine', () => {
      render(<ActionsFormHarness type="create" />);
      expect(screen.getByRole('button', { name: /Add New/ })).toBeDisabled();
    });

    it('cancel button is disabled when form is pristine', () => {
      render(<ActionsFormHarness type="create" />);
      expect(screen.getByRole('button', { name: /Hủy bỏ/ })).toBeDisabled();
    });
  });

  describe('type="update"', () => {
    it('renders the "Update" submit button', () => {
      render(<ActionsFormHarness type="update" />);
      expect(screen.getByRole('button', { name: /Update/ })).toBeInTheDocument();
    });

    it('does not render "Add New" for type="update"', () => {
      render(<ActionsFormHarness type="update" />);
      expect(screen.queryByRole('button', { name: /Add New/ })).not.toBeInTheDocument();
    });

    it('"Update" button is disabled when form is pristine', () => {
      render(<ActionsFormHarness type="update" />);
      expect(screen.getByRole('button', { name: /Update/ })).toBeDisabled();
    });
  });
});
