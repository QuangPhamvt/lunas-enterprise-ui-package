'use client';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from '../checkbox';

describe('Checkbox', () => {
  describe('rendering', () => {
    it('renders', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('has data-slot="checkbox"', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('data-slot', 'checkbox');
    });
  });

  describe('checked state', () => {
    it('calls onCheckedChange(true) when clicked while unchecked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox onCheckedChange={handleChange} />);
      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onCheckedChange(false) when clicked while checked', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox checked onCheckedChange={handleChange} />);
      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is set', () => {
      render(<Checkbox disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('does not call onCheckedChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Checkbox disabled onCheckedChange={handleChange} />);
      await user.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('aria-invalid', () => {
    it('sets aria-invalid when passed', () => {
      render(<Checkbox aria-invalid />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
