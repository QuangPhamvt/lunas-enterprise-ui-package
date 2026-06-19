'use client';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Progress } from '../progress';

describe('Progress', () => {
  describe('rendering', () => {
    it('renders', () => {
      render(<Progress value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('has data-slot="progress"', () => {
      render(<Progress value={50} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('data-slot', 'progress');
    });

    it('has role="progressbar"', () => {
      render(<Progress value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('value', () => {
    it('indicator translateX reflects the value', () => {
      const { container } = render(<Progress value={75} />);
      const indicator = container.querySelector('[data-slot="progress-indicator"]');
      expect(indicator).toHaveStyle({ transform: 'translateX(-25%)' });
    });

    it('indicator is fully offset when value is 0', () => {
      const { container } = render(<Progress value={0} />);
      const indicator = container.querySelector('[data-slot="progress-indicator"]');
      expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' });
    });

    it('indicator has no offset when value is 100', () => {
      const { container } = render(<Progress value={100} />);
      const indicator = container.querySelector('[data-slot="progress-indicator"]');
      expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' });
    });
  });
});
