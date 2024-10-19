import { DataTableFilterInput } from '../datatableDto/DataTableFilterInput';
export interface FilterProductPagedInput extends DataTableFilterInput {
  lowPrice?: number;
  highPrice?: number;
}

export interface ProductPagedDto {
  productId: number;
  name: string;
  price: number;
  stockQuantity: number;
}

export interface FullInfoProductDto {
  productId: number;
  name: string;
  price: number;
  stockQuantity: number;
}

export interface CreateProductInput {
  name: string;
  price: number;
  stockQuantity: number;
}

export interface UpdateProductInput {
  productId: number;
  name: string;
  price: number;
  stockQuantity: number;
}
