"use client";

import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative shrink-0 cursor-pointer rounded-md font-medium whitespace-normal outline-0 transition-all shadow-btn",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
    "aria-invalid:ring-destructive/20",
    "aria-invalid:border-destructive",
    "disabled:pointer-events-none",
    "disabled:cursor-default disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-primary/50 hover:bg-primary/90 active:bg-primary/90 focus:ring-ring",
        destructive:
          "bg-destructive hover:bg-destructive/90 focus:ring-destructive/40 dark:bg-destructive/60 text-white",
        outline:
          "border-border bg-card hover:bg-accent hover:text-accent-foreground focus:bg-background focus:ring-border/40 border",

        secondary:
          "bg-secondary text-secondary-foreground focus:ring-border hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 focus:!ring-0 shadow-none",
        link: "text-primary underline-offset-4 hover:underline focus:!ring-0 shadow-none",
      },
      size: {
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs font-semibold focus:ring-4 has-[>svg]:px-2.5",
        default:
          "h-9 px-4 py-2 text-sm font-medium focus:ring-4 has-[>svg]:px-3",
        lg: "h-10 rounded-md px-6 text-base font-semibold focus:ring-6 has-[>svg]:px-4",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <div
        className={cn(
          "flex size-full items-center justify-center gap-2 text-nowrap",
          isLoading && "opacity-0",
        )}
      >
        <Slot.Slottable>{props.children}</Slot.Slottable>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader-spinner text-muted-foreground" />
        </div>
      )}
    </Comp>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
