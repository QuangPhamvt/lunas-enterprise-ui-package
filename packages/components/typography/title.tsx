import type { JSX } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const titleVariants = cva(
  "scroll-m-20 text-secondary-foreground tracking-tight",
  {
    variants: {
      level: {
        1: "text-center text-4xl font-extrabold text-balance",
        2: "border-b pb-2 text-3xl font-semibold first:mt-0",
        3: "text-2xl font-semibold",
        4: "text-xl font-semibold",
        5: "text-lg font-semibold",
        6: "text-base font-semibold",
      },
      default: {
        level: 1,
      },
    },
  },
);

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: React.ReactNode;
};

export const Title = ({ level = 1, className, children }: Props) => {
  const Comp = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Comp className={cn(titleVariants({ level }), className)}>{children}</Comp>
  );
};
