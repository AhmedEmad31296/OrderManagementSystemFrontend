import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from 'src/app/models/customer/CustomerDto';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
})
export class CustomerModalComponent {
  @Input() customer: CreateCustomerInput | UpdateCustomerInput = {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: null,
  };

  constructor(public activeModal: NgbActiveModal) {}

  save(): void {
    this.activeModal.close(this.customer);
  }

  close(): void {
    this.activeModal.dismiss();
  }
}
