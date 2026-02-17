import { ExternalLinkIcon } from 'lucide-react';

export const UITablePermalink: React.FC<{ href: string; label?: string }> = ({ href, label }) => {
  return (
    <a href={href} target="_blank" className="inline-flex items-center gap-1 truncate text-primary text-sm underline" rel="noopener noreferrer">
      <span>{label || href}</span>
      <ExternalLinkIcon size={14} />
    </a>
  );
};
