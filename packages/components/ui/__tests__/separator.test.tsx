'use client';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Separator } from '../separator';

describe('Separator', () => {
  describe('rendering', () => {
    it('renders', () => {
      const { container } = render(<Separator />);
      expect(container.querySelector('[data-slot="separator"]')).toBeInTheDocument();
    });

    it('has data-slot="separator"', () => {
      const { container } = render(<Separator />);
      expect(container.querySelector('[data-slot="separator"]')).toHaveAttribute('data-slot', 'separator');
    });

    it('defaults to horizontal orientation', () => {
      const { container } = render(<Separator />);
      expect(container.querySelector('[data-slot="separator"]')).toHaveAttribute('data-orientation', 'horizontal');
    });
  });

  describe('orientation', () => {
    it('applies vertical orientation', () => {
      const { container } = render(<Separator orientation="vertical" />);
      expect(container.querySelector('[data-slot="separator"]')).toHaveAttribute('data-orientation', 'vertical');
    });
  });

  describe('decorative', () => {
    it('has role="none" when decorative (default)', () => {
      const { container } = render(<Separator />);
      expect(container.querySelector('[data-slot="separator"]')).toHaveAttribute('role', 'none');
    });

    it('exposes role="separator" when not decorative', () => {
      render(<Separator decorative={false} />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });
});
