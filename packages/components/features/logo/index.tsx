'use client';

import { cn } from '@customafk/react-toolkit/utils';

export type LunasLogoVariant = 'horizontal' | 'stacked' | 'icon';
export type LunasLogoColorScheme = 'purple' | 'white' | 'black';
export type LunasLogoSize = 'xs' | 'sm' | 'md' | 'lg';
export type LunasLogoIconStyle = 'plain' | 'solid' | 'outline';

export type LunasLogoProps = {
  variant?: LunasLogoVariant;
  colorScheme?: LunasLogoColorScheme;
  size?: LunasLogoSize;
  /** Only applies when variant="icon". Controls background/border style. */
  iconStyle?: LunasLogoIconStyle;
  className?: string;
};

const colorMap = {
  purple: { moon: '#8B5CF6', accent: '#D9A441', text: '#3B1F73', sub: '#D9A441' },
  white: { moon: '#FFFFFF', accent: '#FFFFFF', text: '#FFFFFF', sub: '#FFFFFF' },
  black: { moon: '#000000', accent: '#D9A441', text: '#000000', sub: '#D9A441' },
} as const;

// Colors used when the icon sits on a filled (solid) background
const solidIconColors = {
  purple: { bg: '#8B5CF6', moon: '#FFFFFF', accent: '#F2C772' },
  white: { bg: '#FFFFFF', moon: '#8B5CF6', accent: '#D9A441' },
  black: { bg: '#1A1A1A', moon: '#FFFFFF', accent: '#F2C772' },
} as const;

const sizeMap = {
  xs: { icon: 20, horizontal: [120, 51] as const, stacked: [88, 76] as const },
  sm: { icon: 28, horizontal: [160, 69] as const, stacked: [110, 95] as const },
  md: { icon: 40, horizontal: [233, 100] as const, stacked: [146, 127] as const },
  lg: { icon: 56, horizontal: [350, 150] as const, stacked: [220, 190] as const },
} as const;

function LunasIconPaths({ moon, accent }: { moon: string; accent: string }) {
  return (
    <>
      <path transform="translate(10,8) scale(3)" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill={moon} />
      <path d="M82,9 L85,15 L91,18 L85,21 L82,27 L79,21 L73,18 L79,15 Z" fill={accent} />
      <circle cx="28" cy="86" r="5" fill={accent} />
      <circle cx="42" cy="92" r="6" fill={accent} />
      <circle cx="56" cy="86" r="5" fill={accent} />
    </>
  );
}

export function LunasLogo({ variant = 'horizontal', colorScheme = 'purple', size = 'md', iconStyle = 'plain', className }: LunasLogoProps) {
  const colors = colorMap[colorScheme];
  const dims = sizeMap[size];

  if (variant === 'icon') {
    if (iconStyle === 'solid') {
      const solid = solidIconColors[colorScheme];
      return (
        <svg
          width={dims.icon}
          height={dims.icon}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Lunas logo"
          className={cn('shrink-0', className)}
        >
          <rect width="100" height="100" rx="20" fill={solid.bg} />
          <g transform="translate(10,10) scale(0.80)">
            <LunasIconPaths moon={solid.moon} accent={solid.accent} />
          </g>
        </svg>
      );
    }

    if (iconStyle === 'outline') {
      return (
        <svg
          width={dims.icon}
          height={dims.icon}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Lunas logo"
          className={cn('shrink-0', className)}
        >
          <rect x="2" y="2" width="96" height="96" rx="18" fill="none" stroke={colors.moon} strokeWidth="4" />
          <g transform="translate(10,10) scale(0.80)">
            <LunasIconPaths moon={colors.moon} accent={colors.accent} />
          </g>
        </svg>
      );
    }

    return (
      <svg
        width={dims.icon}
        height={dims.icon}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Lunas logo"
        className={cn('shrink-0', className)}
      >
        <LunasIconPaths moon={colors.moon} accent={colors.accent} />
      </svg>
    );
  }

  if (variant === 'stacked') {
    const [w, h] = dims.stacked;
    return (
      <svg width={w} height={h} viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg" aria-label="Lunas Store" className={cn('shrink-0', className)}>
        <g transform="translate(60,15) scale(1.0)">
          <LunasIconPaths moon={colors.moon} accent={colors.accent} />
        </g>
        <text x="110" y="150" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="34" fontWeight="700" fill={colors.text}>
          Lunas
        </text>
        <text x="110" y="174" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" fontWeight="700" letterSpacing="3" fill={colors.sub}>
          STORE
        </text>
      </svg>
    );
  }

  const [w, h] = dims.horizontal;
  return (
    <svg width={w} height={h} viewBox="0 0 350 150" xmlns="http://www.w3.org/2000/svg" aria-label="Lunas Store" className={cn('shrink-0', className)}>
      <g transform="translate(10,15) scale(1.2)">
        <LunasIconPaths moon={colors.moon} accent={colors.accent} />
      </g>
      <text x="150" y="78" fontFamily="Arial, Helvetica, sans-serif" fontSize="54" fontWeight="700" fill={colors.text}>
        Lunas
      </text>
      <text x="152" y="106" fontFamily="Arial, Helvetica, sans-serif" fontSize="15" fontWeight="700" letterSpacing="4" fill={colors.sub}>
        STORE
      </text>
    </svg>
  );
}
