export interface PlaceOrderInput {
  CustomerName: string;
  Email: string;
  PhoneNumber: string;
  DateOfBirth: Date;
  OrderItems: OrderItemInput[];
}

export interface OrderItemInput {
  ProductId: number;
  Quantity: number;
}
export interface OrderDto {
  orderId: number;
  orderDate: Date;
  totalAmount: number;
  customer: CustomerDto;
  orderItems: OrderItemDto[];
}

export interface OrderItemDto {
  orderItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomerDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}
