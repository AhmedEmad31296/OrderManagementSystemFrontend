import { Product } from './../../models/product/Product';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlaceOrderInput } from 'src/app/models/orderDto/OrderDto';
import { FullInfoProductDto } from 'src/app/models/product/ProductDto';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
})
export class CheckoutModalComponent {
  @Input() product!: FullInfoProductDto;
  quantity: number = 1;
  isLoading: boolean = false;
  customer: PlaceOrderInput = {
    CustomerName: '',
    Email: '',
    PhoneNumber: '',
    DateOfBirth: new Date(),
    OrderItems: [],
  };

  constructor(public activeModal: NgbActiveModal) {}

  save(productId: number): void {
    const orderItem = {
      ProductId: productId,
      Quantity: this.quantity,
    };
    this.customer.OrderItems = [orderItem];
    this.isLoading = true;
    debugger;
    this.activeModal.close(this.customer);
    this.isLoading = false;
  }

  close(): void {
    this.isLoading = false;
    this.activeModal.dismiss();
  }
}
