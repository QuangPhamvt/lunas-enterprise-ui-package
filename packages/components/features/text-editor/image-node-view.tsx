'use client';

import { cn } from '@customafk/react-toolkit/utils';

import type { ReactNodeViewProps } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';

/** Best-effort short label for the caption link — falls back to the raw src for relative/unparsable URLs. */
function captionLabel(src: string): string {
  try {
    return new URL(src).hostname;
  } catch {
    return src;
  }
}

function ImageNodeView({ node, selected }: ReactNodeViewProps) {
  const src = node.attrs.src as string;
  const alt = node.attrs.alt as string | undefined;

  return (
    <NodeViewWrapper data-slot="text-editor-image" className="my-5 flex flex-col items-center">
      <img src={src} alt={alt ?? ''} className={cn('max-w-full rounded-lg border border-border', selected && 'outline-2 outline-primary outline-offset-2')} />
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        contentEditable={false}
        className="mt-1.5 text-text-positive-weak text-xs hover:text-text-positive hover:underline"
      >
        {captionLabel(src)}
      </a>
    </NodeViewWrapper>
  );
}

export { ImageNodeView };
