'use client';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from '../spinner';

describe('Spinner', () => {
  describe('rendering', () => {
    it('renders', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has role="status"', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-label="Loading"', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
    });
  });

  describe('className', () => {
    it('applies custom className', () => {
      render(<Spinner className="size-8 text-primary" />);
      expect(screen.getByRole('status')).toHaveClass('size-8');
    });
  });
});
