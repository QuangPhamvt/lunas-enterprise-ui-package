import { ExternalLinkIcon } from 'lucide-react';

import { UITableEmpty } from './empty';

/**
 * Renders an external-link anchor with an icon for use in table cells, opening
 * the target URL in a new tab with safe `rel` attributes. Renders
 * {@link UITableEmpty} when `href` is absent.
 *
 * @example
 * import { UITablePermalink } from '@customafk/lunas-ui/features/tables';
 *
 * <UITablePermalink href="https://example.com/records/42" label="View record" />
 */
export const UITablePermalink: React.FC<{
  /** The destination URL the anchor navigates to; `null`/`undefined`/empty renders an empty state. */
  href: string | null | undefined;
  /** Optional display text; falls back to the raw `href` when omitted. */
  label?: string;
}> = ({ href, label }) => {
  if (!href) return <UITableEmpty />;

  return (
    <a href={href} target="_blank" className="inline-flex items-center gap-1 truncate text-primary text-sm underline" rel="noopener noreferrer">
      <span>{label || href}</span>
      <ExternalLinkIcon size={14} />
    </a>
  );
};
