import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  CreateCustomerInput,
  CustomerPagedDto,
  FilterCustomerPagedInput,
  FullInfoCustomerDto,
  UpdateCustomerInput,
} from 'src/app/models/customer/CustomerDto';
import { DataTableFilteredDto } from 'src/app/models/datatableDto/DataTableFilteredDto';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerModalComponent } from './customer-dialog/customer-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/models/ApiResponse';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  customers: CustomerPagedDto[] = [];
  totalRecords: number = 0;
  selectedCustomer: FullInfoCustomerDto | null = null;

  constructor(
    private customerService: CustomerService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(
    page: number = 1,
    pageSize: number = 10,
    searchTerm?: string
  ): void {
    const filter: FilterCustomerPagedInput = { page, pageSize, searchTerm };
    this.customerService.getPaged(filter).subscribe({
      next: (res: ApiResponse<DataTableFilteredDto<CustomerPagedDto>>) => {
        if (res.statusCode === 200) {
          this.customers = res.data.aaData;
          this.totalRecords = res.data.recordsTotal;
          setTimeout(() => {
            this.initializeDataTable();
          }, 0);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
        this.toastr.error('Error fetching customers. Please try again.');
      },
    });
  }

  initializeDataTable(): void {
    $('#customersTable').DataTable({
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      lengthChange: true,
      processing: true,
      destroy: true,
    });
  }

  openCreateModal(): void {
    this.selectedCustomer = {
      customerId: 0,
      fullName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: null,
    };
    const modalRef = this.modalService.open(CustomerModalComponent);
    modalRef.componentInstance.customer = this.selectedCustomer;

    modalRef.result.then((result) => {
      if (result) {
        this.createCustomer(result);
      }
    });
  }

  openEditModal(customerId: number): void {
    this.getCustomerDetails(customerId);
  }

  getCustomerDetails(customerId: number): void {
    this.customerService.get(customerId).subscribe({
      next: (res: ApiResponse<FullInfoCustomerDto>) => {
        if (res.statusCode === 200) {
          this.selectedCustomer = res.data;
          const modalRef = this.modalService.open(CustomerModalComponent);
          modalRef.componentInstance.customer = this.selectedCustomer;
          modalRef.result.then((result) => {
            if (result) {
              this.updateCustomer(result);
            }
          });
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (res) => {
        this.toastr.error('Error fetching customer details. Please try again.');
      },
    });
  }

  createCustomer(customer: CreateCustomerInput): void {
    this.customerService.create(customer).subscribe({
      next: (res: ApiResponse<string>) => {
        if (res.statusCode === 200) {
          this.toastr.success(res.message);
          setTimeout(() => {
            this.fetchCustomers();
          }, 0);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (res) => {
        this.toastr.error('Error creating customer. Please try again.');
      },
    });
  }

  updateCustomer(customer: UpdateCustomerInput): void {
    this.customerService.update(customer).subscribe({
      next: (res: ApiResponse<string>) => {
        if (res.statusCode === 200) {
          this.toastr.success(res.message);
          this.cdr.detectChanges();
          setTimeout(() => {
            this.fetchCustomers();
          }, 1000);
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (res) => {
        this.toastr.error('Error updating customer. Please try again.');
      },
    });
  }

  deleteCustomer(customerId: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.customerService.delete(customerId).subscribe({
        next: (res: ApiResponse<string>) => {
          if (res.statusCode === 200) {
            this.toastr.success(res.message);
            setTimeout(() => {
              this.fetchCustomers();
            }, 1000);
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (res) => {
          this.toastr.error('Error deleting customer. Please try again.');
        },
      });
    }
  }
}
