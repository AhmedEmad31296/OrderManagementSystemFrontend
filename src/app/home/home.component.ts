import { Component, OnInit } from '@angular/core';
import {
  FilterProductPagedInput,
  FullInfoProductDto,
  ProductPagedDto,
} from '../models/product/ProductDto';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PlaceOrderInput } from '../models/orderDto/OrderDto';
import { ApiResponse } from '../models/ApiResponse';
import { CheckoutModalComponent } from './checkout-dialog/checkout-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: ProductPagedDto[] = [];
  selectedProduct: FullInfoProductDto | null = null;

  lowPrice: number | null = null;
  highPrice: number | null = null;
  searchTerm: string | null = null;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(
    page: number = 1,
    pageSize: number = 100,
    lowPrice?: number,
    highPrice?: number,
    searchTerm?: string
  ): void {
    const filter: FilterProductPagedInput = {
      page: page,
      pageSize: pageSize,
      lowPrice: lowPrice ?? undefined, // Convert null to undefined
      highPrice: highPrice ?? undefined, // Convert null to undefined
      searchTerm: searchTerm || undefined, // Convert empty string to undefined
    };
    this.productService.getPaged(filter).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.products = response.data.aaData;
        } else {
          console.error('Failed to fetch products:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  applyFilters(): void {
    this.fetchProducts(
      1,
      100,
      this.lowPrice !== null ? this.lowPrice : undefined,
      this.highPrice !== null ? this.highPrice : undefined,
      this.searchTerm || undefined
    );
  }

  openEditModal(productId: number): void {
    this.getProductDetails(productId);
  }

  getProductDetails(productId: number): void {
    this.productService.get(productId).subscribe({
      next: (res: ApiResponse<FullInfoProductDto>) => {
        this.selectedProduct = res.data;
        const modalRef = this.modalService.open(CheckoutModalComponent);
        modalRef.componentInstance.product = this.selectedProduct;

        modalRef.result
          .then((orderData: PlaceOrderInput) => {
            if (orderData) {
              this.placeOrder(orderData);
            }
          })
          .catch(() => {});
      },
      error: (res) => {
        this.toastr.error(res.error);
      },
    });
  }

  placeOrder(orderData: PlaceOrderInput) {
    this.orderService.placeOrder(orderData).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.toastr.success(res.message);
          this.fetchProducts();
        } else {
          console.error('Error placing order:', res.message);
        }
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }
}
