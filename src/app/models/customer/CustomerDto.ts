import { DataTableFilterInput } from '../datatableDto/DataTableFilterInput';

export interface FilterCustomerPagedInput extends DataTableFilterInput {}

export interface CustomerPagedDto {
  customerId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
}

export interface CustomerDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface FullInfoCustomerDto {
  customerId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: Date | null;
}

export interface CreateCustomerInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: Date | null;
}

export interface UpdateCustomerInput {
  customerId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: Date | null;
}
