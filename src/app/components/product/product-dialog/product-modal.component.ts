import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CreateProductInput,
  UpdateProductInput,
} from 'src/app/models/product/ProductDto';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
})
export class ProductModalComponent {
  @Input() product: CreateProductInput | UpdateProductInput = {
    name: '',
    price: 0,
    stockQuantity: 0,
  };

  constructor(public activeModal: NgbActiveModal) {}

  save(): void {
    this.activeModal.close(this.product);
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
