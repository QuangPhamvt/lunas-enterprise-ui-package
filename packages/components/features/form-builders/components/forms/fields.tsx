import { cva } from 'class-variance-authority';

export const fieldVariants = cva('group/field flex w-full gap-3 data-[invalid=true]:text-danger', {
  variants: {
    orientation: {
      vertical: [],
      horizontal: [],
      responsive: [],
    },
  },
  defaultVariants: {},
});
