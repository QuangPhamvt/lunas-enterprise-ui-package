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

function SwitchFieldHarness({
  label = 'Toggle',
  description,
  helperText,
  defaultValue = null as boolean | null,
}: {
  label?: string;
  description?: string;
  helperText?: string;
  defaultValue?: boolean | null;
}) {
  const { AppField } = useTanStackForm({
    defaultValues: { toggle: defaultValue },
  });
  return <AppField name="toggle" children={field => <field.SwitchField label={label} description={description} helperText={helperText} />} />;
}

describe('SwitchField', () => {
  describe('label', () => {
    it('renders the label text', () => {
      render(<SwitchFieldHarness label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });
  });

  describe('description', () => {
    it('renders the description text when provided', () => {
      render(<SwitchFieldHarness description="Receive email alerts" />);
      expect(screen.getByText('Receive email alerts')).toBeInTheDocument();
    });
  });

  describe('initial state', () => {
    it('is unchecked when defaultValue is null', () => {
      render(<SwitchFieldHarness defaultValue={null} />);
      expect(screen.getByRole('switch')).not.toBeChecked();
    });

    it('is checked when defaultValue is true', () => {
      render(<SwitchFieldHarness defaultValue={true} />);
      expect(screen.getByRole('switch')).toBeChecked();
    });
  });

  describe('toggle', () => {
    it('becomes checked when toggled on', async () => {
      const user = userEvent.setup();
      render(<SwitchFieldHarness defaultValue={null} />);
      await user.click(screen.getByRole('switch'));
      expect(screen.getByRole('switch')).toBeChecked();
    });

    it('becomes unchecked when toggled off', async () => {
      const user = userEvent.setup();
      render(<SwitchFieldHarness defaultValue={true} />);
      await user.click(screen.getByRole('switch'));
      expect(screen.getByRole('switch')).not.toBeChecked();
    });
  });
});
