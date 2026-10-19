'use client';

import { ExternalLinkIcon, LinkIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { DescriptionEmpty } from './empty';

type DescriptionLinkProps = {
  /** Link target. */
  href: string | null | undefined;
  /** Link text. Defaults to `href`. */
  label?: string;
  /**
   * Open in a new tab and show an external-link icon.
   * @default true
   */
  external?: boolean;
  /** Class names for the `<a>`. */
  className?: string;
};

/**
 * An underlined link; external links open in a new tab with `noopener`. Renders `DescriptionEmpty`
 * when there is nothing to show.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="…">
 *   <DescriptionLink href={shop.website} />
 * </DescriptionItem>
 * ```
 */
export const DescriptionLink: React.FC<DescriptionLinkProps> = ({ href, label, external = true, className }) => {
  if (!href) return <DescriptionEmpty />;

  return (
    <a
      data-slot="description-link"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex max-w-full items-center',
        'gap-1 text-sm text-text-brand underline underline-offset-2 transition-colors',
        'hover:text-text-brand-strong hover:decoration-solid',
        className
      )}
    >
      {!external && <LinkIcon size={12} className="shrink-0 opacity-70" />}
      <span className="truncate">{label ?? href}</span>
      {!!external && <ExternalLinkIcon size={12} className="shrink-0 opacity-70" />}
    </a>
  );
};
