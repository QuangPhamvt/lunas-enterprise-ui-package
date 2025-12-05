export const CancelButton: React.FC<React.ComponentProps<'button'>> = ({ ...props }) => {
  return (
    <button
      {...props}
      type="button"
      style={
        {
          'corner-shape': 'squircle',
        } as React.CSSProperties
      }
      className="min-w-40 cursor-pointer rounded-xl border border-border bg-linear-to-b from-white/80 to-white px-4 py-2 font-semibold text-sm text-text-positive shadow-[0_2px_4px_var(--border)] outline-none transition-all hover:opacity-90 focus:border-border focus:ring-3 focus:ring-border/80 focus:ring-offset-2 focus:drop-shadow-none disabled:pointer-events-none disabled:opacity-60 disabled:drop-shadow-none"
    >
      Cancel
    </button>
  );
};
