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
    it('renders the "Thêm mới" submit button', () => {
      render(<ActionsFormHarness type="create" />);
      expect(screen.getByRole('button', { name: /Thêm mới/ })).toBeInTheDocument();
    });

    it('renders the cancel button', () => {
      render(<ActionsFormHarness type="create" />);
      expect(screen.getByRole('button', { name: /Hủy bỏ/ })).toBeInTheDocument();
    });

    it('"Thêm mới" button is disabled when form is pristine', () => {
      render(<ActionsFormHarness type="create" />);
      expect(screen.getByRole('button', { name: /Thêm mới/ })).toBeDisabled();
    });

    it('cancel button is disabled when form is pristine', () => {
      render(<ActionsFormHarness type="create" />);
      expect(screen.getByRole('button', { name: /Hủy bỏ/ })).toBeDisabled();
    });
  });

  describe('type="update"', () => {
    it('renders the "Cập nhật" submit button', () => {
      render(<ActionsFormHarness type="update" />);
      expect(screen.getByRole('button', { name: /Cập nhật/ })).toBeInTheDocument();
    });

    it('does not render "Thêm mới" for type="update"', () => {
      render(<ActionsFormHarness type="update" />);
      expect(screen.queryByRole('button', { name: /Thêm mới/ })).not.toBeInTheDocument();
    });

    it('"Cập nhật" button is disabled when form is pristine', () => {
      render(<ActionsFormHarness type="update" />);
      expect(screen.getByRole('button', { name: /Cập nhật/ })).toBeDisabled();
    });
  });
});
