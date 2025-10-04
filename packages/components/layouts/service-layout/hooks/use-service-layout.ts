import { createContext, useContext } from 'react';

import type { CredentialResponse } from '@react-oauth/google';

type Cart = {
  productUuid: string;
  productName: string;
  variantUuid: string;
  variantName: string;
  imageUrl: string;
  optionValue: string;
  optionTitle: string;
  quantity: number;
  price: number;
};

export type ServiceLayoutContextProps = {
  isLoggedIn?: boolean;
  username?: string;
  email?: string;
  inStockCarts?: Cart[];
  orderedCarts?: Cart[];
  onGoogleLoginSuccess?: (params: CredentialResponse) => void | Promise<void>;
  onUpdatingCart?: (id: string, quantity: number, type: 'in_stock' | 'pre_order') => void | Promise<void>;
  onDeletingCart?: (id: string) => void | Promise<void>;
  onLogout?: () => void | Promise<void>;
};

export const ServiceLayoutContext = createContext<ServiceLayoutContextProps | null>(null);

export const useServiceLayout = () => {
  const context = useContext(ServiceLayoutContext);
  if (!context) {
    throw new Error('useServiceLayoutContext must be used within a ServiceLayoutProvider');
  }
  return context;
};
