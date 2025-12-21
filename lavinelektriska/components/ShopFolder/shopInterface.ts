import type { ComponentType } from 'react';

export interface ShopBundleConfiguratorProps {
  bundle: BundleConfig;
  onClose: () => void;
  onRequestQuote?: (payload: RequestQuotePayload) => void;
}
type BundleItem = {
  id: string;
  name: string;
  price: number;
};

export type BundleConfig = {
  name: string;
  basePrice: number;
  maxItems: number;
  items: BundleItem[];
};

export type RequestQuotePayload = {
  name: string;
  phone: string;
  email: string;
  selected: string[];
  total: number;
  bundle: string;
};

type BundlePiece = {
  id: string | number;
  name: string;
};

type Bundle = {
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  name: string;
  blurb: string;
  basePrice: number | string;
  maxItems: number;
  items: BundleItem[];
};

export interface ShopCardsProps {
  bundle: BundlePieces;
  onSelect: () => void;
}

export type ShopConfirmationModalProps = {
  onClose?: () => void;
};

type BundlePieces = { name: string; items: BundlePiece[] };
export type ShopFormProps = {
  bundle: Bundle;
  selectedIds: Array<string | number>;
  total: number;
  onSuccess?: (payload: {
    name: string;
    phone: string;
    email: string;
    selected: Array<string | number>;
    total: number;
  }) => void;
};
