export interface IProduct {
  brand: null;
  id: string;
  price: number;
  product: string;
}

export interface IReqData {
  action: string;
  params?: {
    offset?: number;
    limit?: number;
    price?: number;
    ids?: string[];
    brand?: string;
    field?: string;
    product?: string;
  };
}

export type filterComponentProps = {
  type: string;
  value: string | number;
};
