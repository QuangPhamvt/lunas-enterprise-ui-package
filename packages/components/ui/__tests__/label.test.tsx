'use client';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from '../label';

describe('Label', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Label>Email address</Label>);
      expect(screen.getByText('Email address')).toBeInTheDocument();
    });

    it('has data-slot="label"', () => {
      render(<Label>Email address</Label>);
      expect(screen.getByText('Email address')).toHaveAttribute('data-slot', 'label');
    });
  });

  describe('htmlFor', () => {
    it('associates with a sibling input via htmlFor', () => {
      render(
        <>
          <Label htmlFor="email">Email address</Label>
          <input id="email" type="email" />
        </>
      );
      expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    });
  });
});
