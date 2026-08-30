'use client';

import { DescriptionEmpty } from './empty';

type DescriptionColorProps = {
  /** Any valid CSS color value (`#rrggbb`, `rgb(...)`, a named color, ...). */
  value: string | null | undefined;
  /** Text shown next to the swatch. Defaults to the uppercased raw `value`. */
  label?: string;
};

/** A small color swatch + label — for hex codes, theme tokens, or any other color-valued field. */
export const DescriptionColor: React.FC<DescriptionColorProps> = ({ value, label }) => {
  if (!value?.trim()) return <DescriptionEmpty />;

  const text = label ?? value.toUpperCase();

  return (
    <span data-slot="description-color" className="inline-flex items-center gap-2 text-sm text-text-positive">
      <span
        aria-label={text}
        style={{ backgroundColor: value }}
        className="size-4 shrink-0 rounded-sm border border-border-weak ring-1 ring-black/5 ring-inset"
      />
      <span className="font-mono text-xs tabular-nums">{text}</span>
    </span>
  );
};
