'use client';

import { DownloadIcon, FileIcon } from 'lucide-react';

import { formatBytes } from '@customafk/react-toolkit/utils';

import { DescriptionEmpty } from './empty';

type DescriptionFileProps = {
  name: string | null | undefined;
  /** Download/view URL. Omit while an upload is pending — the filename still renders as inert text. */
  url?: string | null;
  /** File size in bytes, shown formatted (KB/MB/...) next to the name. */
  size?: number | null;
};

/**
 * Filename + optional size, linking to `url` for download when one is available. Only null-guards on
 * `!name` — a pending/unavailable upload has a name but no `url` yet, and showing the filename as inert
 * text is more useful than an empty dash.
 */
export const DescriptionFile: React.FC<DescriptionFileProps> = ({ name, url, size }) => {
  if (!name) return <DescriptionEmpty />;

  const sizeText = typeof size === 'number' ? formatBytes(size) : null;

  if (!url) {
    return (
      <span data-slot="description-file" className="inline-flex max-w-full items-center gap-1.5 text-sm text-text-positive">
        <FileIcon size={12} className="shrink-0 opacity-70" />
        <span className="truncate">{name}</span>
        {!!sizeText && <span className="shrink-0 text-text-positive-muted text-xs">{sizeText}</span>}
      </span>
    );
  }

  return (
    <a
      data-slot="description-file"
      href={url}
      download={name}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-full items-center gap-1.5 text-primary text-sm transition-colors hover:text-primary-strong hover:decoration-solid"
    >
      <DownloadIcon size={12} className="shrink-0 opacity-70" />
      <span className="truncate underline underline-offset-2">{name}</span>
      {!!sizeText && <span className="no-underline! shrink-0 text-text-positive-muted text-xs">{sizeText}</span>}
    </a>
  );
};
