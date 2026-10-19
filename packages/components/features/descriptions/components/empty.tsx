'use client';

/**
 * The em-dash placeholder every description value renders when it has no data.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="…">
 *   <DescriptionEmpty />
 * </DescriptionItem>
 * ```
 */
export const DescriptionEmpty: React.FC = () => {
  return (
    <span data-slot="description-empty" role="img" aria-label="Empty value" className="select-none font-medium text-sm text-text-positive-muted">
      —
    </span>
  );
};
