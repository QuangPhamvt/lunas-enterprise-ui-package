'use client'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../button'

describe('Button', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(<Button>Save</Button>)
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    })

    it('has data-slot="button"', () => {
      render(<Button>Save</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button')
    })

    it('defaults to type="button" to prevent accidental form submission', () => {
      render(<Button>Save</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })
  })

  describe('variants', () => {
    it('renders without crashing for each variant', () => {
      const variants = ['default', 'outline', 'soft', 'subtle', 'ghost', 'link'] as const
      for (const variant of variants) {
        const { unmount } = render(<Button variant={variant}>Label</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
        unmount()
      }
    })

    it('renders without crashing for each color', () => {
      const colors = ['primary', 'secondary', 'muted', 'success', 'important', 'info', 'warning', 'danger'] as const
      for (const color of colors) {
        const { unmount } = render(<Button color={color}>Label</Button>)
        expect(screen.getByRole('button')).toBeInTheDocument()
        unmount()
      }
    })
  })

  describe('click handler', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      await user.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>,
      )
      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('shows sr-only loading text when isLoading', () => {
      render(<Button isLoading>Submit</Button>)
      expect(screen.getByText('Loading')).toBeInTheDocument()
    })

    it('sets aria-busy when loading', () => {
      render(<Button isLoading>Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('sets data-state=loading when loading', () => {
      render(<Button isLoading>Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('data-state', 'loading')
    })

    it('is implicitly disabled when loading', () => {
      render(<Button isLoading>Submit</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(
        <Button isLoading onClick={handleClick}>
          Submit
        </Button>,
      )
      await user.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Delete</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('sets aria-disabled when disabled', () => {
      render(<Button disabled>Delete</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('asChild', () => {
    it('renders the child element as root instead of a button', () => {
      render(
        <Button asChild>
          <a href="/dashboard">Go</a>
        </Button>,
      )
      expect(screen.getByRole('link', { name: 'Go' })).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })
})
