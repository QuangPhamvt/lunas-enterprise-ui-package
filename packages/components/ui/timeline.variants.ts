import { cva, type VariantProps } from 'class-variance-authority';

/**
 * All visual styling for a `TimelineDot` — shape is driven by `status`, hue by `color`, radius by
 * `size`. Mirrors the CVA + `compoundVariants` pattern used by `badge.tsx` / `button.variants.ts`
 * (every hue lives here, not in a hand-rolled JS lookup map).
 *
 * - `completed` / `current` / `error` render a filled dot (`bg-{color}` + a readable icon/text
 *   foreground token).
 * - `current` adds a pulsing ring; `error` adds a static ring — both tinted `ring-{color}/20`.
 * - `upcoming` renders a hollow dot (transparent-to-background fill + a `border-{color}` outline).
 */
export const timelineDotVariants = cva('relative inline-flex shrink-0 items-center justify-center rounded-full transition-colors [&_svg]:size-2.5', {
  variants: {
    status: {
      completed: '',
      current: 'ring-4 motion-safe:animate-pulse',
      upcoming: 'border-2 bg-background!',
      error: 'ring-4',
    },
    color: {
      primary: '',
      secondary: '',
      muted: '',
      accent: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
    size: {
      sm: 'size-2.5',
      md: 'size-3',
      lg: 'size-3.5',
    },
  },
  defaultVariants: { status: 'upcoming', color: 'muted', size: 'md' },
  compoundVariants: [
    // ── filled dot: fill + readable icon/text foreground (mirrors badge.tsx solid) ──
    { status: ['completed', 'current', 'error'], color: 'primary', className: 'bg-primary text-primary-foreground' },
    { status: ['completed', 'current', 'error'], color: 'secondary', className: 'bg-secondary text-secondary-foreground' },
    { status: ['completed', 'current', 'error'], color: 'muted', className: 'bg-muted text-text-negative' },
    { status: ['completed', 'current', 'error'], color: 'accent', className: 'bg-accent text-text-negative' },
    { status: ['completed', 'current', 'error'], color: 'info', className: 'bg-info text-info-foreground' },
    { status: ['completed', 'current', 'error'], color: 'success', className: 'bg-success text-success-foreground' },
    { status: ['completed', 'current', 'error'], color: 'warning', className: 'bg-warning text-warning-foreground' },
    { status: ['completed', 'current', 'error'], color: 'danger', className: 'bg-danger text-danger-foreground' },
    // ── ring tint for the statuses that show a ring ──
    { status: ['current', 'error'], color: 'primary', className: 'ring-primary/20' },
    { status: ['current', 'error'], color: 'secondary', className: 'ring-secondary/20' },
    { status: ['current', 'error'], color: 'muted', className: 'ring-muted/20' },
    { status: ['current', 'error'], color: 'accent', className: 'ring-accent/20' },
    { status: ['current', 'error'], color: 'info', className: 'ring-info/20' },
    { status: ['current', 'error'], color: 'success', className: 'ring-success/20' },
    { status: ['current', 'error'], color: 'warning', className: 'ring-warning/20' },
    { status: ['current', 'error'], color: 'danger', className: 'ring-danger/20' },
    // ── hollow dot (upcoming): colored outline only ──
    { status: 'upcoming', color: 'primary', className: 'border-primary' },
    { status: 'upcoming', color: 'secondary', className: 'border-secondary' },
    { status: 'upcoming', color: 'muted', className: 'border-muted' },
    { status: 'upcoming', color: 'accent', className: 'border-accent' },
    { status: 'upcoming', color: 'info', className: 'border-info' },
    { status: 'upcoming', color: 'success', className: 'border-success' },
    { status: 'upcoming', color: 'warning', className: 'border-warning' },
    { status: 'upcoming', color: 'danger', className: 'border-danger' },
  ],
});

export type TimelineDotVariants = VariantProps<typeof timelineDotVariants>;

/**
 * Styling for the `TimelineConnector` line segment. Neutral (`bg-border`) by default; a `completed`
 * segment is tinted with its resolved hue so a run of finished steps reads as a vertical progress
 * track. Consumers pass the same `status` (and optional `color`) they gave the dot above it.
 */
export const timelineConnectorVariants = cva('w-px flex-1 self-stretch bg-border', {
  variants: {
    status: {
      completed: '',
      current: '',
      upcoming: '',
      error: '',
    },
    color: {
      primary: '',
      secondary: '',
      muted: '',
      accent: '',
      info: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  defaultVariants: { status: 'upcoming', color: 'muted' },
  compoundVariants: [
    { status: 'completed', color: 'primary', className: 'bg-primary' },
    { status: 'completed', color: 'secondary', className: 'bg-secondary' },
    { status: 'completed', color: 'muted', className: 'bg-muted' },
    { status: 'completed', color: 'accent', className: 'bg-accent' },
    { status: 'completed', color: 'info', className: 'bg-info' },
    { status: 'completed', color: 'success', className: 'bg-success' },
    { status: 'completed', color: 'warning', className: 'bg-warning' },
    { status: 'completed', color: 'danger', className: 'bg-danger' },
  ],
});

export type TimelineConnectorVariants = VariantProps<typeof timelineConnectorVariants>;
