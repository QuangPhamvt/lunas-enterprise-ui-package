'use client';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '../badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Badge>Active</Badge>);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('renders as a span element', () => {
      render(<Badge>Active</Badge>);
      expect(screen.getByText('Active').tagName).toBe('SPAN');
    });
  });

  describe('variants', () => {
    it('renders without error for each variant', () => {
      const variants = ['solid', 'soft', 'outline'] as const;
      for (const variant of variants) {
        const { unmount } = render(<Badge variant={variant}>Label</Badge>);
        expect(screen.getByText('Label')).toBeInTheDocument();
        unmount();
      }
    });
  });

  describe('colors', () => {
    it('renders without error for each color', () => {
      const colors = ['primary', 'secondary', 'muted', 'accent', 'info', 'success', 'warning', 'danger'] as const;
      for (const color of colors) {
        const { unmount } = render(<Badge color={color}>Label</Badge>);
        expect(screen.getByText('Label')).toBeInTheDocument();
        unmount();
      }
    });
  });

  describe('sizes', () => {
    it('renders without error for each size', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
      for (const size of sizes) {
        const { unmount } = render(<Badge size={size}>Label</Badge>);
        expect(screen.getByText('Label')).toBeInTheDocument();
        unmount();
      }
    });
  });

  describe('pill', () => {
    it('applies rounded-full by default', () => {
      render(<Badge>Label</Badge>);
      expect(screen.getByText('Label')).toHaveClass('rounded-full');
    });

    it('applies rounded-sm when pill is false', () => {
      render(<Badge pill={false}>Label</Badge>);
      expect(screen.getByText('Label')).toHaveClass('rounded-sm');
    });
  });
});
