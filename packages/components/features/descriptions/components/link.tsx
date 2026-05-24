'use client';

import { ExternalLinkIcon, LinkIcon } from 'lucide-react';
import { cn } from '@customafk/react-toolkit/utils';

import { DescriptionEmpty } from './empty';

type DescriptionLinkProps = {
  href: string | null | undefined;
  label?: string;
  external?: boolean;
  className?: string;
};

export const DescriptionLink: React.FC<DescriptionLinkProps> = ({ href, label, external = true, className }) => {
  if (!href) return <DescriptionEmpty />;

  return (
    <a
      data-slot="description-link"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex max-w-full items-center gap-1 text-sm text-primary underline decoration-dashed underline-offset-2 transition-colors hover:text-primary-strong hover:decoration-solid',
        className
      )}
    >
      {!external && <LinkIcon size={12} className="shrink-0 opacity-70" />}
      <span className="truncate">{label ?? href}</span>
      {external && <ExternalLinkIcon size={12} className="shrink-0 opacity-70" />}
    </a>
  );
};
