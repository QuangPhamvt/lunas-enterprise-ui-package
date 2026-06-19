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

const OPTIONS = [
  { value: 'a', label: 'Option A', description: 'First option' },
  { value: 'b', label: 'Option B', description: 'Second option' },
  { value: 'c', label: 'Option C', description: 'Third option' },
];

function RadioGroupFieldHarness({ label = 'Choose one', defaultValue = null as string | null }: { label?: string; defaultValue?: string | null }) {
  const { AppField } = useTanStackForm({
    defaultValues: { choice: defaultValue },
  });
  return <AppField name="choice" children={field => <field.RadioGroupField label={label} options={OPTIONS} />} />;
}

describe('RadioGroupField', () => {
  describe('label', () => {
    it('renders the group label', () => {
      render(<RadioGroupFieldHarness label="Select a plan" />);
      expect(screen.getByText('Select a plan')).toBeInTheDocument();
    });
  });

  describe('options', () => {
    it('renders all option labels', () => {
      render(<RadioGroupFieldHarness />);
      expect(screen.getByText('Option A')).toBeInTheDocument();
      expect(screen.getByText('Option B')).toBeInTheDocument();
      expect(screen.getByText('Option C')).toBeInTheDocument();
    });

    it('renders all option descriptions', () => {
      render(<RadioGroupFieldHarness />);
      expect(screen.getByText('First option')).toBeInTheDocument();
      expect(screen.getByText('Second option')).toBeInTheDocument();
      expect(screen.getByText('Third option')).toBeInTheDocument();
    });

    it('renders the correct number of radio inputs', () => {
      render(<RadioGroupFieldHarness />);
      expect(screen.getAllByRole('radio')).toHaveLength(OPTIONS.length);
    });
  });

  describe('selection', () => {
    it('reflects the default selected value', () => {
      render(<RadioGroupFieldHarness defaultValue="b" />);
      const radios = screen.getAllByRole('radio');
      expect(radios[1]).toBeChecked();
    });

    it('selects the clicked option', async () => {
      const user = userEvent.setup();
      render(<RadioGroupFieldHarness />);
      await user.click(screen.getAllByRole('radio')[0]);
      expect(screen.getAllByRole('radio')[0]).toBeChecked();
    });

    it('updates selection when a different option is clicked', async () => {
      const user = userEvent.setup();
      render(<RadioGroupFieldHarness defaultValue="a" />);
      await user.click(screen.getAllByRole('radio')[1]);
      expect(screen.getAllByRole('radio')[1]).toBeChecked();
      expect(screen.getAllByRole('radio')[0]).not.toBeChecked();
    });
  });
});
