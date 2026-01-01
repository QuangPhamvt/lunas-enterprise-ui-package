export const TextFieldDataType = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  URL: 'url',
} as const;

export const OrientationField = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  RESPONSIVE: 'responsive',
} as const;

export const RoundingField = {
  UP: 'up',
  DOWN: 'down',
  NEAREST: 'nearest',
  NONE: 'none',
} as const;
