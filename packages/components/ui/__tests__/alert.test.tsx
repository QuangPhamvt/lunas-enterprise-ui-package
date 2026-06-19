'use client';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from '../alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Alert>Alert content</Alert>);
      expect(screen.getByText('Alert content')).toBeInTheDocument();
    });

    it('has role="alert"', () => {
      render(<Alert>Alert content</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('has data-slot="alert"', () => {
      render(<Alert>Alert content</Alert>);
      expect(screen.getByRole('alert')).toHaveAttribute('data-slot', 'alert');
    });
  });

  describe('variants', () => {
    it('renders without error for each variant', () => {
      const variants = ['destructive', 'warning', 'success', 'info'] as const;
      for (const variant of variants) {
        const { unmount } = render(<Alert variant={variant}>Label</Alert>);
        expect(screen.getByRole('alert')).toBeInTheDocument();
        unmount();
      }
    });

    it('sets data-variant attribute', () => {
      render(<Alert variant="success">Label</Alert>);
      expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'success');
    });
  });

  describe('default icons', () => {
    it('renders a default icon for each variant', () => {
      const variants = ['destructive', 'warning', 'success', 'info'] as const;
      for (const variant of variants) {
        const { container, unmount } = render(<Alert variant={variant}>Label</Alert>);
        expect(container.querySelector('svg')).toBeInTheDocument();
        unmount();
      }
    });

    it('renders no icon when no variant is set', () => {
      const { container } = render(<Alert>Label</Alert>);
      expect(container.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  describe('dismissible', () => {
    it('shows close button when dismissible is true', () => {
      render(<Alert dismissible>Alert content</Alert>);
      expect(screen.getByRole('button', { name: 'Close alert' })).toBeInTheDocument();
    });

    it('does not show close button when dismissible is false', () => {
      render(<Alert>Alert content</Alert>);
      expect(screen.queryByRole('button', { name: 'Close alert' })).not.toBeInTheDocument();
    });
  });

  describe('onDismiss', () => {
    it('calls onDismiss when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={handleDismiss}>
          Alert content
        </Alert>
      );
      await user.click(screen.getByRole('button', { name: 'Close alert' }));
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('custom icon', () => {
    it('renders the custom icon node', () => {
      render(<Alert icon={<span data-testid="custom-icon" />}>Alert content</Alert>);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });
});

describe('AlertTitle', () => {
  it('renders children', () => {
    render(<AlertTitle>Operation failed</AlertTitle>);
    expect(screen.getByText('Operation failed')).toBeInTheDocument();
  });

  it('has data-slot="alert-title"', () => {
    render(<AlertTitle>Operation failed</AlertTitle>);
    expect(screen.getByText('Operation failed')).toHaveAttribute('data-slot', 'alert-title');
  });
});

describe('AlertDescription', () => {
  it('renders children', () => {
    render(<AlertDescription>Something went wrong.</AlertDescription>);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('has data-slot="alert-description"', () => {
    render(<AlertDescription>Something went wrong.</AlertDescription>);
    expect(screen.getByText('Something went wrong.')).toHaveAttribute('data-slot', 'alert-description');
  });
});
