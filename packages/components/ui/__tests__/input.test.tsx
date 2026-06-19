'use client';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '../input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders an input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('has data-slot="input"', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'input');
    });

    it('renders placeholder text', () => {
      render(<Input placeholder="Enter name" />);
      expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    });
  });

  describe('controlled mode', () => {
    it('reflects controlled value', () => {
      render(<Input value="hello" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox')).toHaveValue('hello');
    });

    it('calls onChange with the synthetic event', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      await user.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
      expect((handleChange.mock.calls[0][0] as React.ChangeEvent<HTMLInputElement>).target.value).toBe('a');
    });
  });

  describe('uncontrolled mode', () => {
    it('accepts user input without a value prop', async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="" />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'hello');
      expect(input).toHaveValue('hello');
    });
  });

  describe('onValueChange', () => {
    it('calls onValueChange with the raw string value', async () => {
      const user = userEvent.setup();
      const handleValueChange = vi.fn();
      render(<Input onValueChange={handleValueChange} />);
      await user.type(screen.getByRole('textbox'), 'hi');
      expect(handleValueChange).toHaveBeenCalledWith('h');
      expect(handleValueChange).toHaveBeenCalledWith('hi');
    });

    it('calls both onChange and onValueChange when both are provided', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const handleValueChange = vi.fn();
      render(<Input onChange={handleChange} onValueChange={handleValueChange} />);
      await user.type(screen.getByRole('textbox'), 'x');
      expect(handleChange).toHaveBeenCalled();
      expect(handleValueChange).toHaveBeenCalledWith('x');
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('aria-invalid', () => {
    it('sets aria-invalid when aria-invalid is passed', () => {
      render(<Input aria-invalid />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('variants', () => {
    it('renders for each variant without error', () => {
      const variants = ['outline', 'ghost', 'none', 'soft', 'subtle'] as const;
      for (const variant of variants) {
        const { unmount } = render(<Input variant={variant} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        unmount();
      }
    });
  });
});
