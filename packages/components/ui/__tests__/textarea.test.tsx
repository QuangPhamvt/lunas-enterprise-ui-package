'use client';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Textarea } from '../textarea';

describe('Textarea', () => {
  describe('rendering', () => {
    it('renders a textarea element', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('has data-slot="textarea"', () => {
      render(<Textarea />);
      expect(screen.getByRole('textbox')).toHaveAttribute('data-slot', 'textarea');
    });

    it('renders placeholder text', () => {
      render(<Textarea placeholder="Write a description…" />);
      expect(screen.getByPlaceholderText('Write a description…')).toBeInTheDocument();
    });
  });

  describe('controlled mode', () => {
    it('reflects controlled value', () => {
      render(<Textarea value="hello" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox')).toHaveValue('hello');
    });

    it('calls onChange with the synthetic event', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Textarea onChange={handleChange} />);
      await user.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
      expect((handleChange.mock.calls[0][0] as React.ChangeEvent<HTMLTextAreaElement>).target.value).toBe('a');
    });
  });

  describe('uncontrolled mode', () => {
    it('accepts user input without a value prop', async () => {
      const user = userEvent.setup();
      render(<Textarea defaultValue="" />);
      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'hello');
      expect(textarea).toHaveValue('hello');
    });
  });

  describe('onValueChange', () => {
    it('calls onValueChange with the raw string value', async () => {
      const user = userEvent.setup();
      const handleValueChange = vi.fn();
      render(<Textarea onValueChange={handleValueChange} />);
      await user.type(screen.getByRole('textbox'), 'hi');
      expect(handleValueChange).toHaveBeenCalledWith('h');
      expect(handleValueChange).toHaveBeenCalledWith('hi');
    });

    it('calls both onChange and onValueChange when both are provided', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const handleValueChange = vi.fn();
      render(<Textarea onChange={handleChange} onValueChange={handleValueChange} />);
      await user.type(screen.getByRole('textbox'), 'x');
      expect(handleChange).toHaveBeenCalled();
      expect(handleValueChange).toHaveBeenCalledWith('x');
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is set', () => {
      render(<Textarea disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('aria-invalid', () => {
    it('sets aria-invalid when passed', () => {
      render(<Textarea aria-invalid />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
