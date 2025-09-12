export enum ERole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  STAFF = 'STAFF',
  USER = 'USER',
}

export enum ECountry {
  VIETNAM = 'Vietnam',
  USA = 'USA',
  JAPAN = 'Japan',
  KOREA = 'Korea',
  CHINA = 'China',
  TAIWAN = 'Taiwan',
  THAILAND = 'Thailand',
  MALAYSIA = 'Malaysia',
  SINGAPORE = 'Singapore',
  INDONESIA = 'Indonesia',
}

export enum EWeightUnit {
  KG = 'kg',
  G = 'g',
  LB = 'lb',
  OZ = 'oz',
}

export enum EDimensionUnit {
  CM = 'cm',
  M = 'm',
  INCH = 'inch',
  FT = 'ft',
}

export enum EProductStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
}

export enum EProductInventoryStatus {
  IN_STOCK = 'in_stock',
  OUT_OF_STOCK = 'out_of_stock',
  PREORDER = 'preorder',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyEntity = any
