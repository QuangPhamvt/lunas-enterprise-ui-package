import { ExternalLinkIcon } from 'lucide-react';

/**
 * Renders an external-link anchor with an icon for use in table cells, opening
 * the target URL in a new tab with safe `rel` attributes.
 *
 * @example
 * import { UITablePermalink } from '@customafk/lunas-ui/features/tables';
 *
 * <UITablePermalink href="https://example.com/records/42" label="View record" />
 */
export const UITablePermalink: React.FC<{
  /** The destination URL the anchor navigates to. */
  href: string;
  /** Optional display text; falls back to the raw `href` when omitted. */
  label?: string;
}> = ({ href, label }) => {
  return (
    <a href={href} target="_blank" className="inline-flex items-center gap-1 truncate text-primary text-sm underline" rel="noopener noreferrer">
      <span>{label || href}</span>
      <ExternalLinkIcon size={14} />
    </a>
  );
};
