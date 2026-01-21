export const CancelButton: React.FC<React.ComponentProps<'button'>> = ({ ...props }) => {
  return (
    <button
      {...props}
      type="button"
      className="min-w-40 cursor-pointer rounded-sm border border-border bg-card px-4 py-2 font-semibold text-sm text-text-positive shadow-xs outline-none transition-all hover:opacity-90 focus:border-border focus:ring-3 focus:ring-border/80 focus:ring-offset-2 focus:drop-shadow-none disabled:pointer-events-none disabled:opacity-60 disabled:drop-shadow-none"
    >
      Cancel
    </button>
  );
};
