'use client';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';

describe('Avatar', () => {
  describe('rendering', () => {
    it('renders', () => {
      const { container } = render(<Avatar />);
      expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
    });

    it('has data-slot="avatar"', () => {
      const { container } = render(<Avatar />);
      expect(container.querySelector('[data-slot="avatar"]')).toHaveAttribute('data-slot', 'avatar');
    });
  });
});

describe('AvatarFallback', () => {
  it('renders with data-slot="avatar-fallback"', async () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    const fallback = await screen.findByText('JD');
    expect(fallback).toHaveAttribute('data-slot', 'avatar-fallback');
  });

  it('shows fallback when image has not loaded', async () => {
    render(
      <Avatar>
        <AvatarImage src="/missing.jpg" alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(await screen.findByText('JD')).toBeInTheDocument();
  });
});
