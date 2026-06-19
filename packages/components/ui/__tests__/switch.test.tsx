'use client';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from '../switch';

describe('Switch', () => {
  describe('rendering', () => {
    it('renders', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('has data-slot="switch"', () => {
      render(<Switch />);
      expect(screen.getByRole('switch')).toHaveAttribute('data-slot', 'switch');
    });
  });

  describe('toggle', () => {
    it('calls onCheckedChange(true) when toggled on', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch onCheckedChange={handleChange} />);
      await user.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onCheckedChange(false) when toggled off', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch checked onCheckedChange={handleChange} />);
      await user.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is set', () => {
      render(<Switch disabled />);
      expect(screen.getByRole('switch')).toBeDisabled();
    });

    it('does not call onCheckedChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch disabled onCheckedChange={handleChange} />);
      await user.click(screen.getByRole('switch'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
