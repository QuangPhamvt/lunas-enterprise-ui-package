'use client';

export const DescriptionEmpty: React.FC = () => {
  return (
    <span data-slot="description-empty" aria-label="Empty value" className="select-none font-medium text-sm text-text-positive-muted">
      —
    </span>
  );
};
