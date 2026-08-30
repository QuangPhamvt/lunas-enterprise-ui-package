'use client';

import { useCallback, useRef } from 'react';

import { CheckIcon, CopyIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { useCopyFeedback } from './use-copy-feedback';

const OWN_ITEM_SELECTOR = [
  '[data-slot="description-header"]',
  '[data-slot="description-section"]',
  '[data-slot="description-collapsible-section-trigger"]',
  '[data-slot="description-item"]',
].join(',');

function textOf(el: Element | null): string {
  return el?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

/**
 * True when `el` belongs to `root` itself rather than to a nested embedded `Description`.
 * `nested === root` covers `root` itself being the nested panel (button placed inside it); the
 * `!root.contains(nested)` branch covers `root` being embedded inside some *other* nested panel
 * further up the tree — that outer boundary is irrelevant to what counts as `root`'s own items.
 */
function isOwn(el: Element, root: HTMLElement): boolean {
  const nested = el.closest('[data-slot="description"][data-surface="nested"]');
  return nested === null || nested === root || !root.contains(nested);
}

function buildPanelText(root: HTMLElement): string {
  const lines: string[] = [];

  for (const el of root.querySelectorAll(OWN_ITEM_SELECTOR)) {
    if (!isOwn(el, root)) continue;
    // Skip anything filtered out by DescriptionSearch, or hidden inside a collapsed/hidden section.
    if (el.closest('[data-search-hidden]')) continue;

    if (el.matches('[data-slot="description-header"]')) {
      const title = textOf(el.querySelector('p'));
      if (title) lines.push(lines.length ? `\n${title}` : title, '');
      continue;
    }
    if (el.matches('[data-slot="description-section"],[data-slot="description-collapsible-section-trigger"]')) {
      const title = textOf(el.querySelector('p'));
      if (title) lines.push(lines.length ? `\n[${title}]` : `[${title}]`);
      continue;
    }
    // Prefer the dedicated label-text slot so a `description-item-action` node's text can't bleed in.
    const label = textOf(el.querySelector('[data-slot="description-item-label-text"]') ?? el.querySelector('[data-slot="description-item-label"]'));
    const value = textOf(el.querySelector('[data-slot="description-item-value"]'));
    if (label) lines.push(`${label}: ${value}`);
  }

  return lines.join('\n');
}

export type DescriptionCopyAllProps = {
  /** Accessible label / tooltip text for the button. @default 'Sao chép toàn bộ' */
  label?: string;
  className?: string;
};

/**
 * A small icon button that copies every visible `label: value` pair of the nearest ancestor
 * `Description`/`DescriptionGroup` as plain text — place it explicitly wherever you want it, typically
 * inside `DescriptionHeader`'s `extra` slot: `<DescriptionHeader extra={<DescriptionCopyAll />} />`.
 *
 * Reads the *rendered DOM* rather than any props, because a value cell can render arbitrary nodes —
 * the only universally correct "what's currently displayed" is what's actually painted. Section/header
 * titles are included as heading lines so the pasted text keeps its structure, and anything hidden by a
 * `DescriptionSearch` filter (or a collapsed `DescriptionCollapsibleSection`) is skipped — copying
 * matches what's currently visible on screen.
 *
 * @example
 * import { Description, DescriptionHeader } from '@customafk/lunas-ui/features/descriptions';
 * import { DescriptionCopyAll } from '@customafk/lunas-ui/features/descriptions/components';
 *
 * <Description>
 *   <DescriptionHeader title="Order #1234" extra={<DescriptionCopyAll />} />
 *   ...
 * </Description>
 */
export const DescriptionCopyAll: React.FC<DescriptionCopyAllProps> = ({ label = 'Sao chép toàn bộ', className }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { copied, copy } = useCopyFeedback();

  const handleClick = useCallback(async () => {
    const root = ref.current?.closest('[data-slot="description"],[data-slot="description-group"]');
    if (!(root instanceof HTMLElement)) return;
    const text = buildPanelText(root);
    if (!text) return;
    await copy(text);
  }, [copy]);

  return (
    <button
      ref={ref}
      type="button"
      data-slot="description-copy-all"
      data-copied={copied}
      title={copied ? 'Đã sao chép' : label}
      aria-label={label}
      onClick={handleClick}
      className={cn(
        'cursor-pointer rounded-sm border border-border-weak bg-card p-1 text-text-positive-weak transition-[border-color,color,box-shadow] hover:border-border hover:text-text-positive hover:shadow-xs',
        className
      )}
    >
      {copied ? <CheckIcon size={14} className="text-success" /> : <CopyIcon size={14} />}
    </button>
  );
};
