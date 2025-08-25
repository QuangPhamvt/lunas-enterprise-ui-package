"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "focus:ring-ring rounded-sm inline-flex items-center px-2.5 py-0.5 font-semibold text-white shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden forced-colors:outline",
  {
    variants: {
      color: {
        red: "bg-red-500 dark:bg-red-600 text-white",
        orange: "bg-orange-500 text-white dark:bg-orange-600",
        amber: "bg-amber-500 text-white dark:bg-amber-600 ",
        yellow: "bg-yellow-500 text-white dark:bg-yellow-600 ",
        lime: "bg-lime-500 text-white dark:bg-lime-600",
        green: "bg-green-500 text-white dark:bg-green-600",
        emerald: "bg-emerald-500 text-white dark:bg-emerald-600",
        teal: "bg-teal-500 text-white dark:bg-teal-600",
        cyan: "bg-cyan-500 text-white dark:bg-cyan-600",
        sky: "bg-sky-500 text-white dark:bg-sky-600",
        blue: "bg-blue-500 text-white dark:bg-blue-600",
        indigo: "bg-indigo-500 text-white dark:bg-indigo-600",
        violet: "bg-violet-500 text-white dark:bg-violet-600",
        purple: "bg-purple-500 text-white dark:bg-purple-600",
        fuchsia: "bg-fuchsia-500 text-white dark:bg-fuchsia-600",
        pink: "bg-pink-500 text-white dark:bg-pink-600",
        rose: "bg-rose-500 text-white dark:bg-rose-600",
        zinc: "bg-zinc-500 text-white dark:bg-zinc-600",
      },
      size: {
        xs: "text-[8px]/3 px-1 py-0.5 gap-1",
        sm: "text-[10px]/3 px-1.5 py-1 gap-1",
        md: "text-xs px-2 py-1 gap-1",
        lg: "text-sm px-2 py-1 gap-1.5",
        xl: "text-base px-2.5 py-1 gap-1.5",
      },
      pill: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      color: "zinc",
      size: "md",
      pill: true,
    },
  },
);

export type BadgeProps = VariantProps<typeof badgeVariants> &
  React.ComponentPropsWithoutRef<"div">;

function Badge({ className, color, size, pill, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ color, pill, size }), className)}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
