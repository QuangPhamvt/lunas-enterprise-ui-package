'use client';

import { cn } from '@customafk/react-toolkit/utils';
import { cva } from 'class-variance-authority';
import React from 'react';

// Định nghĩa các cấp độ tiêu đề
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

type HeadingProps = {
  /**
   * Cấp độ của tiêu đề, tương ứng với kích thước và thẻ HTML mặc định.
   */
  level?: HeadingLevel;
  className?: string;
  children?: React.ReactNode;
  /**
   * Override thẻ HTML trong trường hợp bạn muốn size của H1 nhưng lại muốn render thẻ H2 (tốt cho SEO).
   */
  as?: React.ElementType;
};

export const headingVariants = cva(
  // Base class: Chữ đậm, khoảng cách chữ hơi khít lại, màu strong
  'font-semibold text-text-positive-strong tracking-tight text-start text-wrap',
  {
    variants: {
      level: {
        // H1: To nhất, dùng cho tiêu đề trang. Line-height cực hẹp (leading-tight)
        h1: 'text-2xl font-bold leading-tight',

        // H2: Tiêu đề section chính. Cần responsive nhỏ lại trên mobile
        h2: 'text-xl leading-tight',

        // H3: Tiêu đề section phụ / Tiêu đề Card lớn
        h3: 'text-lg leading-snug',

        // H4: Tiêu đề Card vừa / Block nhỏ
        h4: 'text-base leading-snug',

        // H5: Tiêu đề nhỏ
        h5: 'text-sm leading-normal',
      },
    },
    defaultVariants: {
      // H2 là mặc định an toàn nhất vì một trang thường chỉ có một H1
      level: 'h2',
    },
  }
);

export const Heading = ({ level = 'h3', className, as, children }: HeadingProps) => {
  // Điểm nhấn: Nếu không truyền prop `as`, nó sẽ tự động lấy `level` làm thẻ HTML (ví dụ level='h1' => render <h1>)
  const Component = as || level;

  return <Component className={cn(headingVariants({ level }), className)}>{children}</Component>;
};
